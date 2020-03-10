<template>
  <el-tree
    :data="treeList"
    node-key="id"
    :props="defaultProps"
    :highlight-current="true"
    :default-expanded-keys="defaultNode"
    :expand-on-click-node="false"
    lazy
    ref="treeList"
    :load="loadNode"
    @node-click="handleNodeClick"
  >
      <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
        <i class="imenu-icon fa fa-sitemap" v-if="data.nodeType === 1"></i>
        <i class="imenu-icon fa fa-building-o" v-if="data.nodeType === 2"></i>
        <i class="imenu-icon fa fa-institution" v-if="data.nodeType === 3"></i>
        <span :class="[data.id===$route.params.nodeId ||  data.id===$route.params.parentId?'active':'noActive']">{{node.label}}</span>
      </span> -->
       <span class=" svg-container" slot-scope="{ node, data }">
        <span :class="[data.id===$route.params.nodeId ?'active':'noActive']" class="iconfont iconzuzhijigou" v-if="data.nodeType === 1"></span>
        <span :class="[data.id===$route.params.nodeId ?'active':'noActive']" class="iconfont icondanwei" v-if="data.nodeType === 2"></span>
        <span :class="[data.id===$route.params.nodeId ?'active':'noActive']" class="iconfont iconbumen" v-if="data.nodeType === 3"></span>
        <span :class="[data.id===$route.params.nodeId ?'active':'noActive']" style="margin-left:3px;">{{node.label}}</span>
      </span>
  </el-tree>
</template>

<script>
import { api, urlNames } from '@src/api'

export default {
  data () {
    return {
      active: 'active',
      noActive: 'noActive',
      showCheckboxFlag: false,
      defaultNode: [],
      treeList: [],
      treeSonList: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      id: '',
      parentId: ''
    }
  },
  created () {
    this.findTreeList()
  },
  methods: {
    // 追加子节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.treeList)
      } else {
        api[urlNames['getTree']]({
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
        // this.findTreeSonList(node.data.id)
        // this.id = node.data.id
        // setTimeout(() => {
        //   resolve(this.treeSonList)
        // }, 800)
        // this.treeSonList = []
      }
    },
    findTreeList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId
      }).then((res) => {
        this.total = parseInt(res.total)
        this.treeList = res.data
        this.defaultNode.push(res.data[0].id)
        this.$emit('get-default-node', res.data[0].id)
        this.findTreeSonList(res.data[0].id)
        if (this.$route.name === 'Organization') {
          this.handleNodeClick(res.data[0])
        }
        // if (this.$route.name === 'Organization') {
        //   this.handleNodeClick(res.data[0])
        // }
      })
    },
    // 获取子节点
    findTreeSonList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId
      }).then((res) => {
        this.treeSonList = res.data
      })
    },
    handleNodeClick (node) {
      this.$emit('handle-node-click', node)
      /* if (node) {
          this.$emit('handle-node-click', node.bindId)
        } else {
          this.$emit('handle-node-click', node.id)
        } */
    }
  }
}
</script>

<style lang="less"  scoped>
  @import "index";
</style>
