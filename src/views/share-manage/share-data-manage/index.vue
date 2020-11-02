<template>
    <div class="app-manage">
        <!-- 创建共享应用弹窗 -->
        <el-dialog
            width="40%"
            :title="dialogTitle"
            :close-on-click-modal="false"
            :visible.sync="createdOrUpdateVisiable"
            center
        >
            <el-form
                label-width="120px"
                :model="createdOrUpdateForm"
                :rules="rulesOption"
                ref="createdOrUpdateForm"
            >
                <el-form-item label="共享应用：" prop="appName">
                    <el-select
                        size="medium"
                        placeholder="请选择共享应用名称"
                        @change="accountChange"
                        v-model="createdOrUpdateForm.appName"
                    >
                        <el-option
                            v-for="item in appList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送应用账号：" prop="account">
                    <el-select
                        size="medium"
                        placeholder="请选择推送应用账号"
                        @change="accountChange"
                        v-model="createdOrUpdateForm.account"
                    >
                        <el-option
                            v-for="item in accountList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
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
                    @click="createdOrUpdateShareData('createdOrUpdateForm')"
                    >保存</el-button
                >
                <el-button @click="closeCreateDailog">取消</el-button>
            </div>
        </el-dialog>
        <div style="margin-bottom: 10px;">
            <el-button
                type="primary"
                @click="openCreateDailog('createdOrUpdateForm')"
                >创建共享任务</el-button
            >
        </div>
        <div class="table-box">
            <el-table :data="shareDataList" stripe border style="width: 100%;">
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
                    label="共享应用名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="companyName"
                    label="公司/单位名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="contactName"
                    label="联系人"
                    align="center"
                ></el-table-column>
                <el-table-column prop="state" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <span>{{
                            scope.row.state === 0 ? "正常" : "禁用"
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150px">
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
                            @click="comfirmDeleteShareData(scope.row.id)"
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
import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/new/handle-table";
export default {
    mixins: [handleTable],
    data() {
        return {
            shareDataList: [{}],
            accountList: [
                { id: 1, name: "cs1" },
                { id: 2, name: "cs2" },
                { id: 3, name: "cs3" },
            ],
            appList: [
                { id: 1, name: "app1" },
                { id: 2, name: "app2" },
                { id: 3, name: "cs3" },
            ],
            dialogTitle: "创建共享任务",
            createdOrUpdateVisiable: false,
            createdOrUpdateForm: {
                appName: "",
                account: "",
                disabled: 0,
                description: "",
                id: "",
            },
            rulesOption: {
                appName: [
                    {
                        required: true,
                        message: "应用名称不能为空",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        accountChange() {
            console.log(this.createdOrUpdateForm.account);
        },
        openCreateDailog(formName) {
            this.dialogTitle = "创建共享任务";
            this.createdOrUpdateForm.id = "";
            this.createdOrUpdateForm.account = "";
            this.createdOrUpdateForm.appName = "";
            this.createdOrUpdateVisiable = true;
            this.$nextTick(() => {
                this.$refs["createdOrUpdateForm"].resetFields();
            });
        },
        closeCreateDailog() {
            this.createdOrUpdateVisiable = false;
        },
        openEditDialog(row) {
            this.dialogTitle = "编辑共享任务";
            this.createdOrUpdateForm.id = row.id;
            // this.createdOrUpdateForm.disabled = row.disabled;
            this.createdOrUpdateForm.account = row.account;
            // this.createdOrUpdateForm.description = row.description;
            this.createdOrUpdateVisiable = true;
        },
        createdOrUpdateShareData(form) {
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
        comfirmDeleteShareData(shareId) {
            this.handleRow(
                "确定要删除该数据吗？",
                shareId,
                this.deleteShareData
            );
        },
        deleteShareData(shareId) {
            api[urlNames["deleteDataShare"]]({ shareId }).then(
                (res) => {
                    if (res) {
                        this.getGrid();
                        this.$message.success("删除成功");
                    }
                },
                () => {
                    this.$message.error("操作失败，请稍后重试");
                }
            );
        },
    },
};
</script>
