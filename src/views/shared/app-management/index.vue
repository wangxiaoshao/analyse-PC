<template>
<div class="app-management">
  <div class="create-app">
    <el-button class="create-btn" type="primary" @click="createApp" :disabled="!hasRight('shareAppCreate')">创建应用</el-button>
  </div>
  <div class="table">
    <el-table
      ref="singleTable"
      border
      :data="appList"
      highlight-current-row
      style="width: 100%">
      <template slot="empty">
        <div class="empty">
          <p><img class="data-pic" src="@src/common/images/no-data1.png" alt=""/></p>
          <p><span style="padding-left: 8px;">暂无数据</span></p>
        </div>
      </template>
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
      <!-- <el-table-column
        property="apiPassword"
        label="应用接口密码"
        align="center">
      </el-table-column> -->
      <el-table-column label="启用状态" prop="removed" width="80" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed===0">启用</span>
          <span class="text-disable" v-show="scope.row.removed===1">停用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="140">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small" :disabled="!hasRight('shareAppSetting')">编辑</el-button>
         <!-- <el-button  @click="toDataLog" type="text" size="small" :disabled="!hasRight('shareAppLoggingAccess')">日志</el-button> -->
          <el-button  @click="toDataLog(scope.row)" type="text" size="small" :disabled="!hasRight('minePushAccess')">日志</el-button>
          <el-button  @click="toSetFields(scope.row)" type="text" size="small">配置</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    ></el-pagination>
  </div>
</div>
</template>

<script>
import { api, urlNames } from '@src/api'
import HasRight from '@src/mixins/has-right'
import handleTable from '@src/mixins/handle-table'
export default {
  name: 'AppManagement',
  mixins: [HasRight, handleTable],
  data () {
    return {
      appList: []
    }
  },
  created () {
    this.getGrid()
  },
  methods: {
    toDataLog (row) {
      this.$router.push({ name: 'PushLog', query: { id: row.id } })
    },
    //  获取应用
    getGrid  () {
      api[urlNames['getAppList']]({
        page: this.page.current,
        limit: this.page.limit
      }).then((res) => {
        this.appList = res.data
        this.page.total = res.total
      })
    },
    handleClick (row) {
      this.$router.push({ name: 'CreateAppManagement', query: { id: row.id } })
    },
    // 创建应用
    createApp (row) {
      this.$router.push({ name: 'CreateAppManagement', query: { id: row.id } })
    },
    toSetFields (row) {
      this.$router.push({ name: 'FieldsManagement', query: { id: row.id } })
    },
    // 每一页请求条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getGrid (this.currentPage, val)
    },
    // 分页
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.getGrid (val, this.pageSize)
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
.empty {
  p {
    margin: 0;
    font-size: 0px;
    text-align: center;
    line-height: 16px!important;
  }

  span {
    font-size: 12px;
  }
}

.data-pic {
  padding-top: 20px;
  width: 60px;
  height: auto;
}
</style>
