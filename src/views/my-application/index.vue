<template>
    <div class="member-total">
        <el-form label-position="right" inline>
            <el-form-item>
                <!-- <span>日期：</span> -->
                <el-date-picker
                    v-model="searchDate"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="dateChange"
                    @blur="onDateBlur"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="system-list">
            <span>系统应用： </span>
            <el-radio-group v-model="systemId" @change="applyChange">
                <el-radio-button
                    :label="item.id"
                    v-for="item in appList"
                    :key="item.systemSymbol"
                    >{{ item.systemName }}</el-radio-button
                >
            </el-radio-group>
        </div>
        <div class="system-data">
            <div class="chart-box">
                <iframe
                    :src="srcUrl"
                    id="memberFrame"
                    frameborder="0"
                    scrolling="no"
                    ref="iframe"
                ></iframe>
            </div>
        </div>
    </div>
</template>
<script>
import dataStatistics from "@src/mixins/data-statistics";
import pickerOptions from "@src/mixins/picker-options";
import { mapState } from "vuex";
export default {
    mixins: [dataStatistics, pickerOptions],
    data() {
        return {
            memberName: "",
            appList: [],
            systemId: 2,
            userId: this.$store.state.app.rolesInfo.uid,
        };
    },
    created() {
        this.pickDateOptionRules();
        this.initializeDate();
        this.doApplyList();
    },
    mounted() {
        this.searchData();
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        dateChange(val) {
            this.startDate = val[0];
            this.endDate = val[1];
            this.doformatParams();
        },
        doApplyList() {
            let appList = [...this.app.applicationList];
            appList.map((item, index) => {
                if (item.id === 1 || item.id === 7) {
                    appList.splice(index, 1);
                }
            });
            this.appList = appList;
            console.log(appList, "qqqq");
        },
        applyChange(val) {
            console.log(this.systemId);
            this.searchData();
        },
        searchData() {
            let data = {
                userId: this.userId,
                startDate: this.startDate,
                endDate: this.endDate,
                format1: this.formatParams.format1,
                format2: this.formatParams.format2,
                startDay: this.formatParams.format3,
                size: this.formatParams.format4,
            };
            this.initSystem("person", this.doSrcParams(data));
        },
    },
};
</script>
<style lang="less" scoped>
.chart-box {
    width: 100%;
    padding: 20px 0;
}
#memberFrame {
    width: 100%;
    height: 480px;
    overflow: hidden;
}
</style>
