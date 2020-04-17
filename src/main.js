/**
 * Created by luoxie on 2019-07-16.
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './views/app'
// import router from './router'
import store from './store'
import elementUI from 'element-ui'
import '@src/common/element-style/index.css'
// import 'element-ui/lib/theme-chalk/index.css'
import '@src/common/style/index.less'
import './ext/font-awesome-4.7.0/css/font-awesome.css'
import '@src/common/font_1568136_nu78g9xw7jp/iconfont.css'
import '@src/common/font_1568136_nu78g9xw7jp/iconfont.js'
import '@src/common/font_1568136_nu78g9xw7jp/icon.css'
import echarts from 'echarts'
import VueCookies from 'vue-cookie'
import './filters'
import { api, urlNames } from '@src/api'
import initRouter from '@src/router/index'

Vue.use(VueCookies)
Vue.use(elementUI, { size: 'medium' })

Vue.prototype.$echarts = echarts
// 请求权限配置参数
// let menusCtrl = []
api[urlNames['option']]().then((res) => {
  let router = initRouter(res.data.menus)
  if (res.status === 0) {
    initVueInstance(router, res.data)
  } else {
    alert(res.message)
  }
})

const initVueInstance = (router, options) => {
  new Vue({
    router,
    store,
    render: h => h(App),
    created () {
      this.$store.commit('SET_OPTION', options || {})
    }
  }).$mount('#app')
}
