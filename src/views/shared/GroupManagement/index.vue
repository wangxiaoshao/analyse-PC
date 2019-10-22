<template>
    <div class="group-management">
      <div class="group-operation">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" @click="openDialog">创建分组</el-button>
      </div>
      <div class="table">
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
            property="date"
            label="分组名称"
            align="center">
          </el-table-column>
          <el-table-column
            property="name"
            label="分组描述"
            align="center">
          </el-table-column>
          <el-table-column
          property="address"
          align="center"
          label="创建时间">
        </el-table-column>
          <el-table-column
            property="name"
            align="center"
            label="启用状态">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentPageChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
      <create-group-dialog @close="close" :creategroupdialogVisible="creategroupdialogVisible"></create-group-dialog>
    </div>
</template>

<script>
import CreateGroupDialog from '@src/views/shared/GroupManagement/CreateGroupDialog/CreateGroupDialog'
export default {
  name: 'GroupManagement',
  components: {
    CreateGroupDialog
  },
  data () {
    return {
      creategroupdialogVisible: false,
      currentPage: 1,
      options: [{
        value: '1',
        label: '单位分组'
      }, {
        value: '2',
        label: '部门分组'
      }, {
        value: '3',
        label: '个人分组'
      }],
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
      value: ''
    }
  },
  methods: {
    // 关闭弹窗
    close () {
      this.creategroupdialogVisible = false
    },
    // 打开创建弹窗
    openDialog () {
      this.creategroupdialogVisible = true
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
