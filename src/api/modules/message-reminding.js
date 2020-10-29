import urlNames from "../url-names";
export default {
    // 通知提醒--获取单位通知列表
    [urlNames.getNoticeList]: {
        type: "get",
        url: "/api/appdata/orgNotice/getNoticeList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 通知提醒--创建通知
    [urlNames.createNoticeRule]: {
        type: "post",
        url: "/api/appdata/orgNotice/createNoticeRule",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 通知提醒--删除通知
    [urlNames.deleteOrgNotice]: {
        type: "get",
        url: "/api/appdata/orgNotice/deleteOrgNotice",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 通知提醒--获取单位通知的具体详情
    [urlNames.getNoticeDetailById]: {
        type: "get",
        url: "/api/appdata/orgNotice/getNoticeDetailById",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 通知提醒--获取通知类型和通知方式
    [urlNames.getNoticeTypePeriod]: {
        type: "get",
        url: "/api/appdata/orgNotice/getNoticeTypePeriod",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 通知提醒--更新通知
    [urlNames.updateNoticeRule]: {
        type: "get",
        url: "/api/appdata/orgNotice/updateNoticeRule",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
