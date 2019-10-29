/**
 * Created by luoxie on 2019-07-17.
 * @description：api name mapping
 */
export default {
  getUserInfo: 'getUserInfo',
  // application
  getApplicationList: 'getApplicationList',
  toggleApplication: 'toggleApplication',
  deleteApplication: 'deleteApplication',
  getAreaList: 'getAreaList',
  getApplicationDetail: 'getApplicationDetail',
  editApplication: 'editApplication',
  getApplicationConfig: 'getApplicationConfig',
  editApplicationConfig: 'editApplicationConfig',
  // 申请审核 examine
  getMyAuditList: 'getMyAuditList',

  getDepartmentNodes: 'getDepartmentNodes',
  geMtmemberSelector: 'geMtmemberSelector',
  geMtmemberSearch: 'geMtmemberSearch',
  getUserRightsList: 'getUserRightsList',
  getAdminLog: 'getAdminLog',
  getEditRightsInfo: 'getEditRightsInfo',
  sendEditRightsInfo: 'sendEditRightsInfo',
  getUserRemoveRight: 'getUserRemoveRight',
  // 数据统计 statistics
  setParameter: 'setParameter',
  getParameter: 'getParameter',
  // 获取视图
  getTree: 'getTree',
  // 搜索视图
  searchViewNode: 'searchViewNode',
  getChildList: 'getChildList',
  getPersonList: 'getPersonList',
  // 共享视图
  getSharedManagement: 'getSharedManagement',
  getAppList: 'getAppList', // 应用列表
  createApp: 'createApp', // 创建应用
  getAppDetail: 'getAppDetail', // 获取应用详情
  // 创建节点
  createViewNode: 'createViewNode',
  // 根据id获取详情
  findViewNodeById: 'findViewNodeById',
  // 根据父级查询下级
  findViewNodeList: 'findViewNodeList'
}
