import urlNames from "../url-names";
/**
 * 获取通讯录数据
 */
export default {
    /**
     * 本单位通讯录 查询用户所在单位
     */
    [urlNames.getAddressBookList]: {
        type: "get", // 请求类型
        url: "/api/jg_txl/TxlNode/org", // 请求地址
        keepOriginResponse: true, // 返回数据是否保留后端response数据格式
        serve: "organizationManagePC", // 该请求对应服务端，服务端名字在url-prefix中配置
        mock: "/address-book/addressBookList.json", // development模式下，本地mock数据地址
    },
    /**
     * 其他单位通讯录 查询用户所在单位
     */
    // [urlNames.getOtherAddressBookList]: {
    //   type: 'get', // 请求类型
    //   url: '/api/jg_txl/TxlNode/org', // 请求地址
    //   keepOriginResponse: true, // 返回数据是否保留后端response数据格式
    //   serve: 'organizationManagePC', // 该请求对应服务端，服务端名字在url-prefix中配置
    //   mock: '/address-book/addressBookList.json' // development模式下，本地mock数据地址
    // },
    /**
     * 查询内设机构下的下级内设机构
     */
    [urlNames.getDepartmentChildtree]: {
        type: "get", // 请求类型
        url: "/api/jg_txl/TxlNode/", // 请求地址
        keepOriginResponse: true, // 返回数据是否保留后端response数据格式
        serve: "organizationManagePC", // 该请求对应服务端，服务端名字在url-prefix中配置
        mock: "/address-book/departmentChildtree.json", // development模式下，本地mock数据地址
    },
    /**
     * 查询单位下内设机构通讯信息
     */
    [urlNames.getOrgDepartmentTxlList]: {
        type: "get", // 请求类型
        url: "/api/jg_txl/txl/orgDepartmentTxl", // 请求地址
        keepOriginResponse: true, // 返回数据是否保留后端response数据格式
        serve: "organizationManagePC", // 该请求对应服务端，服务端名字在url-prefix中配置
        mock: "/address-book/getOrgDepartmentTxlList.json", // development模式下，本地mock数据地址
    },
    /**
     * 查询单位下人员通讯信息
     */
    [urlNames.getOrgUserTxlList]: {
        type: "get", // 请求类型
        url: "/api/jg_txl/txl/orgUserTxl", // 请求地址
        keepOriginResponse: true, // 返回数据是否保留后端response数据格式
        serve: "organizationManagePC", // 该请求对应服务端，服务端名字在url-prefix中配置
        mock: "/address-book/getOrgUserTxlList.json", // development模式下，本地mock数据地址
    },
    /**
     * 查询内设机构下人员通讯信息
     */
    [urlNames.getDepartmentPersonList]: {
        type: "get", // 请求类型
        url: "/api/jg_txl/txl/departmentTxl", // 请求地址
        keepOriginResponse: true, // 返回数据是否保留后端response数据格式
        serve: "organizationManagePC", // 该请求对应服务端，服务端名字在url-prefix中配置
    },
};
