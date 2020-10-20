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
                    v-model="searchParams.applyId"
                    size="small"
                    @change="applyChange"
                >
                    <el-radio-button
                        :label="item.applyId"
                        v-for="item in systemList"
                        :key="item.applyId"
                        >{{ item.name }}</el-radio-button
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
            systemList: [
                { applyId: 0, name: "台账系统" },
                { applyId: 1, name: "公文系统" },
                { applyId: 2, name: "通知公告" },
                { applyId: 3, name: "快传系统" },
                { applyId: 4, name: "门户系统" },
            ],
            searchDate: "",
            searchParams: { startDate: "", endDate: "", applyId: 2 },
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
            this.searchParams.applyId = val;
        },
    },
    computed: {
        ...mapState(["app"]),
    },
};
</script>
