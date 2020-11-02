/**
 * Created by wangxiaoshao on 2020-10-26.
 * @description：api name mapping
 */
export default {
    // logout: "logout",

    /** 全局接口 */
    // 获取用户信息
    getUserRole: "getUserRole",
    // 获取树
    getTreeList: "getTreeList",
    // 通过区域列表获取区域名称
    getAreaList: "getAreaList",
    // 获取区域下面的单位
    getOrgByAreaCode: "getOrgByAreaCode",
    // 通过单位Id 获取单位名称
    getOrgList: "getOrgList",
    // 获取应用列表
    getApplicationList: "getApplicationList",
    // 获取系统通知列表
    getSystemNoticeList: "getSystemNoticeList",

    /** 模块接口 */
    // 关联管理--获取列表
    findAccountNumberList: "findAccountNumberList",
    // 关联管理--创建关联
    createSystemMessage: "createSystemMessage",
    // 关联管理--修改关联
    updatesSystemMessage: "updatesSystemMessage",
    // 关联管理--删除关联
    deleteAccountNumber: "deleteAccountNumber",
    // 应用接入--查询应用接入列表
    findSystemTableMessage: "findSystemTableMessage",
    // 应用接入--创建系统表信息
    createTable: "createTable",
    // 应用接入--删除应用接入
    deleteSystemTableMessage: "deleteSystemTableMessage",
    // 应用接入--更新应用
    updateSystemTableMessage: "updateSystemTableMessage",
    // 应用接入--根据公司名称查询公司id
    getSystemId: "getSystemId",
    // 共享数据--查询共享数据列表
    findShareList: "findShareList",
    // 共享数据--删除共享数据列表
    deleteDataShare: "deleteDataShare",
    // 共享管理--创建共享数据
    saveShareSystemMessage: "saveShareSystemMessage",
    // 共享数据--更新共享数据
    updateDataShare: "updateDataShare",
    //  共享数据--查询应用名称和单位名称
    findShareIdByName: "findShareIdByName",
    // 权限管理--获取指定角色的人员列表
    getAuthUsersByRole: "getAuthUsersByRole",
    // 权限管理--添加成员授权范围
    addUserAuthScope: "addUserAuthScope",
    // 权限管理--删除角色成员
    deleteRoleUser: "deleteRoleUser",
    // 权限管理--获取人员的授权区域
    getAuthAreaByUid: "getAuthAreaByUid",
    // 权限管理--获取人员的授权单位列表
    getAuthOrgByUid: "getAuthOrgByUid",
    // 权限管理--删除人员的授权范围
    deleteUserScope: "deleteUserScope",
    // 通知提醒--获取单位通知列表
    getNoticeList: "getNoticeList",
    // 通知提醒--创建通知
    createNoticeRule: "createNoticeRule",
    // 通知提醒--删除通知
    deleteOrgNotice: "deleteOrgNotice",
    // 通知提醒--获取单位通知的具体详情
    getNoticeDetailById: "getNoticeDetailById",
    // 通知提醒--获取通知类型和通知方式
    getNoticeTypePeriod: "getNoticeTypePeriod",
    // 通知提醒--更新通知
    updateNoticeRule: "updateNoticeRule",
    // 数据模板--获取数据模板列表
    getTemplateList: "getTemplateList",
    // 帮助中心--获取文档列表
    getHelpFileList: "getHelpFileList",
};
