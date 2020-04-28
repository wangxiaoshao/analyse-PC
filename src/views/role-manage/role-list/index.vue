<template>
  <div>
    <!--表格-->
    <el-table
      v-loading="loading"
      :data="list"
      border
      style="width: 100%">
      <template slot="empty">
        <div class="empty">
          <p><img class="data-pic" src="@src/common/images/no-data1.png" alt=""/></p>
          <p><span style="padding-left: 8px;">暂无数据</span></p>
        </div>
      </template>
      <el-table-column prop="title" label="角色名称">
      </el-table-column>
      <el-table-column prop="description" label="角色描述" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.description || '无'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="updatedTime" label="修改时间" width="150" align="center">
      </el-table-column>
      <el-table-column prop="value" label="启用状态" width="100" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed===0">启用</span>
          <span class="text-disable" v-show="scope.row.removed===1">停用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="goLookPerson(scope.row)" :disabled="!scope.row.allowAction">查看成员及权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination> -->
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
        page: 1,
        parentId: this.$route.params.nodeId,
        limit: 20
      }

      this.loading = true
      api[urlNames['findRoleList']](data).then((res) => {
        this.loading = false
        console.log(res.data)
        this.list = res.data
        // this.page.total = res.total
      }, () => {
        this.loading = false
        this.list = []
        // this.page.total = 0
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

<style scoped lang="less">
  .empty {
  p {
    margin: 0;
    font-size: 0px;
    text-align: center;
    line-height: 16px!important;
  }

  span {
    font-size: 12px;
  }
  }

  .data-pic {
    padding-top: 20px;
    width: 60px;
    height: auto;
  }
</style>
