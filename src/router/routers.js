const Application = () => import('@src/views/application/index.vue') /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue') /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue') /* webpackChunkName: 'home' */
const Rights = () => import('@src/views/rights/index.vue') /* webpackChunkName: 'home' */
const Log = () => import('@src/views/log/index.vue') /* webpackChunkName: 'home' */
const Parameter = () => import('@src/views/parameter/index.vue') /* webpackChunkName: 'home' */
const Organization = () => import('@src/views/organization/index.vue')
const OrganizationContent = () => import('@src/views/organization/organizationContent/index.vue')
const NodeDetail = () => import('@src/views/organization/NodeDetail/index.vue')
const UnitDetail = () => import('@src/views/organization/UnitDetail/index.vue')
const DepartmentDetail = () => import('@src/views/organization/DepartmentDetail/index.vue')
const PersonDetail = () => import('@src/views/organization/PersonDetail/index.vue')

export default [
  {
    path: '/',
    name: 'default',
    redirect: '/organization'
  },
  {
    path: '/application',
    name: 'Application',
    component: Application,
    children: [
      {
        path: '/',
        name: 'ApplicationList',
        component: ApplicationList
      },
      {
        path: 'config/:id',
        name: 'ApplicationConfig',
        component: ApplicationConfig
      }
    ]
  },
  // 组织机构管理
  {
    path: '/organization',
    name: 'Organization',
    component: Organization,
    children: [
      {
        path: 'organizationContent/:id',
        name: 'OrganizationContent',
        component: OrganizationContent
      }, {
        path: 'nodeEdit',
        name: 'NodeEdit',
        component: NodeDetail
      }, {
        path: 'unitEdit',
        name: 'UnitEdit',
        component: UnitDetail
      }, {
        path: 'departmentEdit',
        name: 'DepartmentEdit',
        component: DepartmentDetail
      }, {
        path: 'personEdit',
        name: 'PersonEdit',
        component: PersonDetail
      }
    ]
  },
  // 组织机构详情页
  {
    path: '/organizationDetail',
    name: 'OrganizationDetail',
    component: OrganizationContent
  },
  // 节点详情
  {
    path: '/nodeDetail',
    name: 'NodeDetail',
    component: NodeDetail
  },
  // 单位详情
  {
    path: '/unitDetail',
    name: 'UnitDetail',
    component: UnitDetail
  },
  // 部门详情
  {
    path: '/departmentDetail',
    name: 'DepartmentDetail',
    component: DepartmentDetail
  },
  // 人员详情
  {
    path: '/personDetail',
    name: 'PersonDetail',
    component: PersonDetail
  },
  {
    path: '/log',
    name: 'Log',
    component: Log
  },
  // 日志统计
  {
    path: '/log',
    name: 'Log',
    component: Log
  },
  // 参数配置
  {
    path: '/parameter',
    name: 'Parameter',
    component: Parameter
  }
]
