import * as types from '../mutation-types'

const app = {
  state: {
    userInfo: null,
    windowHeight: document.body.offsetHeight,
    windowWidth: document.body.offsetWidth,
    breadcrumb: [],
    pageBreadcrumb: [],
    dicList: [],
    option: {},
    confirmState: ''
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
    },
    [types.DIC_LIST] (state, val) {
      state.dicList = val
    },
    [types.GET_OPTION] (state, val) {
      state.option = val
    },
    [types.GET_CONFIRM_INFO] (state, val) {
      state.confirmState = val
    }
  }
}

export default app
