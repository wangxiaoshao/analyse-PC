<template>
  <div class="member">
    <el-row v-for="(item,index) in tableData" :key="index">
      <el-col :span="3">
        <div class="grid-content">
          <div class="member-name">
            <img src alt="头像" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content member-font">
          <div class="member-size">李四</div>
          <div>财务部</div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content member-font">
          <span>电话：13412341234</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['personnel'],
  data () {
    return {
      tableData: [{
        img: '2016-05-02',
        name: '王小虎',
        tel: '电话：13412341234'
      }]
    }
  },
  methods: {
    getpersonnel (page, limit, orgId) {
      let data = {
        page: page,
        limit: limit,
        orgId: orgId
      }
      console.log(data)
      api[urlNames['getOrgUserTxlList']](data).then(res => {
        console.log(res)
      }).catch(err => {

      })

    }
  },
  watch: {
    personnel (newValue, oldValue) {
      this.getpersonnel(1, 5, newValue.id)
    }
  },
}
</script>
<style lang="less">
@import 'index';
</style>

