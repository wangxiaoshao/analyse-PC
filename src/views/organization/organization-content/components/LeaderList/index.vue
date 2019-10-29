<template>
  <div class="leader-list-content">
    <div class="list-ground">
      <el-table
        :data="mainList"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    <div class="content-title">
      单位其他领导
    </div>
    <div class="list-ground">
        <div class="list-item">
            4545
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainList: []
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
