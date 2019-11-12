<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
    <el-row class="operator-row">
      <el-button size="small" type="primary" @click="getConfirmMemberList">确认机构人员信息</el-button>
    </el-row>
    <el-row class="operator-row">
      <el-col :span="18">
        <el-row :gutter="10" type="flex">
          <div class="block">
            <el-date-picker
              v-model="searchTimeValue"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <el-col :span="8">
            <el-select v-model="statusValue" clearable placeholder="选择确认状态">
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
                :tableIndex="tableIndex"
                :pageConfig="pageConfig"
                :operateWidth="operateWidth"
                :operate="operate"
                :tableData="tableData">
      <template slot-scope="{slotScope}" slot="status">
      </template>
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
                  :tableHeight="tableHeight"
                  :operateWidth="operateWidth"
                  :operate="operate"
                  :tableData="tableData">
      </site-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import EditDialog from '../../examine-details/components/EditDialog'
import ConfigDialog from '../../examine-details/components/EditDialog'
import handleTable from '@src/mixins/handle-table'
import SiteTable from '@src/components/SiteTable/index.vue'
import tableConfig from './tableConfig'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, ConfigDialog, SiteTable },
  mixins: [handleTable],
  data () {
    return {
      tableConfig,
      gridData: [{
        counts: '1202',
        name: '王小虎'
      }],
      loading: true,
      statusOptions: [{
        value: '选项1',
        label: '已确认'
      },
      {
        value: '选项2',
        label: '未确认'
      },
      {
        value: '选项3',
        label: '待确认'
      }],
      statusValue: '',
      searchTimeValue: '',
      list: [],
      areaList: [
        {
          'id': 1,
          'code': '1',
          'name': '单位'
        },
        {
          'id': 2,
          'code': '2',
          'name': '部门'
        },
        {
          'id': 3,
          'code': '3',
          'name': '人员'
        }
      ],
      dictionaryNameList: [],
      dialogVisible: false,
      currentEdit: null,
      currentParent: {
        description: '',
        label: '',
        remarks: '',
        orderNum: '',
        type: '',
        value: ''
      },
      dialogTableConfig: {
        text: {
          key: 0,
          field: 'text',
          tooltip: false,
          label: '名称',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 50
        },
        total: {
          key: 1,
          field: 'total',
          tooltip: false,
          label: '值',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
      },
      tableData: [],
      tableHeight: null,
      tableIndex: true,
      pageConfig: {},
      mergeConfig: null,
      operateWidth: 100,
      tableCheckbox: true,
      operate: false
    }
  },
  computed: {
    ...mapState(['application', 'examine'])
  },
  created () {
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(this.searchQuery, this.examine.searchQuery)
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
    getConfirmMemberList () {
      api[urlNames['getConfirmMemberList']]().then((res) => {
        this.tableData = res.data
        this.dialogVisible = true
      }, () => {
        this.tableData = []
        this.page.total = 0
      })
    },
    scrollStyle () {
      return {
        height: this.$store.state.app.windowHeight - 30 + 'px'
      }
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
      this.loading = true
      let data = {
        page: this.page.current,
        limit: this.page.limit
      }
      this.pageConfig = data
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
        params: { id: row.id }
      })
    },
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>


