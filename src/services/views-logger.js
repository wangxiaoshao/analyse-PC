/**
 * 记录前端用户访问页面行为，实现成Vue插件方式，以Vue插件方式调用：
 *
 * import Vue from 'vue';
 * import router from './router';
 * import viewLogger from './services/views-logger';
 *
 * Vue.use(visitLogger, {
 *   router,
 *   serverUrl: '/api/meeting/logger/visit',
 *   requestMethod: 'POST',
 *   clientType: 2,
 *   clientVersion: VERSION,
 *   ignoreRouters: ['login'],
 * });
 */

import ajax from "axios";
// import ajax from '@src/api/interceptors'

// 记录页面访问堆栈
const stacks = [
    // {
    //   route,
    //   loggerId
    // }
];

function createLoggerId() {
    return `${Math.random()
        .toString(16)
        .substr(2, 12)}-${new Date().getTime().toString(16)}`;
}

function stackFromLoggerId(from) {
    let i = stacks.length;
    while (i > 0) {
        i -= 1;
        if (stacks[i].route === from) {
            const { loggerId } = stacks[i];
            stacks.splice(i, 1);
            return loggerId;
        }
    }

    return "";
}

function init({
    router, // 路由实例（vue-router实例）
    serverUrl, // api接口地址
    requestMethod, // 请求方法，默认POST
    clientType, // 终端类型
    clientVersion, // 终端版本号，每次打包上线必须不一样
    ignoreRouters, // 忽略的页面名称数组
}) {
    router.afterEach((to, from) => {
        /** @var {Router} router */
        /** @var {Route} from */
        /** @var {Route} to */
        const routeName = to.name;
        if (ignoreRouters && ignoreRouters.includes(routeName)) {
            return;
        }

        const loggerId = createLoggerId();
        const fromLoggerId = stackFromLoggerId(from);

        stacks.push({
            route: to,
            loggerId,
        });

        ajax(serverUrl, {
            method: requestMethod || "POST",
            params: {
                tip: false,
            },
            data: {
                loggerId, // 日志唯一标识符，以便分请上次请求与这次请求匹配
                fromLoggerId,
                routeName,
                fromRouteName: from ? from.name : "",
                params: JSON.stringify({
                    fullPath: to.fullPath,
                    hash: to.hash,
                    query: to.query,
                    params: to.params,
                }),
                clientType,
                clientVersion,
            },
        });
    });
}

export default {
    install(Vue, options) {
        init(options);
    },
};
