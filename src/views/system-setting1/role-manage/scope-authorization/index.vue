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
                            v-for="item in cityStateList"
                            :key="item.id"
                            closable
                            size="medium"
                            type="success"
                            @close="deleteAuthorizedEntity(area)"
                        >
                            {{ area.name }}
                        </el-tag>
                    </td>
                </tr>
                <tr v-if="$route.params.roleName === 'UNIT_MANAGER'">
                    <td>区县</td>
                    <td>
                        <el-tag
                            v-for="org in orgNameList"
                            :key="org.id"
                            closable
                            size="medium"
                            type="success"
                            @close="deleteAuthorizedEntity(org)"
                        >
                            {{ org.name }}
                        </el-tag>
                    </td>
                </tr>
                <tr v-if="$route.params.roleName === 'COUNTY_MANAGER'">
                    <td>单位</td>
                    <td>
                        <el-tag
                            v-for="org in orgNameList"
                            :key="org.id"
                            closable
                            size="medium"
                            type="success"
                            @close="deleteAuthorizedEntity(org)"
                        >
                            {{ org.name }}
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
// import SelectCityState from "@src/components/SelectCityState/index";
import SelectTree from "@src/components/SelectTree/index";
import hasRight from "@src/mixins/has-right";
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
export default {
    mixins: [handleTable, handleBreadcrumb, hasRight],
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
            areaNameList: [],
            cityStateList: [],
            roleId: parseInt(this.$route.params.roleId),
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
                authorizedType: this.$store.state.app.rolesInfo.authorizedType,
                uid,
                authorizedOid,
            };
            this.addUserAuth(data);
        },
        addUserAuth(data) {
            api[urlNames["addUserAuthScope"]](data).then(
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
                page: 1,
                pageSize: 10,
                uid: this.$route.params.uid,
                roleId: this.$route.params.roleId,
            }).then((res) => {
                if (res.data.length > 0) {
                }
            });
        },
        // 获取授权单位
        getAuthorizedOrg() {
            api[urlNames["getAuthOrgByUid"]]({
                uid: this.$route.params.id,
                roleId: this.$route.params.roleId,
            }).then((res) => {
                if (res.data.length > 0) {
                }
            });
        },
        getfindAuthorizedEntity() {
            this.orgNameList = [];
            this.areaNameList = [];
            api[urlNames["findAuthorizedEntityByUid"]]({
                uid: this.$route.params.id,
                roleId: this.$route.query.roleId,
            }).then((res) => {
                if (res.data.length > 0) {
                    let that = this;
                    res.data.forEach((val) => {
                        if (val.authorizedType === 1) {
                            that.orgNameList.push(val);
                        }
                        if (val.authorizedType === 3) {
                            that.areaNameList.push(val);
                        }
                    });
                }
            });
        },
        deleteAuthorizedEntity(entity) {
            api[urlNames["deleteAuthorizedEntity"]]({
                uid: entity.uid,
                roleId: entity.roleId,
                entityIds: [entity.authorizedOid],
            }).then((res) => {
                this.$message.success(`删除成功`);
                this.getfindAuthorizedEntity();
            });
        },
    },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
