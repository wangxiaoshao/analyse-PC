<template>
  <div class="site-module mod-application-config">
    <el-row class="operator-row">
      <el-col :span="12">
        <div style="color: #909399;padding-left: 10px;padding-top: 16px">审批编码：2029200000009</div>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button type="info" @click="jumpDetailPage">查看详情</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table :data="gridData">
      <template>
        <el-table-column label="单位名称"  align="center">
          <el-table-column
            align="center"
            prop="name"
            label="原值">
            <template slot-scope="scope">
              <div>{{scope.row.name.beforeChangeValue}}</div>
            </template>
          </el-table-column>
          <el-table-column label="变更值"  align="center">
            <template slot-scope="scope">
              <div>{{scope.row.name.afterChangeValue}}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="单位电话"  align="center">
          <el-table-column
            align="center"
            prop="name"
            label="原值">
            <template slot-scope="scope">
              <div>{{scope.row.phone.beforeChangeValue}}</div>
            </template>
          </el-table-column>
          <el-table-column label="变更值"  align="center">
            <template slot-scope="scope">
              <div>{{scope.row.phone.afterChangeValue}}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="申请原因"
          width="150">
          <template slot-scope="scope">
            <div>{{scope.row.reason}}</div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!isWaitApproval"
          align="center"
          prop="date"
          label="审核意见"
          width="150">
          <template slot-scope="scope">
            <div>{{scope.row.message}}</div>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <edit-dialog :visible="editDialogVisible"
                 :config-type="type"
                 :current="currentEdit"
                 :dialogTitle="dialogTitle"
                 @refreshList="getGrid"
                 @close="closeEditDialog"></edit-dialog>
    <el-row :gutter="20" v-if="isWaitApproval">
      <el-col :span="12" :offset=19>
        <div style="margin-top: 40px">
          <el-button type="primary" plain @click="passExamine" >通过</el-button>
          <el-button type="info" plain @click="noPassExamine"  style="margin-left: 40px">不通过</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import EditDialog from '../EditDialog/index'
import SiteTable from '@src/components/SiteTable/index.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog },
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      gridData: [],
      currentEdit: null,
      editDialogVisible: false,
      dialogTitle: '审核意见',
      type: 'content',
      loading: true,
      isWaitApproval: false,
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
    }
  },
  computed: {
    ...mapState(['application', 'examine'])
  },
  created () {
    this.getAuditDetails()
    if (this.$route.name === 'WaitApprovalDetail') {
      this.isWaitApproval = true
    }
  },
  mounted () {
    this.pushBreadcrumb({
      name: this.isWaitApproval ? '去审核' : '查看明细',
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
    getAuditDetails () {
      api[urlNames['getAuditDetailsById']]({
        id: this.$route.id
      }).then((res) => {
        let obj = {
          name: res.data[0],
          phone: res.data[1]
        }
        console.log(obj)
        this.gridData.push(obj)
        this.loading = false
        // this.configData = res.result
        // this.list = this.configData[this.type]
        // this.page.total = res.Result.total_items
      }, () => {
        this.loading = false
        this.list = []
        // this.page.total = 0
      })
    },
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
    typeChange () {
      // this.page.current = 1
      this.$nextTick(() => {
        this.list = this.configData[this.type]
        // this.getGrid()
      })
    },
    jumpDetailPage () {
      this.$router.push({
        name: 'DepartmentDetail',
        params: { id: 1910291139 }
      })
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
  @import "index";
</style>


