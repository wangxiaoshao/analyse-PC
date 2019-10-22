<template>
  <div class="organization-content">
    <div class="organization-wrap">
      <div class="organization-info">
        <span class="organization-value">贵州省</span>
        <el-button type="primary">设置</el-button>
        <el-button>日志</el-button>
      </div>
      <div class="list-tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="下级设置" name="childSet">
            <!--下级列表-->
            <content-list :sortFlag="sortShowFlag"></content-list>
          </el-tab-pane>
          <el-tab-pane label="人员管理" name="personManage">配置管理</el-tab-pane>
          <el-tab-pane label="单位领导" name="unit">单位领导</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ContentList from './components/ContentList/index'
export default {
  name: 'index',
  components: {
    ContentList
  },
  data () {
    return {
      activeName: 'childSet',
      buttonTitle: '添加下级',
      sortShowFlag: false
    }
  },
  methods: {

  },
  created () {

  }
}
</script>

<style lang="less">
  @import "index";
</style>
