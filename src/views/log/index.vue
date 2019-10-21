<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="18">
        <el-row :gutter="10" type="flex">
          <el-col :span="12">
            <el-date-picker
              v-model="dataValue"
              type="daterange"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="change"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table v-loading="loading"
              :data="list"
              :max-height="tableMaxHeight"
              border
              style="width: 100%">

      <el-table-column prop="description" label="序号">
        <template slot-scope="scope">
          <span :title="scope">{{scope.$index + 1}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="act" label="操作">
        <template slot-scope="scope">
          <span :title="scope.row.act">{{scope.row.act}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="uname" label="操作人">
        <template slot-scope="scope">
          <span :title="scope.row.uname">{{scope.row.uname}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="actTime" label="操作时间">
        <template slot-scope="scope">
          <span :title="scope.row.actTime">{{scope.row.actTime}}</span>
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
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handleTable'
import { api, urlNames } from '@src/api'

export default {
  components: {},
  mixins: [handleTable],
  data () {
    return {
      loading: true,
      searchQuery: {
        type: ''
      },
      list: [],
      dictionaryNameList: [],
      page: {},

      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      dataValue: []

    }
  },
  computed: {
  },
  mounted () {
    this.getGrid()
  },
  methods: {
    change () {
      this.page.current = 1
      this.getGrid()
    },
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    selectDescription () {
      this.page.current = 1
      this.getGrid()
    },
    getGrid () {
      this.loading = true
      let data = {
        page: this.page.current,
        pageSize: this.page.limit
      }
      if (this.dataValue && this.dataValue.length > 0) {
        data.startTime = this.dataValue[0]
        data.endTime = this.dataValue[1]
      }
      api[urlNames['getAdminLog']](data).then((res) => {
        this.loading = false
        this.list = res.result.items
        this.page.total = res.result.total_items
      }, () => {
        this.loading = false
        this.list = []
        this.page.total = 0
      })
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


