<template>
  <div class="create-view">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :disabled="!createBasic" label="视图基本信息" name="first">
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
              <el-button type="primary" @click="createView">保存视图基本信息</el-button>
              <el-button @click="backToList">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane :disabled="createBasic" label="视图组织机构" name="second">
        <div class="from">
          <el-form ref="form" :model="form" label-width="100px">
            <el-row :gutter="10">
              <el-col :span="7">
                <div class="grid-content bg-purple">
                  <el-form-item label="选择组织机构">
                    <div class="select-org">
                      <el-tree
                        ref="selecttree"
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
                        :expand-on-click-node="false"
                        :default-checked-keys="checkedKeys">
                      </el-tree>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7" :offset="2">
                <div class="grid-content bg-purple-light select-org-panel">
                    <div class="select-btn">
                      <p style="font-size: 14px;color: #606266;padding: 0 10px;">新机构视图</p>
<!--                      <p><el-button type="primary" size="small">新机构视图</el-button></p>-->
<!--                      <p><el-button size="small">旧机构视图</el-button></p>-->
                    </div>
                    <div class="select-org">
                      <el-tree
                        :data="viewNodeTree"
                        show-checkbox
                        node-key="id"
                        draggable
                        lazy
                        :load="loadOrgNode"
                        :props="defaultProps"
                        :check-strictly="true"
                        @node-drag-end="nodeDragEnd"
                        :expand-on-click-node="false"
                        :default-checked-keys="checkedKeys">
                      </el-tree>
                    </div>
                </div>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="synchronizedNode">保存视图</el-button>
              <el-button @click="backToList">取消</el-button>
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
      returnViewId: null, // 228770923203788800
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
        id: null
      }, // 树形渲染规则
      nodeDraftTree: [], // 机构草稿树
      viewNodeSonTree: [], // 机构草稿树子节点
      tempNode: [], // 拖拽节点中间变量
      viewNodeTree: [], // 右边草稿树节点
      syncChild: true,
      viewNodeDraft: {
        id: '',
        parentId: '',
        name: '',
        nodeType: null,
        bindId: null
      },
      createBasic: true, // tab切换禁用
      for: {
        id: '',
        parentId: '',
        viewId: '',
        name: ''
      },
      selectedKeys: [], // 已保存选中
      checkedKeys: []
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
          this.createBasic = false
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
    // 创建视图草稿
    createNodeDraft () {
      api[urlNames['createNodeDraft']]({
        syncChild: this.syncChild,
        viewId: this.returnViewId,
        viewNodeDraft: this.viewNodeDraft
      }).then((res) => {
        if (res.status === 0) {
          if (res.data !== undefined && res.data === '-1') {
            this.$message.info('该节点已存在')
          } else {
            this.$message.success('保存节点成功')
          }
          this.findNodeDraftList('-1')
        }
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
    // 左边机构-追加子节点
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
    // 获取视图草稿
    findNodeDraftList (parentId) {
      api[urlNames['findNodeDraftList']]({
        parentId: parentId,
        viewId: this.returnViewId
      }).then((res) => {
        this.viewNodeTree = res.data
      })
    },
    // 获取视图草稿--子节点调用
    findNodeDraftSonList (parentId) {
      api[urlNames['findNodeDraftList']]({
        parentId: parentId,
        viewId: this.returnViewId
      }).then((res) => {
        this.viewNodeSonTree = res.data
      })
    },
    // 视图草稿追加子节点
    loadOrgNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.viewNodeTree)
      }
      this.findNodeDraftSonList(node.data.id)
      setTimeout(() => {
        resolve(this.viewNodeSonTree)
      }, 500)
      this.viewNodeSonTree = []
    },
    // tab点击切换
    handleClick () {},
    // 设置tree选中
    setCheckedKeys () {
      // setChecked
      this.$refs.selecttree.setCheckedKeys(this.checkedKeys)
      // this.$refs.selecttree.setChecked(this.checkedKeys, true, this.syncChild)
    },
    // 允许拖拽--暂时无用
    allowDrop (draggingNode, dropNode, type) {
    },
    // 拖拽--暂时无用
    handleDragOver (draggingNode, dropNode, ev) {
      this.tempNode = draggingNode
      // console.log('Tree drag over: ', draggingNode.label, dropNode, ev.screenX)
    },
    // 拖拽结束时触发的事件--原来机构树
    nodedragend (Node, lastNode, lastTree, e) {
      console.log(e.screenX, e.screenY)
      if (e.screenX > 1020 && e.screenX < 1330 && e.screenY > 350 && e.screenY < 725) {
        this.viewNodeDraft.id = Node.data.id
        Node.data.parentId = this.viewNodeDraft.parentId = '-1'
        this.viewNodeDraft.name = Node.data.name
        this.viewNodeDraft.nodeType = Node.data.nodeType
        this.viewNodeDraft.bindId = Node.data.bindId
        console.log(JSON.parse(JSON.stringify(Node.data)), 'Node.data')
        this.$confirm('是否包括子节点', '提示', {
          confirmButtonText: '包括',
          cancelButtonText: '不包括',
          type: 'warning'
        }).then(() => {
          this.syncChild = true
          this.createNodeDraft()
        }).catch(() => {
          this.syncChild = false
          this.createNodeDraft()
        })
        this.checkedKeys.push(Node.data.id)
        this.setCheckedKeys()
        this.viewNodeTree.push(Node.data)
      }
      // console.log(e.screenX, '1020----------1330')
      // console.log(e.screenY, '425----------725')
    },
    // 草稿-》保存视图(同步草稿)
    synchronizedNode () {
      api[urlNames['synchronizedNode']]({
        viewId: this.returnViewId
      }).then((res) => {
        if (res.status === 0) {
          this.createBasic = true
        }
      })
    },
    // 草稿拖动排序
    updateNodeDraft (id, parentId) {
      api[urlNames['updateNodeDraft']]({
        id: id,
        parentId: parentId,
        viewId: this.returnViewId
      }).then((res) => {
        if (res.status === 0) {
          // this.findNodeDraftList('-1')
          this.$message.success('调整节点位置成功')
        }
      })
    },
    // 草稿拖动节点位置
    nodeDragEnd (dragNode, lastNode, seat, e) {
      if (lastNode === null) {
        this.updateNodeDraft(dragNode.data.id, '-1')
      } else {
        if (dragNode.data.id === lastNode.data.id) {
          return false
        }
        this.updateNodeDraft(dragNode.data.id, lastNode.data.id)
      }
      console.log(JSON.parse(JSON.stringify(dragNode.data)), JSON.parse(JSON.stringify(lastNode.data)), '------123-----')
    },
    // 单选框选中
    currentchange (node, checked) {
      if (this.viewNodeTree[this.viewNodeTree.length - 1].id === node.id) {
        return false
      }
      console.log(JSON.parse(JSON.stringify(node)), checked, 'node')
      if (checked) {
        this.viewNodeDraft.id = node.id
        node.parentId = this.viewNodeDraft.parentId = '-1'
        node.checked = true
        this.viewNodeDraft.name = node.name
        this.viewNodeDraft.nodeType = node.nodeType
        this.viewNodeDraft.bindId = node.bindId
        this.$confirm('是否包括子节点', '提示', {
          confirmButtonText: '包括',
          cancelButtonText: '不包括',
          type: 'warning'
        }).then(() => {
          this.syncChild = true
          this.createNodeDraft()
        }).catch(() => {
          this.syncChild = false
          this.createNodeDraft()
        })
        this.checkedKeys.push(node.id)
        this.viewNodeTree.push(node)
      }
    },
    // 返回列表
    backToList () {
      this.$router.push({ path: '/view-management' })
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
