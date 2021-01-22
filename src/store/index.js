import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import application from './modules/application'

import examine from './modules/examine' // 申请审核
import roleManage from './modules/role-manage'
import preventReClick from './preventReClick.js'
Vue.use(Vuex)
Vue.use(preventReClick)
const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {},
  modules: {
    app,
    application,
    // 申请审核
    examine,
    roleManage
  }
})

export default store
