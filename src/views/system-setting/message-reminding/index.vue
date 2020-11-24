<template>
    <div class="message-reminding">
        <el-form inline>
            <!-- <el-form-item>
               </el-form-item
            > -->
            <el-form-item>
                <el-input
                    placeholder="请输入搜索关键词"
                    v-model="keyWord"
                    clearable
                    prefix-icon="el-icon-search"
                >
                    <el-button
                        slot="append"
                        size="small"
                        type="primary"
                        @click="getGrid(true)"
                        >查询</el-button
                    >
                </el-input>
            </el-form-item>
        </el-form>
        <div class="table-box">
            <el-table :data="messageList" stripe border style="width: 100%;">
                <template slot="empty">
                    <div class="empty">
                        <p>
                            <img
                                class="data-pic"
                                src="@src/common/images/no-data1.png"
                                alt=""
                            />
                        </p>
                        <p><span style="padding-left: 8px;">暂无数据</span></p>
                    </div>
                </template>
                <el-table-column
                    prop="orgName"
                    label="单位名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="createUserName"
                    label="创建人"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.createTime">
                            {{
                                scope.row.createTime
                                    | dataFilter("YYYY-MM-DD HH:mm:ss")
                            }}
                        </span>
                        <span v-else class="color_gray">—— ——</span>
                    </template></el-table-column
                >
                <el-table-column
                    prop="noticePeriod"
                    label="提醒规则"
                    align="center"
                    min-width="130"
                >
                    <template slot-scope="scope">
                        <span v-if="scope.row.noticePeriod">{{
                            scope.row.noticePeriod
                        }}</span>
                        <span v-else class="color_gray">—— ——</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150px">
                    <template slot-scope="scope">
                        <span v-if="scope.row.created">
                            <el-button
                                size="mini"
                                type="text"
                                @click="openEditRules(scope.row)"
                                >编辑</el-button
                            >
                            <el-button
                                size="mini"
                                type="text"
                                @click="confirmDeleteRules(scope.row.id)"
                                >删除</el-button
                            >
                        </span>

                        <el-button
                            v-else
                            size="mini"
                            type="text"
                            @click="openCreateRules(scope.row)"
                            >去创建</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="page.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import handleTable from "@src/mixins/handle-table";
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
export default {
    mixins: [handleTable],
    data() {
        return {
            hasRight: false,
            keyWord: "",
            messageList: [{ id: "1" }],
        };
    },

    mounted() {
        console.log(this.app.rolesInfo.roleId);
        this.getGrid();
    },
    methods: {
        getGrid(flag) {
            if (flag) {
                this.page.current = 1;
            }
            let data = {
                roleId: this.$store.state.app.rolesInfo.roleId,
                page: this.page.current,
                pageSize: this.page.limit,
                keyword: this.keyWord,
            };
            api[urlNames["getNoticeList"]](data).then((res) => {
                this.messageList = res.data;
                this.page.total = res.total;
            });
        },
        openCreateRules(row) {
            this.$router.push({
                path: "/message-reminding/message-rules",
                query: { orgId: row.orgId, treeName: row.orgName },
            });
        },
        openEditRules(row) {
            this.$router.push({
                name: "MessageRules",
                query: { orgId: row.orgId, id: row.id, treeName: row.orgName },
            });
        },
        // 删除通知提醒列表
        confirmDeleteRules(id) {
            this.handleRow(
                "确定要删除该单位的设置规则吗？",
                id,
                this.deleteRules
            );
        },
        deleteRules(id) {
            api[urlNames["deleteOrgNotice"]]({ noticeId: id }).then(
                (res) => {
                    if (res) {
                        this.$message.success("操作成功");
                        this.getGrid();
                    }
                },
                () => {
                    this.$message.error("操作失败，请稍后再试");
                }
            );
        },
    },
    computed: {
        ...mapState(["app"]),
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
