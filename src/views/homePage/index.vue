<template>
    <div class="homePage">
        <div class="first-box">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-card class="item-card">
                        <el-row>
                            <el-col :span="13">
                                <div class="item-left">
                                    <h3>欢迎您，</h3>
                                    <p class="date">
                                        {{
                                            new Date()
                                                | dataFilter("YYYY-MM-DD")
                                        }}
                                        {{ weekDate() }}
                                    </p>
                                    <p>登录考核应用分析平台！</p>
                                </div>
                            </el-col>
                            <el-col :span="11">
                                <div class="item-right">
                                    <img
                                        src="@src/common/images/today.png"
                                        alt=""
                                    />
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="item-card">
                        <el-row>
                            <el-col :span="13">
                                <div class="item-left">
                                    <p class="title">昨日登录人员</p>
                                    <p class="number">
                                        <span>{{ loginNumber }}</span> 人
                                    </p>
                                </div>
                            </el-col>
                            <el-col :span="11">
                                <div class="item-right">
                                    <img
                                        class="login_number"
                                        src="@src/common/images/yesterdaylogin.png"
                                        alt=""
                                    />
                                </div>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="item-card"></el-card>
                </el-col>
            </el-row>
        </div>

        <div class="home-box">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>平台公告</span>
                </div>
                <div class="announcement-box">
                    <div
                        class="noticeInfo"
                        v-for="(itemList, index) in doAnnouncementList"
                        :key="index"
                    >
                        <p
                            v-for="val in itemList"
                            :key="val.id"
                            @click="goFindAnnountDetial(val)"
                        >
                            <el-row>
                                <el-col :span="16">
                                    <span class="msg" :title="val.typeText">{{
                                        val.content
                                    }}</span></el-col
                                >
                                <el-col :span="8">
                                    <span class="date">{{
                                        val.creareTime
                                    }}</span></el-col
                                >
                            </el-row>
                        </p>
                    </div>
                    <a href="javaScript:void(0)" @click="goMoreAnnounts"
                        >查看更多公告 <i class="el-icon-d-arrow-right"></i
                    ></a>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
// import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
export default {
    data() {
        return {
            yesterdayLogin: 2345,
            staticsExportTotal: 500,
            loginNumber: 1256,
            // 平台公告列表
            announcementList: [
                {
                    id: 1,
                    content: "为推进改造，系统密码强度优化通知。",
                    typeText: "消息确认通知",
                    creareTime: "2020-03-15 20:07:17",
                    hasRead: 0,
                },
                {
                    id: 2,
                    content: "组织机构添加单位时，单位地址信息为必填相关通知。",
                    typeText: "审核通知",
                    creareTime: "2020-03-01 20:07:17",
                    hasRead: 1,
                },
                {
                    id: 3,
                    content: "2020年春节期间系统运维时间调整公告！",
                    typeText: "审核通知",
                    creareTime: "2020-02-26 20:07:17",
                    hasRead: 0,
                },
                {
                    id: 4,
                    content: "2020年春节系统更新及版本V1.0.1公告！",
                    typeText: "审核通知",
                    creareTime: "2020-02-15 20:07:17",
                    hasRead: 0,
                },
            ],
            // 处理平台公告列表
            doAnnouncementList: [],
        };
    },
    created() {},
    mounted() {
        // var test = document
        //     .getElementById("frame1")
        //     .contentWindow.document.getElementById("content-container");
        // console.log(test);
        // test.style.overflow = "hidden";
        this.init();
    },
    methods: {
        init() {
            this.doArray();
        },
        // 获取今天是周几
        weekDate() {
            let now = new Date();
            let day = now.getDay();
            let weeks = [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
            ];
            let week = weeks[day];
            return week;
        },
        doArray() {
            this.doAnnouncementList.push(
                this.announcementList.slice(0, 3),
                this.announcementList.slice(3)
            );
        },
        goFindAnnountDetial(val) {
            this.$router.push({
                path: "/moreAnnoument/announceDetail",
                query: {
                    id: val.id,
                },
            });
        },
        goMoreAnnounts() {
            this.$router.push("/moreAnnoument");
        },
    },
    computed: {
        ...mapState(["app"]),
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
