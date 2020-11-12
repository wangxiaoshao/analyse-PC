<template>
    <div class="share-log">
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
            ></iframe>
        </div>
    </div>
</template>
<script>
// import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/new/handle-table";
import dataStatistics from "@src/mixins/data-statistics";
export default {
    mixins: [handleTable, dataStatistics],
    data() {
        return {
            keyword: "",
            srcUrl: "",
        };
    },
    created() {
        this.initializeDate();
    },
    methods: {
        dateChange(val) {
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
                console.log(this.startDate, this.startDate);
            }
        },
        findCondition() {
            let data = {
                startDate: this.startDate,
                endDate: this.endDate,
                keyword: this.keyword,
            };
            console.log(data);
        },
    },
};
</script>
