// TODO 所有的url路径，单词与单词之间，用断线链接，不采用驼峰式
const Organization = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/index.vue"
    );
const OrganizationContent = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/organization-content/index.vue"
    );
const NodeDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/node-detail/index.vue"
    );
const UnitDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/unit-detail/index.vue"
    );
const DepartmentDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/department-detail/index.vue"
    );
const PersonDetail = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/person-detail/index.vue"
    );
const OperateLog = () =>
    import(
        /* webpackChunkName: "Organization" */ "@src/views/organization/operate-log/index.vue"
    );

/* 路由 */
export default [
    // {
    //   path: '/',
    //   name: 'default',
    //   redirect: '/organization',
    //   meta: {
    //     'key': 'menuOrgManage'
    //   }
    // },

    // 组织机构详情页
    {
        path: "/organizationDetail",
        name: "OrganizationDetail",
        component: OrganizationContent,
    },
    // 节点详情
    {
        path: "/nodeDetail/:id",
        name: "NodeDetail",
        component: NodeDetail,
    },
    // 单位详情
    {
        path: "/unitDetail/:id",
        name: "UnitDetail",
        component: UnitDetail,
    },
    // 内设机构详情
    {
        path: "/departmentDetail/:id",
        name: "DepartmentDetail",
        component: DepartmentDetail,
    },
    // 人员详情
    {
        path: "/personDetail/:id",
        name: "PersonDetail",
        component: PersonDetail,
    },
    // 组织机构管理
    {
        path: "/organization",
        name: "Organization",
        component: Organization,
        meta: {
            key: "menuOrgManage",
        },
        children: [
            {
                path: "organization-content/:nodeId",
                name: "OrganizationContent",
                component: OrganizationContent,
            },
            {
                path: "node-edit/:id",
                name: "NodeEdit",
                component: NodeDetail,
            },
            {
                path: "unit-edit/:id",
                name: "UnitEdit",
                component: UnitDetail,
            },
            {
                path: "department-edit/:id",
                name: "DepartmentEdit",
                component: DepartmentDetail,
            },
            {
                path: "person-edit/:id/:identityId",
                name: "PersonEdit",
                component: PersonDetail,
            },
            {
                path: "node-add/:parentId",
                name: "NodeAdd",
                component: NodeDetail,
            },
            {
                path: "unit-add/:parentId",
                name: "UnitAdd",
                component: UnitDetail,
            },
            {
                path: "department-add/:parentId",
                name: "DepartmentAdd",
                component: DepartmentDetail,
            },
            {
                path: "person-add/:parentId",
                name: "PersonAdd",
                component: PersonDetail,
            },
            {
                path: "operate-log/:id",
                name: "OperateLog",
                component: OperateLog,
            },
        ],
    },
];
