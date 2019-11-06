<template>
  <div class="organization-content" v-loading="loading">
    <el-dialog
      title="添加下级"
      :visible.sync="visible"
      width="30%"
      :center="true">
      <div class="add-content">
        <el-button @click="goAddNode" v-if="showAddNodeFlag">添加节点</el-button>
        <el-button v-if="showAddDepartmentFlag" @click="goAddDepartment">添加部门</el-button>
        <el-button v-if="showAddUnitFlag" @click="goAddUnit">添加单位</el-button>
      </div>
    </el-dialog>
    <div class="organization-wrap">
      <div class="organization-info" v-if="content[0]">
        <i v-if="content[0].nodeType === 1" class="menu-icon fa fa-user-o big-icon" style="margin: 0px 5px;"></i>
        <i v-if="content[0].nodeType === 2" class="menu-icon fa fa-sitemap big-icon" style="margin: 0px 5px;"></i>
        <i v-if="content[0].nodeType === 3" class="menu-icon fa fa-sitemap big-icon" style="margin: 0px 5px;"></i>
        <span class="organization-value" v-html="content[0].name"></span>
        <el-button>日志</el-button>
      </div>
      <div class="list-tab">
        <el-tabs v-model="activeName">
          <div class="content-title">
            {{activeName}}
          </div>
          <el-tab-pane label="下级设置" name="下级设置">
            <el-button @click="openAddDialog" class="add-btn">添加下级</el-button>
            <!--下级列表-->
            <content-list
              v-if="activeName === '下级设置'"
              :sortFlag="sortShowFlag"
              @cancel="getSortAction"
              @getPage="getPage"
              :contentPage="currentPage"
            ></content-list>
          </el-tab-pane>
          <el-tab-pane label="详细信息" name="详细信息" v-if="content[0]">
            <el-table
              :data="content"
              border
              size="medium"
            >
              <el-table-column label="name" prop="name"></el-table-column>
              <el-table-column label="启用状态" prop="removed" align="center">
                <template slot-scope="scope">
                  <span class="text-able" v-show="scope.row.removed === 0">启用</span>
                  <span class="text-disable" v-show="scope.row.removed === 1">停用</span>
                </template>
              </el-table-column>
              <el-table-column prop="state" label="审核状态" width="100" align="center">
                <template  slot-scope="scope">
                  <span v-show="scope.row.state === 0" style="color: #F56C6C">待审核</span>
                  <span v-show="scope.row.state === 1" style="color: #67C23A">已审核</span>
                </template>
              </el-table-column>
              <el-table-column prop="act" label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button v-show="scope.row.nodeType === 1" @click.native="openEditNode(scope.row)" type="text" size="small">
                    修改
                  </el-button>
                  <el-button v-show="scope.row.nodeType === 2" @click.native="openDepartmentEdit(scope.row)" type="text" size="small">
                    修改
                  </el-button>
                  <el-button v-show="scope.row.nodeType === 3" @click.native="openEditUnit(scope.row)" type="text" size="small">
                    修改
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="人员管理" name="人员管理">
            <el-button class="add-btn" @click="openAddPerson">添加人员</el-button>
            <person-list
              v-if="activeName === '人员管理'"
              :sortFlag="sortShowFlag"
              @getPage="getPage"
              :contentPage="page"
              @cancel="getSortAction"
            ></person-list>
          </el-tab-pane>
          <el-tab-pane label="部门领导" name="单位主要领导">
            <leader-list
              v-if="activeName === '单位主要领导'"
              @getPage="getPage"
              :contentPage="page"
              :nodeInfo="nodeInfo"
            ></leader-list>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import organizationEdit from '@src/mixins/organization-edit'
import { api, urlNames } from '@src/api'
import ContentList from '../components/ContentList/index'
import PersonList from '../components/PersonList/index'
import leaderList from '../components/LeaderList/index'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [ organizationEdit],
  components: {
    ContentList, PersonList, leaderList
  },
  data () {
    return {
      contentId: this.$route.params.nodeId,
      loading: true,
      fullscreenLoading: true,
      showDialogFlag: false,
      activeName: '下级设置',
      sortShowFlag: false,
      content: [],
      selectType: '',
      visible: false,
      visibleFlag: false,
      showAddNodeFlag: false,
      showAddDepartmentFlag: false,
      showAddUnitFlag: false,
      nodeInfo: {
        title: '',
        openNodeFlag: false,
        nodeType: 1,
        parentId: '',
        id: '',
        infoFlag: false,
        succese: false
      },
      currentPage: {
        limit: 10,
        current: 1,
        total: 0
      },
      backInfo: {
        backId: '',
        backActive: ''
      }
    }
  },
  computed: {
    isSort () {
      return this.activeName
    },
    ...mapState(['organization'])
  },
  created () {
    if (this.$route.query.type === 'back') {
      this.currentPage = Object.assign(this.currentPage, this.organization.page)
      this.backInfo = Object.assign(this.backInfo, this.organization.backInfo)
    } else {
      this.SET_ORGANIZATION_PAGE({})
      this.SET_ORGANIZATION_BACK_INFO({})
    }
    this.getContent()
  },
  methods: {
    ...mapMutations(['SET_ORGANIZATION_PAGE', 'SET_ORGANIZATION_BACK_INFO']),
    setStore () {
      this.backInfo = {
        backId: this.$route.params.nodeId,
        backActive: this.activeName
      }
      this.SET_ORGANIZATION_PAGE(this.currentPage)
      this.SET_ORGANIZATION_BACK_INFO(this.backInfo)
    },
    getPage (val) {
      this.currentPage = val
      this.SET_ORGANIZATION_PAGE(this.currentPage)
    },
    closeDialog () {
      this.visible = false
    },
    openAddPerson () {
      this.setStore()
      this.$router.push({
        name: 'PersonAdd',
        params: {
          parentId: this.$route.params.nodeId
        }
      })
    },
    goAddNode () {
      this.setStore()
      this.$router.push({
        name: 'NodeAdd',
        params: {
          parentId: this.$route.params.nodeId
        }
      })
    },
    goAddDepartment () {
      this.setStore()
      this.$router.push({
        name: 'DepartmentAdd',
        params: {
          parentId: this.$route.params.nodeId
        }
      })
    },
    goAddUnit () {
      this.setStore()
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
      this.loading = true
      api[urlNames['findViewNodeById']]({
        id: this.contentId
      }).then((res) => {
        this.content[0] = res.data
        this.nodeType = res.data.nodeType
        this.selectType = this.content.nodeType
        this.nodeInfo.nodeType = res.data.nodeType
        this.nodeInfo.parentId = res.data.id
        this.loading = false
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.contentId = to.params.nodeId
    this.getContent()
  },
  watch: {
    isSort: {
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
