<template>
<div class="operate-log">
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="50"
      label="序号"
    align="center">
    </el-table-column>
<!--    <el-table-column-->
<!--      type="selection"-->
<!--      width="55">-->
<!--    </el-table-column>-->
    <el-table-column
      prop="date"
      label="更改人员"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="更改动作"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="更改时间">
    </el-table-column>
    <el-table-column
      prop="address"
      align="center"
      label="更改内容">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable, handleBreadcrumb],
  name: 'OperateLog',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created () {
    this.findEntityChangeLoggerList(this.$route.params.id, this.$route.query.type)
  },
  mounted () {
    this.pushBreadcrumb({
      name: `${this.$route.query.title}日志`,
      parent: {
        name: 'OrganizationContent',
        params: {
          nodeId: this.$route.params.id
        },
        query: {
          type: 'back'
        }
      }
    })
  },
  methods: {
    findEntityChangeLoggerList (id, type) {
      api[urlNames['findEntityChangeLoggerList']]({
        entityType: type,
        entityId: id
      }).then((res) => {
        console.log(res.data)
      }, (error) => {
      })
    }
  }
}
</script>

<style scoped>

</style>
