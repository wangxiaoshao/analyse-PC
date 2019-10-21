<template>
    <div>创建视图</div>
</template>

<script>
import handleTable from '@src/mixins/handleTable'
import handleBreadcrumb from '@src/mixins/handleBreadcrumb.js'
export default {
  name: 'CreateView',
  mixins: [handleTable, handleBreadcrumb],
  mounted () {
    this.pushBreadcrumb({
      name: '创建视图',
      parent: {
        name: 'ViewManagement',
        query: {
          type: 'back'
        }
      }
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="less">

</style>
