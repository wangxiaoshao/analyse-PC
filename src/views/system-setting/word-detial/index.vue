<template>
    <div class="wordDetial">
        <div class="header-title">{{ docDetial.title }}</div>
        <div class="time">{{ docDetial.createTime }}</div>
        <div class="content-box">
            <div class="article" id="description">
                {{ docDetial.description }}
            </div>
            <div
                class="article"
                id="description"
                v-html="docDetial.content"
            ></div>
            <div class="footer">
                <p class="articleForm">
                    <span
                        >文章来源：
                        <a
                            style="color: #58a4f3;"
                            href="javascript: void ( 0 );"
                            v-for="(item, index) in docDetial.accessorys"
                            :key="index"
                            >《{{ item.name + item.suffix }}》</a
                        >
                    </span>
                </p>
                <p class="saveArticle">
                    <el-button type="primary" @click="openSaveDialog"
                        >下载附件</el-button
                    >
                </p>
            </div>
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
                            v-for="(item, index) in docDetial.accessorys"
                            :label="index"
                            :key="item.id"
                            >{{ item.name + item.suffix }}</el-checkbox
                        >
                    </el-checkbox-group>

                    <!-- <span
                        v-for="(item, index) in docDetial.accessorys"
                        :key="index"
                    >
                        <span v-down="item.address">(附件)</span>
                    </span> -->
                    <!-- <a
                        style="color: #58a4f3;"
                        v-for="(item, index) in docDetial.accessorys"
                        :key="index"
                        :href="item.address"
                        >《{{ item.name + item.suffix }}》</a
                    > -->
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
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import { api, urlNames } from "@src/api";
import downloadBinaryFile from "@src/mixins/downloadBinaryFile";
export default {
    mixins: [handleBreadcrumb, downloadBinaryFile],
    name: "WordDetial",
    data() {
        return {
            unloadFileVisiable: false,
            checkAccessoryList: [],
            docDetial: {
                createTime: "",
                description: "",
                title: "",
                files: [],
                accessorys: [],
                content:
                    " <p>这是文档添加测试正文内容，这是文档添加测试正文内容，这是文档添加测试正文内容这是文档添加测试正文内容这是文档添加测试正文内容</p>",
            },
        };
    },
    mounted() {
        this.pushBreadcrumb({
            name: "文章详情",
            parent: {
                path: `/word-center`,
            },
        });
    },
    created() {
        this.getDocDetial();
    },
    methods: {
        getDocDetial() {
            api[urlNames["findDocById"]]({ id: this.$route.params.id }).then(
                (res) => {
                    if (res) {
                        this.docDetial = res.data;
                    }
                }
            );
        },
        openSaveDialog() {
            this.unloadFileVisiable = true;
        },
        unloadAheckAccessory() {
            let that = this;
            if (this.checkAccessoryList.length > 0) {
                this.checkAccessoryList.forEach(function (item) {
                    let a = document.createElement("a");
                    let fileName = that.docDetial.accessorys[item].name;
                    a.download = fileName;
                    a.style.display = "none";

                    a.href = that.docDetial.accessorys[item].address;

                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            } else {
                this.$message.error("请先选择要下载的附件");
            }
        },
    },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
