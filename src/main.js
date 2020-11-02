/**
 * Created by luoxie on 2019-07-16.
 */
import "babel-polyfill";
import Vue from "vue";
import App from "./views/app";
// import routerList from "./router";
import store from "./store";
import elementUI from "element-ui";
import "@src/common/element-style/index.css";
// import 'element-ui/lib/theme-chalk/index.css'
import "@src/common/style/index.less";
import "./ext/font-awesome-4.7.0/css/font-awesome.css";
import "@src/common/font_1568136_nu78g9xw7jp/iconfont.css";
import "@src/common/font_1568136_nu78g9xw7jp/iconfont.js";
import "@src/common/font_1568136_nu78g9xw7jp/icon.css";
import VueCookies from "vue-cookie";
import "./filters";
// import { api, urlNames } from "@src/api";
import initRouter from "@src/router/index";
Vue.use(VueCookies);
Vue.use(elementUI, {
    size: "medium",
});
// 请求权限配置参数
// let menusCtrl = []
// api[urlNames["option"]]().then((res) => {
//     let router = initRouter(res.data.menus);
//     if (res.status === 0) {
//         initVueInstance(router, res.data);
//     } else {
//         alert(res.message);
//     }
// });
// const initVueInstance = (router, options) => {
//     new Vue({
//         router,
//         store,
//         render: (h) => h(App),
//         created() {
//             this.$store.commit("SET_OPTION", options || {});
//         },
//     }).$mount("#app");
// };

// api[urlNames["getUserRole"]]().then((res) => {
//     if (res.status === 0) {
//         let router = initRouter([]);
//         initVueInstance(router, res.data);
//     } else {
//         alert(res.message);
//     }
// });
// const initVueInstance = (router, userInfo) => {
//     new Vue({
//         router,
//         store,
//         render: (h) => h(App),
//         created() {
//             this.$store.commit("SET_ROLE_INFO", userInfo || {});
//         },
//     }).$mount("#app");
// };

let router = initRouter([]);
new Vue({
    router,
    store,
    render: (h) => h(App),
    created() {
        // api[urlNames["getUserRole"]]().then((res) => {
        //     if (res.status === 0) {
        //         this.$store.commit("SET_ROLE_INFO", res.data || {});
        //     } else {
        //         alert(res.message);
        //     }
        // });
    },
}).$mount("#app");
