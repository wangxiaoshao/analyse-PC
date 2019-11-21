<template>
  <div>
    <!--表格-->
    <el-table
      v-loading="loading"
      :data="list"
      stripe
      border
      highlight-current-row
      :max-height="tableMaxHeight"
      style="width: 100%">
      <el-table-column prop="name" label="角色名称">
      </el-table-column>
      <el-table-column prop="title" label="角色描述">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="value" label="启用状态" width="100" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed">启用</span>
          <span class="text-disable" v-show="!scope.row.removed">停用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="goLookPerson(scope.row)">查看成员及权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  mixins: [handleTable],
  data () {
    return {
      list: [],
      loading: true
    }
  },
  computed: {
    ...mapState(['roleManage'])
  },
  created () {
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.roleManage.page)
      this.$router.push({
        name: 'RoleList',
        params: {
          type: 'back',
          id: this.roleManage.listId
        }
      })
    } else {
      this.SET_ROLEMANAGE_PAGE({})
      this.LIST_ID({})
    }
    this.getGrid()
  },
  methods: {
    ...mapMutations(['SET_ROLEMANAGE_PAGE', 'LIST_ID']),
    getGrid () {
      let data = {
        page: this.page.current,
        parentId: this.$route.params.nodeId,
        limit: this.page.limit
      }
      this.loading = true
      api[urlNames['findRoleList']](data).then((res) => {
        this.loading = false
        console.log(res.data)
        this.list = res.data
      }, () => {
        this.loading = false
        this.list = []
        this.page.total = 0
      })
    },
    goLookPerson (row) {
      this.SET_ROLEMANAGE_PAGE(this.page)
      this.LIST_ID(this.$route.params.id)
      this.$router.push({
        name: 'lookPersonPermission',
        params: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
