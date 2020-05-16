const WaitApproval = () =>
    import(
        /* webpackChunkName: "WaitApproval" */ "@src/views/wait-approval/index.vue"
    );
const WaitApprovalList = () =>
    import(
        /* webpackChunkName: "WaitApproval" */ "@src/views/wait-approval/WaitApprovalList/index.vue"
    );
const WaitApprovalDetail = () =>
    import(
        /* webpackChunkName: "WaitApproval" */ "@src/views/wait-approval/WaitApprovalDetail/index.vue"
    );
const Approved = () =>
    import(/* webpackChunkName: "Approved" */ "@src/views/approved/index.vue");
const ApprovedList = () =>
    import(
        /* webpackChunkName: "Approved" */ "@src/views/approved/ApprovedList/index.vue"
    );
const ApprovedDetail = () =>
    import(
        /* webpackChunkName: "Approved" */ "@src/views/approved/ApprovedDetail/index.vue"
    );
const MyApplication = () =>
    import(
        /* webpackChunkName: "MyApplication" */ "@src/views/my-application/index.vue"
    );
const MyApplicationList = () =>
    import(
        /* webpackChunkName: "MyApplication" */ "@src/views/my-application/MyApplicationList/index.vue"
    );
const MyApplicationDetail = () =>
    import(
        /* webpackChunkName: "MyApplication" */ "@src/views/my-application/MyApplicationDetail/index.vue"
    );
const ConfirmInfo = () =>
    import(
        /* webpackChunkName: "ConfirmInfo" */ "@src/views/confirm-info/index.vue"
    );
const ConfirmInfoList = () =>
    import(
        /* webpackChunkName: "ConfirmInfo" */ "@src/views/confirm-info/ConfirmInfoList/index.vue"
    );
const ConfirmInfoDetail = () =>
    import(
        /* webpackChunkName: "ConfirmInfo" */ "@src/views/confirm-info/ConfirmInfoDetail/index.vue"
    );

const WaitApprovalUnitDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/unit-detail/index.vue"
    );
const WaitApprovalPersonDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/person-detail/index.vue"
    );
const WaitApprovalDepartmentDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/department-detail/index.vue"
    );

const ApprovedUnitDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/unit-detail/index.vue"
    );
const ApprovedPersonDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/person-detail/index.vue"
    );
const ApprovedDepartmentDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/department-detail/index.vue"
    );

const MyApplicationUnitDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/unit-detail/index.vue"
    );
const MyApplicationPersonDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/person-detail/index.vue"
    );
const MyApplicationDepartmentDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/department-detail/index.vue"
    );

export default [
    {
        // 待我审核
        path: "/wait-approval",
        name: "WaitApproval",
        component: WaitApproval,
        children: [
            {
                path: "/",
                name: "WaitApprovalList",
                component: WaitApprovalList,
            },
            {
                path: "detail/:type/:id",
                name: "WaitApprovalDetail",
                meta: {
                    prePath: "wait-approval",
                    key: "menuAuditWait",
                },
                component: WaitApprovalDetail,
            },
            // 单位详情
            {
                path: "unitDetail/:id",
                name: "WaitApprovalUnitDetail",
                component: WaitApprovalUnitDetail,
            },
            // 人员详情
            {
                path: "personDetail/:id",
                name: "WaitApprovalPersonDetail",
                component: WaitApprovalPersonDetail,
            },
            // 内设机构详情
            {
                path: "departmentDetail/:id",
                name: "WaitApprovalDepartmentDetail",
                component: WaitApprovalDepartmentDetail,
            },
        ],
    },
    {
        // 我已审核
        path: "/approved",
        name: "Approved",
        component: Approved,
        meta: {
            key: "menuAudited",
        },
        children: [
            {
                path: "/",
                name: "ApprovedList",
                component: ApprovedList,
            },
            {
                path: "detail/:type/:id",
                name: "ApprovedDetail",
                meta: { prePath: "approved" },
                component: ApprovedDetail,
            },
            // 单位详情
            {
                path: "unitDetail/:id",
                name: "ApprovedUnitDetail",
                component: ApprovedUnitDetail,
            },
            // 人员详情
            {
                path: "personDetail/:id",
                name: "ApprovedPersonDetail",
                component: ApprovedPersonDetail,
            },
            // 内设机构详情
            {
                path: "departmentDetail/:id",
                name: "ApprovedDepartmentDetail",
                component: ApprovedDepartmentDetail,
            },
        ],
    },
    {
        // 我的申请
        path: "/my-application",
        name: "MyApplication",
        component: MyApplication,
        meta: {
            key: "menuMyAudit",
        },
        children: [
            {
                path: "/",
                name: "MyApplicationList",
                component: MyApplicationList,
            },
            {
                path: "detail/:type/:id",
                name: "MyApplicationDetail",
                meta: { prePath: "my-application" },
                component: MyApplicationDetail,
            },
            // 单位详情
            {
                path: "unitDetail/:id",
                name: "MyApplicationUnitDetail",
                component: MyApplicationUnitDetail,
            },
            // 人员详情
            {
                path: "personDetail/:id",
                name: "MyApplicationPersonDetail",
                component: MyApplicationPersonDetail,
            },
            // 内设机构详情
            {
                path: "departmentDetail/:id",
                name: "MyApplicationDepartmentDetail",
                component: MyApplicationDepartmentDetail,
            },
        ],
    },
    {
        // 信息确认
        path: "/confirm-info",
        name: "ConfirmInfo",
        component: ConfirmInfo,
        meta: {
            key: "menuOrgConfirm",
        },
        children: [
            {
                path: "/",
                name: "ConfirmInfoList",
                component: ConfirmInfoList,
            },
            {
                path: "detail/:month/:id",
                name: "ConfirmInfoDetail",
                component: ConfirmInfoDetail,
            },
        ],
    },
];
