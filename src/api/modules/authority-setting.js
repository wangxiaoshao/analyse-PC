import urlNames from '../url-names'

/**
 * 权限配置相关
 */
export default {
  [urlNames.getModuleList]: {
    type: 'get',
    url: '/api/jg_manage/authority/findModuleList',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC',
    mock: 'system-setting/getDictionaryList.json'
  },
  [urlNames.getAuthorityList]: {
    type: 'get',
    url: '/api/jg_manage/authority/findAuthorityList',
    serve: 'organizationManagePC',
    mock: 'system-setting/addDictionary.json',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  [urlNames.getAuthorityByModuleId]: {
    type: 'get',
    url: '/api/jg_manage/authority/findAuthorityByModuleId',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    mock: 'system-setting/getDicListByType.json'
  },
  [urlNames.addAuthorityToModule]: {
    type: 'post',
    url: '/api/jg_manage/authority/insertModuleAuthority',
    keepOriginResponse: true,
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    mock: 'system-setting/updatePassword.json'
  },
  [urlNames.editAuthorityManage]: {
    type: 'post',
    url: '/api/jg_manage/role/saveAuthorityManage',
    keepOriginResponse: true,
    headers: {
      'Content-Type': 'application/json'
    },
    serve: 'organizationManagePC',
    mock: 'system-setting/dictionaryList.json'
  }
}
