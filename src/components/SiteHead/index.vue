<template>
  <div>
    <div class="site__head">
      <div class="site__head-content">
        <div class="site__head--center">
         <div class="logo"><img :src="app.option.options.systemLogo"></div>
          <div class="name"><h2>{{app.option.options.systemName || ''}}</h2></div>
        </div>
        <div class="site__head--right">
          <div style="display:inline-block;"  @click="showNotice" >
            <el-badge :value="msgNum" class="item" title="前往通知中心" style=" cursor: pointer;" >
            <i class="el-icon-bell"></i>
          </el-badge>
          </div>
          <i class="ico fa fa-file-text-o"></i>
          <a style="cursor: pointer" @click="goToWordCenter" href="javascript:void(0)">数据文档</a>
<!--          <i class="ico fa fa-phone"></i>-->
<!--          <a href="">联系我们</a>-->
          <span style="margin-right: 4px;">欢迎您!</span>
          <span>{{app.option.user.name || ''}}</span>

          <a
            style="cursor: pointer"
            class="ico fa fa-sign-in"
            title="退出登录"
            target="_self"
            :href="logoutURL"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
/**
   * Created by lxe on 2019-09-18.
   */
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Head',
  components: {},
  props:['breadcrumb','pageBreadcrumb','msgNum'],
  // props: {
  //   breadcrumb: {
  //     type: Array,
  //     default () {
  //       return []
  //     }
  //   },
  //   pageBreadcrumb: {
  //     type: Array,
  //     default () {
  //       return []
  //     }
  //   },
  //    msgNum: {
  //     type: Number
  //   }
  // },
  data () {
    return {
      logoutURL: '',
      url: window.location.host,
    }
  },
  computed: {
    ...mapState(['app'])

  },
  created () {
    this.logoutURL = '/api/gate/logout'
  },
  methods: {
    goBack () {
      this.$emit('go-back')
    },

    goToWordCenter () {
      if (this.$route.name !== 'WordCenter') {
        this.$router.push('/word-center')
      }
    },
    showNotice () {
      this.$emit('showNotice', true)
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.$store.dispatch('Logout').then(() => {
          this.$router.push({
            path: '/login'
          })
        })
      }
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>

