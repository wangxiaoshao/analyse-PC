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
        <select-org
            :openSelectOrg="openSelectOrg"
            @dialogReturnOrg="dialogReturnOrg"
            @closeSelectOrg="closeSelectOrg"
        ></select-org>
        <select-area
            :openSelectArea="openSelectArea"
            @dialogReturnArea="dialogReturnArea"
            @closeSelectArea="closeSelectArea"
        ></select-area>
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
import SelectOrg from "@src/components/SelectOrg1/index";
import SelectArea from "@src/components/SelectArea2/index";
import SelectCityState from "@src/components/SelectCityState/index";
import hasRight from "@src/mixins/has-right";
import { api, urlNames } from "@src/api";
import { mapState, mapMutations } from "vuex";
export default {
    mixins: [handleTable, handleBreadcrumb, hasRight],
    name: "ScopeAuthorization",
    data() {
        return {
            openSelectOrg: false,
            openSelectArea: false,
            openSelectCityState: false,
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
        SelectOrg,
        SelectArea,
        SelectCityState,
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
            this.openSelectArea = true;
        },
        addDep() {
            this.openSelectOrg = true;
        },
        closeSelectOrg() {
            this.openSelectOrg = false;
        },
        closeSelectArea() {
            this.openSelectArea = false;
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
        dialogReturnOrg(data) {
            let parmas = {
                uid: this.$route.params.id,
                authorizedType: 1,
                userAuthorizedEntityList: data,
                roleId: this.$route.query.roleId,
            };
            console.log(parmas);
            // api[urlNames["insertAuthorizedEntity"]](parmas).then((res) => {
            //     this.$message.success(`授权成功`);
            //     this.getfindAuthorizedEntity();
            // });
        },
        dialogReturnArea(data) {
            let parmas = {
                uid: this.$route.params.id,
                authorizedType: 3,
                userAuthorizedEntityList: data,
                roleId: this.$route.query.roleId,
            };
            console.log(parmas);
            this.closeSelectArea();
            // api[urlNames["insertAuthorizedEntity"]](parmas).then((res) => {
            //     this.$message.success(`授权成功`);
            //     this.getfindAuthorizedEntity();
            // });
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
