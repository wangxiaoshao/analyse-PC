import organization from './modules/organization'
import examine from './modules/examine'
import share from './modules/share'
import statistics from './modules/statistics'
import system from './modules/system'
import roleManage from './modules/role-manage'

/* 路由 */
export default [
  ...organization,
  ...examine,
  ...statistics,
  ...system,
  ...share,
  ...roleManage

]
