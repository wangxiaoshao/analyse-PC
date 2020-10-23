<template>
    <div class="select-members">
        <el-dialog
            custom-class="select-member-dialog"
            title="选择授权单位"
            :visible.sync="openSelectOrg"
            center
            :before-close="handleClose"
        >
            <div class="search">
                <el-input
                    placeholder="请输入内容"
                    v-model="searchKeyWord"
                    @change="getResult"
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
                        :load="loadTree"
                        :props="defaultProps"
                        @node-click="handleTreeClick"
                    >
                        <span class="svg-container" slot-scope="{ node }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
                <div class="wait-select">
                    <div class="wait-checkbox"></div>
                </div>
                <div class="container"></div>
            </div>
            <div class="submit">
                <el-button type="primary" @click="submitBackData"
                    >确定</el-button
                >
                <el-button @click="handleClose">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { api, urlNames } from "@src/api";
import CheckRole from "@src/mixins/checkRole";

export default {
    name: "SelectOrg",
    props: ["openSelectOrg", "entire"],
    mixins: [CheckRole],
    data() {
        return {
            treeData: [],
            defaultProps: {
                children: "children",
                label: "treeName",
                id: "",
                isLeaf: "leaf",
            },
            searchKeyWord: "",
            isSelectOrg: true,
        };
    },
    created() {
        this.findTree();
    },
    methods: {
        // 初始化树
        findTree() {
            api[urlNames["getTreeList"]]({}).then((res) => {
                this.treeData = res.data;
            });
        },
        // 加载下一级
        loadTree(node, resolve) {
            if (node.level === 0) {
                return resolve(this.treeData);
            }
            api[urlNames["getTreeList"]]({
                treeId: node.data.treeId,
                treeType: node.data.treeType,
            }).then((res) => {
                if (res.status === 0) {
                    let treeData = [];
                    let list = res.data || [];
                    // 选单位
                    if (this.isSelectOrg) {
                        list.forEach((item, index) => {
                            if (item.hasChild !== 1) {
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

        handleTreeClick() {},

        // 返回数据
        submitBackData() {
            // let idList = [];
            // let itemId = {};
            // this.selectedOrgs.forEach((item) => {
            //     itemId = {
            //         authorizedOid: item.bindId,
            //     };
            //     idList.push(itemId);
            // });
            // this.$emit("dialogReturnOrg", idList);
        },
        // 关闭选人弹窗组件
        handleClose() {
            this.$emit("closeSelectOrg");
        },
        getResult() {},
    },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
