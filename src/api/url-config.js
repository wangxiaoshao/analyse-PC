/**
 * Created by luoxie on 2019-07-17.
 */
// import rights from './modules/rights'
// import parameter from './modules/parameter'
import organization from './modules/organization'
import urlNames from './url-names'
import application from './modules/application'
import examine from './modules/examine'
import logs from './modules/logs'
import statistics from './modules/statistics'
import shared from './modules/shared-management'
export default {
  [urlNames.getUserInfo]: {
    type: 'get',
    url: '/work/user/getCurrentUser',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/getUserInfo.json' // development模式下，本地mock数据
  },
  [urlNames.getTree]: {
    type: 'get',
    url: '/api/jg_manage/viewNode/findNodeTree',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/getTree.json' // development模式下，本地mock数据
  },
  [urlNames.searchViewNode]: {
    type: 'get',
    url: '/api/jg_manage/viewNode/searchViewNode',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/searchViewNode.json' // development模式下，本地mock数据
  },
  [urlNames.findViewNodeById]: {
    type: 'get',
    url: '/work/user/findViewNodeById',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findViewNodeById.json' // development模式下，本地mock数据
  },

  /*
  * 查询部门下的所有人员
  * */
  [urlNames.findDepartmentMembers]: {
    type: 'get',
    url: '/api/jg_manage/user/findDepartmentMembers',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /*
  * 查询单位下的所有人员
  * */
  [urlNames.findOrganizationMembers]: {
    type: 'get',
    url: '/api/jg_manage/user/findDepartmentMembers',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  // 应用管理
  ...application,
  ...examine, // 申请审核
  ...logs,
  ...statistics, // 数据统计
  // ...parameter,
  ...organization,
  ...shared // 共享视图
}
