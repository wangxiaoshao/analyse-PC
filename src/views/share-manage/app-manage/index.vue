<template>
    <div class="app-manage">
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
                <el-form-item label="应用名称：" prop="appName">
                    <el-input
                        placeholder="请输入应用名称"
                        v-model="createdOrUpdateForm.appName"
                    ></el-input>
                </el-form-item>
                <el-form-item label="表格名称：" prop="password">
                    <el-input
                        placeholder="请输入表格名称"
                        v-model="createdOrUpdateForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="单位名称：" prop="account">
                    <el-select
                        v-model="this.companyName"
                        :remote-method="getCompanyList"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入视图名称"
                        :loading="selectLoading"
                    >
                        <el-option
                            v-for="item in companyList"
                            :key="item.id"
                            :label="item.company_id"
                            :value="item.company_id"
                            >{{ item.system_name }}</el-option
                        >
                    </el-select>
                    <!-- <el-select
                        size="medium"
                        placeholder="请选择账号"
                        @change="accountChange"
                        v-model="createdOrUpdateForm.account"
                    >
                        <el-option
                            v-for="item in accountList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select> -->
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
                    @click="createdOrUpdateApp('createdOrUpdateForm')"
                    >保存</el-button
                >
                <el-button @click="closeCreateDailog">取消</el-button>
            </div>
        </el-dialog>
        <div style="margin-bottom: 10px;">
            <el-button
                type="primary"
                @click="openCreateDailog('createdOrUpdateForm')"
                >创建应用</el-button
            >
        </div>
        <div class="table-box">
            <el-table :data="applyList" stripe border style="width: 100%;">
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
                    prop="systemName"
                    label="应用名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="companyName"
                    label="公司名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="tableName"
                    label="表名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="userName"
                    label="创建时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="actionTime"
                    label="联系人"
                    align="center"
                ></el-table-column>
                <el-table-column prop="state" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.state ? "禁用" : "启用" }}</span>
                    </template>
                </el-table-column>
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
                            @click="comfirmDeleteApp(scope.row.systemId)"
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
            selectLoading: false,
            companyName: "",
            applyList: [{}],
            companyList: [],
            dialogTitle: "创建应用",
            createdOrUpdateVisiable: false,
            createdOrUpdateForm: {
                appName: "",
                company_id: "",
                password: "",
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
        getGrid() {
            let data = {
                page: this.page.current,
                limit: this.page.limit,
            };
            api[urlNames["findSystemTableMessage"]](data).then(
                (res) => {
                    this.applyList = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.applyList = [];
                    this.page.total = 0;
                }
            );
        },
        getCompanyList(query) {
            if (query !== "") {
                api[urlNames["getViewList"]]().then((res) => {
                    this.viewList = res.data;
                });
            }
        },
        accountChange() {
            console.log(this.createdOrUpdateForm.account);
        },
        openCreateDailog(formName) {
            this.dialogTitle = "创建应用";
            this.createdOrUpdateForm.id = "";
            this.createdOrUpdateForm.account = "";
            this.createdOrUpdateVisiable = true;
            this.$nextTick(() => {
                this.$refs[formName].resetFields();
            });
        },
        closeCreateDailog() {
            this.createdOrUpdateVisiable = false;
        },
        openEditDialog(row) {
            this.dialogTitle = "编辑应用";
            // this.createdOrUpdateForm.id = row.id;
            // this.createdOrUpdateForm.disabled = row.disabled;
            this.createdOrUpdateForm.account = row.account;
            // this.createdOrUpdateForm.description = row.description;
            this.createdOrUpdateVisiable = true;
        },
        createdOrUpdateApp(form) {
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
        comfirmDeleteApp(systemId) {
            this.handleRow("确定要删除该数据吗？", systemId, this.deleteApp);
        },
        deleteApp(systemId) {
            api[urlNames["deleteSystemTableMessage"]]({ systemId }).then(
                (res) => {
                    if (res) {
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
