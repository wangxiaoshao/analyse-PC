<template>
  <el-tree
    :data="treeList"
    node-key="id"
    :props="defaultProps"
    :highlight-current="true"
    lazy
    ref="treeList"
    :load="loadNode"
    @node-click="handleNodeOtherClickTree"
   >
      <span class="custom-tree-node " slot-scope="{ node, data }">
        <i class="imenu-icon fa fa-sitemap" v-if="data"></i>
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
      departmentList: [],
      treeDepartmentList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      id: '',
      parentId: null,
      bindId: null
    }
  },
  mounted () {
    this.findTreeList()
    // this.findTreeDepartmentlist(1)
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
    //  获取子节点
    findTreeSonList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId
      }).then((res) => {
        console.log(res, '------12323242---')
        this.treeSonList = res.data
        this.otherDepartantList = this.treeSonList
        console.log(this.otherDepartantList, '12123--0--')
      })
    },
    findTreeList (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId
      }).then((res) => {
        this.total = parseInt(res.total)
        this.treeList = res.data
        this.$emit('get-default-node', res.data[0].id, res.data[0].name)
      })
    },

    handleNodeOtherClickTree (data) {
      console.log(JSON.parse(JSON.stringify(data)), '222222')
      this.$emit('handle-node-other-click', data)
      // this.$emit('handle-node-click', node)
      // if (node) {
      //   this.$emit('handle-node-click', node.bindId)
      // } else {
      //   this.$emit('handle-node-click', node.id)
      // }
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
