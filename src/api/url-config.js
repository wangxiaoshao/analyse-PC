/**
 * Created by luoxie on 2019-07-17.
 */
import urlNames from './url-names';
import application from './modules/application';
import rights from './modules/rights';
import logs from './modules/logs';
import parameter from './modules/parameter';

export default {
  [urlNames.getUserInfo]: {
    type: 'get',
    url: '/work/user/getCurrentUser',
    keepOriginResponse: true, // 是否保留后端返回数据格式
    showLoading: false, // 该请求发送时，是否显示全局loading
    serve: 'workspaceManagement',
    mock: '/getUserInfo.json' // development模式下，本地mock数据
  },
  // 应用管理
  ...application,
  ...rights,
  ...logs,
  ...parameter
};
