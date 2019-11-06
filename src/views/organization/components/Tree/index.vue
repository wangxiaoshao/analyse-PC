<template>
  <el-tree
    :data="labelList"
    node-key="id"
    :props="defaultProps"
    lazy
    :load="loadNode"
    @node-click="selectNode">
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
      labelList: [],
      labelSonList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      id: Number,
      parentId: -1
    }
  },
  methods: {
    selectNode (el) {
      this.id = el.id
      this.label = el.label
      this.nodeType = el.type
      this.setTreeId()
    },
    setTreeId () {
      this.$router.push({
        name: 'OrganizationContent',
        params: {
          nodeId: this.id
        }
      })
    },
    // 追加子节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.labelList)
      }
      this.findLabelSonList(node.data.id)
      setTimeout(() => {
        resolve(this.labelSonList)
      }, 500)
      this.labelSonList = []
    },
    findLabelList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.total = parseInt(res.total)
        this.labelList = res.data
      })
    },
    // 获取子节点
    findLabelSonList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.labelSonList = res.data
      })
    },
    // 点击节点加载子节点
    handleNodeClick (node) {
      this.findLabelSonList(node.id)
    }
  },
  created () {
    this.findLabelList(-1)
  },
  watch: {
    $route: {
      handler (val) {
        if (val.name === 'Organization' || val.query.type === 'back') {
          this.getTree()
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
