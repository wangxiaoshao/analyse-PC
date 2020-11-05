<template>
    <div class="message-rules">
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeSelectDailog"
        ></select-tree>
        <div class="message-item">
            <div class="header">设置通知规则</div>
            <el-form label-position="right" label-width="110px">
                <el-form-item label="通知时间：">
                    <el-checkbox-group
                        v-model="noticeRulesForm.selectedNoticeTime"
                        @change="noticeTimeChange"
                    >
                        <el-checkbox
                            v-for="item in app.noticeTypeList"
                            :label="item.id"
                            :key="item.id"
                            >{{ item.periodDesc }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="通知方式：">
                    <el-checkbox-group
                        v-model="noticeRulesForm.selectedNoticeWay"
                        @change="noticeWayChange"
                    >
                        <el-checkbox
                            v-for="item in app.noticeWayList"
                            :label="item.id"
                            :key="item.id"
                            >{{ item.methodDesc }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="通知内容：">
                    <div>
                        <i class="el-icon-warning"></i>
                        <span style="color: #999;"
                            >通知内容为系统默认，不可修改！！！</span
                        >
                    </div>
                </el-form-item>
                <el-form-item label="通知收件人：">
                    <el-input
                        readonly
                        style="width: 280px;"
                        placeholder="请选择通知收件人"
                        v-model="noticeRulesForm.consignees"
                    >
                        <span
                            slot="suffix"
                            class="findConsignees"
                            title="查看收件人"
                            @click="findConsignees"
                            v-if="noticeRulesForm.consignees.length > 0"
                            >查看</span
                        >
                    </el-input>
                    <i
                        v-if="noticeRulesForm.consignees.length === 0"
                        title="添加收件人"
                        class="el-icon-circle-plus addConsignees"
                        @click="openSelectMenmber"
                    ></i>
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-switch
                        :active-value="0"
                        :inactive-value="1"
                        v-model="noticeRulesForm.disabled"
                    ></el-switch>
                </el-form-item>
                <el-form-item>
                    <div>
                        <el-button type="primary" @click="createRules"
                            >保存</el-button
                        >
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import handleBreadcrumb from "@src/mixins/new/handle-breadcrumb.js";
import SelectTree from "@src/components/SelectTree/index";
import { mapState } from "vuex";
import { api, urlNames } from "@src/api";
export default {
    mixins: [handleBreadcrumb],
    components: { SelectTree },
    data() {
        return {
            noticeRulesForm: {
                selectedNoticeTime: [],
                selectedNoticeWay: [],
                consignees: "", // 收件人
                disabled: 0,
            },
            noticeRules: [],
            selectTreeDailog: {
                title: "选择人员",
                openSelectTreeVisiable: false,
                isSelectType: 3, // 1 区县  2  单位  3 人员 4 市州
                isSingSelect: false, // 是否单选,true 单选，false:多选
                noticeUser: [], // 默认选择人员
                orgId: this.$route.query.orgId,
            },
            oldNoticeUser:[],
            noticeUserIds: [],
        };
    },
    mounted() {
        this.pushBreadcrumb({
            name: this.$route.query.id ? "修改通知提醒" : "创建通知提醒",
            parent: {
                name: "MessageReminding",
                query: {
                    type: "back",
                },
            },
        });
        if (this.$route.query.id) {
            this.getOrgRulesDetail();
        } else {
        }
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        // 获取单位通知规则
        getOrgRulesDetail() {
            api[urlNames["getNoticeDetailById"]]({
                noticeId: this.$route.query.id,
            }).then(
                (res) => {
                    if (res) {
                        this.noticeRulesForm.selectedNoticeTime =
                            res.data.selectedPeriods;
                        this.noticeRulesForm.selectedNoticeWay =
                            res.data.selectedNoticeTypes;
                        this.noticeRulesForm.disabled = res.data.disabled;
                        let str = "";
                        res.data.userList.forEach((item) => {
                            let obj = {
                                treeId: item.uid,
                                treeName: item.name,
                            };
                            str += item.name + ",";
                            this.noticeUserIds.push(item.uid);
                            this.oldNoticeUser.push(obj);
                        });
                        this.noticeRulesForm.consignees = str.substring(
                            0,
                            str.length - 1
                        );
                    }
                },
                () => {
                    this.$message.error("网络错误，请稍后重试");
                }
            );
        },
        noticeTimeChange() {},
        noticeWayChange(val) {
            console.log(this.selectedNoticeWay, val);
        },

        cancel() {
            this.$router.go(-1);
        },
        // 查看收件人
        findConsignees() {
            console.log(this.oldNoticeUser)
            this.selectTreeDailog.noticeUser=[...this.oldNoticeUser];
            this.selectTreeDailog.openSelectTreeVisiable = true;
        },
        // 添加收件人
        addConsignees() {},
        openSelectMenmber() {
            this.selectTreeDailog.openSelectTreeVisiable = true;
        },
        closeSelectDailog() {
            this.selectTreeDailog.openSelectTreeVisiable = false;
        },
        // 选人组件
        dialogReturnData(data) {
            this.selectUser = data;
            // this.selectDialog.selectUser = data;
            let str = "";
            let noticeUserIds = [];
            data.forEach((item) => {
                str += item.treeName + ",";
                noticeUserIds.push(item.treeId);
            });
            this.noticeRulesForm.consignees = str.substring(0, str.length - 1);
            this.noticeUserIds = noticeUserIds;
        },
        // 立即创建
        createRules() {
            let data = {
                orgId: this.$route.query.orgId,
                selectedPeriods: this.noticeRulesForm.selectedNoticeTime,
                selectedTypes: this.noticeRulesForm.selectedNoticeWay,
                noticeUsers: this.noticeUserIds,
                disabled: this.noticeRulesForm.disabled,
            };
            let apiUrl = "";
            if (this.$route.query.id) {
                data.id = this.$route.query.id;
                apiUrl = "updateNoticeRule";
            } else {
                apiUrl = "createNoticeRule";
            }
            console.log(data);
            api[urlNames[apiUrl]](data).then(
                (res) => {
                    if (res) {
                        this.$message({
                            type: "success",
                            message: this.$route.query.id
                                ? "修改成功"
                                : "创建成功",
                        });
                        this.$router.go(-1);
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
<style lang="less" scoped>
@import "index.less";
</style>
