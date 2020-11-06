const HelpCenter = () =>
    import(
        /* webpackChunkName: "HelpCenter" */ "@src/views/system-setting/help-center/index.vue"
    );
export default [
    {
        path: "/help-center",
        name: "HelpCenter",
        component: HelpCenter,
        // 配置key时打开
        // meta: {
        //     key: "menuHelpCneter",
        // },
    },
];
