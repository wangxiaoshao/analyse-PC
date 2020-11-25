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
                    v-if="systemId !== 5 && systemId !== 6"
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
                <el-button type="primary" @click="resetData">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="system-list">
            <transition-group tag="ul" appear>
                <li
                    :key="-1"
                    @click="applyChange(-1)"
                    :class="{
                        isActive: systemId == -1,
                    }"
                >
                    全部
                </li>
                <li
                    v-for="item in app.applicationList"
                    :key="item.id"
                    :class="{
                        isActive: systemId == item.id,
                    }"
                    @click="applyChange(item.id)"
                >
                    {{ item.systemName }}
                </li>
            </transition-group>
        </div>
        <div class="system-data">
            <div class="chart-box">
                <iframe
                    :src="unitSrc"
                    id="unitFrame"
                    frameborder="0"
                    scrolling="no"
                    ref="iframe"
                ></iframe>
                <iframe
                    :src="tableOrMemberSrc"
                    id="unitMemberIframe"
                    frameborder="0"
                    width="100%"
                    height="100%"
                    scrolling="no"
                    ref="unitMemberIframe"
                ></iframe>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="send('_g().gotoPreviousPage()')"
                    @next-click="send('_g().gotoNextPage()')"
                    :current-page="page.current"
                    :page-sizes="[10]"
                    :page-size="page.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                ></el-pagination>
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
            unitSrc: "",
            tableOrMemberSrc: "",
            startDate1: "",
            endDate1: "",
            unitType: 2,
            stateParams: {},
            areaParams: {},
            stateId: "",
            systemId: -1,
            treeType: "",
            areaId: "",
            unitId: "",
            stateList: [],
            areaList: [],
            unitList: [],
            page: {
                current: 1,
                limit: 10,
                total: 0,
            },
            isTable: false,
            autoParams: {
                chartHeight: 300,
                tableHeight: 300,
                total: 0,
            },
        };
    },
    created() {
        this.initializeDate();
        this.initializeMounth();
        this.getStateList();
    },
    mounted() {
        this.pickDateOptionRules();
        this.pickMounthOptionRules();
        this.initReportPage();
        this.initUnitHeight();
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        send(msg) {
            window.sendMessage(msg);
        },
        initReportPage() {
            var ifr = document.getElementById("unitMemberIframe").contentWindow;
            var sendMessage = function () {
                if (window.postMessage) {
                    if (window.addEventListener) {
                    } else if (window.attachEvent) {
                        window.attachEvent("onmessage", function (e) {
                            console.log(e.data, 2222);
                        });
                    }
                    return function (data) {
                        // console.log(data, 333);
                        ifr.postMessage(data, "*");
                    };
                } else {
                    var hash = "";
                    setInterval(function () {
                        if (window.name !== hash) {
                            hash = window.name;
                        }
                    }, 200);
                    return function (data) {
                        console.log(data, 444);
                        ifr.name = data;
                    };
                }
            };
            window.sendMessage = sendMessage();
        },
        initUnitHeight() {
            let that = this;
            const unitFrame = document.getElementById("unitFrame");
            unitFrame.onload = function () {
                window.addEventListener(
                    "message",
                    function (e) {
                        if (e.data.height > -1 && e.data.total > -1) {
                            that.autoParams.tableHeight = e.data.height;
                            that.autoParams.total = e.data.total;
                        } else if (
                            e.data.height > -1 &&
                            !e.data.total &&
                            e.data.total !== 0
                        ) {
                            that.autoParams.chartHeight = e.data.height;
                        }
                        console.log(e.data, "uuuuuuu");
                    },
                    false
                );
            };
        },
        isRoleState() {
            return (
                this.app.rolesInfo.roleName === "CITY_MANAGER" ||
                this.app.rolesInfo.roleName === "SUPER_MANAGER" ||
                this.app.rolesInfo.roleName === "PROVINCE_MANAGER"
            );
        },
        getStateList() {
            this.unitType = 2;
            /* 1.单位管理员 初始化单单位 */
            if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                this.isTable = true;
                this.initUnit("", "", this.unitType);
                return;
            }
            /* 1.超级管理员 省级管理员 */
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
                /* 3.市州管理员，区县管理员 */
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
                        /* 区县管理员初始化单位 */
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
                        /* 市州管理员 超管 省级 初始化单位 */
                        if (this.isRoleState()) {
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
        // isSet 是否默认选中第一个单位参数
        initArea(treeId, treeType, isSet) {
            if (!isSet) {
                isSet = false;
            }
            api[urlNames["getTreeList"]]({
                treeId,
                treeType,
            }).then((res) => {
                if (res.data) {
                    if (treeId === "520000" && treeType === 1) {
                        this.areaList = [];
                        this.areaParams = {};
                        this.unitList = res.data;
                        if (this.unitList.length > 0 && !isSet) {
                            this.unitId = this.unitList[0].treeId;
                            this.searchData();
                        }
                        return;
                    }
                    this.areaList = res.data;
                    if (this.areaList.length > 0 && !isSet) {
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
        /* cityCode市州编码 countyCode区县编码  assessType单位类型 isSearch是否默人选中下拉选和查询数据 */
        initUnit(cityCode, countyCode, assessType, isSearch) {
            if (!isSearch) {
                isSearch = false;
            }
            let data = {};
            let apiUrl = "";
            if (this.isRoleState()) {
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
                    if (
                        this.unitList.length > 0 &&
                        this.app.rolesInfo.roleName !== "UNIT_MANAGER" &&
                        !isSearch
                    ) {
                        this.unitId = res.data[0].orgId || res.data[0].treeId;
                    } else if (this.unitList.length === 1 && !isSearch) {
                        this.unitId = res.data[0].orgId || res.data[0].treeId;
                    } else {
                        this.unitId = "";
                    }
                    if (!isSearch) {
                        this.searchData();
                    }
                }
            });
        },
        handleSizeChange(val) {
            this.page.limit = val;
        },
        handleCurrentChange(val) {
            this.page.current = val;
            this.send(`_g().gotoPage(${this.page.current})`);
        },
        unitTypeChange() {
            let data = {
                treeId: this.stateParams.treeId,
                areaId: this.areaParams.treeId ? this.areaParams.treeId : "",
                unitType: this.unitType,
                treeType: this.stateParams.treeType,
            };
            this.initUnit(data.treeId, data.areaId, data.unitType, true);
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
            this.initArea(this.stateId, this.treeType, true);
        },
        areaChange(val) {
            this.areaId = val.treeId;
            this.treeType = val.treeType;
            this.unitId = "";
            this.unitList = [];
            this.initUnit(this.stateId, this.areaId, this.unitType, true);
        },
        unitChange(val) {},
        applyChange(val) {
            this.systemId = val;
            this.isTable =
                this.unitId === "" ||
                this.systemId === 1 ||
                this.systemId === 5 ||
                this.systemId === 6;
            this.getStateList();
        },
        searchData() {
            this.page.current = 1;
            if (
                this.isRoleState() ||
                this.app.rolesInfo.roleName === "COUNTY_MANAGER"
            ) {
                if (
                    !this.areaParams.treeId &&
                    this.unitId === "" &&
                    this.stateParams.treeId !== "520000"
                ) {
                    this.$message.warning("请先选择区县");
                    return;
                }
                if (this.unitId === "") {
                    this.$message.warning("请先选择单位");
                    return;
                }
            }
            let authList = this.app.rolesInfo.authorizedOid;
            let str = "";
            let unitIds = "";
            if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                if (authList && authList.length > 0) {
                    authList.forEach((item) => {
                        str += item + ",";
                    });
                    unitIds = str.substring(0, str.length - 1);
                }
            } else {
                unitIds = this.unitId;
            }
            let data = {
                isStat: this.unitType === 2 ? "" : this.unitType,
                cityNum:
                    this.stateParams.treeId === "520000"
                        ? 0
                        : this.stateParams.treeId || "",
                codeNum:
                    this.stateParams.treeId === "520000"
                        ? this.stateParams.treeId
                        : this.areaParams.treeId || "",
                qxNum:
                    this.stateParams.treeId === "520000"
                        ? 0
                        : this.areaParams.treeId || "",
                startDate: this.startDate,
                endDate: this.endDate,
                orgId: this.unitId === "" ? unitIds : this.unitId,
            };
            if (this.systemId === 5) {
                data.months = this.$moment(this.startDate1).format("YYYY-MM");
                data.endDate = "";
                data.startDate = "";
            }
            if (this.systemId === 6) {
                data.startDate = this.startDate1;
                data.endDate = this.endDate1;
            }
            this.initSystem("unit", this.doSrcParams(data), null, this.isTable);
        },
        resetData() {
            this.applyChange(this.systemId);
        },
    },
    watch: {
        unitId(newValue, old) {
            this.isTable =
                newValue === "" ||
                this.systemId === 1 ||
                this.systemId === 5 ||
                this.systemId === 6;
        },
        autoParams: {
            deep: true, // 深度监听设置为 true
            handler: function (newV, oldV) {
                this.page.total = newV.total;
                document.getElementById("unitMemberIframe").style.height =
                    newV.tableHeight + "px";
                document.getElementById("unitFrame").style.height =
                    newV.chartHeight + "px";
                console.log("watch中：", newV);
            },
        },
    },
};
</script>
<style lang="less" scoped>
@import "../area-total/index.less";
#unitFrame {
    width: 100%;
    overflow: hidden;
}
</style>
