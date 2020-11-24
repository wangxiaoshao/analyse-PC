<template>
    <div class="system-log">
        <el-form label-position="right" inline>
            <el-form-item>
                <el-date-picker
                    v-model="searchDate"
                    type="daterange"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="dateChange"
                    @blur="onDateBlur"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-input
                    placeholder="请输入搜索关键词"
                    v-model="keyword"
                    clearable
                    prefix-icon="el-icon-search"
                    style="width: 175px;"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getGrid(true)"
                    >查询</el-button
                >
                <el-button type="primary" @click="resetData">重置</el-button>
                <el-button type="primary" @click="exportLog"
                    >导出日志</el-button
                >
            </el-form-item>
        </el-form>
        <div class="table-box">
            <el-table
                :data="systemLoggerList"
                stripe
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
                    prop="accessTime"
                    label="接口访问时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="appName"
                    label="应用名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="path"
                    label="请求地址"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="waitTimeMs"
                    label="请求耗时"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.waitTimeMs }}ms
                    </template>
                </el-table-column>
                <el-table-column prop="success" label="是否成功" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="scope.row.success === '是'"
                            class="text-green"
                            >是</span
                        >
                        <span v-else class="text-red">失败</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="110px">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="opendetialInfo(scope.row)"
                            >详情</el-button
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
            <!-- 详细信息弹窗 -->
            <div class="dialog-box">
                <el-dialog :visible.sync="detialInfoVisible" width="600px">
                    <div slot="title" style="padding: 20px;">
                        日志详情
                        <i
                            class="el-icon-document-copy"
                            style="color: #5d71d0;"
                        ></i>
                    </div>
                    <el-form inline label-width="130px" class="systemDetial">
                        <el-form-item label="接口访问时间：">
                            <div class="table-td">
                                {{ detialInfoForm.accessTime }}
                            </div>
                        </el-form-item>
                        <el-form-item label="应用名称：">
                            <div class="table-td">
                                {{ detialInfoForm.appName }}
                            </div>
                        </el-form-item>
                        <el-form-item label="请求地址：">
                            <div class="table-td">
                                {{ detialInfoForm.path }}
                            </div>
                        </el-form-item>
                        <el-form-item label="请求方式：">
                            <div class="table-td">
                                {{ detialInfoForm.method }}
                            </div>
                        </el-form-item>
                        <el-form-item label="是否成功：">
                            <div class="table-td">
                                <span
                                    v-if="detialInfoForm.success === '是'"
                                    class="text-green"
                                    >是</span
                                >
                                <span v-else class="text-red">失败</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="请求耗时：">
                            <div class="table-td">
                                {{ detialInfoForm.waitTimeMs }}ms
                            </div>
                        </el-form-item>
                        <el-form-item label="请求参数：">
                            <div class="table-td">
                                {{ detialInfoForm.queryString }}
                            </div>
                        </el-form-item>
                        <el-form-item
                            label="错误详情："
                            v-if="detialInfoForm.errorMessage"
                        >
                            <div class="table-td">
                                {{ detialInfoForm.errorMessage }}
                            </div>
                        </el-form-item>
                    </el-form>

                    <div slot="footer" class="dialog-footer">
                        <el-button
                            type="primary"
                            @click="detialInfoVisible = false"
                            width="120px"
                            >确 定</el-button
                        >
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/handle-table";
import dataStatistics from "@src/mixins/data-statistics";
import downloadBinaryFile from "@src/mixins/downloadBinaryFile";
export default {
    mixins: [handleTable, dataStatistics, downloadBinaryFile],
    props: ["activeName"],
    data() {
        return {
            keyword: "",
            systemLoggerList: [],
            detialInfoVisible: false,
            detialInfoForm: {},
        };
    },
    created() {
        this.initializeDate();
    },
    mounted() {
        this.getGrid();
    },
    methods: {
        dateChange(val) {
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
            }
        },
        getGrid(flag) {
            if (flag) {
                this.page.current = 1;
            }
            let data = {
                beginDate: this.startDate,
                endDate: this.endDate,
                keyword: this.keyword,
                page: this.page.current,
                pageSize: this.page.limit,
            };
            api[urlNames["getApiLoggerList"]](data).then(
                (res) => {
                    this.systemLoggerList = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.systemLoggerList = [];
                    this.page.total = 0;
                }
            );
        },
        opendetialInfo(row) {
            this.detialInfoForm = {};
            this.detialInfoVisible = true;
            this.detialInfoForm = row;
        },
        resetData() {
            this.initializeDate();
            this.keyword = "";
            this.getGrid(true);
        },
        exportLog() {
            let data = {
                beginDate: this.startDate,
                endDate: this.endDate,
                keyword: this.keyword,
                page: this.page.current,
                pageSize: this.page.limit,
                logType: 2,
            };
            this.downloadBinaryFile("systemLog", data);
        },
    },
    watch: {
        // activeName(val) {
        //     if (val === "second") {
        //         this.resetData();
        //     }
        // },
    },
};
</script>
