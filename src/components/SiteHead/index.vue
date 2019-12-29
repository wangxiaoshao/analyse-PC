<template>
  <div>
    <div class="site__head">
      <div class="site__head-content">
        <div class="site__head--center">
         <div class="logo"><img src="@src/common/images/logo.png"></div>
          <div class="name"><h2>组织机构人员管控平台</h2></div>
        </div>
        <div class="site__head--right">
          <i class="ico fa fa-file-text-o"></i>
          <a href="">数据文档</a>
<!--          <i class="ico fa fa-phone"></i>-->
<!--          <a href="">联系我们</a>-->
          <span style="margin-right: 4px;">欢迎您!</span>
          <span>{{app.option.user.name}}</span>
          <a href="/api/gate/logout" class="ico fa fa-sign-in"></a>
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
  components: {},
  computed: {
    ...mapState(['app'])
  },
  name: 'Head',
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
      logoutUrl: ''
    }
  },
  created () {
    this.getLoginOutUrl()
  },
  methods: {
    ...mapMutations(['GET_OPTION']),
    goBack () {
      this.$emit('go-back')
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
