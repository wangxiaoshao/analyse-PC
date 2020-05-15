<template>
    <div>
        <div class="department-tab-content">
            <el-table :data="departmentList" style="width: 100%;" class="eltab">
                <el-table-column
                    prop="name"
                    label
                    width="100"
                    align="left"
                    height="0"
                ></el-table-column>
                <el-table-column label="内设机构电话" width="100"
                    >内设机构电话:</el-table-column
                >
                <el-table-column prop="phone" label></el-table-column>
                <el-table-column
                    label="下级"
                    align="right"
                    width
                    class-name="next-btn"
                >
                    <template slot-scope="scope">
                        <i class="el-icon-share"></i>
                        <span @click="childClick(scope.row)">下级</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    props: ["departmentList", "treeList"],
    components: {
        // memberTable
    },
    data() {
        return {
            status: 0,
            isShow: true,
            tableData: [],
            personnel: {},
            memberList: [],
            userId: "1111111111111111111",
        };
    },
    created() {},
    methods: {
        childClick(node) {
            this.$emit("handle-child-click", node);
        },
    },
};
</script>
<style lang="less">
@import "index";
</style>
