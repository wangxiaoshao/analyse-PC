/**
 * Created by luoxie on 2019-07-16.
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './views/app'
import router from './router'
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
// import initRouter from '@src/router/index'
Vue.use(VueCookies)
Vue.use(elementUI, { size: 'medium' })

Vue.prototype.$echarts = echarts
// 请求权限配置参数
let menusCtrl = []
// api[urlNames['option']]().then((res) => {
//   initRouter(res.data.menus)
//   menusCtrl = res.data
// })

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // TODO 后端跳过单点登录，需要加上DEBUG_USER参数，正式环境需要去掉
    // this.$cookie.set('DEBUG_USER', '')
    // this.$cookie.set('SESSION', 'MWU5MTVhZGQtMDUyNy00MTZkLThlYjctOTcwOGVhNzE0YmE5')
    // if (process.env.NODE_ENV !== 'production') {
    //   this.$cookie.set('DEBUG_USER', '')
    // } else {
    //   this.$cookie.delete('DEBUG_USER')
    // }
  }
}).$mount('#app')
