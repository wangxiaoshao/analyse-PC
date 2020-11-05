/**
 * Created by wangxiaoshao on 2020/11/05.
 */
import pickerOptions from "@src/mixins/picker-options";
export default {
    mixins: [pickerOptions],
    data() {
        return {
            hostApi:
                "http://localhost:8088/webroot/decision/view/report?viewlet=",
            srcUrl: "",
        };
    },
    methods: {
        initializeDate() {
            let data1 = new Date();
            let data2 = new Date();
            data1.setDate(data2.getDate() - 7);
            let startDate = this.formatDate(data1);
            let endDate = this.formatDate(data2);
            let newstartDate = "";
            if (
                new Date(startDate).getMonth() + 1 <
                new Date(endDate).getMonth() + 1
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
        initSystem(reportSrcList, str) {
            let ary = reportSrcList.filter((item) => {
                return item.id === this.systemId;
            });
            this.srcUrl = this.hostApi + ary[0].url + str;
        },
    },
};
