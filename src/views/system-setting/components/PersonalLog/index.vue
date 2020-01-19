
<template>
<div class="personal-log">
  <div class="log-header">
    <el-row>
      <el-col :span="4">
        <div class="block">
          <el-select v-model="selectValue"
          slot="prepend"
          align="center"
          placeholder="今天"
          @change="selectChange(selectValue)">
          <el-option label="今天" :value="['today']"></el-option>
          <el-option label="昨天" :value="['yesterday']"></el-option>
          <el-option label="月" :value="['month', '月', 'yyyy-MM']"></el-option>
          <el-option label="选择日期" :value="['date', '日期', 'yyyy-MM-dd']"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" :style="{width: '220px'}">
        <div class="block" v-if="openPicker">
          <el-date-picker
            slot="append"
            v-model="currentDateVal"
            :type="dateType"
            :default-value="weekstart"
            :format="format"
            :value-format="format"
            :placeholder="'选择'+value"
            :picker-options="pickerOptions"
            @change="dateChange">
          </el-date-picker>
        </div>
        <div v-else>
          <el-input v-model="inputValue" :placeholder="date" :disabled="true">
            <i slot="prefix" class="el-input__icon el-icon-date"></i>
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="log-table">
     <el-table
     :data="tableData"
     stripe
     border
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="actionTime"
      label="时间"
      >
    </el-table-column>
    <el-table-column
      prop="userName"
      label="操作人"
      >
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述">
    </el-table-column>
    <el-table-column
      label="操作">
       <template slot-scope="scope">
        <a href="javascript:void(0);" style="color:red;font-size:12px" @click="openDetialInfo(scope.row)">详情</a>
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
      :total="page.total">
    </el-pagination>
  <!-- 详细信息弹窗 -->

  <div class="dialog-box">
    <el-dialog
      :visible.sync="DetialInfoVisible" width='410px'>
      <div slot='title'>
        日志详情  <span class='svg-container' style="color:red"><span class='iconfont iconzuzhijigou'></span></span>
      </div>
      <el-form :model="DetialInfoForm" inline  label-position="right" style="width:100%;text-align:center">
        <el-form-item label="操作日期" label-width="100px">
          <el-input v-model="DetialInfoForm.actionTime" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="操作人标识" label-width="100px">
         <el-input v-model="DetialInfoForm.actionUid"  width='200px' :disabled='true'></el-input>
        </el-form-item>
         <el-form-item label="操作描述" label-width="100px">
          <el-input v-model="DetialInfoForm.description" :disabled='true'></el-input>
        </el-form-item>
        <el-form-item label="操作事件标识" label-width="100px">
         <el-input v-model="DetialInfoForm.clientId" :disabled='true'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DetialInfoVisible = false" width='120px'>确 定</el-button>
      </div>
  </el-dialog>
  </div>
  </div>
</div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [handleTable],
  data () {
    return {
      tableData: [],
      DetialInfoVisible: false,
      DetialInfoForm: {
        actionDepartmentId: '',
        actionOrgId: '',
        actionTime: '',
        actionType: '',
        actionUid: '',
        clientId: '',
        clientIp: '',
        description: '',
        id: '',
        signed: ''

      },
      searchQuery: {
        areaId: '',
        status: '',
        keyword: ''
      },
      weekstart: '',
      reverse: true,
      newsList: [],
      currentDateVal: '',
      openPicker: false,
      selectValue: '',
      date: '',
      inputValue: '',
      dateType: '',
      format: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        },
        shortcuts: null
      },
      value: ''
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {
    let datefilters = this.$options.filters['date'](new Date().getTime(), 'yyyy-MM-dd')
    this.date = datefilters
    this.weekstart = datefilters
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(this.searchQuery, this.application.searchQuery)
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_APPLICATION_SEARCH_QUERY({})
    }

    this.getGrid()
  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    openDetialInfo (val) {
      this.DetialInfoVisible = true
      let info = {
        actionTime: val.actionTime.slice(0, 10),
        id: val.id
      }
      api[urlNames['findLoggerById']](info).then((res) => {
        Object.assign(this.DetialInfoForm, res.data)
      }, () => {

      })
    },
    selectChange (val) {
      this.date = ''
      this.currentDateVal = ''
      this.openPicker = false
      let todayDate = new Date()
      if (val && val.length > 1) {
        this.openPicker = true
        this.dateType = val[0]
        this.value = val[1]
        this.format = val[2]
        return false
      } else if (val[0] === 'yesterday') {
        todayDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
        this.dateType = val[0]
      }
      this.date = this.$options.filters['date'](todayDate.getTime(), 'yyyy-MM-dd')
      if (this.date) {
        this.getGrid()
      }
    },
    dateChange (val) {
      if (val) {
        this.date = val
        this.getGrid()
      }
    },
    getGrid () {
      let data = {
        date: this.date,
        type: this.dateType === 'month' ? 4 : 0, // 后端需要传输的数据类型 月份type：4 || 天：0
        page: this.page.current,
        limit: this.page.limit
      }
      api[urlNames['findPersonalLoggerList']](data).then((res) => {
        this.tableData = res.data
        this.newsList = res.data
        this.page.total = res.total
      }, () => {
        this.list = []
        this.page.total = 0
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import 'index';
</style>
