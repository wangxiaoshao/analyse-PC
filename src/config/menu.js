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

        // key:menuMessageReminding
        {
            menuId: "003",
            name: "通知提醒",
            path: "/message-reminding",
            type: 1,
            key: "menuHome",
            icon: "el-icon-bell",
            list: [],
        },

        // key:menuRoleManage
        {
            menuId: "004",
            name: "权限管理",
            path: "/role-manage",
            type: 1,
            key: "menuHome",
            icon: "el-icon-first-aid-kit",
            list: [],
        },

        // key:menuDataTemplate
        {
            menuId: "005",
            name: "数据模板",
            path: "/data-template",
            type: 1,
            key: "menuHome",
            icon: "el-icon-first-aid-kit",
            list: [],
        },

        // key:menuSystemLog
        {
            menuId: "006",
            name: "系统日志",
            path: "/system-log",
            type: 1,
            key: "menuHome",
            icon: "fa fa-address-book",
            list: [],
        },

        // key:menuHelpCneter
        {
            menuId: "007",
            name: "帮助中心",
            path: "/help-center",
            type: 1,
            key: "menuHome",
            icon: "el-icon-first-aid-kit",
            list: [],
        },
        // {
        //     menuId: "1",
        //     name: "信息管理",
        //     path: "/organization",
        //     type: 1,
        //     icon: "fa fa-sitemap",
        //     key: "menuOrgManage",
        //     // 'list': [{
        //     //   'menuId': '11',
        //     //   'name': '信息管理',
        //     //   'path': '/organization',
        //     //   'key': 'menuOrgManage',
        //     //   'type': 1
        //     // }
        //     // ]
        // },
        // {
        //     menuId: "12",
        //     name: "通讯录",
        //     path: "",
        //     type: 1,
        //     icon: "fa fa-address-book",
        //     key: ["menuAddrBookDept", "menuAddrBookAll"],
        //     list: [
        //         {
        //             menuId: "121",
        //             name: "本单位通讯录",
        //             path: "/address-list-dept",
        //             key: "menuAddrBookDept",
        //             type: 1,
        //         },
        //         {
        //             menuId: "122",
        //             name: "全省通讯录",
        //             path: "/address-list-all",
        //             key: "menuAddrBookAll",
        //             type: 1,
        //         },
        //     ],
        // },
        {
            menuId: "2",
            name: "信息审核",
            path: "",
            key: [
                "menuAuditWait",
                "menuAudited",
                "menuMyAudit",
                "menuOrgConfirm",
            ],
            type: 1,
            icon: "fa fa-check-square-o",
            list: [
                {
                    menuId: "21",
                    name: "待我审核",
                    path: "/wait-approval",
                    type: 1,
                    key: "menuAuditWait",
                },
                {
                    menuId: "22",
                    name: "我已审核",
                    path: "/approved",
                    type: 1,
                    key: "menuAudited",
                },
                {
                    menuId: "23",
                    name: "我的申请",
                    path: "/my-application",
                    type: 1,
                    key: "menuMyAudit",
                },
                {
                    menuId: "24",
                    name: "信息确认",
                    path: "/confirm-info",
                    type: 1,
                    key: "menuOrgConfirm",
                },
            ],
        },
        {
            menuId: "3",
            name: "共享管理",
            path: "",
            type: 1,
            key: [
                "menuShareViews",
                "menuGroups",
                "menuShareApplication",
                "menuAppLogs",
            ],
            icon: "fa fa-address-card-o",
            list: [
                {
                    menuId: "31",
                    name: "视图管理",
                    path: "/view-management",
                    type: 1,
                    key: "menuShareViews",
                },
                {
                    menuId: "34",
                    name: "应用管理",
                    path: "/app-management",
                    type: 1,
                    key: "menuShareApplication",
                },
                {
                    menuId: "32",
                    name: "分组管理",
                    path: "/group-management",
                    type: 1,
                    key: "menuGroups",
                },
                {
                    menuId: "35",
                    name: "应用日志查询",
                    path: "/app-logs",
                    type: 1,
                    key: "menuAppLogs",
                },
            ],
        },
        {
            menuId: "4",
            name: "统计管理",
            path: "",
            type: 1,
            icon: "fa fa-bar-chart-o",
            key: [
                "menuStatisticsData",
                "menuSearchOrg",
                "menuSearchDepartment",
                "menuSearchUser",
                "menuLogging",
            ],
            list: [
                {
                    menuId: "41",
                    name: "数据统计",
                    path: "/data-statistics",
                    type: 1,
                    key: "menuStatisticsData",
                },
                {
                    menuId: "42",
                    name: "数据查询",
                    key: [
                        "menuSearchOrg",
                        "menuSearchDepartment",
                        "menuSearchUser",
                    ],
                    path: "/data-query",
                    list: [
                        {
                            menuId: "421",
                            name: "单位查询",
                            path: "/unit-query",
                            type: 1,
                            key: "menuSearchOrg",
                        },
                        {
                            menuId: "422",
                            name: "内设机构查询",
                            path: "/department-query",
                            type: 1,
                            key: "menuSearchDepartment",
                        },
                        {
                            menuId: "423",
                            name: "人员查询",
                            path: "/member-query",
                            type: 1,
                            key: "menuSearchUser",
                        },
                    ],
                },
                {
                    menuId: "43",
                    name: "系统日志",
                    path: "/data-log",
                    type: 1,
                    key: "menuLogging",
                },
            ],
        },

        {
            menuId: "5",
            name: "系统设置",
            path: "",
            type: 1,
            icon: "fa fa-cogs",
            key: [
                "menuRoles",
                "menuDictionary",
                "menuPersonalInfo",
                "menuRightSetting",
                "menuPreferencesSetting",
                "menuWordCenter",
                "menuLabels",
            ],
            list: [
                {
                    menuId: "51",
                    name: "角色权限",
                    path: "/role-manage",
                    type: 1,
                    key: "menuRoles",
                },
                {
                    menuId: "52",
                    name: "字典管理",
                    path: "/dictionary-manage",
                    type: 1,
                    key: "menuDictionary",
                },
                {
                    menuId: "53",
                    name: "个人设置",
                    path: "/pass-change",
                    type: 1,
                    key: "menuPersonalInfo",
                },
                {
                    menuId: "54",
                    name: "功能配置",
                    path: "/authority-setting",
                    type: 1,
                    key: "menuRightSetting",
                },
                {
                    menuId: "33",
                    name: "标签管理",
                    path: "/tags-mnagement",
                    type: 1,
                    key: "menuLabels",
                },
                {
                    menuId: "55",
                    name: "偏好设置",
                    path: "/parameter-setting",
                    type: 1,
                    key: "menuPreferencesSetting",
                },
                {
                    menuId: "56",
                    name: "帮助中心",
                    path: "/word-center",
                    type: 1,
                    key: "menuDocumentCenter",
                    // 'key': 'menuWordCenter'
                },
                // 临时新增的静态界面，key 未申请，需要重新定义一个
                {
                    menuId: "57",
                    name: "认证方式",
                    path: "/certification",
                    type: 1,
                    key: "menuDocumentCenter",
                },
            ],
        },
    ],
};
