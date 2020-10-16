const RoleManage = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting1/role-manage/index.vue"
    );
const RoleList = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting1/role-manage/role-list/index.vue"
    );
const lookPersonPermission = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting1/role-manage/look-person-permission/index.vue"
    );
const PermissionSet = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting1/role-manage/permission-set/index.vue"
    );
const ScopeAuthorization = () =>
    import(
        /* webpackChunkName: "RoleManage" */ "@src/views/system-setting1/role-manage/scope-authorization/index.vue"
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
                path: "look-person-permission/:id",
                name: "lookPersonPermission",
                component: lookPersonPermission,
            },
            {
                path: "permission-set/:id",
                name: "PermissionSet",
                component: PermissionSet,
            },
            {
                path: "scope-authorization/:id",
                name: "ScopeAuthorization",
                component: ScopeAuthorization,
            },
        ],
    },
];
