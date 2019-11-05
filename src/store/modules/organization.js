import * as types from '../mutation-types'

const app = {
  state: {
    page: {},
    tabActive: ''
  },
  mutations: {
    [types.SET_ORGANIZATION_PAGE] (state, val) {
      state.page = val
    },
    [types.SET_ORGANIZATION_TAB_ACTIVE] (state, val) {
      state.tabActive = val
    }
  }
}

export default app
