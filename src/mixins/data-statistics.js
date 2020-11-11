/**
 * Created by wangxiaoshao on 2020/11/05.
 */
import { areaReportList, reportSystemSrc } from "@src/config/report";
export default {
    data() {
        return {
            startDate: "",
            endDate: "",
            startDate1: "",
            endDate1: "",
            searchDate: [],
            searchMouth: [],
            reportSrcList: areaReportList,
            tableName: "`static_db`.logger_action_",
            hostApi:
                "http://172.16.68.41:8080/webroot/decision/view/report?viewlet=",
            srcUrl: "",
            reportSystemSrc: reportSystemSrc,
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
        initializeDate() {
            let startDate = this.$moment()
                .subtract(1, "weeks")
                .format("YYYY-MM-DD");
            let endDate = this.$moment().format("YYYY-MM-DD");
            this.searchDate[0] = startDate;
            this.searchDate[1] = endDate;
            this.startDate = this.searchDate[0];
            this.endDate = this.searchDate[1];
        },
        initializeMounth() {
            let startDate = this.$moment()
                .subtract(1, "months")
                .format("YYYYMM");
            let endDate = this.$moment().format("YYYYMM");
            this.searchMouth[0] = startDate;
            this.searchMouth[1] = endDate;
            this.startDate1 = this.searchMouth[0];
            this.endDate1 = this.searchMouth[1];
            this.doformatParams();
        },
        dateChange(val) {
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
            }
        },
        mounthChange(val) {
            if (val) {
                this.startDate1 = val[0];
                this.endDate1 = val[1];
            }
            this.doformatParams();
        },
        doformatParams() {
            this.formatParams.format1 =
                this.$moment(this.startDate1).format("YYYY") + "0";
            this.formatParams.format2 = this.$moment(this.startDate1).format(
                "YYYY"
            );
            this.formatParams.format3 =
                this.$moment(this.startDate1).format("MM") - 1;
            this.formatParams.format4 =
                this.$moment(this.endDate1).format("MM") -
                this.$moment(this.startDate1).format("MM") +
                1;
            console.log(this.$moment(this.startDate1).format("MM"), "ffff");
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
                    url = this.hostApi + ary[0].cityOrCountyUrl + str;
                    this.cityOrCountyUrl = url;
                    break;
                case "homeUnit":
                    url = this.hostApi + ary[0].homeUnitUrl + str;
                    this.homeUnitUrl = url;
                    break;
                default:
                    return null;
            }
        },
        doSrcParams(data) {
            let str = "";
            Object.getOwnPropertyNames(data).forEach(function (key) {
                // if (data[key] !== "") {
                str += "&" + key + "=" + data[key];
                // }
            });
            return str;
        },
    },
};
