/**
 * Created by luoxie on 2019-09-18.
 * Des: 左侧菜单配置
 */
export default {
    list: [
        {
            menuId: "001",
            name: "首页",
            path: "/homePage",
            type: 1,
            key: "menuHome",
            icon: "fa fa-home",
            list: [],
        },
        // 权限控制key:menuStatisticsData 重新命名
        {
            menuId: "002",
            name: "数据统计",
            path: "/data-statistics",
            type: 1,
            key: "menuHome",
            icon: "fa fa-bar-chart-o",
            list: [],
        },

        // key:menuDataTemplate
        {
            menuId: "003",
            name: "数据模板",
            path: "/data-template",
            type: 1,
            key: "menuDataTemplate",
            icon: "el-icon-set-up",
            list: [],
        },
        // 共享管理
        {
            menuId: "006",
            name: "共享管理",
            path: "",
            type: 1,
            key: ["menuHome", "menuHome", "menuHome"],
            icon: "fa fa-address-card-o",
            list: [
                {
                    menuId: "0062",
                    name: "账号管理",
                    path: "/count-manage",
                    type: 1,
                    key: "menuHome",
                },
                {
                    menuId: "0063",
                    name: "应用接入",
                    path: "/app-manage",
                    type: 1,
                    key: "menuHome",
                },
                {
                    menuId: "0064",
                    name: "共享数据",
                    path: "/share-data-manage",
                    type: 1,
                    key: "menuHome",
                },
            ],
        },
        {
            menuId: "005",
            name: "系统设置",
            path: "",
            type: 1,
            key: ["menuMessageReminding", "menuRoleManage", "menuHome"],
            icon: "fa fa-cogs",
            list: [
                {
                    menuId: "0051",
                    name: "通知提醒",
                    path: "/message-reminding",
                    type: 1,
                    key: "menuMessageReminding",
                    icon: "el-icon-bell",
                    list: [],
                },
                {
                    menuId: "0052",
                    name: "权限管理",
                    path: "/role-manage",
                    type: 1,
                    key: "menuRoleManage",
                    icon: "el-icon-s-claim",
                    list: [],
                },
                {
                    menuId: "0053",
                    name: "系统日志",
                    path: "/system-log",
                    type: 1,
                    key: "menuSystemLog",
                    icon: "fa fa-address-book",
                    list: [],
                },
                {
                    menuId: "0054",
                    name: "帮助中心",
                    path: "/help-center",
                    type: 1,
                    key: "menuHelpCneter",
                    icon: "el-icon-first-aid-kit",
                    list: [],
                },
            ],
        },
    ],
};
