
// rights
import urlNames from '../url-names'

export default {
  [urlNames.getAdminLog]: {
    type: 'get',
    url: '/work/logger/adminLog',
    keepOriginResponse: true,
    serve: 'workspaceManagement',
    mock: 'getAdminLog.json'
  }
}
