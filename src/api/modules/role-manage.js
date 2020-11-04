import urlNames from "../url-names";
export default {
    // 权限管理--获取权限列表
    [urlNames.getRoleList]: {
        type: "get",
        url: "/api/appdata/auth/getRoleList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 权限管理--获取指定角色的人员列表
    [urlNames.getAuthUsersByRole]: {
        type: "get",
        url: "/api/appdata/auth/getAuthUsersByRole",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 权限管理--添加成员授权范围
    [urlNames.addUserAuthScope]: {
        type: "post",
        url: "/api/appdata/auth/addUserAuthScope",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 权限管理--删除角色成员
    [urlNames.deleteRoleUser]: {
        type: "get",
        url: "/api/appdata/auth/deleteRoleUser",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 权限管理--获取人员的授权区域
    [urlNames.getAuthAreaByUid]: {
        type: "get",
        url: "/api/appdata/auth/getAuthAreaByUid",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 权限管理--获取人员的授权单位列表
    [urlNames.getAuthOrgByUid]: {
        type: "get",
        url: "/api/appdata/auth/getAuthOrgByUid",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 权限管理--删除人员的授权范围
    [urlNames.deleteUserScope]: {
        type: "get",
        url: "/api/appdata/auth/deleteUserScope",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 授权范围--搜索人员
    [urlNames.searchAreaUsers]: {
        type: "post",
        url: "/api/appdata/areaOrg/searchAreaUsers",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 通知提醒--搜索人员
    [urlNames.searchOrgUser]: {
        type: "get",
        url: "/api/appdata/orgNotice/searchOrgUser",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 授权范围--搜索单位
    [urlNames.searchAreaOrgs]: {
        type: "post",
        url: "/api/appdata/areaOrg/searchAreaOrgs",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
};
