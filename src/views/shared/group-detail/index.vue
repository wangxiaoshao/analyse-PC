<template>
    <div class="group-detail">
      <div class="add-member">
        <el-button type="primary" @click="seleceDialog.selectMenmberFlag = true">添加成员</el-button>
      </div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          property="name"
          label="名称"
          align="center">
        </el-table-column>
        <el-table-column
          property="name"
          label="单位"
          align="center">
        </el-table-column>
        <el-table-column
          property="address"
          align="center"
          label="部门">
        </el-table-column>
        <el-table-column
          property="name"
          align="center"
          label="电话">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="140">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <candidate-dialog @closeselectMenmber="closeselectMenmber" :seleceDialog="seleceDialog"></candidate-dialog>
    </div>
</template>

<script>
import CandidateDialog from '@src/components/CandidateDialog/index.vue'
import { api, urlNames } from '@src/api'
export default {
  name: 'GroupDetail',
  components: {
    CandidateDialog
  },
  data () {
    return {
      currentPage: 1,
      total: 0,
      groupId: this.$route.query.groupId,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentRow: null,
      seleceDialog: {
        selectMenmberTitle: '选人组件',
        selectMenmberFlag: false
      }
    }
  },
  methods: {
    // 获取成员列表
    getGroupUsers (groupId, page, limt) {
      api[urlNames['getGroupUsers']]({
        groupId: groupId,
        page: page,
        limit: limt
      }).then((res) => {
        this.total = parseInt(res.total)
        this.viewList = res.data
      })
    },
    // 关闭选人弹窗
    closeselectMenmber () {
      this.seleceDialog.selectMenmberFlag = false
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleClick (row) {
      console.log(row)
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
@import "./index";
</style>
