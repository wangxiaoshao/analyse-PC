
<template>
  <div class="addresslist-log">
    <div class="log-header">
      <el-form inline>
         <el-form-item>
            <span class="title">时间</span>
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
         <el-form-item>
           <span class="title">查询人 </span>
            <el-input  placeholder="请输入查询人" v-model="logParam.userName" @blur="iptChange" clearable prefix-icon="el-icon-search" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item>
           <span class="title">被查询人 </span>
            <el-input  placeholder="请输入被查询人" v-model="logParam.toUserName" @blur="iptChange" clearable prefix-icon="el-icon-search" style="width:160px"></el-input>
          </el-form-item>
         <el-form-item>
             <span class="title">被查询手机号 </span>
                <el-input  placeholder="请输入被查询手机号" v-model="logParam.mobile" @blur="iptChange" clearable prefix-icon="el-icon-search" style="width:160px"></el-input>
              </el-select>
         </el-form-item>
          <el-form-item>
           <el-button type="primary" @click="findCondition">查询</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="log-table">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <template v-if="loginLog === 1 || loginLog === 2 || !loginLog">
          <el-table-column prop="actionTime" label="时间" align="center" min-width="100"></el-table-column>
          <el-table-column prop="userName" label="查询人" align="center"></el-table-column>
          <el-table-column prop="toUserName" label="被查询人" align="center"></el-table-column>
          <el-table-column prop="phone" label="被查询手机号" align="center"></el-table-column>
        </template>
        <template v-if="loginLog === 3">
          <el-table-column prop="accessTime" label="时间" align="center"></el-table-column>
          <!-- <el-table-column label="日志类型">
            <template slot-scope>
              <span>{{systemError}}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="path" label="接口标识" align="center"></el-table-column>
        </template>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span
             class="common-detialBtn"
              @click="opendetialInfo(scope.row)"
            >详情</span>
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
      <el-dialog :visible.sync="detialInfoVisible" width="700px">
        <div slot="title" style="padding:20px">
          日志详情
          <i class="el-icon-document-copy" style="color:#58a4f3"></i>
        </div>
        <template v-if="loginLog === 1 || loginLog === 2 || !loginLog">
           <el-form
              inline
              label-width="130px"
              class="systemDetial"
            >
              <el-form-item label="操作日期" >
                <div class="table-td">{{detialInfoForm.actionTime}}</div>
              </el-form-item>
              <el-form-item label="操作人标识">
                <div class="table-td">{{detialInfoForm.actionUid}}</div>
              </el-form-item>
              <el-form-item label="操作描述">
                <div class="table-td" style="color:red;">{{detialInfoForm.description}}</div>
              </el-form-item>
              <el-form-item label="操作事件标识">
                <div class="table-td">{{detialInfoForm.clientId}}</div>
              </el-form-item>
            </el-form>
        </template>
         <template v-if="loginLog === 3">
            <el-form
              inline
               label-width="110px"
            >
              <el-form-item label="操作日期">
                <div class="table-td">{{systemInfoForm.accessTime}}</div>
              </el-form-item>
              <el-form-item label="应用名称">
                 <div class="table-td">{{systemInfoForm.applicationName}}</div>
              </el-form-item>
              <el-form-item label="日志类型">
                <div class="table-td">{{systemError}}</div>
              </el-form-item>
              <el-form-item label="操作事件标识">
                <div class="overline" :title="systemInfoForm.path">
                 {{systemInfoForm.path}}
                </div>
              </el-form-item>
            </el-form>
        </template>

        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detialInfoVisible = false" width="120px">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [handleTable],
  props: ['loginLog', 'showFindBtn'],
  data () {
    return {
      tableData: [],
      detialInfoVisible: false,
      logList: [],
      detialInfoForm: {
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
      systemError: '接口调用异常',
      systemInfoForm: {
        id: null,
        accessTime: '',
        applicationName: '',
        waitTimeMs: '',
        uid: '',
        departmentId: '',
        orgId: '',
        success: null,
        method: '',
        path: '',
        queryString: '',
        userAgent: '',
        errorMessage: ''
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
      date: '',
      inputValue: '',
      format: '',
      logParam: {
        mobile: '',
        selectValue: '',
        dateType: '',
        actionType: '',
        name: '',
        keyword: '',
        userName: '',
        toUserName: ''
      },

      pickerOptions: {
        disabledDate (time) {
          // 月初
          const now = new Date()
          const startDate = new Date(now.getFullYear(), now.getMonth(), 1)

          // return time.getTime() > Date.now() - 8.64e6 || time.getTime() < startDate
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
    let datefilters = this.$options.filters['date'](
      new Date().getTime(),
      'yyyy-MM-dd'
    )
    this.date = datefilters
    this.weekstart = datefilters
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(
        this.searchQuery,
        this.application.searchQuery
      )
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_APPLICATION_SEARCH_QUERY({})
    }

    this.getLoggerTypeList()
    this.getGrid()
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
    logChange (val) {
      this.logParam.actionType = val
      this.getGrid()
    },
    iptChange () {
      if (this.logParam.name !== '') {
        this.getGrid()
      }
    },
    getLoggerTypeList () {
      api[urlNames['findLoggerTypeList']]().then(
        res => {
          this.logList = res.data
        })
    },
    getGrid () {

      let data = {
        date: '',
        timeType: this.logParam.dateType === 'month' ? 4 : 0, // 后端需要传输的数据类型 月份type：4 || 天：0
        mobile: this.logParam.mobile,
        page: this.page.current,
        limit: this.page.limit,
        userName: this.logParam.userName,
        toUserName: this.logParam.toUserName
      }
      // console.log('this.date：',this.date)
      if (Array.isArray(this.date)) {
        data.date = [this.date[0], this.date[1]]
        data.timeType = -1
      } else {
        data.date = [this.date]
      }

      let logUrl = 'findaddresslistLoggerList'
      api[urlNames[logUrl]](data).then(
        res => {
          this.tableData = res.data
          this.tableData.forEach((item, index) => {
            this.tableData[index]['description'] = item.name + '于' + ' ' + item.actionTime + ' ' + item.description
          })
          this.newsList = res.data
          this.page.total = res.total
        },
        () => {
          this.list = []
          this.page.total = 0
        }
      )
    },
    opendetialInfo (val) {
      this.detialInfoVisible = true
      if (this.loginLog === 1 || this.loginLog === 2 || !this.loginLog) {
        let info = {
          actionTime: val.actionTime.slice(0, 10),
          id: val.id
        }
        api[urlNames['findLoggerById']](info).then(
          res => {
            Object.assign(this.detialInfoForm, res.data)
          },
          () => {}
        )
      }
      if (this.loginLog === 3) {
        let infoObj = {
          accessTime: val.accessTime.slice(0, 10),
          id: val.id
        }
        api[urlNames['findLoggerApiAccessById']](infoObj).then(
          res => {
            Object.assign(this.systemInfoForm, res.data)
          },
          () => {}
        )
      }
    },
    findCondition () {
      this.getGrid()
    }
  }
}

</script>
<style lang="less" scoped>
@import "index";
</style>
