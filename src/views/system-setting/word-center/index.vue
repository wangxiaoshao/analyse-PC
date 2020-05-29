<template>
    <div class="word-center">
        <el-tabs v-model="activeName">
            <el-tab-pane label="文档中心" name="actionWord">
                <article-list :activeName="activeName"></article-list>
            </el-tab-pane>
            <el-tab-pane label="文档管理" name="authorityDescript">
                <article-list :activeName="activeName"></article-list>
            </el-tab-pane>
        </el-tabs>
        <div class="addWord" v-if="activeName == 'authorityDescript'">
            <el-button type="primary" size="mini" @click="goWordUnload"
                >添加文档</el-button
            >
        </div>
    </div>
</template>
<script>
import ArticleList from "../components/ArticleList/index";
export default {
    name: "WordCenter",
    components: { ArticleList },
    data() {
        return {
            activeName: "actionWord",
        };
    },
    created() {},
    methods: {
        // 添加文档
        goWordUnload() {
            this.$router.push(`/word-center/word-unload`);
        },
    },
};
</script>

<style lang="less" scoped>
@import "index.less";
</style>
