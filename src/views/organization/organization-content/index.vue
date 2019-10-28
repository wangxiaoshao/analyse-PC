<template>
  <div class="organization-content">
    <el-dialog
      title="添加下级"
      :visible.sync="visible"
      width="30%"
      :center="true">
      <div class="add-content">
        <el-button @click="goAddNode" v-if="showAddNodeFlag">添加节点</el-button>
        <el-button v-if="showAddDepartmentFlag">添加部门</el-button>
        <el-button v-if="showAddUnitFlag" @click="goAddUnit">添加单位</el-button>
      </div>
    </el-dialog>
    <div class="organization-wrap">
      <div class="organization-info">
        <span class="organization-value" v-html="content[0].name"></span>
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
            <content-list v-if="activeName === '下级设置'" :sortFlag="sortShowFlag" @cancel="getSortAction"></content-list>
          </el-tab-pane>
          <el-tab-pane  :label="nodeTitle" :name="nodeTitle">
            <el-table
              :data="content"
              border
              size="medium"
            >
              <el-table-column label="name" prop="name"></el-table-column>
              <el-table-column label="启用状态" prop="removed" align="center">
                <template slot-scope="scope">
                  <span class="text-able" v-show="scope.row.removed">启用</span>
                  <span class="text-disable" v-show="!scope.row.removed">停用</span>
                </template>
              </el-table-column>
              <el-table-column prop="state" label="审核状态" width="100" align="center">
                <template  slot-scope="scope">
                  <span v-show="scope.row.state === 0" style="color: #F56C6C">待审核</span>
                  <span v-show="scope.row.state === 1" style="color: #67C23A">已审核</span>
                </template>
              </el-table-column>
              <el-table-column prop="act" label="操作" width="100" align="center">
                <template>
                  <el-button
                    type="text"
                    size="small">
                    修改
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="人员管理" name="人员管理">
            <el-button class="add-btn">添加人员</el-button>
            <person-list v-if="activeName === '人员管理'" :sortFlag="sortShowFlag" @cancel="getSortAction"></person-list>
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
import ContentList from './components/ContentList/index'
import PersonList from './components/PersonList/index'
import leaderList from './components/LeaderList/index'
export default {
  components: {
    ContentList, PersonList, leaderList
  },
  data () {
    return {
      showDialogFlag: false,
      activeName: '下级设置',
      nodeTitle: '',
      nodeType: '',
      sortShowFlag: false,
      content: [],
      selectType: '',
      visible: false,
      visibleFlag: false,
      showAddNodeFlag: false,
      showAddDepartmentFlag: false,
      showAddUnitFlag: false
    }
  },
  methods: {
    showBtn () {
      if (this.nodeType === 'node') {
        this.showAddNodeFlag = true
        this.showAddDepartmentFlag = false
        this.showAddUnitFlag = true
      } else if (this.nodeType === 'department') {
        this.showAddNodeFlag = false
        this.showAddDepartmentFlag = true
        this.showAddUnitFlag = false
      } else if (this.nodeType === 'unit') {
        this.showAddNodeFlag = false
        this.showAddDepartmentFlag = true
        this.showAddUnitFlag = true
      }
    },
    goAddNode () {
      this.$router.push({
        name: 'NodeAdd',
        params: {
          parentId: this.$route.params.nodeId
        }
      })
    },
    closeDialog () {
      this.visible = false
    },
    goAddUnit () {
      this.$router.push({
        name: 'UnitAdd',
        params: {
          parentId: this.$route.params.nodeId
        }
      })
      this.visible = false
    },
    closeAddDialog (type) {
      this.showDialogFlag = type
    },
    openAddDialog () {
      this.visible = true
      this.showDialogFlag = true
      this.sortShowFlag = false
    },
    getSortAction (type) {
      this.sortShowFlag = type
    },
    getContent () {
      let data = this.$route.params.nodeId
      api[urlNames['findViewNodeById']](data).then((res) => {
        this.content[0] = res.data
        this.nodeType = res.data.nodeType
        this.showBtn()
        this.selectType = this.content.nodeType
        if (this.content[0].nodeType === 'node') {
          this.nodeTitle = '节点信息'
        }
        if (this.content[0].nodeType === 'department') {
          this.nodeTitle = '部门信息'
        }
        if (this.content[0].nodeType === 'unit') {
          this.nodeTitle = '单位信息'
        }
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    }
  },
  created () {
    this.getContent()
  },
  watch: {
    '$route.params.nodeId': {
      handler (val) {
        this.getContent()
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
