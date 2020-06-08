const DataStatistics = () =>
    import(
        /* webpackChunkName: "DataStatistics" */ "@src/views/statistics/data-statistics/index.vue"
    );
const DataLog = () =>
    import(
        /* webpackChunkName: "DataStatistics" */ "@src/views/statistics/data-log/index.vue"
    );

const Query = () =>
    import(/* webpackChunkName: "Query" */ "@src/views/query/index.vue");
const UnitQueryList = () =>
    import(
        /* webpackChunkName: "Query" */ "@src/views/query/components/UnitQueryList/index.vue"
    );
const DepartmentQueryList = () =>
    import(
        /* webpackChunkName: "Query" */ "@src/views/query/components/DepartmentQueryList/index.vue"
    );
const MemberQueryList = () =>
    import(
        /* webpackChunkName: "Query" */ "@src/views/query/components/MemberQueryList/index.vue"
    );

const QueryUnitDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/unit-detail/index.vue"
    );
const QueryPersonDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/person-detail/index.vue"
    );
const QueryDepartmentDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/department-detail/index.vue"
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
    {
        // 单位查询
        path: "/unit-query",
        component: Query,
        meta: {
            key: "menuSearchOrg",
        },
        children: [
            {
                path: "/",
                name: "UnitQueryList",
                meta: { prePath: "unit-query" },
                component: UnitQueryList,
            },
            // 单位详情
            {
                path: "unitDetail/:id",
                name: "QueryUnitDetail",
                component: QueryUnitDetail,
            },
        ],
    },
    {
        // 内设机构查询
        path: "/department-query",
        component: Query,
        meta: {
            key: "menuSearchDepartment",
        },
        children: [
            {
                path: "/",
                name: "DepartmentQueryList",
                meta: { prePath: "department-query" },
                component: DepartmentQueryList,
            },
            // 内设机构详情
            {
                path: "departmentDetail/:id",
                name: "QueryDepartmentDetail",
                component: QueryDepartmentDetail,
            },
        ],
    },
    {
        // 人员查询
        path: "/member-query",
        component: Query,
        meta: {
            key: "menuSearchUser",
        },
        children: [
            {
                path: "/",
                name: "MemberQueryList",
                meta: { prePath: "member-query" },
                component: MemberQueryList,
            },
            // 人员详情
            {
                path: "personDetail/:id/:identityId",
                name: "QueryPersonDetail",
                component: QueryPersonDetail,
            },
        ],
    },
    {
        // 系统日志
        path: "/data-log",
        name: "DataLog",
        component: DataLog,
        meta: {
            key: "menuLogging",
        },
    },
];
