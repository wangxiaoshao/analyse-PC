<template>
    <div class="select-city-state">
        <el-dialog
            width="35%"
            custom-class="select-member-dialog"
            title="授权市州"
            :visible.sync="SelectCityStateDailog.selectCityStateVisiable"
            center
            :before-close="handleClose"
        >
            <div v-if="SelectCityStateDailog.isSingleSelect">
                <el-radio-group v-model="singleSelected" @change="radioChange">
                    <el-radio
                        :label="item.id"
                        v-for="item in allCityStateList"
                        :key="item.id"
                        >{{ item.name }}</el-radio
                    >
                </el-radio-group>
            </div>
            <div v-else>
                <el-checkbox-group
                    v-model="multipleSelected"
                    @change="checkboxChange"
                >
                    <el-checkbox
                        v-for="item in allCityStateList"
                        :label="item.id"
                        :key="item.id"
                        >{{ item.name }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div slot="footer">
                <el-button
                    type="primary"
                    @click="submitSelectData"
                    :disabled="allSelectedList.length === 0"
                    >确定</el-button
                >
                <el-button @click="handleClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ["SelectCityStateDailog"],
    data() {
        return {
            allCityStateList: [
                { id: 1, name: "贵阳市" },
                { id: 2, name: "遵义市" },
                { id: 3, name: "铜仁市" },
                { id: 4, name: "毕节市" },
                { id: 5, name: "六盘水市" },
                { id: 6, name: "贵安新区" },
                { id: 7, name: "黔西南自治州" },
            ],
            singleSelected: "", // 单选值,
            multipleSelected: [], // 多选值，
            allSelectedList: [], // 最终提交值
        };
    },
    created() {
        this.getAllCityStateList();
    },
    methods: {
        getAllCityStateList() {},
        radioChange(val) {
            this.singleSelected = val;
            this.allSelectedList = [];
            this.allSelectedList.push(this.singleSelected);
        },
        checkboxChange(val) {
            this.multipleSelected = val;
            this.allSelectedList = [];
            this.allSelectedList = [...this.multipleSelected];
        },
        submitSelectData() {
            this.$emit("dialogReturnCityState", this.allSelectedList);
        },
        handleClose() {
            this.singleSelected = "";
            this.multipleSelected = [];
            this.$emit("closeSelectCityState");
        },
    },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
