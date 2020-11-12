<template>
    <div class="operation-log">
        <el-form label-position="right" inline>
            <el-form-item label="分类：">
                <el-select
                    filterable
                    size="medium"
                    placeholder="请选择日志类型"
                    @change="logChange"
                    v-model="searchParams.actionType"
                >
                    <el-option
                        v-for="item in logTypeList"
                        :key="item.id"
                        :label="item.subject"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
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
                <el-input
                    placeholder="请输入搜索关键词"
                    v-model="searchParams.keyWord"
                    @blur="iptChange"
                    clearable
                    prefix-icon="el-icon-search"
                    style="width: 175px;"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="openSelectDailog"
                    >选择单位</el-button
                >
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findCondition"
                    >查询</el-button
                >
            </el-form-item>
        </el-form>
        <div class="table-box">
            <iframe
                width="100%"
                height="400px"
                scrolling="no"
                :src="srcUrl"
                frameborder="0"
            ></iframe>
        </div>
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeSelectDailog"
        ></select-tree>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/new/handle-table";
import dataStatistics from "@src/mixins/data-statistics";
import SelectTree from "@src/components/SelectTree/index";
export default {
    mixins: [handleTable, dataStatistics],
    components: {
        SelectTree,
    },
    data() {
        return {
            selectTreeDailog: {
                title: "选择查询单位",
                openSelectTreeVisiable: false,
                isSelectType: 2, // 1 区县  2  单位  3 人员 4市州
                isSingSelect: false, // 是否单选,true 单选，false:多选
                isClearSelected: true, // 再次打开是否清空已选框
            },
            logTypeList: [],
            searchParams: {
                actionType: "",
                keyWord: "",
            },
        };
    },
    created() {
        this.initializeDate();
        this.getAllLogTypes();
    },
    mounted() {
        this.findCondition();
    },
    methods: {
        // 系统日志--获取所有日志类型
        getAllLogTypes() {
            api[urlNames["getAllLogTypes"]]({}).then((res) => {
                if (res.data) {
                    this.logTypeList = res.data;
                    this.searchParams.actionType = this.logTypeList[0].id;
                }
            });
        },
        dateChange(val) {
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
            }
        },
        logChange() {
            console.log(this.searchParams.actionType);
        },
        iptChange() {},
        findCondition() {
            let data = {
                startDate: this.startDate,
                endDate: this.endDate,
                actionType: this.searchParams.actionType,
                keyWord: this.searchParams.keyWord,
                tableName: this.tableName + this.$moment().format("YYYYMM"),
            };
            this.srcUrl =
                this.hostApi + this.reportSystemSrc + this.doSrcParams(data);
        },
        openSelectDailog() {
            this.selectTreeDailog.openSelectTreeVisiable = true;
        },
        closeSelectDailog() {
            this.selectTreeDailog.openSelectTreeVisiable = false;
        },
        dialogReturnData(userData, authData) {
            authData = authData || [];
            let dataAry = [...userData, ...authData];
            console.log(dataAry);
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
