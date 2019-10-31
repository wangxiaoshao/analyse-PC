<template>
<div class="app-management">
  <div class="create-app">
    <el-button type="primary" @click="createApp">创建应用</el-button>
  </div>
  <div class="table">
    <el-table
      ref="singleTable"
      :data="appList"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50"
        align="center">
      </el-table-column>
      <el-table-column
        property="name"
        label="应用名称"
        align="center">
      </el-table-column>
      <el-table-column
        property="id"
        label="应用编号"
        align="center">
      </el-table-column>
      <el-table-column
        property="createTime"
        label="接入时间"
        align="center">
      </el-table-column>
      <el-table-column
        property="concatUser"
        label="联系人员"
        align="center">
      </el-table-column>
      <el-table-column
      property="apiAccount"
      label="应用接口账号"
      align="center">
    </el-table-column>
      <el-table-column
        property="apiPassword"
        label="应用接口密码"
        align="center">
      </el-table-column>
      <el-table-column label="启用状态" prop="removed" width="80" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed">启用</span>
          <span class="text-disable" v-show="!scope.row.removed">停用</span>
        </template>
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
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  name: 'AppManagement',
  data () {
    return {
      appList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  created () {
    this.getAppList(1, 10)
  },
  methods: {
    //  获取应用
    getAppList (page, limt) {
      api[urlNames['getAppList']]({
        page: page,
        limit: limt
      }).then((res) => {
        this.total = parseInt(res.total)
        this.appList = res.data
      })
    },
    handleClick (row) {
      this.$router.push({ name: 'CreateAppManagement', query: { id: row.id } })
    },
    // 创建应用
    createApp () {
      this.$router.push({ name: 'CreateAppManagement' })
    },
    // 每一页请求条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getAppList(this.currentPage, val)
    },
    // 分页
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.getAppList(val, this.pageSize)
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
