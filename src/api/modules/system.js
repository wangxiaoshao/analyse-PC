
// examine
import urlNames from '../url-names'

export default {
  [urlNames.dictionaryList]: {
    type: 'get',
    url: '/api/jg_manage/system/checkDict',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'system-setting/dictionaryList.json'
  }
}
