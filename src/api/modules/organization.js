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
      'Content-Type': 'multipart/form-data'
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
  }
}
