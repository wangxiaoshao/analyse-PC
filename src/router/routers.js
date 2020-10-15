import organization from "./modules/organization";
import examine from "./modules/examine";
import share from "./modules/share";
import statistics from "./modules/statistics";
import dataStatistics from "./modules/data-statistics";
import system from "./modules/system";
import roleManage from "./modules/role-manage";
import addresslist from "./modules/addresslist";
import homePage from "./modules/homePage";
import certification from "./modules/certification";

const noRight = () =>
    import(
        /* webpackChunkName: "SystemSetting" */ "@src/views/no-right/index.vue"
    );

// 通知中心
const Notification = () =>
    import(
        /* webpackChunkName: "SystemSetting" */ "@src/views/notification/index.vue"
    );

/* 路由 */
export default [
    {
        path: "/",
        name: "default",
        redirect: "/homePage",
    },
    {
        path: "/no-right",
        name: "noRight",
        component: noRight,
        meta: {
            breadcrumb: [{ name: "无权限" }],
        },
    },
    {
        path: "/notification",
        name: "notification",
        component: Notification,
        meta: {
            breadcrumb: [{ name: "通知中心" }],
        },
    },
    ...organization,
    ...examine,
    // ...statistics,
    ...system,
    ...share,
    ...roleManage,
    ...addresslist,
    ...homePage,
    ...certification,
    // 新页面路由
    ...dataStatistics,
];
