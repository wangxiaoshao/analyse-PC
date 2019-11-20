/**
 * Created by luoxie on 2019-07-16.
 */
import 'babel-polyfill'
import Vue from 'vue'
import App from './views/app'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@src/common/style/index.less'
import './ext/font-awesome-4.7.0/css/font-awesome.css'
import echarts from 'echarts'
import VueCookies from 'vue-cookie'

Vue.use(VueCookies)
Vue.use(elementUI, { size: 'medium' })

Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // TODO 后端跳过单点登录，需要加上DEBUG_USER参数，正式环境需要去掉
    if (process.env.NODE_ENV !== 'production') {
      this.$cookie.set('DEBUG_USER', '')
    } else {
      this.$cookie.delete('DEBUG_USER')
    }
  }
}).$mount('#app')
