<template>
    <div class="select-area">
        <el-dialog
            custom-class="select-member-dialog"
            title="选择授权区县"
            :visible.sync="openSelectArea"
            center
            :before-close="handleClose"
            width="50%"
        >
            <div class="search">
                <el-input
                    placeholder="请输入内容"
                    v-model="searchKeyWord"
                    @keyup.enter.native="getResult"
                    class="input-with-select"
                >
                    <el-button
                        slot="append"
                        @click="getResult"
                        icon="el-icon-search"
                    ></el-button>
                </el-input>
            </div>
            <div class="select-panel" style="display: flex;">
                <div class="tree">
                    <el-tree
                        :data="areaTree"
                        lazy
                        :load="loadArea"
                        :props="defaultProps"
                        @node-click="handleAreaClick"
                    >
                        <span class="svg-container" slot-scope="{ node }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
                <div class="wait-select">
                    <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="isCheckAll"
                        class="member-item"
                        @change="toggleAreaAll"
                        >全选</el-checkbox
                    >
                    <el-checkbox-group
                        v-model="selectedAreaList"
                        @change="selectAreaChange"
                    >
                        <el-checkbox
                            style="display: block;"
                            class="member-item text-ellipsis"
                            v-for="(area, index) in selectAreaList"
                            :key="index"
                            :label="area"
                        >
                            {{ area.treeName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <div class="submit">
                <el-button
                    type="primary"
                    @click="submitAreaData"
                    :disabled="selectedAreaList.length === 0"
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
    name: "SelectArea",
    props: ["openSelectArea"],
    data() {
        return {
            searchKeyWord: "",
            selectAreaList: [], // 可选区域列表
            areaTree: [],
            selectedAreaList: [], // 已选区域
            isIndeterminate: true,
            isCheckAll: false,
            defaultProps: {
                children: "hasChild",
                label: "treeName",
                id: "",
                isLeaf: "leaf",
            },
        };
    },
    created() {
        this.findAreaTree();
    },
    methods: {
        // 初始化树
        findAreaTree() {
            api[urlNames["getTreeList"]]({}).then((res) => {
                this.areaTree = res.data;
            });
        },
        // 加载下一级
        loadArea(node, resolve) {
            if (node.level === 0) {
                return resolve(this.areaTree);
            }
            api[urlNames["getTreeList"]]({
                treeId: node.data.treeId,
                treeType: node.data.treeType,
            }).then((res) => {
                if (res.status === 0) {
                    let treeData = [];
                    // 处理省直单位和贵安新区（无区域）
                    res.data.map((item, index) => {
                        if (
                            item.treeId === "522800" ||
                            item.treeId === "520000"
                        ) {
                            res.data.splice(index, 1);
                        }
                    });
                    let list = res.data;
                    list.forEach((item, index) => {
                        if (item.treeType === 2) {
                            item.leaf = true;
                        }
                    });
                    treeData = list;
                    resolve(treeData);
                }
            });
        },
        handleAreaClick(data) {
            this.selectAreaList = [];
            if (data.treeType === 1) {
                api[urlNames["getTreeList"]]({
                    treeId: data.treeId,
                    treeType: data.treeType,
                }).then((res) => {
                    this.areaList = [];
                    res.data.forEach((item) => {
                        this.selectAreaList.push(item);
                    });
                });
            } else {
                this.selectAreaList = [];
            }
        },
        // 全选区域
        toggleAreaAll(selected) {
            this.selectedAreaList = selected ? this.selectAreaList : [];
            this.isIndeterminate = false;
            if (selected) {
            }
        },
        selectAreaChange(val) {
            let checkedCount = val.length;
            this.isCheckAll = checkedCount === this.selectAreaList.length;
            this.isIndeterminate =
                val.length > 0 && val.length < this.selectAreaList.length;
        },
        // 返回数据
        submitAreaData() {
            this.$emit("dialogReturnArea", this.selectedAreaList);
        },
        // 关闭授权区域弹窗组件
        handleClose() {
            this.selectedAreaList = [];
            this.$emit("closeSelectArea");
        },
        getResult() {},
    },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
