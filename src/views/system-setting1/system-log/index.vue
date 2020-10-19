<template>
    <div class="system-log">
        <el-form label-position="right" inline>
            <el-form-item>
                <!-- <span>日期：</span> -->
                <el-date-picker
                    v-model="findDate"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="dateChange"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-select
                    size="medium"
                    placeholder="请选择日志类型"
                    @change="logChange"
                    v-model="searchParams.actionType"
                >
                    <el-option
                        v-for="item in logTypeList"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input
                    placeholder="请输入搜索关键词"
                    v-model="searchParams.keyWord"
                    @blur="iptChange"
                    clearable
                    prefix-icon="el-icon-search"
                    style="width: 175px;"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="findCondition"
                    >查询</el-button
                >
            </el-form-item>
            <el-button size="small" type="primary" style="float: right;"
                >导出</el-button
            >
        </el-form>
        <div class="table-box">
            <el-table :data="systemLogList" stripe border style="width: 100%;">
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
                    type="index"
                    label="序号"
                    align="center"
                    width="70px"
                ></el-table-column>
                <el-table-column
                    prop="actionTime"
                    label="操作人"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="userName"
                    label="操作时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="description"
                    label="描述"
                    align="center"
                    min-width="100"
                ></el-table-column>
                <el-table-column label="操作" align="center" width="100px">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="openDetialDialog(scope.row.id)"
                            >查看详情</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="page.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import handleTable from "@src/mixins/new/handle-table";
export default {
    mixins: [handleTable],
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                },
                shortcuts: null,
            },
            logTypeList: [
                { type: 1, name: "查询日志" },
                { type: 2, name: "导出日志" },
                { type: 3, name: "权限日志" },
            ],
            systemLogList: [{}],
            findDate: "",
            searchParams: {
                startDate: "",
                endDate: "",
                actionType: 1,
                keyWord: "",
            },
        };
    },
    methods: {
        dateChange(val) {
            this.searchParams.startDate = val[0];
            this.searchParams.endDate = val[1];
            console.log(val, this.searchParams.date);
        },
        logChange() {
            console.log(this.searchParams.actionType);
        },
        iptChange() {},
        findCondition() {},
        // 查看日志详情
        openDetialDialog() {},
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
