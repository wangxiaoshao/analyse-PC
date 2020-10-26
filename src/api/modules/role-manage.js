import urlNames from "../url-names";
export default {
    [urlNames.getTreeList]: {
        type: "get",
        url: "/api/appdata/areaOrg/getTreeList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
