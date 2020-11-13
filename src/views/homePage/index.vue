<template>
    <div class="homePage">
        <div class="first-box">
            <div
                class="home-header"
                v-if="app.rolesInfo.roleName && isShowAuditOrSecrect()"
            >
                <div class="item-left">
                    <h3>欢迎您，</h3>
                    <p class="date">
                        {{ new Date() | dataFilter("YYYY-MM-DD") }}
                        {{ weekDate() }},登录考核应用分析平台！
                    </p>
                </div>
            </div>
            <el-row :gutter="20">
                <el-col
                    :span="8"
                    v-if="app.rolesInfo.roleName && !isShowAuditOrSecrect()"
                >
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
                <el-col
                    :span="5"
                    v-if="!app.rolesInfo.roleName && !isShowAuditOrSecrect()"
                >
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
                <el-col :span="8" v-if="isShowSuperOrSystem()">
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
                <el-col :span="8" v-if="isShowSuperOrSystem()">
                    <el-card class="item-card">
                        <iframe :src="exportUrl" frameborder="0"></iframe>
                    </el-card>
                </el-col>

                <el-col
                    :span="8"
                    v-if="
                        app.rolesInfo.roleName &&
                        !isShowSuperOrSystem() &&
                        !isShowAuditOrSecrect()
                    "
                    style="min-width: 200px;"
                >
                    <el-card class="item-card">
                        <div style="margin-top: -10px;">
                            <iframe
                                :src="unitSrc"
                                frameborder="0"
                                width="100%"
                            ></iframe>
                        </div>
                    </el-card>
                </el-col>
                <el-col
                    :span="8"
                    v-if="
                        app.rolesInfo.roleName &&
                        !isShowSuperOrSystem() &&
                        !isShowAuditOrSecrect()
                    "
                >
                    <el-card class="item-card">
                        <div style="margin-top: -10px;">
                            <iframe :src="userSrc" frameborder="0"></iframe>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="app.rolesInfo.roleName ? 24 : 19">
                    <div class="home-box">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>平台公告</span>
                            </div>
                            <div
                                class="announcement-box"
                                :style="
                                    !app.rolesInfo.roleName
                                        ? 'height:110px'
                                        : ''
                                "
                            >
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
                                                            src="@src/common/images/notice.svg"
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
                <div class="params-box">
                    <div class="date-box">
                        <el-button
                            :type="rangeDate === -7 ? 'primary' : ''"
                            size="mini"
                            @click="rangeDateChange(-7)"
                            >近7天</el-button
                        >
                        <el-button
                            :type="rangeDate === -30 ? 'primary' : ''"
                            size="mini"
                            @click="rangeDateChange(-30)"
                            >近30天</el-button
                        >
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane
                            label="全省应用情况使用趋势"
                            name="first"
                            v-if="isShowAllProvince()"
                        >
                            <el-row>
                                <el-col :span="3">
                                    <div class="system-left">
                                        <p
                                            :class="{
                                                isActive: systemId1 == item.id,
                                            }"
                                            v-for="(item,
                                            index) in app.applicationList"
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
                                            class="staticFrame"
                                            frameborder="0"
                                            width="100%"
                                        ></iframe>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane
                            label="区域应用情况使用趋势"
                            name="second"
                            v-if="isShowCityOrCounty()"
                        >
                            <el-row>
                                <el-col :span="3">
                                    <div class="system-left">
                                        <span>
                                            <el-select
                                                size="small"
                                                style="width: 100px;"
                                                v-model="areaId"
                                                :disabled="isPerson"
                                                @change="areaChange"
                                                placeholder="请选择"
                                            >
                                                <el-option
                                                    v-for="item in areaList"
                                                    :key="item.treeId"
                                                    :label="item.treeName"
                                                    :value="item.treeId"
                                                ></el-option>
                                            </el-select>
                                        </span>
                                        <p
                                            :class="{
                                                isActive: systemId2 == item.id,
                                            }"
                                            v-for="(item,
                                            index) in app.applicationList"
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
                                            :src="cityOrCountyUrl"
                                            class="staticFrame"
                                            frameborder="0"
                                            width="100%"
                                        ></iframe>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane
                            label="单位应用情况使用趋势"
                            name="third"
                            v-if="app.rolesInfo.roleName === 'UNIT_MANAGER'"
                        >
                            <el-row>
                                <el-col :span="3">
                                    <div class="system-left">
                                        <p
                                            :class="{
                                                isActive: systemId3 == item.id,
                                            }"
                                            v-for="(item,
                                            index) in app.applicationList"
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
                                            :src="homeUnitUrl"
                                            class="staticFrame"
                                            frameborder="0"
                                            width="100%"
                                        ></iframe>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="个人应用情况使用趋势" name="four">
                            <el-row>
                                <el-col :span="3">
                                    <div class="system-left">
                                        <p
                                            :class="{
                                                isActive: systemId4 == item.id,
                                            }"
                                            v-for="(item,
                                            index) in personAppList"
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
                                            :src="homePersonUrl"
                                            class="staticFrame"
                                            frameborder="0"
                                            width="100%"
                                        ></iframe>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
import { reportParams } from "@src/config/report";
import dataStatistics from "@src/mixins/data-statistics";
export default {
    mixins: [dataStatistics],
    data() {
        return {
            rangeDate: -7,
            personAppList: [],
            reportParams: reportParams,
            exportUrl: "",
            allProvinceUrlUrl: "",
            homePersonUrl: "",
            cityOrCountyUrl: "",
            homeUnitUrl: "",
            systemId1: "",
            systemId2: "",
            systemId3: "",
            systemId4: "",
            srcUrl: "",
            srcUrl1: "",
            activeName: "",
            systemId: 1,
            useType: 0,
            isPerson: false,
            yesterdayLogin: 2345,
            loginNumber: 1256,
            unitSrc: "",
            userSrc: "",
            areaId: 1,
            areaList: [],
            // 平台公告列表
            announcementList: [],
            // 处理平台公告列表
            doAnnouncementList: [],
        };
    },
    created() {
        this.initializeDate(true, this.rangeDate);
    },
    mounted() {
        this.init();
        this.initIframeResult();
        if (this.app.applicationList.length > 0) {
            let ary = [...this.app.applicationList];
            this.doApplyList(ary);
        }
    },
    methods: {
        init() {
            this.getSystemNoticeList();
            if (this.isShowSuperOrSystem()) {
                this.exportUrl = this.hostApi + this.reportParams.exportUrl;
                this.getLastDayLoginUser();
            } else if (
                !this.isShowAuditOrSecrect() &&
                this.app.rolesInfo.roleName
            ) {
                this.getIframeSrc();
            }
        },
        // 超管和系统管理员
        isShowSuperOrSystem() {
            return (
                this.app.rolesInfo.roleName === "SUPER_MANAGER" ||
                this.app.rolesInfo.roleName === "SYSTEM_MANAGER"
            );
        },
        // 审计管理员 安全保密员
        isShowAuditOrSecrect() {
            if (this.app.rolesInfo.roleName) {
                return (
                    this.app.rolesInfo.roleName.includes(
                        "SECURITY_SECRECY_MANAGER"
                    ) ||
                    this.app.rolesInfo.roleName.includes(
                        "SECURITY_AUDIT_MANAGER"
                    )
                );
            } else {
                return false;
            }
        },
        // 超级管理员 系统 省级
        isShowAllProvince() {
            return (
                this.app.rolesInfo.roleName === "PROVINCE_MANAGER" ||
                this.app.rolesInfo.roleName === "SUPER_MANAGER"
            );
        },
        // 市州 区域
        isShowCityOrCounty() {
            return (
                this.app.rolesInfo.roleName === "CITY_MANAGER" ||
                this.app.rolesInfo.roleName === "COUNTY_MANAGER"
            );
        },
        initCityOrCounty() {
            let data = {
                startDate: this.startDate,
                endDate: this.endDate,
                codeNum: this.areaId,
            };
            if (this.app.rolesInfo.roleName === "CITY_MANAGER") {
                data.type = 1;
                data.cityNum = this.areaId === "520000" ? 0 : this.areaId;
                data.qxNum = this.areaId === "520000" ? 0 : "";
            } else {
                data.type = 2;
                data.cityNum = "";
                data.qxNum = this.areaId;
            }
            this.initSystem(
                "cityOrCounty",
                this.doSrcParams(data),
                this.systemId2
            );
        },
        initAllProvince() {
            let data = {
                startDate: this.startDate,
                endDate: this.endDate,
            };
            this.initSystem("province", this.doSrcParams(data), this.systemId1);
        },
        initPerson() {
            let data = {
                startDate: this.startDate,
                endDate: this.endDate,
                format1: this.formatParams.format1,
                format2: this.formatParams.format2,
                startDay: this.formatParams.format3,
                size: this.formatParams.format4,
                userId: this.app.rolesInfo.uid,
            };
            this.initSystem(
                "homePerson",
                this.doSrcParams(data),
                this.systemId4
            );
        },
        initUnit() {
            let authList = this.app.rolesInfo.authorizedOid;
            let str = "";
            let codeNum = "";
            if (authList && authList.length > 0) {
                authList.forEach((item) => {
                    str += item + ",";
                });
                codeNum = str.substring(0, str.length - 1);
            }
            let data = {
                startDate: this.startDate,
                endDate: this.endDate,
                format1: this.formatParams.format1,
                format2: this.formatParams.format2,
                startDay: this.formatParams.format3,
                size: this.formatParams.format4,
                orgId: codeNum,
            };
            this.initSystem("homeUnit", this.doSrcParams(data), this.systemId3);
        },
        handleClick(data) {
            if (this.activeName === "four") {
                this.systemId4 = this.personAppList[0].id;
                this.initPerson();
            } else if (this.activeName === "first") {
                this.systemId1 = this.app.applicationList[0].id;
                this.initAllProvince();
            } else if (this.activeName === "second") {
                this.systemId2 = this.app.applicationList[0].id;
                this.initCityOrCounty();
            } else if (this.activeName === "third") {
                this.systemId3 = this.app.applicationList[0].id;
                this.initUnit();
            }
        },
        rangeDateChange(time) {
            this.rangeDate = time;
            this.initializeDate(true, this.rangeDate);
            if (this.activeName === "four") {
                this.initPerson();
            } else if (this.activeName === "first") {
                this.initAllProvince();
            } else if (this.activeName === "second") {
                console.log(this.systemId2);
                this.initCityOrCounty();
            } else if (this.activeName === "third") {
                this.initUnit();
            }
        },
        applyChange(index, id) {
            if (this.activeName === "four") {
                this.systemId4 = id;
                this.initPerson();
            } else if (this.activeName === "first") {
                this.systemId1 = id;
                this.initAllProvince();
            } else if (this.activeName === "second") {
                this.systemId2 = id;
                console.log(this.systemId2);
                this.initCityOrCounty();
            } else if (this.activeName === "third") {
                this.systemId3 = id;
                this.initUnit();
            }
        },
        doApplyList(appList) {
            appList.map((item, index) => {
                if (item.id === 1 || item.id === 5) {
                    appList.splice(index, 1);
                }
            });
            this.personAppList = appList;
            if (this.activeName === "four") {
                this.systemId4 = this.personAppList[0].id;
                this.initPerson();
            }
        },
        initIframeResult() {
            if (this.isShowAllProvince()) {
                this.activeName = "first";
                this.initAllProvince();
            } else if (
                this.isShowCityOrCounty() &&
                this.app.rolesInfo.roleName
            ) {
                this.activeName = "second";
                this.getAreaList();
            } else if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                this.activeName = "third";
                this.initUnit();
            } else {
                this.activeName = "four";
            }
        },
        getIframeSrc() {
            let roleName = this.app.rolesInfo.roleName;
            let authList = this.app.rolesInfo.authorizedOid;
            let data = {};
            let name = "";
            let unitSrc = "";
            let userSrc = "";
            if (roleName === "COUNTY_MANAGER") {
                name = "CITY_MANAGER";
            } else {
                name = roleName;
            }
            let ary = this.reportParams.rolesUnitUser.filter((item) => {
                return item.roleName === name;
            });
            let str = "";
            let codeNum = "";
            if (authList && authList.length > 0) {
                authList.forEach((item) => {
                    str += item + ",";
                });
                codeNum = str.substring(0, str.length - 1);
            }
            console.log(ary);
            unitSrc = this.hostApi + ary[0].unitSrc;
            userSrc = this.hostApi + ary[0].userSrc;

            switch (roleName) {
                case "UNIT_MANAGER":
                    data.orgId = codeNum;
                    this.unitSrc = unitSrc + "&orgId" + data.orgId;
                    this.userSrc = userSrc + "&orgId" + data.orgId;
                    break;
                case "CITY_MANAGER":
                    data.type = 1;
                    data.codeNum = codeNum;
                    this.unitSrc = unitSrc + this.doSrcParams(data);
                    this.userSrc = userSrc + this.doSrcParams(data);
                    break;
                case "COUNTY_MANAGER":
                    data.type = 2;
                    data.codeNum = codeNum;
                    this.unitSrc = unitSrc + this.doSrcParams(data);
                    this.userSrc = userSrc + this.doSrcParams(data);

                    break;
                case "PROVINCE_MANAGER":
                    this.unitSrc = unitSrc;
                    this.userSrc = userSrc;
                    break;
                default:
                    return null;
            }
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
        // 获取市州或区县
        getAreaList() {
            let data = {
                codeList: this.app.rolesInfo.authorizedOid,
                authorizedType: this.app.rolesInfo.authorizedType,
            };
            api[urlNames["getAreaList"]](data).then((res) => {
                if (res.data) {
                    let aryList = [];
                    res.data.forEach((item) => {
                        let obj = {
                            treeId: item.areaCode,
                            treeName: item.areaName,
                            treeType: item.areaType,
                        };
                        aryList.push(obj);
                    });
                    this.areaList = aryList;
                    if (this.areaList.length > 0) {
                        this.areaId = this.areaList[0].treeId;
                        this.initCityOrCounty();
                    }
                }
            });
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
        areaChange(val) {
            this.initCityOrCounty();
        },
    },
    computed: {
        ...mapState(["app"]),
        appList() {
            return this.app.applicationList;
        },
    },
    watch: {
        appList() {
            this.systemId3 = this.systemId2 = this.systemId1 = this.systemId = this.appList[0].id;
            let ary = [...this.appList];
            this.doApplyList(ary);
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
