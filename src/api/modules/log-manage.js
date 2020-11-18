import urlNames from "../url-names";
export default {
    // 系统日志--获取所有日志类型
    [urlNames.getAllLogTypes]: {
        type: "get",
        url: "/api/appdata/log/getAllLogTypes",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 系统日志--获取共享日志列表
    [urlNames.findShareLoggerList]: {
        type: "get",
        url: "/api/logger/switchLogger/findSwitchLoggerList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
