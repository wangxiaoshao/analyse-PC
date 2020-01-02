import Vue from 'vue'
import Router from 'vue-router'
import allRoutes from './routers'
Vue.use(Router)

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }
// const initRouter = (menus) => {
//   let routes = {}
//   let keys = Object.keys(allRoutes)
//   let len = keys.length
//   for (let i = 0; i < len; i++) {
//     let key = keys[i]
//     let route = allRoutes[key]
//     if (menus.indexOf(route.meta.name) > -1) {
//       routes[key] = route
//     }
//   }
//   return new Router({
//     base: 'static/work/admin',
//     routes,
//     mode: 'hash'
//   })
// }
export default new Router({
  base: 'static/work/admin',
  allRoutes,
  mode: 'hash'
})
