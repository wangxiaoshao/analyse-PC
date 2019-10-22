<template>
  <el-tree
    :data="treeData"
    :show-checkbox="showCheckboxFlag"
    highlight-curren="true"
    default-expand-all
    node-key="id"
    ref="tree"
    highlight-current
    :props="defaultProps"
    @node-click="selectNode"
  >
  </el-tree>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  name: 'index',
  data () {
    return {
      showCheckboxFlag: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    selectNode (el) {
      console.log(el)
    }
  },
  created () {
    api[urlNames['getTree']]().then(res => {
      this.treeData = res.data
      console.log('树', res.data)
    })
  }
}
</script>

<style scoped>

</style>
