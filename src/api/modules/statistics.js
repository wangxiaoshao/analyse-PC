/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 获取应用列表
   */
  [urlNames.getParameter]: {
    type: 'get',
    url: '/work/option/get',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'getParameter.json'
  },
  [urlNames.setParameter]: {
    type: 'post',
    url: '/work/option/set',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'setParameter.json',
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
