const HomePage = () =>
    import(/* webpackChunkName: "HomePage" */ "@src/views/homePage/index.vue");
const MoreAnnoument = () =>
    import(
        /* webpackChunkName: "HomePage" */ "@src/views/moreAnnoument/index.vue"
    );
const AnnounceDetail = () =>
    import(
        /* webpackChunkName: "HomePage" */ "@src/views/moreAnnoument/announceDetail/index.vue"
    );
const MyApplication = () =>
    import(
        /* webpackChunkName: "HomePage" */ "@src/views/my-application/index.vue"
    );
export default [
    {
        path: "/homePage",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/moreAnnoument",
        name: "MoreAnnoument",
        component: MoreAnnoument,
        meta: {
            breadcrumb: [{ name: "平台公告" }],
        },
    },
    {
        path: "/moreAnnoument/announceDetail",
        name: "AnnounceDetail",
        component: AnnounceDetail,
    },
    {
        path: "/my-application",
        name: "MyApplication",
        component: MyApplication,
    },
];
