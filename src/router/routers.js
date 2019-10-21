const Application = () => import('@src/views/application/index.vue'); /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue'); /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue'); /* webpackChunkName: 'home' */
const Examine = () => import('@src/views/examine/index.vue'); /* webpackChunkName: 'home' */
const Log = () => import('@src/views/log/index.vue'); /* webpackChunkName: 'home' */
const Statistics = () => import('@src/views/statistics/index.vue'); /* webpackChunkName: 'home' */

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
  // 申请审核 examine
  {
    path: '/examine',
    name: 'Examine',
    component: Examine
  },
  // 日志统计
  {
    path: '/log',
    name: 'Log',
    component: Log
  },
  // 参数配置
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
  },
]
