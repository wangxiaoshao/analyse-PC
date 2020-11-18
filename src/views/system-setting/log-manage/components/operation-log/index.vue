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
                        :value="item.type"
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
                id="logIframe"
                width="100%"
                height="370px"
                scrolling="no"
                :src="srcUrl"
                frameborder="0"
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
import initReport from "@src/mixins/initReport";
import SelectTree from "@src/components/SelectTree/index";
export default {
    mixins: [handleTable, dataStatistics, initReport],
    props: ["activeName"],
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
            totalAry: [],
        };
    },
    created() {
        this.initializeDate();
        this.getAllLogTypes();
    },
    mounted() {
        if (this.activeName === "first") {
            this.findCondition();
            this.initLogHeight("logIframe");
            this.initReportPage("logIframe");
        }
    },
    methods: {
        // 系统日志--获取所有日志类型
        getAllLogTypes() {
            api[urlNames["getAllLogTypes"]]({}).then((res) => {
                if (res.data) {
                    this.logTypeList = res.data;
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
                tableName:
                    this.tableName +
                    this.$moment(this.startDate).format("YYYYMM"),
            };
            this.srcUrl =
                this.hostApi +
                this.logSrc.operationSrc +
                this.doSrcParams(data);
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
    watch: {
        activeName(val) {
            console.log(val, "oooooooo");
            if (val === "first") {
                this.findCondition();
                if (this.totalAry.length > 0) {
                    this.page.total = this.totalAry[0].total;
                    // document.getElementById(
                    //     "logIframe"
                    // ).style = this.totalAry[0].height;
                }

                console.log(this.totalAry);
            }
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
