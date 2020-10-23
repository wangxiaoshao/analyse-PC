<template>
    <div>
        <!--表格-->
        <el-table
            v-loading="loading"
            :data="rolesList"
            border
            style="width: 100%;"
        >
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
            <el-table-column
                prop="title"
                label="角色名称"
                width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column prop="description" label="角色描述" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.description || "无" }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建时间"
                min-width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="updatedTime"
                label="修改时间"
                min-width="200"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="value"
                label="启用状态"
                width="100"
                align="center"
            >
                <template slot-scope="scope">
                    <span class="text-able" v-show="scope.row.removed === 0"
                        >启用</span
                    >
                    <span class="text-disable" v-show="scope.row.removed === 1"
                        >停用</span
                    >
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        @click="goLookPerson(scope.row)"
                        >查看成员及权限</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import handleTable from "@src/mixins/handle-table";
import { api, urlNames } from "@src/api";

export default {
    mixins: [handleTable],
    data() {
        return {
            rolesList: [
                { allowAction: true, id: 1, title: "系统管理员" },
                { allowAction: true, id: 2, title: "市州管理员" },
                { allowAction: true, id: 3, title: "区县管理员" },
                { allowAction: true, id: 4, title: "省级管理员" },
                { allowAction: true, id: 5, title: "单位管理员" },
            ],
            loading: false,
        };
    },
    created() {
        // this.getGrid();
    },
    methods: {
        getGrid() {
            let data = {
                page: 1,
                limit: 20,
            };

            this.loading = true;
            api[urlNames["findRoleList"]](data).then(
                (res) => {
                    this.loading = false;
                    this.rolesList = res.data;
                },
                () => {
                    this.loading = false;
                }
            );
        },
        goLookPerson(row) {
            this.$router.push({
                name: "lookPersonPermission",
                params: {
                    id: row.id,
                },
            });
        },
    },
};
</script>

<style scoped lang="less">
.empty {
    p {
        margin: 0;
        font-size: 0px;
        text-align: center;
        line-height: 16px !important;
    }

    span {
        font-size: 12px;
    }
}

.data-pic {
    padding-top: 20px;
    width: 60px;
    height: auto;
}
</style>
