<template>
  <div>
    <div class="department-tab-content">
      <el-table :data="tableData" style="width: 100%;background:#F5F6F8;" class="eltab">
        <el-table-column prop="department" label width="100" align="left" height="0"></el-table-column>
        <el-table-column prop="tel" label width="100"></el-table-column>
        <el-table-column prop="phone" label></el-table-column>
        <el-table-column label="下级" align="right" width class-name="next-btn">
          <template slot-scope="scope">
            <i class="el-icon-share"></i>
            <span @click="toMemberList(scope.row)">{{scope.row.next}}</span>
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
      personnel: {}
    }
  },
  created () {

  },
  methods: {
    toMemberList (scope) {
      this.personnel = scope
      api[urlNames['getOrgDepartmentTxlList']]({
        orgId: scope.id
      }).then(res => {
        this.departmentList = res.data
      //   this.$router.push({
      //   id: 'id',
      //   name:'1',
      //   phone:'1'
      // })
        console.log(res)
      })
    }
  },
  watch: {
    departmentList (newvalue, oldvalue) {
      this.tableData = []
      newvalue.forEach(element => {
        this.tableData.push({
          department: element.name,
          tel: '部门电话：',
          phone: element.phone,
          next: '下级',
          id: element.id
        })
      })
    }
  }

}
</script>
<style lang="less">
@import 'index';
// import depart_icon from '../../../../common/images/examine/depart_icon.png';
</style>
