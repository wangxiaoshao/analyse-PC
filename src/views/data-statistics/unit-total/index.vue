<template>
    <div class="area-total">
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
                v-if="
                    app.rolesInfo.roleName != 'COUNTY_MANAGER' &&
                    app.rolesInfo.roleName != 'UNIT_MANAGER'
                "
            >
                <el-select
                    size="medium"
                    placeholder="请选择区域"
                    @change="stateChange"
                    v-model="stateName"
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
                    v-model="areaName"
                >
                    <el-option
                        v-for="item in areaList"
                        :key="item.treeId"
                        :label="item.treeName"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择单位">
                <el-select
                    size="medium"
                    placeholder="请选择单位"
                    @change="unitChange"
                    v-model="unitId"
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
                <!-- <span>日期：</span> -->
                <el-date-picker
                    v-model="searchDate"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="dateChange"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { api, urlNames } from "@src/api";
export default {
    data() {
        return {
            searchDate: "",
            unitType: 2,
            stateName: "",
            stateId: "",
            treeType: "",
            areaId: "",
            areaName: "",
            startDate: "",
            endDate: "",
            unitId: "",
            unitTypeList: [
                { name: "非考核单位", type: 0 },
                { name: "考核单位", type: 1 },
                { name: "全部", type: 2 },
            ],
            stateList: [],
            areaList: [],
            unitList: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                },
                shortcuts: null,
            },
        };
    },
    created() {
        console.log(this.app.rolesInfo);
        this.getStateList();
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        getStateList() {
            if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                this.initUnit("", "", this.unitType);
                return;
            }
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
                        if (this.app.rolesInfo.roleName === "COUNTY_MANAGER") {
                            this.areaList = aryList;
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
                        this.areaName = "";
                        this.unitList = res.data;
                        return;
                    }
                    this.areaList = res.data;
                }
            });
        },
        initUnit(cityCode, countyCode, assessType, treeType) {
            let data = {};
            let apiUrl = "";
            if (this.app.rolesInfo.roleName === "CITY_MANAGER") {
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
            } else {
                data.treeId = countyCode;
                data.treeType = treeType;
                apiUrl = "getTreeList";
            }
            api[urlNames[apiUrl]](data).then((res) => {
                if (res.data) {
                    this.unitList = res.data;
                }
            });
        },
        unitTypeChange() {},
        dateChange(val) {
            console.log(val);
            this.startDate = val[0];
            this.endDate = val[1];
        },
        stateChange(data) {
            this.stateName = data.treeName;
            this.stateId = data.treeId;
            this.treeType = data.treeType;
            this.initArea(this.stateId, this.treeType);
        },
        areaChange(val) {
            console.log(val, "kkkkk");
            this.areaName = val.treeName;
            this.areaId = val.treeId;
            this.treeType = val.treeType;
            this.unitId = "";
            this.initUnit(
                this.stateId,
                this.areaId,
                this.unitType,
                this.treeType
            );
        },
        unitChange() {},
        searchData() {
            let data = {
                isStat: this.unitType,
                codeNum: this.stateId,
                qxNum: this.areaId,
                startDate: this.startDate,
                endDate: this.endDate,
                orgId: this.unitId,
            };
            console.log(data);
        },
    },
};
</script>
