import urlNames from '../url-names'
export default {
  [urlNames.notificationIndex]: { // 待我审核 我已审核
    type: 'get',
    url: '/api/jg_manage/notification/notificationIndex',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
  },
  [urlNames.notificationList]: { // 待我审核 我已审核
    type: 'get',
    url: '/api/jg_manage/notification/notificationList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
  },
  [urlNames.notificationRead]: { // 待我审核 我已审核
    type: 'get',
    url: '/api/jg_manage/notification/notificationRead',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
  }
}