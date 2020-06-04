<template>
    <div class="article-list">
        <div class="table-box">
            <el-table :show-header="false" :data="docList">
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
                                >{{ scope.row.title }}</span
                            >
                            <div
                                class="notice-msg"
                                @click="findWordDetial(scope.row.id)"
                            >
                                <span>{{ scope.row.description }}</span>
                            </div>
                            <span
                                class="btn"
                                title="下载文档"
                                v-if="activeName == 'actionWord'"
                                @click="downloadWord(scope.row)"
                            >
                                <i class="el-icon-download"></i>
                            </span>
                            <span
                                class="btn"
                                title="删除文档"
                                v-else
                                @click="deleteWord(scope.row.id)"
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
        <div class="dialog-box">
            <el-dialog :visible.sync="unloadFileVisiable" width="420px">
                <div slot="title" style="padding: 20px;">
                    下载附件
                    <i class="el-icon-download" style="color: #58a4f3;"></i>
                </div>
                <div class="chooseWord" style="text-align: center;">
                    <el-checkbox-group v-model="checkAccessoryList">
                        <el-checkbox
                            v-for="(item, index) in accessoryList"
                            :label="index"
                            :key="item.id"
                            >{{ item.name + item.suffix }}</el-checkbox
                        >
                    </el-checkbox-group>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button
                        type="primary"
                        @click="unloadAheckAccessory"
                        width="120px"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/handle-table";
import { mapState } from "vuex";
export default {
    name: "WordCenter",
    props: ["activeName"],
    mixins: [handleTable],
    data() {
        return {
            unloadFileVisiable: false,
            accessoryList: [],
            checkAccessoryList: [],
            docList: [
                {
                    id: 1,
                    title: "为推进改造，系统登录密码深度优化通知。",
                    description:
                        '【贵州省电子政务外网组织机构人员数据库及管控平台】贵州省人民政府办公厅门户系统运维人员于{操作时间}修改了单位电话"jcode"修改为"sprufu已通过审核，请前往平台查看。',
                    hasRead: 0,
                    creareTime: "2020-03-12",
                },
                {
                    id: 2,
                    title: "为推进改造，系统登录密码深度优化通知。",
                    description:
                        "【贵州省电子政务外网组织机构人员数据库及管控平台】贵州省人民政府办公厅门户系统运维人员于{操作时，请前往平台查看。",
                    hasRead: 0,
                    creareTime: "2020-03-12",
                },
            ],
        };
    },
    created() {
        this.getGrid();
    },
    methods: {
        getGrid() {
            let data = {
                page: this.page.current,
                limit: this.page.limit,
            };
            api[urlNames["getDocList"]](data).then((res) => {
                if (res) {
                    this.docList = res.data;
                    this.page.total = res.total;
                }
            });
        },
        // 查看文章详情
        findWordDetial(id) {
            this.$router.push(`/word-center/word-detial/${id}`);
        },
        // 下载文档
        downloadWord(row) {
            this.accessoryList = row.accessorys;
            this.unloadFileVisiable = true;
        },
        unloadAheckAccessory() {
            let that = this;
            if (this.checkAccessoryList.length > 0) {
                this.checkAccessoryList.forEach(function (item) {
                    let a = document.createElement("a");
                    let fileName = that.accessoryList[item].name;
                    a.download = fileName;
                    a.style.display = "none";

                    a.href = that.accessoryList[item].address;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            } else {
                this.$message.error("请先选择要下载的附件");
            }
        },
        // 删除文档
        deleteWord(id) {
            this.$confirm("确定要删除该文档吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    api[urlNames["deleteDoc"]]({ id }).then((res) => {
                        if (res) {
                            this.getGrid();
                            this.getGrid();
                            this.$message.success("操作成功");
                        }
                    });
                })
                .catch(() => {
                    this.$message.info("已取消操作");
                });
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
