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
      },
      id: 1111
    }
  },
  methods: {
    selectNode (el) {
      this.id = el.id
    },
    setTreeId () {
      this.$router.push({
        name: 'OrganizationContent',
        params: {
          id: this.id
        }
      })
    }
  },
  created () {
    api[urlNames['getTree']]().then(res => {
      this.treeData = res.data
      this.id = this.treeData[0].id
      this.setTreeId()
      console.log('树', res.data)
    })
  },
  watch: {
    id: {
      handler (val) {
        this.setTreeId()
      }
    }
  }
}
</script>

<style scoped>

</style>
