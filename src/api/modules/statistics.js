/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 获取应用列表
   */
  [urlNames.getStatistiscManageDto]: {
    type: 'get',
    url: '/api/jg_manage/statistics/getStatistiscManageDto',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'statistics/getStatistiscManageDto.json'
  },
  // 操作日志列表
  [urlNames.getDataLogList]: {
    type: 'get',
    url: '/api/jg_manage/logger/findLoggerList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'statistics/getDataLogList.json'
  },
  // 系统日志列表
  [urlNames.findLoggerApiAccessList]: {
    type: 'get',
    url: '/api/jg_manage/logger/findLoggerApiAccessList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'

  },
  [urlNames.findLoggerApiAccessById]: {
    type: 'get',
    url: '/api/jg_manage/logger/findLoggerApiAccessById',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'

  }
  // 登录日志列表
}
