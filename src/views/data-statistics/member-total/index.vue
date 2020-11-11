<template>
    <div class="member-total">
        <el-form label-position="right" inline>
            <el-form-item label="选择人员：">
                <el-input
                    @focus="openSelectDailog"
                    placeholder="请选择人员"
                    v-model="memberName"
                    readonly
                    style="width: 130px; margin: 0px 10px;"
                ></el-input>
            </el-form-item>
            <el-form-item label="日期：">
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
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeSelectDailog"
        ></select-tree>
    </div>
</template>
<script>
import SelectTree from "@src/components/SelectTree/index";
import dataStatistics from "@src/mixins/data-statistics";
import pickerOptions from "@src/mixins/picker-options";
import { mapState } from "vuex";
export default {
    mixins: [dataStatistics, pickerOptions],
    components: {
        SelectTree,
    },
    data() {
        return {
            memberName: this.$store.state.app.rolesInfo.userName,
            appList: [],
            systemId: 2,
            userId: this.$store.state.app.rolesInfo.uid,
            orgId: this.$store.state.app.rolesInfo.orgId,
            deptId: this.$store.state.app.rolesInfo.deptId
                ? this.$store.state.app.rolesInfo.deptId
                : "",
            selectTreeDailog: {
                title: "选择人员",
                openSelectTreeVisiable: false,
                isSelectType: 3, // 1 区县  2  单位  3 人员 4 市州
                isSingSelect: true, // 是否单选,true 单选，false:多选
            },
        };
    },
    created() {
        this.pickDateOptionRules();
        this.initializeDate();
    },
    mounted() {
        this.doApplyList();
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
                if (item.id === 1 || item.id === 5) {
                    appList.splice(index, 1);
                }
            });
            this.appList = appList;
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
            this.memberName = dataAry[0].treeName;
            this.userId = dataAry[0].treeId;
        },
        applyChange(val) {
            console.log(this.systemId);
            this.searchData();
        },
        searchData() {
            let data = {
                userId: this.userId,
                startDate: this.startDate,
                orgId: this.orgId,
                deptId: this.deptId,
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
