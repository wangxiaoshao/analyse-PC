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
  getApplicationDetail: 'getApplicationDetail',
  editApplication: 'editApplication',
  getApplicationConfig: 'getApplicationConfig',
  editApplicationConfig: 'editApplicationConfig',
  // 申请审核 examine
  getAuditList: 'getAuditList', // 待我审核 、 我已审核
  getMyApplyAuditList: 'getMyApplyAuditList', // 我的申请
  getInfoConfirmList: 'getInfoConfirmList', // 信息确认
  getConfirmMemberList: 'getConfirmMemberList', // 信息确认 - 人员明细
  getAuditDetailsById: 'getAuditDetailsById', // 审批详情
  saveAudit: 'saveAudit', // 保存审批


  // 部门查询
  findDepartmentList: 'findDepartmentList',
  // 单位查询
  findOrganizationList: 'findOrganizationList',
  // 人员查询
  findMemberList: 'findMemberList',
  getDepartmentNodes: 'getDepartmentNodes',
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
  getDataLogList: 'getDataLogList',
  // 获取视图--机构树
  getTree: 'getTree',
  // 搜索视图
  searchViewNode: 'searchViewNode',
  getChildList: 'getChildList',
  getPersonList: 'getPersonList',
  // 共享视图
  getViewList: 'getViewList', // 视图列表
  createView: 'createView', // 创建视图
  findViewAdmin: 'findViewAdmin', // 视图管理员
  getAppList: 'getAppList', // 应用列表
  findNodeDraftList: 'findNodeDraftList', // 获取视图草稿
  createNodeDraft: 'createNodeDraft', // 创建视图节点
  createApp: 'createApp', // 创建应用
  updateApp: 'updateApp', // 修改应用
  getAppDetail: 'getAppDetail', // 获取应用详情
  findLabelList: 'findLabelList', // 标签列表
  createLabel: 'createLabel', //  创建标签
  deleteLabel: 'deleteLabel', // 删除标签
  findOrgLabelList: 'findOrgLabelList', // 根据单位id获取标签
  findLabel: 'findLabel',
  getGroupList: 'getGroupList', // 获取分组列表
  createGroup: 'createGroup', // 创建分组
  findGroupById: 'findGroupById',
  getGroupUsers: 'getGroupUsers', // 分组成员
  addGroupUsers: 'addGroupUsers', // 添加成员
  deleteGroupMembers: 'deleteGroupMembers', // 删除分组成员
  renameGroup: 'renameGroup', // 修改分组启用状态
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
  // 人员调出
  calloutUser: 'calloutUser',
  // 解除职务关系
  removeDuty: 'removeDuty',
  // 选择领导
  createLeader: 'createLeader',
  // 查询领导信息
  findLeaderList: 'findLeaderList',
  // 根据id查人员详情
  findUserById: 'findUserById',
  // 人员列表排序
  setUserSort: 'setUserSort',
  // 角色列表
  roleList: 'roleList',
  // 通过姓名查询用户基本信息
  findUserByParams: 'findUserByParams',
  // 根据userId查询用户身份
  findUserIdentityByUid: 'findUserIdentityByUid',
  // 更新用户基本信息
  updateUser: 'updateUser',
  // 更新用户账号开通相关信息
  updateUserCount: 'updateUserCount',
  // 绑定身份类型
  updateUserIdentity: 'updateUserIdentity',
  findPerson: 'findPerson',
  // 创建单位
  createOrganization: 'createOrganization',
  // 查询单位
  findOrganizationById: 'findOrganizationById',
  // 系统设置
  dictionaryList: 'dictionaryList',
  // 标签查询

  /**
   * 通讯录 
   */
  //查询用户所在单位
  getAddressBookList: 'getAddressBookList',
  // 查询部门下的下级部门
  getDepartmentChildtree: 'getDepartmentChildtree',
  findLabelByType: 'findLabelByType',
  getAreaList: 'findAreaList',
  // 证件照上传
  upload: 'upload',
  // 字典管理
  dicList: 'dicList'
}
