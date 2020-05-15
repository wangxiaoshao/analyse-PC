/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from "../url-names";

export default {
    /**
     * 获取应用列表
     */
    [urlNames.getStatistiscManageDto]: {
        type: "get",
        url: "/api/jg_manage/statistics/getStatistiscManageDto",
        keepOriginResponse: true,
        serve: "organizationManagePC",
        mock: "statistics/getStatistiscManageDto.json",
    },
    // 操作日志列表
    [urlNames.getDataLogList]: {
        type: "get",
        url: "/api/jg_manage/logger/findLoggerList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
        mock: "statistics/getDataLogList.json",
    },
    // 查询操作日志类型
    // 操作日志列表
    [urlNames.findLoggerTypeList]: {
        type: "get",
        url: "/api/jg_manage/logger/findLoggerTypeList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 系统日志列表
    [urlNames.findLoggerApiAccessList]: {
        type: "get",
        url: "/api/jg_manage/logger/findLoggerApiAccessList",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    [urlNames.findLoggerApiAccessById]: {
        type: "get",
        url: "/api/jg_manage/logger/findLoggerApiAccessById",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 登录日志列表
    // 获取首页接入昨日数据
    [urlNames.getStatistiscCount]: {
        type: "get",
        url: "/api/jg_manage/statistics/getStatistiscCount",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
    // 获取接入应用总数
    [urlNames.findApplicationCount]: {
        type: "get",
        url: "/api/jg_share/app/findApplicationCount",
        keepOriginResponse: true,
        serve: "organizationManagePC",
    },
    // 推送日志
    [urlNames.findPushLoggers]: {
        type: "get",
        url: "/api/jg_share/app/findPushLoggers",
        keepOriginResponse: true,
        showLoading: true,
        serve: "organizationManagePC",
    },
};
