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
    serve: 'organizationManagePC'
  },
  /**
   * 获取应用列表
   */
  [urlNames.getAppList]: {
    type: 'get',
    url: '/api/jg_share/app/checkApps',
    serve: 'organizationManagePC'
  },
  /**
  创建应用
  */
  [urlNames.createApp]: {
    type: 'post',
    url: '/api/jg_share/app/create',
    serve: 'organizationManagePC'
  },
  /**
  创建应用
  */
  [urlNames.getAppDetail]: {
    type: 'get',
    url: '/api/jg_share/app/checkAppDetail',
    serve: 'organizationManagePC'
  }
}
