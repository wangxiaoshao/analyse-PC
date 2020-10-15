const DataStatistics = () =>
    import(
        /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/index.vue"
    );
export default [
    {
        // 数据统计
        path: "/data-statistics",
        name: "DataStatistics",
        component: DataStatistics,
        meta: {
            key: "menuStatisticsData",
        },
    },
];
