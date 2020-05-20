<template>
    <div class="article-list">
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
                        <div class="notice-info">
                            <span
                                class="word_title"
                                title="点击查看文章详情"
                                @click="findWordDetial(scope.row.id)"
                                >{{ scope.row.typeText }}</span
                            >
                            <div
                                class="notice-msg"
                                @click="findWordDetial(scope.row.id)"
                            >
                                <span>{{ scope.row.content }}</span>
                            </div>
                            <span
                                class="btn"
                                title="下载文档"
                                v-if="activeName == 'actionWord'"
                                @click="downloadWord"
                            >
                                <i class="el-icon-download"></i>
                            </span>
                            <span
                                class="btn"
                                title="删除文档"
                                v-else
                                @click="deleteWord"
                            >
                                <i class="el-icon-delete"></i>
                            </span>
                        </div>
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
import { mapState, mapMutations } from "vuex";
export default {
    name: "WordCenter",
    props: ["activeName"],
    mixins: [handleTable],
    data() {
        return {
            tableData: [
                {
                    id: 1,
                    typeText: "为推进改造，系统登录密码深度优化通知。",
                    content:
                        '【贵州省电子政务外网组织机构人员数据库及管控平台】贵州省人民政府办公厅门户系统运维人员于{操作时间}修改了单位电话"jcode"修改为"sprufu已通过审核，请前往平台查看。',
                    hasRead: 0,
                    creareTime: "2020-03-12",
                },
                {
                    id: 1,
                    typeText: "为推进改造，系统登录密码深度优化通知。",
                    content:
                        "【贵州省电子政务外网组织机构人员数据库及管控平台】贵州省人民政府办公厅门户系统运维人员于{操作时，请前往平台查看。",
                    hasRead: 0,
                    creareTime: "2020-03-12",
                },
            ],
        };
    },
    created() {
        this.page.total = 2;
    },
    methods: {
        // 查看文章详情
        findWordDetial(id) {
            this.$router.push(`/word-center/word-detial/${id}`);
        },
        // 下载文档
        downloadWord() {},
        // 删除文档
        deleteWord() {
            this.$confirm("确定要删除该文档吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {})
                .catch(() => {});
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
