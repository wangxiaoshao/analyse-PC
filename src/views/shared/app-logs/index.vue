<template>
    <div class="appLogs">
        <!-- 输入应用账号弹框 -->
        <el-dialog
            :visible.sync="appApplictaionVisible"
            width="440px"
            :show-close="true"
            :close-on-click-modal="false"
        >
            <div slot="title" style="padding: 20px;">
                接入应用账号、密码
                <i class="el-icon-edit" style="color: red;"></i>
            </div>
            <el-form
                inline
                label-width="140px"
                :model="appAccountInfo"
                :rules="appFormRules"
                ref="appForm"
            >
                <el-form-item label="接入应用账号" prop="appAccount">
                    <el-input
                        placeholder="请输入接入应用账号"
                        v-model="appAccountInfo.appAccount"
                    ></el-input>
                </el-form-item>
                <el-form-item label="接入应用账号密码" prop="appPassword">
                    <el-input
                        placeholder="请输入接入应用密码"
                        v-model="appAccountInfo.appPassword"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center;">
                <el-button
                    type="primary"
                    @click="findApplication('appForm')"
                    style="padding: 8px 35px;"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <div v-if="!appApplictaionVisible">
            <div class="table-box">
                <div class="table-title">应用信息</div>
                <el-table :data="applactionList" border style="width: 100%;">
                    <template slot="empty">
                        <div class="empty">
                            <p>
                                <img
                                    class="data-pic"
                                    src="@src/common/images/no-data1.png"
                                    alt
                                />
                            </p>
                            <p>
                                <span style="padding-left: 8px;">暂无数据</span>
                            </p>
                        </div>
                    </template>
                    <el-table-column
                        prop="name"
                        label="应用名称"
                        width="180"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="id"
                        label="应用编号"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="apiAccount"
                        align="center"
                        label="应用接口账号"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="接入时间"
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="concatUser"
                        label="联系人员"
                        align="center"
                    >
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="应用状态"
                        prop="removed"
                    >
                        <template slot-scope="scope">
                            <span>{{
                                scope.row.removed == 0 ? "启用" : "禁用"
                            }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="table-box">
                <div class="table-title" style="margin: 20px 0;">同步日志</div>
                <push-log
                    :isAppLaction="isAppLaction"
                    :appAccountInfo="appAccountInfo"
                    @openAccountDialog="openAccountDialog"
                    :isSuccess="isSuccess"
                ></push-log>
            </div>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import PushLog from "@src/views/shared/push-log";
export default {
    name: "AppLogs",
    components: { PushLog },
    data() {
        return {
            isAppLaction: true,
            isSuccess: false,
            appApplictaionVisible: true,
            applactionList: [],
            appLogsList: [],
            appAccountInfo: {
                appAccount: "",
                appPassword: "",
            },
            appFormRules: {
                appAccount: [
                    {
                        required: true,
                        message: "请输入应用账号",
                        trigger: "blur",
                    },
                ],
                appPassword: [
                    {
                        required: true,
                        message: "请输入应用账号密码",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        findApplication(applacation) {
            this.$refs[applacation].validate((valid) => {
                if (valid) {
                    api[urlNames["findApplicationByUserNameAndPassword"]]({
                        userName: this.appAccountInfo.appAccount,
                        password: this.appAccountInfo.appPassword,
                    })
                        .then((res) => {
                            if (res) {
                                this.isSuccess = true;
                                this.appApplictaionVisible = false;
                                this.applactionList[0] = res.data;
                            }
                        })
                        .catch(() => {
                            this.$message.error("账号或密码有误，请重新输入");
                            // this.appApplictaionVisible = false;
                            this.applactionList = [];
                        });
                } else {
                    this.$message.error("请填写必填字段");
                }
            });
        },
        openAccountDialog() {
            this.appApplictaionVisible = true;
        },
    },
};
</script>
