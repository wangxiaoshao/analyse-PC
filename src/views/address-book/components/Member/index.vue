<template>
  <div class="member">
    <el-row v-for="(item,index) in tableData" :key="index">
      <el-col :span="2">
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
      <el-col :span="17">
        <div class="grid-content member-font">
          <span>电话：13412341234</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <div class="grid-content">
          <div class="member-name">张三</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content member-font">
          <div class="member-size">李四</div>
          <div>财务部</div>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="grid-content member-font">
          <span>电话：13412341234</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>

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
      }
        , {
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
@import 'index';
</style>

