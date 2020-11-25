<template>
    <div class="log-manage">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
                label="操作日志"
                name="first"
                v-if="app.rolesInfo.roleName === 'SECURITY_AUDIT_MANAGER'"
            >
                <operation-log :activeName="activeName"></operation-log>
            </el-tab-pane>
            <el-tab-pane
                label="系统日志"
                name="second"
                v-if="
                    app.rolesInfo.roleName === 'SECURITY_AUDIT_MANAGER' ||
                    app.rolesInfo.roleName === 'SYSTEM_MANAGER'
                "
            >
                <system-log :activeName="activeName"></system-log>
            </el-tab-pane>
            <el-tab-pane
                label="共享日志"
                name="third"
                v-if="app.rolesInfo.roleName === 'SECURITY_AUDIT_MANAGER'"
            >
                <share-log></share-log>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import OperationLog from "./components/operation-log";
import SystemLog from "./components/system-log";
import ShareLog from "./components/share-log";
import { mapState } from "vuex";
export default {
    components: { OperationLog, SystemLog, ShareLog },
    data() {
        return {
            activeName: "first",
        };
    },
    methods: {
        handleClick(val) {},
    },
    computed: {
        ...mapState(["app"]),
    },
};
</script>
