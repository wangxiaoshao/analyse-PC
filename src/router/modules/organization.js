// TODO 所有的url路径，单词与单词之间，用断线链接，不采用驼峰式
const Organization = () => import('@src/views/organization/index.vue')
const OrganizationContent = () => import('@src/views/organization/organization-content/index.vue')
const NodeDetail = () => import('@src/views/organization/node-detail/index.vue')
const UnitDetail = () => import('@src/views/organization/unit-detail/index.vue')
const DepartmentDetail = () => import('@src/views/organization/department-detail/index.vue')
const PersonDetail = () => import('@src/views/organization/person-detail/index.vue')

/* 路由 */
export default [
  {
    path: '/',
    name: 'default',
    redirect: '/organization'
  },
  // 组织机构详情页
  {
    path: '/organizationDetail',
    name: 'OrganizationDetail',
    component: OrganizationContent
  },
  // 节点详情
  {
    path: '/nodeDetail/:id',
    name: 'NodeDetail',
    component: NodeDetail
  },
  // 单位详情
  {
    path: '/unitDetail/:id',
    name: 'UnitDetail',
    component: UnitDetail
  },
  // 部门详情
  {
    path: '/departmentDetail/:id',
    name: 'DepartmentDetail',
    component: DepartmentDetail
  },
  // 人员详情
  {
    path: '/personDetail/:id',
    name: 'PersonDetail',
    component: PersonDetail
  },
  // 组织机构管理
  {
    path: '/organization',
    name: 'Organization',
    component: Organization,
    children: [
      {
        path: 'organization-content/:nodeId',
        name: 'OrganizationContent',
        component: OrganizationContent
      }, {
        path: 'nodeEdit/:id',
        name: 'NodeEdit',
        component: NodeDetail
      }, {
        path: 'unitEdit/:id',
        name: 'UnitEdit',
        component: UnitDetail
      }, {
        path: 'departmentEdit/:id',
        name: 'DepartmentEdit',
        component: DepartmentDetail
      }, {
        path: 'personEdit/:id',
        name: 'PersonEdit',
        component: PersonDetail
      }, {
        path: 'nodeAdd/:parentId',
        name: 'NodeAdd',
        component: NodeDetail
      }, {
        path: 'unitAdd/:parentId',
        name: 'UnitAdd',
        component: UnitDetail
      }, {
        path: 'departmentAdd/:parentId',
        name: 'DepartmentAdd',
        component: DepartmentDetail
      }, {
        path: 'personAdd/:parentId',
        name: 'PersonAdd',
        component: PersonDetail
      }
    ]
  }
]

