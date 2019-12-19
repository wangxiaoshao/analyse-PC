<template>
  <div class="member-tab">
    <el-table
      :data="tableData"
      :show-header="false"
      style="width: 100%"
    >
      <template slot="empty">
        <div class="empty">
          <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
          <p><span style="padding-left: 8px">暂无数据！</span></p>
        </div>
      </template>
      <el-table-column
        align="center"
        width="120"
      height="40">
        <template slot-scope="scope">
<!--            <span v-if="scope.row.portraitUrl !== '0'&&scope.row.portraitUrl!==undefined"><img  :src="scope.row.portraitUrl"></span>-->
            <span>
              <span class="header-img">{{scope.row.name.slice(-2,scope.row.name.length)}}</span>
            </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号">
      </el-table-column>
      <el-table-column
        prop="duty"
        label="职位">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'

export default {
  props: ['tableData', 'memberProps'],
  data () {
    return {}
  },
  created () {

  },
  methods: {}
}
</script>
<style scoped lang="less">
  @import './index';
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
