<template>
    <div class="scope-authorization">
        <div class="operate-btn">
            <span
                >该成员的权限可以在以下范围内行使，若需修改授权范围点击右侧的编辑按钮</span
            >
            <div style="float: right;">
                <el-button @click="addCityState" type="primary"
                    >授权市州</el-button
                >
                <el-button @click="addArea" type="primary">授权区县</el-button>
                <el-button @click="addDep" type="primary">授权单位</el-button>
            </div>
        </div>
        <div class="table">
            <table>
                <tr v-if="hasAddArea">
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
                <tr v-if="hasAddOrg">
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
                <tr>
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
        <select-city-state
            :SelectCityStateDailog="SelectCityStateDailog"
            @dialogReturnCityState="dialogReturnCityState"
            @closeSelectCityState="closeSelectCityState"
        ></select-city-state>
    </div>
</template>

<script>
import handleTable from "@src/mixins/handle-table";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import SelectCityState from "@src/components/SelectCityState/index";
import SelectTree from "@src/components/SelectTree/index";
import hasRight from "@src/mixins/has-right";
import { api, urlNames } from "@src/api";
import { mapState, mapMutations } from "vuex";
export default {
    mixins: [handleTable, handleBreadcrumb, hasRight],
    name: "ScopeAuthorization",
    data() {
        return {
            openSelectCityState: false,
            selectTreeDailog: {
                title: "选择授权区县",
                openSelectTreeVisiable: false,
                isSelectType: 2, // 1 区县  2  单位  3 人员
                isSingSelect: true, // 是否单选,true 单选，false:多选
            },
            orgNameList: [],
            areaNameList: [],
            cityStateList: [],
            hasAddArea: true,
            hasAddOrg: true,
            hasAddCityState: true,
            SelectCityStateDailog: {
                selectCityStateVisiable: false,
                isSingleSelect: false, // 是否单选 true单选，false多选
            },
            roleId: parseInt(this.$route.query.roleId),
        };
    },
    components: {
        SelectCityState,
        SelectTree,
    },
    computed: {
        ...mapState(["app"]),
    },
    created() {
        // this.checkAuthorization();
    },
    mounted() {
        this.pushBreadcrumb({
            name: "授权范围",
            parent: {
                path: "/role-manage/look-person-permission",
                query: { id: this.$route.query.roleId },
            },
        });
        // this.getfindAuthorizedEntity();
    },
    methods: {
        ...mapMutations(["SET_OPTION"]),
        checkAuthorization() {
            let that = this;

            api[urlNames["checkAuthorization"]]({
                roleId: this.$route.query.roleId,
            }).then((res) => {
                that.hasAddArea = !!res.data.hasAddArea;
                that.hasAddOrg = !!res.data.hasAddOrg;
            });
        },
        addCityState() {
            this.SelectCityStateDailog.selectCityStateVisiable = true;
        },
        addArea() {
            this.selectTreeDailog.isSelectType = 1;
            this.selectTreeDailog.title = "选择授权区县";
            this.selectTreeDailog.openSelectTreeVisiable = true;
            this.selectTreeDailog.isSingSelect = true;
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
        dialogReturnData(data) {
            this.closeSelectDailog();
        },
        closeSelectCityState() {
            this.SelectCityStateDailog.selectCityStateVisiable = false;
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
        dialogReturnCityState(data) {
            console.log(data);
            this.closeSelectCityState();
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
