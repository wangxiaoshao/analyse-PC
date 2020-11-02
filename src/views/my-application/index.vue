<template>
    <div class="my-application">
        <el-form label-position="right" label-width="80px" inline>
            <el-form-item label="日期：">
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
        </el-form>
        <div class="system-data">
            <div class="system-list">
                <span>系统应用： </span>
                <el-radio-group
                    v-model="searchParams.id"
                    size="small"
                    @change="applyChange"
                >
                    <el-radio-button
                        :label="item.id"
                        v-for="item in app.applicationList"
                        :key="item.systemSymbol"
                        >{{ item.systemName }}</el-radio-button
                    >
                </el-radio-group>
            </div>
            <div class="chart-box">
                <iframe src="" frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import handleBreadcrumb from "@src/mixins/new/handle-breadcrumb.js";
export default {
    mixins: [handleBreadcrumb],
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                },
                shortcuts: null,
            },
            searchDate: "",
            searchParams: { startDate: "", endDate: "", id: 1 },
        };
    },
    mounted() {
        this.app.noticeShowBtn = true;
        this.SET_BREADCRUMB([{ name: "我的应用情况" }]);
    },
    methods: {
        dateChange(val) {
            this.searchParams.startDate = val[0];
            this.searchParams.endDate = val[1];
            console.log(val, this.searchParams.date);
        },
        applyChange(val) {
            this.searchParams.id = val;
        },
    },
    computed: {
        ...mapState(["app"]),
    },
};
</script>
