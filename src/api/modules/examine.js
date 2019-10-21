
// examine
import urlNames from '../url-names';

export default {
  [urlNames.getDepartmentNodes]: {
    type: 'get',
    url: '/common/member_selector/getDepartmentNodes',
    keepOriginResponse: true,
    serve: 'workspaceManagement',
    mock: 'getDepartmentNodes.json'
  },
  [urlNames.geMtmemberSelector]: {
    type: 'get',
    url: '/common/member_selector/getDepartmentUsers',
    keepOriginResponse: false,
    serve: 'workspaceManagement',
    mock: 'geMtmemberSelector.json'
  },
  [urlNames.geMtmemberSearch]: {
    type: 'get',
    url: '/common/member_selector/search',
    keepOriginResponse: false,
    serve: 'workspaceManagement',
    mock: 'geMtmemberSelector.json'
  },
  [urlNames.getUserRightsList]: {
    type: 'get',
    url: '/work/user_area/list',
    keepOriginResponse: false,
    serve: 'workspaceManagement',
    mock: 'getUserRightsList.json'
  },
  [urlNames.getEditRightsInfo]: {
    type: 'get',
    url: '/work/user_area/info',
    keepOriginResponse: false,
    showLoading: true,
    serve: 'workspaceManagement',
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
    serve: 'workspaceManagement',
    mock: 'applicationEdit.json'
  },
  [urlNames.getUserRemoveRight]: {
    type: 'get',
    url: '/work/user_area/remove',
    keepOriginResponse: false,
    serve: 'workspaceManagement',
    mock: 'applicationEdit.json'
  },
}
