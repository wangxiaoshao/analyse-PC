import organization from './modules/organization'
import examine from './modules/examine'
import share from './modules/share'
import statistics from './modules/statistics'
import system from './modules/system'
import roleManage from './modules/role-manage'
import addressbook from './modules/addressbook'
import addresslist from './modules/addresslist'
import homePage from './modules/homePage'
import certification from './modules/certification'

const noRight = () => import('@src/views/no-right/index.vue')


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
    component: noRight,
    meta: {
      breadcrumb: [{ name: '无权限' }]
    }
  },
  ...organization,
  ...examine,
  ...statistics,
  ...system,
  ...share,
  ...addressbook,
  ...roleManage,
  ...addresslist,
  ...homePage,
  ...certification
]
