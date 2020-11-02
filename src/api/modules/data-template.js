import urlNames from "../url-names";
export default {
    // 数据模板--获取数据模板列表
    [urlNames.getTemplateList]: {
        type: "get",
        url: "/api/appdata/modelGenerated/getList",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
};
