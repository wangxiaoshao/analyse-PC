/**
 * Created by luoxie on 2019-07-17.
 */
// import rights from './modules/rights'
// import parameter from './modules/parameter'
import organization from './modules/organization'
import urlNames from './url-names'
import application from './modules/application'
import examine from './modules/examine'
import system from './modules/system'
import statistics from './modules/statistics'
import shared from './modules/shared-management'
import addressBook from './modules/address-book'
import addressList from './modules/address-list'
import roleManage from './modules/role-manage'
import authoritySetting from './modules/authority-setting'
import notification from './modules/notification'

export default {
  [urlNames.option]: {
    type: 'get',
    url: '/api/jg_manage/option',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/option.json' // development模式下，本地mock数据
  },
  [urlNames.getTree]: {
    type: 'get',
    url: '/api/jg_manage/viewNode/findNodeTree',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/getTree.json' // development模式下，本地mock数据
  },
  [urlNames.getViewTree]: {
    type: 'get',
    url: '/api/jg_manage/viewNode/findTxlTree',
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
  /*
     * 单位查询
     * */
  [urlNames.findOrganizationList]: {
    type: 'get',
    url: '/api/jg_manage/organ/findOrganizationList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'findOrganizationList.json'
  },
  /*
     * 部门查询
     * */
  [urlNames.findDepartmentList]: {
    type: 'get',
    url: '/api/jg_manage/department/findDepartmentList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: '/findDepartmentList.json'
  },
  /*
     * 人员查询
     * */
  [urlNames.findMemberList]: {
    type: 'get',
    url: '/api/jg_manage/user/findUserList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: '/findMemberList.json'
  },


  [urlNames.findOrgLabelList]: {
    type: 'get', // 请求类型
    url: '/api/jg_manage/label/findOrgLabelList', // 请求地址
    keepOriginResponse: true, // 返回数据是否保留后端response数据格式
    serve: 'organizationManagePC', // 该请求对应服务端，服务端名字在url-prefix中配置
    mock: '/findOrgLabelList.json' // development模式下，本地mock数据地址
  },

  [urlNames.findLabel]: {
    type: 'get', // 请求类型
    url: '/api/jg_manage/label/findLabel', // 请求地址
    keepOriginResponse: true, // 返回数据是否保留后端response数据格式
    serve: 'organizationManagePC', // 该请求对应服务端，服务端名字在url-prefix中配置
    mock: '/findLabel.json' // development模式下，本地mock数据地址
  },

  // 标签查询
  [urlNames.findLabelByType]: {
    type: 'get',
    url: '/api/jg_manage/label/findLabelByType',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findLabelByType.json' // development模式下，本地mock数据
  },
  // 是否显示全局确认信息弹框
  [urlNames.popupWindow]: {
    type: 'get',
    url: '/api/jg_manage/confirmation/popupWindow',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findLabelByType.json' // development模式下，本地mock数据
  },

  /**
   * 获取应用列表
   */
  [urlNames.getAppList]: {
    type: 'get',
    url: '/api/jg_share/app/checkApps',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    mock: 'getAppList.json'
  },
  /*
  *选人组件搜索人员 */
  [urlNames.searchMember]: {
    type: 'get',
    url: '/api/jg_manage/user/findUserByParams',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findUserByParams.json' // development模式下，本地mock数据
  },
  /**
   * 获取登出地址
   */
  [urlNames.logoutUrl]: {
    type: 'get',
    url: '/api/jg_manage/logout/logout',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  // 应用管理
  ...application,
  ...examine, // 申请审核
  ...statistics, // 数据统计
  ...organization,
  ...shared, // 共享视图
  ...system, // 系统管理
  ...addressBook, // 通讯录
  ...addressList, // 通讯录(后)
  ...roleManage, // 角色管理
  ...authoritySetting, // 权限配置
  ...notification// 通知中心
}
