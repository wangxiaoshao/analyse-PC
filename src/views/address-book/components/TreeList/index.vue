<template>
  <div class="treelist">
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
       <span class=" svg-container" slot-scope="{ node, data }">
          <span class="iconfont iconzuzhijigou" v-if="data.nodeType === 1"></span>
          <span class="iconfont icondanwei" v-if="data.nodeType === 2"></span>
          <span class="iconfont iconbumen" v-if="data.nodeType === 3"></span>
          <span :title="node.label">{{node.label}}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  data () {
    return {
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
      // api[urlNames['getTree']]({
      //   parentId: parentId,
      //   viewId: -1
      // }).then((res) => {

      //   this.total = parseInt(res.total)
      //   this.treeList = res.data
      //   if (this.$route.name === 'Organization') {
      //     this.handleNodeClick(res.data[0])
      //   }
      // if (this.$route.name === 'Organization') {
      //   this.handleNodeClick(res.data[0])
      // }
      // })
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
@import 'index';
</style>
