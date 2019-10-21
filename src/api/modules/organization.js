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
  }
}
