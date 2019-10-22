const Application = () => import('@src/views/application/index.vue') /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue') /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue') /* webpackChunkName: 'home' */
const Rights = () => import('@src/views/rights/index.vue') /* webpackChunkName: 'home' */
const Shared = () => import('@src/views/shared/index.vue') /* webpackChunkName: 'home' */
const ViewManagement = () => import('@src/views/shared/ViewManagement/index.vue')
const CreateView = () => import('@src/views/shared/CreateView/index.vue')
const Parameter = () => import('@src/views/parameter/index.vue') /* webpackChunkName: 'home' */


export default [
  {
    path: '/',
    name: 'default',
    redirect: '/application'
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
