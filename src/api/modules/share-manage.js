import urlNames from "../url-names";
export default {
    // 共享管理--获取树
    [urlNames.getTreeList]: {
        type: "get",
        url: "/api/appdata/areaOrg/getTreeList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 关联管理--获取列表
    [urlNames.findAccountNumberList]: {
        type: "get",
        url: "/api/createSystem/findAccountNumberList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 关联管理--创建关联
    [urlNames.createSystemMessage]: {
        type: "post",
        url: "/api/createSystem/createSystemMessage",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 关联管理--修改关联
    [urlNames.updatesSystemMessage]: {
        type: "post",
        url: "/api/createSystem/updatesSystemMessage",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 关联管理--删除关联
    [urlNames.deleteAccountNumber]: {
        type: "get",
        url: "/api/createSystem/deleteAccountNumber",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
