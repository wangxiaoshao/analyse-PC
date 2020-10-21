<template>
    <div class="look-person">
        <select-members
            :selectDialog="selectDialog"
            @dialogReturnMembersInfo="dialogReturnMembersInfo"
            @closeselectMenmber="closeselectMenmber"
        ></select-members>
        <div class="button-wrap">
            <el-button
                type="primary"
                class="addPerson"
                @click="openselectMenmber"
                >添加角色成员</el-button
            >
            <el-input
                placeholder="请输入搜索关键词"
                v-model="searchName"
                prefix-icon="el-icon-search"
                style="width: 200px; margin: 0px 10px;"
            ></el-input>
            <el-button @click="findBySearchName" type="primary" plain
                >查询</el-button
            >
        </div>
        <!--表格-->
        <el-table :data="list" border>
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
                prop="description"
                label="序号"
                width="60"
                align="center"
            >
                <template slot-scope="scope">
                    <span :title="scope">{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="成员姓名"> </el-table-column>
            <el-table-column prop="type" label="身份类型"> </el-table-column>
            <el-table-column prop="orgName" label="单位名称"> </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        v-if="roleId === 2 || roleId === 3 || roleId === 5"
                        @click="toAuthorization(scope.row)"
                        >授权范围</el-button
                    >
                    <el-button
                        size="mini"
                        type="text"
                        @click="getDelete(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
        >
        </el-pagination>
    </div>
</template>

<script>
import handleTable from "@src/mixins/handle-table";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import hasRight from "@src/mixins/has-right";
import { api, urlNames } from "@src/api";
import SelectMembers from "@src/components/SelectMembers/index";
export default {
    name: "LookPersonPermission",
    mixins: [handleTable, handleBreadcrumb, hasRight],
    components: { SelectMembers },
    data() {
        return {
            list: [{ uid: 3211 }],
            permissionId: "",
            loading: false,
            setFlag: false,
            roleId: parseInt(this.$route.params.id),
            searchName: "",
            selectDialog: {
                selectMenmberTitle: "添加管理员", // 选人组件标题
                selectMenmberFlag: false, // 显示弹窗，
                isAllData: false, // 是否需完整数据-默认为不需要（false，只包含用户id）
                notOnlyPerson: true, // 是否选人，默认为false（只选人）
                isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选(与notOnlyPerson一起使用，notOnlyPerson为true是有效
                isSingleOrgSelect: false, // 是否为单选框  false为多选（默认），true为单选(与isOnlyOrg一起使用，isOnlyOrg为true时内设机构/单位单选)
                isOnlyOrg: false, //  是否选内设机构/单位 false为不是只选内设机构，true为只选内设机构
            },
            userId: [],
            hasAddArea: false,
            hasAddOrg: false,
            hasAddUser: false,
            hasAddAuthority: false,
        };
    },
    created() {
        this.init();
    },
    mounted() {
        this.pushBreadcrumb({
            name: "查看成员及权限",
            parent: {
                name: "RoleList",
                query: {
                    type: "back",
                },
            },
        });
    },
    methods: {
        init() {
            this.getGrid();
        },
        toAuthorization(val) {
            this.$router.push({
                path: `/role-manage/scope-authorization/${val.uid}?roleId=${this.roleId}`,
            });
        },
        getGrid() {
            let data = {
                page: this.page.current,
                roleId: this.$route.params.id,
                limit: this.page.limit,
            };
            this.loading = true;
            api[urlNames["getRoleBindUserList"]](data).then(
                (res) => {
                    this.loading = false;
                    this.list = res.data;
                    this.permissionId = res.roleId;
                    this.page.total = res.total;
                },
                () => {}
            );
        },
        findBySearchName() {
            let data = {
                roleId: this.$route.params.id,
                searchName: this.searchName,
                page: 1,
                limit: this.page.limit,
            };
            api[urlNames["searchRoleBindUserList"]](data).then(
                (res) => {
                    this.loading = false;
                    this.list = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.loading = false;
                    this.list = [];
                    this.page.total = 0;
                }
            );
        },
        getDelete(row) {
            this.userId = row.uid;
            this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.deleteRoleBindUser();
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 删除角色绑定人员
        deleteRoleBindUser() {
            api[urlNames["deleteRoleBindUser"]]({
                roleId: this.$route.params.id,
                uid: this.userId,
            }).then(
                (res) => {
                    this.$message.success(`删除成功`);
                    this.dialogVisible = false;
                    this.getGrid();
                },
                (/* error */) => {
                    this.$message.error(`保存失败，请重试`);
                }
            );
        },
        openselectMenmber() {
            this.selectDialog.selectMenmberFlag = true;
            this.userId = [];
        },
        closeselectMenmber() {
            this.selectDialog.selectMenmberFlag = false;
        },
        getSetFlag(val) {
            this.setFlag = val;
        },
        dialogReturnMembersInfo(data, flag) {
            if (data.length === 0) {
                this.$message.info("您没有选择成员");
                return false;
            }
            if (flag === 0) {
                JSON.parse(JSON.stringify(data)).forEach((item) => {
                    let obj = {
                        uid: item,
                    };
                    this.userId.push(obj);
                });
                // 保存
                if (JSON.parse(JSON.stringify(data)) !== []) {
                    api[urlNames["saveRoleBindUser"]]({
                        id: this.$route.params.id,
                        userList: this.userId,
                    }).then(
                        (res) => {
                            this.$message.success(`添加成功`);
                            this.getGrid();
                        },
                        () => {
                            this.$message.error(`保存失败，请重试`);
                        }
                    );
                }
            }
            this.userId = [];
        },
    },
};
</script>

<style lang="less">
@import "index";
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
p.valid-sign-failure {
    line-height: 15px;
    text-indent: 0;
    color: red;
    img {
        width: 15px;
        height: 15px;
        vertical-align: bottom;
        margin-right: 10px;
    }
}
</style>
