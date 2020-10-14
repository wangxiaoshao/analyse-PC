<template>
    <div class="site-module mod-dictionary">
        <el-table :data="tableData" border style="width: 100%;">
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
                prop="departmentName"
                align="center"
                label="单位/内设机构名称"
            >
                <template slot-scope="scope">
                    <span class="svg-container" style="color: #b1a8e4;">
                        <span
                            class="iconfont iconzuzhijigou"
                            v-if="scope.row.type === 1"
                        ></span>
                        <span
                            class="iconfont icondanwei"
                            v-if="scope.row.type === 2"
                        ></span>
                        <span
                            class="iconfont iconbumen"
                            v-if="scope.row.type === 3"
                        ></span>
                    </span>
                    <span>{{ scope.row.departmentName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="userName"
                label="人员姓名"
                align="center"
            ></el-table-column>
            <el-table-column prop="userIdType" label="身份类型" align="center">
                <template slot-scope="scope">
                    <!-- <span>{{filterType(scope.row.userIdType)}}</span> -->
                    <span>{{ scope.row.userIdType }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="month"
                label="确认月份"
                align="center"
            ></el-table-column>
        </el-table>
        <!--表格-->
        <!-- <site-table :tableConfig="tableConfig"
                :tableHeight="tableHeight"
                :operateWidth="operateWidth"
                :operate="operate"
                :deptIcon='true'
                :tableData="tableData">
    </site-table> -->
        <!--分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
        >
        </el-pagination>
    </div>
</template>

<script>
import handleTable from "@src/mixins/handle-table";
import tableConfig from "./tableConfig";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import { api, urlNames } from "@src/api";
import { mapState, mapMutations } from "vuex";
import dicOption from "@src/mixins/dic-options.js";
export default {
    mixins: [handleTable, handleBreadcrumb, dicOption],
    data() {
        return {
            tableConfig,
            tableData: [],
            operateWidth: 100,
            tableHeight: null,
            tableCheckbox: true,
            operate: false,
        };
    },
    computed: {
        ...mapState(["application", "examine"]),
    },
    created() {
        this.getGrid();
    },
    mounted() {
        this.pushBreadcrumb({
            name: "人员明细",
            parent: {
                name: this.examine.backPath,
                query: {
                    type: "back",
                },
            },
        });
    },
    methods: {
        ...mapMutations([
            "SET_APPLICATION_PAGE",
            "SET_EXAMINE_TABLEDATA",
            "SET_EXAMINE_DETAIL",
            "SET_EXAMINE_SEARCH_QUERY",
            "SET_EXAMINE_BACKPATH",
        ]),
        getGrid() {
            let data = {
                date: this.$route.params.month,
                confirmId: this.$route.params.id,
                page: this.page.current,
                limit: this.page.limit,
            };
            let keys = Object.keys(this.searchQuery);
            let len = keys.length;
            for (let i = 0; i < len; i++) {
                let key = keys[i];
                let value = this.searchQuery[key];
                if (typeof value !== "number") {
                    if (value) {
                        data[key] = value;
                    }
                } else {
                    data[key] = value;
                }
            }
            api[urlNames["findConfirmMemberById"]](data).then(
                (res) => {
                    this.tableData = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.tableData = [];
                    this.page.total = 0;
                }
            );
        },
        filterType(val) {
            let typeList = this.userTypeOptions.filter(
                (item) => item.value === val
            );
            return typeList[0].text;
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
    .data-pic {
        padding-top: 20px;
        width: 60px;
        height: auto;
    }
}
</style>
