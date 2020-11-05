<template>
    <div class="homePage">
        <div class="first-box">
            <el-row :gutter="20">
                <el-col :span="8" v-if="app.rolesInfo.roleName">
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
                <el-col :span="5" v-else>
                    <el-card class="item-card-person">
                        <div class="item-right">
                            <img src="@src/common/images/today.png" alt="" />
                        </div>
                        <div class="item-left">
                            <h3>欢迎您，</h3>
                            <p class="date">
                                {{ new Date() | dataFilter("YYYY-MM-DD") }}
                                {{ weekDate() }}
                            </p>
                            <p>登录考核应用分析平台！</p>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="item-card">
                        <el-row>
                            <el-col :span="13">
                                <div class="item-left">
                                    <p class="title">昨日登录人员</p>
                                    <p class="number">
                                        <span>{{ yesterdayLogin }}</span> 人
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
                    <el-card class="item-card">
                        <iframe src="" frameborder="0"></iframe>
                    </el-card>
                </el-col>
                <!-- <el-col :span="8">
                    <el-card class="item-card">
                        <iframe :src="unitSrc" frameborder="0"></iframe>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card class="item-card">
                        <iframe :src="userSrc" frameborder="0"></iframe>
                    </el-card>
                </el-col> -->
                <el-col :span="app.rolesInfo.roleName ? 24 : 19">
                    <div class="home-box">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>平台公告</span>
                            </div>
                            <div class="announcement-box">
                                <div
                                    class="noticeInfo"
                                    v-for="(itemList,
                                    index) in doAnnouncementList"
                                    :key="index"
                                >
                                    <p
                                        v-for="(val, num) in itemList"
                                        :key="val.id"
                                        @click="goFindAnnountDetial(val)"
                                    >
                                        <el-row>
                                            <el-col :span="16">
                                                <span
                                                    class="msg"
                                                    :title="val.title"
                                                >
                                                    <span
                                                        class="icon"
                                                        v-if="num === 0"
                                                    >
                                                        <img
                                                            src="@src/common/images/notice.png"
                                                            alt=""
                                                        />
                                                    </span>
                                                    <span
                                                        v-else
                                                        style="
                                                            margin-left: 27px;
                                                        "
                                                    ></span>
                                                    {{ val.title }}</span
                                                >
                                                <!-- <span>{{ val.content }}</span> -->
                                            </el-col>
                                            <el-col :span="8">
                                                <span class="date">{{
                                                    val.creareTime
                                                }}</span></el-col
                                            >
                                        </el-row>
                                    </p>
                                </div>
                                <a
                                    href="javaScript:void(0)"
                                    @click="goMoreAnnounts"
                                    >查看更多公告
                                    <i class="el-icon-d-arrow-right"></i
                                ></a>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="total-box">
            <el-card class="total-card">
                <div>
                    <el-radio-group v-model="useType" @change="typeChange">
                        <el-radio-button
                            :label="item.val"
                            v-for="item in typeList"
                            :key="item.val"
                            >{{ item.label }}</el-radio-button
                        >
                    </el-radio-group>
                </div>
                <el-row>
                    <el-col :span="3">
                        <div class="system-left">
                            <p
                                :class="{ isActive: index == current }"
                                v-for="(item, index) in app.applicationList"
                                :key="item.id"
                                @click="applyChange(index, item.id)"
                            >
                                {{ item.systemName }}
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <div class="system-right">
                            <iframe
                                :src="srcUrl"
                                id="staticFrame"
                                frameborder="0"
                                width="100%"
                            ></iframe>
                        </div>
                    </el-col>
                </el-row>
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
            typeList: [
                { label: "单位应用情况使用趋势", val: 0 },
                { label: "个人应用情况使用趋势", val: 1 },
            ],
            srcUrl:
                "http://localhost:8088/webroot/decision/view/report?viewlet=homepage_whole_province%252F%25E5%2585%25A8%25E7%259C%2581%25E5%258F%25B0%25E8%25B4%25A6%25E5%25BA%2594%25E7%2594%25A8%25E7%25BB%259F%25E8%25AE%25A1.cpt&ref_t=design&op=write&ref_c=16273013-f2a2-4631-a99c-89b7f6f25783",
            current: 0,
            systemId: "",
            useType: 0,
            yesterdayLogin: 2345,
            loginNumber: 1256,
            unitSrc: "",
            userSrc: "",
            // 平台公告列表
            announcementList: [
                {
                    id: 1,
                    content: "为推进改造，系统密码强度优化通知。",
                    title: "通知1",
                    creareTime: "2020-03-01 20:07:17",
                    url: "",
                },
                {
                    id: 2,
                    content:
                        "组织机构添加单位时，单位地址信息为必填相关通知。组织机构添加单位时，单位地址信息为必填相关通知",
                    title: "审核通知",
                    creareTime: "2020-03-01 20:07:17",
                    url: "",
                },
                {
                    id: 3,
                    content: "2020年春节期间系统运维时间调整公告！",
                    title: "审核通知",
                    creareTime: "2020-02-26 20:07:17",
                    url: "",
                },
                {
                    id: 4,
                    content: "2020年春节系统更新及版本V1.0.1公告！",
                    title: "审核通知",
                    creareTime: "2020-02-15 20:07:17",
                    url: "",
                },
            ],
            // 处理平台公告列表
            doAnnouncementList: [],
            applicationList: [
                {
                    systemName: "台账",
                    systemSymbol: "mTqBGxtb",
                    id: 3151,
                },
                {
                    systemName: "快传",
                    systemSymbol: "mTqBGxtb",
                    id: 3152,
                },
                {
                    systemName: "通知公告",
                    systemSymbol: "mTqBGxtb",
                    id: 3153,
                },
                {
                    systemName: "快传1",
                    systemSymbol: "mTqBGxtb",
                    id: 3154,
                },
                {
                    systemName: "通知公告1",
                    systemSymbol: "mTqBGxtb",
                    id: 3155,
                },
            ],
        };
    },
    created() {
        // this.unitSrc=""
        // this.userSrc=""
    },
    mounted() {
        // var test = document
        //     .getElementById("frame1")
        //     .contentWindow.document.getElementById("content-container");
        // console.log(test);
        // test.style.overflow = "hidden";
        this.init();
        // this.doArray();
    },
    methods: {
        init() {
            this.getSystemNoticeList();
            this.getLastDayLoginUser();
        },
        // 获取平台公告列表
        getSystemNoticeList() {
            let data = {
                page: 1,
                pageSize: 6,
            };
            api[urlNames["getSystemNoticeList"]](data).then((res) => {
                if (res) {
                    this.announcementList = res.data;
                    this.doArray();
                }
            });
        },
        // 获取昨日登录人员数据
        getLastDayLoginUser() {
            api[urlNames["getLastDayLoginUser"]]().then((res) => {
                if (res) {
                    this.yesterdayLogin = res.data;
                }
            });
        },
        typeChange() {},
        applyChange(index, id) {
            this.current = index;
            this.systemId = id;
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
