/* eslint-disable vue/no-unused-components */
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
            <el-button type="primary">
              当前身份: {{defaultDutyName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changeSessionUser(item.userId)" :key="index" v-for="(item, index) in userList">{{item.dutyName}}</el-dropdown-item>
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
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { api, urlNames } from '@src/api'
import { mapState } from 'vuex'
import personManage from '../../organization/components/PersonManage'
import SelectMembers from '@src/components/SelectMembers/index'
export default {
  components: {
    personManage,
    SelectMembers
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
      defaultName: '', // 默认名字
      userList: [], // 用户身份列表
      defaultDutyName: '', // 默认身份
      calloutFlag: false,
      showexportIdentityType: true,
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
    this.findSessionUserList();
  },
  mounted () {
    this.getUserDetail(this.app.option.user.uid)
    this.getIdentity(this.app.option.user.identityId)
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
    findSessionUserList() {
      api[urlNames['findSessionUserList']]().then((res) => {
        this.userList = res.data
        this.defaultName = res.data[0].name;
        this.userList.forEach(item => {
          if(item.userId === this.app.option.user.identityId) {
            this.defaultDutyName = item.dutyName;
          }
        })
      })
    },

    // 切换用户身份
    changeSessionUser(id) {
      api[urlNames['changeSessionUserId']]({
        userId: id
      }).then((res) => {
        this.$message.success('切换成功')
        window.setTimeout(() => {
          this.$router.go(0) // 刷新页面
        }, 500)
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
      // this.userInfo.userId=val.uid;
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

    // 重置密码
    resetPwd () {
      api[urlNames['resetPwd']]({
        id: this.currentSetAccount.id
      }).then(
        res => {
        },
        () => {}
      )
    },

    // 提交调出
    submitFormCallout (formCallout) {
      console.log(this.formCallout)
      this.$refs[formCallout].validate(valid => {
        if (valid) {
          api[urlNames['calloutUser']](this.formCallout).then(
            res => {
              this.$message.success(`调出成功`)
              this.calloutFlag = false
              this.getGrid()
              this.fromInit()
              this.formCallout.deptId = this.formCallout.orgId = ''
              this.orgName = this.depName = ''
            },
            () => {}
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


