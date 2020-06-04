/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from "../url-names";

export default {
    /**
     * 获取应用列表
     */
    [urlNames.getApplicationList]: {
        type: "get",
        url: "/work/service/list",
        serve: "organizationManagePC",
    },
    [urlNames.toggleApplication]: {
        type: "get",
        url: "/work/service/set",
        showLoading: true,
        serve: "organizationManagePC",
    },
    [urlNames.deleteApplication]: {
        type: "get",
        url: "/work/service/remove",
        showLoading: true,
        serve: "organizationManagePC",
    },
    /* [urlNames.getAreaList]: {
    type: 'get',
    url: '/api/applycenter/area/all',
    serve: 'organizationManagePC',

  }, */
    [urlNames.getApplicationDetail]: {
        type: "get",
        url: "/work/service/info",
        serve: "organizationManagePC",
    },
    [urlNames.editApplication]: {
        type: "post",
        url: "/work/service/edit",
        showLoading: true,
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "multipart/form-data",
        },
    },
    [urlNames.getApplicationConfig]: {
        type: "get",
        url: "/work/service/getAllServiceOption",
        serve: "organizationManagePC",
    },
    [urlNames.editApplicationConfig]: {
        type: "post",
        url: "/work/service/editServiceOption",
        showLoading: true,
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "multipart/form-data",
        },
    },
};
