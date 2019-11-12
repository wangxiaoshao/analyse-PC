<template>
  <div>
    <div class="department-tab-content">
      <el-table :data="tableData" style="width: 100%;background:#F5F6F8;" class="eltab">
        <el-table-column prop="department" label="department" width="100" align="left" height="0"></el-table-column>
        <el-table-column prop="tel" label></el-table-column>
        <el-table-column label="下级" align="right" width class-name="next-btn">
          <template slot-scope="scope">
            <i class="el-icon-share"></i>
            <span @click="toMemberList(scope.$index, scope.row)">{{scope.row.next}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="member-tab-content">
      <member-table></member-table>
    </div>
  </div>
</template>
<script>
import memberTable from '../Member/index'
import { api, urlNames } from '@src/api'
export default {
  name: 'index',
  components: {
    memberTable,
  },
  data () {
    return {
      tableData: [{
        department: '人事部',
        tel: '部门电话：13412341234',
        next: '下级'
      }, {
        department: '财务部',
        tel: '部门电话：13412341234',
        next: '下级'
      }, {
        department: '懂事部',
        tel: '电话：13412341234',
        next: '下级'
      }]
    }
  },
  created () {

  },
  methods: {
    getAddressBook () {
      api[urlNames['getAddressBoookList']]({
        name: '',
        phone: ''
        // departmentId: departmentId,
        // getDataType: 2 //1:只查人员，2:查人员和部门


      }).then(res => {
        // success callback（）
      })
    },
    toMemberList (e) {
      console.log(e)
    },

  },
}
</script>
<style lang="less">
@import 'index';
// import depart_icon from '../../../../common/images/examine/depart_icon.png';
</style>
