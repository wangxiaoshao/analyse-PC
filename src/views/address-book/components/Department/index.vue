<template>
<div>
  <div class="department-tab-content">
 <el-table
      :data="tableData"
      style="width: 100%;background:#F5F6F8;"
      class="eltab"
      >
      <el-table-column
        prop="department"
        label="人事部"
        width="120"
        align="left"
        height='0'>
      </el-table-column>
      <el-table-column
        prop="tel"
        label=""

       >
      </el-table-column>
      <el-table-column
        label="下级"
        align="right"
        width=""

        class-name="next-btn"
        >
        <template slot-scope="scope" >
            <!-- <el-button
                    type="text"
                    size="small">
                    下级
                  </el-button> -->
            <i class="el-icon-arrow-down"></i>
            <span   @click="toMemberList">
        {{scope.row.next}}
            </span>
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
export default {
  data () {
    return {
      tableData: [{
        department: '人事部',
        tel: '',
        next: '下级'
      }, {
        department: '人事部',
        tel: '部门电话：13412341234',
        next: '下级'
      }, {
        department: '人事部',
        tel: '电话：13412341234',
        next: '下级'
      }, {
        department: '人事部',
        tel: '电话：13412341234',
        next: '下级'
      }]
    }
  },
  methods: {
    toMemberList () {
      // console.log("11111111111111")
      this.$router.push({
        name: 'MemberList'
      })
    }

  },
  components: {
    memberTable
  }
}
</script>
<style lang="less">
  @import "index";
// import depart_icon from '../../../../common/images/examine/depart_icon.png';
</style>
