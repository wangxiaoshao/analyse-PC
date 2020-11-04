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
                <el-form-item label="单位名称：" prop="companyName">
                    <el-autocomplete
                        style="width: 100%;"
                        v-model="createdOrUpdateForm.companyName"
                        value-key="company"
                        :fetch-suggestions="getInfoByCompanyName"
                        placeholder="请输入内容"
                        @select="handleSelect"
                    ></el-autocomplete>
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
                        :active-value="0"
                        :inactive-value="1"
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
import handleTable from "@src/mixins/new/handle-table";
export default {
    mixins: [handleTable],
    data() {
        return {
            selectLoading: false,
            table_header: "logger_server_",
            applyList: [],
            companyList: [
                {
                    company_id: 233,
                    system_id: 6248,
                    system_name: "xUdjWUJ",
                    comment: "oefwFT",
                    table_name: "n",
                    is_banned: 7021,
                    is_delete: 186,
                    companyName: "惠智",
                },
                {
                    company_id: 234,
                    system_id: 6248,
                    system_name: "xUdjWUJ",
                    comment: "oefwFT",
                    table_name: "n",
                    is_banned: 7021,
                    is_delete: 186,
                    companyName: "测试",
                },
                {
                    company_id: 235,
                    system_id: 6248,
                    system_name: "应用系统",
                    comment: "oefwFT",
                    table_name: "人员表",
                    is_banned: 7021,
                    is_delete: 186,
                    companyName: "测试惠智公司的数据",
                },
            ],
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
                companyName: [
                    {
                        required: true,
                        message: "应用名称不能为空",
                        trigger: "blur",
                    },
                ],
                system_name: [
                    {
                        required: true,
                        message: "系统名称不能为空",
                        trigger: "blur",
                    },
                ],
                table_name: [
                    {
                        required: true,
                        message: `表格名称不能为空，名称前缀已固定为logger_server_`,
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    created() {
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
        getInfoByCompanyName(queryString, cb) {
            if (queryString.length === 0) {
                return;
            }
            api[urlNames["getSystemId"]]({
                companyName: queryString,
            }).then((res) => {
                this.companyList = res.data;
                let results = queryString
                    ? this.companyList.filter(
                          this.createStateFilter(queryString)
                      )
                    : this.companyList;
                cb(results);
            });
            // this.companyList = res.data;
            // let results = queryString
            //     ? this.companyList.filter(this.createStateFilter(queryString))
            //     : this.companyList;
            // cb(results);
        },
        createStateFilter(queryString) {
            return (state) => {
                return (
                    state.company
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        handleSelect(item) {
            console.log(item);
            this.createdOrUpdateForm.company_id = item.company_id;
        },
        openCreateDailog(formName) {
            this.createdOrUpdateForm.company_id = "";
            this.createdOrUpdateForm.system_id = "";
            this.dialogTitle = "创建应用";
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
            this.createdOrUpdateForm.company_id = row.companyId;
            this.createdOrUpdateForm.system_id = row.systemId;
            this.createdOrUpdateForm.companyName = row.company;
            this.createdOrUpdateForm.table_name = row.tableName;
            this.createdOrUpdateForm.system_name = row.systemName;
            this.createdOrUpdateForm.is_banned = parseInt(row.is_banned);
            this.oldState = parseInt(row.is_banned);
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
                if (this.oldState === 1) {
                    this.createdOrUpdateForm.next = 2;
                } else {
                    if (this.createdOrUpdateForm.is_banned === 1) {
                        this.createdOrUpdateForm.next = 1;
                    } else {
                        this.createdOrUpdateForm.next = 2;
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
                        (error) => {
                            if (error) {
                                this.handleRow(
                                    "该账号正在使用，禁用后会导致与之关联的应用和数据共享任务失败！您确定要禁用吗？",
                                    this.createdOrUpdateForm,
                                    this.saveUpdate
                                );
                            }
                            console.log(error);
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
    },
};
</script>
