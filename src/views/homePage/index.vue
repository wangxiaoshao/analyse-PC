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
        <div class="homeContent" v-if="hasRight('viewCommissionMatters')">
            <div class="header-title">待办事项</div>
            <div class="notice">
                <div
                    class="noticeInfo"
                    v-for="(itemList, index) in doNoticeList"
                    :key="index"
                >
                    <p
                        v-for="val in itemList"
                        :key="val.id"
                        @click="doFindNotice(val)"
                    >
                        <el-row>
                            <el-col :span="16">
                                <span class="msg" :title="val.typeText">{{
                                    val.content
                                }}</span></el-col
                            >
                            <el-col :span="8">
                                <span class="date">{{
                                    val.createTime
                                }}</span></el-col
                            >
                        </el-row>
                    </p>
                </div>
                <a href="javaScript:void(0)" @click="goMoreNotice"
                    >查看更多待办事项 <i class="el-icon-d-arrow-right"></i
                ></a>
            </div>
        </div>
        <div class="homeContent" v-if="hasRight('viewPlatformAnnouncement')">
            <div class="header-title">平台公告</div>
            <div class="notice">
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
        </div>
        <div class="homeContent" v-if="hasRight('viewYesterdayData')">
            <div class="header-title">
                昨日数据
                <span style="color: #999; font-size: 12px; margin-left: 5px;"
                    >更新于{{ dataStr }}</span
                >
            </div>
            <div class="info-box">
                <div class="detailInfo">
                    <p>组织机构注册总人数</p>
                    <p>{{ countData.userCount }}</p>
                    <ul>
                        <li>
                            日<span
                                >{{ countData.userCountDay }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            周<span
                                >{{ countData.userCountWeek }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            月<span
                                >{{ countData.userCountMonth }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                    </ul>
                </div>
                <div class="detailInfo">
                    <p>单位总数</p>
                    <p>{{ countData.organCount }}</p>
                    <ul>
                        <li>
                            日<span
                                >{{ countData.organCountDay }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            周<span
                                >{{ countData.organCountWeek }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            月<span
                                >{{ countData.organCountMonth }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                    </ul>
                </div>
                <div class="detailInfo">
                    <p>内设机构总数</p>
                    <p>{{ countData.deptCount }}</p>
                    <ul>
                        <li>
                            日<span
                                >{{ countData.deptCountDay }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            周<span
                                >{{ countData.deptCountWeek }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            月<span
                                >{{ countData.deptCountMonth }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                    </ul>
                </div>
                <div class="detailInfo">
                    <p>人员变动数</p>
                    <p>{{ countData.userChangedCount }}</p>
                    <ul>
                        <li>
                            日<span
                                >{{ countData.userChangedCountDay }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            周<span
                                >{{ countData.userChangedCountWeek }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            月<span
                                >{{ countData.userChangedCountMonth }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                    </ul>
                </div>
                <div class="detailInfo">
                    <p>接入应用总数</p>
                    <p>{{ applyCount.shareApplicationCount }}</p>
                    <ul>
                        <!--  <i class="el-icon-top"></i>-->
                        <li>
                            日<span
                                >{{ applyCount.shareApplicationCountDay || 0 }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            周<span
                                >{{
                                    applyCount.shareApplicationCountWeek || 0
                                }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                        <li>
                            月<span
                                >{{
                                    applyCount.shareApplicationCountMonth || 0
                                }}
                                <i class="el-icon-top"></i
                            ></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <el-dialog
            :visible.sync="validSignatureDialog"
            lock-scroll
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            class="dialog-box"
            width="500px"
        >
            <div slot="title" style="padding: 20px;">
                校验结果
            </div>
            <p>
                <img src="@src/common/images/v2_qb1b03.png" alt="" />
                个人信息签名验证未通过，请及时联系运维人员处理。
            </p>
            <div slot="footer" class="dialog-footer">
                <el-button
                    type="info"
                    @click="
                        validSignatureDialog = false;
                        init();
                    "
                    width="120px"
                    >继续使用系统</el-button
                >
                <el-button type="primary" width="120px"
                    ><a href="/api/gate/logout" style="color: #fff;"
                        >退出系统</a
                    ></el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
import hasRight from "@src/mixins/has-right";
import dicOption from "@src/mixins/dic-options.js";

export default {
    mixins: [dicOption, hasRight],
    data() {
        return {
            userIdentityInfo: {
                userName: "",
                id: "",
                type: null,
                uid: "",
                departmentId: "",
                orgId: "-",
                dutyName: "",
                postName: "",
                organizationName: "",
                departmentName: "",
            },
            // 待办事项列表
            noticeList: [
                {
                    id: 1,
                    content:
                        "22消息确认通知消息确认通知消息确认通知息确认通知消息确认通知消息确认通22消息确认通知消息确认通知消息确认通知息确认通知消息确认通知消息确认通",
                    typeText: "消息确认通知",
                    creareTime: "2020-2-24 14:19:20",
                    hasRead: 0,
                },
                {
                    id: 2,
                    content: "11",
                    typeText: "审核通知",
                    creareTime: "2020-1-20 14:19:20",
                    hasRead: 1,
                },
                {
                    id: 3,
                    content: "11",
                    typeText: "审核通知",
                    creareTime: "2020-2-24 14:19:20",
                    hasRead: 0,
                },
                {
                    id: 4,
                    content: "13",
                    typeText: "审核通知",
                    creareTime: "2020-2-24 14:19:20",
                    hasRead: 0,
                },
            ],
            // 处理待办事项列表
            doNoticeList: [],
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
            dataStr: "",
            // 详细数据
            countData: {
                userCount: null,
                deptCount: null,
                organCount: null,
                userChangedCount: null,
            },
            loginNumber: null,
            applyCount: {},
            // 人员变动数
            changeAccount: null,

            configDialogVisible: false,
            homepageConfig: [
                {
                    name: "基本信息",
                    isChecked: true,
                },
                {
                    name: "待办事项",
                    isChecked: false,
                },
                {
                    name: "平台公告",
                    isChecked: true,
                },
                {
                    name: "昨日数据",
                    isChecked: true,
                },
            ],

            // 验签提示对话框
            validSignatureDialog: false,
            loader: null,
        };
    },
    created() {
        this.validSignature();
    },
    mounted() {
        this.userIdentityInfo.userName = this.app.option.user.name;
        this.doArray();
    },
    methods: {
        // 国密验签
        validSignature(callback) {
            this.loader = this.$loading({
                fullscreen: true,
                text: "用户信息签名校验中...",
            });

            api[urlNames["validSignature"]]({
                entityId: this.app.option.user.uid,
                // 用户信息
                entityType: 1,
            })
                .then((res) => {
                    if (res.message !== "success" || res.data === 0) {
                        throw new Error("验签不通过");
                    }
                    this.loader.close();
                    this.$message({
                        message: "签名验证通过",
                        type: "success",
                    });
                    this.init();
                })
                .catch(() => {
                    this.loader.close();
                    this.validSignatureDialog = true;
                });
        },

        init() {
            this.getUserIdentityInfo();
            this.getAccountData();
            this.getNoticeList();
            this.getLoginIndex();
            // 获取接应用总数
            api[urlNames["findApplicationCount"]]().then((res) => {
                this.applyCount = res.data;
            });
        },

        // 获取第几个用户
        getLoginIndex() {
            api[urlNames["loginIndex"]]().then((res) => {
                this.loginNumber = res.data;
            });
        },
        // 获取用户身份信息
        getUserIdentityInfo() {
            api[urlNames["findIdentityById"]]({
                identityId: this.app.option.user.identityId,
            }).then(
                (res) => {
                    Object.assign(this.userIdentityInfo, res.data);
                },
                () => {
                    /* this.$message.error(`没有内容`) */
                }
            );
        },

        // 获取待办事项
        getNoticeList() {
            let data = {
                page: 1,
                limit: 6,
            };
            api[urlNames["notificationList"]](data).then((res) => {
                this.noticeList = res.data;
                this.doNoticeList.push(
                    this.noticeList.slice(0, 3),
                    this.noticeList.slice(3)
                );
            });
        },

        // 获取昨日数据
        // getStatistiscCount
        getAccountData() {
            api[urlNames["getStatistiscCount"]]().then((res) => {
                this.countData = res.data;
            });
        },

        // 待办事项点击查看
        doFindNotice(val) {
            if (val.typeText === "消息确认通知") {
                this.$router.push("/confirm-info");
            } else {
                this.$router.push("/wait-approval");
            }
        },
        goFindAnnountDetial(val) {
            this.$router.push({
                path: "/announceDetail",
                query: {
                    id: val.id,
                },
            });
        },

        doArray() {
            this.dataStr =
                new Date().getFullYear() +
                "年" +
                (new Date().getMonth() + 1) +
                "月" +
                new Date().getDate() +
                "日";
            this.doAnnouncementList.push(
                this.announcementList.slice(0, 3),
                this.announcementList.slice(3)
            );
        },
        filterType(val) {
            let typeList = this.userTypeOptions.filter(
                (item) => item.value === val
            );
            return typeList.length > 0 ? typeList[0].text : "无";
        },

        goPersonalPage() {
            this.$router.push("/pass-change");
        },
        goMoreNotice() {
            this.$router.push("/notification");
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
