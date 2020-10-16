const SharedManage = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/share-manage/index.vue"
    );
const AppManage = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/share-manage/app-manage/index.vue"
    );
const CountManage = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/share-manage/count-manage/index.vue"
    );
const ShareDataManage = () =>
    import(
        /* webpackChunkName: "Shared" */ "@src/views/share-manage/share-data-manage/index.vue"
    );
export default [
    // 共享管理
    {
        path: "/shared-manage",
        name: "SharedManage",
        component: SharedManage,
        children: [
            {
                path: "/app-manage",
                name: "AppManage",
                component: AppManage,
                // meta: {
                //     key: "menuShareViews",
                // },
            },
            // {
            //     path: "/view-management/create-view/:id",
            //     name: "CreateView",
            //     component: CreateView,
            // },
            {
                path: "/count-manage",
                name: "CountManage",
                component: CountManage,
                // meta: {
                //     key: "menuGroups",
                // },
            },
            {
                path: "/share-data-manage",
                name: "ShareDataManage",
                component: ShareDataManage,
                // meta: {
                //     key: "menuLabels",
                // },
            },
        ],
    },
];
