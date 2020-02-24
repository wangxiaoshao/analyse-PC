
<template>
  <div class="pass-change">
     <select-members
      :seleceDialog="selectDialog"
      @dialogReturnMembersInfo="dialogReturnMembersInfo"
      @closeselectMenmber="closeselectMenmber"
    ></select-members>
     <!--人员调出弹窗-->
    <el-dialog title="填写调出说明" :visible.sync="calloutFlag" width="50%">
      <el-form
        :model="formCallout"
        :rules="rulesCallou"
        ref="formCallout"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="调出单位">
          <span class="name-span">{{orgName}}</span>
          <span class="name-span" v-if="depName !== ''">/{{depName}}</span>
          <el-button @click="addMainLeader">选择调出单位/内设机构</el-button>
        </el-form-item>
        <el-form-item label="申请原因" prop="reason">
          <el-input type="textarea" v-model="formCallout.reason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormCallout('formCallout')">确定</el-button>
          <el-button @click="calloutFlag = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 提交调出申请弹框 -->
     <el-dialog
      :visible.sync="submitVisible" width='410px'>
      <div slot='title' style="padding:20px; background-color: #fff;">
        <span class="msg-title">调出申请提交</span>
          <span class='svg-container' style="color:red"><span class='iconfont iconzuzhijigou'></span></span>
      </div>
      <div class="msg-box">
        您的调出申请已提交，等待管理员审核通过后即可生效。
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitVisible = false" width='120px'>确 定</el-button>
      </div>
    </el-dialog>

    <!-- 重置密码弹框 -->
    <div class="dialog-box">
      <el-dialog :visible.sync="resetPwdVisible"   width="420px"  :show-close='false'>
        <div slot="title" class="header-title"  style="background-color: #fff;">
          手机号验证
          <i class="el-icon-document-copy" style="color:red"></i>
        </div>
        <div class="resetPwd-box">
          <p>验证码已通过手机号：{{hideMobile(userInfo.user.mobile)}}发送请输入验证码：</p>
          <div  style="padding:15px 0">
            <el-row>
            <el-col :span="12">
              <el-input placeholder="请输入短信验证码" v-model="smsCode"></el-input>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-button type="primary" :disabled="smsTimerCount !== 0" @click="sendSmsCode"
               :style="this.smsTimerCount === 0?'':'background-color:#d8d7d7;border-color:#d8d7d7;'">
               {{this.smsTimerCount === 0 ? '重新发送' : this.smsTimerCount + '秒后重新发送'}}</el-button>
            </el-col>
          </el-row>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="beSureSmsCode" width="120px">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 重置密码成功弹框 -->
    <el-dialog :visible.sync="successPwdVisible"   width="420px">
        <div slot="title" class="header-title"  style="background-color: #fff;">
          密码重置成功
          <i class="el-icon-document-copy" style="color:red"></i>
        </div>
        <div class="sucessPwd-box">
         验证通过，您的新密码已发送至手机号：{{hideMobile(userInfo.user.mobile)}}，请注意查收。
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="successPwdVisible=false" width="120px">确 定</el-button>
        </div>
      </el-dialog>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="account-info">
          <p>账号信息</p>
          <!--<div v-for="(item, index) in accountInfoList" :key="item.id">-->
            <!--<el-button-->
              <!--@click="selectAccount(item, index)"-->
              <!--:type="currentIndex === index ? 'primary' : ''"-->
            <!--&gt;{{item.name}}</el-button>-->
          <!--</div>-->
          <el-dropdown>
          <span class="el-dropdown-link">
             当前身份:
            <el-button type="primary">
              {{defaultDutyName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changeSessionUser(item.userId,item.uid)" :key="index" v-for="(item, index) in userList"> {{item.dutyName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的信息" name="first">
            <person-manage
              :user-detail="userInfo.user"
              :post-detail="userInfo.identity"
              :label-id="userInfo.labelId"
              :label-list="fromLabelList"
              :old-user-info="oldUserInfo"
              :orgName="orgName"
              @get-user="getUser"
              @get-post="getPost"
              @get-label="getLabelId"
              @goModifieUserInfo='goModifieUserInfo'
              :showexportIdentityType="showexportIdentityType"
              :showNickName='showNickName'
              @exportOrg='exportOrg'
            ></person-manage>
          </el-tab-pane>
          <el-tab-pane label="修改密码">
            <div class="modifiePwd">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <div :style="{margin: '20px'}" class="account-name">
                  <i class="el-icon-user" :style="{marginRight: '20px'}">{{currentSetAccount.name}}</i>
                </div>
                <el-form-item label="原密码" prop="oldPass">
                  <el-input type="password" v-model="ruleForm.oldPass" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                  <el-input
                    type="password"
                    v-model="ruleForm.newPass"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input
                    type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
                <div class="pass-rule">
                  <i class="el-icon-warning"></i>
                  {{passRule}}
                </div>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="重置密码">
              <div class="resetPwd">
                <div :style="{margin: '20px'}" class="account-name">
                  <i class="el-icon-user" :style="{marginRight: '20px'}">{{currentSetAccount.name}}</i>
                </div>
                <p style="margin:10px 0;">
                  <i class="el-icon-info" :style="{fontSize: '16px',color:'#FC7049'}"></i>
                  忘记原有密码，点击以下按钮进行重置，请确保该账号的手机号能正常接收信息！</p>
                  <el-button type="primary" @click="resetPwd">重置密码</el-button>
              </div>
          </el-tab-pane>
          <el-tab-pane label="个人日志">
            <personal-log></personal-log>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    
  </div>
</template>

<script type="text/ecmascript-6">
import { api, urlNames } from '@src/api'
import { mapState } from 'vuex'
import personManage from '../../organization/components/PersonManage'
import PersonalLog from '@src/components/PersonalLog/index'
import SelectMembers from '@src/components/SelectMembers/index'
const SMS_TIMES_SECOND = 60
// 定时器
let smsTimer = null
export default {
  components: {
    personManage,
    SelectMembers,
    PersonalLog
  },
  data () {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'))
      } else {
        callback()
      }
    }
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        let reg = /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.*/]*|[a-zA-Z!@#\$%_\.*/]*)$)[a-zA-Z\d!@#\$%_\.*/]{8,}$/
        reg.test(value)
          ? callback()
          : callback(new Error('请按照密码规则填写'))
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      resetPwdVisible:true,//重置密码弹框
      smsTimerCount:0,//发送验证短信计时器
       smsCode: '',
       successPwdVisible:false,//重置密码成功弹框
      defaultName: '', // 默认名字
      userList: [], // 用户身份列表
      defaultDutyName: '', // 默认身份
      calloutFlag: false,
      submitVisible: false,
      showexportIdentityType: true,
      showNickName: true,
      currentIndex: 0,
      accountInfoList: [],
      currentSetAccount: {},
      activeName: 'first',
      userName: '管理员管理员',
      passRule:
        '密码规则:必须含数字、字母(区分大小写)、特殊字符(如！@#$_等)，且长度不少于8位。如：bgt123@SZF',
      ruleForm: {
        oldPass: '',
        checkPass: '',
        newPass: ''
      },
      rulesCallou: {
        /* reason: [
          { required: true, message: '请填写申请原因', trigger: 'blur' }
        ], */
        orgId: [{ required: true, message: '请选择调出单位', trigger: 'blur' }]
      },
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: 'blur' }],
        checkPass: [{ validator: validateCheckPass, trigger: 'blur' }],
        newPass: [{ validator: validateNewPass, trigger: 'blur' }],
        reason: [{ required: true, message: '请填写申请原因', trigger: 'blur' }]
      },
      oldUserInfo: {},
       nickName: '',
      userInfo: {
        userAccount: [], // 账户
        labelId: [],
        identity: {
          departmentId: '', // 部门id
          postName: '', // 岗位名称
          id: '',
          type: null,
          orgId: '',
          dutyName: '' // 职务名称
        },
        userId: '',
        user: {
          nickName:'',
          birthday: '',
          nation: null,
          portraitUrl: '',
          sex: null,
          mobile: '',
          politicalParty: null,
          qualification: null,
          positionClass: null,
          officePhone: '',
          idcard: '',
          mobile2: '',
          name: '',
          professionalTitle: '',
          userState: null,
          userType: null,
          ext01: '',
          ext02: '',
          ext03: ''
        }
      },
      fromLabelList: [],
      // 人员调出表单
      formCallout: {
        identityId: '',
        uid: '',
        deptId: '',
        orgId: '',
        reason: ''
      },
      orgName: '',
      depName: '',
      selectDialog: {
        selectMenmberTitle: '选择调出单位或内设机构', // 选人组件标题
        selectMenmberFlag: false, // 显示弹窗，
        isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
        notOnlyPerson: false, // 是否选人，默认为false（只选人）
        isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选
        isSingleOrgSelect: true, // 是否为单选框  false为多选（默认），true为单选(isOnlyOrg为true时部门/单位单选)
        isOnlyOrg: true
      }
    }
  },
  created () {
    this.getUserDetail(this.app.option.user.uid)
    this.getIdentity(this.app.option.user.identityId)
    // this.getNickName('')
    api[urlNames['findUserAccountByUid']]().then(
      res => {
        if (res && res.data) {
          this.accountInfoList = res.data
          this.currentSetAccount = res.data[0]
          this.userInfo.userAccount = res.data
        }
      },
      () => {
        this.accountInfoList = []
      }
    )

    this.findSessionUserList()
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {

    // 选人弹窗组件返回的人员信息
    dialogReturnMembersInfo (data) {
      if (data[0].nodeType === 2) {
        this.formCallout.orgId = data[0].bindId
        this.orgName = data[0].name
      }
      if (data[0].nodeType === 3) {
        this.formCallout.deptId = data[0].bindId
        api[urlNames['findDepartmentById']]({
          id: data[0].bindId
        }).then(
          res => {
            this.formCallout.orgId = res.data.orgId
            this.orgName = res.data.orgName
            this.depName = res.data.name
          },
          () => {}
        )
      }
    },

    // 获取用户身份列表
    findSessionUserList () {
      api[urlNames['findSessionUserList']]().then((res) => {
        this.userList = res.data
        this.defaultName = res.data[0].name
        this.userList.forEach(item => {
          if (item.userId === this.app.option.user.identityId) {
            this.defaultDutyName = item.dutyName
            this.getNickName(item.userId)
          }
        })
      })
    },
    // 切换用户身份
    changeSessionUser (id) {
      this.getNickName(id)
      api[urlNames['changeSessionUserId']]({
        userId: id
      }).then((res) => {
        window.setTimeout(() => {
          this.$router.go(0) // 刷新页面
          this.message.success('切换成功')
        }, 500)
      })
    },
    // 切换账号
    getNickName (id) {
      api[urlNames['findUserAccountNickName']]({
        userIdentiyId: id
      }).then((res) => {
        if(res.data.length>0){
           this.userInfo.user.nickName=res.data[0].nickName
        }
        // this.$message.success('切换成功')
      })
    },
    // 关闭选人弹窗
    closeselectMenmber () {
      this.selectDialog.selectMenmberFlag = false
    },
    addMainLeader () {
      this.selectDialog.selectMenmberFlag = true
      this.selectDialog.isSingleSelect = false
      this.selectDialog.notOnlyPerson = false
      this.selectDialog.isSingleOrgSelect = true
      this.selectDialog.isOnlyOrg = true
      this.selectDialog.isAllData = true
    },
    exportOrg () {
      this.calloutFlag = true
    },
    getLabelId (val) {
      this.userInfo.labelId = val.map(Number)
    },
    findLabel (id, type) {
      api[urlNames['findLabel']]({
        id: id,
        type: type
      }).then((res) => {
        this.fromLabelList = res.data
      }, () => {
      })
    },
    getIdentity (id) {
      api[urlNames['findIdentityById']]({
        identityId: id
      }).then((res) => {
        this.userInfo.identity.departmentId = res.data.departmentId
        this.userInfo.identity.id = res.data.id
        this.userInfo.identity.orgId = res.data.orgId
        this.userInfo.identity.postName = res.data.postName
        this.userInfo.identity.type = parseInt(res.data.type)
        this.userInfo.identity.dutyName = res.data.dutyName
        this.formCallout.identityId = res.data.id
        this.formCallout.orgId = res.data.orgId
        this.orgName = res.data.organizationName
      }, () => {
        /* this.$message.error(`没有内容`) */
      })
    },

    getUserDetail (id) {
      this.loading = true
      api[urlNames['findUserById']]({
        id: id
      }).then(
        res => {
          if (res.data.sex) {
            res.data.sex = parseInt(res.data.sex)
          }
          if (res.data.positionClass) {
            res.data.positionClass = parseInt(res.data.positionClass)
          }
          if (res.data.nation) {
            res.data.nation = parseInt(res.data.nation)
          }
          if (res.data.qualification) {
            res.data.qualification = parseInt(res.data.qualification)
          }
          if (res.data.politicalParty) {
            res.data.politicalParty = parseInt(res.data.politicalParty)
          }
          let doUserDetail = Object.assign(this.userInfo.user, res.data)
          this.userInfo.user = doUserDetail
          this.loading = false
          this.userInfo.userId = res.data.uid
          this.oldUserInfo = JSON.parse(JSON.stringify(this.userInfo))
          this.formCallout.uid = res.data.uid
          this.findLabel(res.data.uid, 3)
        },
        () => {
          this.$message.error(`保存失败，请重试`)
        }
      )
    },

    goModifieUserInfo (val) {
      // 保存createUser
      this.userInfo.user = val
      this.userInfo.userAccount[0].nickName=this.userInfo.user.nickName
      api[urlNames['createUser']](this.userInfo).then((res) => {
        this.$message.success(`保存成功`)
      }, () => {
        this.$message.error(`保存失败，请重试`)
      })
    },
    getUser (val) {
      // 获取用户信息
      this.userInfo.user = val
      this.stepTwoFlag = true
      this.activeIndex = 1
      this.sendUserFlag = true
      // this.submitForm()
    },
    // 绑定身份
    getPost (val) {
      this.userInfo.identity = val
    },

    selectAccount (item, index) {
      this.currentIndex = index
      this.currentSetAccount = item
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },

    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            accountId: this.currentSetAccount.id,
            oldPwd: this.ruleForm.oldPass,
            newPwd: this.ruleForm.newPass,
            repeatPwd: this.ruleForm.checkPass
          }
          api[urlNames['updatePwd']](data).then(
            res => {
              let status = res.status
              this.$message({
                message: status === 0 ? '修改成功' : '修改失败',
                type: status === 0 ? 'success' : 'error'
              })
            },
            () => {}
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 过滤手机号
    hideMobile(phone){
        return (phone+'').replace(/^(.{3})(?:\d+)(.{4})$/,"$1****$2")
    },
    

    // 重置密码
    resetPwd () {
      this.resetPwdVisible=true
      // this.sendSmsCode();
      // console.log(this.userInfo.user.mobile)
      // api[urlNames['resetPwd']]({
      //   id: this.currentSetAccount.id
      // }).then(
      //   res => {
      //     this.$message.success('重置密码')
      //   },
      //   () => {
      //   }
      // )
    },
    /**
     * 发送验证短信到用户绑定手机号
     */
    sendSmsCode() {
      if (0 !== this.smsTimerCount) {
        return
      }

      this.smsTimerCount = SMS_TIMES_SECOND
      if (smsTimer) {
        clearInterval(smsTimer)
        smsTimer = null
      }

      // 开启计时器
      let self = this
      smsTimer = setInterval(() => {
        if (0 === self.smsTimerCount) {
          if (smsTimer) {
            clearInterval(smsTimer)
            smsTimer = null
          }
        } else {
          self.smsTimerCount--
        }
      }, 1000)

      // 发送短信
    },
    beSureSmsCode(){
      this.resetPwdVisible=false
    },

    // 表单初始化
    fromInit () {
      // this.calloutFlag = false
      this.formCallout = {
        identityId: '',
        uid: '',
        deptId: '',
        orgId: '',
        reason: ''
      }
    },

    // 提交调出
    submitFormCallout (formCallout) {
      this.$refs[formCallout].validate(valid => {
        if (valid) {
          api[urlNames['calloutUser']](this.formCallout).then(
            res => {
              // this.$message.success(`调出申请已提交`)
              this.calloutFlag = false
              this.submitVisible = true
              // this.getGrid()
              this.fromInit()
              this.formCallout.deptId = this.formCallout.orgId = ''
              // this.orgName = this.depName = ''
            },
            (error) => {
              if (error) {
                this.calloutFlag = false
                this.submitVisible = true
                document.querySelector('.msg-title').innerHTML = '请勿重复提交调出申请'
                document.querySelector('.msg-box').innerHTML = '在此之前，您已经提交过调出申请，请等待管理员审核完成后再操作！'
              }
            }
          )
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less">
@import "index";
</style>


