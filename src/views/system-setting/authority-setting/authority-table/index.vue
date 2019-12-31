<template>
  <div class="authority-table">
    <el-table
      ref="multipleTable"
      border
      stripe
      :data="tableData"
      size="medium"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        width="50"
        lable="序号">
      </el-table-column>
      <el-table-column
        property="name"
        label="操作标识"
        align="center">
      </el-table-column>
      <el-table-column
        property="title"
        label="操作名称"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AuthorityTable',
  props: ['tableData', 'selectData', 'tableId'],
  data () {
    return {}
  },
  created () {

  },
  methods: {
    // 勾选数据
    handleSelectionChange (data) {
      this.$emit('changeSelection', data, this.tableId)
    }
  },
  watch: {
    // tableId: {
    //   handle (val) {
    //     if (this.selectData.length > 0) {
    //       this.selectData.forEach(item => {
    //         this.$refs.multipleTable.toggleRowSelection(item, true)
    //       })
    //     }
    //   },
    //   deep: true
    // }
  }
}
</script>

<style lang="less">
</style>
