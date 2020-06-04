/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from "../url-names";

export default {
    /**
     * 根据id查询结点详情
     */
    [urlNames.findViewNodeById]: {
        type: "get",
        url: "/api/jg_manage/viewNode/findViewNodeById",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    /**
     * 添加节点、设置节点
     */
    [urlNames.createViewNode]: {
        type: "post",
        url: "/api/jg_manage/viewNode/createViewNode",
        showLoading: true,
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    /**
     * 获取下级列表
     */
    [urlNames.findViewNodeList]: {
        type: "get",
        url: "/api/jg_manage/viewNode/findViewNodeList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    /**
     * 调整节点顺序
     */
    [urlNames.setViewNodeSort]: {
        type: "post",
        url: "/api/jg_manage/viewNode/setViewNodeSort",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: false, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    /**
     * 根据ID查询内设机构详情
     */
    [urlNames.findDepartmentById]: {
        type: "get",
        url: "/api/jg_manage/department/findDepartmentById",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    /**
     * 添加内设机构、设置内设机构
     */
    [urlNames.createDepartment]: {
        type: "post",
        url: "/api/jg_manage/department/createDepartment",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: true, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    // 添加人员
    [urlNames.createUser]: {
        type: "post",
        url: "/api/jg_manage/user/createUser",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: true, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    // 查询内设机构下的所有人员
    [urlNames.findDepartmentMembers]: {
        type: "get",
        url: "/api/jg_manage/user/findDepartmentMembers",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },

    [urlNames.findIdentityById]: {
        type: "get",
        url: "/api/jg_manage/user/findIdentityById",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    // 查询单位下的所有人员
    [urlNames.findOrganizationMembers]: {
        type: "get",
        url: "/api/jg_manage/user/findOrganizationMembers",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.setUserSort]: {
        type: "post",
        url: "/api/jg_manage/user/setUserSort",
        keepOriginResponse: true,
        showLoading: false,
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    // 内设机构下人员数值排序
    [urlNames.setSortThroughNumerical]: {
        type: "post",
        url: "/api/jg_manage/user/setSortThroughNumerical",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: true, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 单位下数值排序
    [urlNames.setViewNodeSortThroughNumerical]: {
        type: "post",
        url: "/api/jg_manage/viewNode/setViewNodeSortThroughNumerical",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: true, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.findUserById]: {
        type: "get",
        url: "/api/jg_manage/user/findUserById",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.findUserAccountByUid]: {
        type: "get",
        url: "/api/jg_manage/user/findUserAccountByUid",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },

    // 获取所有的账号列表
    [urlNames.findAllAccountByUid]: {
        type: "get",
        url: "/api/jg_manage/user/findAllAccountByUid",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },

    // 获取账号信息
    [urlNames.findAccountById]: {
        type: "get",
        url: "/api/jg_manage/user/findAccountById",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },

    // 修改账号信息
    [urlNames.updateAccount]: {
        type: "post",
        url: "/api/jg_manage/user/updateAccount",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: true, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    // 多身份管理——》获取身份列表
    [urlNames.userIdList]: {
        type: "get",
        url: "/api/jg_manage/user/userIdList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 多身份管理——》添加身份记录
    [urlNames.getIdentityRecord]: {
        type: "get",
        url: "/api/jg_manage/user/getIdentityRecord",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 多身份管理——》添加身份
    [urlNames.createUserId]: {
        type: "post",
        url: "/api/jg_manage/user/createUserId",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.findLeaderList]: {
        type: "get",
        url: "/api/jg_manage/user/findLeaderList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.deleteLeader]: {
        type: "get",
        url: "/api/jg_manage/user/deleteLeader",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.roleList]: {
        type: "get",
        url: "/api/jg_manage/user/roleList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.findPerson]: {
        type: "get",
        url: "/api/jg_manage/user/lookPerson",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    // 创建单位
    [urlNames.createOrganization]: {
        type: "post",
        url: "/api/jg_manage/organ/createOrganization",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: true, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.findOrgAreaList]: {
        type: "get",
        url: "/api/jg_manage/organ/findOrgAreaList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    /**
     * 人员管理
     */
    [urlNames.getPersonList]: {
        type: "get",
        url: "/work/service/getPersonList",
        serve: "organizationManagePC",
    },
    /* 人员调出 */
    [urlNames.calloutUser]: {
        type: "post",
        url: "/api/jg_manage/user/calloutUser",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: false, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.removeDuty]: {
        type: "get",
        url: "/api/jg_manage/user/removeDuty",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: false, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",

        /* headers: {
      'Content-Type': 'application/json'
    } */
    },
    [urlNames.createLeader]: {
        type: "post",
        url: "/api/jg_manage/user/createLeader",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        showLoading: true, // 该请求发送时，是否显示全局loading
        serve: "organizationManagePC",

        headers: {
            "Content-Type": "application/json",
        },
    },
    [urlNames.getAreaList]: {
        type: "get",
        url: "/api/jg_manage/organ/findAreaList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.findOrganizationById]: {
        type: "get",
        url: "/api/jg_manage/organ/findOrganizationById",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.dicList]: {
        type: "get",
        url: "/api/jg_manage/system/dictList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.findUserByParams]: {
        type: "get",
        // url: '/api/jg_manage/user/findUserByParams',
        url: "/api/jg_manage/user/getUserCallInByName",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.findEntityChangeLoggerList]: {
        type: "get",
        url: "/api/jg_manage/entityChangeLogger/findEntityChangeLoggerList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    // 查看单位日志
    [urlNames.getEntityChangeLoggerDetail]: {
        type: "get",
        url: "/api/jg_manage/entityChangeLogger/getEntityChangeLoggerDetail",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.exportUser]: {
        type: "get",
        url: "/api/jg_manage/user/exportUser",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.importUser]: {
        type: "post",
        url: "/api/jg_manage/import/userImport",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.deleteUserLabelOrDeptLabelOrOrgLabel]: {
        type: "get",
        url: "api/jg_manage/label/deleteUserLabelOrDeptLabelOrOrgLabel",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.deleteAppBindAccount]: {
        type: "get",
        url: "api/jg_manage/user/deleteAppBindAccount",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.changeSessionUserId]: {
        type: "get",
        url: "/api/gate/sessionUser/changeUserId",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.logout]: {
        type: "get",
        url: "/api/gate/logout",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.findSessionUserList]: {
        type: "get",
        url: "/api/jg_manage/user/sessionUserIdList",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    [urlNames.findUserAccountNickName]: {
        type: "get",
        url: "/api/jg_manage/user/findUserAccountNickName",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },
    // 社会信用代码
    [urlNames.orgCreditId]: {
        type: "get",
        url: "/api/jg_manage/orgCreditId",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },

    // 验证身份证号码
    [urlNames.idCardValidation]: {
        type: "get",
        url: "/api/jg_manage/idCard/idCardValidation",
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: "organizationManagePC",
    },

    // 查询手机号是否重复
    [urlNames.selectMobileIsSame]: {
        type: "get",
        url: "/api/jg_manage/user/selectMobileIsSame",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
};
