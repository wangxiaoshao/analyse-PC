const HelpCenter = () =>
    import(
        /* webpackChunkName: "HelpCenter" */ "@src/views/system-setting1/help-center/index.vue"
    );
export default [
    {
        // 数据统计
        path: "/help-center",
        name: "HelpCenter",
        component: HelpCenter,
        // 配置key时打开
        // meta: {
        //     key: "menuHelpCneter",
        // },
    },
];
