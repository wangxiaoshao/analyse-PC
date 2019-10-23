<template>
  <div class="organization-content">
    <add-dialog :visible="showDialogFlag" @close="closeAddDialog"></add-dialog>
    <div class="organization-wrap">
      <div class="organization-info">
        <span class="organization-value">贵州省</span>
        <el-button>日志</el-button>
      </div>
      <div class="list-tab">
        <el-tabs v-model="activeName">
          <el-tab-pane label="下级设置" name="childSet">
            <el-button @click="openAddDialog" class="add-btn">添加下级</el-button>
            <!--下级列表-->
            <content-list :sortFlag="sortShowFlag" @cancel="getSortAction"></content-list>
          </el-tab-pane>
          <el-tab-pane label="设置" name="set">
            <el-button type="primary" @click.native="goEdit">设置</el-button>
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
import addDialog from './components/AddChildDialog/index'
export default {
  name: 'index',
  components: {
    ContentList, addDialog
  },
  data () {
    return {
      showDialogFlag: false,
      activeName: 'childSet',
      sortShowFlag: false
    }
  },
  methods: {
    goEdit () {
      console.log(this.$route.params.id)
      this.$router.push({
        name: 'NodeEdit',
        params: {
          id: this.$route.params.id
        }
      })
    },
    closeAddDialog (type) {
      this.showDialogFlag = type
    },
    openAddDialog () {
      this.showDialogFlag = true
      this.sortShowFlag = false
    },
    getSortAction (type) {
      this.sortShowFlag = type
    }
  },
  created () {
    /* if (this.$route.query.type === 'back') {

    } */
  },
  watch: {
    $route: {
      handler (val) {

      }
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
