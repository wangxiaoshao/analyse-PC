const DataStatistics = () =>
    import(
        /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/index.vue"
    );
const AreaTotal = () =>
    import(
        /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/area-total/index.vue"
    );
const UnitTotal = () =>
    import(
        /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/unit-total/index.vue"
    );
const MemberTotal = () =>
    import(
        /* webpackChunkName: "DataStatistics" */ "@src/views/data-statistics/member-total/index.vue"
    );
export default [
    {
        path: "/data-statistics",
        name: "SharedManage",
        component: DataStatistics,
        children: [
            {
                path: "/area-total",
                name: "AreaTotal",
                component: AreaTotal,
            },
            {
                path: "/unit-total",
                name: "UnitTotal",
                component: UnitTotal,
            },
            {
                path: "/member-total",
                name: "MemberTotal",
                component: MemberTotal,
                // meta: {
                //     key: "menuLabels",
                // },
            },
        ],
    },
];
