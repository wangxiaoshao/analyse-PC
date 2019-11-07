import * as types from '../mutation-types'

const app = {
  state: {
    page: {},
    backInfo: {},
    treeId: null
  },
  mutations: {
    [types.SET_ORGANIZATION_PAGE] (state, val) {
      state.page = val
    },
    [types.SET_ORGANIZATION_BACK_INFO] (state, name) {
      state.backInfo = name
    },
    [types.SET_ORGANIZATION_NODEID] (state, val) {
      state.treeId = val
    }
  }
}

export default app
