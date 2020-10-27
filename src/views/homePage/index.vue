<template>
    <div class="homePage">
        <p
            style="
                display: inline-block;
                margin-bottom: 30px;
                margin-left: 25px;
            "
        >
            欢迎您，您是今天第&nbsp;<b
                ><big>{{ loginNumber }}</big></b
            >&nbsp;个登录的用户！
        </p>
        <!--昨日登录数据和数据导出box 不使用背景图 -->
        <div class="first-box">
            <el-card class="box-card">
                <div class="statics">
                    <iframe
                        src="http://localhost:8088/webroot/decision/v10/entry/access/95f55878-4451-4384-8c96-5e393b3e64fe?preview=true"
                        frameborder="0"
                        id="frame1"
                        marginheight="0"
                        marginwidth="0"
                        width="100%"
                        scrolling="no"
                    ></iframe>
                    <!-- <div class="statics-left">
                        <h3>昨日登录人数</h3>
                        <h4>{{ yesterdayLogin }}</h4>
                    </div>
                    <div class="ststics-right">
                        <img src="@src/common/images/login.png" alt="" />
                    </div> -->
                </div>
            </el-card>
            <el-card class="box-card">
                <div class="statics">
                    <!-- <div class="statics-left">
                        <h3>数据导出</h3>
                        <h4>{{ staticsExportTotal }}</h4>
                    </div>
                    <div class="ststics-right">
                        <img src="@src/common/images/login.png" alt="" />
                    </div> -->
                </div>
            </el-card>
        </div>
        <!--昨日登录数据和数据导出box 使用背景图 -->
        <!-- <div class="first-box1">
            <div class="statics"></div>

            <div class="statics"></div>
        </div> -->
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
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
export default {
    data() {
        return {
            yesterdayLogin: 2345,
            staticsExportTotal: 500,
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
            loginNumber: null,
        };
    },
    created() {},
    mounted() {
        var test = document
            .getElementById("frame1")
            .contentWindow.document.getElementById("content-container");
        console.log(test);
        // test.style.overflow = "hidden";
        this.init();
    },
    methods: {
        init() {
            // this.getLoginIndex();
            this.doArray();
        },
        doArray() {
            this.doAnnouncementList.push(
                this.announcementList.slice(0, 3),
                this.announcementList.slice(3)
            );
        },
        // 获取第几个用户
        getLoginIndex() {
            api[urlNames["loginIndex"]]().then((res) => {
                this.loginNumber = res.data;
            });
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
