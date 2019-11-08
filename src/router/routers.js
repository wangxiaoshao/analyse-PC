import organization from './modules/organization'
import examine from './modules/examine'
import share from './modules/share'
import statistics from './modules/statistics'
import system from './modules/system'

/* 路由 */
export default [
  ...organization,
  ...examine,
  ...statistics,
  ...system,
  ...share

]
