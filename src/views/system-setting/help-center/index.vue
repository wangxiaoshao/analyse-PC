<template>
    <div class="help-center">
        <div class="table-box">
            <el-table :show-header="false" :data="tableData">
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
                <el-table-column>
                    <template slot-scope="scope">
                        <p style="padding: 8px 0;">
                            <span> {{ scope.row.fileName }}</span>
                            <span style="float: right;">
                                <el-button
                                    size="mini"
                                    type="text"
                                    @click="getView(scope.row.id)"
                                    >在线预览</el-button
                                >
                                <el-button
                                    size="mini"
                                    type="text"
                                    @click="downLoadWord(scope.row.filePath)"
                                    >下载</el-button
                                >
                            </span>
                        </p>
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
import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/new/handle-table";
import downloadBinaryFile from "@src/mixins/downloadBinaryFile";
export default {
    mixins: [handleTable, downloadBinaryFile],
    data() {
        return {
            tableData: [],
        };
    },
    mounted() {
        this.getGrid();
    },
    methods: {
        getGrid() {
            let data = {
                page: this.page.current,
                pageSize: this.page.limit,
            };
            api[urlNames["getHelpFileList"]](data).then(
                (res) => {
                    this.tableData = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.tableData = [];
                    this.page.total = 0;
                }
            );
        },
        getView(id) {
            api[urlNames["getHelperview"]]({ id }).then((res) => {
                if (res) {
                    window.open(res);
                }
            });
        },
        downLoadWord(filePath) {
            window.open(filePath);
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
