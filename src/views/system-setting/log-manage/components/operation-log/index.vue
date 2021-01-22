<template>
    <div class="operation-log">
        <el-form label-position="right" inline>
            <el-form-item>
                <el-select
                    filterable
                    size="medium"
                    placeholder="请选择日志类型"
                    @change="logChange"
                    v-model="searchParams.actionType"
                >
                    <el-option
                        v-for="item in logTypeList"
                        :key="item.id"
                        :label="item.subject"
                        :value="item.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker
                    style="width: 250px;"
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
                    v-model="searchParams.keyword"
                    @blur="iptChange"
                    clearable
                    prefix-icon="el-icon-search"
                    style="width: 175px;"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" plain @click="openSelectDailog"
                    >选择单位</el-button
                >
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
                :data="actionLoggerList"
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
                    prop="actionTime"
                    label="操作时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="actionUser"
                    label="操作人"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="actionDesc"
                    label="描述"
                    align="center"
                ></el-table-column>
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
                            {{ detialInfoForm.actionTime }}
                        </div>
                    </el-form-item>
                    <el-form-item label="操作人：">
                        <div class="table-td">
                            {{ detialInfoForm.actionUser }}
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
                    <el-form-item label="操作描述：">
                        <div class="table-td">
                            {{ detialInfoForm.actionDesc }}
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
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeSelectDailog"
        ></select-tree>
    </div>
</template>
<script>
import { api, urlNames } from '@src/api'
import handleTable from '@src/mixins/handle-table'
import dataStatistics from '@src/mixins/data-statistics'
import downloadBinaryFile from '@src/mixins/downloadBinaryFile'
import SelectTree from '@src/components/SelectTree/index'
export default {
  mixins: [handleTable, dataStatistics, downloadBinaryFile],

  components: {
    SelectTree
  },
  data () {
    return {
      selectTreeDailog: {
        title: '选择查询单位',
        openSelectTreeVisiable: false,
        isSelectType: 2, // 1 区县  2  单位  3 人员 4市州
        isSingSelect: true, // 是否单选,true 单选，false:多选
        isClearSelected: true // 再次打开是否清空已选框
      },
      logTypeList: [],
      searchParams: {
        actionType: '',
        keyword: '',
        orgId: ''
      },
      actionLoggerList: [],
      detialInfoVisible: false,
      detialInfoForm: {}
    }
  },
  created () {
    this.initializeDate()
    this.pickDateOptionRules()
    this.getAllLogTypes()
  },
  mounted () {
    this.getGrid()
  },
  methods: {
    // 系统日志--获取所有日志类型
    getAllLogTypes () {
      api[urlNames.getAllLogTypes]().then((res) => {
        if (res.data) {
          this.logTypeList = res.data
        }
      })
    },
    dateChange (val) {
      if (val) {
        this.startDate = val[0]
        this.endDate = val[1]
      }
    },
    logChange () {
      console.log(this.searchParams.actionType)
    },
    iptChange () {},
    getGrid (flag) {
      if (flag) {
        this.page.current = 1
      }
      const data = {
        beginDate: this.startDate,
        endDate: this.endDate,
        actionType: this.searchParams.actionType,
        keyword: this.searchParams.keyword,
        orgId: this.searchParams.orgId,
        page: this.page.current,
        pageSize: this.page.limit
      }
      api[urlNames.getActionLoggerList](data).then(
        (res) => {
          this.actionLoggerList = res.data
          this.page.total = res.total
        },
        () => {
          this.actionLoggerList = []
          this.page.total = 0
        }
      )
    },
    openSelectDailog () {
      this.selectTreeDailog.openSelectTreeVisiable = true
    },
    closeSelectDailog () {
      this.selectTreeDailog.openSelectTreeVisiable = false
    },
    dialogReturnData (userData, authData) {
      authData = authData || []
      const dataAry = [...userData, ...authData]
      this.searchParams.orgId = dataAry[0].treeId
    },
    opendetialInfo (row) {
      this.detialInfoForm = {}
      this.detialInfoVisible = true
      this.detialInfoForm = row
    },
    exportLog () {
      const data = {
        beginDate: this.startDate,
        endDate: this.endDate,
        actionType: this.searchParams.actionType,
        keyword: this.searchParams.keyword,
        orgId: this.searchParams.orgId,
        page: this.page.current,
        pageSize: this.page.limit,
        logType: 1
      }
      // api[urlNames["actionLogExport"]](data).then((res) => {
      //     // let data = new Blob([res]);
      //     // console.log(data, "kkkkk");
      // });
      this.downloadBinaryFile('actionLog', data)
    },
    resetData () {
      this.initializeDate()
      this.searchParams.actionType = ''
      this.searchParams.orgId = ''
      this.searchParams.keyword = ''
      this.getGrid(true)
    }
  },
  watch: {
    activeName (val) {
      if (val === 'first') {
        this.resetData()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "index.less";
</style>
