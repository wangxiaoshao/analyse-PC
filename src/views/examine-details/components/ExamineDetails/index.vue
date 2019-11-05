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
              <div>{{scope.row.changeFields.name.beforeChangeValue}}</div>
            </template>
          </el-table-column>
          <el-table-column label="变更值"  align="center">
            <template slot-scope="scope">
              <div>{{scope.row.changeFields.name.afterChangeValue}}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="单位电话"  align="center">
          <el-table-column
            align="center"
            prop="name"
            label="原值">
            <template slot-scope="scope">
              <div>{{scope.row.changeFields.phone.beforeChangeValue}}</div>
            </template>
          </el-table-column>
          <el-table-column label="变更值"  align="center">
            <template slot-scope="scope">
              <div>{{scope.row.changeFields.phone.afterChangeValue}}</div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          prop="date"
          label="申请原因"
          width="150">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.reason" placement="top">
              <div>{{scope.row.reason}}</div>
            </el-tooltip>
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
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
import EditDialog from '../EditDialog/index'
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
    }
  },
  computed: {
    ...mapState(['application', 'examine'])
  },
  created () {
    if (this.$route.name === 'WaitApprovalDetail') {
      this.isWaitApproval = true
    }
  },
  mounted () {
    console.log('exD', this.examine.backPath)
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
      this.$nextTick(() => {
        this.getGrid()
      })
    },
    jumpDetailPage () {
      this.$router.push({
        name: 'DepartmentDetail',
        params: { id: 1910291139 }
      })
    },
    getGrid () {
      api[urlNames['getAuditDetailsById']]({
        id: this.$route.id
      }).then((res) => {
        let arrLen = res.data.changeFields.length,
          obj = {}
        for (let i = 0; i < arrLen; i++) {
          let key = res.data.changeFields[i].fieldName,
            val = res.data.changeFields[i]
          obj[key] = val
        }
        res.data.changeFields = obj
        this.gridData.push(res.data)
      }, () => {
        this.gridData = []
      })
    },
  }
}
</script>
<style lang="less">
  @import "index";
</style>


