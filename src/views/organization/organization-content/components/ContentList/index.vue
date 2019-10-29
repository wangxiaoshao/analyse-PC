<template>
  <div class="content-list">
    <div class="button-wrap">
      <el-button @click="sortList">调整排序</el-button>
    </div>
    <div class="sort-do" v-if="sortFlag">
      按住左键上下拖动调整排序
      <a>保存</a>
      <a  @click="cancelSort">取消</a>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      stripe
      border
      highlight-current-row
      size="medium"
      id="contentTable"
    >
      <el-table-column prop="description" label="序号" width="60" align="center">
        <template slot-scope="scope">
          <i class="sortBtnDo menu-icon fa fa-bars"  v-if="sortFlag" style="font-size: 25px"></i>
          <span :title="scope" v-else>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="启用状态" prop="removed" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed">启用</span>
          <span class="text-disable" v-show="!scope.row.removed">停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="审核状态" width="100" align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.state === 0" style="color: #F56C6C">待审核</span>
          <span v-show="scope.row.state === 1" style="color: #67C23A">已审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="act" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.nodeType === 1"
            @click.native="openEditNode(scope.row)"
            type="text"
            size="small">
            修改
          </el-button>
          <el-button
            v-show="scope.row.nodeType === 2"
            @click.native="openDepartmentEdit(scope.row)"
            type="text"
            size="small">
            修改
          </el-button>
          <el-button
            v-show="scope.row.nodeType === 3"
            @click.native="openEditUnit(scope.row)"
            type="text"
            size="small">
            修改
          </el-button>
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
import Sortable from 'sortablejs'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable],
  data () {
    return {
      loading: true,
      list: [],
      sortListFlag: false,
      isShowEditFlag: true
    }
  },
  props: {
    sortFlag: {
      type: Boolean,
      request: true
    }
  },
  methods: {
    getGrid () {
      let data = {
        page: this.page.current,
        pageSize: this.page.limit,
        parentId: this.$route.params.nodeId
      }
      this.loading = true
      api[urlNames['findViewNodeList']](data).then((res) => {
        this.loading = false
        this.list = res.data
      }, () => {
        this.loading = false
        this.list = []
        this.page.total = 0
      })
    },
    cancelSort () {
      this.$emit('cancel', false)
    },
    sortList () {
      this.$emit('cancel', true)
    },
    // 打开编辑节点
    openEditNode (row) {
      this.$router.push({
        name: 'NodeEdit',
        params: {
          id: row.id
        }
      })
    },
    // 打开编辑单位
    openEditUnit (row) {
      this.$router.push({
        name: 'UnitEdit',
        params: {
          id: row.id
        }
      })
    },
    // 打开编辑部门
    openDepartmentEdit (row) {
      this.$router.push({
        name: 'DepartmentEdit',
        params: {
          id: row.id
        }
      })
    }

  },
  created () {
    // this.getGrid()
    if (this.$route.name === 'OrganizationContent') {
      this.isShowEditFlag = true
    } else {
      this.isShowEditFlag = false
    }
  },
  watch: {
    sortFlag: {
      handler (val) {
        const tbody = document.querySelector('#contentTable tbody')
        const items = this.list
        if (val) {
          Sortable.create(tbody, {
            handle: '.sortBtnDo',
            animation: 150,
            onUpdate: function (evt) {
              console.log('onUpdate.foo:', [evt])
              const newIndex = evt.newIndex
              const oldIndex = evt.oldIndex
              const $li = tbody.children[newIndex]
              const $oldLi = tbody.children[oldIndex]
              if (newIndex > oldIndex) {
                tbody.insertBefore($li, $oldLi)
              } else {
                tbody.insertBefore($li, $oldLi.nextSibling)
              }
              const item = items.splice(oldIndex, 1)
              items.splice(newIndex, 0, item[0])
              this.list = items // 排序后列表
              console.log(this.list)
            }
          })
        } else {
          this.sortListFlag = false
          this.getGrid()
        }
      },
      deep: true
    },
    '$route.params.nodeId': {
      handler (val) {
        this.getGrid()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
