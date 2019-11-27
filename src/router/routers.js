import organization from './modules/organization'
import examine from './modules/examine'
import share from './modules/share'
import statistics from './modules/statistics'
import system from './modules/system'
import roleManage from './modules/role-manage'
import addressbook from './modules/addressbook'
import addresslist from './modules/addresslist'


/* 路由 */
export default [
  ...organization,
  ...examine,
  ...statistics,
  ...system,
  ...share,
  ...addressbook,
  ...roleManage,
  ...addresslist
]
