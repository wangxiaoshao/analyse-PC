import * as types from '../mutation-types'

const app = {
  state: {
    userInfo: null,
    windowHeight: document.body.offsetHeight,
    windowWidth: document.body.offsetWidth,
    breadcrumb: [],
    pageBreadcrumb: []
  },
  mutations: {
    [types.SET_USER_INFO] (state, user) {
      state.userInfo = user
    },
    [types.SET_WINDOWHEIGHT] (state, val) {
      state.windowHeight = val
    },
    [types.SET_WINDOWWIDTH] (state, val) {
      state.windowWidth = val
    },
    [types.SET_BREADCRUMB] (state, val) {
      state.breadcrumb = val
    },
    [types.SET_PAGE_BREADCRUMB] (state, val) {
      state.pageBreadcrumb = val
    }
  }
}

export default app
