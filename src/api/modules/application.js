/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 获取应用列表
   */
  [urlNames.getApplicationList]: {
    type: 'get',
    url: '/work/service/list',
    serve: 'workspaceManagement',
    mock: 'applicationList.json'
  },
  [urlNames.toggleApplication]: {
    type: 'get',
    url: '/work/service/set',
    showLoading: true,
    serve: 'workspaceManagement',
    mock: 'handleAction.json'
  },
  [urlNames.deleteApplication]: {
    type: 'get',
    url: '/work/service/remove',
    showLoading: true,
    serve: 'workspaceManagement',
    mock: 'handleAction.json'
  },
  [urlNames.getAreaList]: {
    type: 'get',
    url: '/api/applycenter/area/all',
    serve: 'applicationCenter',
    mock: 'area.json'
  },
  [urlNames.getApplicationDetail]: {
    type: 'get',
    url: '/work/service/info',
    serve: 'workspaceManagement',
    mock: 'applicationDetail.json'
  },
  [urlNames.editApplication]: {
    type: 'post',
    url: '/work/service/edit',
    showLoading: true,
    serve: 'workspaceManagement',
    mock: 'applicationEdit.json',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  },
  [urlNames.getApplicationConfig]: {
    type: 'get',
    url: '/work/service/getAllServiceOption',
    serve: 'workspaceManagement',
    mock: 'applicationConfig.json'
  },
  [urlNames.editApplicationConfig]: {
    type: 'post',
    url: '/work/service/editServiceOption',
    showLoading: true,
    serve: 'workspaceManagement',
    mock: 'handleAction.json',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
}
