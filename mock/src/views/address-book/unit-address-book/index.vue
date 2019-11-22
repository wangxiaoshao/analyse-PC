<template>
  <div style="background:#F5F6F8;">
    <div>
      <div class="department-content">
        <department-table></department-table>
      </div>
    </div>
  </div>
</template>
<script>
import unitNavbar from '../components/Unitnavbar/index'
import departmentTable from '../components/Department/index'
// import memberTable from '../components/Member/index'
export default {
  components: {
    unitNavbar,
    // memberTable,
    departmentTable
  },
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
  }
}
</script>
<style lang="less">
@import 'index';
</style>
