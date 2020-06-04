import urlNames from "../url-names";

/**
 * 权限配置相关
 */
export default {
    [urlNames.getModuleList]: {
        type: "get",
        url: "/api/jg_manage/authority/findModuleList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    [urlNames.getAuthorityList]: {
        type: "get",
        url: "/api/jg_manage/authority/findAuthorityList",
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.getAuthorityByModuleId]: {
        type: "get",
        url: "/api/jg_manage/authority/findAuthorityByModuleId",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    [urlNames.getModuleAuthorityByRoleId]: {
        type: "get",
        url: "/api/jg_manage/authority/findModuleAuthorityByRoleId",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    [urlNames.addAuthorityToModule]: {
        type: "post",
        url: "/api/jg_manage/authority/insertModuleAuthority",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.editAuthorityManage]: {
        type: "post",
        url: "/api/jg_manage/role/saveAuthorityManage",
        keepOriginResponse: true,
        headers: {
            "Content-Type": "application/json",
        },
        serve: "organizationManagePC",
    },
    [urlNames.getRoleAuthorityList]: {
        type: "get",
        url: "/api/jg_manage/role/findAuthorityManageList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 个人日志
    [urlNames.findPersonalLoggerList]: {
        type: "get",
        url: "/api/jg_manage/logger/findPersonalLoggerList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    [urlNames.findLoggerById]: {
        type: "get",
        url: "/api/jg_manage/logger/findLoggerById",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
};
