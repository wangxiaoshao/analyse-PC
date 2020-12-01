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
                <el-form-item label="单位名称：" prop="company_id">
                    <!-- <el-select
                        value-key="company_id"
                        v-model="createdOrUpdateForm.companyName"
                        filterable
                        remote
                        reserve-keyword
                        placeholder="请输入关键词"
                        @change="companyChange"
                        :remote-method="getInfoByCompanyName"
                        :loading="loading"
                    >
                        <el-option
                            v-for="item in companyList"
                            :key="item.company_id"
                            :label="item.company"
                            :value="item"
                        >
                        </el-option>
                    </el-select> -->
                    <el-select
                        style="width: 100%;"
                        v-model="companyParams"
                        filterable
                        @change="companyChange"
                        value-key="company_id"
                        placeholder="请选择单位名称"
                    >
                        <el-option
                            v-for="item in companyList"
                            :key="item.company_id"
                            :label="item.company"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应用名称：" prop="system_name">
                    <el-input
                        placeholder="请输入应用名称"
                        v-model="createdOrUpdateForm.system_name"
                    ></el-input>
                </el-form-item>
                <el-form-item label="表格名称：" prop="table_name">
                    <el-input
                        placeholder="请输入表格名称"
                        v-model="createdOrUpdateForm.table_name"
                        :disabled="createdOrUpdateForm.system_id != ''"
                    >
                        <span
                            slot="prepend"
                            v-if="createdOrUpdateForm.system_id === ''"
                            >{{ table_header }}</span
                        >
                    </el-input>
                </el-form-item>
                <el-form-item label="是否启用：" prop="is_banned">
                    <el-switch
                        active-value="0"
                        inactive-value="1"
                        v-model="createdOrUpdateForm.is_banned"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="备注说明：" prop="comment">
                    <el-input
                        v-model="createdOrUpdateForm.comment"
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
                    prop="company"
                    label="公司名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="tableName"
                    label="表名称"
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
                            parseInt(scope.row.is_banned) === 0
                                ? "启用"
                                : "禁用"
                        }}</span>
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
import handleTable from "@src/mixins/handle-table";
export default {
    mixins: [handleTable],
    data() {
        let validateTableName = (rule, value, callback) => {
            if (value === "") {
                callback(
                    new Error(
                        "表格名称不能为空，名称前缀已固定为logger_server_"
                    )
                );
            } else {
                if (this.createdOrUpdateForm.system_id === "") {
                    let reg = /^[a-zA-Z]{4,20}$/;
                    reg.test(value)
                        ? callback()
                        : callback(
                              new Error(
                                  "仅允许输入大小写字母，不能有空格和特殊字符，长度为4-20的字符"
                              )
                          );
                    return;
                }

                callback();
            }
        };
        return {
            loading: false,
            companyParams: {},
            selectLoading: false,
            table_header: "logger_server_",
            applyList: [],
            companyList: [],
            dialogTitle: "创建应用",
            createdOrUpdateVisiable: false,
            name1: "",
            createdOrUpdateForm: {
                companyName: "",
                system_name: "",
                table_name: "",
                is_banned: 0,
                comment: "",
                company_id: "",
                system_id: "",
            },
            oldState: 0,
            timeout: null,
            rulesOption: {
                company_id: [
                    {
                        required: true,
                        message: "单位名称不能为空",
                        trigger: ["blur", "change"],
                    },
                ],
                system_name: [
                    {
                        required: true,
                        message: "应用名称不能为空",
                        trigger: "blur",
                    },
                ],
                table_name: [
                    {
                        required: true,
                        message: `表格名称不能为空，名称前缀已固定为logger_server_`,
                        trigger: "blur",
                    },
                    { validator: validateTableName, trigger: "blur" },
                ],
            },
        };
    },
    created() {
        this.getInfoByCompanyName();
        this.getGrid();
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
        getInfoByCompanyName() {
            this.loading = true;
            api[urlNames["getSystemId"]]().then(
                (res) => {
                    this.companyList = res.data;
                },
                () => {
                    this.companyList = [];
                }
            );
        },
        companyChange(val) {
            this.createdOrUpdateForm.company_id = val.company_id;
            this.createdOrUpdateForm.companyName = val.company;
        },
        openCreateDailog(formName) {
            this.resetForm();
            this.dialogTitle = "创建应用";
            this.createdOrUpdateVisiable = true;
        },
        closeCreateDailog() {
            this.createdOrUpdateVisiable = false;
        },
        openEditDialog(row) {
            this.resetForm();
            this.dialogTitle = "编辑应用";
            this.companyParams.company_id = row.companyId;
            this.createdOrUpdateForm.company_id = row.companyId;
            this.createdOrUpdateForm.system_id = row.systemId;
            this.createdOrUpdateForm.companyName = row.company;
            this.createdOrUpdateForm.table_name = row.tableName;
            this.createdOrUpdateForm.system_name = row.systemName;
            this.createdOrUpdateForm.is_banned = row.is_banned;
            this.oldState = row.is_banned;
            this.createdOrUpdateForm.comment = row.comment;
            this.createdOrUpdateVisiable = true;
        },
        createdOrUpdateApp(form) {
            let apiUrl = "";
            let data = {
                company: this.createdOrUpdateForm.companyName,
                system_name: this.createdOrUpdateForm.system_name,
                table_name: this.createdOrUpdateForm.table_name,
                is_banned: this.createdOrUpdateForm.is_banned,
                comment: this.createdOrUpdateForm.comment,
                company_id: this.createdOrUpdateForm.company_id,
                system_id: this.createdOrUpdateForm.system_id,
            };
            if (this.createdOrUpdateForm.system_id === "") {
                apiUrl = "createTable";
                data.table_name =
                    this.table_header + this.createdOrUpdateForm.table_name;
            } else {
                apiUrl = "updateSystemTableMessage";
                console.log(this.oldState);
                if (parseInt(this.oldState) === 1) {
                    data.next = 2;
                } else {
                    if (parseInt(this.createdOrUpdateForm.is_banned) === 1) {
                        data.next = 1;
                    } else {
                        data.next = 2;
                    }
                }
            }
            this.$refs[form].validate((valid) => {
                if (valid) {
                    api[urlNames[apiUrl]](data).then(
                        (res) => {
                            if (res.status === 0) {
                                this.closeCreateDailog();
                                this.getGrid();
                                this.$message.success(
                                    this.createdOrUpdateForm.system_id === ""
                                        ? "创建成功"
                                        : "编辑成功"
                                );
                            } else {
                                this.$message.warning("操作失败，请稍后再试");
                            }
                        },
                        (msg) => {
                            if (msg.error === 8006) {
                                this.handleRow(
                                    "该应用正在执行数据共享任务，禁用后将会导致数据共享任务失败！您确定要禁用吗？",
                                    this.createdOrUpdateForm,
                                    this.saveUpdate
                                );
                            } else {
                                this.$message.error("网络错误，请稍后重试");
                            }
                        }
                    );
                } else {
                    this.$message.warning("请根据提示填写必填字段");
                }
            });
        },
        saveUpdate() {
            let apiUrl = "updateSystemTableMessage";
            this.createdOrUpdateForm.next = 2;
            api[urlNames[apiUrl]](this.createdOrUpdateForm).then((res) => {
                if (res.status === 0) {
                    this.getGrid();
                    this.closeCreateDailog();
                    this.$message.success(
                        this.createdOrUpdateForm.id === ""
                            ? "创建成功"
                            : "编辑成功"
                    );
                } else {
                    this.$message.warning("操作失败，请稍后再试");
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
                        this.getGrid();
                        this.$message.success("删除成功");
                    }
                },
                () => {
                    this.$message.error("操作失败，请稍后重试");
                }
            );
        },
        resetForm() {
            this.createdOrUpdateForm = {
                companyName: "",
                system_name: "",
                table_name: "",
                is_banned: "0",
                comment: "",
                company_id: "",
                system_id: "",
            };
            this.companyParams = {};
        },
    },
};
</script>
