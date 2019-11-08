<template>
<div style="background:#F5F6F8;" >
    <div class="navbar-content" style="background:#F5F6F8;">
       <el-breadcrumb separator="/" style="background:#F5F6F8;padding:20px;">
  <el-breadcrumb-item :to="{ path: '/' }">本单位名称</el-breadcrumb-item>
  <!-- <el-breadcrumb-item><a href="/"></a></el-breadcrumb-item> -->

</el-breadcrumb>
    </div>
    <div>
    <div class="department-content">
      <department-table></department-table>
    </div>
    <div>
    <router-view></router-view>
  </div>
    </div>

</div>
</template>
<script>
import unitNavbar from '../components/Unitnavbar/index'
import departmentTable from '../components/Department/index'
// import memberTable from '../components/Member/index'
export default {
  data () {
    return {
      tableData: [
        {
          department: '人事部',
          tel: '',
          next: '下级'
        },
        {
          department: '人事部',
          tel: '部门电话：13412341234',
          next: '下级'
        },
        {
          department: '人事部',
          tel: '电话：13412341234',
          next: '下级'
        },
        {
          department: '人事部',
          tel: '电话：13412341234',
          next: '下级'
        }
      ]
    }
  },
  // name:'UnitAddressBook',
  components: {
    unitNavbar,
    // memberTable,
    departmentTable
  }
}
</script>
<style lang="less">
@import "index";
</style>
