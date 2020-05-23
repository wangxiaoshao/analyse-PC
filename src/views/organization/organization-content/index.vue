<template>
  <div class="organization-content" v-loading="loading">
    <div class="organization-wrap" v-if="content[0]">
      <div class="organization-info">
        <span v-if="content[0].nodeType === 1" class="content-ico iconfont iconzuzhijigou"></span>
        <span v-if="content[0].nodeType === 2" class="content-ico iconfont icondanwei"></span>
        <span v-if="content[0].nodeType === 3" class="content-ico iconfont iconbumen"></span>
        <span class="organization-value" v-html="content[0].name"></span>
        <el-button v-if="content[0].nodeType === 1" @click.native="openEditNode(content[0])">编辑</el-button>
        <el-button v-if="content[0].nodeType === 2" @click.native="openEditUnit(content[0])">编辑</el-button>
        <el-button
          v-if="content[0].nodeType === 3"
          @click.native="openDepartmentEdit(content[0])"
        >编辑</el-button>
        <el-button @click="toLogData" style="margin-left: 5px">日志</el-button>
      </div>
      <!-- <div class="label-content">
         <span v-for="item in labelList" :key="item.id">{{item.name}}</span>
      </div>-->
      <div class="list-tab">
        <el-tabs v-model="activeName">
          <div class="content-title">{{activeName}}</div>
          <el-tab-pane label="下级设置" name="下级设置">
            <el-popover placement="bottom" width="100">
              <div class="popover" style="text-align: center; margin: 0">
                <div
                  style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);padding: 5px 0;cursor: pointer"
                  @click="goAddNode"
                  v-if="showAddNodeFlag"
                >添加节点</div>
                <div
                  style="border-bottom: 1px solid rgba(0, 0, 0, 0.1);padding: 5px 0;cursor: pointer"
                  v-if="showAddDepartmentFlag"
                  @click="goAddDepartment"
                >添加内设机构</div>
                <div
                  style="padding: 5px 0;cursor: pointer"
                  v-if="showAddUnitFlag && hasRight('orgCreate')"
                  @click="goAddUnit"
                >添加单位</div>
              </div>
              <el-button
                class="add-btn"
                slot="reference"
                :disabled="!hasRight('departmentCreate')"
              >添加下级</el-button>
            </el-popover>
            <!--下级列表-->
            <content-list
              v-if="activeName === '下级设置'"
              :content-id="contentId"
              :sortFlag="sortShowFlag"
              @cancel="getSortAction"
              @getPage="getPage"
              :contentPage="currentPage"
            ></content-list>
          </el-tab-pane>
          <el-tab-pane label="详细信息" name="详细信息" v-if="content[0]===0">
            <el-table :data="content" border size="medium">
              <template slot="empty">
                <div class="empty">
                  <p>
                    <img class="data-pic" src="@src/common/images/no-data1.png" alt />
                  </p>
                  <p>
                    <span style="padding-left: 8px;">暂无数据</span>
                  </p>
                </div>
              </template>
              <el-table-column label="名称" prop="name"></el-table-column>
              <el-table-column label="启用状态" prop="removed" align="center">
                <template slot-scope="scope">
                  <span class="text-able" v-show="scope.row.removed === 0">启用</span>
                  <span class="text-disable" v-show="scope.row.removed === 1">停用</span>
                </template>
              </el-table-column>
              <el-table-column prop="state" label="审核状态" width="100" align="center">
                <template slot-scope="scope">
                  <span v-show="scope.row.state === 0" style="color: #F56C6C">待审核</span>
                  <span v-show="scope.row.state === 1" style="color: #67C23A">已审核</span>
                  <span v-show="scope.row.state === 2" style="color: #67C23A">正常</span>
                </template>
              </el-table-column>
              <el-table-column prop="act" label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button
                    v-show="scope.row.nodeType === 1"
                    @click.native="openEditNode(scope.row)"
                    type="text"
                    size="small"
                  >修改</el-button>
                  <el-button
                    v-show="scope.row.nodeType === 3"
                    @click.native="openDepartmentEdit(scope.row)"
                    type="text"
                    size="small"
                  >修改</el-button>
                  <el-button
                    v-show="scope.row.nodeType === 2"
                    @click.native="openEditUnit(scope.row)"
                    type="text"
                    size="small"
                  >修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="人员管理" name="人员管理" v-if="content[0].nodeType !== 1">
            <person-list
              v-if="activeName === '人员管理' & !showExportPage"
              :sortFlag="sortShowFlag"
              @getPage="getPage"
              @cancel="getSortAction"
              :contentPage="currentPage"
              :id="content[0].bindId"
              :type="content[0].nodeType"
              :exportData="content[0]"
              @goExportPerson="goExportPerson"
            >
              <template slot="AddBtn">
                <el-button
                  class="add-btn"
                  @click="openAddPerson"
                  :disabled="!hasRight('userCreate')"
                >添加人员</el-button>
              </template>
            </person-list>
            <import-person
              v-if="showExportPage"
              :showExportPage="showExportPage"
              @cancel="goExportPerson"
              :id="content[0].bindId"
              :organizationName="content[0].name"
              :type="content[0].nodeType"
            ></import-person>
          </el-tab-pane>
          <el-tab-pane label="单位领导" name="单位主要领导" v-if="content[0].nodeType === 2">
            <leader-list
              v-if="activeName === '单位主要领导'"
              :content-id="content[0].bindId"
              :nodeType="1"
              @getPage="getPage"
              :nodeInfo="nodeInfo"
              :nodeData="nodeData"
            ></leader-list>
          </el-tab-pane>
          <el-tab-pane label="内设机构领导" name="内设机构主要领导" v-if="content[0].nodeType === 3">
            <leader-list
              v-if="activeName === '内设机构主要领导'"
              :content-id="content[0].bindId"
              @getPage="getPage"
              :nodeType="2"
              :nodeInfo="nodeInfo"
              :nodeData="nodeData"
            ></leader-list>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import organizationEdit from '@src/mixins/organization'
import hasRight from '@src/mixins/has-right'
import { api, urlNames } from '@src/api'
import ContentList from '../components/ContentList/index'
import PersonList from '../components/PersonList/index'
import leaderList from '../components/LeaderList/index'
import ImportPerson from '../components/ImportPerson/index'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'OrganizationContent',
  mixins: [organizationEdit, hasRight],
  components: {
    ContentList,
    PersonList,
    leaderList,
    ImportPerson
  },
  data () {
    return {
      contentId: this.$route.params.nodeId,
      loading: true,
      fullscreenLoading: true,
      showExportPage: false,
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
      labelList: [],
      nodeData: {}, // 用于弹窗
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
  beforeRouteUpdate (to, from, next) {
    this.activeName = '下级设置'
    this.contentId = to.params.nodeId
    next()
    this.init(to.query.type)
  },
  created () {
    console.log(this.$route.query, 9999)
    this.init(this.$route.query.type)
  },
  methods: {
    ...mapMutations(['SET_ORGANIZATION_PAGE', 'SET_ORGANIZATION_BACK_INFO']),

    goExportPerson () {
      this.showExportPage = !this.showExportPage
    },
    init (type) {
      if (type === 'back') {
        this.currentPage = Object.assign(
          this.currentPage,
          this.organization.page
        )
        this.backInfo = Object.assign(this.backInfo, this.organization.backInfo)
      } else {
        this.SET_ORGANIZATION_PAGE({})
        this.SET_ORGANIZATION_BACK_INFO({})
      }
      this.getContent()
    },
    setStore () {
      this.SET_ORGANIZATION_PAGE(this.currentPage)
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
          parentId: this.$route.params.nodeId,
          nodeType: this.$route.params.nodeType
        }
      })
    },
    goAddUnit () {
      this.setStore()
      this.$router.push({
        name: 'UnitAdd',
        params: {
          parentId: this.content[0].id,
          nodeType: this.content[0].nodeType
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
      }).then(
        res => {
          this.nodeData = res.data
          this.content[0] = res.data
          this.nodeType = res.data.nodeType
          this.selectType = this.content.nodeType
          this.nodeInfo.nodeType = res.data.nodeType
          this.nodeInfo.parentId = res.data.id
          this.loading = false
          if (this.content[0].bindId) {
            /* if (this.content[0].nodeType === 2) {
              this.findLabel(1)
            }
            if (this.content[0].nodeType === 3) {
              this.findLabel(2)
            } */
          }
          if (this.content[0].nodeType === 1) {
            this.showAddNodeFlag = true
            this.showAddDepartmentFlag = false
            this.showAddUnitFlag = true
          }
          if (this.content[0].nodeType === 3) {
            this.showAddNodeFlag = false
            this.showAddDepartmentFlag = true
            this.showAddUnitFlag = false
          }
          if (this.content[0].nodeType === 2) {
            this.showAddNodeFlag = false
            this.showAddDepartmentFlag = true
            this.showAddUnitFlag = true
          }
        },
        () => {
          this.$message.error(`没有内容`)
        }
      )
    },
    findLabel (type) {
      api[urlNames['findLabel']]({
        id: this.content[0].bindId,
        type: type
      }).then(
        res => {
          this.labelList = res.data
        },
        () => {}
      )
    },
    // 跳转日志
    toLogData () {
      let path = ''
      console.log('nodeData', this.nodeData)
      if (this.nodeData.nodeType === 1) {
        path = `/organization/operate-log/${this.nodeData.id}`
      } else {
        path = `/organization/operate-log/${this.nodeData.bindId}`
      }
      this.$router.push({
        path: path,
        query: {
          type: this.nodeInfo.nodeType,
          title: `${this.content[0].name}`,
          nodeId: this.nodeData.id
        }
      })
    }
  },
  watch: {
    isSort: {
      handler () {
        this.sortShowFlag = false
        this.showExportPage = false
      }
    }
  }
}
</script>

<style lang="less">
@import 'index';
.empty {
  p {
    margin: 0;
    font-size: 0px;
    text-align: center;
    line-height: 16px !important;
  }

  span {
    font-size: 12px;
  }
}

.data-pic {
  padding-top: 20px;
  width: 60px;
  height: auto;
}
</style>
