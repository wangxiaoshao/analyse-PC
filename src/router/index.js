import Vue from "vue";
import VueRouter from "vue-router";
import AllRoutes from "./routes";

// import roles from "./roles";

import path from "path";

Vue.use(VueRouter);

/**
 *
 * @param {*} userInfo 用户信息
 */
const initRouter = (userInfo) => {
    let roleId = userInfo.roleId;

    // // 超级管理员和系统管理员权限一样
    // if (roleId === roles.super) {
    //     roleId = roles.sys;
    // }
    const routes = getRouters(AllRoutes, roleId);

    // 所有的路由path、用来做无权限提示，不是的话相当于404页面
    const allRoutePaths = [];
    getRoutePaths(AllRoutes, allRoutePaths);

    let router = new VueRouter({
        base: "static/work/admin",
        routes: routes,
        mode: "hash",
    });

    router.beforeEach((to, from, next) => {
        let route = to.matched[0];
        if (!route) {
            // 没有找到
            if (allRoutePaths.includes(to.path)) {
                return next("/no-right");
            }
            // 404
            return router.back();
        }
        next();
    });

    return router;
};

/**
 *
 * @param {*} routes
 * @param {*} roleId
 */
function getRouters(routes, roleId) {
    if (!(Array.isArray(routes) && routes.length)) {
        return;
    }

    const result = [];
    routes.map((route) => {
        // 仅仅这些角色这显示
        if (route.onlyRolesShow) {
            // route.onlyRolesShow.push(roleId);
            if (!route.onlyRolesShow.includes(roleId)) {
                return;
            }
        } else if (route.onlyRolesNOShow) {
            // 这些角色不显示
            if (route.onlyRolesNOShow.includes(roleId)) {
                return;
            }
        }
        // 都显示
        // 添加一个
        const addItem = {
            ...route,
            children: undefined,
        };

        addItem.children = getRouters(route.children, roleId);

        result.push(addItem);
    });

    return result;
}

/**
 * 获取的所有的 路由 path
 * @param {*} routes
 * @param {*} result
 * @param {*} basePath
 */
function getRoutePaths(routes, result, basePath = "") {
    if (Array.isArray(routes) && routes.length) {
        routes.map((route) => {
            const rpath = path.resolve(basePath, route.path);
            result.push(rpath);
            getRoutePaths(route.children, result, rpath);
        });
    }
}

export default initRouter;
