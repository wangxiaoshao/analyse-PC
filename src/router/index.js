import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers'
Vue.use(VueRouter)

const initRouter = (menus) => {
  let router = new VueRouter({
    base: 'static/work/admin',
    routes,
    mode: 'hash'
  })
  router.beforeEach((to, from, next) => {
    let route = to.matched[0]
    if (route.meta && route.meta.key) {
      let flag = menus.find(item => {
        return item.moduleName === route.meta.key;
      });
      if (flag) {
        next()
      } else {
        next('/no-right')
      }
    } else {
      next()
    }
  })
  return router
}
export default initRouter
