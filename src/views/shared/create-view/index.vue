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
                  <el-form-item label="视图管理员" >
                    <el-select
                      :disabled="!hasRight('viewSettingManager')"
                     v-model="ViewFrom.roleBindUserIds" @remove-tag="removeManager" multiple
                               placeholder="请选择">
                      <el-option
                        v-for="item in adminList"
                        :key="item.uid"
                        :label="item.name"
                        :value="item.uid">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="启用状态">
                    <el-switch v-model="ViewFrom.removed"></el-switch>
                  </el-form-item>
                  <el-form-item v-if="returnViewId!=='0'" label="视图ID">
                    <el-input  disabled v-model="returnViewId"></el-input>
                  </el-form-item>
                  <!--                暂时隐藏  <el-form-item label="备注">-->
                  <!--                    <el-input v-model="ViewFrom.remark"></el-input>-->
                  <!--                  </el-form-item>-->
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
      <el-tab-pane :disabled="tabDisable" label="视图组织机构" name="second">
        <div class="from tree-form">
          <el-form ref="form" :model="form">
          <div class="tree-panel">
                <div class="grid-content">
                  <div class="tree-title">选择组织机构</div>
                  <el-form-item label="">
                    <div class="select-org">
                        <el-tree
                          ref="selecttree"
                          :data="nodeTree"
                          node-key="id"
                          draggable
                          lazy
                          :props="defaultProps"
                          :load="loadNode"
                          @check-change="currentchange"
                          :check-strictly="true"
                          :allow-drag="allowSourceDrag"
                          :allow-drop="allowSourceDrop"
                          @node-drag-end="nodeDragEnd"
                          @node-drag-over="handleDragOver"
                          :default-expanded-keys="[defaultexpandedkeys]"
                          :expand-on-click-node="false"
                          :default-checked-keys="checkedKeys">
                          <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
                            <i class="imenu-icon fa fa-sitemap" v-if="data.nodeType === 1"></i>
                            <i class="imenu-icon fa fa-building-o" v-if="data.nodeType === 2"></i>
                            <i class="imenu-icon fa fa-institution" v-if="data.nodeType === 3"></i>
                            <span>{{node.label}}</span>
                          </span> -->
                              <span class="svg-container" slot-scope="{ node, data }">
                                <span class="iconfont iconzuzhijigou" v-if="data.nodeType === 1"></span>
                                <span class="iconfont icondanwei" v-if="data.nodeType === 2"></span>
                                <span class="iconfont iconbumen" v-if="data.nodeType === 3"></span>
                                <span class="label">{{node.label}}</span>
                              </span>
                        </el-tree>
                    </div>
                  </el-form-item>
                </div>
                <div class="grid-content drag-tips">
                  <p class="tips-img"><img src="@src/common/images/drag-drop.svg"></p>
                  <p class="tips-title"><span>选择左边的组织机构视图，拖动至右边的视图区域，可以组合成你想要的组织机构树形。</span></p>
                </div>
                <div class="grid-content">
                  <div class="tree-title">新机构视图</div>
                  <!--                select-org-panel   <div class="select-btn">-->
                  <!--                    <p style="font-size: 14px;color: #606266;padding: 0 10px;">新机构视图</p>-->
                  <!--                                          <p><el-button type="primary" size="small">新机构视图</el-button></p>-->
                  <!--                                          <p><el-button size="small">旧机构视图</el-button></p>-->
                  <!--                  </div>-->
                  <el-form-item>
                    <div class="select-org select-org123" ref="coordinates">
                      <el-tree
                        :data="viewNodeTree"
                        node-key="id"
                        draggable
                        lazy
                        :load="loadOrgNode"
                        :props="defaultProps"
                        :check-strictly="true"
                        :allow-drag="allowDestinationDrag"
                        :allow-drop="allowDestinationDrop"
                        @node-drag-end="nodeSelectDragEnd"
                        :expand-on-click-node="false"
                        :default-checked-keys="checkedKeys">
                        <!-- <div class="custom-tree-node" slot-scope="{ node, data }">
                          <i class="imenu-icon fa fa-sitemap" v-if="data.nodeType === 1"></i>
                          <i class="imenu-icon fa fa-building-o" v-if="data.nodeType === 2"></i>
                          <i class="imenu-icon fa fa-institution" v-if="data.nodeType === 3"></i>
                          <span>{{node.label}}</span>
                          <span @click="deleteNodeTree(data.id)" class="delete-icon fa fa-trash-o"></span>
                        </div> -->
                          <div class="svg-container" slot-scope="{ node, data }">
                            <span class="iconfont iconzuzhijigou" v-if="data.nodeType === 1"></span>
                            <span class="iconfont icondanwei" v-if="data.nodeType === 2"></span>
                            <span class="iconfont iconbumen" v-if="data.nodeType === 3"></span>
                            <span class="label">{{node.label}}</span>
                            <span @click="deleteNodeTree(data.id)" class="delete-icon fa fa-trash-o"></span>
                          </div>
                      </el-tree>
                    </div>
                  </el-form-item>
                </div>
          </div>
            <el-form-item>
              <el-button style="margin-left: 267px" type="primary" @click="synchronizedNode">保存视图</el-button>
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
import HasRight from '@src/mixins/has-right'

export default {
  name: 'CreateView',
  mixins: [handleTable, handleBreadcrumb, HasRight],
  data () {
    return {
      defaultexpandedkeys: '-1730833917365171641',
      activeName: 'first',
      tabDisable: true,
      adminList: [],
      ViewFrom: {
        name: '',
        remark: '',
        removed: true,
        roleBindUserIds: []
      },
      returnViewId: this.$route.params.id, // 228770923203788800
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
        id: null,
        isLeaf: 'leaf'
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
        bindId: null,
        sort: 0
      },
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
    this.findNodeTree()
    if (this.$route.params.id !== '0') {
      this.tabDisable = false
      this.findNodeDraftList('-1')
      this.findViewById(this.$route.params.id)
    }
  },
  methods: {
    // 获取树的左上点的坐标
    getCoordinates () {
      return { x: window.screenX }
    },
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
      if (this.returnViewId === '0') {
        this.returnViewId = ''
      }
      api[urlNames['createView']]({
        id: this.returnViewId,
        name: this.ViewFrom.name,
        remark: '暂时隐藏',
        removed: this.ViewFrom.removed ? 0 : 1,
        roleBindUserId: this.ViewFrom.roleBindUserIds
      }).then((res) => {
        if (res.status === 0) {
          this.returnViewId = res.data
          this.activeName = 'second'
          this.tabDisable = false
          this.$message.success('基本信息保存成功')
          console.log(res)
        }
      })
    },
    removeManager (uid) {
      if (this.$route.params.id !== '0') {
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api[urlNames['deleteViewAdmin']]({
            viewId: this.returnViewId,
            uid: uid
          }).then((res) => {
            if (res.status === 0) {
              this.findViewById(this.$route.params.id)
              this.$message.success('删除成功')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    // 获取管理员列表
    findViewAdmin () {
      api[urlNames['findViewAdmin']]({}).then((res) => {
        if (res.status === 0) {
          this.adminList = res.data
        }
      })
    },
    // 获取机构树--初始化
    findNodeTree (parentId) {
      api[urlNames['getViewTree']]({}).then((res) => {
        this.nodeTree = res.data
        if (res.data.length !== 0) {
          this.defaultexpandedkeys = res.data[0].id
        }
      })
    },
    // 创建视图草稿
    createNodeDraft () {
      let nodeList = []

      this.viewNodeTree.forEach((item, index) => {
        let syncChild = false

        if (this.viewNodeDraft.id === item.data.id) {
          syncChild = this.syncChild
        }

        nodeList.push({
          id: item.data.id,
          parentId: -1,
          sort: index,
          syncChild
        })
      })

      if (this.returnViewId === 0) {
        this.returnViewId = ''
      }
      api[urlNames['createNodeDraft']]({
        viewId: this.returnViewId,
        viewNodeDraft: nodeList
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
      api[urlNames['getViewTree']]({
        parentId: parentId
      }).then((res) => {
        this.nodeSonTree = res.data
      })
    },
    // 左边机构-追加子节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.nodeTree)
      }
      api[urlNames['getViewTree']]({
        parentId: node.data.id
      }).then((res) => {
        let treeData = []
        res.data.forEach(item => {
          if (item.hasChildren === 0) {
            item.leaf = true
          }
          treeData.push(item)
        })
        resolve(treeData)
      })
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
    // 视图草稿追加子节点
    loadOrgNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.viewNodeTree)
      }
      api[urlNames['findNodeDraftList']]({
        parentId: node.data.id,
        viewId: this.returnViewId
      }).then((res) => {
        let treeData = []
        res.data.forEach(item => {
          if (item.hasChildren === 0) {
            item.leaf = true
          }
          treeData.push(item)
        })
        resolve(treeData)
      })
      this.viewNodeSonTree = []
    },
    // tab点击切换
    handleClick () {
    },
    // 设置tree选中
    setCheckedKeys () {
      // setChecked
      this.$refs.selecttree.setCheckedKeys(this.checkedKeys)
      // this.$refs.selecttree.setChecked(this.checkedKeys, true, this.syncChild)
    },
    // 允许数据源拖拽
    allowSourceDrag (draggingNode) {
      return true
    },
    // 允许数据源拖放
    allowSourceDrop (draggingNode, dropNode, type) {
      return false
    },
    // 允许目标拖拽
    allowDestinationDrag (draggingNode) {
      return true
    },
    // 允许目标拖放
    allowDestinationDrop (draggingNode, dropNode, type) {
      return true
    },
    // 拖拽--暂时无用
    handleDragOver (draggingNode, dropNode, ev) {
      this.tempNode = draggingNode
      // console.log('Tree drag over: ', draggingNode.label, dropNode, ev.screenX)
    },
    // 拖拽结束时触发的事件--原来机构树
    nodeDragEnd (Node, lastNode, lastTree, e) {
      let rect = this.$refs.coordinates.getClientRects()[0]

      if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) {
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
          this.backToList()
        }
      })
    },
    // 草稿拖动排序
    updateNodeDraft (id, nodeList) {
      api[urlNames['createNodeDraft']]({
        viewId: this.returnViewId,
        viewNodeDraft: nodeList
      }).then((res) => {
        if (res.status === 0) {
          if (res.data !== undefined && res.data === '-1') {
            this.$message.info('存在重复的节点')
          } else {
            this.$message.success('保存节点成功')
          }
          this.findNodeDraftList('-1')
        }
      })
      /* api[urlNames['updateNodeDraft']]({
        id: id,
        parentId: parentId,
        viewId: this.returnViewId
      }).then((res) => {
        if (res.status === 0) {
          this.findNodeDraftList('-1')
          this.$message.success('调整节点位置成功')
        }
      }) */
    },
    // 删除视图草稿 - deleteViewById
    deleteNodeTree (id) {
      this.$confirm('是否也要删除该节点以下子节点信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api[urlNames['deleteViewById']]({
          id: id,
          viewId: this.returnViewId
        }).then((res) => {
          if (res.status === 0) {
            this.findNodeDraftList('-1')
            this.$message.success('删除成功')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 草稿拖动节点位置
    nodeSelectDragEnd (dragNode, lastNode, seat, e) {
      let nodeList = []
      let parentId = -1

      if (lastNode === null) {
        this.viewNodeTree.forEach((item, index) => {
          nodeList.push({
            id: item.data.id,
            parentId: parentId,
            sort: index
          })
        })

        nodeList.push({
          id: dragNode.data.id,
          parentId: -1,
          sort: this.viewNodeTree.length
        })
      } else {
        if (dragNode.data.id === lastNode.data.id) {
          return false
        }

        parentId = lastNode.parent.data.id
        lastNode.parent.childNodes.forEach((item, index) => {
          nodeList.push({
            id: item.data.id,
            parentId: parentId,
            sort: index
          })
        })
      }

      this.updateNodeDraft(dragNode.data.id, nodeList)
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
    },
    // 获取试图详情
    findViewById (id) {
      api[urlNames['findViewById']]({
        id: id
      }).then((res) => {
        this.ViewFrom.name = res.data.name
        this.ViewFrom.removed = !res.data.removed
        this.ViewFrom.roleBindUserIds = []
        res.data.list.forEach(item => {
          this.ViewFrom.roleBindUserIds.push(item.uid)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";

  .el-tree-node__content:hover {
    .fa-trash-o {
      display: block;
    }
  }
</style>
