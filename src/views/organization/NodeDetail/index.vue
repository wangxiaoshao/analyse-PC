<template>
  <div>节点详情</div>
</template>

<script>
import handleBreadcrumb from '@src/mixins/handleBreadcrumb.js'
export default {
  name: 'index',
  mixins: [ handleBreadcrumb ],
  data () {
    return {
      breadcrumbTitle: '添加节点'
    }
  },
  created () {
  },
  methods: {
    setBreadcrumbTitle () {
      if (this.$route.path === '/organization/nodeEdit') {
        if (this.$route.query.nodeId) {
          this.breadcrumbTitle = '编辑节点'
        } else {
          this.breadcrumbTitle = '添加节点'
        }
      } else {
        this.breadcrumbTitle = '节点详情'
      }
    }
  },
  mounted () {
    this.setBreadcrumbTitle()
    this.pushBreadcrumb({
      name: this.breadcrumbTitle,
      parent: {
        name: 'organization',
        query: {
          type: 'back'
        }
      }
    })
  },
  watch: {
    $route: {
      handle (val) {
        this.setBreadcrumbTitle()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">

</style>
