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
    :render-content="renderContent"
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
    },
    renderContent (h, { node, data, store }) {
      console.log(87, data)
      if (data.type === 'node') {
        return (
          <span>
            <i class="menu-icon fa fa-sitemap" style="margin: 0 5px;"></i>
            <span>{node.label}</span>
          </span>)
      } else if (data.type === 'department') {
        return (
          <span>
            <i class="menu-icon fa fa-sitemap" style="margin: 0 5px;"></i>
            <span>{node.label}</span>
          </span>)
      } else {
        return (
          <span>
            <i class="menu-icon fa fa-sitemap" style="margin: 0 5px;"></i>
            <span>{node.label}</span>
          </span>)
      }
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
