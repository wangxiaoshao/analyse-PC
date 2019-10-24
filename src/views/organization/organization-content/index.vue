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
          <div class="content-title">
            <i v-if="activeName === '部门领导'" class="menu-icon fa fa-user-o" style="margin: 0px 5px;"></i>
            <i v-else class="menu-icon fa fa-sitemap" style="margin: 0px 5px;"></i>
            {{activeName}}
          </div>
          <el-tab-pane label="下级设置" name="下级设置">
            <el-button @click="openAddDialog" class="add-btn">添加下级</el-button>
            <!--下级列表-->
            <content-list :sortFlag="sortShowFlag" @cancel="getSortAction"></content-list>
          </el-tab-pane>
          <el-tab-pane label="设置" name="设置">
            <el-button type="primary" @click.native="goEdit">设置</el-button>
          </el-tab-pane>
          <el-tab-pane label="人员管理" name="人员管理">
            <el-button class="add-btn">添加人员</el-button>
            <person-list :sortFlag="sortShowFlag" @cancel="getSortAction"></person-list>
          </el-tab-pane>
          <el-tab-pane label="部门领导" name="部门领导">部门领导</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import ContentList from './components/content-list/index'
import PersonList from './components/personlist/index'
import addDialog from './components/add-dialog/index'
export default {
  name: 'index',
  components: {
    ContentList, addDialog , PersonList
  },
  data () {
    return {
      showDialogFlag: false,
      activeName: '下级设置',
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
    if (this.$route.query.type === 'back') {

    }
  },
  watch: {
    $route: {
      handler (val) {

      }
    },
    activeName: {
      handler () {
        this.sortShowFlag = false
      }
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
