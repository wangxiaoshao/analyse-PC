const Application = () => import('@src/views/application/index.vue'); /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue'); /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue'); /* webpackChunkName: 'home' */
const Rights = () => import('@src/views/rights/index.vue'); /* webpackChunkName: 'home' */
const Log = () => import('@src/views/log/index.vue'); /* webpackChunkName: 'home' */
const Parameter = () => import('@src/views/parameter/index.vue'); /* webpackChunkName: 'home' */


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
  }
]
