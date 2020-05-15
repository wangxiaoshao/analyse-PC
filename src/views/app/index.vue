<template>
  <div id="app">
    <el-container class="site-container">
      <el-header>
        <site-head :user="user"></site-head>
      </el-header>
      <el-container>
        <side-menu @select="select" :asideMenu="asideMenu" :defaultActive="asideMenuActive"></side-menu>
        <el-container class="site-block">
          <site-breadcrumb
            :breadcrumb="app.breadcrumb"
            :pageBreadcrumb="app.pageBreadcrumb"
            :noticeShowBtn='app.noticeShowBtn'
            @go-back="goBack"
            @goHome='goHome'
          ></site-breadcrumb>
          <el-scrollbar :style="scrollStyle" class="site-scroll">
            <el-main id="siteMain" class="site-main">
              <transition name="fade-transform" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-main>
          </el-scrollbar>
        </el-container>
      </el-container>
    </el-container>
    <!--    <login></login>-->
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import sideMenu from '@src/components/SideMenu'
import siteHead from '@src/components/SiteHead'
import Notice from '@src/components/Notice'
import SiteBreadcrumb from '@src/components/SiteBreadcrumb.vue'
import asideMenu from '@src/config/menu'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb'
import login from '@src/views/login/index'
export default {
  name: 'app',
  data () {
    return {
      scrollPage: true,
      user: null,
      userInfo: {},
      asideMenu: asideMenu,
      asideMenuActive: '0'
    }
  },
  mixins: [handleBreadcrumb],
  components: { sideMenu, siteHead, SiteBreadcrumb, login, Notice },
  watch: {
    $route (newVal, oldVal) {
      const custom = this.$route.meta.breadcrumb
      if (Array.isArray(custom)) {
        this.breadcrumb = custom
        this.asideMenuActive = '0'
        this.SET_BREADCRUMB(this.breadcrumb)
      }

      // if (oldVal.path !== '/' && newVal.path !== '/') {
      let newModule = newVal.path.split('/')[1]
      let oldModule = oldVal.path.split('/')[1]
      this.SET_PAGE_BREADCRUMB([])
      if (newModule !== oldModule) {
        this.init(newVal.path, Array.isArray(custom))
      }
      // }
      // if (newVal.matched[0].path === '/organization') {
      //   this.scrollPage = false
      // } else {
      //   this.scrollPage = true
      // }
    }
  },
  computed: {
    ...mapState(['app']),
    scrollStyle () {
      return {
        height: this.app.windowHeight - 123 + 'px',
        width: '100%'
      }
    }
  },
  created () {
    let path = location.hash.replace('#', '')
    // this.init(path)
  },
  mounted () {
    this.addEventListenForResize()
    this.getDicList()
    this.confirmInfo()
  },
  methods: {
    ...mapMutations([
      'SET_USER_INFO',
      'SET_WINDOWHEIGHT',
      'SET_WINDOWWIDTH',
      'SET_PAGE_BREADCRUMB',
      'DIC_LIST',
      'GET_CONFIRM_INFO'
    ]),
    // isCustomBreadcrumb 是否用户定制的
    init (path, isCustomBreadcrumb) {
      // 在初始化菜单是，手动将breakLoop置为false，否则findMenuByPath不进入循环
      this.breakLoop = false
      const custom = this.$route.meta.breadcrumb

      if (!isCustomBreadcrumb) {
        this.findMenuByPath(this.asideMenu.list, path, 0)
        if (this.breadcrumb.length > 0) {
          this.asideMenuActive = this.breadcrumb[
            this.breadcrumb.length - 1
          ].menuId.toString()
        }
      }

      this.SET_BREADCRUMB(this.breadcrumb)
      this.SET_WINDOWHEIGHT(document.body.offsetHeight)
      this.SET_WINDOWWIDTH(document.body.offsetWidth)
    },
    goBack () {
      let breadcrumb = [...this.app.pageBreadcrumb]
      let currentPage = breadcrumb[breadcrumb.length - 1]
      breadcrumb.splice(-1, 1)
      this.SET_PAGE_BREADCRUMB(breadcrumb)
      if (currentPage.parent) {
        this.$router.push(currentPage.parent)
      } else {
        this.$router.go(-1)
      }
    },
    goHome () {
      // this.SET_PAGE_BREADCRUMB(breadcrumb)
      this.app.noticeShowBtn = false
      this.$router.go(-1)
    },

    getDicList () {
      api[urlNames['dicList']]().then(res => {
        this.DIC_LIST(res.data)
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
      this.breadcrumb = []
      // this.findMenuByPath(this.asideMenu.list, menu.path, 0)
      this.$router.push(menu.path)
      // this.SET_BREADCRUMB(this.breadcrumb)
    },
    confirmInfo () {
      // 确认信息弹框是否弹出
      api[urlNames.popupWindow]()
        .then(res => {
          res.data ? this.openConfirmInfo() : ''
          this.GET_CONFIRM_INFO(res.data)
        })
        .catch(e => {})
    },
    openConfirmInfo () {
      // 处理全局的确认弹框信息
      let getLoc = JSON.parse(localStorage.getItem('isShowConfirmDialog')) || {}
      let date = getLoc.date ? getLoc.date : false
      let currentDate = this.$options.filters['date'](
        new Date().getTime(),
        'yyyy-MM-dd'
      )
      let isAlreadyShow = getLoc.isAlreadyShow || false
      if (date === currentDate && isAlreadyShow) {
        // 不弹框
        return false
      }
      this.$confirm('当月未确认信息，是否前去确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({
            path: '/confirm-info'
          })
          this.openLocalStorage()
        })
        .catch(() => {
          this.openLocalStorage()
        })
    },
    openLocalStorage () {
      let isShowConfirmDialog = {
        date: this.$options.filters['date'](new Date().getTime(), 'yyyy-MM-dd'),
        isAlreadyShow: true
      }
      localStorage.setItem(
        'isShowConfirmDialog',
        JSON.stringify(isShowConfirmDialog)
      )
    }
  }
}
</script>

<style lang="less">
@import './index';
.site-main {
  background: #fff;
}
</style>
