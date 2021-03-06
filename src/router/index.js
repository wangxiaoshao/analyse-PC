import Vue from 'vue'
import VueRouter from 'vue-router'
import AllRoutes from './routes'

// import roles from "./roles";

import path from 'path'

Vue.use(VueRouter)

/**
 *
 * @param {*} userInfo 用户信息
 */
const initRouter = (userInfo) => {
  const roleId = userInfo.roleId
  const authorizedOid = userInfo.authorizedOid
  // // 超级管理员和系统管理员权限一样
  // if (roleId === roles.super) {
  //     roleId = roles.sys;
  // }
  const routes = getRouters(AllRoutes, roleId, authorizedOid)

  // 所有的路由path、用来做无权限提示，不是的话相当于404页面
  const allRoutePaths = []
  getRoutePaths(AllRoutes, allRoutePaths)

  const router = new VueRouter({
    base: 'static/work/admin',
    routes: routes,
    mode: 'hash'
  })

  router.beforeEach((to, from, next) => {
    const route = to.matched[0]
    if (!route) {
      // 没有找到
      if (allRoutePaths.includes(to.path)) {
        return next('/no-right')
      }
      // 404
      return router.back()
    }
    next()
  })

  return router
}

/**
 *
 * @param {*} routes
 * @param {*} roleId
 */
function getRouters (routes, roleId, authorizedOid) {
  if (!(Array.isArray(routes) && routes.length)) {
    return
  }

  const result = []
  routes.map((route) => {
    // 仅仅这些角色这显示
    if (route.onlyRolesShow) {
      if (!route.onlyRolesShow.includes(roleId)) {
        return false
      }
    } else if (route.onlyRolesNOShow) {
      // 这些角色不显示
      if (route.onlyRolesNOShow.includes(roleId)) {
        return false
      }
    }
    // 处理单位管理员授权范围不包含人民政府办公厅的菜单，如果包含才显示数据模板菜单（超管特殊放权），不包含就不显示
    if (route.customShow) {
      const flag = route.customShow(authorizedOid) || roleId === 1
      if (!flag) return false
    }
    // 都显示
    // 添加一个
    const addItem = {
      ...route,
      children: undefined
    }

    addItem.children = getRouters(route.children, roleId, authorizedOid)
    result.push(addItem)
    return false
  })
  return result
}

/**
 * 获取的所有的 路由 path
 * @param {*} routes
 * @param {*} result
 * @param {*} basePath
 */
function getRoutePaths (routes, result, basePath = '') {
  if (Array.isArray(routes) && routes.length) {
    routes.map((route) => {
      const rpath = path.resolve(basePath, route.path)
      result.push(rpath)
      getRoutePaths(route.children, result, rpath)
      return true
    })
  }
}

export default initRouter
