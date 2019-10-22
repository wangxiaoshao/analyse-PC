import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import application from './modules/application'
import organization from './modules/organization'

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
    organization
  }
})

export default store
