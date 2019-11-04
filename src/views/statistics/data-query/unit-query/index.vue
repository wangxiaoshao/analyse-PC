<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="24">
        <el-row :gutter="10" type="flex">
          <el-col :span="4">
            <el-input placeholder="单位名称" v-model="searchQuery.keyword" clearable @change="getGrid">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="单位ID" v-model="searchQuery.keyword" clearable @change="getGrid">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="上级名称" v-model="searchQuery.keyword" clearable @change="getGrid">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="上级ID" v-model="searchQuery.keyword" clearable @change="getGrid">
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-input placeholder="标签" v-model="searchQuery.keyword" clearable @change="getGrid">
            </el-input>
          </el-col>
          <el-col :span="4" class="text-right">
            <el-button type="primary" plain>查询</el-button>
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
            <el-button size="mini" type="text" @click="goConfig(slotScope.row)">查看明细</el-button>
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
import EditDialog from '../../components/EditDialog'
import ConfigDialog from '../../components/EditDialog'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import SiteTable from '@src/components/SiteTable/index.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, ConfigDialog, SiteTable },
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
        applyName: {
          key: 1,
          field: 'applyName',
          tooltip: false,
          formatter: this.formatter,
          label: '单位名称',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        content: {
          key: 2,
          field: 'content',
          tooltip: true,
          formatter: this.formatter,
          label: '单位ID',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        applyTime: {
          key: 3,
          field: 'applyTime',
          tooltip: false,
          formatter: this.formatter,
          label: '统一单位编码',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        reason: {
          key: 4,
          field: 'reason',
          tooltip: false,
          formatter: this.formatter,
          label: '单位管理员',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        state: {
          key: 5,
          field: 'state',
          tooltip: false,
          formatter: this.formatter,
          label: '上级单位',
          sortable: true,
          showOverflowTooltip: false,
          minWidth: 100
        },
        parentId: {
          key: 6,
          field: 'parentId',
          tooltip: false,
          formatter: this.formatter,
          label: '上级ID',
          sortable: true,
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
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_EXAMINE_SEARCH_QUERY(this.searchQuery)
      this.SET_EXAMINE_TABLEDATA(this.tableData) // 存储当前页面table的数据列表
      this.SET_EXAMINE_DETAIL(row) // ExamineDetails页面需要用到的当前列表中点击项的数据
      this.SET_EXAMINE_BACKPATH(this.$route.name) // ExamineDetails页面需要用到的当前列表中点击项的数据
      this.$router.push({
        name: 'ExamineDetails',
        params: { parentCode: 1910281645 }
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


