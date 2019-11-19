<template>
  <div>
    <div class="department-tab-content">
      <el-table :data="departmentList" style="width: 100%;background:#F5F6F8;" class="eltab">
        <el-table-column prop="name" label width="100" align="left" height="0"></el-table-column>
        <el-table-column label="部门电话" width="100">部门电话:</el-table-column>
        <el-table-column prop="phone" label></el-table-column>
        <el-table-column label="下级" align="right" width class-name="next-btn">
          <template slot-scope="scope">
            <i class="el-icon-share"></i>
            <span @click="childClick(scope.row)">下级</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="member-tab-content">
      <member-table :personnel="personnel" :treeList="treeList"></member-table>
    </div>
  </div>
</template>
<script>
import memberTable from '../Member/index'
import { api, urlNames } from '@src/api'
export default {
  name: 'index',
  props: ['departmentList', 'treeList'],
  components: {
    memberTable
  },
  data () {
    return {
      tableData: [],
      personnel: {},
      userId: '1111111111111111111',      
    }
  },
  created () {},
  methods: {
    childClick (node) {
      //  this.personnel = node
      this.$emit('handle-child-click', node)
    }
  }
}
</script>
<style lang="less">
@import 'index';

</style>
