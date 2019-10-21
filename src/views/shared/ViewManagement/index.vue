<template>
  <div class="view-management">
    <div>
      <el-button type="primary" @click="createView">创建视图</el-button>
    </div>
    <div>
      <el-table
        ref="singleTable"
        :data="tableData"
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
          property="date"
          label="视图名称"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          property="name"
          label="视图ID"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          property="date"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          property="name"
          align="center"
          label="视图管理员">
        </el-table-column>
        <el-table-column
          property="name"
          align="center"
          label="启用状态">
        </el-table-column>
        <el-table-column
          property="address"
          align="center"
          label="备注说明">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button @click="seleceDialog.selectMenmberFlag = true">选人组件</el-button>
    <candidate @closeselectMenmber="closeselectMenmber" :seleceDialog="seleceDialog"></candidate>
  </div>
</template>

<script>
import Candidate from '@src/components/CandidateDialog/CandidateDialog.vue'
export default {
  name: 'ViewManagement',
  components: {
    Candidate
  },
  data () {
    return {
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
    // 跳转创建视图
    createView () {
      this.$router.push({ path: '/createview' })
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
    }
  }

}
</script>

<style scoped lang="less">
@import 'index.less';
</style>
