/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 根据id查询结点详情
   */
  [urlNames.findViewNodeById]: {
    type: 'get',
    url: '/api/jg_manage/viewNode/findViewNodeById',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findViewNodeById.json' // development模式下，本地mock数据
  },
  /**
  * 获取人员列表
  */
  [urlNames.getPersonList]: {
    type: 'get',
    url: '/work/service/getPersonList',
    serve: 'organizationManagePC',
    mock: 'getPersonList.json'
  },
  /**
   * 添加节点、设置节点
   */
  [urlNames.createViewNode]: {
    type: 'post',
    url: '/api/jg_manage/viewNode/createViewNode',
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'createViewNode.json',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  /**
   * 获取下级列表
   */
  [urlNames.findViewNodeList]: {
    type: 'get',
    url: '/api/jg_manage/viewNode/findViewNodeList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findViewNodeList.json' // development模式下，本地mock数据
  },
  /**
   * 调整节点顺序
   */
  [urlNames.setViewNodeSort]: {
    type: 'post',
    url: '/api/jg_manage/viewNode/setViewNodeSort',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/setViewNodeSort.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  /**
   * 根据ID查询部门详情
   */
  [urlNames.findDepartmentById]: {
    type: 'get',
    url: '/api/jg_manage/department/findDepartmentById',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'workspaceManagement',
    mock: '/findDepartmentById.json' // development模式下，本地mock数据
  },
  /**
   * 添加部门、设置部门
   */
  [urlNames.createDepartment]: {
    type: 'post',
    url: '/api/jg_manage/department/createDepartment',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/createDepartment.json' // development模式下，本地mock数据
  },
  /**
   * 获取机构树
   */
  [urlNames.findDepartmentList]: {
    type: 'get',
    url: '/api/jg_manage/department/findDepartmentList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findDepartmentList.json' // development模式下，本地mock数据
  },
  // 添加人员
  [urlNames.createUser]: {
    type: 'post',
    url: '/api/jg_manage/user/createUser',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/createUser.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  // 查询部门下的所有人员
  [urlNames.findDepartmentMembers]: {
    type: 'get',
    url: '/api/jg_manage/user/findDepartmentMembers',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findDepartmentMembers.json' // development模式下，本地mock数据
  },
  // 查询单位下的所有人员
  [urlNames.findOrganizationMembers]: {
    type: 'get',
    url: '/api/jg_manage/user/findOrganizationMembers',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findOrganizationMembers.json' // development模式下，本地mock数据
  },
  [urlNames.findUserById]: {
    type: 'get',
    url: '/api/jg_manage/user/findUserById',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findUserById.json' // development模式下，本地mock数据
  },
  [urlNames.findLeaderList]: {
    type: 'get',
    url: '/api/jg_manage/user/findLeaderList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findLeaderList.json' // development模式下，本地mock数据
  },
  [urlNames.roleList]: {
    type: 'get',
    url: '/api/jg_manage/user/roleList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/roleList.json' // development模式下，本地mock数据
  },
  [urlNames.findPerson]: {
    type: 'get',
    url: '/api/jg_manage/user/lookPerson',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findPerson.json' // development模式下，本地mock数据
  },
  // 创建单位
  [urlNames.createOrganization]: {
    type: 'post',
    url: '/api/jg_manage/organ/createOrganization',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/createOrganization.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
