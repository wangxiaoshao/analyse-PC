const Application = () => import('@src/views/application/index.vue'); /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue'); /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue'); /* webpackChunkName: 'home' */
const Rights = () => import('@src/views/rights/index.vue'); /* webpackChunkName: 'home' */
const Log = () => import('@src/views/log/index.vue'); /* webpackChunkName: 'home' */
const Parameter = () => import('@src/views/parameter/index.vue'); /* webpackChunkName: 'home' */

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
        component: ApplicationConfig,
      }
    ]
  },
  // 权限管理
  {
    path: '/rights',
    name: 'Rights',
    component: Rights
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
    component: Parameter,
  },
]
