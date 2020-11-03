<template>
    <div class="member-total">
        <el-form label-position="right" inline>
            <el-form-item>
                <el-input
                    @focus="openSelectDailog"
                    placeholder="请选择人员"
                    v-model="memberName"
                    readonly
                    style="width: 130px; margin: 0px 10px;"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <!-- <span>日期：</span> -->
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
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeSelectDailog"
        ></select-tree>
    </div>
</template>
<script>
import SelectTree from "@src/components/SelectTree/index";
export default {
    components: {
        SelectTree,
    },
    data() {
        return {
            searchDate: "",
            startDate: "",
            endDate: "",
            memberName: "",
            userId: "",
            selectTreeDailog: {
                title: "选择人员",
                openSelectTreeVisiable: false,
                isSelectType: 3, // 1 区县  2  单位  3 人员 4 市州
                isSingSelect: true, // 是否单选,true 单选，false:多选
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                },
                shortcuts: null,
            },
        };
    },
    methods: {
        dateChange(val) {
            this.startDate = val[0];
            this.endDate = val[1];
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
        searchData() {
            let data = {
                userId: this.userId,
                startDate: this.startDate,
                endDate: this.endDate,
            };
            console.log(data);
        },
    },
};
</script>
