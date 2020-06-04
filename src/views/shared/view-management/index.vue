<template>
    <div class="view-management">
        <div class="create-btn">
            <el-button
                type="primary"
                @click="createView"
                :disabled="!hasRight('viewCreate')"
                >创建视图</el-button
            >
        </div>
        <div class="table">
            <el-table
                ref="singleTable"
                :data="viewList"
                border
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%;"
            >
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
                    property="name"
                    label="视图名称"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    property="createTime"
                    align="center"
                    label="创建时间"
                >
                </el-table-column>
                <el-table-column
                    property="viewAdmin"
                    align="center"
                    label="视图管理员"
                >
                </el-table-column>
                <el-table-column
                    label="启用状态"
                    prop="removed"
                    width="80"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span class="text-able" v-show="scope.row.removed === 0"
                            >启用</span
                        >
                        <span
                            class="text-disable"
                            v-show="scope.row.removed === 1"
                            >停用</span
                        >
                    </template>
                </el-table-column>
                <!--     暂时隐藏   <el-table-column-->
                <!--          property="remark"-->
                <!--          align="center"-->
                <!--          label="备注说明">-->
                <!--        </el-table-column>-->
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.$index, scope.row)"
                            :disabled="!hasRight('viewSetting')"
                            >编辑</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { api, urlNames } from "@src/api";
import HasRight from "@src/mixins/has-right";

export default {
    name: "ViewManagement",
    mixins: [HasRight],
    components: {},
    data() {
        return {
            total: 0, // 总页码
            viewList: [],
            currentPage: 1,
            pageSize: 10,
            currentRow: null,
        };
    },
    created() {
        this.getViewList(1, 10);
    },
    methods: {
        getViewList(page, limt) {
            api[urlNames["getViewList"]]({
                page: page,
                limit: limt,
            }).then((res) => {
                this.total = parseInt(res.total);
                this.viewList = res.data;
            });
        },
        // 跳转创建视图
        createView() {
            this.$router.push({ path: "/view-management/create-view/0" });
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        // 编辑
        handleEdit(index, row) {
            this.$router.push({
                path: `/view-management/create-view/${row.id}`,
            });
        },
        handleDelete(index, row) {},
        handleSizeChange(val) {
            this.pageSize = val;
            this.getViewList(this.currentPage, val);
        },
        handleCurrentPageChange(val) {
            this.currentPage = val;
            this.getViewList(val, this.pageSize);
        },
    },
};
</script>

<style scoped lang="less">
@import "index.less";
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
