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
    // 获取树
    [urlNames.getTreeList]: {
        type: "get",
        url: "/api/appdata/areaOrg/getTreeList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 通过区域列表获取区域名称
    [urlNames.getAreaList]: {
        type: "get",
        url: "/api/appdata/areaOrg/getAreaList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 获取区域下面的单位
    [urlNames.getOrgByAreaCode]: {
        type: "get",
        url: "/api/appdata/areaOrg/getOrgByAreaCode",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 通过单位Id 获取单位名称
    [urlNames.getOrgList]: {
        type: "get",
        url: "/api/appdata/areaOrg/getOrgList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 获取应用列表
    [urlNames.getApplicationList]: {
        type: "get",
        url: "/api/appdata/index/getApplicationList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 获取系统通知列表
    [urlNames.getSystemNoticeList]: {
        type: "get",
        url: "/api/appdata/index/getSystemNoticeList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
};
