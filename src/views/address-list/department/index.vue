<template>
    <div class="departmentStyle">
        <!-- <div
            class="moreInfo"
            v-if="
                (orgInfo.nodeType == 2 && activeColor == 2) ||
                (orgInfo.nodeType == 3 && activeColor == 2)
            "
        > -->
        <div
            class="moreInfo"
            v-if="orgInfo.nodeType == 2 || orgInfo.nodeType == 3"
        >
            <div v-if="visableData.allOrgInfo == 1">
                <div class="header-title">{{ nodePrefix }}信息</div>
                <div class="infoContent">
                    <el-form label-width="120px" label-position="right">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item :label="nodePrefix + '名称'">
                                    <div class="table-td" :title="orgInfo.name">
                                        {{ orgInfo.name }}
                                    </div>
                                </el-form-item>
                                <el-form-item :label="nodePrefix + '地址'">
                                    <div class="table-td">
                                        {{ orgInfo.address || "无" }}
                                    </div>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item :label="nodePrefix + '电话'">
                                    <div class="table-td">
                                        <span>{{ orgInfo.phone || "无" }}</span>
                                        <a
                                            href="javaScrpit:void(0)"
                                            v-if="
                                                orgInfo.phone &&
                                                orgInfo.phone != '' &&
                                                !orgInfo.isLooked
                                            "
                                            style="
                                                color: #b1a8e4;
                                                font-size: 12px;
                                                margin-left: 5px;
                                            "
                                            @click="
                                                findNodePhone(
                                                    orgInfo.nodeType,
                                                    orgInfo.bindId,
                                                    1
                                                )
                                            "
                                            >查看</a
                                        >
                                    </div>
                                </el-form-item>
                                <el-form-item label="邮政编码">
                                    <div class="table-td">
                                        {{ orgInfo.zipCode || "无" }}
                                    </div>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </div>
        </div>
        <div
            class="department-tab-content"
            v-if="visableData.allOrgInfo == 1"
            :style="{ 'margin-top': '15px' }"
        >
            <div class="header-title">详细数据</div>
            <div class="info-box">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="下级机构" name="first">
                        <el-table
                            :data="departmentList"
                            style="width: 100%;"
                            class="eltab"
                            border
                            stripe
                        >
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
                                        <span style="padding-left: 8px;"
                                            >暂无数据</span
                                        >
                                    </p>
                                </div>
                            </template>
                            <el-table-column
                                type="index"
                                label="序号"
                                align="center"
                                width="50"
                            ></el-table-column>
                            <el-table-column
                                prop="name"
                                label="下级机构"
                                width="180px"
                            >
                                <template slot-scope="scope">
                                    <span>
                                        <span
                                            class="iconfont iconzuzhijigou nodeColor"
                                            v-if="scope.row.nodeType === 1"
                                        ></span>
                                        <span
                                            class="iconfont icondanwei orgColor"
                                            v-if="scope.row.nodeType === 2"
                                        ></span>
                                        <span
                                            class="iconfont iconbumen deptColor"
                                            v-if="scope.row.nodeType === 3"
                                        ></span>
                                    </span>
                                    <span v-if="!scope.row.nodeType">{{
                                        visableData.userName == 0
                                            ? hideName(scope.row.name)
                                            : scope.row.name
                                    }}</span>
                                    <span style="margin-left: 5px;" v-else>{{
                                        scope.row.name
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="类型"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <span v-if="scope.row.nodeType == 1"
                                        >节点</span
                                    >
                                    <span v-if="scope.row.nodeType == 2"
                                        >单位</span
                                    >
                                    <span v-if="scope.row.nodeType == 3"
                                        >内设机构</span
                                    >
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                label="座机号码"
                                align="center"
                                width="160px"
                            >
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.phone ||
                                        scope.row.mobile ||
                                        "无"
                                    }}</span>
                                    <el-button
                                        type="text"
                                        v-if="
                                            scope.row.phone &&
                                            scope.row.phone != '' &&
                                            !scope.row.isLooked
                                        "
                                        class="findMobileBtn"
                                        :disabled="
                                            visableData.userPhone == 0 &&
                                            scope.row.nodeType == 3
                                        "
                                        @click="
                                            findNodePhone(
                                                scope.row.nodeType,
                                                scope.row.bindId,
                                                2,
                                                scope.$index
                                            )
                                        "
                                        >查看</el-button
                                    >
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center">
                                <template slot-scope="scope">
                                    <span v-if="!scope.row.nodeType">无</span>
                                    <span
                                        v-else
                                        class="findMobileBtn"
                                        @click="childClick(scope.row)"
                                        >查看下级</span
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane
                        label="人员信息"
                        name="second"
                        v-if="orgInfo.nodeType !== 1"
                    >
                        <el-table
                            :data="memberList"
                            style="width: 100%;"
                            class="eltab"
                            border
                            stripe
                        >
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
                                        <span style="padding-left: 8px;"
                                            >暂无数据</span
                                        >
                                    </p>
                                </div>
                            </template>
                            <el-table-column
                                type="index"
                                label="序号"
                                align="center"
                                width="50"
                            ></el-table-column>
                            <el-table-column
                                prop="name"
                                label="机构人员"
                                width="180px"
                            >
                                <template slot-scope="scope">
                                    <span
                                        class="el-icon-user personColor"
                                    ></span>
                                    <span v-if="!scope.row.nodeType">{{
                                        visableData.userName == 0
                                            ? hideName(scope.row.name)
                                            : scope.row.name
                                    }}</span>
                                    <span style="margin-left: 5px;" v-else>{{
                                        scope.row.name
                                    }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="类型"
                                align="center"
                                width="120px"
                            >
                                <template>
                                    <span>个人</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="phone"
                                label="手机号码"
                                align="center"
                            >
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.phone ||
                                        scope.row.mobile ||
                                        "无"
                                    }}</span>
                                    <el-button
                                        type="text"
                                        v-if="
                                            scope.row.mobile &&
                                            scope.row.mobile != '' &&
                                            !scope.row.isLooked
                                        "
                                        class="findMobileBtn"
                                        :disabled="visableData.userMobile == 0"
                                        @click="
                                            findMobileById(
                                                scope.row.uid,
                                                scope.$index,
                                                1
                                            )
                                        "
                                        >查看</el-button
                                    >
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="officePhone"
                                label="座机号码"
                                align="center"
                                width="160px"
                            >
                                <template slot-scope="scope">
                                    <span>{{
                                        scope.row.uid === activeId
                                            ? scope.row.officePhone
                                            : hideMobile(
                                                  scope.row.officePhone
                                              ) || "无"
                                    }}</span>

                                    <el-button
                                        type="text"
                                        v-if="
                                            scope.row.officePhone &&
                                            scope.row.officePhone != '' &&
                                            scope.row.officePhone != '无' &&
                                            scope.row.uid !== activeId
                                        "
                                        class="findMobileBtn"
                                        @click="
                                            findMobileById(
                                                scope.row.uid,
                                                scope.$index,
                                                2
                                            )
                                        "
                                        >查看</el-button
                                    >
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--分页-->
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="memberPage.page"
                            :page-sizes="[10, 30, 50, 100]"
                            :page-size="memberPage.limit"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="memberPage.total"
                        ></el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div
            class="no-right"
            v-if="visableData.allOrgInfo == 0"
            style="text-align: center;"
        >
            <img class="no-content-img" :src="imgSrc" alt width="180px" />
            <div style="font-size: 20px; color: #999;">
                该单位通讯录信息对外不可见！
            </div>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
import noDataImg from "@src/common/images/no-data1.png";
import handPhoneName from "@src/mixins/phone-name.js";

export default {
    props: [
        "departmentList",
        "memberList",
        "orgInfo",
        "activeColor",
        "visableData",
        "memberPage",
    ],
    mixins: [handPhoneName],
    data() {
        //  allOrgInfo
        //     userName
        //     userMobile
        //     userPhone
        //     userDetail
        //     depPhone
        return {
            mobileActiveId: 0,
            activeId: 0,
            status: 0,
            isShow: true,
            tableData: [],
            personnel: {},
            userId: "",
            infoVisiable: false,
            deptMemberList: [],
            imgSrc: noDataImg,
            activeName: "first",
        };
    },
    computed: {
        ...mapState(["app"]),
        nodePrefix() {
            let prefix = "";
            if (this.orgInfo.nodeType === 2) {
                prefix = "单位";
            } else if (this.orgInfo.nodeType === 3) {
                prefix = "内设机构";
            }
            return prefix;
        },
    },
    mounted() {},
    methods: {
        childClick(node) {
            this.$emit("handle-child-click", node);
        },

        // 查看电话
        findNodePhone(nodeType, bindId, state, index) {
            api[urlNames["getOrgMobile"]]({
                nodeType,
                bindId,
            }).then((res) => {
                if (res && state === 1) {
                    this.orgInfo.phone = res.data.phone;
                    this.orgInfo.isLooked = true;
                }
                if (res && state === 2) {
                    this.departmentList[index].phone = res.data.phone;
                    this.departmentList[index].isLooked = true;
                }
            });
        },
        // state =1 手机号  =2座机号
        findMobileById(uid, index, state) {
            if (state === 2) {
                this.activeId = uid;
            }
            api[urlNames["findMobileById"]]({ uid, type: state }).then(
                (res) => {
                    let number = "";
                    if (res && state === 1) {
                        number = res.data.mobile;
                    } else if (res && state === 2) {
                        number = res.data.officePhone;
                    }
                    this.$emit("changeOfficeState", index, state, number);
                }
            );
        },
        hideMobile(phone) {
            if (phone === "" || !phone || phone === undefined) {
                return "无";
            } else {
                return (phone + "").replace(
                    /^(.{3})(?:\d+)(.{4})$/,
                    "$1****$2"
                );
            }
        },
        handleSizeChange(val) {
            this.$emit("handleSizeChange", val);
        },
        handleCurrentChange(val) {
            this.$emit("handleCurrentChange", val);
        },
    },
    watch: {
        orgInfo() {
            this.activeName = "first";
        },
    },
};
</script>
<style lang="less" scoped>
@import "index";
.empty {
    p {
        margin: 0;
        font-size: 0px;
        text-align: center;
        line-height: 16px !important;
    }

    span {
        font-size: 12px;
    }
}

.data-pic {
    padding-top: 20px;
    width: 60px;
    height: auto;
}
</style>
