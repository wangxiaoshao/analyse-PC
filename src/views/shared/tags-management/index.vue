<template>
    <div class="tags-mnagement">
        <div class="operate">
            <el-select
                width="200px"
                @change="selectSearch"
                v-model="selectValue"
                placeholder="请选择"
            >
                <el-option label="全部" :value="0"></el-option>
                <el-option label="单位标签" :value="1"></el-option>
                <el-option label="内设机构标签" :value="2"></el-option>
                <el-option label="个人标签" :value="3"></el-option>
            </el-select>
            <el-button
                type="primary"
                @click="createTag('', { flag: 1, title: '新增' })"
                >新增</el-button
            >
        </div>
        <div class="tag-panel">
            <el-tree
                :data="labelList"
                node-key="id"
                :props="defaultProps"
                lazy
                :load="loadNode"
            >
                <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <i class="tag-icon fa fa-building-o" v-if="data.type === 1"></i>
          <i class="tag-icon fa fa-institution" v-if="data.type === 2"></i>
          <i class="tag-icon fa fa-user-circle-o" v-if="data.type === 3"></i>
          <span :title="data.type === 1?'单位':data.type === 2?'内设机构':'个人'">
            {{ node.label }}
          </span>
        </span>
      </span> -->
                <span class="svg-container" slot-scope="{ node, data }">
                    <span>
                        <span
                            class="iconfont icondanwei"
                            v-if="data.type === 1"
                        ></span>
                        <span
                            class="iconfont iconbumen"
                            v-if="data.type === 2"
                        ></span>
                        <span
                            class="fa fa-user-circle-o"
                            v-if="data.type === 3"
                        ></span>
                        <span
                            :title="
                                data.type === 1
                                    ? '单位'
                                    : data.type === 2
                                    ? '内设机构'
                                    : '个人'
                            "
                        >
                            {{ node.label }}
                        </span>
                    </span>
                    <span class="custom-tree-float">
                        <span
                            class="tag-icon-operate fa fa-plus-circle"
                            v-show="hasCreateRight(data.type)"
                            @click="
                                createTag(data, { flag: 0, title: node.label })
                            "
                        ></span>
                        <span
                            v-show="hasEditRight(data.type)"
                            class="tag-icon-operate fa fa-edit"
                            @click="
                                editTag(data, { flag: 0, title: node.label })
                            "
                        ></span>
                        <span
                            v-show="hasDeleteRight(data.type)"
                            title="删除"
                            class="tag-icon-operate fa fa-trash-o delete"
                            @click="deleteLabel(data.id)"
                        ></span>
                    </span>
                </span>
            </el-tree>
        </div>
        <!-- fa   fa-tags-->
        <!--    user-circle-o-->
        <create-tag-form
            @updateLabelLiat="updateLabelLiat"
            @close="close"
            :flagdata="flagdata"
            :createData="createData"
            :actionType="actionType"
            :createTagDialogVisible="createTagDialogVisible"
        ></create-tag-form>
    </div>
</template>

<script>
import CreateTagForm from "@src/views/shared/tags-management/create-tag-form/index";
import hasRight from "@src/mixins/has-right";
import { api, urlNames } from "@src/api";

export default {
    name: "TagsManagement",
    components: {
        CreateTagForm,
    },
    mixins: [hasRight],
    data() {
        return {
            createTagDialogVisible: false,
            createData: "",
            flagdata: "",
            actionType: "create",
            labelList: [],
            labelSonList: [],
            defaultProps: {
                children: "children",
                label: "name",
                id: "",
            },
            selectValue: 0,
        };
    },
    created() {
        this.findLabelList("-1", "");
    },
    methods: {
        hasCreateRight(type) {
            type = type + 0;
            if (type === 1) {
                return this.hasRight("labelOrgCreate");
            } else if (type === 2) {
                return this.hasRight("labelDepartmentCreate");
            } else if (type === 3) {
                return this.hasRight("labelUserCreate");
            }
        },
        hasEditRight(type) {
            type = +type;
            if (type === 1) {
                return this.hasRight("labelOrgSetting");
            } else if (type === 2) {
                return this.hasRight("labelDepartmentSetting");
            } else if (type === 3) {
                return this.hasRight("labelUserSetting");
            }
        },
        hasDeleteRight(type) {
            type = type + 0;
            if (type === 1) {
                return this.hasRight("labelOrgRemove");
            } else if (type === 2) {
                return this.hasRight("labelDepartmentRemove");
            } else if (type === 3) {
                return this.hasRight("labelUserRemove");
            }
        },
        // 获取标签列表
        findLabelList(parentId, type) {
            api[urlNames["findLabelList"]]({
                parentId: parentId,
                type: type,
            }).then((res) => {
                this.total = parseInt(res.total);
                this.labelList = res.data;
            });
        },
        // 获取子节点
        findLabelSonList(parentId) {
            api[urlNames["findLabelList"]]({
                parentId: parentId,
            }).then((res) => {
                this.labelSonList = res.data;
            });
        },
        // 点击节点加载子节点
        handleNodeClick(node) {
            this.findLabelSonList(node.id);
        },
        // 追加子节点
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve(this.labelList);
            }
            this.findLabelSonList(node.data.id);
            setTimeout(() => {
                resolve(this.labelSonList);
            }, 500);
            this.labelSonList = [];
        },
        // 添加成功之后更新
        updateLabelLiat() {
            this.findLabelList("-1");
        },
        // 删除节点
        deleteLabel(id) {
            this.$confirm(
                "此操作将会永久删除下级的所有标签, 您确认删除么?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(() => {
                    api[urlNames["deleteLabel"]]({
                        id: id,
                    }).then((res) => {
                        if (res.status === 0) {
                            this.findLabelList("-1", "");
                            this.$message({
                                type: "success",
                                message: "删除标签成功",
                            });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        selectSearch() {
            if (this.selectValue === 0) {
                this.findLabelList("-1");
            } else {
                this.findLabelList("-1", this.selectValue);
            }
        },
        createTag(data, flag) {
            this.actionType = "create";
            this.createTagDialogVisible = true;
            this.createData = data;
            this.flagdata = flag;
        },
        editTag(data, flag) {
            this.actionType = "edit";
            this.createTagDialogVisible = true;
            this.createData = data;
            this.flagdata = flag;
        },
        // 关闭有弹窗
        close() {
            this.createTagDialogVisible = false;
        },
    },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
