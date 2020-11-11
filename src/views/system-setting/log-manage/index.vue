<template>
    <div class="log-manage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="操作日志" name="first">
                <operation-log></operation-log>
            </el-tab-pane>
            <el-tab-pane label="系统日志" name="second">系统日志</el-tab-pane>
            <el-tab-pane label="共享日志" name="third">共享日志</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import OperationLog from "./components/operation-log";
export default {
    components: { OperationLog },
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
