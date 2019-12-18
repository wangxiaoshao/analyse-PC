<template>
<div class="operate-log">
  <el-table
    :data="logList"
    border
    style="width: 100%">
    <template slot="empty">
      <div class="empty">
        <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
        <p><span style="padding-left: 8px">暂无数据！</span></p>
      </div>
    </template>
    <el-table-column
      type="index"
      width="50"
      label="序号"
    align="center">
    </el-table-column>
<!--    <el-table-column-->
<!--      type="selection"-->
<!--      width="55">-->
<!--    </el-table-column>-->
    <el-table-column
      prop="actionUserName"
      label="更改人员"
      align="center"
      width="140">
    </el-table-column>
    <el-table-column
      label="更改动作"
      align="center"
      width="80">
      <template slot-scope="scope">
        <span v-if="scope.row.actionType === 1">新增</span>
        <span v-if="scope.row.actionType === 2">修改</span>
        <span v-if="scope.row.actionType === 3">删除</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="actionTime"
      align="center"
      label="更改时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="changeContent"
      align="center"
      label="更改内容">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable, handleBreadcrumb],
  name: 'OperateLog',
  data () {
    return {
      logList: []
    }
  },
  created () {
    this.findEntityChangeLoggerList(this.$route.params.id, this.$route.query.type, 1, 10)
  },
  mounted () {
    this.pushBreadcrumb({
      name: `${this.$route.query.title}日志`,
      parent: {
        name: 'OrganizationContent',
        params: {
          nodeId: this.$route.params.id
        },
        query: {
          type: 'back'
        }
      }
    })
  },
  methods: {
    findEntityChangeLoggerList (id, type, page, limit) {
      if (type === 2) {
        type = 3
      } else if (type === 3) {
        type = 2
      }
      api[urlNames['findEntityChangeLoggerList']]({
        entityType: type,
        entityId: id,
        page: page,
        limit: limit
      }).then((res) => {
        if (res.status === 0) {
          this.$message.success('请求成功')
          this.logList = res.data
        }
      }, (error) => {
      })
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
