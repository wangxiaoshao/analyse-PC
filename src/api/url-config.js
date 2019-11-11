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
  /*
     * 单位查询
     * */
  [urlNames.findOrganizationList]: {
    type: 'post',
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
    showLoading: false,
    serve: 'organizationManagePC',
    mock: '/findDepartmentList.json'
  },
  /*
     * 部门查询
     * */
  [urlNames.findMemberList]: {
    type: 'get',
    url: '/api/jg_manage/user/findUserByOrgAndDeptAndLabelAndUserName',
    keepOriginResponse: true,
    showLoading: false,
    serve: 'organizationManagePC',
    mock: '/findMemberList.json'
  },

  /*
     * 通讯录
     * */
  [urlNames.getAddressBookList]: {
    type: 'get', // 请求类型
    url: '/api/jg_txl/txl/departmentTxl', // 请求地址
    keepOriginResponse: true, // 返回数据是否保留后端response数据格式
    showLoading: true, // 该请求是否需要全局loading
    serve: 'organizationManagePC', // 该请求对应服务端，服务端名字在url-prefix中配置
    mock: '/getAddressBookList.json' // development模式下，本地mock数据地址
  },


  // 应用管理
  ...application,
  ...examine, // 申请审核
  ...statistics, // 数据统计
  ...organization,
  ...shared, // 共享视图
  ...system, // 系统管理
  ...addressBook
}
