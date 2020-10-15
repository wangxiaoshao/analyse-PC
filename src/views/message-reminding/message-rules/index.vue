<template>
    <div class="message-rules">
        <div class="message-item">
            <div class="header">设置通知规则</div>
            <el-form label-position="right" label-width="110px">
                <el-form-item label="通知时间：">
                    <el-checkbox-group
                        v-model="selectedNoticeTime"
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
                        v-model="selectedNoticeWay"
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
                    <el-input
                        style="width: 50%;"
                        placeholder="请输入内容..."
                        type="textarea"
                        v-model="noticeContent"
                    ></el-input>
                </el-form-item>
                <el-form-item label="通知收件人："> </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import handleBreadcrumb from "@src/mixins/new/handle-breadcrumb.js";
export default {
    mixins: [handleBreadcrumb],
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
            selectedNoticeTime: [],
            selectedNoticeWay: [],
            noticeContent: "",
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
    created() {},
    methods: {
        noticeTimeChange() {},
        noticeWayChange(val) {
            console.log(this.selectedNoticeWay, val);
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
