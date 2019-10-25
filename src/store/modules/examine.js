import * as types from '../mutation-types'

const app = {
  state: {
    tableData: {},
    detail: {},
    backPath: {},
  },
  mutations: {
    [types.SET_EXAMINE_TABLEDATA] (state, val) {
      state.tableData = val
    },
    [types.SET_EXAMINE_DETAIL] (state, val) {
      state.detail = val
    },
    [types.SET_EXAMINE_SEARCH_QUERY] (state, val) {
      state.searchQuery = val
    },
    [types.SET_EXAMINE_BACKPATH] (state, val) {
      state.backPath = val
    }
  }
}

export default app
