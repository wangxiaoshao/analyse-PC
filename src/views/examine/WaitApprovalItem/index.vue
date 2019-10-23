<template>
  <div class="site-module mod-application-config">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="12">
        <el-radio-group v-model="type" size="small" @change="typeChange">
          <div>审批编码：2029200000009</div>
        </el-radio-group>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button type="danger" @click="showAddDialog">查看详情</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <site-table :tableConfig="tableConfig"
                :operateWidth="operateWidth"
                :operate="operate"
                :tableData="tableData">
      <el-button slot="operate" size="mini" type="text" >不通过</el-button>
      <el-button slot="operate" size="mini" type="text" >通过</el-button>
    </site-table>
    <edit-dialog :visible="editDialogVisible"
                 :config-type="type"
                 :current="currentEdit"
                 @refreshList="getGrid"
                 @close="closeEditDialog"></edit-dialog>
    <!--添加dialog-->
    <edit-dialog
      :visible="addDialogVisible"
      :config-type="type"
      @refreshList="getGrid"
      @close="closeAddDialog"></edit-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handleTable'
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handleBreadcrumb.js'
import EditDialog from '../components/EditDialog'
import SiteTable from '@src/components/SiteTable/index.vue'

export default {
  components: { EditDialog, SiteTable },
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      currentEdit: null,
      editDialogVisible: false,
      addDialogVisible: false,
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
        item1: {
          key: 1,
          field: 'name',
          tooltip: true,
          formatter: this.formatter,
          label: '姓名',
          sortable: true,
          showOverflowTooltip: false,
          minWidth: 200
        },
        item2: {
          key: 2,
          field: 'age',
          tooltip: true,
          formatter: this.formatter,
          label: '年龄',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 200
        },
        item3: {
          key: 3,
          field: 'address',
          tooltip: true,
          formatter: this.formatter,
          label: '地址',
          sortable: true,
          showOverflowTooltip: false,
          minWidth: 200
        }
      },
      tableData: [{
        key: 1,
        field: 'address',
        date: '2016-05-02',
        name: '王',
        age: '10',
        address: '上海市普陀区金沙江路 1 弄'
      }],
      operateWidth: 300,
      tableCheckbox: true,
      operate: true
    }
  },
  computed: {
  },
  mounted () {
    this.pushBreadcrumb({
      name: '查看明细',
      parent: {
        name: 'WaitApprovalList',
        query: {
          type: 'back'
        }
      }
    })
    this.getGrid()
  },
  methods: {
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
        // this.page.total = res.result.total_items
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


