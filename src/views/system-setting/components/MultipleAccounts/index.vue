<template>
    <div class="multiple-accounts">
        <div class="account-title">账号列表</div>
        <div class="table-box">
            <el-table
                :data="accountInfoList"
                stripe
                border
                align="center"
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
                    label="账号"
                    align="center"
                    prop="name"
                ></el-table-column>
                <el-table-column
                    label="创建时间"
                    align="center"
                    prop="createTime"
                ></el-table-column>
                <el-table-column
                    label="登录别名"
                    align="center"
                    prop="nickName"
                >
                    <template slot-scope="scope">
                        <span style="color: #999;" v-if="!scope.row.nickName"
                            >暂无</span
                        >
                        <span style="color: #999;" v-else>{{
                            scope.row.nickName
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="关联系统" align="center">
                    <template slot-scope="scope">
                        <a
                            v-if="
                                scope.row.account4AppDtos &&
                                scope.row.account4AppDtos.length > 0
                            "
                            href="javascript:void(0);"
                            style="color: red; font-size: 12px;"
                            @click="findSystemInfo(scope.row.account4AppDtos)"
                            >查看</a
                        >
                        <a
                            v-else
                            href="javascript:void(0);"
                            style="color: #999; font-size: 12px;"
                            >暂无</a
                        >
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <span style="color: #999;">{{
                            scope.row.removed == 0 ? "已启用" : "已禁用"
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <a
                            href="javascript:void(0);"
                            style="color: #58a4f3; font-size: 12px;"
                            @click="setAccount(scope.row.id)"
                            >编辑</a
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :visible.sync="accountSystemVisible" width="380px">
            <div slot="title" style="padding: 15px;">
                已关联系统
                <i class="el-icon-document-copy" style="color: red;"></i>
            </div>
            <div class="systemInfo">
                <el-table
                    :show-header="false"
                    :data="systeamData"
                    :row-class-name="tableRowClassName"
                >
                    <el-table-column
                        align="center"
                        prop="appName"
                    ></el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button
                    type="primary"
                    @click="accountSystemVisible = false"
                    width="120px"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
export default {
    props: ["accountInfoList"],
    data() {
        return {
            accountSystemVisible: false,
            systeamData: [],
        };
    },

    methods: {
        // 过滤查看系统样式
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 === 0) {
                return "odd-row";
            } else {
                return "even-row";
            }
        },
        // 修改账号信息
        setAccount(val) {
            api[urlNames["findAccountById"]]({ id: val }).then((res) => {
                if (res) {
                    let data = res.data;
                    data.removed = !res.data.removed;
                    this.$emit("goEdit", data);
                }
            });
        },

        // 查看关联系统
        findSystemInfo(data) {
            this.systeamData = data;
            this.accountSystemVisible = true;
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
