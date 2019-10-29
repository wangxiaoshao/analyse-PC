
// examine
import urlNames from '../url-names'

export default {

  [urlNames.getMyAuditList]: { // 待我审核 我的审核列表
    type: 'get',
    url: '/api/jg_manage/audit/findMyAuditList',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'getMyAuditList.json'
  },


  [urlNames.getDepartmentNodes]: {
    type: 'get',
    url: '/common/member_selector/getDepartmentNodes',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'getDepartmentNodes.json'
  },
  [urlNames.geMtmemberSelector]: {
    type: 'get',
    url: '/common/member_selector/getDepartmentUsers',
    keepOriginResponse: false,
    serve: 'organizationManagePC',
    mock: 'geMtmemberSelector.json'
  },
  [urlNames.geMtmemberSearch]: {
    type: 'get',
    url: '/common/member_selector/search',
    keepOriginResponse: false,
    serve: 'organizationManagePC',
    mock: 'geMtmemberSelector.json'
  },
  [urlNames.getUserRightsList]: {
    type: 'get',
    url: '/work/user_area/list',
    keepOriginResponse: false,
    serve: 'organizationManagePC',
    mock: 'getUserRightsList.json'
  },
  [urlNames.getEditRightsInfo]: {
    type: 'get',
    url: '/work/user_area/info',
    keepOriginResponse: false,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'getEditRightsInfo.json'
  },
  [urlNames.sendEditRightsInfo]: {
    type: 'post',
    url: '/work/user_area/edit',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    keepOriginResponse: false,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'applicationEdit.json'
  },
  [urlNames.getUserRemoveRight]: {
    type: 'get',
    url: '/work/user_area/remove',
    keepOriginResponse: false,
    serve: 'organizationManagePC',
    mock: 'applicationEdit.json'
  }
}
