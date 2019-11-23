<template>
  <div class="member">
    <!--<el-row   v-for="(item,index) in tableData" :key="index">
      <el-col :span="3">
        <div class="grid-content">
          <div class="member-name">
            <img :src="item[memberProps.portraitUrl]" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content member-font">
          <div class="member-size">姓名：{{item[memberProps.name]}}</div>
          <div>职务：{{item[memberProps.duty]}}</div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content member-font">
          <span>电话：{{item[memberProps.mobile]}}</span>
        </div>
      </el-col>
    </el-row>-->
   <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="portraitUrl"
        label="头像"
        align="center"
        width="100">
        <template slot-scope="scope">
          <span class="portrait-url">
            <img :src="scope.row.portraitUrl">
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
        prop="dutyName"
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
    return {
    }
  },

  created () {
  },

  methods: {


    // 其他单位通讯录查询单位下的所有人员
    // findOrganizationMembers (id) {
    //   api[urlNames['findOrganizationMembers']]({
    //     id: id
    //   }).then((res) => {
    //     this.memberList = res.data
    //     console.log(this.memberList,'----------------++')
    //   })
    // },
  }
}
</script>
<style lang="less">
@import 'index';
</style>

