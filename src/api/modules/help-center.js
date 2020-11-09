import urlNames from "../url-names";
export default {
    // 帮助中心--获取帮助中心文档列表
    [urlNames.getHelpFileList]: {
        type: "get",
        url: "/api/appdata/helpFile/getHelpFileList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 帮助中心--帮助中心文档下载
    [urlNames.getHelperview]: {
        type: "get",
        url: "/api/appdata/helpFile/getView",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
