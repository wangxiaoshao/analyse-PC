<template>
  <div class="search-content">
    <el-popover
      v-if="resultFlag"
      placement="top-start"
      width="100%"
    >
      <div class="result-list">
        <div class="back-btn">
          <el-button size="mini" @click="resultFlag = false">返回</el-button>
        </div>
        <el-table :data="gridData" :show-header="false">
          <el-table-column property="name"></el-table-column>
        </el-table>
      </div>
    </el-popover>
    <el-row>
      <el-col :span="7">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="17">
        <el-input
          placeholder="搜索" suffix-icon="el-icon-search" v-model="keyWord"
          @on-search.native="loadResult"
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      resultFlag: false,
      keyWord: '',
      options: [{
        value: 'department',
        label: '部门'
      }, {
        value: 'unit',
        label: '单位'
      }, {
        value: 'person',
        label: '人员'
      }],
      value: '部门',
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    loadResult () {
      this.resultFlag = true
      alert(444)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
