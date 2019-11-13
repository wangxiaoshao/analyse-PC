<template>
  <el-tree
    :data="treeList"
    node-key="id"
    :props="defaultProps"
    :highlight-current="true"
    lazy
    ref="treeList"
    :load="loadNode"
    @node-click="handleNodeClick"
   >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <i class="imenu-icon fa fa-sitemap" v-if="data.nodeType === 1"></i>
        <i class="imenu-icon fa fa-building-o" v-if="data.nodeType === 2"></i>
        <i class="imenu-icon fa fa-institution" v-if="data.nodeType === 3"></i>
        <span :class="[data.id===$route.params.nodeId ?'active':'noActive']">{{node.label}}</span>
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
      treeList: [],
      treeSonList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      id: '',
      parentId: -1
    }
  },
  mounted () {
    this.findTreeList(-1)
  },
  methods: {
    // 追加子节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.treeList)
      } else {
        this.findTreeSonList(node.data.id)
        this.id = node.data.id
        setTimeout(() => {
          resolve(this.treeSonList)
        }, 800)
        this.treeSonList = []
      }
    },
    findTreeList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.total = parseInt(res.total)
        this.treeList = res.data
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
        parentId: parentId,
        viewId: -1
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

<style lang="less">
  @import "index";
</style>
