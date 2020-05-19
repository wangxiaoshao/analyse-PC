/**
 * Created by luoxie on 2019-07-17.
 * @description：api name mapping
 */
export default {
  option: 'option', // 查询用户配置
  popupWindow: 'popupWindow',
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
  insertConfirmInfo: 'insertConfirmInfo', // 确认信息- 弹框确认按钮
  getConfirmMemberList: 'getConfirmMemberList', // 信息确认 - 弹框
  findConfirmMemberById: 'findConfirmMemberById', // 信息确认 - 人员明细
  getAuditDetailsById: 'getAuditDetailsById', // 审批详情
  saveAudit: 'saveAudit', // 保存审批


  // 内设机构查询
  findDepartmentList: 'findDepartmentList',
  findDepartmentListByPost: 'findDepartmentListByPost',
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
  // 操作日志
  getDataLogList: 'getDataLogList',
  // 日志类型
  findLoggerTypeList: 'findLoggerTypeList',
  /**
   * 系统日志
   */
  findLoggerApiAccessList: 'findLoggerApiAccessList',
  findLoggerApiAccessById: 'findLoggerApiAccessById',
  // findLoggerById: 'findLoggerById'
  // 获取视图--机构树
  getViewTree: 'getViewTree',
  getTree: 'getTree',
  // 搜索视图
  searchViewNode: 'searchViewNode',
  getChildList: 'getChildList',
  getPersonList: 'getPersonList',
  // 共享视图
  createShareFiled: 'createShareFiled', // 获取共享字段操作
  findShareFiledByAppId: 'findShareFiledByAppId', // 修改共享字段
  getViewList: 'getViewList', // 视图列表
  createView: 'createView', // 创建视图
  deleteViewById: 'deleteViewById', // 删除视图
  synchronizedNode: 'synchronizedNode', // 提交视图草稿审核
  getViewTime: 'getViewTime', // 获取视图最后更新时间
  findViewAdmin: 'findViewAdmin', // 视图管理员
  findViewById: 'findViewById', // 试图详情
  getAppList: 'getAppList', // 应用列表
  findNodeDraftList: 'findNodeDraftList', // 获取视图草稿
  updateNodeDraft: 'updateNodeDraft', // 更新视图(排序)草稿
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
  // 根据id查询内设机构
  findDepartmentById: 'findDepartmentById',
  // 创建内设机构
  createDepartment: 'createDepartment',
  // 添加人员
  createUser: 'createUser',
  // 查询内设机构下的所有人员
  findDepartmentMembers: 'findDepartmentMembers',
  // 内设机构下人员数值排序
  setSortThroughNumerical: 'setSortThroughNumerical',
  // 单位下数组排序
  setViewNodeSortThroughNumerical: 'setViewNodeSortThroughNumerical',
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
  deleteLeader: 'deleteLeader',
  // 根据id查人员详情
  findUserById: 'findUserById',
  // 人员列表排序
  setUserSort: 'setUserSort',
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
  findIdentityById: 'findIdentityById',
  findPerson: 'findPerson',
  // 创建单位
  createOrganization: 'createOrganization',
  // 查询单位
  findOrganizationById: 'findOrganizationById',
  /**
   * 社会信用代码
   */
  orgCreditId: 'orgCreditId',
  // 系统设置
  getDictionaryList: 'getdDictionaryList',
  addDictionary: 'addDictionary',
  getDicListByType: 'getDicListByType',
  updatePwd: 'updatePwd',

  // 重置密码
  resetPwd: 'resetPwd',
  // 获取验证码
  getVerifyCode: 'getVerifyCode',

  deleteDictItem: 'deleteDictItem',
  getSystemParameter: 'getSystemParameter', // 参数设置
  // 标签查询

  /**
   * 通讯录
   */
  // 查询通讯录视图
  getAddressListTree: 'getAddressListTree',
  searchMyDep: 'searchMyDep', // 关键字搜索内设机构/单位
  searchOtherDep: 'searchOtherDep',
  // 通讯录-查询单位下员
  getAddressListOrganizationMembers: 'getAddressListOrganizationMembers',
  // 通讯录-查询内设机构下人员
  getAddressListDepartmentMembers: 'getAddressListDepartmentMembers',

  // 通讯录搜索
  getAddressListUserByName: 'getAddressListUserByName',
  // 全省通讯录搜索人员结果查询电话
  findMobileById: 'findMobileById',
  // 查询用户所在单位
  getAddressBookList: '',
  // 查询内设机构下的下级内设机构
  getDepartmentChildtree: 'getDepartmentChildtree',
  // 查询单位下内设机构通讯信息
  getOrgDepartmentTxlList: 'getOrgDepartmentTxlList',
  // 查询单位下人员通讯信息
  getOrgUserTxlList: 'getOrgUserTxlList',
  findLabelByType: 'findLabelByType',
  getAreaList: 'findAreaList',
  // 查看单位内设机构电话
  getOrgMobile: 'getOrgMobile',
  // 证件照上传
  upload: 'upload',
  // 字典管理
  dicList: 'dicList',
  findRoleList: 'findRoleList',
  getRoleBindUserList: 'getRoleBindUserList',
  // 角色权人员查询
  searchRoleBindUserList: 'searchRoleBindUserList',
  saveRoleBindUser: 'saveRoleBindUser',
  findAuthorityManageList: 'findAuthorityManageList', // 权限配置列表
  findUserAccountByUid: 'findUserAccountByUid',
  findAllAccountByUid: 'findAllAccountByUid', // 获取所有的账号列表
  findAccountById: 'findAccountById', // 获取账号信息
  updateAccount: 'updateAccount', // 修改账号信息
  userIdList: 'userIdList', // 多身份列表,
  createUserId: 'createUserId', // 添加兼职，挂职
  deleteRoleBindUser: 'deleteRoleBindUser',
  saveAuthorityManage: 'saveAuthorityManage',
  // 验证身份证
  idCardValidation: 'idCardValidation',
  // 查询手机号是否重复
  selectMobileIsSame: 'selectMobileIsSame',

  // 查询单位下的区域
  findOrgAreaList: 'findOrgAreaList',
  // 查询用户可用配置
  setClientOptions: 'setClientOptions', // 提交配置信息
  getSystemParameterlevel: 'getSystemParameterlevel', // 配置级别的配置信息
  txlOptions: 'txlOptions', // 通讯录配置信息
  findEntityChangeLoggerList: 'findEntityChangeLoggerList', // 操作日志
  getEntityChangeLoggerDetail: 'getEntityChangeLoggerDetail', // 操作日志详情
  exportUser: 'exportUser', // 导出用户
  importUser: 'importUser', // 导入用户
  logoutUrl: 'logoutUrl', // 登出地址
  deleteViewAdmin: 'deleteViewAdmin', // 删除视图管理员
  deleteUserLabelOrDeptLabelOrOrgLabel: 'deleteUserLabelOrDeptLabelOrOrgLabel', // 删除单位/人员/内设机构绑定标签
  searchMember: 'searchMember', // 选人组件搜索人员
  deleteAppBindAccount: 'deleteAppBindAccount',
  /**
   * 权限配置相关
   */
  // 获取所有菜单
  getModuleList: 'getModuleList',
  // 获取所有操作
  getAuthorityList: 'getAuthorityList',
  // 根据菜单获取所属操作
  getAuthorityByModuleId: 'indAuthorityByModuleId',
  // 给菜单添加操作
  addAuthorityToModule: 'addAuthorityToModule',
  // 根据角色查询菜单
  getModuleAuthorityByRoleId: 'getModuleAuthorityByRoleId',
  // 给角色菜单增删操作
  editAuthorityManage: 'editAuthorityManage',
  // 查询角色操作
  getRoleAuthorityList: 'getRoleAuthorityList',
  // 授权区域
  insertAuthorizedEntity: 'insertAuthorizedEntity',
  findAuthorizedEntityByUid: 'findAuthorizedEntityByUid',
  deleteAuthorizedEntity: 'deleteAuthorizedEntity',
  checkAuthorization: 'checkAuthorization',

  /**
   * 用户切换身份
   */
  changeSessionUserId: 'changeSessionUserId',
  findSessionUserList: 'findSessionUserList',
  logout: 'logout',
  /**
   * 个人日志
   */
  findPersonalLoggerList: 'findPersonalLoggerList',
  findLoggerById: 'findLoggerById',
  /**
   * 用户别名查询
   */
  findUserAccountNickName: 'findUserAccountNickName',
  /**
   *通知中心
   */
  notificationIndex: 'notificationIndex',
  notificationList: 'notificationList',
  notificationRead: 'notificationRead',
  // 首页登第几个登录
  loginIndex: 'loginIndex',
  // 取首页接入昨日数据
  getStatistiscCount: 'getStatistiscCount',
  // 接入应用总数
  findApplicationCount: 'findApplicationCount',
  // 推送日志
  findPushLoggers: 'findPushLoggers'
}
