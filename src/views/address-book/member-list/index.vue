<template>
<div>
   <div class="navbar-content">
       <el-breadcrumb separator="/" style="padding:20px;">
  <el-breadcrumb-item :to="{ path: '/' }">本单位名称</el-breadcrumb-item>
  <el-breadcrumb-item><a href="/">内设机构</a></el-breadcrumb-item>

</el-breadcrumb>
    </div>
  <div>
     <el-table
      :data="tableData"
      style="width: 100%" class="eltable-member">
      <el-table-column
        prop="img"
        label=""
        width="100"
        align="center">
        <template slot-scope="scope">
              <!-- <img :src="api + scope.row.common/images/examine/depart_icon" alt="" style="width: 36px;height:36px"> -->
            <i class="el-icon-success"></i>
         </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label=""
        width="180"
        >
        <template slot-scope="scope">
            <div>
                <div class="member-name" >姓名</div>
                <div  class="member-post" >职务职务职务职务</div>
            </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="tel"
        label="">
      </el-table-column>
    </el-table>
  </div>
</div>

  </template>
<script>
// import depart_icon from '../../../../common/images/examine/depart_icon.png';

export default {
  data () {
    return {
      tableData: [{
        img: '2016-05-02',
        name: '王小虎',
        tel: '电话：13412341234'
      }, {
        img: '2016-05-02',
        name: '王小虎',
        tel: '电话：13412341234'
      }, {
        img: '2016-05-02',
        name: '王小虎',
        tel: '电话：13412341234'
      }, {
        img: '2016-05-02',
        name: '王小虎',
        tel: '电话：13412341234'
      }]
    }
  }
}
</script>
<style lang="less">
  @import "index";
// import depart_icon from '../../../../common/images/examine/depart_icon.png';
</style>


