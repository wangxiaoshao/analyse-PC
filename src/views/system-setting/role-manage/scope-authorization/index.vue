<template>
    <div class="scope-authorization">
        <div class="operate-btn">
            <span
                >该成员的权限可以在以下范围内行使，若需修改授权范围点击右侧的编辑按钮</span
            >
            <div style="float: right;">
                <el-button
                    @click="addCityState"
                    type="primary"
                    v-show="$route.params.roleName === 'CITY_MANAGER'"
                    >授权市州</el-button
                >
                <el-button
                    @click="addArea"
                    type="primary"
                    v-show="$route.params.roleName === 'COUNTY_MANAGER'"
                    >授权区县</el-button
                >
                <el-button
                    @click="addDep"
                    type="primary"
                    v-show="$route.params.roleName === 'UNIT_MANAGER'"
                    >授权单位</el-button
                >
            </div>
        </div>
        <div class="table">
            <table>
                <tr v-if="$route.params.roleName === 'CITY_MANAGER'">
                    <td>市州</td>
                    <td>
                        <el-tag
                            v-for="item in cityStateOrUnitList"
                            :key="item.areaCode"
                            closable
                            size="medium"
                            type="success"
                            @close="deleteAuthorizedEntity(item)"
                        >
                            {{ item.areaName }}
                        </el-tag>
                    </td>
                </tr>
                <tr v-if="$route.params.roleName === 'COUNTY_MANAGER'">
                    <td>区县</td>
                    <td>
                        <el-tag
                            v-for="item in cityStateOrUnitList"
                            :key="item.areaCode"
                            closable
                            size="medium"
                            type="success"
                            @close="deleteAuthorizedEntity(item)"
                        >
                            {{ item.areaName }}
                        </el-tag>
                    </td>
                </tr>
                <tr v-if="$route.params.roleName === 'UNIT_MANAGER'">
                    <td>单位</td>
                    <td>
                        <el-tag
                            v-for="org in orgNameList"
                            :key="org.orgId"
                            closable
                            size="medium"
                            type="success"
                            @close="deleteAuthorizedEntity(org)"
                        >
                            {{ org.orgName }}
                        </el-tag>
                    </td>
                </tr>
            </table>
        </div>
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeSelectDailog"
        ></select-tree>
    </div>
</template>

<script>
import handleTable from "@src/mixins/handle-table";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import SelectTree from "@src/components/SelectTree/index";
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
export default {
    mixins: [handleTable, handleBreadcrumb],
    name: "ScopeAuthorization",
    components: {
        SelectTree,
    },
    data() {
        return {
            selectTreeDailog: {
                title: "选择授权区县",
                openSelectTreeVisiable: false,
                isSelectType: 2, // 1 区县  2  单位  3 人员 4市州
                isSingSelect: true, // 是否单选,true 单选，false:多选
            },
            orgNameList: [],
            cityStateOrUnitList: [],
            roleId: parseInt(this.$route.params.roleId),
            authorizedType: null, // 授权类型: 1[全省]，2[市州],3[区县]，4[单位]
        };
    },
    computed: {
        ...mapState(["app"]),
    },
    created() {},
    mounted() {
        this.pushBreadcrumb({
            name: "授权范围",
            parent: {
                path: "/role-manage/look-person-permission",
                query: { id: this.$route.params.roleId },
            },
        });
        this.init();
    },
    methods: {
        init() {
            if (
                this.$route.params.roleName === "CITY_MANAGER" ||
                this.$route.params.roleName === "COUNTY_MANAGER"
            ) {
                this.getAuthorizedArea();
            } else {
                this.getAuthorizedOrg();
            }
            this.authorizedType =
                this.$route.params.roleName === "CITY_MANAGER"
                    ? 2
                    : this.$route.params.roleName === "COUNTY_MANAGER"
                    ? 3
                    : this.$route.params.roleName === "UNIT_MANAGER"
                    ? 4
                    : "";
        },
        addCityState() {
            this.selectTreeDailog.isSelectType = 4;
            this.selectTreeDailog.title = "选择授权市州";
            this.selectTreeDailog.openSelectTreeVisiable = true;
            this.selectTreeDailog.isSingSelect = false;
        },
        addArea() {
            this.selectTreeDailog.isSelectType = 1;
            this.selectTreeDailog.title = "选择授权区县";
            this.selectTreeDailog.openSelectTreeVisiable = true;
            this.selectTreeDailog.isSingSelect = false;
        },
        addDep() {
            this.selectTreeDailog.isSelectType = 2;
            this.selectTreeDailog.title = "选择授权单位";
            this.selectTreeDailog.openSelectTreeVisiable = true;
            this.selectTreeDailog.isSingSelect = false;
        },
        closeSelectDailog() {
            this.selectTreeDailog.openSelectTreeVisiable = false;
        },
        dialogReturnData(userData, authData) {
            authData = authData || [];
            console.log(this.$store.state.app.rolesInfo);
            let dataAry = [...userData, ...authData];
            let authorizedOid = [];
            dataAry.forEach((item) => {
                authorizedOid.push(item.treeId);
            });
            let uid = [];
            uid.push(this.$route.params.uid);
            let data = {
                roleId: this.$route.params.roleId,
                authorizedType: this.authorizedType,
                uid,
                authorizedOid,
            };
            this.addUserAuth(data);
        },
        addUserAuth(data) {
            api[urlNames["addUsersAuthScope"]](data).then(
                (res) => {
                    this.$message.success(`授权成功`);
                    this.init();
                },
                () => {
                    this.$message.error(`操作失败，请稍后重试`);
                }
            );
        },
        // 获取授权市州 区域
        getAuthorizedArea() {
            api[urlNames["getAuthAreaByUid"]]({
                uid: this.$route.params.uid,
                roleId: this.$route.params.roleId,
            }).then((res) => {
                if (res.data.length > 0) {
                    this.cityStateOrUnitList = res.data;
                }
            });
        },
        // 获取授权单位
        getAuthorizedOrg() {
            api[urlNames["getAuthOrgByUid"]]({
                uid: this.$route.params.uid,
                roleId: this.$route.params.roleId,
            }).then((res) => {
                if (res.data.length > 0) {
                    this.orgNameList = res.data;
                }
            });
        },
        deleteAuthorizedEntity(row) {
            // authorizedType 2市州 3区县 4 单位
            let str =
                this.authorizedType === 2
                    ? "市州"
                    : this.authorizedType === 3
                    ? "区县"
                    : "单位";
            let text = "确定要删除该" + str + "吗？";
            let data = {
                roleId: this.$route.params.roleId,
                uid: this.$route.params.uid,
                entityId: row.areaCode || row.orgId,
                entityType: this.authorizedType,
            };
            this.handleRow(text, data, this.confirmDeleteEntity);
        },
        confirmDeleteEntity(data) {
            api[urlNames["deleteUserScope"]](data).then((res) => {
                this.$message.success(`删除成功`);
                this.init();
            });
        },
    },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
