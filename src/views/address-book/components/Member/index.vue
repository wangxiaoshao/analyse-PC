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
          <div class="member-size">{{item.name}}</div>
          <div>{{item.dutyName}}</div>
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
    }
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

