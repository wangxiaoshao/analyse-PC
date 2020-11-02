import urlNames from "../url-names";
export default {
    // 关联管理--获取列表
    [urlNames.findAccountNumberList]: {
        type: "get",
        url: "/api/logger/createSystem/findAccountNumberList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 关联管理--创建关联
    [urlNames.createSystemMessage]: {
        type: "post",
        url: "/api/logger/createSystem/createSystemMessage",
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
        url: "/api/logger/createSystem/updatesSystemMessage",
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
        url: "/api/logger/createSystem/deleteAccountNumber",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 应用接入-查询应用接入列表
    [urlNames.findSystemTableMessage]: {
        type: "get",
        url: "/api/logger/createSystem/findSystemTableMessage",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 应用接入--创建系统表信息
    [urlNames.createTable]: {
        type: "post",
        url: "/api/logger/createSystem/createTable",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 应用接入--创建系统表信息
    [urlNames.updateSystemTableMessage]: {
        type: "post",
        url: "/api/logger/createSystem/updateSystemTableMessage",
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
        url: "/api/logger/createSystem/deleteSystemTableMessage",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 应用接入--根据公司名称查询公司id
    [urlNames.getSystemId]: {
        type: "post",
        url: "/api/logger/createSystem/getSystemId",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 共享数据--查询共享数据列表
    [urlNames.findShareList]: {
        type: "get",
        url: "/api/logger/shareSystem/findShareList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 共享数据--删除共享数据列表
    [urlNames.deleteDataShare]: {
        type: "get",
        url: "/api/logger/shareSystem/deleteDataShare",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 共享管理--创建共享数据
    [urlNames.saveShareSystemMessage]: {
        type: "post",
        url: "/api/logger/shareSystem/saveShareSystemMessage",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 共享数据--更新共享数据
    [urlNames.updateDataShare]: {
        type: "post",
        url: "/api/logger/shareSystem/updateDataShare",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    //  共享数据--查询应用名称和单位名称
    [urlNames.findShareIdByName]: {
        type: "post",
        url: "/api/logger/shareSystem/findShareIdByName",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
};
