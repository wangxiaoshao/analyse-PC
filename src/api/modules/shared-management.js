/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 获取视图列表
   */
  [urlNames.getSharedManagement]: {
    type: 'get',
    url: '/api/jg_manage/view/findViewList',
    serve: 'organization-manage-pc',
    mock: 'getViewList.json'
  },
  /* 獲取分組列表 */
  [urlNames.getGroupList]: {
    type: 'get',
    url: '/api/jg_manage/view/findViewList',
    serve: 'organization-manage-pc',
    mock: 'getGroupList.json'
  }
}
