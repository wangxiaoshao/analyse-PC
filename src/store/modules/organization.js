import * as types from '../mutation-types'

const app = {
  state: {
    page: {},
    tabActive: '下级设置',
    treeId: null
  },
  mutations: {
    [types.SET_ORGANIZATION_PAGE] (state, val) {
      state.page = val
    },
    [types.SET_ORGANIZATION_TAB_ACTIVE] (state, name) {
      state.tabActive = name
    },
    [types.SET_ORGANIZATION_NODEID] (state, val) {
      state.treeId = val
    }
  }
}

export default app
