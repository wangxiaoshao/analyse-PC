/**
 * Created by luoxie on 2019-07-16.
 */
import "babel-polyfill";
import Vue from "vue";
import App from "./views/app";
// import routerList from './router'
import store from "./store";
import elementUI from "element-ui";
import "@src/common/element-style/index.css";
// import 'element-ui/lib/theme-chalk/index.css'
import "@src/common/style/index.less";
import "./ext/font-awesome-4.7.0/css/font-awesome.css";
import "@src/common/font_1568136_nu78g9xw7jp/iconfont.css";
import "@src/common/font_1568136_nu78g9xw7jp/iconfont.js";
import "@src/common/font_1568136_nu78g9xw7jp/icon.css";
import echarts from "echarts";
import VueCookies from "vue-cookie";
import "./filters";
import { api, urlNames } from "@src/api";
import initRouter from "@src/router/index";
// import visitLogger from '@src/router/views-logger'

Vue.use(VueCookies);
Vue.use(elementUI, {
    size: "medium",
});

Vue.prototype.$echarts = echarts;
// 请求权限配置参数
// let menusCtrl = []
api[urlNames["option"]]().then((res) => {
    let router = initRouter(res.data.menus);
    if (res.status === 0) {
        initVueInstance(router, res.data);
    } else {
        alert(res.message);
    }
});
Vue.directive("down", {
    inserted: (el, binding) => {
        el.style.cssText = "cursor: pointer;color:write;";
        el.addEventListener("click", () => {
            console.log(binding.value);
            let link = document.createElement("a");
            let url = binding.value;
            // 这里是将url转成blob地址，
            fetch(url)
                .then((res) => res.blob())
                .then((blob) => {
                    // 将链接地址字符内容转变成blob地址
                    link.href = URL.createObjectURL(blob);
                    console.log(link.href);
                    link.download = "";
                    document.body.appendChild(link);
                    link.click();
                });
        });
    },
});
// Vue.use(visitLogger, {
//   router: routerList,
//   serverUrl: '/api/meeting/logger/visit',
//   requestMethod: 'POST',
//   clientType: 2,
//   clientVersion: '1.0.0',
//   ignoreRouters: ['login']
// })

const initVueInstance = (router, options) => {
    new Vue({
        router,
        store,
        render: (h) => h(App),
        created() {
            this.$store.commit("SET_OPTION", options || {});
        },
    }).$mount("#app");
};
