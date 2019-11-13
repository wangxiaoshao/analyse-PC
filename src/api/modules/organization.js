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
    serve: 'organizationManagePC',
    mock: '/findViewNodeById.json' // development模式下，本地mock数据
  },
  /**
   * 添加节点、设置节点
   */
  [urlNames.createViewNode]: {
    type: 'post',
    url: '/api/jg_manage/viewNode/createViewNode',
    showLoading: true,
    keepOriginResponse: true, // 是否保留后端返回数据格式
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
    serve: 'organizationManagePC',
    mock: '/findDepartmentById.json' // development模式下，本地mock数据
  },
  /**
   * 添加部门、设置部门
   */
  [urlNames.createDepartment]: {
    type: 'post',
    url: '/api/jg_manage/department/createDepartment',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: true, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/createDepartment.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  // 添加人员
  [urlNames.createUser]: {
    type: 'post',
    url: '/api/jg_manage/user/createUser',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: true, // 该请求发送时，是否显示全局loading
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
    serve: 'organizationManagePC',
    mock: '/findDepartmentMembers.json' // development模式下，本地mock数据
  },
  // 查询单位下的所有人员
  [urlNames.findOrganizationMembers]: {
    type: 'get',
    url: '/api/jg_manage/user/findOrganizationMembers',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findOrganizationMembers.json' // development模式下，本地mock数据
  },
  [urlNames.setUserSort]: {
    type: 'post',
    url: '/api/jg_manage/user/setUserSort',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/setUserSort.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  [urlNames.findUserById]: {
    type: 'get',
    url: '/api/jg_manage/user/findUserById',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findUserById.json' // development模式下，本地mock数据
  },
  [urlNames.findLeaderList]: {
    type: 'get',
    url: '/api/jg_manage/user/findLeaderList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findLeaderList.json' // development模式下，本地mock数据
  },
  [urlNames.roleList]: {
    type: 'get',
    url: '/api/jg_manage/user/roleList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/roleList.json' // development模式下，本地mock数据
  },
  [urlNames.findPerson]: {
    type: 'get',
    url: '/api/jg_manage/user/lookPerson',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findPerson.json' // development模式下，本地mock数据
  },
  // 创建单位
  [urlNames.createOrganization]: {
    type: 'post',
    url: '/api/jg_manage/organ/createOrganization',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: true, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/createOrganization.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  /**
   * 人员管理
   */
  [urlNames.getPersonList]: {
    type: 'get',
    url: '/work/service/getPersonList',
    serve: 'organizationManagePC',
    mock: 'getPersonList.json'
  },
  /* 人员调出 */
  [urlNames.calloutUser]: {
    type: 'post',
    url: '/api/jg_manage/user/calloutUser',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/calloutUser.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  [urlNames.removeDuty]: {
    type: 'post',
    url: '/api/jg_manage/user/removeDuty',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/removeDuty.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  [urlNames.createLeader]: {
    type: 'post',
    url: '/api/jg_manage/user/createLeader',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: true, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/createLeader.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  [urlNames.getAreaList]: {
    type: 'get',
    url: '/api/jg_manage/organ/findAreaList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findAreaList.json' // development模式下，本地mock数据
  },
  [urlNames.findLabelByType]: {
    type: 'get',
    url: '/api/jg_manage/label/findLabelByType',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findLabelByType.json' // development模式下，本地mock数据
  },
  [urlNames.findOrganizationById]: {
    type: 'get',
    url: '/api/jg_manage/organ/findOrganizationById',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findOrganizationById.json' // development模式下，本地mock数据
  },
  [urlNames.upload]: {
    type: 'post',
    url: '/api/jg_manage/image/upload',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: true, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/upload.json', // development模式下，本地mock数据
    headers: {
      'Content-Type': 'application/json'
    }
  },
  [urlNames.dicList]: {
    type: 'get',
    url: '/api/jg_manage/system/dictList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/dicList.json' // development模式下，本地mock数据
  },
  [urlNames.findUserByParams]: {
    type: 'get',
    url: '/api/jg_manage/user/findUserByParams',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    serve: 'organizationManagePC',
    mock: '/findUserByParams.json' // development模式下，本地mock数据
  }
}
