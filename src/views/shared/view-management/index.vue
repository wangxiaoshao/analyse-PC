<template>
  <div class="view-management">
    <div>
      <el-button type="primary" @click="createView">创建视图</el-button>
    </div>
    <div class="table">
      <el-table
        ref="singleTable"
        :data="viewList"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          property="name"
          label="视图名称"
          align="center"
          width="120">
        </el-table-column>
<!--        <el-table-column-->
<!--          property="name"-->
<!--          label="视图ID"-->
<!--          align="center"-->
<!--          width="120">-->
<!--        </el-table-column>-->
        <el-table-column
          property="time"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          property="viewAdmin"
          align="center"
          label="视图管理员">
        </el-table-column>
        <el-table-column
          property="stateName"
          align="center"
          label="启用状态">
        </el-table-column>
        <el-table-column
          property="remark"
          align="center"
          label="备注说明">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-button @click="seleceDialog.selectMenmberFlag = true">选人组件</el-button>
    <candidate-dialog @closeselectMenmber="closeselectMenmber" :seleceDialog="seleceDialog"></candidate-dialog>
  </div>
</template>

<script>
import CandidateDialog from '@src/components/CandidateDialog/CandidateDialog.vue'
import { api, urlNames } from '@src/api'
export default {
  name: 'ViewManagement',
  components: {
    CandidateDialog
  },
  data () {
    return {
      total: 0, // 总页码
      viewList: [],
      currentPage: 1,
      currentRow: null,
      seleceDialog: {
        selectMenmberTitle: '选人组件', // 选人组件标题
        selectMenmberFlag: false, // 是否显示弹窗，
        isSingleSelect: false // 是否为单选框  false为多选，true为单选
      }
    }
  },
  created () {
    this.getViewList(1, 10)
  },
  methods: {
    getViewList (page, limt) {
      api[urlNames['getSharedManagement']]({
        page: page,
        limit: limt
      }).then((res) => {
        res.data.forEach(item => {
          if (item.state === 0) {
            item.stateName = '否'
          } else if (item.state === 0) {
            item.stateName = '是'
          }
        })
        this.total = parseInt(res.total)
        this.viewList = res.data
      })
    },
    // 跳转创建视图
    createView () {
      this.$router.push({ name: 'CreateView' })
    },
    closeselectMenmber () {
      this.seleceDialog.selectMenmberFlag = false
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentPageChange (val) {
      console.log(`当前页: ${val}`)
    }
  }

}
</script>

<style scoped lang="less">
@import 'index.less';
</style>
