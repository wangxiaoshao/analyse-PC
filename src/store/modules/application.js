import * as types from "../mutation-types";

const app = {
    state: {
        page: {},
        searchQuery: {},
    },
    mutations: {
        [types.SET_APPLICATION_PAGE](state, val) {
            state.page = val;
        },
        [types.SET_APPLICATION_SEARCH_QUERY](state, val) {
            state.searchQuery = val;
        },
    },
};

export default app;
