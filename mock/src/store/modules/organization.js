import * as types from '../mutation-types'

const app = {
  state: {
    page: {},
    backInfo: {},
    treeId: null,
    tree: {}
  },
  mutations: {
    [types.SET_ORGANIZATION_PAGE] (state, val) {
      state.page = val
    },
    [types.SET_ORGANIZATION_BACK_INFO] (state, name) {
      state.backInfo = name
    },
    [types.SET_TREE_ID] (state, val) {
      state.tree = val
    }
  }
}

export default app
