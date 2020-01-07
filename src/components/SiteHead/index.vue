<template>
  <div>
    <div class="site__head">
      <div class="site__head-content">
        <div class="site__head--center">
         <div class="logo"><img :src="app.option.options.systemLogo"></div>
          <div class="name"><h2>{{app.option.options.systemName || ''}}</h2></div>
        </div>
        <div class="site__head--right">
          <i class="ico fa fa-file-text-o"></i>
          <a href="">数据文档</a>
<!--          <i class="ico fa fa-phone"></i>-->
<!--          <a href="">联系我们</a>-->
          <span style="margin-right: 4px;">欢迎您!</span>
          <span>{{app.option.user.name || ''}}</span>

          <a class="ico fa fa-sign-in" title="退出登录"  @click.prevent="goLogout"></a>
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
  props: {
    breadcrumb: {
      type: Array,
      default () {
        return []
      }
    },
    pageBreadcrumb: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      logoutUrl: '',
      url: window.location.host
    }
  },
  computed: {
    ...mapState(['app'])
    // systemName () {
    //   // return this.app.option.options.systemName
    //   return this.$store.state.app.option.options.systemName
    // }
  },
  created () {
    // this.getLoginOutUrl()
    // console.log('----------', this.$store)
    // console.log('this.$store.state.app.option.options', this.$store.state.app.option.options)
    // console.log('>>>> systemName', this.systemName)
  },
  methods: {
    goBack () {
      this.$emit('go-back')
    },
    goLogout () {
      api[urlNames['logout']]().then((res) => {

      })
    },
    getLoginOutUrl () {
      api[urlNames['logoutUrl']]({
      }).then((res) => {
        if (res.status === 0) {
          this.logoutUrl = res.data
        }
      })
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
