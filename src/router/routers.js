import organization from './modules/organization'
import examine from './modules/examine'
import share from './modules/share'
import statistics from './modules/statistics'
import system from './modules/system'
import roleManage from './modules/role-manage'
import addressbook from './modules/addressbook'
import addresslist from './modules/addresslist'
import homePage from './modules/homePage'

const noRight = () => import('@src/views/no-right/index.vue')

// 通知中心
const Notification = () => import('@src/views/notification/index.vue')

/* 路由 */
export default [
  {
    path: '/',
    name: 'default',
    redirect: '/homePage'
  },
  {
    path: '/no-right',
    name: 'noRight',
    component: noRight
  },
  {
    path: '/notification',
    name: 'notification',
    component: Notification
  },

  ...organization,
  ...examine,
  ...statistics,
  ...system,
  ...share,
  ...addressbook,
  ...roleManage,
  ...addresslist,
  ...homePage
]
