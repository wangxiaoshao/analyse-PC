<template>
    <div class="create-app-management">
        <el-form
            ref="ruleForm"
            :rules="rules"
            :model="appFrom"
            label-width="120px"
        >
            <input type="password" class="hideIpt" />
            <input type="text" class="hideIpt" />
            <el-row :gutter="80">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="应用名称" prop="name">
                            <el-input
                                placeholder="应用名称请输入"
                                v-model="appFrom.name"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="绑定视图" prop="viewId">
                            <el-row :gutter="10">
                                <el-col :span="15">
                                    <el-select
                                        v-model="appFrom.viewId"
                                        :remote-method="getViewList"
                                        filterable
                                        remote
                                        reserve-keyword
                                        placeholder="请输入视图名称"
                                        :loading="selectLoading"
                                    >
                                        <el-option
                                            v-for="item in viewList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                            >{{ item.name }}</el-option
                                        >
                                    </el-select>
                                </el-col>
                                <el-col :span="8">
                                    <el-button
                                        type="primary"
                                        title="前往添加新视图"
                                        @click="goAddNewView"
                                        >添加新视图</el-button
                                    >
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="应用接口账号" prop="apiAccount">
                            <el-input
                                placeholder="请输入应用接口账号"
                                style="ime-mode: disabled;"
                                v-model="appFrom.apiAccount"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="接口账号密码" prop="apiPassword">
                            <el-input
                                maxlength="28"
                                minlength="6"
                                placeholder="请输入接口账号6-18位密码"
                                v-model="appFrom.apiPassword"
                                show-password
                                auto-complete="off"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="联系人" prop="concatUser">
                            <el-input
                                placeholder="请输入联系人"
                                v-model="appFrom.concatUser"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="联系电话" prop="concatPhone">
                            <el-input
                                placeholder="请输入联系电话"
                                v-model="appFrom.concatPhone"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="80">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-form-item label="数据同步接口" prop="apiUrl">
                            <el-input
                                placeholder="请输入数据同步接口"
                                v-model="appFrom.apiUrl"
                            ></el-input>
                        </el-form-item>
                        <p>
                            (由第三方应用提供，组织机构数据将通过该地址自动同步。)
                        </p>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="备注说明" prop="description">
                            <el-input
                                placeholder="请输入备注说明"
                                v-model="appFrom.description"
                            ></el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="80">
                <el-col :span="12">
                    <el-form-item label="启用状态">
                        <el-switch v-model="appFrom.removed"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="应用管理员" prop="roleBindUserId">
                        <el-select
                            v-model="appFrom.roleBindUserId"
                            @remove-tag="removeManager"
                            multiple
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in adminList"
                                :key="item.uid"
                                :label="item.name"
                                :value="item.uid"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item align="center">
                <el-button
                    v-if="$route.query.id === undefined"
                    type="primary"
                    @click="onSubmit('ruleForm')"
                    >立即创建</el-button
                >
                <el-button
                    v-if="$route.query.id !== undefined"
                    type="primary"
                    @click="onSubmit('ruleForm')"
                    >修改</el-button
                >
                <el-button @click="back">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import handleTable from "@src/mixins/handle-table";
import goBack from "@src/mixins/go-back.js";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import { api, urlNames } from "@src/api";
export default {
    name: "CreateAppManagement",
    mixins: [handleTable, handleBreadcrumb, goBack],

    data() {
        // 验证密码
        let validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else {
                callback();
            }
        };
        return {
            selectLoading: false,
            viewList: [],
            returnViewId: this.$route.query.id || 0,
            value: [],
            appFrom: {
                id: "",
                name: "",
                viewId: "",
                apiAccount: "",
                apiPassword: "",
                concatUser: "",
                concatPhone: "",
                apiUrl: "",
                description: "",
                removed: true,
                roleBindUserId: [],
            },
            adminList: [],
            oldAppFrom: {},
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入应用名称",
                        trigger: "blur",
                    },
                ],
                apiAccount: [
                    {
                        required: true,
                        message: "请输填写应用接口账号",
                        trigger: "blur",
                    },
                ],
                apiPassword: [
                    {
                        required: true,
                        validator: validatePass,
                        message: "请输填写应用接口账号",
                        trigger: "blur",
                    },
                ],
                viewId: [
                    {
                        required: true,
                        message: "请输入视图名称",
                        trigger: "change",
                    },
                ],
                concatUser: [
                    {
                        required: true,
                        message: "请输入应用名称",
                        trigger: "blur",
                    },
                ],
                concatPhone: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "blur",
                    },
                ],
                apiUrl: [
                    {
                        required: true,
                        message: "请输入数据同步接口",
                        trigger: "blur",
                    },
                ],
                description: [
                    {
                        required: true,
                        message: "请输入描述字段",
                        trigger: "blur",
                    },
                ],
                // roleBindUserId: [
                //   { required: true, message: '请选择应用管理员', trigger: 'blur' }
                // ]
            },
        };
    },
    mounted() {
        this.pushBreadcrumb({
            name: this.$route.query.id ? "应用信息" : "创建接入应用",
            parent: {
                name: "AppManagement",
                query: {
                    type: "back",
                },
            },
        });
    },
    created() {
        this.findViewAdmin();
        this.getViewList();
        if (this.$route.query.id !== undefined) {
            this.getAppDetail(this.$route.query.id);
        } else {
            this.generateRandomAccount();
        }
        this.oldAppFrom = JSON.parse(JSON.stringify(this.appFrom));
    },
    methods: {
        generateRandomAccount() {
            const lib =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@";
            const libLength = lib.length;
            const usernameLength = 5;
            const passwordlength = 32;

            this.appFrom.apiAccount = "";
            this.appFrom.apiPassword = "";

            for (let i = 0; i < usernameLength; i++) {
                this.appFrom.apiAccount +=
                    lib[Math.floor(Math.random() * libLength)];
            }
            this.appFrom.apiAccount += "" + new Date().getTime();
            for (let i = 0; i < passwordlength; i++) {
                this.appFrom.apiPassword +=
                    lib[Math.floor(Math.random() * libLength)];
            }
        },
        // 获取管理员列表
        findViewAdmin() {
            api[urlNames["findApplicationAdmin"]]({}).then((res) => {
                if (res.status === 0) {
                    this.adminList = res.data;
                }
            });
        },
        removeManager(uid) {
            if (this.$route.params.id !== "0") {
                this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        api[urlNames["deleteApplicationAdmin"]]({
                            applicationId: this.returnViewId,
                            uid: uid,
                        }).then((res) => {
                            if (res.status === 0) {
                                //  this.getAppDetail(this.$route.query.id)
                                this.$message.success("删除成功");
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            }
        },

        toDataLog() {
            this.$router.push({ path: "/data-log" });
        },
        getViewList(query) {
            if (query !== "") {
                api[urlNames["getViewList"]]().then((res) => {
                    this.viewList = res.data;
                });
            }
        },
        goAddNewView() {
            this.$router.push("/view-management/create-view/0");
        },
        onSubmit(ref) {
            this.$refs[ref].validate((valid) => {
                if (valid) {
                    if (this.$route.query.id === undefined) {
                        this.createApp();
                    } else if (this.$route.query.id !== undefined) {
                        this.updateApp();
                    }
                } else {
                    this.$message.error("请填写必填字段");
                }
            });
            // if (this.appFrom.apiAccount.trim().length === 0 ||
            //   this.appFrom.apiPassword.trim().length === 0 ||
            //   this.appFrom.concatUser.trim().length === 0 ||
            //   this.appFrom.concatPhone.trim().length === 0 ||
            //   this.appFrom.apiUrl.trim().length === 0 ||
            //   this.appFrom.description.trim().length === 0) {
            //   this.$message.info('请填写必填字段')
            //   this.isChange=false
            //   return false
            // }
            // if (this.$route.query.id === undefined) {
            //   this.createApp()
            // } else if (this.$route.query.id !== undefined) {
            //   this.updateApp()
            // }
        },
        createApp() {
            api[urlNames["createApp"]]({
                name: this.appFrom.name,
                viewId: this.appFrom.viewId,
                apiAccount: this.appFrom.apiAccount,
                apiPassword: this.appFrom.apiPassword,
                concatUser: this.appFrom.concatUser,
                concatPhone: this.appFrom.concatPhone,
                apiUrl: this.appFrom.apiUrl,
                description: this.appFrom.description,
                removed: this.appFrom.removed ? 0 : 1,
                roleBindUserId: this.appFrom.roleBindUserId,
            }).then((res) => {
                if (res.status === 0 && this.$route.query.id === undefined) {
                    this.$message.success("创建成功");
                    this.isChange = false;
                    this.$router.push({ name: "AppManagement" });
                }
            });
        },
        updateApp() {
            console.log(this.appFrom.roleBindUserId, 888888);
            api[urlNames["updateApp"]]({
                id: this.appFrom.id,
                name: this.appFrom.name,
                viewId: this.appFrom.viewId,
                apiAccount: this.appFrom.apiAccount,
                apiPassword: this.appFrom.apiPassword,
                concatUser: this.appFrom.concatUser,
                concatPhone: this.appFrom.concatPhone,
                apiUrl: this.appFrom.apiUrl,
                description: this.appFrom.description,
                removed: this.appFrom.removed ? 0 : 1,
                roleBindUserId: this.appFrom.roleBindUserId,
            }).then((res) => {
                if (res.status === 0) {
                    this.$message.success("修改成功");
                    this.$router.push({ name: "AppManagement" });
                }
            });
        },
        getAppDetail(id) {
            api[urlNames["getAppDetail"]]({
                id: id,
            }).then((res) => {
                this.appFrom = res.data;
                let tmpRoleBindUserId = [];
                this.appFrom.roleBindUserId.forEach((item) => {
                    tmpRoleBindUserId.push(item.uid);
                });
                this.appFrom.roleBindUserId = tmpRoleBindUserId;
                let that = this;
                console.log(that.appFrom.roleBindUserId, 99999);

                this.appFrom.removed = !res.data.removed;
                // this.oldAppFrom = JSON.parse(JSON.stringify(this.appFrom))
            });
        },
        // 搜索选择
        handleSelect(item) {
            console.log(item);
        },
        back() {
            this.isChange = this.addWatch(this.appFrom, this.oldAppFrom);
            if (this.isChange) {
                this.goBackDilog(this.onSubmit, "ruleForm");
            } else {
                this.$router.push({ name: "AppManagement" });
                this.isChange = false;
            }
        },
    },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
