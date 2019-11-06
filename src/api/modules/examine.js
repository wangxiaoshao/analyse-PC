
// examine
import urlNames from '../url-names'

export default {

  [urlNames.getAuditList]: { // 待我审核 我的审核列表 我已审核
    type: 'get',
    url: '/api/jg_manage/audit/findAuditList',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'examine/getAuditList.json'
  },
  [urlNames.getInfoConfirmList]: { // 信息确认
    type: 'get',
    url: '/api/jg_manage/confirmation/findConfirmationList',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'examine/getInfoConfirmList.json'
  },
  [urlNames.getConfirmMemberList]: { // 信息确认-人员明细
    type: 'get',
    url: '/api/jg_manage/confirmation/findConfirmationMember',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'examine/getConfirmMemberList.json'
  },
  [urlNames.getAuditDetailsById]: { // 审批详情
    type: 'get',
    url: '/api/jg_manage/audit/findAuditById',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'examine/getAuditDetailsById.json'
  },
  [urlNames.saveAudit]: { // 保存审批
    type: 'get',
    url: '/api/jg_manage/audit/saveAudit',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'examine/saveAudit.json'
  },
}
