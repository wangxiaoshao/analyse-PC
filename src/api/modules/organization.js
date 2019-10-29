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
    serve: 'organizationManagePC',
    mock: 'getChildList.json'
  },
  [urlNames.getPersonList]: {
    type: 'get',
    url: '/work/service/getPersonList',
    serve: 'organizationManagePC',
    mock: 'getPersonList.json'
  },
  [urlNames.createViewNode]: {
    type: 'post',
    url: '/work/service/createViewNode',
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'createViewNode.json',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  },
  [urlNames.findViewNodeList]: {
    type: 'get',
    url: '/work/user/findViewNodeList',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'organizationManagePC',
    mock: '/findViewNodeList.json' // development模式下，本地mock数据
  }
}
