import * as types from "../mutation-types";

const app = {
    state: {
        windowHeight: document.body.offsetHeight,
        windowWidth: document.body.offsetWidth,
        breadcrumb: [],
        noticeShowBtn: false,
        pageBreadcrumb: [],
        dicList: [],
        option: {
            actions: [],
            menus: [],
            options: [],
            // user: []
            user: {},
        },
        rolesInfo: {},
        confirmState: "",
    },
    mutations: {
        [types.SET_WINDOWHEIGHT](state, val) {
            state.windowHeight = val;
        },
        [types.SET_WINDOWWIDTH](state, val) {
            state.windowWidth = val;
        },
        [types.SET_BREADCRUMB](state, val) {
            state.breadcrumb = val;
        },
        [types.SET_PAGE_BREADCRUMB](state, val) {
            state.pageBreadcrumb = val;
        },
        [types.DIC_LIST](state, val) {
            state.dicList = val;
        },
        [types.GET_CONFIRM_INFO](state, val) {
            state.confirmState = val;
        },
        [types.SET_ROLE_INFO](state, val) {
            state.rolesInfo = val;
        },
    },
};

export default app;
