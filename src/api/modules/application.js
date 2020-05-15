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
        mock: "applicationList.json",
    },
    [urlNames.toggleApplication]: {
        type: "get",
        url: "/work/service/set",
        showLoading: true,
        serve: "organizationManagePC",
        mock: "handleAction.json",
    },
    [urlNames.deleteApplication]: {
        type: "get",
        url: "/work/service/remove",
        showLoading: true,
        serve: "organizationManagePC",
        mock: "handleAction.json",
    },
    /* [urlNames.getAreaList]: {
    type: 'get',
    url: '/api/applycenter/area/all',
    serve: 'organizationManagePC',
    mock: 'area.json'
  }, */
    [urlNames.getApplicationDetail]: {
        type: "get",
        url: "/work/service/info",
        serve: "organizationManagePC",
        mock: "applicationDetail.json",
    },
    [urlNames.editApplication]: {
        type: "post",
        url: "/work/service/edit",
        showLoading: true,
        serve: "organizationManagePC",
        mock: "applicationEdit.json",
        headers: {
            "Content-Type": "multipart/form-data",
        },
    },
    [urlNames.getApplicationConfig]: {
        type: "get",
        url: "/work/service/getAllServiceOption",
        serve: "organizationManagePC",
        mock: "applicationConfig.json",
    },
    [urlNames.editApplicationConfig]: {
        type: "post",
        url: "/work/service/editServiceOption",
        showLoading: true,
        serve: "organizationManagePC",
        mock: "handleAction.json",
        headers: {
            "Content-Type": "multipart/form-data",
        },
    },
};
