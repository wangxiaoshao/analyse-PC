
// examine
import urlNames from '../url-names'

export default {
  [urlNames.dictionaryList]: {
    type: 'get',
    url: '/api/jg_manage/system/checkDict',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'system-setting/dictionaryList.json'
  },
  /*
  * 参数设置 */
  [urlNames.getSystemParameter]: {
    type: 'get',
    url: '/api/jg_manage/option',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'system-setting/dictionaryList.json'
  }
}
