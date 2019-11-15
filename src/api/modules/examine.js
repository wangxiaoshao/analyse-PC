
// examine
import urlNames from '../url-names'

export default {

  [urlNames.getAuditList]: { // 待我审核 我已审核
    type: 'get',
    url: '/api/jg_manage/audit/findAuditList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'examine/getAuditList.json'
  },
  [urlNames.getMyApplyAuditList]: { // 我的申请
    type: 'get',
    url: '/api/jg_manage/audit/findApplyAuditList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'examine/getMyApplyAuditList.json'
  },
  [urlNames.getInfoConfirmList]: { // 信息确认
    type: 'get',
    url: '/api/jg_manage/confirmation/findConfirmationList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'examine/getInfoConfirmList.json'
  },
  [urlNames.getConfirmMemberList]: { // 信息确认-人员明细
    type: 'get',
    url: '/api/jg_manage/confirmation/confirmWindows',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'examine/getConfirmMemberList.json'
  },
  [urlNames.getAuditDetailsById]: { // 审批详情
    type: 'get',
    url: '/api/jg_manage/audit/findAuditById',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'examine/getAuditDetailsById.json'
  },
  [urlNames.saveAudit]: { // 保存审批
    type: 'post',
    url: '/api/jg_manage/audit/saveAudit',
    showLoading: true,
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'examine/saveAudit.json'
  }
}
