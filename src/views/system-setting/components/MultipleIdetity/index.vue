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
            <div class="table-title">身份列表</div>
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
                        @click="exportOrg(2)"
                    >
                        添加兼职
                    </div>
                    <div
                        style="padding: 5px 0; cursor: pointer;"
                        @click="exportOrg(3)"
                    >
                        添加挂职
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
                    prop="typeName"
                ></el-table-column>
                <el-table-column
                    label="创建时间"
                    align="center"
                    prop="createTime"
                ></el-table-column>
                <el-table-column
                    label="所属单位"
                    align="center"
                    prop="orgName"
                    width="200px"
                >
                </el-table-column>
                <el-table-column label="职务" align="center" prop="dutyName">
                </el-table-column>
                <el-table-column label="岗位" align="center" prop="postName">
                    <template scope="scope">
                        <span>{{ scope.row.postName || "无" }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.type === 1"
                            type="text"
                            size="small"
                            class="doBtn"
                            @click.native.prevent="exportOrg(scope.row.type)"
                            >申请调出</el-button
                        >
                        <!-- <el-button
            v-if="scope.row.type===2&&isOrgManage"
            type="text"
            size="small"
            class="doBtn"
            @click.native.prevent="openIdetityDialog(scope.row.type)"
          >解除挂职</el-button>
           <el-button
            v-if="scope.row.type===1&&isOrgManage"
            type="text"
            size="small"
            class="doBtn"
            @click.native.prevent="openIdetityDialog(scope.row.type)"
          >解除兼职</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="identityRecord">
            <div class="table-title" style="margin-top: 20px;">
                添加身份记录
            </div>
            <div class="table-box">
                <el-table
                    :data="recordList"
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
                            <p>
                                <span style="padding-left: 8px;">暂无数据</span>
                            </p>
                        </div>
                    </template>
                    <el-table-column
                        label="身份类型"
                        align="center"
                        prop="typeText"
                    ></el-table-column>
                    <el-table-column
                        label="创建时间"
                        align="center"
                        prop="createTime"
                    ></el-table-column>
                    <el-table-column
                        label="目标单位"
                        align="center"
                        prop="orgName"
                        width="200px"
                    >
                    </el-table-column>
                    <!-- <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span style="color:#999">{{scope.row.removed==0 ?'已启用':'已禁用'}}</span>
            </template>
          </el-table-column> -->
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "multipleIdetity",
    props: ["idetitlyList", "recordList"],
    data() {
        return {
            idetitlyId: this.$store.state.app.option.user.uid,

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
        // 申请调出，添加兼职，挂职
        exportOrg(flag) {
            this.$emit("exportOrg", flag);
        },

        // 添加身份类型
        addIdetityType() {},
        openIdetityDialog(flag) {
            this.identityDialogParams.identityName =
                flag === 2 ? "兼职" : "挂职";
            this.identityDialogParams.identityTitle =
                flag === 2 ? "填写解除兼职说明" : "填写解除挂职说明";
            this.identityDialogParams.removeFlag = true;
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
1
