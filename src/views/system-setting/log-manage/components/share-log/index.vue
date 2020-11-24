<template>
    <div class="share-log">
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
                    v-if="false"
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
                <el-button type="primary" @click="exportLog"
                    >导出日志</el-button
                >
            </el-form-item>
        </el-form>
        <div class="table-box">
            <el-table :data="shareLogList" stripe border style="width: 100%;">
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
                    prop="operatioTime"
                    label="操作时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="systemName"
                    label="应用名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="companyName"
                    label="单位名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="timeConsuming"
                    label="耗时"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.timeConsuming + "ms" }}
                    </template>
                </el-table-column>
                <el-table-column prop="is_banned" label="状态" align="center">
                    <template slot-scope="scope">
                        <span
                            v-if="parseInt(scope.row.start) === 0"
                            class="text-green"
                            >成功</span
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
        </div>
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
                    <el-form-item label="操作时间：">
                        <div class="table-td">
                            {{ detialInfoForm.operatioTime }}
                        </div>
                    </el-form-item>
                    <el-form-item label="操作账号：">
                        <div class="table-td">
                            {{ detialInfoForm.accountNumber }}
                        </div>
                    </el-form-item>
                    <el-form-item label="同步状态：">
                        <div class="table-td">
                            <span
                                v-if="parseInt(detialInfoForm.start) === 0"
                                class="text-green"
                                >成功</span
                            >
                            <span v-else class="text-red">失败</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="应用名称：">
                        <div class="table-td">
                            {{ detialInfoForm.systemName }}
                        </div>
                    </el-form-item>
                    <el-form-item label="单位名称：">
                        <div class="table-td">
                            {{ detialInfoForm.companyName }}
                        </div>
                    </el-form-item>
                    <el-form-item label="日志类型：">
                        <div class="table-td">
                            {{ detialInfoForm.logType }}
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
</template>
<script>
import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/handle-table";
import pickerOptions from "@src/mixins/picker-options";
import downloadBinaryFile from "@src/mixins/downloadBinaryFile";
export default {
    mixins: [handleTable, pickerOptions, downloadBinaryFile],
    data() {
        return {
            searchDate: [],
            startDate: "",
            endDate: "",
            keyword: "",
            shareLogList: [{}],
            detialInfoVisible: false,
            detialInfoForm: {},
        };
    },
    created() {
        this.getGrid();
    },
    methods: {
        getGrid(flag) {
            if (flag) {
                this.page.current = 1;
            }
            let data = {
                startTime: this.startDate,
                endTime: this.endDate,
                keyword: this.keyword,
                page: this.page.current,
                limit: this.page.limit,
            };
            api[urlNames["findShareLoggerList"]](data).then(
                (res) => {
                    this.shareLogList = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.shareLogList = [];
                    this.page.total = 0;
                }
            );
        },
        dateChange(val) {
            if (val) {
                this.startDate = val[0];
                this.endDate = val[1];
                console.log(this.startDate, this.startDate);
            }
        },
        // 日志详情弹窗
        opendetialInfo(row) {
            this.detialInfoForm = {};
            this.detialInfoVisible = true;
            this.detialInfoForm = row;
        },
        exportLog() {
            let data = {
                // startTime: this.startDate,
                // endTime: this.endDate,
                // keyword: this.keyword,
                page: this.page.current,
                limit: this.page.limit,
            };
            this.downloadBinaryFile("shareLog", data);
        },
    },
};
</script>
