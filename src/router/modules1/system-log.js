const SystemLog = () =>
    import(
        /* webpackChunkName: "SystemLog" */ "@src/views/system-setting1/system-log/index.vue"
    );
export default [
    {
        // 数据统计
        path: "/system-log",
        name: "SystemLog",
        component: SystemLog,
        // 配置key时打开
        // meta: {
        //     key: "menuSystemLog",
        // },
    },
];
