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
                v-if="app.rolesInfo.roleName !== 'COUNTY_MANAGER'"
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
            <el-form-item label="选择区县">
                <el-select
                    size="medium"
                    placeholder="请选择区县"
                    @change="areaChange"
                    v-model="areaId"
                >
                    <el-option
                        v-for="item in areaList"
                        :key="item.treeId"
                        :label="item.treeName"
                        :value="item.treeId"
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
            startDate: "",
            endDate: "",
            unitTypeList: [
                { name: "非考核单位", type: 0 },
                { name: "考核单位", type: 1 },
                { name: "全部", type: 2 },
            ],
            stateList: [],
            areaList: [],
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
                }
            });
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
            // console.log(val);
        },
        searchData() {
            let data = {
                isStat: this.unitType,
                codeNum: this.stateId,
                qxNum: this.areaId,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            console.log(data);
        },
    },
};
</script>
