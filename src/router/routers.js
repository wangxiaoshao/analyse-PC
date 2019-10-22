const Shared = () => import('@src/views/shared/index.vue') /* webpackChunkName: 'home' */
const ViewManagement = () => import('@src/views/shared/ViewManagement/index.vue')
const CreateView = () => import('@src/views/shared/CreateView/index.vue')

const Application = () => import('@src/views/application/index.vue') /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue') /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue') /* webpackChunkName: 'home' */
const Rights = () => import('@src/views/rights/index.vue') /* webpackChunkName: 'home' */
const Parameter = () => import('@src/views/parameter/index.vue') /* webpackChunkName: 'home' */

const Organization = () => import('@src/views/organization/index.vue')
const OrganizationContent = () => import('@src/views/organization/organizationContent/index.vue')
const NodeDetail = () => import('@src/views/organization/NodeDetail/index.vue')
const UnitDetail = () => import('@src/views/organization/UnitDetail/index.vue')
const DepartmentDetail = () => import('@src/views/organization/DepartmentDetail/index.vue')
const PersonDetail = () => import('@src/views/organization/PersonDetail/index.vue')

/* 路由 */
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
      }
    ]
  },
  // 权限管理
  {
    path: '/rights',
    name: 'Rights',
    component: Rights
  },
  // 共享管理
  {
    path: '/shared',
    name: 'Shared',
    component: Shared,
    children: [
      {
        path: '/viewmanagement',
        name: 'ViewManagement',
        component: ViewManagement
      },
      {
        path: 'createview',
        name: 'CreateView',
        component: CreateView
      }
    ]
  },
  // 参数配置
  {
    path: '/parameter',
    name: 'Parameter',
    component: Parameter
  },
  // 组织机构详情页
  {
    path: '/organizationDetail',
    name: 'organizationDetail',
    component: OrganizationContent
  },
  // 节点详情
  {
    path: '/nodeDetail',
    name: 'nodeDetail',
    component: NodeDetail
  },
  // 单位详情
  {
    path: '/unitDetail',
    name: 'unitDetail',
    component: UnitDetail
  },
  // 部门详情
  {
    path: '/departmentDetail',
    name: 'departmentDetail',
    component: DepartmentDetail
  },
  // 人员详情
  {
    path: '/personDetail',
    name: 'personDetail',
    component: PersonDetail
  }
]
