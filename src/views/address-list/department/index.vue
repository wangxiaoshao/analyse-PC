<template>
  <div>
    <div class="department-tab-content">
      <el-table :data="departmentList"
                style="width: 100%;"
                class="eltab"
                v-show="departmentList.length!==0"
      >
        <template slot="empty">
          <div class="empty">
            <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
            <p><span style="padding-left: 8px">暂无数据！</span></p>
          </div>
        </template>
        <el-table-column prop="name" label width="100" align="left" height="0"></el-table-column>
        <el-table-column label="内设机构电话" width="115">内设机构电话:</el-table-column>
        <el-table-column prop="phone" label></el-table-column>
        <el-table-column label="下级" align="right" width class-name="next-btn">
          <template slot-scope="scope">
            <i class="el-icon-share"></i>
            <span @click="childClick(scope.row)">下级</span>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['departmentList'],
  data () {
    return {
      status: 0,
      isShow: true,
      tableData: [],
      personnel: {},
      memberList: [],
      userId: '11111111111'
    }
  },
  created () {},
  methods: {
    childClick (node) {
      this.$emit('handle-child-click', node)
    }
  }
}
</script>
<style lang="less">
@import 'index';
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
