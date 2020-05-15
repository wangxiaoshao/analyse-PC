<template>
    <div class="multipleIdetity">
        <!-- 解除兼职挂职弹窗 -->
        <!-- <rmidetity-dialog :identityDialogParams='identityDialogParams' @cancel="cancel" :ruleForm='ruleForm'></rmidetity-dialog> -->
        <el-dialog
            :title="identityDialogParams.identityTitle"
            :visible.sync="identityDialogParams.removeFlag"
            width="40%"
        >
            <span class="remove-des"
                >您确定解除该人员在本单位的{{
                    identityDialogParams.identityName
                }}身份？解除之后该人员将无法使用该身份下的账号使用应用系统。</span
            >
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="申请原因" prop="reason">
                    <el-input
                        type="textarea"
                        v-model="ruleForm.reason"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="cancel">取 消</el-button>
                    <el-button
                        type="primary"
                        @click="submitRemoveDuty('ruleForm')"
                        >确定</el-button
                    >
                </el-form-item>
            </el-form>
        </el-dialog>
        <div class="header-top">
            <div class="header-title">身份列表</div>
            <el-popover
                placement="bottom"
                width="100"
                style="margin-left: 10px;"
            >
                <div class="popover" style="text-align: center; margin: 0;">
                    <div
                        style="
                            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                            padding: 5px 0;
                            cursor: pointer;
                        "
                        @click="exportOrg(1)"
                    >
                        申请兼职
                    </div>
                    <div
                        style="padding: 5px 0; cursor: pointer;"
                        @click="exportOrg(2)"
                    >
                        申请挂职
                    </div>
                </div>
                <el-button
                    class="add-btn"
                    slot="reference"
                    size="mini"
                    type="primary"
                    >添加身份</el-button
                >
            </el-popover>
        </div>
        <div class="table-box">
            <el-table
                :data="idetitlyList"
                stripe
                border
                align="center"
                style="width: 100%;"
            >
                <template slot="empty">
                    <div class="empty">
                        <p>
                            <img
                                class="data-pic"
                                src="@src/common/images/no-data1.png"
                                alt=""
                            />
                        </p>
                        <p><span style="padding-left: 8px;">暂无数据</span></p>
                    </div>
                </template>
                <el-table-column
                    label="身份类型"
                    align="center"
                    prop="name"
                ></el-table-column>
                <el-table-column
                    label="创建时间"
                    align="center"
                    prop="createTime"
                ></el-table-column>
                <el-table-column
                    label="所属单位"
                    align="center"
                    prop="nickName"
                >
                </el-table-column>
                <el-table-column label="职务" align="center"> </el-table-column>
                <el-table-column label="岗位" align="center"> </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span style="color: #999;">{{
                            scope.row.removed == 0 ? "已启用" : "已禁用"
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.nodeType === 1"
                            type="text"
                            size="small"
                            class="doBtn"
                            @click.native.prevent="exportOrg(3)"
                            >申请调出</el-button
                        >
                        <el-button
                            v-if="scope.row.nodeType === 2"
                            type="text"
                            size="small"
                            class="doBtn"
                            @click.native.prevent="openIdetityDialog(2)"
                            >解除兼职</el-button
                        >
                        <el-button
                            v-if="scope.row.nodeType === 3"
                            type="text"
                            size="small"
                            class="doBtn"
                            @click.native.prevent="openIdetityDialog(3)"
                            >解除挂职</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";

export default {
    name: "multipleIdetity",
    data() {
        return {
            idetitlyList: [{ nodeType: 1 }, { nodeType: 2 }, { nodeType: 3 }],
            identityDialogParams: {
                identityTitle: "",
                identityName: "",
                removeFlag: false,
            },
            ruleForm: {
                identityId: "",
                reason: "",
            },
            rules: {
                reason: [
                    {
                        required: true,
                        message: "请填写申请原因",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        exportOrg(flag) {
            this.$emit("exportOrg", flag);
        },
        openIdetityDialog(flag) {
            this.identityDialogParams.identityName =
                flag === 2 ? "兼职" : "挂职";
            this.identityDialogParams.identityTitle =
                flag === 2 ? "填写解除兼职说明" : "填写解除挂职说明";
            this.identityDialogParams.removeFlag = true;
        },
        submitRemoveDuty(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    api[urlNames["removeDuty"]](this.ruleForm).then(
                        (res) => {
                            this.$message.success(`解除成功`);
                            this.cancel();
                            // this.fromInit()
                            // this.getGrid()
                        },
                        () => {}
                    );
                }
            });
        },
        cancel() {
            this.identityDialogParams.removeFlag = false;
        },
    },
};
</script>
<style lang="less">
@import "./index";
</style>
