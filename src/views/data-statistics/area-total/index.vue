<template>
    <div class="area-total">
        <div class="serch-box" id="serch-box">
            <el-form label-position="right" inline>
                <el-form-item label="单位类型">
                    <el-select
                        size="medium"
                        placeholder="请选择单位类型"
                        @change="unitTypeChange"
                        v-model="unitType"
                    >
                        <el-option
                            v-for="item in unitTypeList"
                            :key="item.type"
                            :label="item.name"
                            :value="item.type"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="选择区域"
                    v-if="app.rolesInfo.roleName !== 'COUNTY_MANAGER'"
                >
                    <el-select
                        size="medium"
                        placeholder="请选择区域"
                        @change="stateChange"
                        value-key="treeId"
                        v-model="stateParams"
                    >
                        <el-option
                            v-for="item in stateList"
                            :key="item.treeId"
                            :label="item.treeName"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择区县">
                    <el-select
                        size="medium"
                        placeholder="请选择区县"
                        @change="areaChange"
                        v-model="areaParams"
                        value-key="treeId"
                    >
                        <el-option
                            v-for="item in areaList"
                            :key="item.treeId"
                            :label="item.treeName"
                            :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <!-- <span>日期：</span> -->
                    <el-date-picker
                        v-model="searchDate"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions"
                        @change="dateChange"
                        @blur="onDateBlur"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchData"
                        >查询</el-button
                    >
                </el-form-item>
            </el-form>
            <div class="system-list">
                <span>系统应用： </span>
                <el-radio-group v-model="systemId" @change="applyChange">
                    <el-radio-button
                        :label="item.id"
                        v-for="item in app.applicationList"
                        :key="item.systemSymbol"
                        >{{ item.systemName }}</el-radio-button
                    >
                </el-radio-group>
            </div>
        </div>

        <div class="system-data">
            <div class="chart-box">
                <iframe
                    :src="srcUrl"
                    id="reportFrame"
                    frameborder="0"
                    scrolling="no"
                    ref="iframe"
                ></iframe>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { api, urlNames } from "@src/api";
import pickerOptions from "@src/mixins/picker-options";
const reportList = [
    {
        id: 1,
        systemName: "门户",
        url:
            "mh_statistics%252F%25E9%2597%25A8%25E6%2588%25B7%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
    },
    {
        id: 2,
        systemName: "台账",
        url:
            "tz_statistics%252F%25E5%258F%25B0%25E8%25B4%25A6%25E4%25BA%25BA%25E5%2591%2598%25E8%25AF%25A6%25E7%25BB%2586%25E6%2595%25B0%25E6%258D%25AE.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
    },
    {
        id: 3,
        systemName: "通知公告",
        url:
            "tzgg_statistics%252F%25E9%2580%259A%25E7%259F%25A5%25E5%2585%25AC%25E5%2591%258A%25E5%258C%25BA%25E5%259F%259F%25E6%2595%25B0%25E6%258D%25AE%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
    },
    {
        id: 4,
        systemName: "快传",
        url: "",
    },
    {
        id: 5,
        systemName: "组织机构",
        url: "",
    },
    {
        id: 6,
        systemName: "公文",
        url: "",
    },
    {
        id: 7,
        systemName: "事务办理",
        url: "",
    },
    {
        id: 8,
        systemName: "单点登录",
        url: "",
    },
];
export default {
    mixins: [pickerOptions],
    data() {
        return {
            searchDate: [],
            hostApi:
                "http://localhost:8088/webroot/decision/view/report?viewlet=",
            srcUrl: "",
            reportSrcList: reportList,
            unitType: 2,
            stateParams: {},
            areaParams: {},
            stateId: "",
            treeType: "",
            startDate: "",
            formatParams: {
                format1: "",
                format2: "",
                format3: "",
                format4: "",
            },
            endDate: "",
            systemId: 2,
            unitTypeList: [
                { name: "非考核单位", type: 0 },
                { name: "考核单位", type: 1 },
                { name: "全部", type: 2 },
            ],

            stateList: [],
            areaList: [],
        };
    },
    created() {
        console.log(this.app.rolesInfo);
        this.getStateList();
        this.initializeDate();
    },
    mounted() {
        this.pickDateOptionRules();
        this.searchData();
    },
    computed: {
        ...mapState(["app"]),
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
        getStateList() {
            if (
                this.app.rolesInfo.roleName === "SYSTEM_MANAGER" ||
                this.app.rolesInfo.roleName === "PROVINCE_MANAGER"
            ) {
                api[urlNames["getTreeList"]]({
                    treeId: "520000",
                    treeType: 0,
                }).then((res) => {
                    if (res.data) {
                        this.stateList = res.data;
                        if (this.stateList.length > 0) {
                            this.stateParams = this.stateList[1];
                            this.initArea(
                                this.stateParams.treeId,
                                this.stateParams.treeType
                            );
                        }
                    }
                });
            } else {
                let data = {
                    codeList: this.app.rolesInfo.authorizedOid,
                    authorizedType: this.app.rolesInfo.authorizedType,
                };
                api[urlNames["getAreaList"]](data).then((res) => {
                    if (res.data) {
                        let aryList = [];
                        res.data.forEach((item) => {
                            let obj = {
                                treeId: item.areaCode,
                                treeName: item.areaName,
                                treeType: item.areaType,
                            };
                            aryList.push(obj);
                        });
                        this.stateList = aryList;
                        if (this.stateList.length > 0) {
                            this.stateParams = this.stateList[1];
                            this.initArea(
                                this.stateParams.treeId,
                                this.stateParams.treeType
                            );
                        }

                        if (this.app.rolesInfo.roleName === "COUNTY_MANAGER") {
                            this.areaList = aryList;
                        }
                    }
                });
            }
        },
        initArea(treeId, treeType) {
            if (treeId === "520000" && treeType === 1) {
                this.areaList = [];
                return;
            }
            api[urlNames["getTreeList"]]({
                treeId,
                treeType,
            }).then((res) => {
                if (res.data) {
                    this.areaList = res.data;
                    if (this.areaList.length > 0) {
                        this.areaParams = this.areaList[0];
                    }
                }
            });
        },
        unitTypeChange() {},
        dateChange(val) {
            console.log(val, this.searchDate);
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
            }
            this.doformatParams();
        },
        stateChange(data) {
            this.areaParams = {};
            this.areaList = [];
            console.log(data, this.stateParams);
            this.stateId = data.treeId;
            this.treeType = data.treeType;
            this.initArea(this.stateId, this.treeType);
        },
        areaChange(val) {},
        applyChange(val) {
            console.log(this.systemId);
            this.searchData();
        },
        initSystem(reportSrcList, str) {
            let ary = reportSrcList.filter((item) => {
                return item.id === this.systemId;
            });
            this.srcUrl = this.hostApi + ary[0].url + str;
        },
        searchData() {
            let data = {
                isStat: this.unitType,
                codeNum: this.stateParams.treeId,
                qxNum:
                    this.stateParams.treeId === "520000"
                        ? 0
                        : this.areaParams.treeId,
                startDate: this.startDate,
                endDate: this.endDate,
                format1: this.formatParams.format1,
                format2: this.formatParams.format2,
                startDay: this.formatParams.format3,
                size: this.formatParams.format4,
            };
            console.log(data);
            let str = "";
            Object.getOwnPropertyNames(data).forEach(function (key) {
                if (data[key] !== "") {
                    str += "&" + key + "=" + data[key];
                }
            });
            this.initSystem(this.reportSrcList, str);
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
    },
    watch: {
        // stateParams() {
        //     this.searchData();
        // },
        areaParams() {
            this.searchData();
        },
    },
};
</script>
<style lang="less" scoped>
.chart-box {
    width: 100%;
    padding: 20px 0;
}
#reportFrame {
    width: 100%;
    height: 480px;
    overflow: hidden;
}
</style>
