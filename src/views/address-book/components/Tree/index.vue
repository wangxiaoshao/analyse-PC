<template>
  <div class="tree-list">
    <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input> -->
    <el-tree
      :props="props"
      :load="loadNode"
      node-key="id"
      lazy
      :expand-on-click-node='false'
      @node-click="handleNodeClick"
    >
      <!-- <span class="custom-tree-node" slot-scope="{ node, data }">
        <i class="imenu-icon fa fa-sitemap" v-if="data"></i>
        <span>{{ node.label }}</span>
      </span> -->
      <span class="svg-container" slot-scope="{ node, data }">
        <svg class="icon" aria-hidden="true" v-if="data">
          <use xlink:href="#iconzuzhijigou"></use>
        </svg>
        <span :title="node.label">{{node.label}}</span>
      </span>

       <span class="svg-container" slot-scope="{ node, data }">
        <span class="iconfont iconzuzhijigou" v-if="data"></span>
        <span :title="node.label">{{node.label}}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['thisUnit'],
  data () {
    return {
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      this_unit: {},
      childrenTree: [],
      subsetId: null
    }
  },
  created () {
    console.log(this.thisUnit, 'this.thisUnit')
  // this.getDepartmentPerson()
  },
  methods: {
    handleCheckChange (data) {
      this.getTmentChild(data.id)
    },
    handleNodeClick (data) {
      this.$emit('handle-nodeClick', data)
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        let treeParent = [{ name: '贵州省', id: '-1730833917365171641' }]
        return resolve(treeParent)
      }
      // if (node.level > 3) return resolve([]);
      api[urlNames['getDepartmentChildtree']]({
        departmentId: node.data.id
      }).then(res => {
        console.log(res, '---------------------------=')
        this.total = parseInt(res.total)
        if (res.data.length > 0) {
          resolve(res.data)
        } else {
          resolve([])
        }
      }).catch(err => {
        console.log(err)
      })
    }
    /**
     * 查询内设机构下的下级内设机构
     */
    // getTmentChild (subsetId) {
    //   this.childrenTree = [];
    //   api[urlNames['getDepartmentChildtree']]({
    //     departmentId: subsetId,
    //   }).then(res => {
    //     console.log(res,'------12323242---')
    //     this.total = parseInt(res.total)
    //     if (res.data.length > 0) {
    //        this.childrenTree = res.data
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
  },
  watch: {
    thisUnit (newvalue, oldvalue) {
      this.this_unit = newvalue
    }
  }
}
</script>
<style lang="less">
@import 'index';
</style>
