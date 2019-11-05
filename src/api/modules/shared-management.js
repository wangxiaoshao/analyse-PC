/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 获取视图列表
   */
  [urlNames.getViewList]: {
    type: 'get',
    url: '/api/jg_manage/view/findViewList',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    showLoading: true,
    mock: 'getViewList.json'
  },
  /**
   * 获取应用列表
   */
  [urlNames.getAppList]: {
    type: 'get',
    url: '/api/jg_share/app/checkApps',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    showLoading: true,
    mock: 'getAppList.json'
  },
  /**
  创建应用
  */
  [urlNames.createApp]: {
    type: 'post',
    url: '/api/jg_share/app/create',
    headers: {
      'Content-Type': 'application/json'
    },
    keepOriginResponse: false,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /**
   修改应用
   */
  [urlNames.updateApp]: {
    type: 'post',
    url: '/api/jg_share/app/updateApp',
    headers: {
      'Content-Type': 'application/json'
    },
    keepOriginResponse: false,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /**
  应用详情
  */
  [urlNames.getAppDetail]: {
    type: 'get',
    url: '/api/jg_share/app/checkAppDetail',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    showLoading: true,
    mock: 'getAppDetail.json'
  },
  /**
   标签列表
   */
  [urlNames.findLabelList]: {
    type: 'get',
    url: '/api/jg_manage/label/findLabelList',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    showLoading: true
  },
  /**
   创建标签
   */
  [urlNames.createLabel]: {
    type: 'post',
    url: '/api/jg_manage/label/createLabel',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true
  },
  /**
   删除标签
   */
  [urlNames.deleteLabel]: {
    type: 'post',
    url: '/api/jg_manage/label/deleteLabel',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true
  }
}
