import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

Vue.use(Router)


export default new Router({
  base: 'static/work/admin',
  routes,
  mode: 'hash'
})
