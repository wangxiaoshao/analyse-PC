import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import application from './modules/application'
import organization from './modules/organization'

import examine from './modules/examine' // 申请审核

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {

  },
  modules: {
    app,
    application,
    organization,
    // 申请审核
    examine
  }
})

export default store
