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
            path: "",
            type: 1,
            key: "menuHome",
            icon: "fa fa-bar-chart-o",
            list: [
                {
                    menuId: "0021",
                    name: "区域汇总",
                    path: "/area-total",
                    type: 1,
                    key: "menuHome",
                },
                {
                    menuId: "0022",
                    name: "单位汇总",
                    path: "/unit-total",
                    type: 1,
                    key: "menuHome",
                },
                {
                    menuId: "0023",
                    name: "人员明细",
                    path: "/member-total",
                    type: 1,
                    key: "menuHome",
                },
            ],
        },
        {
            menuId: "003",
            name: "我的应用情况",
            path: "/my-application",
            type: 1,
            key: "menuHome",
            icon: "fa fa-bar-chart-o",
            list: [],
        },
        // key:menuDataTemplate
        {
            menuId: "004",
            name: "数据模板",
            path: "/data-template",
            type: 1,
            key: "menuDataTemplate",
            icon: "el-icon-set-up",
            list: [],
        },
        // key:menuAssessment
        {
            menuId: "005",
            name: "考核情况查询",
            path: "/assessment",
            type: 1,
            key: "menuAssessment",
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
                    menuId: "0061",
                    name: "关联管理",
                    path: "/related-manage",
                    type: 1,
                    key: "menuHome",
                },
                {
                    menuId: "0062",
                    name: "应用接入",
                    path: "/app-manage",
                    type: 1,
                    key: "menuHome",
                },
                {
                    menuId: "0063",
                    name: "共享数据",
                    path: "/share-data-manage",
                    type: 1,
                    key: "menuHome",
                },
            ],
        },
        {
            menuId: "007",
            name: "系统设置",
            path: "",
            type: 1,
            key: ["menuMessageReminding", "menuRoleManage", "menuHome"],
            icon: "fa fa-cogs",
            list: [
                {
                    menuId: "0071",
                    name: "通知提醒",
                    path: "/message-reminding",
                    type: 1,
                    key: "menuMessageReminding",
                    icon: "el-icon-bell",
                    list: [],
                },
                {
                    menuId: "0072",
                    name: "权限管理",
                    path: "/role-manage",
                    type: 1,
                    key: "menuRoleManage",
                    icon: "el-icon-s-claim",
                    list: [],
                },
                {
                    menuId: "0073",
                    name: "系统日志",
                    path: "/system-log",
                    type: 1,
                    key: "menuSystemLog",
                    icon: "fa fa-address-book",
                    list: [],
                },
                {
                    menuId: "0074",
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
