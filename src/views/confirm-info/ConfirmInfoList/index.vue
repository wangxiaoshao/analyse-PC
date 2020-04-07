<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
   
    <el-row class="operator-row">
      <el-button
        size="small"
        type="primary"
        :disabled="!app.confirmState || hasRight('orgMemberConfirm')" 
        @click="getConfirmMemberList"
        >确认机构人员信息
      </el-button>
    </el-row>
    <el-row class="operator-row">
      <el-col :span="18">
        <el-row :gutter="10" type="flex">
          <div class="block">
            <el-date-picker
              v-model="searchQuery.year"
              type="year"
              :clearable="dateClearable"
              placeholder="请选择年份"
              @change="selectChange('timeField')">
            </el-date-picker>
          </div>
          <el-col :span="8">
            <el-select
              v-model="searchQuery.status"
              placeholder="请选择确认状态"
              @change="selectChange">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--表格-->
    <site-table v-if="reRenderTable"
                :tableConfig="tableConfig"
                :tableHeight="tableHeight"
                :operateWidth="operateWidth"
                :operate="operate"
                :tableData="tableData">
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.status === 1" class="text-green">已确认</span>
          <span v-show="scope.row.status !== 1" class="text-red">未确认</span>
        </template>
      </el-table-column>
      <template slot-scope="{slotScope}" slot="operate">
        <el-button size="mini" type="text" @click="goConfig(slotScope.row)" :disabled="!hasRight('orgMemberConfirmAccess')">人员明细</el-button>
      </template>
    </site-table>
    <!--编辑dialog-->
    <el-dialog
      title="确认机构人员信息"
      :visible.sync="dialogVisible"
      width="50%"
      center
      :before-close="handleClose">
      <!--表格-->
      <site-table :tableConfig="dialogTableConfig"
                  :tableHeight="dialogTableHeight"
                  :operateWidth="operateWidth"
                  :operate="DialogOperate"
                  :tableData="DialogTableData">
      </site-table>
      <el-row :gutter="20" :style="{marginTop: '20px'}">
        <el-col :span="13" :offset="7">
          <el-button type="primary" @click="goFindDetial">查看详情</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
          <el-button  @click="handleClose">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import SiteTable from '@src/components/SiteTable/index.vue'
import confirmedTable from './confirmedTable'
import unconfirmedTable from './unconfirmedTable'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import HasRight from '@src/mixins/has-right'

export default {
  components: { SiteTable },
  mixins: [handleTable, HasRight],
  data () {
    return {
      reRenderTable: true,
      confirmedTable,
      unconfirmedTable,
      tableConfig: {},
      dialogTableConfig: {
        keyName: {
          key: 'keyName',
          tooltip: false,
          label: '信息确认',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 50
        },
        valueName: {
          key: 'valueName',
          tooltip: false,
          label: '结果',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 50
        }
      },
      statusOptions: [
        {
          value: 1,
          label: '已确认'
        },
        {
          value: 0,
          label: '未确认'
        }],
      searchQuery: {
        year: '',
        status: ''
      },
      list: [],
      dictionaryNameList: [],
      dialogVisible: false,
      defaultTime: '',
      tableData: [],
      DialogTableData: [],
      tableHeight: null,
      dialogTableHeight: 300,
      mergeConfig: null,
      operateWidth: 100,
      tableCheckbox: true,
      operate: true,
      DialogOperate: false,
      dateClearable: false
    }
  },
  computed: {
    ...mapState(['application', 'examine', 'app'])
  },
  created () {
    let datefilters = this.$options.filters['date'](new Date().getTime(), 'yyyy')
    this.defaultTime = datefilters
    this.searchQuery.year = datefilters
    this.searchQuery.status = 1
    this.tableConfig = this.confirmedTable
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(this.searchQuery, this.examine.searchQuery)
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_EXAMINE_SEARCH_QUERY({})
      this.SET_EXAMINE_TABLEDATA({})
      this.SET_EXAMINE_DETAIL({})
      this.SET_EXAMINE_BACKPATH({})
    }
    this.initQuery()
    this.getGrid()
  },
  methods: {
    ...mapMutations([
      'SET_APPLICATION_PAGE',
      'SET_EXAMINE_TABLEDATA',
      'SET_EXAMINE_DETAIL',
      'SET_EXAMINE_SEARCH_QUERY',
      'SET_EXAMINE_BACKPATH',
      'GET_CONFIRM_INFO']),
    selectChange (val) {
      if (val === 'timeField' && this.searchQuery.year) {
        this.searchQuery.year = this.$options.filters['date'](this.searchQuery.year.getTime(), 'yyyy')
      }
      if (this.searchQuery.status === 1) {
        this.tableConfig = this.confirmedTable
        this.operate = true
      } else {
        this.tableConfig = this.unconfirmedTable
        this.operate = false
      }
      this.reRenderTable = false
      setTimeout(() => {
        this.reRenderTable = true
      }, 100)
      this.getGrid()
    },
    getConfirmMemberList () {
      api[urlNames['getConfirmMemberList']]().then((res) => {
        this.DialogTableData = res.data
        this.dialogVisible = true
      }, () => {
        this.DialogTableData = []
        this.page.total = 0
      })
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
    search () {
      this.$nextTick(() => {
        this.page.current = 1
        this.getGrid()
      })
    },
    getGrid () {
      this.tableData = []
      let data = {
        page: this.page.current,
        limit: this.page.limit
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
      api[urlNames['getInfoConfirmList']](data).then((res) => {
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.tableData = []
        this.page.total = 0
      })
    },
    goConfig (row) {
      this.SET_EXAMINE_BACKPATH(this.$route.name)
      this.SET_EXAMINE_SEARCH_QUERY(this.searchQuery)
      this.$router.push({
        name: 'ConfirmInfoDetail',
        params: { id: row.id, month: row.month }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    goFindDetial(){
      this.$router.push(`/organization/organization-content/${this.app.option.user.orgNodeId}`)
   
    },
    handleConfirm () {
      let newDatefmt = this.$options.filters['date'](new Date().getTime(), 'yyyy-MM')
      let date = newDatefmt.split('-').join('')
      if (date) {
        api[urlNames['insertConfirmInfo']]({ date: date }).then((res) => {
          if (res && res.status === 0) {
            this.$message.success(`确认成功`)
            this.getGrid()
            this.confirmInfo()
          }
        })
        this.dialogVisible = false
      }
    },
    confirmInfo () {
      api[urlNames.popupWindow]().then((res) => {
        if (res) {
          this.GET_CONFIRM_INFO(res.data)
        }
      })
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>


