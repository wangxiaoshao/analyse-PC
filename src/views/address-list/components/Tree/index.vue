<template>
  <div class="tree-list">
    <el-tree
      ref="addressTreeList"
      :data="treeDate"
      node-key="id"
      :default-expanded-keys="[treeDate[0]!==undefined?treeDate[0].id: '']"
      :props="props"
      lazy
      :load="loadNode"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
      :highlight-current="true"
    >
      <span slot-scope="{ node, data }">
        <span class="iconfont iconzuzhijigou nodeColor" v-if="data.nodeType === 1"></span>
        <span class="iconfont icondanwei orgColor" v-if="data.nodeType === 2"></span>
        <span class="iconfont iconbumen deptColor" v-if="data.nodeType === 3"></span>
        <span style="margin-left:3px;" :title="node.label">{{node.label}}</span>
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
        label: 'name',
        isLeaf: 'leaf'
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
  mounted () {
    //  $store.state.app.option.user.orgId
    this.$nextTick(function () {
      this.$refs.addressTreeList.setCurrentKey(
        this.$store.state.app.option.user.orgId
      )
    })
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
            let treeData = []
            res.data.forEach(item => {
              if (item.hasChildren === 0) {
                item.leaf = true
              }
              treeData.push(item)
            })
            resolve(treeData)
          }
        })
      }
    },
    getSonNode (id) {},
    handleNodeClick (data) {
      this.$emit('handle-node-click', data)
    }
  }
}
</script>
<style lang="less">
@import 'index';
</style>
