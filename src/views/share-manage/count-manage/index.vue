<template>
    <div class="count-manage">
        <!-- 创建账号弹窗 -->
        <el-dialog
            width="40%"
            :title="dialogTitle"
            :close-on-click-modal="false"
            :visible.sync="createdOrUpdateVisiable"
            center
        >
            <el-form
                label-width="100px"
                :model="createdOrUpdateForm"
                :rules="rulesOption"
                ref="createdOrUpdateForm"
            >
                <el-form-item label="账号：" prop="account">
                    <el-input
                        placeholder="请输入账号"
                        v-model="createdOrUpdateForm.account"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input
                        placeholder="请输入密码"
                        v-model="createdOrUpdateForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="单位名称：" prop="password">
                    <el-input
                        placeholder="请输入单位名称"
                        v-model="createdOrUpdateForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="password">
                    <el-input
                        placeholder="请输入联系人"
                        v-model="createdOrUpdateForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="telephone">
                    <el-input
                        placeholder="请输入联系电话"
                        v-model="createdOrUpdateForm.telephone"
                    ></el-input>
                </el-form-item>
                <el-form-item label="是否启用：" prop="disabled">
                    <el-switch
                        :active-value="0"
                        :inactive-value="1"
                        v-model="createdOrUpdateForm.disabled"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="备注说明：" prop="description">
                    <el-input
                        v-model="createdOrUpdateForm.description"
                        type="textarea"
                        placeholder="请输入..."
                    ></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center; margin-top: -25px;" slot="footer">
                <el-button
                    type="primary"
                    @click="createdOrUpdateAccount('createdOrUpdateForm')"
                    >保存</el-button
                >
                <el-button @click="closeCreateDailog">取消</el-button>
            </div>
        </el-dialog>
        <div style="margin-bottom: 10px;">
            <el-button
                type="primary"
                @click="openCreateDailog('createdOrUpdateForm')"
                >创建账号</el-button
            >
        </div>
        <div class="table-box">
            <el-table :data="accountList" stripe border style="width: 100%;">
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
                    prop="account"
                    label="账号"
                    align="center"
                ></el-table-column>

                <el-table-column
                    prop="userName"
                    label="创建时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="userName"
                    label="公司/单位名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="actionTime"
                    label="联系人"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="description"
                    label="启用状态"
                    align="center"
                ></el-table-column>
                <el-table-column label="操作" align="center" width="100px">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="openEditDialog(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="text"
                            @click="deleteAccount(scope.row.id)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="page.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import handleTable from "@src/mixins/new/handle-table";
export default {
    mixins: [handleTable],
    data() {
        return {
            accountList: [{ account: "123@" }],
            dialogTitle: "创建账号",
            createdOrUpdateVisiable: false,
            createdOrUpdateForm: {
                account: "",
                password: "",
                telephone: "",
                disabled: 0,
                description: "",
                id: "",
            },
            rulesOption: {
                account: [
                    {
                        required: true,
                        message: "账号不能为空",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        createdOrUpdateAccount(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // api[urlNames["createTxlGroup"]](
                    //     this.createdOrUpdateForm
                    // ).then((res) => {
                    //     if (res.status === 0) {
                    //         this.closeAddressDialog();
                    //         this.getGrid();
                    //         this.$message.success(
                    //             this.createdOrUpdateForm.id === ""
                    //                 ? "创建成功"
                    //                 : "编辑成功"
                    //         );
                    //     } else {
                    //         this.$message.warning("操作失败，请稍后再试");
                    //     }
                    // });
                } else {
                    this.$message.warning("请根据提示填写必填字段");
                }
            });
        },
        openCreateDailog(formName) {
            this.dialogTitle = "创建账号";
            this.createdOrUpdateForm.id = "";
            this.createdOrUpdateVisiable = true;
            this.$nextTick(() => {
                this.$refs[formName].resetFields();
            });
        },
        closeCreateDailog() {
            this.createdOrUpdateVisiable = false;
        },
        openEditDialog(row) {
            this.dialogTitle = "编辑账号";
            // this.createdOrUpdateForm.id = row.id;
            // this.createdOrUpdateForm.disabled = row.disabled;
            this.createdOrUpdateForm.account = row.account;
            // this.createdOrUpdateForm.description = row.description;
            this.createdOrUpdateVisiable = true;
        },
        deleteAccount(id) {},
    },
};
</script>
