<template>
  <div class="push-log">
    <!-- 详细信息弹窗 -->
    <div class="dialog-box">
      <el-dialog :visible.sync="detialInfoVisible"  width="600px">
        <div slot="title" style="padding:20px">
          日志详情
          <i class="el-icon-document-copy" style="color:red"></i>
        </div>
           <el-form
              inline
              style="width:100%;"
              label-width="110px"
            >
              <el-form-item label="同步实体ID" >
                <div class="table-td">
                  {{detialInfo.entityId}}
                </div>
              </el-form-item>
              <el-form-item label="异常信息">
                <div class="table-td">
                  <span style="color:red"
                   v-if="detialInfo.exceptionMessage">
                   {{detialInfo.exceptionMessage}}
                   </span>
                   <span v-else>无</span>
                </div>
              </el-form-item>
              <el-form-item label="同步地址">
                <div class="table-td">
                 {{detialInfo.pushUrl}}
                </div>
              </el-form-item>
              <el-form-item label="同步参数">
                <div class="table-td">
                  {{detialInfo.pushBody}}
                </div>
              </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detialInfoVisible = false" width="120px">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-form inline>
      <el-form-item>
          <span class="title">时间  </span>
          <el-select
            v-model="logParam.selectValue"
            align="center"
            placeholder="今天"
            @change="selectChange(logParam.selectValue)"
          >
            <el-option label="今天" :value="['today']"></el-option>
            <el-option label="昨天" :value="['yesterday']"></el-option>
            <el-option label="月" :value="['month', '月', 'yyyy-MM']"></el-option>
            <el-option label="选择日期" :value="['date', '日期', 'yyyy-MM-dd']"></el-option>
            <el-option label="选择时间段" :value="['daterange', '时间段', 'yyyy-MM-dd']"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <div v-if="openPicker">
          <el-date-picker
            slot="append"
            v-model="currentDateVal"
            :type="logParam.dateType"
            :default-value="weekstart"
            :format="format"
            :value-format="format"
            :placeholder="'选择'+value"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            @change="dateChange"
          ></el-date-picker>
      </div>
        <div v-else>
        <el-input v-model="inputValue" :placeholder="date" :disabled="true">
          <i slot="prefix" class="el-input__icon el-icon-date"></i>
        </el-input>
      </div>
      </el-form-item>
    </el-form>
    <el-table
    :data="logList"
    border
    stripe

    style="width: 100%">
    <template slot="empty">
      <div class="empty">
        <p><img class="data-pic" src="@src/common/images/no-data1.png" alt=""/></p>
        <p><span style="padding-left: 8px;">暂无数据</span></p>
      </div>
    </template>
    <el-table-column
      type="index"
      width="65"
      label="序号"
    align="center">
    </el-table-column>
    <el-table-column
      prop="pushTime"
      label="同步时间"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="应用名称"
      align="center"
      v-if="!this.$route.query.id"
      >
    </el-table-column>
    <el-table-column
      prop="fieldName"
      label="同步类型"
      align="center"
      >
    </el-table-column>
    <el-table-column
    prop="executeMs"
      label="同步耗时"
      align="center"
      >
    </el-table-column>
      <el-table-column
      prop="success"
      label="同步状态"
      align="center"
      >
       <template slot-scope="scope">
         <span>{{scope.row.success==0 ?'失败':'成功'}}</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      >
      <template slot-scope="scope">
         <a style="color:#58a4f3;"  href="javascript:void(0)" @click="findInfo(scope.row)">详情</a>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="备注">
      <template>
        <span>无</span>
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
</template>
<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      logList: [],
      detialInfoVisible: false,
      detialInfo: {},
      currentDateVal: '',
      weekstart: '',
      format: '',
      value: '',
      inputValue: '',
      openPicker: false,
      logParam: {
        selectValue: '',
        dateType: '',
        actionType: '',
        name: ''
      },
      pickerOptions: {
        disabledDate (time) {
          // 月初
          const now = new Date()
          const startDate = new Date(now.getFullYear(), now.getMonth(), 1)

          return time.getTime() > Date.now() - 8.64e6
        },
        shortcuts: null
      }

    }
  },
  created () {
    let datefilters = this.$options.filters['date'](
      new Date().getTime(),
      'yyyy-MM-dd'
    )
    this.date = datefilters
    this.weekstart = datefilters

    this.getGrid()
  },
  mounted () {
    if (this.$route.query.id) {
      this.pushBreadcrumb({
        name: '应用日志',
        parent: {
          name: 'AppManagement',
          query: {
            type: 'back'
          }
        }
      })
    }
  },
  methods: {
     ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    selectChange (val) {
      this.date = ''
      this.currentDateVal = ''
      this.openPicker = false
      let todayDate = new Date()
      if (val && val.length > 1) {
        this.openPicker = true
        this.logParam.dateType = val[0]
        this.value = val[1]
        this.format = val[2]
        // return false
      } else if (val[0] === 'yesterday') {
        todayDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
        this.logParam.dateType = val[0]
      }
      this.date = this.$options.filters['date'](
        todayDate.getTime(),
        'yyyy-MM-dd'
      )
       if(val[0]=='month'){
        todayDate=new Date(todayDate.setMonth(todayDate.getMonth()))
       this.date = this.$options.filters['date'](
        todayDate.getTime(),
        'yyyy-MM'
      )
      }
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
        page: this.page.current,
        limit: this.page.limit,
        type: this.logParam.dateType === 'month' ? 4 : 0
      }

      if (this.$route.query.id) {
        data.appId = this.$route.query.id
      }

      if (Array.isArray(this.date)) {
        data.date = this.date[0]
        data.endDate = this.date[1]
      } else {
        data.date = this.date
      }

      api[urlNames['findPushLoggers']](data).then(res => {
        this.page.total = res.total
        res.data.forEach(val => {
          if (val.dataType === 1) {
            val.fieldName = '用户变更数据'
          }
          if (val.dataType === 2) {
            val.fieldName = '用户身份变更数据'
          }
          if (val.dataType === 3) {
            val.fieldName = '部门变更数据'
          }
          if (val.dataType === 4) {
            val.fieldName = '单位变更数据'
          }
          if (val.dataType === 5) {
            val.fieldName = '视图变更数据'
          }
        })
        this.logList = res.data
      })
    },
    findInfo (val) {
      this.detialInfo = val
      this.detialInfoVisible = true
    }
  },
  computed: {
    ...mapState(['application'])
  }

}
</script>
<style scoped lang="less">
@import "./index";
.empty {
  p {
    margin: 0;
    font-size: 0px;
    text-align: center;
    line-height: 16px!important;
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
