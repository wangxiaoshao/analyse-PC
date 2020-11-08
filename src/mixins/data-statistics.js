/**
 * Created by wangxiaoshao on 2020/11/05.
 */
import { areaReportList } from "@src/config/report";
export default {
    data() {
        return {
            searchDate: [],
            reportSrcList: areaReportList,
            hostApi:
                "http://localhost:8088/webroot/decision/view/report?viewlet=",
            srcUrl: "",
            unitTypeList: [
                { name: "非考核单位", type: 0 },
                { name: "考核单位", type: 1 },
                { name: "全部", type: 2 },
            ],
            formatParams: {
                format1: "",
                format2: "",
                format3: "",
                format4: "",
            },
        };
    },
    methods: {
        initializeDate(flag) {
            // flag 是否处理时间  true,不处理 fasle处理。如：2020-10-28~~2020-11-03 一周时间 处理为：2020-11-11-01~~2020-11-03
            if (!flag) {
                flag = false;
            }
            let data1 = new Date();
            let data2 = new Date();
            data1.setDate(data2.getDate() - 7);
            let startDate = this.formatDate(data1);
            let endDate = this.formatDate(data2);
            let newstartDate = "";
            if (
                new Date(startDate).getMonth() + 1 <
                    new Date(endDate).getMonth() + 1 &&
                !flag
            ) {
                newstartDate = endDate.substring(0, 8) + "01";
                console.log(newstartDate);
            } else {
                newstartDate = startDate;
            }
            this.searchDate[0] = newstartDate;
            this.searchDate[1] = endDate;
            this.startDate = this.searchDate[0];
            this.endDate = this.searchDate[1];
            this.doformatParams();
        },
        doformatParams() {
            this.formatParams.format1 = this.startDate.substring(0, 8) + "0";
            this.formatParams.format2 = this.startDate.substring(0, 8);
            this.formatParams.format3 = new Date(this.startDate).getDate() - 1;
            this.formatParams.format4 =
                new Date(this.endDate).getDate() -
                new Date(this.startDate).getDate() +
                1;
        },
        // 格式化时间
        formatDate(value) {
            if (value) {
                var Y = value.getFullYear() + "-";
                var M =
                    (value.getMonth() + 1 < 10
                        ? "0" + (value.getMonth() + 1)
                        : value.getMonth() + 1) + "-";
                var D =
                    value.getDate() < 10
                        ? "0" + value.getDate()
                        : value.getDate();
                var df = Y + M + D;
                return df;
            } else {
                return "";
            }
        },
        initSystem(type, str, systemId) {
            if (!systemId) {
                systemId = this.systemId;
            }
            let ary = this.reportSrcList.filter((item) => {
                return item.id === systemId;
            });
            let url = "";
            switch (type) {
                case "area":
                    url = this.hostApi + ary[0].areaUrl + str;
                    this.srcUrl = url;
                    break;
                case "unit":
                    url = this.hostApi + ary[0].unitUrl + str;
                    this.srcUrl = url;
                    break;
                case "person":
                    url = this.hostApi + ary[0].personUrl + str;
                    this.srcUrl = url;
                    break;
                case "province":
                    url = this.hostApi + ary[0].allProvinceUrl + str;
                    this.srcUrl = url;
                    break;
                case "homePerson":
                    url = this.hostApi + ary[0].homePersonUrl + str;
                    this.homePersonUrl = url;
                    break;
                case "cityOrCounty":
                    console.log(ary);
                    url = this.hostApi + ary[0].cityOrCountySrc + str;
                    this.cityOrCountySrc = url;
                    break;
                default:
                    return null;
            }
        },
        doSrcParams(data) {
            let str = "";
            Object.getOwnPropertyNames(data).forEach(function (key) {
                if (data[key] !== "") {
                    str += "&" + key + "=" + data[key];
                }
            });
            return str;
        },
    },
};
