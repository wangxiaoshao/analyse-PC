import urlNames from "../url-names";
export default {
    // 数据模板--获取数据模板列表
    [urlNames.getTemplateList]: {
        type: "get",
        url: "/api/appdata/modelGenerated/getList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 数据模板--在线预览
    [urlNames.getView]: {
        type: "get",
        url: "/api/appdata/modelGenerated/getView",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 数据模板--获取模板名称列表
    [urlNames.getTemplateName]: {
        type: "get",
        url: "/api/appdata/modelGenerated/getTemplateName",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
};
