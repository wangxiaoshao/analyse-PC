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
      row-key="id"
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
      <el-table-column prop="act" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
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
import handleTable from '@src/mixins/handleTable'
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
        pageSize: this.page.limit
      }
      this.loading = true
      api[urlNames['getChildList']](data).then((res) => {
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
    }

  },
  created () {
    this.getGrid()
    if (this.$route.name === 'OrganizationContent') {
      this.isShowEditFlag = true
    } else {
      this.isShowEditFlag = false
    }
  },
  mounted () {

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
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
