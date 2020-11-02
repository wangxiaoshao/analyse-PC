<template>
    <div class="system-log">
        <el-form label-position="right" inline>
            <el-form-item>
                <!-- <span>日期：</span> -->
                <el-date-picker
                    v-model="searchDate"
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
        </el-form>
        <div class="table-box">
            <iframe
                width="100%"
                height="100%"
                src="http://localhost:8088/webroot/decision/v10/entry/access/2da1b288-77f4-4e71-8e09-0f66d59a85f6?preview=true"
                frameborder="0"
            ></iframe>
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
            searchDate: "",
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
