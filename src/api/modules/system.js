
// examine
import urlNames from '../url-names'

export default {
  [urlNames.getDictionaryList]: {
    type: 'get',
    url: '/api/jg_manage/system/findDictList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'system-setting/getDictionaryList.json'
  },
  [urlNames.addDictionary]: {
    type: 'post',
    url: '/api/jg_manage/system/addDictItem',
    serve: 'organizationManagePC',
    mock: 'system-setting/addDictionary.json',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  [urlNames.getDicListByType]: {
    type: 'get',
    url: '/api/jg_manage/system/dictList',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'system-setting/getDicListByType.json'
  },
  [urlNames.updatePwd]: {
    type: 'post',
    url: '/api/jg_manage/system/updatePwd',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    mock: 'system-setting/updatePassword.json'
  },
  [urlNames.resetPwd]: {
    type: 'get',
    url: '/api/jg_manage/system/resetPwd',
    keepOriginResponse: true,
    serve: 'organizationManagePC'
  },

  /*
  * 参数设置 */
  [urlNames.getSystemParameter]: {
    type: 'get',
    url: '/api/jg_manage/option',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'system-setting/dictionaryList.json'
  },

  /*
  * 提交配置设置 */
  [urlNames.setClientOptions]: {
    type: 'post',
    url: '/api/jg_manage/option',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    }
  },

  /*
  * 配置级别的配置信息 */
  [urlNames.getSystemParameterlevel]: {
    type: 'get',
    url: '/api/jg_manage/option/levelOptions',
    keepOriginResponse: true,
    serve: 'organizationManagePC'
  }
}
