import roles from "./roles";

// onlyShowRoles: [], // 仅仅显示的角色, 如果这个没有就代表所有的角色都显示，都能访问

import Blank from "@src/views/blank.vue";

// 菜单配置例子
const menuConfigExample = {
    // 是否隐藏，隐藏的话就代表这个不显示，相当于不是菜单
    hidden: true,
    meta: {
        // 这个呢是菜单的标题
        title: "",
        // 如果有了这个，就使用这个作为 breadcrumb, 否则了就自动根据菜单来渲染
        breadcrumb: [],
    },
    // 是否总是显示该菜单
    alwaysShow: false,
    // 不显示子菜单， 设置了这个的话， 这个菜单下面的所有子菜单都不显示
    noShowingChildren: false,

    // onlyRolesShow: [] 仅仅这些角色这显示，不写的话全部的都显示
    // onlyRolesNOShow: [] 这些角色不显示、不写的话全部的都显示
    // 两个同时存在时， 以 onlyShowRoles 为准
};
console.log(menuConfigExample);

export default [
    {
        path: "/no-right",
        name: "noRight",
        hidden: true,
        component: () =>
            import(
                /* webpackChunkName: "SystemSetting" */ "@src/views/no-right/index.vue"
            ),
        meta: {
            breadcrumb: [{ name: "无权限" }],
            meta: "无权限",
        },
    },
    // 首页
    {
        path: "/",
        name: "default",
        meta: { title: "首页" },
        redirect: "/homePage",
        component: Blank,
        children: [
            {
                path: "/homePage",
                name: "HomePage",
                meta: { title: "" },
                component: () =>
                    import(
                        /* webpackChunkName: "HomePage" */ "@src/views/homePage/index.vue"
                    ),
            },
            {
                path: "/moreAnnoument",
                name: "MoreAnnoument",
                component: () =>
                    import(
                        /* webpackChunkName: "HomePage" */ "@src/views/moreAnnoument/index.vue"
                    ),
                hidden: true,
                meta: {
                    breadcrumb: [{ name: "平台公告" }],
                    meta: "平台公告",
                    activeMenu: "/homePage",
                },
            },
            {
                path: "/moreAnnoument/announceDetail",
                name: "AnnounceDetail",
                hidden: true,
                component: () =>
                    import(
                        /* webpackChunkName: "HomePage" */ "@src/views/moreAnnoument/announceDetail/index.vue"
                    ),
            },
        ],
    },

    // 数据统计
    {
        path: "/data-statistics",
        name: "SharedManage",
        meta: { title: "数据统计", icon: "fa fa-bar-chart-o" },
        component: () =>
            import(
                /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/index.vue"
            ),
        onlyRolesShow: [
            roles.super,
            roles.province,
            roles.city,
            roles.county,
            roles.unit,
        ],
        alwaysShow: true,
        children: [
            {
                path: "/area-total",
                name: "AreaTotal",
                meta: { title: "区域汇总" },
                onlyRolesShow: [
                    roles.super,
                    roles.province,
                    roles.city,
                    roles.county,
                ],
                component: () =>
                    import(
                        /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/area-total/index.vue"
                    ),
            },
            {
                path: "/unit-total",
                name: "UnitTotal",
                meta: { title: "单位汇总" },
                onlyRolesShow: [
                    roles.super,
                    roles.province,
                    roles.city,
                    roles.roles,
                    roles.county,
                    roles.unit,
                ],
                component: () =>
                    import(
                        /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/unit-total/index.vue"
                    ),
            },
            {
                path: "/member-total",
                name: "MemberTotal",
                onlyRolesShow: [
                    roles.super,
                    roles.province,
                    roles.city,
                    roles.county,
                ],
                meta: { title: "人员明细" },
                component: () =>
                    import(
                        /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/member-total/index.vue"
                    ),
            },
        ],
    },

    // 我的应用情况
    {
        path: "/my-application",
        name: "MyApplication",
        meta: { title: "我的应用情况", icon: "fa fa-bar-chart-o" },
        component: () =>
            import(
                /* webpackChunkName: "HomePage" */ "@src/views/my-application/index.vue"
            ),
    },

    // 数据模板
    {
        path: "/data-template",
        name: "DataTemplate",
        meta: { title: "数据模板", icon: "el-icon-set-up" },
        onlyRolesShow: [roles.super, roles.unit],
        component: () =>
            import(
                /* webpackChunkName: "DataTemplate" */ "@src/views/data-template/index.vue"
            ),
    },

    // 考核情况查询
    {
        path: "/assessment",
        name: "Assessment",
        meta: { title: "考核情况查询", icon: "el-icon-set-up" },
        onlyRolesShow: [
            roles.super,
            roles.city,
            roles.county,
            roles.province,
            roles.unit,
        ],
        component: () =>
            import(
                /* webpackChunkName: "Assessment" */ "@src/views/assessment/index.vue"
            ),
    },

    // 共享管理
    {
        path: "/shared-manage",
        name: "SharedManage",
        meta: { title: "共享管理", icon: "fa fa-address-card-o" },
        onlyRolesShow: [roles.super, roles.sys],
        alwaysShow: true,
        component: () =>
            import(
                /* webpackChunkName: "Shared" */ "@src/views/share-manage/index.vue"
            ),

        children: [
            {
                path: "/related-manage",
                name: "CountManage",
                meta: { title: "关联管理" },
                component: () =>
                    import(
                        /* webpackChunkName: "Shared" */ "@src/views/share-manage/related-manage/index.vue"
                    ),
            },
            {
                path: "/app-manage",
                name: "AppManage",
                meta: { title: "应用接入" },
                component: () =>
                    import(
                        /* webpackChunkName: "Shared" */ "@src/views/share-manage/app-manage/index.vue"
                    ),
            },
            {
                path: "/share-data-manage",
                name: "ShareDataManage",
                meta: { title: "共享数据" },
                component: () =>
                    import(
                        /* webpackChunkName: "Shared" */ "@src/views/share-manage/share-data-manage/index.vue"
                    ),
            },
        ],
    },

    // 系统设置
    {
        path: "/setting",
        name: "SysSetting",
        meta: { title: "系统设置", icon: "fa fa-cogs" },
        component: Blank,
        alwaysShow: true,
        children: [
            {
                path: "/message-reminding",
                name: "MessageReminding",
                meta: { title: "通知提醒" },
                onlyRolesShow: [roles.super, roles.unit],
                component: () =>
                    import(
                        /* webpackChunkName: "MessageReminding" */ "@src/views/system-setting/message-reminding/index.vue"
                    ),
                // children: [
                //     {
                //         hidden: true,
                //         path: "/message-reminding/message-rules",
                //         name: "MessageRules",
                //         // meta: { title: "通知规则设置" },
                //         component: () =>
                //             import(
                //                 /* webpackChunkName: "MessageReminding" */ "@src/views/system-setting/message-reminding/message-rules/index.vue"
                //             ),
                //         meta: { activeMenu: "/message-reminding" },
                //     },
                // ],
            },
            {
                onlyRolesShow: [roles.super, roles.unit],
                hidden: true,
                path: "/message-reminding/message-rules",
                name: "MessageRules",
                meta: { title: "通知规则设置" },
                component: () =>
                    import(
                        /* webpackChunkName: "MessageReminding" */ "@src/views/system-setting/message-reminding/message-rules/index.vue"
                    ),
            },
            {
                meta: { title: "权限管理" },
                path: "/role-manage",
                component: () =>
                    import(
                        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting/role-manage/index.vue"
                    ),
                onlyRolesShow: [
                    roles.super,
                    roles.province,
                    roles.city,
                    roles.county,
                    roles.secrecy,
                ],
                children: [
                    {
                        path: "",
                        name: "RoleList",
                        hidden: true,
                        component: () =>
                            import(
                                /* webpackChunkName: "RoleManage" */ "@src/views/system-setting/role-manage/role-list/index.vue"
                            ),
                        meta: { activeMenu: "/role-manage" },
                    },
                    {
                        path: "look-person-permission/:roleId/:roleName",
                        name: "lookPersonPermission",
                        hidden: true,
                        component: () =>
                            import(
                                /* webpackChunkName: "RoleManage" */ "@src/views/system-setting/role-manage/look-person-permission/index.vue"
                            ),
                        meta: { activeMenu: "/role-manage" },
                    },
                    {
                        path: "scope-authorization/:roleId/:uid/:roleName",
                        name: "ScopeAuthorization",
                        hidden: true,
                        meta: { activeMenu: "/role-manage" },
                        component: () =>
                            import(
                                /* webpackChunkName: "RoleManage" */ "@src/views/system-setting/role-manage/scope-authorization/index.vue"
                            ),
                    },
                ],
            },
            {
                path: "/log-manage",
                name: "LogManage",
                meta: { title: "系统日志" },
                onlyRolesShow: [roles.sys, roles.super, roles.audit],
                component: () =>
                    import(
                        /* webpackChunkName: "SystemLog" */ "@src/views/system-setting/log-manage/index.vue"
                    ),
            },
            {
                path: "/help-center",
                name: "HelpCenter",
                meta: { title: "帮助中心" },
                component: () =>
                    import(
                        /* webpackChunkName: "HelpCenter" */ "@src/views/system-setting/help-center/index.vue"
                    ),
            },
        ],
    },
];
