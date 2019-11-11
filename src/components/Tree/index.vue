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
        <i class="imenu-icon fa fa-sitemap" v-if="node.nodeType"></i>
        <span>{{ node.label }}</span>
        <!--<span class="custom-tree-float">
          <el-button
            type="text"
            size="mini"
            @click="createTag(data, {flag:0,title:node.label})">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            class="delete"
            @click="deleteLabel(node.id)">
            删除
          </el-button>
        </span>-->
      </span>
  </el-tree>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  data () {
    return {
      showCheckboxFlag: false,
      treeList: [],
      teeeSonList: [],
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
      }
      this.findTreeSonList(node.data.id)
      this.id = node.data.id
      setTimeout(() => {
        resolve(this.treeSonList)
      }, 500)
      this.treeSonList = []
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

<style scoped>

</style>
