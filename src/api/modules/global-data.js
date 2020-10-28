import urlNames from "../url-names";
export default {
    // 获取用户信息
    [urlNames.getUserRole]: {
        type: "get",
        url: "/api/appdata/index/getUserRole",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
