<template>
  <div class="organization-content">
    <add-dialog :visible="showDialogFlag" :nodeType="content.nodeType" @close="closeAddDialog"></add-dialog>
    <div class="organization-wrap">
      <div class="organization-info">
        <span class="organization-value" v-html="content.name"></span>
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
          <el-tab-pane  :label="nodeTitle" :name="nodeTitle">
           <!-- <el-table :data="cot">
              <el-table-column>
                {{content.name}}
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template>
                  <el-button @click="handleClick(content)" type="text" size="small">修改</el-button>
                </template>
              </el-table-column>
            </el-table>-->
           <el-row>
             <el-col :span="20">{{content.name}}</el-col>
             <el-col :span="4" style="text-align: center">
               <el-button @click="handleClick(content)" type="text" size="small">修改</el-button>
             </el-col>
           </el-row>
          </el-tab-pane>
          <el-tab-pane label="人员管理" name="人员管理">
            <el-button class="add-btn">添加人员</el-button>
            <person-list :sortFlag="sortShowFlag" @cancel="getSortAction"></person-list>
          </el-tab-pane>
          <el-tab-pane label="部门领导" name="部门领导">
            <leader-list></leader-list>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import ContentList from './components/contentList/index'
import PersonList from './components/personList/index'
import leaderList from './components/leaderList/index'
import addDialog from './components/addDialog/index'
export default {
  name: 'index',
  components: {
    ContentList, addDialog, PersonList, leaderList
  },
  data () {
    return {
      showDialogFlag: false,
      activeName: '下级设置',
      nodeTitle: '',
      sortShowFlag: false,
      content: {},
      selectType: ''
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
    },
    getContent () {
      let data = this.$route.params.nodeId
      api[urlNames['findViewNodeById']](data).then((res) => {
        console.log(res.data)
        this.content = res.data
        this.selectType = this.content.nodeType
        if (this.content.nodeType === 'node') {
          this.nodeTitle = '节点信息'
        }
        if (this.content.nodeType === 'department') {
          this.nodeTitle = '部门信息'
        }
        if (this.content.nodeType === 'unit') {
          this.nodeTitle = '单位信息'
        }
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    }
  },
  created () {
    if (this.$route.query.type === 'back') {

    }
    this.getContent()
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
