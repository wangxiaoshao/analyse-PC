/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 获取视图列表
   */
  [urlNames.getViewList]: {
    type: 'get',
    url: '/api/jg_manage/view/findViewList',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    mock: 'getViewList.json'
  },
  /**
   * 创建视图
   */
  [urlNames.createView]: {
    type: 'post',
    url: '/api/jg_manage/view/createView',
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true,
    keepOriginResponse: false
  },
  /**
   * 创建视图
   */
  [urlNames.findViewAdmin]: {
    type: 'get',
    url: '/api/jg_manage/view/findViewAdmin',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   * 获取视图草稿
   */
  [urlNames.findNodeDraftList]: {
    type: 'get',
    url: '/api/jg_manage/view/findNodeDraftList',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   * 获取视图草稿
   */
  [urlNames.createNodeDraft]: {
    type: 'post',
    url: '/api/jg_manage/view/createNodeDraft',
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    keepOriginResponse: false
  },
  /**
   * 更新视图(排序)草稿
   */
  [urlNames.updateNodeDraft]: {
    type: 'post',
    url: '/api/jg_manage/view/updateNodeDraft',
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    keepOriginResponse: false
  },
  /**
   * 保存视图草稿-》审核
   */
  [urlNames.synchronizedNode]: {
    type: 'get',
    url: '/api/jg_manage/view/synchronizedNode',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   * 保存视图草稿-》审核
   */
  [urlNames.findViewById]: {
    type: 'get',
    url: '/api/jg_manage/view/findViewById',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   * 单条视图草稿
   */
  [urlNames.deleteViewById]: {
    type: 'get',
    url: '/api/jg_manage/view/deleteNodeDraft',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   创建应用
   */
  [urlNames.createApp]: {
    type: 'post',
    url: '/api/jg_share/app/create',
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true,
    keepOriginResponse: false,
    serve: 'organizationManagePC'
  },
  /**
   修改应用
   */
  [urlNames.updateApp]: {
    type: 'post',
    url: '/api/jg_share/app/updateApp',
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true,
    keepOriginResponse: false,
    serve: 'organizationManagePC'
  },
  /**
   应用详情
   */
  [urlNames.getAppDetail]: {
    type: 'get',
    url: '/api/jg_share/app/checkAppDetail',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    mock: 'getAppDetail.json'
  },
  /**
   标签列表
   */
  [urlNames.findLabelList]: {
    type: 'get',
    url: '/api/jg_manage/label/findLabelList',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   创建标签
   */
  [urlNames.createLabel]: {
    type: 'post',
    url: '/api/jg_manage/label/createLabel',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  /**
   删除标签
   */
  [urlNames.deleteLabel]: {
    type: 'get',
    url: '/api/jg_manage/label/deleteLabel',
    serve: 'organizationManagePC',
    keepOriginResponse: false,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  /**
   获取分组
   */
  [urlNames.getGroupList]: {
    type: 'get',
    url: '/api/group/getUserGroups',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   创建分组
   */
  [urlNames.createGroup]: {
    type: 'post',
    url: '/api/group/createGroup',
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true,
    keepOriginResponse: false
  },
  /**
   分组详情
   */
  [urlNames.findGroupById]: {
    type: 'get',
    url: '/api/group/findGroupById',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   获取分组成员
   */
  [urlNames.getGroupUsers]: {
    type: 'get',
    url: '/api/group/member/groupMembers',
    serve: 'organizationManagePC',
    keepOriginResponse: false
  },
  /**
   添加分组成员
   */
  [urlNames.addGroupUsers]: {
    type: 'post',
    url: '/api/group/member/setGroupUsers',
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true,
    keepOriginResponse: false
  },
  /**
   删除分组成员
   */
  [urlNames.deleteGroupMembers]: {
    type: 'get',
    url: '/api/group/member/removeMembers',
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true,
    keepOriginResponse: false
  },
  /**
   修改分组
   */
  [urlNames.renameGroup]: {
    type: 'post',
    url: '/api/group/renameGroup',
    serve: 'organizationManagePC',
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading: true,
    keepOriginResponse: false
  }
}
