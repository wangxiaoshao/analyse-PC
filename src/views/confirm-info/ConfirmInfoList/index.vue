<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
    <el-row class="operator-row">
      <el-button
        size="small"
        type="primary"
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
              placeholder="请选择年份" @change="selectChange('timeField')">
            </el-date-picker>
          </div>
          <el-col :span="8">
            <el-select
              v-model="searchQuery.status"
              clearable
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
    <site-table :tableConfig="tableConfig"
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
        <el-button size="mini" type="text" @click="goConfig(slotScope.row)">人员明细</el-button>
      </template>
    </site-table>
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
        <el-col :span="12" :offset="8">
          <el-button type="primary" @click="handleConfirm">确认</el-button>
          <el-button :style="{marginLeft: '40px'}" @click="handleClose">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import SiteTable from '@src/components/SiteTable/index.vue'
import { filters } from '@src/filters'
import confirmedTable from './confirmedTable'
import unconfirmedTable from './unconfirmedTable'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { SiteTable, filters },
  mixins: [handleTable],
  data () {
    return {
      confirmedTable,
      unconfirmedTable,
      tableConfig: {},
      dialogTableConfig: {
        keyName: {
          key: 'keyName',
          tooltip: false,
          label: '名称',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 50
        },
        valueName: {
          key: 'valueName',
          tooltip: false,
          label: '值',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 50
        }
      },
      statusOptions: [{
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
      DialogOperate: false
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
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.tableData = Object.assign(this.tableData, this.examine.tableData)
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
      'SET_EXAMINE_BACKPATH']),
    selectChange (val) {
      if (val === 'timeField' && this.searchQuery.year) {
        this.searchQuery.year = this.$options.filters['date'](this.searchQuery.year.getTime(), 'yyyy')
      }
      console.log(this.searchQuery.status)
      this.tableConfig = this.searchQuery.status === 1 ? this.confirmedTable : this.unconfirmedTable
      console.log(this.tableConfig)
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
      this.$router.push({
        name: 'ConfirmInfoDetail',
        params: { id: row.id, month: row.month }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    handleConfirm () {
      let newDatefmt = this.$options.filters['date'](new Date().getTime(), 'yyyy-MM')
      let date = newDatefmt.split('-').join('')
      if (date) {
        api[urlNames['insertConfirmInfo']]({ date: date }).then((res) => {
          if (res && res.status === 0) {
            this.$message.success(`确认成功`)
          }
        })
        this.dialogVisible = false
      }
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>


