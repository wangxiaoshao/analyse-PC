<template>
  <div class="member">
    <el-row v-for="(item,index) in tableData" :key="index">
      <el-col :span="3">
        <div class="grid-content">
          <div class="member-name">
            <img src :alt="item.portraitUrl" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content member-font">
          <div class="member-size">姓名：{{item.name}}</div>
          <div>职务：{{item.dutyName}}</div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content member-font">
          <span>电话：{{item.mobile}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['personnel', 'treeList'],
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    getpersonnel (page, limit, orgId) {
      let data = {
        page: page,
        limit: limit,
        orgId: orgId
      }
      api[urlNames['getOrgUserTxlList']](data).then(res => {
        this.tableData = res.data
      })
    },

     // 其他单位通讯录查询部门下的所有人员
    findDepartmentMembers (deptId) {
      api[urlNames['findDepartmentMembers']]({
        deptId: deptId
      }).then((res) => {
        this.memberList = res.data
      })
    },
    // 其他单位通讯录查询单位下的所有人员
    findOrganizationMembers (orgId) {
      api[urlNames['findOrganizationMembers']]({
        orgId: orgId
      }).then((res) => {
        this.memberList = res.data
        console.log(res,'----------------++')
      })
    },
  },
  watch: {
    personnel (newValue, oldValue) {

    },
    treeList (newValue, oldValue) {
      this.getpersonnel(1, 5, newValue.id)
    }
  }
}
</script>
<style lang="less">
@import 'index';
</style>

