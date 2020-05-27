const Shared = () =>
    import(/* webpackChunkName: "Shared" */ "@src/views/shared/index.vue");
const ViewManagement = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/view-management/index.vue"
    );
const CreateView = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/create-view/index.vue"
    );
const GroupManagement = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/group-management/index.vue"
    );
const GroupDetail = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/group-detail/index.vue"
    );
const AppManagement = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/app-management/index.vue"
    );
const CreateAppManagement = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/create-app-management/index.vue"
    );
const TagsManagement = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/tags-management/index.vue"
    );
const FieldsManagement = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/fields-management/index.vue"
    );
const PushLog = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/push-log/index.vue"
    );
const AppLogs = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/shared/app-logs/index.vue"
    );

export default [
    // 共享管理
    {
        path: "/shared",
        name: "Shared",
        component: Shared,
        children: [
            {
                path: "/view-management",
                name: "ViewManagement",
                component: ViewManagement,
                meta: {
                    key: "menuShareViews",
                },
            },
            {
                path: "/view-management/create-view/:id",
                name: "CreateView",
                component: CreateView,
            },
            {
                path: "/group-management",
                name: "GroupManagement",
                component: GroupManagement,
                meta: {
                    key: "menuGroups",
                },
            },
            {
                path: "/group-management/group-detail/:id/:type",
                name: "GroupDetail",
                component: GroupDetail,
            },
            {
                path: "/app-management",
                name: "AppManagement",
                component: AppManagement,
                meta: {
                    key: "menuShareApplication",
                },
            },
            {
                path: "/app-management/create-app-management",
                name: "CreateAppManagement",
                component: CreateAppManagement,
            },
            {
                path: "/app-management/push-log",
                name: "PushLog",
                component: PushLog,
            },
            {
                path: "/app-management/fields-management",
                name: "FieldsManagement",
                component: FieldsManagement,
            },
            {
                path: "/tags-mnagement",
                name: "TagsManagement",
                component: TagsManagement,
                meta: {
                    key: "menuLabels",
                },
            },
            {
                path: "/app-logs",
                name: "AppLogs",
                component: AppLogs,
                meta: {
                    key: "menuAppLogs",
                },
            },
        ],
    },
];
