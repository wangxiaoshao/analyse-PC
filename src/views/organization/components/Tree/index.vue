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
  data () {
    return {
      showCheckboxFlag: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      id: Number
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
    getTree () {
      const data = {
        parentId: -1,
        viewId: -1
      }
      api[urlNames['getTree']](data).then(res => {
        this.treeData = res.data
        this.id = this.treeData[0].id
        this.$emit('getDefault', this.id)
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
    this.getTree()
  },
  watch: {
    $route: {
      handler (val) {
        if (val.query.type || val.name === 'Organization') {
          this.getTree()
          this.setTreeId()
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
