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
                        :label="item.treeId"
                        v-for="item in allCityStateList"
                        :key="item.treeId"
                        >{{ item.treeName }}</el-radio
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
                        :label="item"
                        :key="item.treeId"
                        >{{ item.treeName }}
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
import { api, urlNames } from "@src/api";
export default {
    props: ["SelectCityStateDailog"],
    data() {
        return {
            allCityStateList: [],
            singleSelected: "", // 单选值,
            multipleSelected: [], // 多选值，
            allSelectedList: [], // 最终提交值
        };
    },
    created() {
        this.getFirstArea();
    },
    methods: {
        getFirstArea() {
            api[urlNames["getTreeList"]]().then((res) => {
                this.getAllCityStateList(
                    res.data[0].treeId,
                    res.data[0].treeType
                );
            });
        },
        getAllCityStateList(treeId, treeType) {
            api[urlNames["getTreeList"]]({ treeId, treeType }).then((res) => {
                this.allCityStateList = res.data;
            });
        },
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
            this.allSelectedList = [];
            this.$emit("closeSelectCityState");
        },
    },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
