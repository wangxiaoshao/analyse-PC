<template>
<div class="app-management">
  <div class="create-app">
    <el-button type="primary" @click="createApp">创建应用</el-button>
  </div>
  <div class="table">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        property="date"
        label="应用名称"
        align="center">
      </el-table-column>
      <el-table-column
        property="name"
        label="应用编号"
        align="center">
      </el-table-column>
      <el-table-column
        property="address"
        label="接入时间"
        align="center">
      </el-table-column>
      <el-table-column
        property="name"
        label="联系人员"
        align="center">
      </el-table-column>
      <el-table-column
      property="name"
      label="应用接口账号"
      align="center">
    </el-table-column>
      <el-table-column
        property="name"
        label="应用接口密码"
        align="center">
      </el-table-column>
      <el-table-column
      property="name"
      label="启用状态"
      width="120">
    </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="140">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
export default {
  name: 'AppManagement',
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
      currentRow: null
    }
  },
  methods: {
    handleClick (row) {
      //  this.$router.push({ name: 'GroupDetail' })
      console.log(row)
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    // 创建应用
    createApp () {
      this.$router.push({ name: 'CreateAppManagement' })
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
