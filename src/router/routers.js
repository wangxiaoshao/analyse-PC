const Application = () => import('@src/views/application/index.vue'); /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue'); /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue'); /* webpackChunkName: 'home' */
const WaitApprovalList = () => import('@src/views/examine/WaitApprovalList/index.vue'); /* webpackChunkName: 'home' */
const WaitApprovalItem = () => import('@src/views/examine/WaitApprovalItem/index.vue'); /* webpackChunkName: 'home' */
const Approved = () => import('@src/views/examine/Approved/index.vue'); /* webpackChunkName: 'home' */
const MyApplication = () => import('@src/views/examine/MyApplication/index.vue'); /* webpackChunkName: 'home' */
const ConfirmInfo = () => import('@src/views/examine/ConfirmInfo/index.vue'); /* webpackChunkName: 'home' */
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
    path: '/approved',
    name: 'Approved',
    component: Approved
  },
  {
    path: '/waitApprovalList',
    name: 'WaitApprovalList',
    component: WaitApprovalList
  },
  {
    path: '/waitApprovalItem',
    name: 'WaitApprovalItem',
    component: WaitApprovalItem
  },
  {
    path: '/myApplication',
    name: 'MyApplication',
    component: MyApplication
  },
  {
    path: '/confirmInfo',
    name: 'ConfirmInfo',
    component: ConfirmInfo
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
  }
]
