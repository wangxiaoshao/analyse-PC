import urlNames from "../url-names";
export default {
    [urlNames.getHelpFileList]: {
        type: "get",
        url: "/api/appdata/helpFile/getHelpFileList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
