<template>
    <div class="scope-authorization">
        <div class="operate-btn">
            <span
                >该成员的权限可以在以下范围内行使，若需修改授权范围点击右侧的编辑按钮</span
            >
            <div style="float: right;">
                <el-button @click="addArea" type="primary" v-if="hasAddArea"
                    >授权区域</el-button
                >
                <el-button @click="addDep" type="primary" v-if="hasAddOrg"
                    >授权单位</el-button
                >
                <el-button @click="validSignature" type="primary"
                    >验证签名</el-button
                >
            </div>
        </div>
        <div class="table">
            <table>
                <tr v-if="hasAddArea">
                    <td>区域</td>
                    <td>
                        <el-tag
                            v-for="area in areaNameList"
                            :key="area.id"
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
                角色授权区域信息签名验证未通过，请及时联系运维人员处理。
            </p>
            <div slot="footer" class="dialog-footer">
                <el-button
                    type="info"
                    @click="validSignatureDialog = false"
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
import handleTable from "@src/mixins/handle-table";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import SelectOrg from "@src/components/SelectOrg/index";
import SelectArea from "@src/components/SelectArea/index";
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
            orgNameList: [],
            areaNameList: [],
            hasAddArea: false,
            hasAddOrg: false,

            // 验签提示对话框
            validSignatureDialog: false,
            loader: null,
        };
    },
    components: {
        SelectOrg,
        SelectArea,
    },
    computed: {
        ...mapState(["app"]),
    },
    created() {
        this.checkAuthorization();
    },
    mounted() {
        this.pushBreadcrumb({
            name: "查看成员及权限",
            parent: {
                path: `/role-manage/look-person-permission/${this.$route.query.roleId}`,
            },
        });
        this.getfindAuthorizedEntity();
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
            api[urlNames["insertAuthorizedEntity"]](parmas).then((res) => {
                this.$message.success(`授权成功`);
                this.getfindAuthorizedEntity();
            });
        },
        dialogReturnArea(data) {
            let parmas = {
                uid: this.$route.params.id,
                authorizedType: 3,
                userAuthorizedEntityList: data,
                roleId: this.$route.query.roleId,
            };
            api[urlNames["insertAuthorizedEntity"]](parmas).then((res) => {
                this.$message.success(`授权成功`);
                this.getfindAuthorizedEntity();
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
        validSignature() {
            this.loader = this.$loading({
                fullscreen: true,
                text: "用户信息签名校验中...",
            });

            api[urlNames["validSignature"]]({
                entityId: this.$route.query.roleId,
                // 用户信息
                entityType: 5,
            })
                .then((res) => {
                    this.loader.close();
                    this.$message({
                        message: "签名验证通过",
                        type: "success",
                    });
                })
                .catch(() => {
                    this.loader.close();
                    this.validSignatureDialog = true;
                });
        },
    },
};
</script>

<style scoped lang="less">
@import "./index";
</style>
