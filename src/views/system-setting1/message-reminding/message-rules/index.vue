<template>
    <div class="message-rules">
        <select-members
            :selectDialog="selectDialog"
            @dialogReturnMembersInfo="dialogReturnMembersInfo"
            @closeselectMenmber="closeSelectMenmber"
        ></select-members>
        <div class="message-item">
            <div class="header">设置通知规则</div>
            <el-form label-position="right" label-width="110px">
                <el-form-item label="通知时间：">
                    <el-checkbox-group
                        v-model="noticeRulesForm.selectedNoticeTime"
                        @change="noticeTimeChange"
                    >
                        <el-checkbox
                            v-for="item in noticeTimeList"
                            :label="item.name"
                            :key="item.name"
                            >{{ item.checkname }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="通知方式：">
                    <el-checkbox-group
                        v-model="noticeRulesForm.selectedNoticeWay"
                        @change="noticeWayChange"
                    >
                        <el-checkbox
                            v-for="item in noticeWayList"
                            :label="item.name"
                            :key="item.name"
                            >{{ item.checkname }}
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
                        title="添加收件人"
                        class="el-icon-circle-plus addConsignees"
                        @click="openSelectMenmber"
                    ></i>
                    <!-- <el-button
                        icon="el-icon-plus"
                        circle
                        size="mini"
                        type="primary"
                    ></el-button> -->
                </el-form-item>
                <el-form-item label="是否启用：">
                    <el-switch
                        :active-value="1"
                        :inactive-value="0"
                        v-model="noticeRulesForm.rulesState"
                    ></el-switch>
                </el-form-item>
                <el-form-item>
                    <div>
                        <el-button type="primary" @click="createRules"
                            >立即创建</el-button
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
import SelectMembers from "@src/components/SelectMembers/index";
export default {
    mixins: [handleBreadcrumb],
    components: { SelectMembers },
    data() {
        return {
            noticeTimeList: [
                {
                    name: "date1",
                    checkname: "每月8号",
                },
                {
                    name: "date2",
                    checkname: "每月16号",
                },
                {
                    name: "date3",
                    checkname: "每月24号",
                },
                {
                    name: "date4",
                    checkname: "每月30号",
                },
            ],
            noticeWayList: [
                {
                    name: "message",
                    checkname: "统一消息",
                },
                {
                    name: "note",
                    checkname: "短信",
                },
            ],
            noticeRulesForm: {
                selectedNoticeTime: [],
                selectedNoticeWay: [],
                consignees: "", // 收件人
                rulesState: 1,
            },
            noticeRules: [],
            selectDialog: {
                selectMenmberTitle: "添加收件人员", // 选人组件标题
                selectMenmberFlag: false, // 显示弹窗，
                isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
                notOnlyPerson: true, // 是否选人，默认为false（只选人）
                isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选(与notOnlyPerson一起使用，notOnlyPerson为true是有效
                isSingleOrgSelect: false, // 是否为单选框  false为多选（默认），true为单选(与isOnlyOrg一起使用，isOnlyOrg为true时部门/单位单选)
                isOnlyOrg: false, //  是否选部门/单位 false为不是只选部门，true为只选部门
                isCleanSelected: false, // 是否清空已选待选
                selectUser: [], // 查看已选人员数据
            },
            selectUser: [],
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
    },
    created() {
        if (this.$route.query.id !== undefined) {
            // this.getAppDetail(this.$route.query.id);
        } else {
            // this.generateRandomAccount();
        }
    },
    methods: {
        noticeTimeChange() {},
        noticeWayChange(val) {
            console.log(this.selectedNoticeWay, val);
        },
        // 立即创建
        createRules() {},
        cancel() {},
        // 查看收件人
        findConsignees() {
            this.selectDialog.isCleanSelected = false;
            this.selectDialog.selectMenmberFlag = true;
        },
        // 添加收件人
        addConsignees() {},
        openSelectMenmber() {
            this.selectDialog.isCleanSelected = true;
            this.selectDialog.selectMenmberFlag = true;
        },
        closeSelectMenmber() {
            this.selectDialog.selectMenmberFlag = false;
        },
        // 选人组件
        dialogReturnMembersInfo(data, flag) {
            this.selectUser = data;
            this.selectDialog.selectUser = data;
            let str = "";
            this.selectUser.forEach((item) => {
                str += item.name + ",";
            });
            this.noticeRulesForm.consignees = str.substring(0, str.length - 1);
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
