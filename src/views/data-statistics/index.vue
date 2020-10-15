<template>
    <div class="data-statistics">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="省直属单位" name="first">
                <apply-search></apply-search>
            </el-tab-pane>
            <el-tab-pane label="市州直属单位" name="second"
                >市州直属单位</el-tab-pane
            >
            <el-tab-pane label="区县单位" name="third">区县单位</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import ApplySearch from "./components/ApplySearch/index";
export default {
    components: { ApplySearch },
    data() {
        return {
            activeName: "first",
        };
    },
    methods: {
        handleClick() {},
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
