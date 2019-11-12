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
          <i class="ico fa fa-phone"></i>
          <a href="">联系我们</a>
          <span style="margin-right: 8px;">欢迎您!</span>
          <span>运维人员</span>
          <i class="fa fa-sign-in fa-lg"></i>
<!--          <el-button size="mini" style="margin-left: 15px"-->
<!--                     v-show="pageBreadcrumb.length > 0"-->
<!--                     @click="goBack">返回</el-button>-->
<!--          <el-dropdown v-if="user" trigger="click" @command="handleCommand">-->
<!--            <span class="el-dropdown-link dropdown-trigger">{{user.name}}<i-->
<!--                    class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <el-dropdown-item command="logout"><i class="fa fa-sign-out dropdown-icon" aria-hidden="true"></i>退出登录-->
<!--              </el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
/**
   * Created by lxe on 2019-09-18.
   */
export default {
  components: {},
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
    }
  },
  methods: {
    goBack () {
      this.$emit('go-back')
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
