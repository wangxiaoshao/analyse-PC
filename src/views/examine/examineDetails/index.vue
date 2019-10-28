<template>
  <div class="site-module mod-application-config">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="12">
        <div style="color: #909399;padding-left: 10px;padding-top: 16px">审批编码：2029200000009</div>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button type="info" @click="showAddDialog">查看详情</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <site-table :tableConfig="tableConfig"
                :operate="operate"
                :tableData="tableDetailData">
      <el-button slot="operate" size="mini" type="text" >不通过</el-button>
      <el-button slot="operate" size="mini" type="text" >通过</el-button>
    </site-table>

    <edit-dialog :visible="editDialogVisible"
                 :config-type="type"
                 :current="currentEdit"
                 :dialogTitle="dialogTitle"
                 @refreshList="getGrid"
                 @close="closeEditDialog"></edit-dialog>
    <el-row :gutter="20">
      <el-col :span="12" :offset=20>
        <div style="margin-top: 20px">
          <el-button type="primary" plain @click="passExamine">通过</el-button>
          <el-button type="info" plain @click="noPassExamine">不通过</el-button>
        </div>
      </el-col>
    </el-row>

    <!--添加dialog-->
    <edit-dialog
      :visible="addDialogVisible"
      :config-type="type"
      @refreshList="getGrid"
      @close="closeAddDialog"></edit-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import EditDialog from '../components/EditDialog'
import SiteTable from '@src/components/SiteTable/index.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, SiteTable },
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      currentEdit: null,
      editDialogVisible: false,
      addDialogVisible: false,
      dialogTitle: '审核意见',
      type: 'content',
      loading: true,
      searchQuery: {
        type: ''
      },
      list: [],
      configData: {
        content: [],
        'quick-link': [],
        todo: []
      },
      dictionaryNameList: [],
      tableConfig: {
        workPhone: {
          key: 1,
          field: 'workPhone',
          tooltip: false,
          formatter: this.formatter,
          label: '单位电话',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        content: {
          key: 2,
          field: 'content',
          tooltip: true,
          formatter: this.formatter,
          label: '原值',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        applyTime: {
          key: 3,
          field: 'applyTime',
          tooltip: false,
          formatter: this.formatter,
          label: '变更值',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        empty: {
          key: 4,
          field: 'empty',
          tooltip: false,
          formatter: this.formatter,
          label: '',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 50
        },
        workName: {
          key: 5,
          field: 'workName',
          tooltip: false,
          formatter: this.formatter,
          label: '单位名称',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        content2: {
          key: 6,
          field: 'content',
          tooltip: true,
          formatter: this.formatter,
          label: '原值',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        applyTime2: {
          key: 7,
          field: 'applyTime',
          tooltip: false,
          formatter: this.formatter,
          label: '变更值',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
      },
      tableDetailData: [],
      tableCheckbox: true,
      operate: false
    }
  },
  computed: {
    ...mapState(['application', 'examine'])
  },
  created () {
    console.log(this.examine.detail)
    this.tableDetailData.push(this.examine.detail)
  },
  mounted () {
    this.pushBreadcrumb({
      name: '查看明细',
      parent: {
        name: this.examine.backPath,
        query: {
          type: 'back'
        }
      }
    })
    this.getGrid()
  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_EXAMINE_DETAIL']),
    passExamine () {
      this.editDialogVisible = true
    },
    noPassExamine () {
      this.editDialogVisible = true
    },
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    closeEditDialog () {
      this.editDialogVisible = false
    },
    closeAddDialog () {
      this.addDialogVisible = false
    },
    typeChange () {
      // this.page.current = 1
      this.$nextTick(() => {
        this.list = this.configData[this.type]
        // this.getGrid()
      })
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    showEditDialog (row) {
      this.currentEdit = JSON.parse(JSON.stringify(row))
      this.editDialogVisible = true
    },
    getGrid () {
      this.loading = true
      let data = {
        // page: this.page.current,
        // pageSize: this.page.limit,
        parentApp: this.$route.params.id,
        type: this.type
      }
      api[urlNames['getApplicationConfig']](data).then((res) => {
        this.loading = false
        this.configData = res.result
        this.list = this.configData[this.type]
        // this.page.total = res.Result.total_items
      }, () => {
        this.loading = false
        this.list = []
        // this.page.total = 0
      })
    },
    handleAction (action, row) {
      let actionName = '删除'
      let actionUrl = 'deleteApplication'
      let data = {
        id: row.id,
        type: this.type
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


