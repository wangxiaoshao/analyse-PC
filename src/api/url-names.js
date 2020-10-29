/**
 * Created by wangxiaoshao on 2020-10-26.
 * @description：api name mapping
 */
export default {
    // logout: "logout",
    // 获取用户信息
    getUserRole: "getUserRole",
    // 共享管理--获取树
    getTreeList: "getTreeList",
    // 关联管理--获取列表
    findAccountNumberList: "findAccountNumberList",
    // 关联管理--创建关联
    createSystemMessage: "createSystemMessage",
    // 关联管理--修改关联
    updatesSystemMessage: "updatesSystemMessage",
    // 关联管理--删除关联
    deleteAccountNumber: "deleteAccountNumber",
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
};
