<template>
  <div class="tree-list">
    <el-tree
      :data="treeDate"
      node-key="id"
      :default-expanded-keys="[treeDate[0]!==undefined?treeDate[0].id: '']"
      :props="props"
      lazy
      :load="loadNode"
      :expand-on-click-node=false
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- <i class="imenu-icon fa fa-sitemap" v-if="data"></i> -->
        <i class="imenu-icon fa fa-sitemap" v-if="data.nodeType === 1"></i>
        <i class="imenu-icon fa fa-building-o" v-if="data.nodeType === 2"></i>
        <i class="imenu-icon fa fa-institution" v-if="data.nodeType === 3"></i>
        <!-- <span style="margin-left:3px;" >{{ data.name }}</span> -->
        <span :class="[data.id===$route.params.nodeId ?'active':'noActive']" style="margin-left:3px;">{{node.label}}</span>

      </span>
    </el-tree>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['treeList'],
  data () {
    return {
      props: {
        children: 'children',
        label: 'name'
      },
      sonNode: [],
      active: 'active',
      noActive: 'noActive'
    }
  },
  computed: {
    treeDate () {
      return this.treeList
    }
  },
  methods: {

    // 追加子节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.treeDate)
      } else {
        api[urlNames['getAddressListTree']]({
          parentId: node.data.id
        }).then(res => {
          if (res.status === 0) {
            resolve(res.data)
          }
        })
      }
    },
    getSonNode (id) {
    },
    handleNodeClick (data) {
      this.$emit('handle-node-click', data)
    }
  }

}
</script>
<style lang="less">
@import 'index';
</style>
