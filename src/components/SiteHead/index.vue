<template>
  <div>
    <div class="site__head">
      <div class="site__head-content">
        <div class="site__head--center">
          <h2>组织机构人员管控平台</h2>
<!--          <el-breadcrumb class="site-breadcrumb" v-if="breadcrumb.length > 0">-->
<!--            <el-breadcrumb-item v-for="item in breadcrumb"-->
<!--                                class="breadcrumb-item"-->
<!--                                :key="item.menuId">{{item.name}}</el-breadcrumb-item>-->
<!--            <el-breadcrumb-item v-for="pageItem in pageBreadcrumb"-->
<!--                                class="breadcrumb-item">{{pageItem.name}}</el-breadcrumb-item>-->
<!--          </el-breadcrumb>-->
        </div>
        <div class="site__head--right" v-if="user">
          <span style="margin-right: 8px;">欢迎您</span>
          <span>{{user.name}}</span>
          <el-button size="mini" style="margin-left: 15px"
                     v-show="pageBreadcrumb.length > 0"
                     @click="goBack">返回</el-button>
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
    user: {
      type: Object,
      default () {
        return {}
      }
    },
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
