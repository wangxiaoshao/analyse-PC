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
                                        ? 'height:110px;'
                                        : ''
                                "
                            >
                                <div
                                    class="noticeInfo"
                                    v-for="(itemList,
                                    index) in doAnnouncementList"
                                    :key="index"
                                >
                                    <!-- @click="goFindAnnountDetial(val)" -->
                                    <div
                                        class="notice-tr"
                                        v-for="(val, num) in itemList"
                                        :key="val.id"
                                    >
                                        <el-collapse
                                            v-model="noticeActiveNames"
                                        >
                                            <el-collapse-item :name="val.id">
                                                <template slot="title">
                                                    <p>
                                                        <el-row>
                                                            <el-col :span="16">
                                                                <span
                                                                    :title="
                                                                        val.title
                                                                    "
                                                                    class="msg"
                                                                >
                                                                    <span
                                                                        class="icon"
                                                                        v-if="
                                                                            num ===
                                                                            0
                                                                        "
                                                                    >
                                                                        <img
                                                                            src="@src/common/images/notice.svg"
                                                                            alt=""
                                                                        />
                                                                    </span>
                                                                    <i
                                                                        v-else
                                                                        class="title-list"
                                                                    ></i>
                                                                    <span>{{
                                                                        val.title
                                                                    }}</span>
                                                                </span>
                                                            </el-col>
                                                            <el-col :span="8">
                                                                <span
                                                                    class="date"
                                                                >
                                                                    {{
                                                                        val.createTime
                                                                            | dataFilter(
                                                                                "YYYY-MM-DD HH:mm:ss"
                                                                            )
                                                                    }}
                                                                </span></el-col
                                                            >
                                                        </el-row>
                                                    </p>
                                                </template>
                                                <div
                                                    title="点击查看公告详情"
                                                    class="content"
                                                    @click="
                                                        goFindAnnountDetial(val)
                                                    "
                                                >
                                                    {{ val.content }}
                                                </div>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </div>
                            </div>
                            <a href="javaScript:void(0)" @click="goMoreAnnounts"
                                >查看更多公告
                                <i class="el-icon-d-arrow-right"></i
                            ></a>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div
            class="unit-top"
            v-if="
                app.rolesInfo.roleName === 'UNIT_MANAGER' ||
                !app.rolesInfo.roleName
            "
        >
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span class="title">单位排行榜</span>
                    <span class="top">Top</span>
                    <span class="num">10</span>
                    <el-select
                        v-if="app.rolesInfo.roleName === 'UNIT_MANAGER'"
                        size="small"
                        style="width: 160px;"
                        v-model="orgId"
                        @change="unitChange"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="item in unitList"
                            :key="item.orgId"
                            :label="item.orgName"
                            :value="item.orgId"
                        ></el-option>
                    </el-select>
                </div>
                <iframe
                    :src="unitTopUrl"
                    frameborder="0"
                    width="100%"
                    id="unit-top"
                ></iframe>
                <div>
                    <el-pagination
                        style="float: right; border: none;"
                        small
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        @prev-click="send('_g().gotoPreviousPage()')"
                        @next-click="send('_g().gotoNextPage()')"
                        :current-page="page.current"
                        :page-sizes="[5]"
                        :page-size="page.limit"
                        layout=" prev, pager, next"
                        :total="page.total"
                    ></el-pagination>
                </div>
            </el-card>
        </div>
        <div class="total-box">
            <el-card class="total-card">
                <div class="params-box">
                    <div class="date-box">
                        <el-button
                            :type="rangeDate === 7 ? 'primary' : ''"
                            size="mini"
                            @click="rangeDateChange(7)"
                            >近7天</el-button
                        >
                        <el-button
                            :type="rangeDate === 30 ? 'primary' : ''"
                            size="mini"
                            @click="rangeDateChange(30)"
                            >近30天</el-button
                        >
                    </div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane
                            :label="tabLabel"
                            name="authType"
                            v-if="
                                isShowAllProvince() ||
                                isShowCityOrCounty() ||
                                app.rolesInfo.roleName === 'UNIT_MANAGER'
                            "
                        >
                            <el-row>
                                <el-col :span="3">
                                    <div class="system-left">
                                        <span v-if="isShowCityOrCounty()">
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
                                                isActive: systemId == item.id,
                                            }"
                                            v-for="(item,
                                            index) in applicationList"
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
                                            v-if="systemId !== 6"
                                            :src="srcUrl"
                                            class="staticFrame"
                                            frameborder="0"
                                            width="100%"
                                        ></iframe>
                                        <div class="no-data" v-else>
                                            <img
                                                src="@src/common/images/no-data1.png"
                                                alt=""
                                            />
                                            <div class="no-text">
                                                暂无数据！
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>

                        <el-tab-pane label="个人应用情况使用趋势" name="person">
                            <el-row>
                                <el-col :span="3">
                                    <div class="system-left">
                                        <p
                                            :class="{
                                                isActive: systemId == item.id,
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
                                            v-if="systemId !== 6"
                                            :src="homePersonUrl"
                                            class="staticFrame"
                                            frameborder="0"
                                            width="100%"
                                        ></iframe>
                                        <div class="no-data" v-else>
                                            <img
                                                src="@src/common/images/no-data1.png"
                                                alt=""
                                            />
                                            <div class="no-text">
                                                暂无数据！
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </div>
        <valid-signature-manage
            :visible.sync="validVisable"
            :isValidSuccess="isValidSuccess"
            validSuccessMsg="个人签名验证成功。"
            validFailMsg="签名验证失败，请联系运维人员进行处理。"
        ></valid-signature-manage>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
import { reportParams } from "@src/config/report";
import dataStatistics from "@src/mixins/data-statistics";
import validSignature from "@src/mixins/validSignature";
export default {
    mixins: [dataStatistics, validSignature],
    data() {
        return {
            rangeDate: 7,
            personAppList: [],
            reportParams: reportParams,
            exportUrl: "",
            homePersonUrl: "",
            unitTopUrl: "",
            srcUrl: "",
            activeName: "",
            systemId: 1,
            useType: 0,
            isPerson: false,
            yesterdayLogin: 0,
            loginNumber: 0,
            unitSrc: "",
            userSrc: "",
            areaId: 1,
            orgId: "",
            areaList: [],
            unitList: [],
            // 平台公告列表
            announcementList: [],
            // 处理平台公告列表
            doAnnouncementList: [],
            tabLabel: "全省应用情况使用趋势",
            noticeActiveNames: [1, 4],
            page: {
                current: 1,
                limit: 5,
                total: 10,
            },
            autoParams: {
                unitTopHeight: 200,
                unitTopTotal: 0,
            },
            applicationList: [],
        };
    },
    created() {
        this.validSignature(1, this.app.rolesInfo.uid, "");
        this.initializeDate(this.rangeDate);
    },
    mounted() {
        this.init();
        this.initIframeResult();
        if (this.app.applicationList.length > 0) {
            let ary = [...this.app.applicationList];
            let ary1 = [...this.app.applicationList];
            this.doOrgList(ary1);
            this.doApplyList(ary);
        }
    },
    methods: {
        init() {
            this.getSystemNoticeList();
            /* 根据权限初始化 first-box内容 */
            if (this.isShowSuperOrSystem()) {
                this.exportUrl = this.hostApi + this.reportParams.exportUrl;
                this.getLastDayLoginUser();
            } else if (
                !this.isShowAuditOrSecrect() &&
                this.app.rolesInfo.roleName
            ) {
                this.getIframeSrc();
            }
            /* 根据权限获取排行榜内容 */
            if (
                this.app.rolesInfo.roleName === "UNIT_MANAGER" ||
                !this.app.rolesInfo.roleName
            ) {
                this.initReportPage();
                this.initChartHeight();
                this.orgId = this.app.rolesInfo.orgId;
                if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                    this.getUnitList();
                }
                this.initUnitTop();
            }
        },
        send(msg) {
            window.sendMessage(msg);
        },
        initReportPage() {
            const ifr = document.getElementById("unit-top").contentWindow;
            let sendMessage = function () {
                return function (data) {
                    console.log(data, 333);
                    ifr.postMessage(data, "*");
                };
            };
            window.sendMessage = sendMessage();
        },
        initChartHeight() {
            let that = this;
            document.getElementById("unit-top").onload = function () {
                window.addEventListener(
                    "message",
                    function (e) {
                        if (e.data.height && e.data.total) {
                            that.autoParams.unitTopHeight = e.data.height;
                            that.autoParams.unitTopTotal = e.data.total;
                        }
                        console.log(e.data, "jjjjjjj");
                    },
                    false
                );
            };
        },
        handleSizeChange(val) {
            this.page.limit = val;
        },
        handleCurrentChange(val) {
            this.page.current = val;
            this.send(`_g().gotoPage(${this.page.current})`);
        },
        initUnitTop() {
            this.unitTopUrl =
                this.hostApi +
                this.reportParams.unitTopUrl +
                "&orgId=" +
                this.orgId;
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
        // 超级管理员  省级
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
            this.initSystem("cityOrCounty", this.doSrcParams(data));
        },
        initAllProvince() {
            let data = {
                startDate: this.startDate,
                endDate: this.endDate,
            };
            this.initSystem("province", this.doSrcParams(data));
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
            this.initSystem("homePerson", this.doSrcParams(data));
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
            this.initSystem("homeUnit", this.doSrcParams(data));
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
            unitSrc = this.hostApi + ary[0].unitSrc;
            userSrc = this.hostApi + ary[0].userSrc;

            switch (roleName) {
                case "UNIT_MANAGER":
                    data.orgId = codeNum;
                    this.unitSrc = unitSrc + "&orgId=" + data.orgId;
                    this.userSrc = userSrc + "&orgId=" + data.orgId;
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
        initIframeResult() {
            /* 根据权限初始化 应用情况趋势 */
            this.activeName = "authType";
            if (this.isShowAllProvince()) {
                this.tabLabel = "全省应用情况使用趋势";
                this.initAllProvince();
            } else if (this.isShowCityOrCounty()) {
                if (this.app.rolesInfo.roleName === "CITY_MANAGER") {
                    this.tabLabel = "区域应用情况使用趋势";
                } else {
                    this.tabLabel = "区县应用情况使用趋势";
                }
                this.getAreaList();
            } else if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                this.tabLabel = "单位应用情况使用趋势";
                this.initUnit();
            } else {
                this.activeName = "person";
            }
        },
        handleClick(data) {
            if (this.activeName === "person") {
                this.systemId = this.personAppList[0].id;
                this.initPerson();
            } else if (this.activeName === "authType") {
                this.systemId = this.applicationList[0].id;
                this.authTypeIframe();
            }
        },
        authTypeIframe() {
            if (this.isShowAllProvince()) {
                this.initAllProvince();
            } else if (this.isShowCityOrCounty()) {
                this.initCityOrCounty();
            } else if (this.app.rolesInfo.roleName === "UNIT_MANAGER") {
                this.initUnit();
            }
        },
        rangeDateChange(time) {
            this.rangeDate = time;
            this.initializeDate(this.rangeDate);
            if (this.activeName === "person") {
                this.initPerson();
            } else if (this.activeName === "authType") {
                this.authTypeIframe();
            }
        },
        applyChange(index, id) {
            this.systemId = id;
            if (this.activeName === "person") {
                this.initPerson();
            } else if (this.activeName === "authType") {
                this.authTypeIframe();
            }
        },
        doApplyList(appList) {
            appList.map((item, index) => {
                if (item.id === 1 || item.id === 5) {
                    appList.splice(index, 1);
                }
            });
            this.personAppList = appList;
            if (this.activeName === "person") {
                this.systemId = this.personAppList[0].id;
                this.initPerson();
            }
        },
        doOrgList(appList) {
            appList.map((item, index) => {
                if (item.id === 5) {
                    appList.splice(index, 1);
                }
            });
            this.applicationList = appList;
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
        // 获取授权单位
        getUnitList() {
            let data = {
                assessType: 2,
                orgIds: this.app.rolesInfo.authorizedOid,
            };
            api[urlNames["getOrgListByIds"]](data).then((res) => {
                if (res.data) {
                    this.unitList = res.data;
                    // if (this.unitList.length > 0) {
                    //     this.orgId = this.unitList[0].orgId;
                    //     this.unitTopUrl =
                    //         this.hostApi +
                    //         this.reportParams.unitTopUrl +
                    //         "&orgId=" +
                    //         this.orgId;
                    // }
                }
            });
        },
        unitChange(val) {
            this.page.current = 1;
            this.unitTopUrl =
                this.hostApi +
                this.reportParams.unitTopUrl +
                "&orgId=" +
                this.orgId;
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
            this.areaId = val;
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
            this.systemId = this.appList[0].id;
            let ary = [...this.appList];
            let ary1 = [...this.appList];
            this.doOrgList(ary1);
            this.doApplyList(ary);
        },
        autoParams: {
            deep: true, // 深度监听设置为 true
            handler: function (newV, oldV) {
                this.page.total = newV.unitTopTotal;
                document.getElementById("unit-top").style.height =
                    newV.unitTopHeight + "px";
                console.log("watch中：", newV);
            },
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
