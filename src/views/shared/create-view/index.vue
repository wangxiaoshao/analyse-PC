<template>
  <div class="create-view">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="视图基本信息" name="first">
        <div class="from">
          <el-form ref="form" :rules="rules" :model="ViewFrom" label-width="100px">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="视图名称" prop="name">
                    <el-input v-model="ViewFrom.name"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="视图管理员">
                    <el-select v-model="ViewFrom.roleBindUserIds" multiple placeholder="请选择">
                      <el-option
                        v-for="item in adminList"
                        :key="item.uid"
                        :label="item.name"
                        :value="item.uid">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="备注">
                    <el-input v-model="ViewFrom.remark"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="启用状态">
                    <el-switch v-model="ViewFrom.removed"></el-switch>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="createView">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="视图组织机构" name="second">
        <div class="from">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row :gutter="10">
              <el-col :span="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="选择组织机构">
                    <div class="select-org">
                      <el-tree
                        :data="nodeTree"
                        show-checkbox
                        node-key="id"
                        draggable
                        lazy
                        :props="defaultProps"
                        :load="loadNode"
                        @check-change="currentchange"
                        :check-strictly="true"
                        :allow-drop="allowDrop"
                        @node-drag-end="nodedragend"
                        @node-drag-over="handleDragOver"
                        :expand-on-click-node="false">
                      </el-tree>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7" :offset="2">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="视图组织机构">
                    <div class="select-org">
                      <el-tree
                        :data="viewNodeTree"
                        show-checkbox
                        node-key="id"
                        draggable
                        lazy
                        :props="defaultProps"
                        :check-strictly="true"
                        @node-drag-enter="handleDragEnter"
                        :expand-on-click-node="false">
                      </el-tree>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
export default {
  name: 'CreateView',
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      activeName: 'first',
      adminList: [{
        uid: '156156516',
        type: '选项1',
        name: '黄金糕'
      }, {
        uid: '1561256516',
        type: '选项1',
        name: '黄金糕2'
      },
      {
        uid: '1561536516',
        type: '选项1',
        name: '黄金糕1'
      }],
      ViewFrom: {
        name: '',
        remark: '',
        removed: true,
        roleBindUserIds: []
      },
      returnViewId: null,
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入视图名称', trigger: 'blur' }
        ]
      },
      nodeTree: [], // 树节点
      nodeSonTree: [], // 子节点
      defaultProps: {
        children: 'children',
        label: 'name',
        id: ''
      }, // 树形渲染规则
      nodeDraftTree: [], // 机构草噶
      tempNode: [], // 拖拽节点中间变量
      viewNodeTree: [], // 右边草稿树节点
      for: {
        id: '',
        parentId: '',
        viewId: '',
        name: ''
      }
    }
  },
  mounted () {
    this.pushBreadcrumb({
      name: '创建视图',
      parent: {
        name: 'ViewManagement',
        query: {
          type: 'back'
        }
      }
    })
  },
  created () {
    this.findViewAdmin()
    this.findNodeTree('-1')
    if (this.$route.params.id !== undefined) {
      this.findNodeDraftList(this.$route.params.id)
    }
  },
  methods: {
    // 创建视图基本信息
    createView () {
      if (this.ViewFrom.name.trim().length === 0) {
        this.$message.warning('请填写视图名称')
        return false
      }
      if (this.ViewFrom.roleBindUserIds.length === 0) {
        this.$message.warning('请选择视图管理员')
        return false
      }
      api[urlNames['createView']]({
        name: this.ViewFrom.name,
        remark: this.ViewFrom.remark,
        removed: this.ViewFrom.removed,
        roleBindUserId: this.ViewFrom.roleBindUserIds
      }).then((res) => {
        if (res.status === 0) {
          this.returnViewId = res.data
          this.activeName = 'second'
          this.$message.success('基本信息保存成功')
          console.log(res)
        }
      })
    },
    // 获取管理员列表
    findViewAdmin () {
      api[urlNames['findViewAdmin']]({}).then((res) => {
        if (res.status === 0) {
          // this.adminList = res.data
        }
      })
    },
    // 获取机构树--初始化
    findNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.nodeTree = res.data
      })
    },
    // 获取视图草稿
    findNodeDraftList (parentId) {
      api[urlNames['findNodeDraftList']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.nodeTree = res.data
      })
    },
    // 创建视图草稿
    createNodeDraft (parentId) {
      api[urlNames['findNodeDraftList']]({
        parentId: parentId,
        viewId: this.returnViewId ? this.returnViewId : this.$route.params.id
      }).then((res) => {
        this.nodeTree = res.data
      })
    },
    // 获取机构树--加载子节点
    findSonNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.nodeSonTree = res.data
      })
    },
    // 追加子节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.nodeTree)
      }
      this.findSonNodeTree(node.data.id)
      setTimeout(() => {
        resolve(this.nodeSonTree)
      }, 500)
      this.nodeSonTree = []
    },
    // tab点击切换
    handleClick () {},
    allowDrop (draggingNode, dropNode, type) {
    },
    // 拖拽--暂时无用
    handleDragOver (draggingNode, dropNode, ev) {
      this.tempNode = draggingNode
      // console.log('Tree drag over: ', draggingNode.label, dropNode, ev.screenX)
    },
    // 拖拽结束时触发的事件--原来机构树
    nodedragend (Node, lastNode, lastTree, e) {
      if (e.screenX > 1020 && e.screenX < 1330 && e.screenY > 425 && e.screenY < 725) {
        this.viewNodeTree.push(Node.data)
      }
      // console.log(e.screenX, '1020----------1330')
      // console.log(e.screenY, '425----------725')
    },
    handleDragEnter () {
    },
    onSubmit () {
      console.log('submit!')
    },
    // 单选框选中
    currentchange (node, checked) {
      if (checked) {
        this.$confirm('是否选择子节点', '提示', {
          confirmButtonText: '选择',
          cancelButtonText: '不选择',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '选择!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '不选择'
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
