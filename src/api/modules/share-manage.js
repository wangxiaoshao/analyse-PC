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
    // 应用接入-查询应用接入列表
    createTable: "createTable",
    [urlNames.findSystemTableMessage]: {
        type: "get",
        url: "/api/createSystem/findSystemTableMessage",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 应用接入--创建系统表信息
    [urlNames.createTable]: {
        type: "post",
        url: "/api/createSystem/createTable",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 应用接入--删除应用接入
    [urlNames.deleteSystemTableMessage]: {
        type: "get",
        url: "/api/createSystem/deleteSystemTableMessage",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 应用接入--根据公司名称查询公司id
    [urlNames.getSystemId]: {
        type: "get",
        url: "/api/createSystem/getSystemId",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
