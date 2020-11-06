// import system from "./modules/system";
// 平台分析
import homePage from "./modules1/homePage";
import dataStatistics from "./modules1/data-statistics";
import messageReminding from "./modules1/message-reminding";
import roleManage from "./modules1/role-manage";
import dataTemplate from "./modules1/data-template";
import systemLog from "./modules1/system-log";
import helpCenter from "./modules1/help-center";
import shareManage from "./modules1/share-manage";
import assessment from "./modules1/assessment";
const noRight = () =>
    import(
        /* webpackChunkName: "SystemSetting" */ "@src/views/no-right/index.vue"
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
    // ...system,
    // 平台分析新页面路由
    ...homePage,
    ...dataStatistics,
    ...messageReminding,
    ...roleManage,
    ...dataTemplate,
    ...systemLog,
    ...helpCenter,
    ...shareManage,
    ...assessment,
];
