<template>
  <div>
    <!--表格-->
    <el-table v-loading="loading" :data="list" :max-height="tableMaxHeight" border style="width: 100%">
      <el-table-column prop="name" label="角色名称">
        <template slot-scope="scope"><span :title="scope.row.name">{{scope.row.name}}</span></template>
      </el-table-column>
      <el-table-column prop="areaName" label="角色描述">
        <template slot-scope="scope"><span :title="scope.row.areaName">{{scope.row.areaName}}</span></template>
      </el-table-column>
      <el-table-column prop="info" label="创建事件">
        <template slot-scope="scope"><span :title="scope.row.info">{{scope.row.info}}</span></template>
      </el-table-column>
      <el-table-column prop="value" label="启用状态">
        <template slot-scope="scope">
          <span class="text-green" v-show="scope.row.enable === 1">启用</span>
          <span class="text-red" v-show="scope.row.enable === 0">停用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showEditDialog(scope.row)">查看成员及权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  mixins: [handleTable]
}
</script>

<style scoped>

</style>
