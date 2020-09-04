<template>
    <el-container class="adress-list">
        <el-row class="address-row">
            <el-col :span="6" style="height: 100%;">
                <div class="site-scroll">
                    <!-- <div class="organ-top">
            <div class="top-one" :class="activeColor==1?'top-active':''" @click="switchAddressView(1)">本单位通讯录</div>
            <div
              class="top-two"
              title="查阅全省各单位的通讯录信息"
              :class="activeColor==2?'top-active':''"
              @click="switchAddressView(2)"
            >全省通讯录</div>
          </div>-->
                    <search-result
                        @searchMyBack="searchMyBack"
                        @searchOtherBack="searchOtherBack"
                        @searchListResult="searchListResult"
                        @searchPeopleInfo="searchPeopleInfo"
                        :myOrgFlag="activeColor"
                        :defaultNodeId="defaultNodeId"
                    ></search-result>
                    <div class="tree-content">
                        <address-list-tree
                            :tree-list="treeList"
                            @handle-node-click="handleNodeClickTree"
                        ></address-list-tree>
                    </div>
                </div>
            </el-col>
            <el-col :span="18" class="address-container">
                <el-breadcrumb separator="/" style="padding: 20px;">
                    <el-breadcrumb-item>{{
                        navigation1.name
                    }}</el-breadcrumb-item>

                    <template v-if="showBreadCrumb">
                        <el-breadcrumb-item
                            v-for="(item, index) in navigation"
                            :key="index"
                        >
                            <a
                                v-if="navigation.length - 1 !== index"
                                @click.prevent="
                                    goCurrentNodeDetail(item, index)
                                "
                                >{{ item.name }}</a
                            >
                            <span
                                v-if="navigation.length - 1 === index"
                                href
                                disabled
                                >{{ item.name }}</span
                            >
                        </el-breadcrumb-item>
                    </template>
                    <el-breadcrumb-item v-if="!showBreadCrumb"
                        >{{
                            selectType === "0"
                                ? "个人"
                                : selectType === "2"
                                ? "单位"
                                : "部门"
                        }}通讯录</el-breadcrumb-item
                    >
                </el-breadcrumb>
                <transition
                    name="fade-transform"
                    mode="out-in"
                    style="height: 100%;"
                >
                    <div style="padding: 0 20px; height: 100%;">
                        <department
                            :activeColor="activeColor"
                            :orgInfo="orgInfo"
                            :departmentList="departmentList"
                            :treeList="treeList"
                            :msg="msg"
                            :visableData="visableData"
                            v-if="showDep"
                            @handle-child-click="handleChildClick"
                            @changeOfficeState="changeOfficeState"
                        ></department>
                        <member
                            :table-data="memberList"
                            :activeColor="activeColor"
                            :orgInfo="orgInfo"
                            :msg="msg"
                            :visableData="visableData"
                            v-if="selectType != '0' && !showDep"
                        ></member>
                        <person-info
                            :personInfoList="personInfoList"
                            :activeColor="activeColor"
                            v-if="selectType == '0' && !showBreadCrumb"
                        ></person-info>
                    </div>
                </transition>
            </el-col>
        </el-row>
    </el-container>
</template>

<script>
import { api, urlNames } from "@src/api";
import searchResult from "./components/Choose/index";
import personInfo from "./components/PersonInfo/index";
import department from "./department/index";
import member from "./member/index";
import addressListTree from "./components/Tree/index";
import { mapState } from "vuex";
export default {
    components: {
        searchResult,
        department,
        member,
        addressListTree,
        personInfo,
    },
    data() {
        return {
            isShow: 1,
            activeColor: 1,
            msg: "暂无数据！",
            defaultNodeId: "",
            navigation: [],
            navigation1: [],
            departmentList: [],
            memberList: [],
            treeList: [],
            orgInfo: {},
            hasChildren: true,
            name: "",
            personInfoList: {},
            showDep: true,
            showBreadCrumb: true,
            selectType: "",
            addressBookSet: [],
            visableData: {
                allOrgInfo: 1,
                userName: 1,
                userMobile: 1,
                userPhone: 1,
                userDetail: 1,
                depPhone: 1,
            },
        };
    },
    created() {
        if (this.$route.meta.key === "menuAddrBookDept") {
            this.switchAddressView(1);
        } else if (this.$route.meta.key === "menuAddrBookAll") {
            this.switchAddressView(2);
        }
    },
    watch: {
        $route(to, from) {
            if (to.meta.key === "menuAddrBookDept") {
                this.switchAddressView(1);
            } else if (to.meta.key === "menuAddrBookAll") {
                this.switchAddressView(2);
            }
        },
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        /**
         * 切换通讯录
         */
        switchAddressView(e) {
            this.activeColor = e;
            this.isShow = e;
            this.showDep = true;
            this.navigation = [];
            this.showBreadCrumb = true;
            if (e === 1) {
                // alert(this.app.option.user.orgId)
                this.navigation1.name = "本单位通讯录";
                this.getAddressListUnitTree();
                // this.getAddressListOrganizationMembers()
                // this.getAddressListdepartment()
                // this.getAddressListUnitUser()
            } else if (e === 2) {
                this.navigation1.name = "全省通讯录";
                this.getAddressListOthertTree();
                // this.getAddressListOrganizationMembers()
                // this.getAddressListOtherUser()
            }
        },

        /** 通讯录视图 */
        getAddressListUnitTree() {
            //
            api[urlNames["getAddressListTree"]]({
                orgId: this.app.option.user.orgId,
            }).then((res) => {
                this.treeList = res.data;
                this.handleNodeClickTree(this.treeList[0]);
            });
        },
        getAddressListOthertTree() {
            api[urlNames["getAddressListTree"]]({}).then((res) => {
                this.treeList = res.data;
                this.handleNodeClickTree(this.treeList[0]);
            });
        },
        // 搜索返回数据点击
        searchListResult(data, type) {
            this.orgInfo = data;
            this.selectType = type;
            this.showDep = false;
            this.showBreadCrumb = false;
            this.treeList = this.departmentList = [];
            if (data.nodeType === 2) {
                this.getAddressListOrganizationMembers(data.bindId);
            } else if (data.nodeType === 3) {
                this.getAddressListDepartmentMembers(data.bindId);
            }
        },

        // 点击全省通讯录搜索人员
        searchPeopleInfo(data, type) {
            this.personInfoList = data;
            this.selectType = type;
            this.showBreadCrumb = false;
            this.showDep = false;
        },
        // 我的搜索返回
        searchMyBack() {
            this.showDep = true;
            this.showBreadCrumb = true;
            this.getAddressListUnitTree();
            this.getAddressListOrganizationMembers();
            this.getAddressListdepartment();
        },
        // 其他单位
        searchOtherBack() {
            this.showDep = true;
            this.showBreadCrumb = true;
            this.getAddressListOthertTree();
            this.getAddressListOrganizationMembers();
            //  this.handleChildClick()
        },
        /** 点击树节点显示内容 */
        handleNodeClickTree(node) {
            this.orgInfo = node;
            this.showDep = true;
            this.navigation = [];
            this.navigation.push(node);
            if (node.nodeType === 1) {
                this.visableData = {
                    allOrgInfo: 1,
                    userName: 1,
                    userMobile: 1,
                    userPhone: 1,
                    userDetail: 1,
                    depPhone: 1,
                };
            }
            if (node.nodeType === 3) {
                this.selectType = "";
                this.showDep = false;
                let nodeParams = {
                    level: 2,
                    memberId: node.orgId,
                };
                this.handtxlOptions(nodeParams);
                this.getAddressListDepartmentMembers(node.bindId);
            } else if (node.nodeType === 2) {
                this.selectType = "";
                let params = {
                    level: 2,
                    memberId: node.bindId,
                };
                this.handNodeOptions(params);
                this.getAddressListOrganizationMembers(node.bindId);
            }
            this.getAddressListdepartment(node.id);
        },

        // 处理部门 节点类型为3
        handtxlOptions(data) {
            // txlOptions
            api[urlNames["txlOptions"]](data).then((res) => {
                if (res.data.length > 0) {
                    this.addressBookSet = res.data.filter(function (val) {
                        return val.name === "orgAddressBookSet";
                    });
                    this.visableData = this.addressBookSet[0].value;
                }
                if (data.memberId === this.app.option.user.orgId) {
                    this.visableData = {
                        allOrgInfo: 1,
                        userName: 1,
                        userMobile: 1,
                        userPhone: 1,
                        userDetail: 1,
                        depPhone: 1,
                    };
                }
            });
        },

        // 处理单位节点类型为2
        handNodeOptions(params) {
            api[urlNames["txlOptions"]](params).then((res) => {
                if (res.data.length > 0) {
                    this.addressBookSet = res.data.filter(function (val) {
                        return val.name === "orgAddressBookSet";
                    });
                    this.visableData = this.addressBookSet[0].value;
                } else {
                    this.visableData = {
                        allOrgInfo: 1,
                        userName: 1,
                        userMobile: 1,
                        userPhone: 1,
                        userDetail: 1,
                        depPhone: 1,
                    };
                }
                if (params.memberId === this.app.option.user.orgId) {
                    this.visableData = {
                        allOrgInfo: 1,
                        userName: 1,
                        userMobile: 1,
                        userPhone: 1,
                        userDetail: 1,
                        depPhone: 1,
                    };
                }
            });
        },
        changeOfficeState(index, state, val) {
            if (state === 1) {
                this.departmentList[index].mobile = val;
                this.departmentList[index].isLooked = true;
            } else if (state === 2) {
                this.departmentList[index].officePhone = val;
                // this.departmentList[index].isOfficePhone = true
            }
        },

        handleChildClick(node) {
            this.orgInfo = node;
            this.selectType = "";
            this.showDep = true;
            this.navigation.push(node);
            if (node.nodeType === 1) {
                this.visableData = {
                    allOrgInfo: 1,
                    userName: 1,
                    userMobile: 1,
                    userPhone: 1,
                    userDetail: 1,
                    depPhone: 1,
                };
            }
            if (node.nodeType === 3) {
                this.showDep = false;
                let nodeParams = {
                    level: 2,
                    memberId: node.orgId,
                };
                this.handtxlOptions(nodeParams);
                this.getAddressListDepartmentMembers(node.bindId);
            } else if (node.nodeType === 2) {
                let params = {
                    level: 2,
                    memberId: node.bindId,
                };
                this.handNodeOptions(params);
                this.getAddressListOrganizationMembers(node.bindId);
            }
            this.getAddressListdepartment(node.id);
        },

        /** 单位下内设机构 */
        getAddressListdepartment(id) {
            api[urlNames["getAddressListTree"]]({
                parentId: id,
            }).then((res) => {
                this.departmentList = res.data;
                //
            });
        },

        /** 单位下人员 getAddressListOrganizationMembers */
        getAddressListOrganizationMembers(id) {
            let that = this;
            if (!id) {
                id = this.app.option.user.orgId;
            }
            api[urlNames["getAddressListOrganizationMembers"]]({
                orgId: id,
            }).then((res) => {
                let ary = res.data;
                this.memberList = res.data;
                ary.forEach((item) => {
                    that.departmentList.push(item);
                });
                // this.departmentList = [...this.departmentList, ...ary]
            });
        },

        /** 内设机构下人员getAddressListDepartmentMembers */
        getAddressListDepartmentMembers(id) {
            api[urlNames["getAddressListDepartmentMembers"]]({
                deptId: id,
            }).then((res) => {
                this.memberList = res.data;
                //
            });
        },

        /** 点击回到当前 */
        goCurrentNodeDetail(node, index) {
            this.showDep = true;
            this.orgInfo = node;
            let len = this.navigation.length;
            this.navigation.splice(index + 1, len - index + 1);
            this.getAddressListdepartment(node.id);
            this.getAddressListOrganizationMembers(node.id);
            this.getAddressListDepartmentMembers(node.id);
        },

        /** 人员搜索 */
        getAddressListUnitUser() {
            api[urlNames["getAddressListUserByName"]]({
                orgId: this.app.option.user.orgId,
                name: this.name,
            }).then((res) => {});
        },
        getAddressListOtherUser() {
            api[urlNames["getAddressListUserByName"]]({
                name: this.name,
            }).then((res) => {});
        },
    },
};
</script>

<style lang="less" scoped>
@import "index";
</style>
