<template>
    <div class="site-module mod-application-config">
        <!--表格-->
        <site-table
            :tableConfig="tableConfig"
            :tableHeight="tableHeight"
            :mergeConfig="mergeConfig"
            :operateWidth="operateWidth"
            :operate="operate"
            :tableData="tableData"
        >
            <template>
                <el-table-column label="申请原因" align="center">
                    <template>
                        <span>{{ reason || "无" }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="审核意见"
                    align="center"
                    v-if="!isShowSuggest"
                >
                    <template>
                        <span>{{ message }}</span>
                    </template>
                </el-table-column>
            </template>
        </site-table>

        <edit-dialog
            :visible="editDialogVisible"
            :config-type="type"
            :current="currentEdit"
            :dialogTitle="dialogTitle"
            :auditResult="auditResult"
            @refreshList="getGrid"
            @close="closeEditDialog"
        ></edit-dialog>
        <el-row style="margin-top: 40px;" :gutter="20" v-if="isShowSuggest">
            <el-col :span="12" class="text-right" style="text-align: left;">
                <el-button
                    type="info"
                    @click="jumpDetailPage($route.params.type)"
                    >查看原始数据详情</el-button
                >
            </el-col>
            <el-col :span="12">
                <div style="text-align: right;">
                    <el-button
                        type="primary"
                        plain
                        @click="openExamineDialog(1)"
                        >通过</el-button
                    >
                    <el-button
                        type="info"
                        plain
                        @click="openExamineDialog(0)"
                        style="margin-left: 10px;"
                        >不通过</el-button
                    >
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import handleTable from "@src/mixins/handle-table";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import SiteTable from "@src/components/SiteTable/index.vue";
import tableConfig from "./tableConfig";
import { api, urlNames } from "@src/api";
import EditDialog from "../EditDialog/index";
import { mapState, mapMutations } from "vuex";

export default {
    components: { EditDialog, SiteTable },
    mixins: [handleTable, handleBreadcrumb],
    data() {
        return {
            tableConfig,
            reason: "",
            message: "",
            tableData: [],
            currentEdit: null,
            editDialogVisible: false,
            dialogTitle: "审核意见",
            type: "content",
            loading: true,
            isShowSuggest: false,
            auditResult: false,
            tableHeight: null,
            entityId: null,
            mergeConfig: null,
            operateWidth: 100,
            tableCheckbox: true,
            operate: false,
        };
    },
    computed: {
        ...mapState(["application", "examine"]),
    },
    created() {
        if (this.$route.name === "WaitApprovalDetail") {
            this.isShowSuggest = true;
        }
    },
    mounted() {
        this.pushBreadcrumb({
            name: this.isShowSuggest ? "去审核" : "查看明细",
            parent: {
                name: this.examine.backPath,
                query: {
                    type: "back",
                },
            },
        });
        this.getGrid();
        //
    },
    methods: {
        ...mapMutations(["SET_APPLICATION_PAGE", "SET_EXAMINE_DETAIL"]),
        getGrid() {
            api[urlNames["getAuditDetailsById"]]({
                id: this.$route.params.id,
                // type: this.$route.params.type
            }).then(
                (res) => {
                    this.reason = res.data.reason;
                    this.message = res.data.message;
                    this.tableData = res.data.changeFields;
                    this.entityId = res.data.entityId;
                    this.mergeConfig = [
                        {
                            ele: "col",
                            eleIndex: 4,
                            rowspan: this.tableData.length,
                            colspan: 1,
                        },
                        {
                            ele: "col",
                            eleIndex: 3,
                            rowspan: this.tableData.length,
                            colspan: 1,
                        },
                    ];
                },
                () => {
                    this.gridData = [];
                }
            );
        },
        openExamineDialog(val) {
            this.auditResult = val;
            this.editDialogVisible = true;
        },
        trim(str) {
            return (str + "").replace(/(\s+)$/g, "").replace(/^\s+/g, "");
        },
        closeEditDialog() {
            this.editDialogVisible = false;
        },
        typeChange() {
            this.$nextTick(() => {
                this.getGrid();
            });
        },
        // TODO 需要按父导航进行跳转
        jumpDetailPage(type) {
            // type = 1 || 3内设机构 || 4单位
            let prePath = this.$route.meta.prePath;
            let path = "";
            switch (+type) {
                case 1:
                    path = prePath + "/PersonDetail";
                    break;
                case 3:
                    path = prePath + "/DepartmentDetail";
                    break;
                case 4:
                    path = prePath + "/UnitDetail";
                    break;
                default:
                    break;
            }
            this.$router.push({
                path: `/${path}/${this.entityId}`,
            });
        },
    },
};
</script>
<style lang="less">
@import "index";
</style>
