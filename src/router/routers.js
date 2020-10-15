import organization from "./modules/organization";
import examine from "./modules/examine";
import share from "./modules/share";
// import statistics from "./modules/statistics";
import system from "./modules/system";
import addresslist from "./modules/addresslist";
import certification from "./modules/certification";

// 平台分析
import homePage from "./modules1/homePage";
import dataStatistics from "./modules1/data-statistics";
import messageReminding from "./modules1/message-reminding";
import roleManage from "./modules1/role-manage";
import dataTemplate from "./modules1/data-template";
import systemLog from "./modules1/system-log";
import helpCenter from "./modules1/help-center";
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
    ...addresslist,
    ...certification,

    // 平台分析新页面路由
    ...homePage,
    ...dataStatistics,
    ...messageReminding,
    ...roleManage,
    ...dataTemplate,
    ...systemLog,
    ...helpCenter,
];
