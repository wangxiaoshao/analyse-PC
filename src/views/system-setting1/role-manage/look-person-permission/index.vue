<template>
    <div class="look-person">
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeselectMenmber"
            @next="next"
            @last="last"
        ></select-tree>
        <div class="button-wrap">
            <el-button
                type="primary"
                class="addPerson"
                @click="openselectMember"
                >添加角色成员</el-button
            >
            <el-input
                placeholder="请输入搜索关键词"
                v-model="searchName"
                prefix-icon="el-icon-search"
                style="width: 200px; margin: 0px 10px;"
            ></el-input>
            <el-button @click="getGrid(true)" type="primary" plain
                >查询</el-button
            >
        </div>
        <!--表格-->
        <el-table :data="userlist" border>
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
                label="序号"
                width="60"
                align="center"
                type="index"
            >
            </el-table-column>
            <el-table-column prop="uName" label="成员姓名"> </el-table-column>
            <el-table-column prop="orgName" label="单位名称"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{
                        scope.row.createTime | dataFilter("YYYY-MM-DD HH:mm:ss")
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" align="center">
                <template slot-scope="scope">
                    {{
                        scope.row.updateTime | dataFilter("YYYY-MM-DD HH:mm:ss")
                    }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        v-if="roleId !== 1 && roleId !== 2"
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
import SelectTree from "@src/components/SelectTree/index";
export default {
    name: "LookPersonPermission",
    mixins: [handleTable, handleBreadcrumb, hasRight],
    components: { SelectTree },
    data() {
        return {
            userlist: [{ uid: 3211 }],
            loading: false,
            roleId: parseInt(this.$route.params.roleId),
            searchName: "",
            selectTreeDailog: {
                title: "选择人员",
                openSelectTreeVisiable: false,
                isSelectType: 3, // 1 区县  2  单位  3 人员
                isSingSelect: false, // 是否单选,true 单选，false:多选
                isNext: true,
                isLast: false,
            },
            userId: [],
        };
    },
    created() {
        this.getGrid();
        console.log(this.$store.state.app.rolesInfo);
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
        toAuthorization(val) {
            this.$router.push({
                path: `/role-manage/scope-authorization/${val.uid}?roleId=${this.roleId}`,
            });
        },
        getGrid(flag) {
            if (flag) {
                this.page.current = 1;
            }
            let data = {
                searchName: this.searchName,
                roleId: this.$route.params.roleId,
                page: this.page.current,
                pageSize: this.page.limit,
            };
            this.loading = true;
            api[urlNames["getAuthUsersByRole"]](data).then(
                (res) => {
                    this.loading = false;
                    this.userlist = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.loading = false;
                }
            );
        },
        getDelete(row) {
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
        openselectMember() {
            this.selectTreeDailog.openSelectTreeVisiable = true;
            this.selectTreeDailog.title = "选择人员";
            this.selectTreeDailog.isSelectType = 3;
            this.selectTreeDailog.isNext = true;
            this.selectTreeDailog.isLast = false;
        },
        closeselectMenmber() {
            this.selectTreeDailog.openSelectTreeVisiable = false;
        },
        dialogReturnData(userData, authData) {
            console.log(this.$store.state.app.rolesInfo);
            // 保存
            let uid = [];
            let authorizedOid = [];
            userData.forEach((item) => {
                uid.push(item.treeId);
            });
            authData.forEach((item) => {
                authorizedOid.push(item.treeId);
            });
            let data = {
                roleId: this.$route.params.roleId,
                authorizedType: this.$store.state.app.rolesInfo.authorizedType,
                uid,
                authorizedOid,
            };
            this.addUserAuth(data);
        },
        addUserAuth(data) {
            api[urlNames["addUserAuthScope"]](data).then(
                (res) => {
                    this.$message.success(`添加成功`);
                    this.closeselectMenmber();
                    this.getGrid();
                },
                () => {
                    this.closeselectMenmber();
                    this.$message.error(`保存失败，请重试`);
                }
            );
        },
        next() {
            this.selectTreeDailog.isNext = false;
            this.selectTreeDailog.isLast = true;
            this.selectTreeDailog.title = "授权范围";
            this.selectTreeDailog.isSelectType = 1;
        },
        last() {
            this.selectTreeDailog.title = "选择人员";
            this.selectTreeDailog.isSelectType = 3;
            this.selectTreeDailog.isNext = true;
            this.selectTreeDailog.isLast = false;
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
</style>
