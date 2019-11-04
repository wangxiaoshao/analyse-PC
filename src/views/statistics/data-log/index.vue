<template>
  <div class="data-log">
    <!--时间轴-->
    <el-row :style="{paddingLeft: '60px'}">
      <el-col :span="4">
        <div class="block">
          <el-select v-model="selectValue"
          slot="prepend"
          align="center"
          placeholder="今天"
          @change="selectChange(selectValue)">
          <el-option label="今天" :value="['today']"></el-option>
          <el-option label="昨天" :value="['yesterday']"></el-option>
          <el-option label="周" :value="['week', '周', 'yyyy 第 WW 周']"></el-option>
            <el-option label="月" :value="['month', '月', 'yyyy-DD']"></el-option>
          <el-option label="选择日期" :value="['date', '日期', 'yyyy-MM-DD']"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" :style="{width: '220px'}">
        <div v-if="selectValue[0] === 'today' || selectValue[0] === 'yesterday'">
          <el-input v-model="inputValue" :placeholder="date" :disabled="true">
            <i slot="prefix" class="el-input__icon el-icon-date"></i>
          </el-input>
        </div>
        <div class="block" v-else>
          <el-date-picker
            slot="append"
            v-model="currentDateVal"
            :type="dateType"
            :default-value="weekstart"
            :format="format"
            :placeholder="'选择'+value"
            @change="dateChange">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :style="{ marginLeft: '80px', marginTop: '20px'}">
        <div class="timeLine">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              placement="top"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>

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
    <!--编辑dialog-->
    <edit-dialog :visible="editDialogVisible"
                 :current="currentEdit"
                 :areaList="areaList"
                 @refreshList="getGrid"
                 @close="closeEditDialog"></edit-dialog>
    <!--添加dialog-->
    <edit-dialog
      :visible="addDialogVisible"
      :areaList="areaList"
      @refreshList="getGrid"
      @close="closeAddDialog"></edit-dialog>
    <!--配置dialog-->
    <config-dialog
      :visible="configDialogVisible"
      :areaList="areaList"
      @refreshList="getGrid"
      @close="closeConfigDialogVisible"></config-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import EditDialog from '../components/EditDialog'
import ConfigDialog from '../components/EditDialog'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import filters from '@src/filters'
import { dateTransform } from '@src/filters/dateTransform.js'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, ConfigDialog, filters},
  mixins: [handleTable],
  data () {
    return {
      loading: true,
      searchQuery: {
        areaId: '',
        status: '',
        keyword: ''
      },
      list: [],
      weekstart: '',
      areaList: [],
      dictionaryNameList: [],
      editDialogVisible: false,
      addDialogVisible: false,
      configDialogVisible: false,
      currentEdit: null,
      currentParent: {
        description: '',
        label: '',
        remarks: '',
        orderNum: '',
        type: '',
        value: ''
      },
      reverse: true,
      activities: [{
        content: '陈宇 修改了 贵州省人力资源管理局 的单',
        timestamp: '2018-04-15'
      },
      {
        content: '陈宇 修改了 贵州省人力资源管理局 的单',
        timestamp: '2018-04-13'
      },
      {
        content: '陈宇 修改了 贵州省人力资源管理局 的单',
        timestamp: '2018-04-13'
      },
      {
        content: '陈宇 修改了 贵州省人力资源管理局 的单',
        timestamp: '2018-04-13'
      },
      {
        content: '陈宇 登陆系统备份 4',
        timestamp: '2018-04-11'
      }],
      currentDateVal: '',
      selectValue: ['today'],
      date: '',
      inputValue: '',
      dateType: '',
      format: '',
      value: '',
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {
    this.date = dateTransform(new Date())
    this.weekstart = dateTransform(new Date())
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(this.searchQuery, this.application.searchQuery)
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_APPLICATION_SEARCH_QUERY({})
    }
    this.initQuery()
    this.getAreaList()
    this.getGrid()
  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    selectChange (val) {
      let todayDate = new Date()
      if (val && val.length > 1) {
        this.dateType = val[0]
        this.value = val[1]
        this.format = val[2]
        return false
      } else {
        todayDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
      }
      this.date = dateTransform(todayDate)
    },
    dateChange (val) {
      console.log(val)
    },
    initQuery () {
      let keys = Object.assign({}, this.$route.query)
      let len = keys.length
      for (let i = 0; i < len; i++) {
        let key = keys[i]
        let value = this.$route.query[key]
        if (this.page[key] !== undefined) {
          this.page[key] = value
        } else if (this.searchQuery[key] !== undefined) {
          this.searchQuery[key] = value
        }
      }
    },
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    getAreaList () {
      api[urlNames['getAreaList']]().then((res) => {
        this.areaList = res.data
      })
    },
    search () {
      this.$nextTick(() => {
        this.page.current = 1
        this.getGrid()
      })
    },
    getGrid () {
      this.loading = true
      let data = {
        page: this.page.current,
        pageSize: this.page.limit
      }
      let keys = Object.keys(this.searchQuery)
      let len = keys.length
      for (let i = 0; i < len; i++) {
        let key = keys[i]
        let value = this.searchQuery[key]
        if (typeof value !== 'number') {
          if (value) { data[key] = value }
        } else {
          data[key] = value
        }
      }
      api[urlNames['getApplicationList']](data).then((res) => {
        this.loading = false
        this.list = res.result.items
        this.page.total = res.result.total_items
      }, () => {
        this.loading = false
        this.list = []
        this.page.total = 0
      })
    },
    addChild (index, row) {
      this.currentParent.type = row.type
      this.currentParent.description = row.description
      this.currentParent.orderNum = row.orderNum + 10
      this.configDialogVisible = true
    },
    showEditDialog (row) {
      api[urlNames['getApplicationDetail']]({ id: row.id }).then((res) => {
        this.currentEdit = res.result[0]
        this.currentEdit.areaId = this.currentEdit.areaId.toString().split(',')
        this.editDialogVisible = true
      })
    },
    goConfig (row) {
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_APPLICATION_SEARCH_QUERY(this.searchQuery)
      this.$router.push({
        name: 'ExamineDetails',
        params: {
          id: 12
        }
      })
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    closeEditDialog () {
      this.editDialogVisible = false
    },
    closeAddDialog () {
      this.addDialogVisible = false
    },
    closeConfigDialogVisible () {
      this.configDialogVisible = false
    },
    handleAction (action, row) {
      let actionName = '删除'
      let actionUrl = 'deleteApplication'
      let data = {
        id: row.id,
        type: row.type
      }
      if (action === 'enable') {
        actionName = row.enable === 1 ? '停用' : '启用'
        actionUrl = 'toggleApplication'
        data.status = row.enable === 1 ? 0 : 1
      }
      this.$msgbox({
        message: `确认${actionName}？`,
        title: '提示',
        showCancelButton: true,
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = `${actionName}中...`
            api[urlNames[actionUrl]](data).then((res) => {
              instance.confirmButtonLoading = false
              this.$message.success(`${actionName}成功`)
              this.getGrid()
            }, (res) => {
              instance.confirmButtonLoading = false
            })
            done()
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      }).then(() => {

      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


