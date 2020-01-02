import * as types from '../mutation-types'

const app = {
  state: {
    windowHeight: document.body.offsetHeight,
    windowWidth: document.body.offsetWidth,
    breadcrumb: [],
    pageBreadcrumb: [],
    dicList: [],
    option: {
      actions: [],
      menus: [],
      options: [],
      user: []
    },
    confirmState: ''
  },
  mutations: {
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
    [types.SET_OPTION] (state, val) {
      state.option = val
    },
    [types.GET_CONFIRM_INFO] (state, val) {
      state.confirmState = val
    }
  }
}

export default app
