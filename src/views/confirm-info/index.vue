<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
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
      <el-table :data="gridData"  height="250">
        <el-table-column
          width="120"
          property="name"
          align="center"
          label="单位主要领导">
        </el-table-column>
        <el-table-column
          width="120"
          property="counts"
          align="center"
          label="单位主要人数">
        </el-table-column>
        <el-table-column
          width="120"
          property="counts"
          align="center"
          label="单位在职人数">
        </el-table-column>
        <el-table-column
          width="120"
          property="counts"
          align="center"
          label="单位兼职人数">
        </el-table-column>
        <el-table-column
          width="120"
          property="counts"
          align="center"
          label="单位挂职人数">
        </el-table-column>
        <el-table-column
          width="120"
          property="counts"
          align="center"
          label="单位调出人数">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import EditDialog from '../examine-details/components/EditDialog'
import ConfigDialog from '../examine-details/components/EditDialog'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import SiteTable from '@src/components/SiteTable/index.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, ConfigDialog, SiteTable },
  mixins: [handleTable],
  data () {
    return {
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
      tableConfig: {
        order: {
          key: 0,
          field: 'order',
          tooltip: false,
          formatter: this.formatter,
          label: '序号',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 50
        },
        workName: {
          key: 1,
          field: 'workName',
          tooltip: false,
          formatter: this.formatter,
          label: '单位名称',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        unitLeader: {
          key: 2,
          field: 'unitLeader',
          tooltip: true,
          formatter: this.formatter,
          label: '单位主要领导',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        confirmMonth: {
          key: 3,
          field: 'confirmMonth',
          tooltip: false,
          formatter: this.formatter,
          label: '确认月份',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        state: {
          key: 4,
          field: 'state',
          tooltip: false,
          formatter: this.formatter,
          label: '确认状态',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        confirmTime: {
          key: 5,
          field: 'confirmTime',
          tooltip: false,
          formatter: this.formatter,
          label: '确认时间',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        confirmStaff: {
          key: 6,
          field: 'confirmStaff',
          tooltip: false,
          formatter: this.formatter,
          label: '确认人员',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        }
      },
      tableData: [],
      tableHeight: 200,
      operateWidth: 100,
      tableCheckbox: true,
      operate: true
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
    this.getMyAuditList()
  },
  methods: {
    ...mapMutations([
      'SET_APPLICATION_PAGE',
      'SET_EXAMINE_TABLEDATA',
      'SET_EXAMINE_DETAIL',
      'SET_EXAMINE_SEARCH_QUERY',
      'SET_EXAMINE_BACKPATH']),
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
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    getMyAuditList () {
      api[urlNames['getMyAuditList']]().then((res) => {
        this.tableData = res.data
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
      this.dialogVisible = true
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
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
  @import "index";
</style>


