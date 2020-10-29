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
                        <span>{{
                            scope.row.createTime
                                | dataFilter("YYYY-MM-DD HH:mm:ss")
                        }}</span>
                    </template></el-table-column
                >
                <el-table-column
                    prop="noticePeriod"
                    label="提醒规则"
                    align="center"
                    min-width="130"
                ></el-table-column>
                <el-table-column label="操作" align="center" width="150px">
                    <template slot-scope="scope">
                        <span v-if="created">
                            <el-button
                                size="mini"
                                type="text"
                                @click="openEditRules(scope.row.id)"
                                >编辑</el-button
                            >
                            <el-button
                                size="mini"
                                type="text"
                                @click="deleteRules(scope.row.id)"
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
import handleTable from "@src/mixins/new/handle-table";
import { api, urlNames } from "@src/api";
export default {
    mixins: [handleTable],
    data() {
        return {
            hasRight: false,
            keyWord: "",
            messageList: [{ id: "1" }],
        };
    },
    created() {
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
            };
            api[urlNames["getNoticeList"]](data).then((res) => {
                this.messageList = res.data;
            });
        },
        openCreateRules(id) {
            this.$router.push("/message-reminding/message-rules");
        },
        openEditRules(id) {
            this.$router.push({ name: "MessageRules", query: { id } });
        },
        // 删除通知提醒列表
        deleteRules(id) {},
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
