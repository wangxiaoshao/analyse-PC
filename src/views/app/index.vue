<template>
  <div id="app">
    <el-container class="site-container">
      <el-header>
        <site-head :user="user"></site-head>
      </el-header>
      <el-container>
        <side-menu @select="select" :asideMenu="asideMenu" :defaultActive="asideMenuActive"></side-menu>
        <el-container class="site-block">
          <site-breadcrumb :breadcrumb="app.breadcrumb"
                           :pageBreadcrumb="app.pageBreadcrumb"
                           @go-back="goBack"></site-breadcrumb>
          <el-scrollbar :style="scrollStyle" class="site-scroll">
            <el-main id="siteMain"
                     class="site-main">
              <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-main>
          </el-scrollbar>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import sideMenu from '@src/components/SideMenu'
import siteHead from '@src/components/SiteHead'
import SiteBreadcrumb from '@src/components/SiteBreadcrumb.vue'
import asideMenu from '@src/config/menu'
import handleBreadcrumb from '@src/mixins/handleBreadcrumb'

export default {
  name: 'app',
  data () {
    return {
      user: null,
      userInfo: {},
      asideMenu: asideMenu
    }
  },
  mixins: [handleBreadcrumb],
  components: { sideMenu, siteHead, SiteBreadcrumb },
  watch: {
    $route (newVal) {
      this.SET_PAGE_BREADCRUMB([])
    }
  },
  computed: {
    ...mapState(['app']),
    asideMenuActive () {
      if (this.app.breadcrumb.length > 0) {
        return this.app.breadcrumb[this.app.breadcrumb.length - 1].menuId.toString()
      }
    },
    scrollStyle () {
      return {
        height: (this.app.windowHeight - 123) + 'px',
        width: '100%'
      }
    }
  },
  created () {
    let path = location.hash.replace('#', '')
    this.findMenuByPath(this.asideMenu.list, path, 0)
    this.SET_BREADCRUMB(this.breadcrumb)
    this.SET_WINDOWHEIGHT(document.body.offsetHeight)
    this.SET_WINDOWWIDTH(document.body.offsetWidth)
  },
  mounted () {
    this.addEventListenForResize()
    this.getUserInfo()
  },
  methods: {
    ...mapMutations(['SET_USER_INFO', 'SET_WINDOWHEIGHT', 'SET_WINDOWWIDTH', 'SET_PAGE_BREADCRUMB']),
    goBack () {
      let breadcrumb = [...this.app.pageBreadcrumb]
      let currentPage = breadcrumb[breadcrumb.length - 1]
      breadcrumb.splice(-1, 1)
      this.SET_PAGE_BREADCRUMB(breadcrumb)
      this.$router.push(currentPage.parent)
    },
    getUserInfo () {
      api[urlNames.getUserInfo]().then((res) => {
        this.user = res.user
        this.SET_USER_INFO(res.user)
      }).catch((e) => {
      })
    },
    setWindowSize () {
      this.SET_WINDOWHEIGHT(document.body.offsetHeight)
      this.SET_WINDOWWIDTH(document.body.offsetWidth)
    },
    addEventListenForResize () {
      window.onresize = () => {
        // 加定时器，300ms之后重新赋值，避免大量触发resize
        if (!this.timer) {
          this.timer = true
          setTimeout(() => {
            this.setWindowSize()
            this.timer = false
          }, 300)
        }
      }
    },
    select (code, menu) {
      this.breakLoop = false
      this.breadcrumb = []
      this.findMenuByPath(this.asideMenu.list, menu.path, 0)
      this.$router.push(menu.path)
      this.SET_BREADCRUMB(this.breadcrumb)
    }
  }
}
</script>

<style lang="less">
  @import "./index";
</style>
