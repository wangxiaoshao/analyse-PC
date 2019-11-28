<template>
  <div class="person-detail-content" v-loading="loading">
    <!--步骤条-->
    <step :active="activeIndex" @getActive="getActive"></step>
   <el-container>
     <person-manage
       :user-audit-fields="app.option.options.userAuditFields"
       v-if="stepOneFlag"
       :disabledFlag="disabledFlag"
       :isShowEditFlag="isShowEditFlag"
       :user-detail="userInfo.user"
       :post-detail="userInfo.identity"
       :is-default-flag="isDefaultFlag"
       :old-user-info="oldUserInfo"
       :label-id="userInfo.labelId"
       :label-list="fromLabelList"
       @get-user="getUser"
       @get-post="getPost"
       @get-uid="getUid"
       @get-defauf="getDefaut"
       @get-label="getLabelId"
     ></person-manage>
     <!--账号管理-->
     <account-manage
       v-if="stepTwoFlag"
       :disabledFlag="disabledFlag"
       :isShowEditFlag="isShowEditFlag"
       :account-list="accountList"
       :user-info ="userInfo.user"
       :is-default-flag="isDefaultFlag"
       @get-account="getAccount"
       @get-back="getBack"
     ></account-manage>
   </el-container>
   <el-footer class="add-person-footer" v-if="this.$route.name === 'PersonDetail'">
      <el-button type="primary" @click="nextDetail" v-if="stepOneFlag">下一步</el-button>
      <el-button type="primary" @click="lastDetail" v-if="stepTwoFlag">上一步</el-button>
    </el-footer>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import personManage from '../components/PersonManage/index'
import accountManage from '../components/AccountManage/index'
import step from '../components/Step/index'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [ handleBreadcrumb ],
  components: {
    personManage, step, accountManage
  },
  data () {
    return {
      breadcrumb: {
        name: '人员详情',
        parent: null
      },
      loading: false,
      breadcrumbTitle: '',
      isShowEditFlag: false,
      disabledFlag: false,
      stepOneFlag: true,
      stepTwoFlag: false,
      openAddTagFlag: false,
      sendUserFlag: false,
      isDefaultFlag: false,
      activeIndex: 0,
      accountList: [],
      oldUserInfo: {},
      fromLabelList: [],
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
          type: null,
          userState: null,
          userType: null,
          ext01: '',
          ext02: '',
          ext03: ''
        }
      }
    }
  },
  mounted () {
    this.setBreadcrumbTitle()
  },
  created () {
    this.init()
  },
  comments: {
    ...mapState(['app'])
  },
  methods: {
    ...mapMutations(['GET_OPTION']),
    init () {
      if (this.$route.name === 'PersonAdd') {
        this.oldUserInfo = JSON.parse(JSON.stringify(this.userInfo))
        if (this.$route.params.id) {
          this.getUserDetail(this.$route.params.id)
        }
        api[urlNames['findViewNodeById']]({
          id: this.$route.params.parentId || this.$route.params.id
        }).then((res) => {
          if (res.data.nodeType === 2) {
            api[urlNames['findOrganizationById']]({
              id: res.data.bindId
            }).then((res) => {
              this.userInfo.identity.orgId = res.data.id
            }, (error) => {
              this.$message.error(`没有内容`)
            })
          }
          if (res.data.nodeType === 3) {
            api[urlNames['findDepartmentById']]({
              id: res.data.bindId
            }).then((res) => {
              this.userInfo.identity.departmentId = res.data.id
              this.userInfo.identity.orgId = res.data.orgId
            }, (error) => {
              this.$message.error(`没有内容`)
            })
          }
        }, (error) => {
          this.$message.error(`没有内容`)
        })
      } else {
        this.getUserDetail(this.$route.params.id)
        this.getIdentity()
      }
    },
    getUserDetail (id) {
      this.loading = true
      api[urlNames['findUserById']]({
        id: id
      }).then((res) => {
        // this.userInfo = res.data
        this.userInfo.user.name = res.data.name
        this.userInfo.user.idcard = res.data.idcard
        this.userInfo.user.mobile = res.data.mobile
        this.userInfo.user.mobile2 = res.data.mobile2
        this.userInfo.user.officePhone = res.data.officePhone
        this.userInfo.user.sex = res.data.sex
        this.userInfo.user.birthday = res.data.birthday
        this.userInfo.user.portraitUrl = res.data.portraitUrl
        this.userInfo.user.qualification = parseInt(res.data.qualification)
        this.userInfo.user.professionalTitle = res.data.professionalTitle
        this.userInfo.user.positionClass = parseInt(res.data.positionClass)
        this.userInfo.user.nation = parseInt(res.data.nation)
        this.userInfo.user.politicalParty = parseInt(res.data.politicalParty)
        this.userInfo.user.signed = res.data.signed
        /* this.userInfo.identity.type = parseInt(res.data.userType)
        this.userInfo.identity.postName = res.data.postName */
        this.userInfo.user.userState = res.data.userState
        this.userInfo.user.userType = parseInt(res.data.userType)
        if (this.$route.name === 'PersonEdit') {
          this.oldUserInfo = JSON.parse(JSON.stringify(this.userInfo))
          this.userInfo.userId = res.data.uid
        }
        this.getUserAccount(res.data.uid)
        this.findLabel(res.data.uid, 3)
        this.loading = false
      }, (error) => {
        this.$message.error(`保存失败，请重试`)
      })
    },
    getUserAccount (userId) {
      api[urlNames['findUserAccountByUid']]({
        userId: userId
      }).then((res) => {
        this.userInfo.userAccount = res.data
        this.accountList = res.data
        console.log(res.data)
      }, (error) => {
      })
    },
    getIdentity () {
      api[urlNames['findIdentityById']]({
        identityId: this.$route.params.identityId
      }).then((res) => {
        console.log(res.data)
        this.userInfo.identity.departmentId = res.data.departmentId
        this.userInfo.identity.id = res.data.id
        this.userInfo.identity.orgId = res.data.orgId
        this.userInfo.identity.postName = res.data.postName
        this.userInfo.identity.type = parseInt(res.data.type)
        this.userInfo.identity.dutyName = res.data.dutyName
      }, (error) => {
        /* this.$message.error(`没有内容`) */
      })
    },
    findLabel (id, type) {
      api[urlNames['findLabel']]({
        id: id,
        type: type
      }).then((res) => {
        this.fromLabelList = res.data
      }, (error) => {
      })
    },
    getUser (val) { // 获取用户信息
      this.userInfo.user = val
      this.stepTwoFlag = true
      this.stepOneFlag = false
      this.activeIndex = 1
      this.sendUserFlag = true
      // this.submitForm()
    },
    // 绑定身份
    getPost (val) {
      this.userInfo.identity = val
      console.log(val)
    },
    // 获取账号
    getAccount (val) {
      // this.userInfo.userAccount = val
      this.userInfo.userAccount = val
      this.submitForm()
    },
    getUid (val) {
      this.getUserAccount(val)
      this.getUserDetail(val)
    },
    getDefaut (val) {
      this.isDefaultFlag = val
    },
    getLabelId (val) {
      this.userInfo.labelId = val
    },
    // 保存createUser
    submitForm () {
      api[urlNames['createUser']](this.userInfo).then((res) => {
        this.$message.success(`保存成功`)
        this.goBack()
        console.log(res)
      }, (error) => {
        this.$message.error(`保存失败，请重试`)
      })
    },
    // TODO breadcrumb可采用组件传参的模式替换路由判断，将配置权交给调用方
    setBreadcrumbTitle () { // 设置面包屑title
      if (this.$route.name === 'PersonAdd' || this.$route.name === 'PersonEdit') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'PersonEdit') {
          this.breadcrumb.name = '编辑人员'
        } else {
          this.breadcrumb.name = '添加人员'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumb.name = '人员详情'
      }
      this.pushBreadcrumb(this.breadcrumb)
    },
    getCheckTags () {
      this.openAddTagFlag = false
      this.tags = this.checkTagGroup
    },
    getBack () {
      this.stepTwoFlag = false
      this.stepOneFlag = true
      this.activeIndex = 0
    },
    goBack () {
      this.$router.go(-1)
    },
    getActive (val) {
      this.active = val
    },
    nextDetail () {
      this.stepTwoFlag = true
      this.stepOneFlag = false
      this.activeIndex = 1
    },
    lastDetail () {
      this.stepTwoFlag = false
      this.stepOneFlag = true
      this.activeIndex = 0
    }
  },
  watch: {
    stepTwoFlag (val) {
      if (val === true) {
        this.activeIndex = 1
      } else {
        this.activeIndex = 0
      }
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
