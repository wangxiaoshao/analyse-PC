
<template>
  <div class="personal-log">
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
         <el-form-item v-if="showFindBtn">
             <span class="title">分类  </span>
                <el-select size='medium'
                  placeholder="请选择日志类型"
                  @change="logChange"
                  v-model="logParam.actionType"
                >
                <el-option
                  v-for="item in logList"
                  :key="item.type"
                  :label="item.text"
                  :value="item.type"
                ></el-option>
              </el-select>
         </el-form-item>
          <el-form-item v-if="showFindBtn">
           <span class="title">关键词 </span>
            <el-input  placeholder="请输入搜索关键词" v-model="logParam.name" @blur="iptChange" prefix-icon="el-icon-search" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item v-if="showFindBtn">
           <el-button type="primary" @click="findCondition">查询</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="log-table">
      <el-table :data="tableData" stripe border align="center" style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <template v-if="loginLog === 1 || loginLog === 2 || !loginLog">
          <el-table-column prop="actionTime" label="时间"></el-table-column>
          <el-table-column prop="userName" label="操作人"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
        </template>
        <template v-if="loginLog === 3">
          <el-table-column prop="accessTime" label="时间"></el-table-column>
          <el-table-column label="日志类型">
            <template slot-scope>
              <span>系统错误</span>
            </template>
          </el-table-column>
          <el-table-column prop="path" label="接口标识"></el-table-column>
        </template>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a
              href="javascript:void(0);"
              style="color:#FC7049;font-size:12px"
              @click="opendetialInfo(scope.row)"
            >详情</a>
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
      <el-dialog :visible.sync="detialInfoVisible" width="420px">
        <div slot="title" style="padding:20px">
          日志详情
          <i class="el-icon-document-copy" style="color:#FC7049"></i>
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
                <div class="table-td">{{detialInfoForm.description}}</div>
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
  props: ['loginLog','showFindBtn'],
  data () {
    let logAry=[
      {type:1,text:'登录日志'},
      {type:20,text:'创建用户'},
      {type:21,text:'更新用户'},
      {type:22,text:'删除用户'},
      {type:23,text:'添加用户身份'},
      {type:24,text:'修改身份'},
      {type:25,text:'删除身份'},
      {type:26,text:'创建用户扩展属性'},
      {type:27,text:'修改用户扩展属性'},
      {type:28,text:'创建用户调出'},
      {type:29,text:'创建用户账号'},
      {type:30,text:'修改用户账号'},
      {type:31,text:'修改用户密码'},
      {type:32,text:'创建用户标签'},
      {type:40,text:'创建部门'},
      {type:41,text:'修改部门'},
      {type:42,text:'删除部门'},
      {type:43,text:'创建部门标签'},
      {type:50,text:'创建单位'},
      {type:51,text:'修改单位'},
      {type:52,text:'删除单位'},
      {type:53,text:'创建单位领导'},
      {type:54,text:'创建单位标签'},
      {type:55,text:'创建单位区域'},
      {type:56,text:'删除单位区域'},
      {type:60,text:'创建视图'},
      {type:61,text:'修改视图'},
      {type:62,text:' 创建视图草稿'},
      {type:63,text:' 删除视图草稿'},
      {type:64,text:'修改视图草稿'},
      {type:70,text:'创建视图节点'},
      {type:71,text:' 删除视图节点'},
      {type:72,text:'修改视图节点'},
      {type:73,text:'添加部门节点'},
      {type:74,text:' 添加单位节点'},
      {type:80,text:'添加角色'},
      {type:81,text:'修改角色'},
      {type:82,text:'删除角色'},
      {type:83,text:'添加角色权限'},
      {type:84,text:'添加角色成员'}
    ]
    return {
      tableData: [],
      detialInfoVisible: false,
      logList:logAry,
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
      systemError: '系统错误',
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
      logParam:{
        selectValue:'',
        dateType:'',
        actionType:'',
        name:''
      },

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
    // console.log(' this.loginLog:', this.loginLog)
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
        return false
      } else if (val[0] === 'yesterday') {
        todayDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
        this.logParam.dateType = val[0]
      }
      this.date = this.$options.filters['date'](
        todayDate.getTime(),
        'yyyy-MM-dd'
      )
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
    logChange(val){
      this.logParam.actionType=val
       this.getGrid()
    },
    iptChange(){
      if(this.logParam.name!==''){
         this.getGrid()
      }
    },
    getLoggerTypeList(){
       api[urlNames['findLoggerTypeList']]().then(
        res => {
         this.logList=res.data
        })
    },
    getGrid () {
      let data = {
        date: this.date,
        type: this.logParam.dateType === 'month' ? 4 : 0, // 后端需要传输的数据类型 月份type：4 || 天：0
        page: this.page.current,
        limit: this.page.limit
      }
      let logUrl = ''
      if (this.loginLog === 1) {
        logUrl = 'getDataLogList'
      } else if (this.loginLog === 2) {
        logUrl = 'getDataLogList'
        data.actionType=this.logParam.actionType
        data.name=this.logParam.name
      } else if (this.loginLog === 3) {
        logUrl = 'findLoggerApiAccessList'
      } else {
        logUrl = 'findPersonalLoggerList'
      }
      api[urlNames[logUrl]](data).then(
        res => {
          this.tableData = res.data
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
    findCondition(){
      this.getGrid()
    }
  }
}

</script>
<style lang="less" scoped>
@import "index";
</style>
