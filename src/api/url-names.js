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
  getAuditList: 'getAuditList', // 待我审核 、 我的申请 、 我已审核
  getInfoConfirmList: 'getInfoConfirmList', // 信息确认
  getConfirmMemberList: 'getConfirmMemberList', // 信息确认 - 人员明细
  getAuditDetailsById: 'getAuditDetailsById', // 审批详情
  saveAudit: 'saveAudit', // 保存审批

  getDepartmentNodes: 'getDepartmentNodes',
  findDepartmentList: 'findDepartmentList',
  geMtmemberSelector: 'geMtmemberSelector',
  geMtmemberSearch: 'geMtmemberSearch',
  getUserRightsList: 'getUserRightsList',
  getAdminLog: 'getAdminLog',
  getEditRightsInfo: 'getEditRightsInfo',
  sendEditRightsInfo: 'sendEditRightsInfo',
  getUserRemoveRight: 'getUserRemoveRight',
  // 数据统计 statistics
  getStatistiscManageDto: 'getStatistiscManageDto',
  getParameter: 'getParameter',
  // 获取视图--机构树
  getTree: 'getTree',
  // 搜索视图
  searchViewNode: 'searchViewNode',
  getChildList: 'getChildList',
  getPersonList: 'getPersonList',
  // 共享视图
  getViewList: 'getViewList', // 视图列表
  createView: 'createView', // 创建视图
  getAppList: 'getAppList', // 应用列表
  createApp: 'createApp', // 创建应用
  updateApp: 'updateApp', // 修改应用
  getAppDetail: 'getAppDetail', // 获取应用详情
  findLabelList: 'findLabelList', // 标签列表
  createLabel: 'createLabel', //  创建标签
  deleteLabel: 'deleteLabel', // 删除标签
  getGroupList: 'getGroupList', // 获取分组列表
  createGroup: 'createGroup', // 创建分组
  getGroupUsers: 'getGroupUsers', // 分组成员
  // 创建节点
  createViewNode: 'createViewNode',
  // 根据id获取详情
  findViewNodeById: 'findViewNodeById',
  // 根据父级查询下级
  findViewNodeList: 'findViewNodeList',
  // 下级排序
  setViewNodeSort: 'setViewNodeSort',
  // 根据id查询部门
  findDepartmentById: 'findDepartmentById',
  // 创建部门
  createDepartment: 'createDepartment',
  // 添加人员
  createUser: 'createUser',
  // 查询部门下的所有人员
  findDepartmentMembers: 'findDepartmentMembers',
  // 查询单位下的所有人员
  findOrganizationMembers: 'findOrganizationMembers',
  // 根据id查人员详情
  findUserById: 'findUserById',
  // 查询领导信息
  findLeaderList: 'findLeaderList',
  // 角色列表
  roleList: 'roleList',
  findPerson: 'findPerson',
  // 创建单位
  createOrganization: 'createOrganization',
  // 系统设置
  dictionaryList: 'dictionaryList'
}
