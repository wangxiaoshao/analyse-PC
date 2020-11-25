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
            <!-- <span>系统应用： </span> -->
            <!-- <el-radio-group v-model="systemId" @change="applyChange">
                <el-radio-button
                    :label="item.id"
                    v-for="item in appList"
                    :key="item.systemSymbol"
                    >{{ item.systemName }}</el-radio-button
                >
            </el-radio-group> -->
            <transition-group tag="ul" appear>
                <li
                    :key="-1"
                    @click="applyChange(-1)"
                    :class="{
                        isActive: systemId == -1,
                    }"
                >
                    全部
                </li>
                <li
                    v-for="item in appList"
                    :key="item.id"
                    :class="{
                        isActive: systemId == item.id,
                    }"
                    @click="applyChange(item.id)"
                >
                    {{ item.systemName }}
                </li>
            </transition-group>
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
import applicationList from "@src/mixins/apply";
export default {
    mixins: [dataStatistics, pickerOptions, applicationList],
    data() {
        return {
            memberName: "",
            appList: [],
            systemId: -1,
            userId: this.$store.state.app.rolesInfo.uid,
            orgId: this.$store.state.app.rolesInfo.orgId,
            deptId: this.$store.state.app.rolesInfo.deptId
                ? this.$store.state.app.rolesInfo.deptId
                : "",
        };
    },
    created() {
        this.pickDateOptionRules();
        this.initializeDate();
        this.doApplyList();
    },
    mounted() {
        this.searchData();
        this.initMemberHeight();
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        initMemberHeight() {
            let that = this;
            const memberFrame = document.getElementById("memberFrame");
            memberFrame.onload = function () {
                that.dataAry = [];
                window.addEventListener(
                    "message",
                    function (e) {
                        if (e.data.height) {
                            memberFrame.style.height = e.data.height + "px";
                        } else {
                            memberFrame.style.height = "500px";
                        }
                    },
                    false
                );
            };
        },
        dateChange(val) {
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
            }
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
        applyChange(val) {
            this.systemId = val;
            this.searchData();
        },
        searchData() {
            let data = {
                userId: this.userId,
                orgId: this.orgId,
                deptId: this.deptId,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            this.initSystem("person", this.doSrcParams(data));
        },
    },
    watch: {
        applicationList() {
            this.doApplyList();
        },
    },
};
</script>
<style lang="less" scoped>
@import "../data-statistics/area-total/index.less";
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
