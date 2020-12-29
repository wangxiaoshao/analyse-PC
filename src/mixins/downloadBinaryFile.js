import sha1 from "js-sha1";
// import { api, urlNames } from "@src/api";
/**
 * mixins
 * 翻页、排序、过滤、自动计算table高度
 * 获取列表方法名需要统一为 getGrid()
 */
export default {
    data() {
        return {};
    },
    methods: {
        downloadBinaryFile(type, loadParams) {
            if (type === "userHeadimg") {
                // api[urlNames["exportHeadimg"]]({
                //     orgId: orgId,
                //     departmentId: deptId,
                // }).then((res) => {
                //     window.open(res.data[0]);
                // });

                return;
            }
            let timestamp = new Date().getTime();
            let host = window.location.href.split("#")[0];
            let apiUrl = "";
            let params = {};
            let openUrl = "";
            switch (type) {
                case "systemLog":
                case "actionLog":
                    apiUrl = "/api/appdata/log/exportLogs";
                    params = loadParams;
                    break;
                case "shareLog":
                    apiUrl = "/api/logger/switchLogger/exportShareLogger";
                    params = loadParams;
                    break;
                case "template":
                    apiUrl = "/api/appdata/modelGenerated/download/modelFile";
                    params = loadParams;
                    break;
                case "helpCenter":
                    apiUrl = "/api/appdata/helpFile/download/helpFile";
                    params = loadParams;
                    break;
                default:
                    return null;
            }
            params = Object.assign({}, params);
            params._ = timestamp;
            params.sign = this.getSign(params, timestamp);
            openUrl = host + apiUrl + "?" + this.buildUrlQuery(params);
            window.open(openUrl);
        },

        /*
         * @des: get 请求加签，此方法不适用与post
         */
        getSign(params, timestamp) {
            let data = JSON.parse(JSON.stringify(params));
            data = typeof data === "object" ? data : {};
            // 时间戳需要传入，才能保持时间戳一致
            data._ = timestamp;
            let aKeys = Object.keys(data);
            let aSign = [];

            let length = aKeys.length;
            for (let i = 0; i < length; i++) {
                let key = aKeys[i];
                aSign.push(key + "=" + data[key]);
            }
            aSign.sort();
            return sha1(aSign.join(""));
        },
        /**
         * 将对象构建为url查询
         */
        buildUrlQuery(paramsObj) {
            let paramsList = [];

            for (let key in paramsObj) {
                paramsList.push(key + "=" + paramsObj[key]);
            }

            return paramsList.join("&");
        },
    },
};
