<template>
    <div class="operation-log">
        <el-form label-position="right" inline>
            <!-- <el-form-item>
                <el-select
                    size="medium"
                    placeholder="请选择日志类型"
                    @change="logChange"
                    v-model="searchParams.actionType"
                >
                    <el-option
                        v-for="item in logTypeList"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type"
                    ></el-option>
                </el-select>
            </el-form-item> -->
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
                <el-select
                    size="medium"
                    placeholder="请选择日志类型"
                    @change="logChange"
                    v-model="searchParams.actionType"
                >
                    <el-option
                        v-for="item in logTypeList"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type"
                    ></el-option>
                </el-select>
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
    </div>
</template>
<script>
import handleTable from "@src/mixins/new/handle-table";
import dataStatistics from "@src/mixins/data-statistics";
import pickerOptions from "@src/mixins/picker-options";
export default {
    mixins: [handleTable, dataStatistics, pickerOptions],
    data() {
        return {
            logTypeList: [
                { type: 1, name: "查询日志" },
                { type: 2, name: "导出日志" },
                { type: 3, name: "权限日志" },
            ],
            searchParams: {
                actionType: 1,
                keyWord: "",
            },
        };
    },
    created() {
        this.initializeDate();
    },
    mounted() {
        this.findCondition();
    },
    methods: {
        dateChange(val) {
            this.startDate = val[0];
            this.endDate = val[1];
            console.log(this.startDate, this.startDate);
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
        // 查看日志详情
        openDetialDialog() {},
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
