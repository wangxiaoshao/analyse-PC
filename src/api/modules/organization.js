/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 获取应用列表
   */
  [urlNames.getChildList]: {
    type: 'get',
    url: '/work/service/getChildList',
    serve: 'workspaceManagement',
    mock: 'getChildList.json'
  },
  [urlNames.getPersonList]: {
    type: 'get',
    url: '/work/service/getPersonList',
    serve: 'workspaceManagement',
    mock: 'getPersonList.json'
  },
  [urlNames.createViewNode]: {
    type: 'post',
    url: '/work/service/createViewNode',
    showLoading: true,
    serve: 'workspaceManagement',
    mock: 'createViewNode.json',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
}
