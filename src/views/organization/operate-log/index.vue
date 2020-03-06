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
      width="65"
      label="序号"
    align="center">
    </el-table-column>
<!--    <el-table-column-->
<!--      type="selection"-->
<!--      width="55">-->
<!--    </el-table-column>-->
    <el-table-column
      prop="actionTime"
      label="时间"
      align="center"
      width="140">
    </el-table-column>
    <el-table-column
      prop="actionUserName"
      label="操作人"
      align="center"
      width="140">
    </el-table-column>
    <el-table-column
      label="操作描述"
      align="center"
      width="80">
      <template slot-scope="scope">
        <span v-if="scope.row.actionType === 1">信息新增</span>
        <span v-if="scope.row.actionType === 2">信息修改</span>
        <span v-if="scope.row.actionType === 3">信息删除</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      width="160">
      <template slot-scope="scope">
         <a style="color:red;"  href="jacascript:void(0)" @click="findInfo(scope.row)">详情</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="changeContent"
      align="center"
      label="操作内容">
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
          this.logList = res.data
        }
      }, (error) => {
      })
    },

    // 查看详情
    findInfo(val){

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
