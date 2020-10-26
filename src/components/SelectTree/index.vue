<template>
    <div class="select-area">
        <el-dialog
            custom-class="select-member-dialog"
            :title="selectTreeDailog.title"
            :visible.sync="selectTreeDailog.openSelectTreeVisiable"
            center
            :before-close="handleClose"
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
                        :data="treeData"
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
                    <div v-if="!selectTreeDailog.isSingSelect">
                        <el-checkbox
                            :indeterminate="isIndeterminate"
                            v-model="isCheckOptionalAll"
                            class="member-item"
                            @change="toggleOptionalAll"
                            >全选</el-checkbox
                        >
                        <el-checkbox-group
                            v-model="selectingList"
                            @change="selectOptionalChange"
                        >
                            <el-checkbox
                                style="display: block;"
                                class="member-item"
                                v-for="(item, index) in optionalList"
                                :key="index"
                                :label="item"
                            >
                                {{ item.treeName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <div v-else>
                        <el-radio-group
                            v-model="selectingSingle"
                            @change="singleSelectingChange"
                        >
                            <el-radio
                                v-for="(item, index) in optionalList"
                                :key="index"
                                style="display: block;"
                                :label="item"
                            >
                                {{ item.treeName }}</el-radio
                            >
                        </el-radio-group>
                    </div>
                </div>
                <div class="container">
                    <div>
                        <el-button
                            size="small"
                            type="text"
                            v-show="selectingList.length > 0"
                            @click="removeSelectingAll"
                            >取消全部
                        </el-button>
                        <el-checkbox-group
                            v-model="selectedList"
                            @change="selectedChange"
                        >
                            <el-checkbox
                                style="display: block;"
                                class="member-item"
                                v-for="(item, index) in selectingList"
                                :key="index"
                                :label="item"
                            >
                                {{ item.treeName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="submit">
                <el-button
                    type="primary"
                    @click="submitSelectedData"
                    :disabled="selectedList.length === 0"
                    >确定</el-button
                >
                <el-button @click="handleClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// 单位 人员  区县 组件
//  selectTreeDailog: {
//     title: "选择授权区县",//标题 必传
//     openSelectTreeVisiable: false,
//     isSelectType: 2, // 1 区县  2  单位  3 人员 必传
//     isSingSelect: true, // 是否单选,true 单选，false:多选  必传
// },
import { api, urlNames } from "@src/api";
export default {
    name: "SelectTree",
    props: ["selectTreeDailog"],
    data() {
        return {
            searchKeyWord: "",
            optionalList: [], // 可选列表
            treeData: [],
            selectingList: [], // 候选列表, 多选
            selectedList: [], // 已选列表  多选
            isIndeterminate: true,
            isCheckOptionalAll: false, // 可选是否全选
            selectingSingle: "", // 候选 单选
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
            api[urlNames["getTreeList"]]().then((res) => {
                this.treeData = res.data;
            });
        },
        // 加载下一级
        loadArea(node, resolve) {
            if (node.level === 0) {
                return resolve(this.treeData);
            }
            api[urlNames["getTreeList"]]({
                treeId: node.data.treeId,
                treeType: node.data.treeType,
            }).then((res) => {
                if (res.status === 0) {
                    let treeData = [];
                    // 1. 选择区县
                    // 处理省直单位和贵安新区（无区域）
                    if (this.selectTreeDailog.isSelectType === 1) {
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
                        // 2. 选择单位 3.选择人员
                    } else if (
                        this.selectTreeDailog.isSelectType === 2 ||
                        this.selectTreeDailog.isSelectType === 3
                    ) {
                        let list = res.data || [];
                        list.forEach((item, index) => {
                            if (item.hasChild === 0 || !item.hasChild) {
                                item.leaf = true;
                            }
                            /* 排除单位下面有人员的情况 ：只显示部门和单位 */
                            if (item.treeType !== 5) {
                                treeData.push(item);
                            }
                        });
                    }

                    resolve(treeData);
                }
            });
        },
        handleAreaClick(data) {
            this.optionalList = [];
            // 1. 区县
            if (this.selectTreeDailog.isSelectType === 1) {
                // 候选框只加载到区县
                if (data.treeType === 1) {
                    api[urlNames["getTreeList"]]({
                        treeId: data.treeId,
                        treeType: data.treeType,
                    }).then((res) => {
                        res.data.forEach((item) => {
                            this.optionalList.push(item);
                        });
                    });
                } else {
                    this.optionalList = [];
                }
                // 2.单位  treeType=2 treeId = "520000"，单独处理省直单位
                // 3.人员  treeType=3
            } else if (
                this.selectTreeDailog.isSelectType === 2 ||
                this.selectTreeDailog.isSelectType === 3
            ) {
                if (
                    (data.treeType !== 1 && data.treeType) ||
                    (data.treeId === "520000" && data.treeType)
                ) {
                    api[urlNames["getTreeList"]]({
                        treeId: data.treeId,
                        treeType: data.treeType,
                    }).then((res) => {
                        if (this.selectTreeDailog.isSelectType === 2) {
                            res.data.forEach((item) => {
                                /* 排除单位下面有人员的情况 ：只显示人员 */
                                if (item.treeType !== 5) {
                                    this.optionalList.push(item);
                                }
                            });
                        } else if (this.selectTreeDailog.isSelectType === 3) {
                            res.data.forEach((item) => {
                                /* 排除单位下面有人员的情况 ：只显示人员 */
                                if (item.treeType === 5) {
                                    this.optionalList.push(item);
                                }
                            });
                        }
                    });
                } else {
                    this.optionalList = [];
                }
            }
        },

        // 全选可选区域
        toggleOptionalAll(selected) {
            this.selectingList = selected ? this.optionalList : [];
            this.isIndeterminate = false;
            let that = this;
            if (selected) {
                that.optionalList.forEach((item) => {
                    const label = item;
                    that.addSelecting(item);
                    that.addToSelected(label);
                });
            } else {
                that.optionalList.forEach((item) => {
                    const label = item;
                    that.removeSelecting(item);
                    that.removeSelected(label);

                    const indexOf = that.selectingList.indexOf(label);
                    if (indexOf !== -1) {
                        that.selectingList.splice(indexOf, 1);
                    }
                });
            }
        },
        // 取消全选候选区域
        removeSelectingAll() {
            this.selectedList = [];
            this.selectingList = [];
        },
        selectOptionalChange(val) {
            let checkedCount = val.length;
            this.isCheckOptionalAll = checkedCount === this.optionalList.length;
            this.isIndeterminate =
                val.length > 0 && val.length < this.optionalList.length;
            this.selectingList = val.map((item) => {
                const label = item;
                this.addToSelected(label);
                return label;
            });
        },
        selectedChange(val) {
            this.selectingList.forEach((item) => {
                if (!val.includes(item)) {
                    this.removeSelected(item);
                    this.removeSelecting(item);
                }
            });
        },
        addToSelected(label) {
            if (!this.selectedList.includes(label)) {
                this.selectedList.push(label);
            }
        },
        addSelecting(label) {
            let i = this.selectingList.length - 1;
            while (i >= 0) {
                const current = this.selectingList[i];
                if (current.treeId === label.treeId) {
                    return;
                }

                i -= 1;
            }

            this.selectingList.push(label);
        },
        removeSelected(label) {
            let i = this.selectedList.length - 1;
            while (i >= 0) {
                const current = this.selectedList[i];
                if (current.treeId === label.treeId) {
                    this.selectedList.splice(i, 1);
                    return;
                }

                i -= 1;
            }
        },
        removeSelecting(label) {
            const index = this.selectingList.indexOf(label);
            if (index !== -1) {
                this.selectingList.splice(index, 1);
            }
        },

        // 单选方法
        singleSelectingChange(val) {
            this.selectingList = [];
            this.selectingList[0] = this.selectingSingle;
            this.selectedList[0] = val;
        },

        // 返回数据
        submitSelectedData() {
            console.log(this.selectingList, this.selectedList);
            this.$emit("dialogReturnData", this.selectingList);
        },
        // 关闭授权区域弹窗组件
        handleClose() {
            // this.selectingList = [];
            this.$emit("closeSelectDailog");
        },
        getResult() {},
    },
    computed: {
        type() {
            return this.selectTreeDailog.isSelectType;
        },
    },
    watch: {
        type() {
            this.selectingList = [];
            this.selectedList = [];
            this.optionalList = [];
            this.findAreaTree();
        },
    },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
