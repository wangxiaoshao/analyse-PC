const DataTemplate = () =>
    import(
        /* webpackChunkName: "DataTemplate" */ "@src/views/data-template/index.vue"
    );
export default [
    {
        // 数据统计
        path: "/data-template",
        name: "DataTemplate",
        component: DataTemplate,
        // 配置key时打开
        // meta: {
        //     key: "menuDataTemplate",
        // },
    },
];
