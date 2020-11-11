<template>
    <div class="area-total">
        <div class="serch-box" id="serch-box">
            <el-form label-position="right" inline>
                <el-row>
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
                            filterable
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
                            v-if="systemId !== 6"
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
                        <el-date-picker
                            v-else
                            v-model="searchMouth"
                            type="monthrange"
                            format="yyyy-MM"
                            value-format="yyyyMM"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerMounthOptions"
                            @change="mounthChange"
                            @blur="onDateBlur"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchData"
                            >查询</el-button
                        >
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="system-list">
                <span>系统应用： </span>
                <el-radio-group v-model="systemId" @change="applyChange">
                    <el-radio-button
                        :label="item.id"
                        v-for="item in appList"
                        :key="item.systemSymbol"
                        >{{ item.systemName }}</el-radio-button
                    >
                </el-radio-group>
            </div>
        </div>

        <div class="system-data">
            <div class="chart-box">
                <iframe
                    @onload="afterload"
                    :src="srcUrl"
                    id="areaFrame"
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
import dataStatistics from "@src/mixins/data-statistics";
export default {
    mixins: [pickerOptions, dataStatistics],
    data() {
        return {
            appList: [],
            unitType: 2,
            stateParams: {},
            areaParams: {},
            stateId: "",
            treeType: "",
            systemId: 1,
            stateList: [],
            areaList: [],
        };
    },
    created() {
        this.initializeDate();
        this.initializeMounth();
        this.doApplyList();
        this.getStateList();
    },
    mounted() {
        this.pickDateOptionRules();
        this.pickMounthOptionRules();
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        afterload() {
            // iframe 加载后触发
            console.log(11111);
            console.log(this.$refs.iframe.contentWindow);
            var contentPane = document.getElementById("reportFrame")
                .contentWindow.contentPane; // 获取报表 contentPane
            var cPageIndex = contentPane.currentPageIndex; // 当前所在页
            var pv =
                "第" +
                cPageIndex +
                "页/共" +
                contentPane.reportTotalPage +
                "页"; // 报表首次加载结束后显示的页码信息
            document.getElementById("page").value = pv; // 将页码信息赋给 page 文本
            contentPane.on("afterload", function () {
                // 报表加载结束监听事件
                cPageIndex = contentPane.currentPageIndex; // 每次加载完后重新获取当前页码
                pv =
                    "第" +
                    cPageIndex +
                    "页/共" +
                    contentPane.reportTotalPage +
                    "页"; // 重新生成页码信息
                document.getElementById("page").value = pv; // 重新给 page 文本赋页码信息
            });
        },
        doApplyList() {
            let appList = [...this.app.applicationList];
            appList.map((item, index) => {
                if (item.id === 5) {
                    appList.splice(index, 1);
                }
            });
            this.appList = appList;
        },
        getStateList() {
            if (
                this.app.rolesInfo.roleName === "SUPER_MANAGER" ||
                this.app.rolesInfo.roleName === "PROVINCE_MANAGER"
            ) {
                api[urlNames["getTreeList"]]({
                    treeId: "520000",
                    treeType: 0,
                }).then((res) => {
                    if (res.data) {
                        this.stateList = res.data;
                        if (this.stateList.length > 0) {
                            this.stateParams = this.stateList[0];
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
                        if (this.app.rolesInfo.roleName === "COUNTY_MANAGER") {
                            this.areaList = aryList;
                            if (this.areaList.length > 0) {
                                this.areaParams = this.areaList[0];
                            }
                            return;
                        }
                        if (
                            this.app.rolesInfo.roleName === "SUPER_MANAGER" ||
                            this.app.rolesInfo.roleName ===
                                "PROVINCE_MANAGER" ||
                            this.app.rolesInfo.roleName === "CITY_MANAGER"
                        ) {
                            this.stateList = aryList;
                            if (this.stateList.length > 0) {
                                this.stateParams = this.stateList[0];
                                this.initArea(
                                    this.stateParams.treeId,
                                    this.stateParams.treeType
                                );
                            }
                        }
                    }
                });
            }
            // this.searchData();
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
        unitTypeChange() {
            this.searchData();
        },
        stateChange(data) {
            this.areaParams = {};
            this.areaList = [];
            this.stateId = data.treeId;
            this.treeType = data.treeType;
            this.initArea(this.stateId, this.treeType);
        },
        areaChange(val) {},
        applyChange(val) {
            this.searchData();
        },
        searchData() {
            let data = {
                isStat: this.unitType === 2 ? "" : this.unitType,
                cityNum:
                    this.stateParams.treeId === "520000"
                        ? 0
                        : this.stateParams.treeId
                        ? this.stateParams.treeId
                        : "",
                codeNum:
                    this.stateParams.treeId === "520000"
                        ? this.stateParams.treeId
                        : this.areaParams.treeId,
                qxNum:
                    this.stateParams.treeId === "520000"
                        ? 0
                        : this.areaParams.treeId,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            if (this.systemId === 6) {
                data.startDate = this.startDate1;
                data.endDate = this.endDate1;
                data.format1 = this.formatParams.format1;
                data.format2 = this.formatParams.format2;
                data.startDay = this.formatParams.format3;
                data.size = this.formatParams.format4;
            }
            console.log(data);
            this.initSystem("area", this.doSrcParams(data));
        },
    },
    watch: {
        stateParams() {
            this.searchData();
        },
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
#areaFrame {
    width: 100%;
    height: 480px;
    overflow: hidden;
}
</style>
