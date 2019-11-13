<template>
  <div class="person-detail-content" v-loading="loading">
    <!--步骤条-->
    <step :active="activeIndex" @getActive="getActive"></step>
   <el-container>
     <person-manage v-if="stepOneFlag" :disabledFlag="disabledFlag" :isShowEditFlag="isShowEditFlag"></person-manage>
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
      activeIndex: 0
    }
  },
  methods: {
    // TODO breadcrumb可采用组件传参的模式替换路由判断，将配置权交给调用方
    setBreadcrumbTitle () { // 设置面包屑title
      /*if (this.$route.name === 'PersonEdit' || this.$route.name === 'PersonAdd') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'NodeEdit') {
          this.breadcrumbTitle = '编辑人员'
        } else {
          this.breadcrumbTitle = '添加人员'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumbTitle = '人员详情'
      }*/
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
  },
  created () {
    this.setBreadcrumbTitle()
  },
  watch: {
    $route: {
      handler (val) {
        this.setBreadcrumbTitle()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
