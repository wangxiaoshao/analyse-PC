const SystemLog = () =>
    import(
        /* webpackChunkName: "SystemLog" */ "@src/views/system-setting/log-manage/index.vue"
    );
export default [
    {
        path: "/log-manage",
        name: "SystemLog",
        component: SystemLog,
        // 配置key时打开
        // meta: {
        //     key: "menuSystemLog",
        // },
    },
];
