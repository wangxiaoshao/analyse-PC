<template>
  <div class="person-detail-content" v-loading="loading">
    <!--步骤条-->
    <step :active="activeIndex" @getActive="getActive"></step>
   <el-container>
     <person-manage
       v-if="stepOneFlag"
       :disabledFlag="disabledFlag"
       :isShowEditFlag="isShowEditFlag"
       :user-detail="userInfo.user"
       :post-detail="userInfo.userIdentity"
     ></person-manage>
     <!--账号管理-->
     <account-manage v-if="stepTwoFlag" :disabledFlag="disabledFlag" :isShowEditFlag="isShowEditFlag"></account-manage>
   </el-container>
   <el-footer class="add-person-footer">
      <el-button type="primary" @click="next" v-if="stepOneFlag">下一步</el-button>
      <el-button type="primary" @click="last" v-if="stepTwoFlag">上一步</el-button>
      <el-button type="primary" v-if="!disabledFlag">保存</el-button>
    </el-footer>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import personManage from '../components/PersonManage/index'
import accountManage from '../components/AccountManage/index'
import step from '../components/Step/index'
export default {
  mixins: [ handleBreadcrumb ],
  components: {
    personManage, step, accountManage
  },
  props: {
    // TODO breadcrumb可采用组件传参的模式替换路由判断，将配置权交给调用方
    breadcrumb: {
      type: Object,
      default () {
        return {
          name: '人员详情',
          parent: null
        }
      }
    }
  },
  data () {
    return {
      loading: false,
      breadcrumbTitle: '',
      isShowEditFlag: false,
      disabledFlag: false,
      stepOneFlag: true,
      stepTwoFlag: false,
      openAddTagFlag: false,
      activeIndex: 0,
      userInfo: {
        userAccount: [],
        labelId: [],
        userIdentity: [],
        userId: null,
        user: {
          birthday: null,
          nation: '',
          portraitUrl: '',
          sex: 1,
          mobile: '',
          politicalParty: '',
          qualification: '',
          positionClass: '',
          officePhone: '',
          idcard: '',
          mobile2: '',
          name: '',
          professionalTitle: '',
          type: null,
          userState: null,
          userType: null
        }
      },
      postInfo: {
        departmentId: '',
        postName: '',
        type: '',
        orgId: '',
        dutyName: ''
      }
    }
  },
  created () {
    this.setBreadcrumbTitle()
    if (this.$route.params.id) {
      this.getUserDetail()
    }
  },
  methods: {
    getUserDetail () {
      api[urlNames['findUserById']]({
        id: this.$route.params.id
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
        this.userInfo.user.qualification = res.data.qualification
        this.userInfo.user.professionalTitle = res.data.professionalTitle
        this.userInfo.user.positionClass = res.data.positionClass
        this.userInfo.user.nation = res.data.nation
        this.userInfo.user.politicalParty = res.data.politicalParty
        this.userInfo.user.signed = res.data.signed
        this.postInfo.type = res.data.userType
        this.postInfo.postName = res.data.postName
        this.userInfo.user.qualification = res.data.qualification
        this.userInfo.user.positionClass = res.data.positionClass
        this.userInfo.user.userState = res.data.userState
        this.userInfo.user.userType = res.data.userType
      }, (error) => {
        this.$message.error(`保存失败，请重试`)
      })
    },
    // TODO breadcrumb可采用组件传参的模式替换路由判断，将配置权交给调用方
    setBreadcrumbTitle () { // 设置面包屑title
      this.pushBreadcrumb(this.breadcrumb)
    },
    getCheckTags () {
      this.openAddTagFlag = false
      this.tags = this.checkTagGroup
    },
    next () {
      this.stepTwoFlag = true
      this.stepOneFlag = false
      this.activeIndex = 1
    },
    last () {
      this.stepTwoFlag = false
      this.stepOneFlag = true
      this.activeIndex = 0
    },
    goBack () {
      this.$emit('go-back')
    },
    getActive (val) {
      this.active = val
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
