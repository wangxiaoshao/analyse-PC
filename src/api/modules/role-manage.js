/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from "../url-names";

export default {
    [urlNames.findRoleList]: {
        type: "get",
        url: "/api/jg_manage/role/findRoleList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.getRoleBindUserList]: {
        type: "get",
        url: "/api/jg_manage/role/getRoleBindUserList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },

    [urlNames.searchRoleBindUserList]: {
        type: "get",
        url: "/api/jg_manage/role/searchRoleBindUserList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    [urlNames.saveRoleBindUser]: {
        type: "post",
        url: "/api/jg_manage/role/saveRoleBindUser",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",

        showLoading: true,
        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.deleteRoleBindUser]: {
        type: "get",
        url: "/api/jg_manage/role/deleteRoleBindUser",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",

        showLoading: true,
        /*  headers: {
      'Content-Type': 'application/json'
    } */
    },
    /*
     * 权限配置列表 */
    [urlNames.findAuthorityManageList]: {
        type: "get",
        url: "/api/jg_manage/role/findAuthorityManageList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
        showLoading: true,
    },
    [urlNames.saveAuthorityManage]: {
        type: "post",
        url: "/api/jg_manage/role/saveAuthorityManage",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",

        showLoading: true,
        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.insertAuthorizedEntity]: {
        type: "post",
        url: "/api/jg_manage/authorizedEntity/insertAuthorizedEntity",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
        showLoading: true,
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 授权区域查询
    [urlNames.findAuthorizedEntityByUid]: {
        type: "get",
        url: "/api/jg_manage/authorizedEntity/findAuthorizedEntityByUid",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    // 删除授权区域
    [urlNames.deleteAuthorizedEntity]: {
        type: "post",
        url: "/api/jg_manage/authorizedEntity/deleteAuthorizedEntity",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 检测用户的授权权限
    [urlNames.checkAuthorization]: {
        type: "get",
        url: "/api/jg_manage/role/checkAuthorization",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
};
