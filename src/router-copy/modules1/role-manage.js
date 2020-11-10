const RoleManage = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting/role-manage/index.vue"
    );
const RoleList = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting/role-manage/role-list/index.vue"
    );
const lookPersonPermission = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting/role-manage/look-person-permission/index.vue"
    );
const ScopeAuthorization = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting/role-manage/scope-authorization/index.vue"
    );
/* 路由 */
export default [
    // 角色管理
    {
        path: "/role-manage",
        component: RoleManage,
        meta: {
            key: "menuRoles",
        },
        children: [
            {
                path: "",
                name: "RoleList",
                component: RoleList,
            },
            {
                path: "look-person-permission/:roleId/:roleName",
                name: "lookPersonPermission",
                component: lookPersonPermission,
            },
            {
                path: "scope-authorization/:roleId/:uid/:roleName",
                name: "ScopeAuthorization",
                component: ScopeAuthorization,
            },
        ],
    },
];