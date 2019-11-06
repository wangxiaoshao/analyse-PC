<template>
  <div class="site-module mod-dictionary">
    <el-row class="operator-row" :gutter="24">
      <el-col :span="24" class="text-right">
        <el-button type="primary" @click="addDictionary">创建字典</el-button>
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
        <el-button size="mini" type="text" @click="goConfig(slotScope.row)">详情</el-button>
        <el-button size="mini" type="text" @click="goConfig(slotScope.row)">编辑</el-button>
        <el-button size="mini" type="text" @click="goConfig(slotScope.row)">删除</el-button>
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
    <edit-dialog
      :visible="dialogVisible"
      :config-type="type"
      :dialogTitle="title"
      @refreshList="getGrid"
      @close="closeAddDialog"></edit-dialog>
    <dictionary-list
      :visible="dicDialogVisible"
      :config-type="type"
      :dialogTitle="dicTitle"
      @refreshList="getGrid"
      @close="closeAddDialog"></dictionary-list>
  </div>
</template>

<script type="text/ecmascript-6">
import EditDialog from '../components/EditDialog/index'
import DictionaryList from '../components/DictionaryList/index'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import SiteTable from '@src/components/SiteTable/index.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, DictionaryList, SiteTable },
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
      dictionaryNameList: [],
      dialogVisible: false,
      dicDialogVisible: false,
      type: '',
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
        dictName: {
          key: 1,
          field: 'dictName',
          tooltip: false,
          formatter: this.formatter,
          label: '字典名称',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        dictId: {
          key: 2,
          field: 'dictId',
          tooltip: false,
          formatter: this.formatter,
          label: '字典ID',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        dictDescribe: {
          key: 3,
          field: 'dictDescribe',
          tooltip: true,
          formatter: this.formatter,
          label: '字典描述',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        isEnable: {
          key: 4,
          field: 'isEnable',
          tooltip: false,
          formatter: this.formatter,
          label: '启用状态',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        }
      },
      tableData: [],
      tableHeight: 200,
      operateWidth: 200,
      tableCheckbox: true,
      operate: true,
      title: '创建字典',
      dicTitle: '职级字段列表',
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
    addDictionary () {
      this.dialogVisible = true
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
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    search () {
      this.$nextTick(() => {
        this.page.current = 1
        this.getGrid()
      })
    },
    getGrid () {
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
      api[urlNames['dictionaryList']](data).then((res) => {
        this.loading = false
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.loading = false
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

    },
    goConfig (row) {
      this.dicDialogVisible = true
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    closeAddDialog (val) {
      this[val] = false
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


