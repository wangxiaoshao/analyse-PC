<template>
    <div class="area-total">
        <el-form label-position="right" inline>
            <el-form-item
                label="选择区域"
                v-if="
                    app.rolesInfo.roleName != 'COUNTY_MANAGER' &&
                    app.rolesInfo.roleName != 'UNIT_MANAGER'
                "
            >
                <el-select
                    size="medium"
                    placeholder="请选择区域"
                    @change="stateChange"
                    v-model="stateParams"
                    value-key="treeId"
                >
                    <el-option
                        v-for="item in stateList"
                        :key="item.treeId"
                        :label="item.treeName"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="选择区县"
                v-if="app.rolesInfo.roleName != 'UNIT_MANAGER'"
            >
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
            <el-form-item label="单位类型">
                <el-select
                    size="medium"
                    placeholder="请选择单位类型"
                    @change="unitTypeChange"
                    v-model="unitType"
                    filterable
                >
                    <el-option
                        v-for="item in unitTypeList"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择单位">
                <el-select
                    size="medium"
                    placeholder="请选择单位"
                    @change="unitChange"
                    v-model="unitId"
                    filterable
                >
                    <el-option
                        v-for="item in unitList"
                        :key="item.orgId || item.treeId"
                        :label="item.orgName || item.treeName"
                        :value="item.orgId || item.treeId"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
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
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
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
        <div class="system-data">
            <div class="chart-box">
                <iframe
                    :src="srcUrl"
                    id="unitFrame"
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
import dataStatistics from "@src/mixins/data-statistics";
import applicationList from "@src/mixins/apply";
export default {
    mixins: [dataStatistics, applicationList],
    data() {
        return {
            appList: [],
            startDate1: "",
            endDate1: "",
            unitType: 2,
            stateParams: {},
            areaParams: {},
            stateId: "",
            systemId: 1,
            treeType: "",
            areaId: "",
            unitId: "",
            stateList: [],
            areaList: [],
            unitList: [],
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
        doApplyList() {
            let appList = [...this.applicationList];
            appList.map((item, index) => {
                if (item.id === 5) {
                    appList.splice(index, 1);
                }
            });
            this.appList = appList;
        },
        getStateList() {
            if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                this.initUnit("", "", this.unitType);
                return;
            }
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
                                this.initUnit(
                                    "",
                                    this.areaParams.treeId,
                                    this.unitType
                                );
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
        },
        initArea(treeId, treeType) {
            api[urlNames["getTreeList"]]({
                treeId,
                treeType,
            }).then((res) => {
                if (res.data) {
                    if (treeId === "520000" && treeType === 1) {
                        this.areaList = [];
                        this.areaParams = {};
                        this.unitList = res.data;
                        if (this.unitList.length > 0) {
                            this.unitId = this.unitList[0].treeId;
                        }
                        return;
                    }
                    this.areaList = res.data;
                    if (this.areaList.length > 0) {
                        this.areaParams = this.areaList[0];
                        this.initUnit(
                            this.stateParams.treeId,
                            this.areaParams.treeId,
                            this.unitType
                        );
                    }
                }
            });
        },
        initUnit(cityCode, countyCode, assessType, treeType) {
            let data = {};
            let apiUrl = "";
            if (
                this.app.rolesInfo.roleName === "CITY_MANAGER" ||
                this.app.rolesInfo.roleName === "SUPER_MANAGER" ||
                this.app.rolesInfo.roleName === "PROVINCE_MANAGER"
            ) {
                data.cityCode = cityCode;
                data.countyCode = countyCode;
                data.assessType = assessType;
                apiUrl = "getCityCountyOrgList";
            } else if (this.app.rolesInfo.roleName === "COUNTY_MANAGER") {
                data.countyCode = countyCode;
                data.assessType = assessType;
                apiUrl = "getCountyOrgList";
            } else if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                data.assessType = assessType;
                data.orgIds = this.app.rolesInfo.authorizedOid;
                apiUrl = "getOrgListByIds";
            }
            api[urlNames[apiUrl]](data).then((res) => {
                if (res.data) {
                    this.unitList = res.data;
                    if (this.unitList.length > 0) {
                        this.unitId = res.data[0].orgId || res.data[0].treeId;
                    } else {
                        this.unitId = "";
                        this.unitList = [];
                    }
                }
            });
        },
        unitTypeChange() {
            console.log(this.stateParams, this.areaParams);
            let data = {
                treeId: this.stateParams.treeId,
                areaId: this.areaParams.treeId ? this.areaParams.treeId : "",
                unitType: this.unitType,
                treeType: this.stateParams.treeType,
            };
            this.initUnit(
                data.treeId,
                data.areaId,
                data.unitType,
                data.treeType
            );
        },
        dateChange(val) {
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
                if (this.systemId === 6) {
                    this.startDate1 = val[0];
                    this.endDate1 = val[1];
                    this.searchDate[0] = this.startDate1;
                    this.searchDate[1] = this.endDate1;
                }
            }
        },
        stateChange(data) {
            this.stateId = data.treeId;
            this.treeType = data.treeType;
            this.unitId = "";
            this.unitList = [];
            if (this.areaParams.treeId) {
                this.areaParams = {};
            }
            this.initArea(this.stateId, this.treeType);
        },
        areaChange(val) {
            this.areaId = val.treeId;
            this.treeType = val.treeType;
            this.unitId = "";
            this.unitList = [];
            this.initUnit(
                this.stateId,
                this.areaId,
                this.unitType,
                this.treeType
            );
        },
        unitChange() {},
        applyChange(val) {
            this.searchData();
        },
        searchData() {
            let data = {
                isStat: this.unitType === 2 ? "" : this.unitType,
                cityNum:
                    this.stateParams.treeId === "520000"
                        ? 0
                        : this.stateParams.treeId,
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
                orgId: this.unitId,
            };
            if (this.systemId === 6) {
                data.startDate = this.startDate1;
                data.endDate = this.endDate1;
            }
            this.initSystem("unit", this.doSrcParams(data));
        },
    },
    watch: {
        unitId(val1, val2) {
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
#unitFrame {
    width: 100%;
    height: 480px;
    overflow: hidden;
}
</style>
