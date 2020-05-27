<template>
    <div class="wordDetial">
        <div class="header-title">{{ docDetial.title }}</div>
        <div class="time">{{ docDetial.createTime }}</div>
        <div class="content-box">
            <div class="article">
                {{ docDetial.description }}
            </div>
            <div class="footer">
                <p class="articleForm">
                    <span
                        >文章来源：<a :href="docDetial.accessorys">{{
                            docDetial.name
                        }}</a></span
                    >
                </p>
                <p class="saveArticle">
                    <el-button type="primary">保存该文档</el-button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import { api, urlNames } from "@src/api";
export default {
    mixins: [handleBreadcrumb],
    name: "WordDetial",
    data() {
        return {
            docDetial: {
                title: "文章标题",
                description:
                    " 一、材料清单<br>1. 本人身份证、学生证或工作证等证件。<br>2. 笔试准考证。<br>",
                accessorys: "",
                address: "",
                name: "",
                createTime: "",
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
        console.log(this.$route, 333333);
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
    },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
