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
  methods: {
    setTreeId (val) {
      this.$router.push({
        name: 'OrganizationContent',
        params: {
          nodeId: val
        }
      })
    },
    // 追加子节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.treeList)
      }
      this.findTreeSonList(node.data.id)
      this.id = node.data.id

      setTimeout(() => {
        resolve(this.teeeSonList)
      }, 500)
      this.teeeSonList = []
    },
    findTreeList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.total = parseInt(res.total)
        this.treeList = res.data
        if (this.$route.name === 'Organization') {
          this.setTreeId(res.data[0].id)
        }
        this.$emit('getDefault', res.data[0].id)
      })
    },
    // 获取子节点
    findTreeSonList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.teeeSonList = res.data
      })
    },
    // 点击节点加载子节点
    handleNodeClick (node) {
      this.findTreeSonList(node.id)
      this.$nextTick(() => {
        this.setTreeId(node.id)
      })
    }
  },
  mounted () {
    this.findTreeList(-1)
  },
  beforeRouteUpdate (to, from, next) {

  }
}
</script>

<style scoped>

</style>
