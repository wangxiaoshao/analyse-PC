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
        url: "/api/appdata/helpFile/view/helpFile",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 帮助中心--删除
    [urlNames.deleteFile]: {
        type: "get",
        url: "/api/appdata/helpFile/delete/helpFile",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 帮助中心--上传文件
    [urlNames.uploadFile]: {
        type: "post",
        url: "/api/appdata/helpFile/upload/helpFile",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
};
