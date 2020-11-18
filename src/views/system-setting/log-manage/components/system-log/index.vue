<template>
    <div class="system-log">
        <el-form label-position="right" inline>
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
                    v-model="keyword"
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
                id="systemIframe"
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
</template>
<script>
import initReport from "@src/mixins/initReport";
import handleTable from "@src/mixins/new/handle-table";
import dataStatistics from "@src/mixins/data-statistics";
export default {
    mixins: [handleTable, dataStatistics, initReport],
    props: ["activeName"],
    data() {
        return {
            keyword: "",
            srcUrl: "",
            totalAry: [],
        };
    },
    created() {
        this.initializeDate();
    },
    mounted() {
        this.initLogHeight("systemIframe");
        this.initReportPage("systemIframe");
    },
    methods: {
        dateChange(val) {
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
            }
        },
        findCondition() {
            let data = {
                startDate: this.startDate,
                endDate: this.endDate,
                keyword: this.keyword,
                tableName:
                    "`static_db`.logger_api_access_" +
                    this.$moment(this.startDate).format("YYYYMM"),
            };
            this.srcUrl =
                this.hostApi + this.logSrc.systemSrc + this.doSrcParams(data);
        },
    },
    watch: {
        activeName(val) {
            if (val === "second") {
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
