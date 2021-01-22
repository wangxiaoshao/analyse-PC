import * as types from '../mutation-types'

const app = {
  state: {
    page: {},
    listId: null,
    personPage: {},
    roleId: null
  },
  mutations: {
    [types.SET_ROLEMANAGE_PAGE] (state, val) {
      state.page = val
    },
    [types.PERSON_PAGE] (state, val) {
      state.personPage = val
    },
    [types.LIST_ID] (state, val) {
      state.listId = val
    },
    [types.ROLE_ID] (state, val) {
      state.roleId = val
    }
  }
}

export default app
