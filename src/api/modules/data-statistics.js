import urlNames from "../url-names";
export default {
    // 数据统计--通过区域列表获取区域名称
    [urlNames.getAreaList]: {
        type: "post",
        url: "/api/appdata/areaOrg/getAreaList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 数据统计--获取市州区县下面的单位列表
    [urlNames.getCityCountyOrgList]: {
        type: "get",
        url: "/api/appdata/areaOrg/getCityCountyOrgList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 数据统计--获取区县下面的单位列表
    [urlNames.getCountyOrgList]: {
        type: "get",
        url: "/api/appdata/areaOrg/getCountyOrgList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 数据统计--通过单位Id列表获取单位
    [urlNames.getOrgListByIds]: {
        type: "post",
        url: "/api/appdata/areaOrg/getOrgListByIds",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },

    // headers: {
    //     "Content-Type": "multipart/form-data",
    // },
};
