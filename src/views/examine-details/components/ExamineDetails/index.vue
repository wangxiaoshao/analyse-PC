<template>
  <div class="site-module mod-application-config">
    <el-row class="operator-row">
      <el-col :span="24" class="text-right">
        <el-button type="info" @click="jumpDetailPage($route.params.type)">查看详情</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <site-table :tableConfig="tableConfig"
                :tableHeight="tableHeight"
                :mergeConfig="mergeConfig"
                :operateWidth="operateWidth"
                :operate="operate"
                :tableData="tableData">
      <template slot="appendPersonalColumn">
        <el-table-column label="申请原因" align="center">
          <template>
            <span>{{reason}}</span>
          </template>
        </el-table-column>
        <el-table-column label="审核意见" align="center" v-if="!isShowSuggest">
          <template>
            <span>{{message}}</span>
          </template>
        </el-table-column>
      </template>
    </site-table>

    <edit-dialog :visible="editDialogVisible"
                 :config-type="type"
                 :current="currentEdit"
                 :dialogTitle="dialogTitle"
                 :auditResult="auditResult"
                 @refreshList="getGrid"
                 @close="closeEditDialog"></edit-dialog>
    <el-row :gutter="20" v-if="isShowSuggest">
      <el-col :span="12" :offset=19>
        <div style="margin-top: 40px">
          <el-button type="primary" plain @click="openExamineDialog(1)" >通过</el-button>
          <el-button type="info" plain @click="openExamineDialog(0)"  style="margin-left: 40px">不通过</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import SiteTable from '@src/components/SiteTable/index.vue'
import tableConfig from './tableConfig'
import { api, urlNames } from '@src/api'
import EditDialog from '../EditDialog/index'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, SiteTable },
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      tableConfig,
      reason: '',
      message: '',
      tableData: [],
      currentEdit: null,
      editDialogVisible: false,
      dialogTitle: '审核意见',
      type: 'content',
      loading: true,
      isShowSuggest: false,
      auditResult: false,
      tableHeight: null,
      mergeConfig: [
        {
          ele: 'col',
          eleIndex: 4,
          rowspan: 4,
          colspan: 1,
        },
        {
          ele: 'col',
          eleIndex: 3,
          rowspan: 4,
          colspan: 1,
        },
      ],
      operateWidth: 100,
      tableCheckbox: true,
      operate: false
    }
  },
  computed: {
    ...mapState(['application', 'examine'])
  },
  created () {
    if (this.$route.name === 'WaitApprovalDetail') {
      this.isShowSuggest = true
    }
  },
  mounted () {
    this.pushBreadcrumb({
      name: this.isShowSuggest ? '去审核' : '查看明细',
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
    getGrid () {
      api[urlNames['getAuditDetailsById']]({
        id: this.$route.params.id,
        type: this.$route.params.type
      }).then((res) => {
        this.reason = res.data.reason
        this.message = res.data.message
        this.tableData = res.data.changeFields
      }, () => {
        this.gridData = []
      })
    },
    openExamineDialog (val) {
      this.auditResult = val
      this.editDialogVisible = true
    },
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    closeEditDialog () {
      this.editDialogVisible = false
    },
    typeChange () {
      this.$nextTick(() => {
        this.getGrid()
      })
    },
    // TODO 需要按父导航进行跳转
    jumpDetailPage (type) { // type = 1 || 3 || 4
      let name = 'WaitApprovalPersonDetail'
      switch (type) {
        case 1:
          name = 'WaitApprovalPersonDetail'
          break
        case 3:
          name = 'DepartmentDetail'
          break
        case 4:
          name = 'UnitDetail'
          break
        default :
          break
      }
      this.$router.push({
        name: name,
        params: {
          pathName: this.$route.path,
          id: this.$route.params.id,
          type: this.$route.params.type
        }
      })
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>


