<template>
    <div class="pass-change">
        <select-members
            :seleceDialog="selectDialog"
            entire="true"
            @dialogReturnMembersInfo="dialogReturnMembersInfo"
            @closeselectMenmber="closeselectMenmber"
        ></select-members>

        <!--人员调出弹窗-->
        <el-dialog
            :title="calloutTitle"
            :visible.sync="calloutFlag"
            width="50%"
        >
            <el-form
                :model="formCallout"
                :rules="rulesCallou"
                ref="formCallout"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="当前单位">
                    <span class="name-span">{{
                        this.$store.state.app.option.user.orgName
                    }}</span>
                </el-form-item>
                <el-form-item label="目标单位">
                    <span class="name-span border">{{ orgName }}</span>
                    <span class="name-span border" v-if="depName !== ''"
                        >/{{ depName }}</span
                    >
                    <el-button @click="addMainLeader" type="primary"
                        >选择调出目标单位</el-button
                    >
                    <el-button
                        @click="removeDestOrg"
                        type="primary"
                        v-if="isCallout === 3"
                        >不选择单位</el-button
                    >
                </el-form-item>
                <el-form-item label="申请原因" prop="reason">
                    <el-input
                        type="textarea"
                        v-model="formCallout.reason"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="submitFormCallout('formCallout')"
                        >确定</el-button
                    >
                    <el-button @click="calloutFlag = false">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 提交调出申请弹框 -->
        <el-dialog :visible.sync="submitVisible" width="410px">
            <div slot="title" style="padding: 20px; background-color: #fff;">
                <span class="msg-title">{{ callMag.title }}</span>
                <i class="el-icon-document-copy" style="color: red;"></i>
            </div>
            <div class="msg-box">{{ callMag.msg }}</div>
            <div slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="submitVisible = false"
                    width="120px"
                    >确 定</el-button
                >
            </div>
        </el-dialog>

        <!-- 修改密码弹框 -->
        <div class="updatePwd-box">
            <el-dialog
                :visible.sync="modifiePwdVisible"
                :show-close="false"
                width="410px"
            >
                <div
                    slot="title"
                    class="header-title"
                    style="background-color: #fff;"
                >
                    修改密码
                    <i class="el-icon-document-copy" style="color: red;"></i>
                </div>
                <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    inline
                    label-width="100px"
                    ref="ruleForm"
                >
                    <el-form-item label="原密码" prop="oldPass">
                        <el-input
                            type="password"
                            v-model="ruleForm.oldPass"
                            show-password
                        ></el-input>
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
                        <i class="el-icon-warning" style="color: black;"></i>
                        {{ passRule }}
                    </div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm')"
                        >保存</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">取消</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 重置密码弹框 -->
        <div class="updatePwd-box">
            <el-dialog
                :visible.sync="resetPwdVisible"
                width="420px"
                :show-close="true"
            >
                <div
                    slot="title"
                    class="header-title"
                    style="background-color: #fff;"
                >
                    手机号验证
                    <i class="el-icon-document-copy" style="color: red;"></i>
                </div>
                <div class="resetPwd-box">
                    <p>
                        验证码已通过手机号：{{
                            hideMobile(userInfo.user.mobile)
                        }}发送请输入验证码：
                    </p>
                    <div style="padding: 15px 0;">
                        <el-row>
                            <el-col :span="12">
                                <el-input
                                    placeholder="请输入短信验证码"
                                    v-model="smsCode"
                                    ref="smsCodeInput"
                                ></el-input>
                            </el-col>
                            <el-col :span="10" :offset="1">
                                <el-button
                                    type="primary"
                                    :disabled="smsTimerCount !== 0"
                                    @click="sendSmsCode"
                                    :style="
                                        this.smsTimerCount === 0
                                            ? ''
                                            : 'background-color:#d8d7d7;border-color:#d8d7d7;'
                                    "
                                    >{{
                                        this.smsTimerCount === 0
                                            ? "重新发送"
                                            : this.smsTimerCount +
                                              "秒后重新发送"
                                    }}</el-button
                                >
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button
                        type="primary"
                        @click="beSureSmsCode"
                        width="120px"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>

        <!-- 重置密码成功弹框 -->
        <el-dialog :visible.sync="successPwdVisible" width="420px">
            <div
                slot="title"
                class="header-title"
                style="background-color: #fff;"
            >
                密码重置成功
                <i class="el-icon-document-copy" style="color: red;"></i>
            </div>
            <div class="sucessPwd-box">
                验证通过，您的新密码已发送至手机号：{{
                    hideMobile(userInfo.user.mobile)
                }}，请注意查收。
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="loginOut" width="120px"
                    >确 定</el-button
                >
            </div>
        </el-dialog>

        <div class="pass-change-content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的信息" name="first">
                    <el-row>
                        <el-col :span="18">
                            <person-manage
                                :userInfo="userInfo"
                                :user-detail="userInfo.user"
                                :post-detail="userInfo.identity"
                                :label-id="userInfo.labelId"
                                :label-list="fromLabelList"
                                :old-user-info="oldUserInfo"
                                @get-user="getUser"
                                @get-post="getPost"
                                @get-label="getLabelId"
                                @goModifieUserInfo="goModifieUserInfo"
                                :showexportIdentityType="showexportIdentityType"
                                @exportOrg="exportOrg"
                            ></person-manage>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="多账号管理">
                    <multiple-accounts
                        :accountInfoList="accountInfoList"
                        @goEdit="goEdit"
                        v-if="showAccountsVisible"
                    ></multiple-accounts>
                    <edit-account
                        v-else
                        @resetPwd="resetPwd"
                        @modifiePwd="modifiePwd"
                        :accountInfo="accountInfo"
                        @close="goBack"
                    ></edit-account>
                </el-tab-pane>
                <!-- <el-tab-pane label="多身份管理">
          <multiple-idetity  @exportOrg="exportOrg"></multiple-idetity>
        </el-tab-pane> -->
                <el-tab-pane label="个人日志">
                    <personal-log :showFindBtn="showFindBtn"></personal-log>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { api, urlNames } from '@src/api'
import { mapState } from 'vuex'
import personManage from '../../organization/components/PersonManage'
import PersonalLog from '@src/components/PersonalLog/index'
import SelectMembers from '@src/components/SelectMembers/index'
import MultipleAccounts from '../components/MultipleAccounts/index'
import EditAccount from '../components/EditAccount/index'
const SMS_TIMES_SECOND = 60
// 定时器
let smsTimer = null
export default {
  components: {
    personManage,
    SelectMembers,
    PersonalLog,
    MultipleAccounts,
    EditAccount
  },
  data() {
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
        let reg = /^(?!([a-zA-Z\d]*|[\d!@#$%_.*/]*|[a-zA-Z!@#$%_.*/]*)$)[a-zA-Z\d!@#$%_.*/]{8,}$/
        reg.test(value) ? callback() : callback(new Error('请按照密码规则填写'))
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
      accountInfo: '',
      accountId: '',
      showFindBtn: false,
      showAccountsVisible: true,
      resetPwdVisible: false, // 重置密码弹框
      modifiePwdVisible: false, // 修改密码弹框
      smsTimerCount: 0, // 发送验证短信计时器
      smsCode: '',
      successPwdVisible: false, // 重置密码成功弹框
      calloutFlag: false,
      calloutTitle:'填写调出说明',
      isCallout:0,
      submitVisible: false,
      showexportIdentityType: true,
      currentIndex: 0,
      accountInfoList: [],
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
        reason: [
          { required: true, message: '请填写申请原因', trigger: 'blur' }
        ],
        orgId: [{ required: true, message: '请选择调出单位', trigger: 'blur' }]
      },
      rules: {
        oldPass: [
          { required: true, validator: validateOldPass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validateCheckPass, trigger: 'blur' }
        ],
        newPass: [
          { required: true, validator: validateNewPass, trigger: 'blur' }
        ]
      },
      oldUserInfo: {},
      userInfo: {
        userAccount: [], // 账户
        labelId: [],
        identity: {
          departmentId: '', // 内设机构id
          postName: '', // 岗位名称
          id: '',
          type: null,
          orgId: '',
          dutyName: '', // 职务名称
          orgName: ''
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
      depName: '',
      orgName: '',
      selectDialog: {
        selectMenmberTitle: '选择调出单位或内设机构', // 选人组件标题
        selectMenmberFlag: false, // 显示弹窗，
        isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
        notOnlyPerson: false, // 是否选人，默认为false（只选人）
        isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选
        isSingleOrgSelect: true, // 是否为单选框  false为多选（默认），true为单选(isOnlyOrg为true时内设机构/单位单选)
        isOnlyOrg: true
      },
      callMag: {
        title: '调出申请提交',
        msg: '您的调出申请已提交，等待管理员审核通过后即可生效。'
      }
    }
  },
  created() {
    this.getUserDetail(this.app.option.user.uid)
    this.getIdentity(this.app.option.user.identityId)
    // this.getAccountInfo()
    this.getAllAccountList()
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    // 选人弹窗组件返回的人员信息
    dialogReturnMembersInfo(data) {
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
    // 获取账号列表
    getAllAccountList() {
      api[urlNames['findAllAccountByUid']]({
        userId: this.app.option.user.uid
      }).then(
        res => {
          if (res && res.data) {
            this.accountInfoList = res.data
          }
        },
        () => {
          this.accountInfoList = []
        }
      )
    },

    // 关闭选人弹窗
    closeselectMenmber() {
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
    removeDestOrg() {
      this.formCallout.orgId = ''
      this.orgName = '无'
    },
    exportOrg(flag) {
      if(flag===1){
        this.calloutTitle='填写兼职说明'
      }else if(flag===2){
        this.calloutTitle='填写挂出说明'
      }else if(flag===3){
        this.calloutTitle='填写调出说明'
      }
       this.isCallout=flag
      this.calloutFlag = true
    },
    getLabelId(val) {
      this.userInfo.labelId = val.map(Number)
    },
    findLabel(id, type) {
      api[urlNames['findLabel']]({
        id: id,
        type: type
      }).then(
        res => {
          this.fromLabelList = res.data
        },
        () => {}
      )
    },
    getIdentity(id) {
      api[urlNames['findIdentityById']]({
        identityId: id
      }).then(
        res => {
          this.userInfo.identity.departmentId = res.data.departmentId
          this.userInfo.identity.id = res.data.id
          this.userInfo.identity.orgId = res.data.orgId
          this.userInfo.identity.postName = res.data.postName
          this.userInfo.identity.type = res.data.type
          this.userInfo.identity.dutyName = res.data.dutyName
          this.formCallout.identityId = res.data.id
          this.formCallout.orgId = res.data.orgId
          this.userInfo.identity.orgName = res.data.organizationName
          this.orgName = res.data.organizationName
        },
        () => {
          /* this.$message.error(`没有内容`) */
        }
      )
    },

    getUserDetail(id) {
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

    goModifieUserInfo(val, isAudit) {
      // 保存createUser
      this.userInfo.user = val
      api[urlNames['createUser']](this.userInfo).then(
        res => {
          if (isAudit) {
            this.$alert('保存成功，待审核管理员审核通过后方生效', '保存成功', {
              confirmButtonText: '确定',
              callback: action => {
                //  this.$router.go(0) // 刷新页面
              }
            })
          } else {
            this.$message.success(`保存成功`)
          }
        },
        () => {
          this.$message.error(`保存失败，请重试`)
        }
      )
    },
    getUser(val) {
      // 获取用户信息
      this.userInfo.user = val
      this.stepTwoFlag = true
      this.activeIndex = 1
      this.sendUserFlag = true
      // this.submitForm()
    },
    // 绑定身份
    getPost(val) {
      this.userInfo.identity = val
    },
    handleClick(tab, event) {
      this.showAccountsVisible = true
    },
    /**
     * 修改密码
     */
    modifiePwd(val) {
      this.accountId = val
      this.modifiePwdVisible = true
      this.$nextTick(() => {
        this.$refs['ruleForm'].resetFields()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            accountId: this.accountId,
            oldPwd: this.ruleForm.oldPass,
            newPwd: this.ruleForm.newPass,
            repeatPwd: this.ruleForm.checkPass
          }
          this.$confirm('修改密码成功后将退出系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              api[urlNames['updatePwd']](data).then(
                res => {
                  let status = res.status
                  this.$message({
                    message: status === 0 ? '修改成功' : '修改失败',
                    type: status === 0 ? 'success' : 'error'
                  })
                  this.modifiePwdVisible = false
                  window.location.href = '/api/gate/logout'
                  this.$refs[formName].resetFields()
                },
                () => {}
              )
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              })
            })
        } else {
          this.$message.error('不符合规则，请重新输入')
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs['ruleForm'].resetFields()
      this.modifiePwdVisible = false
    },
    // 过滤手机号
    hideMobile(phone) {
      return (phone + '').replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2')
    },

    // 重置密码
    resetPwd(val) {
      this.accountId = val
      this.$confirm('重置密码成功后将退出系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.resetPwdVisible = true
          this.sendSmsCode()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
    },
    /**
     * 发送验证短信到用户绑定手机号
     */
    sendSmsCode() {
      if (this.smsTimerCount !== 0) {
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
        if (self.smsTimerCount === 0) {
          if (smsTimer) {
            clearInterval(smsTimer)
            smsTimer = null
          }
        } else {
          self.smsTimerCount--
        }
      }, 1000)

      // 发送短信获取验证码
      api[urlNames['getVerifyCode']]({
        id: this.accountId
      }).then(
        res => {},
        () => {}
      )
    },

    // 验证验证码
    beSureSmsCode() {
      if (this.smsCode === '') {
        this.$message.error('请输入有效验证码')
        this.$refs.smsCodeInput.focus()
      } else {
        let param = {
          id: this.accountId,
          verifyCode: this.smsCode
        }
        api[urlNames['resetPwd']](param).then(
          res => {
            if (res) {
              this.resetPwdVisible = false
              this.successPwdVisible = true
              this.smsCode = ''
            } else {
              this.$message.error(
                '验证码已失效或验证码不正确，请重新输入或发送'
              )
            }
          },
          () => {}
        )
      }
    },

    loginOut() {
      this.successPwdVisible = false
      window.location.href = '/api/gate/logout'
    },

    // 编辑页面
    goEdit(val) {
      this.accountInfo = val
      this.showAccountsVisible = false
    },

    // 多账号管理页
    goBack() {
      this.getAllAccountList()
      this.showAccountsVisible = true
    },

    // 表单初始化
    fromInit() {
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
    submitFormCallout(formCallout) {
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
              this.orgName = this.depName = ''
            },
            error => {
              if (error) {
                this.calloutFlag = false
                this.submitVisible = true
                this.callMag.title = '请勿重复提交调出申请'
                this.callMag.msg =
                  '在此之前，您已经提交过调出申请，请等待管理员审核完成后再操作！'
              }
            }
          )
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "index";
</style>
