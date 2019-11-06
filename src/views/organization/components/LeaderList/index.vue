<template>
  <div class="leader-list-content">
    <div class="list-ground">
      <el-table
        :data="mainList"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    <div class="content-title">
      单位其他领导
    </div>
    <div class="list-ground">
      <div class="button-wrap">
        <el-button type="primary">添加领导</el-button>
        <el-button @click="sortFlag = true">调整排序</el-button>
      </div>
      <div class="sort-do" v-if="sortFlag">
        按住左键上下拖动调整排序
        <a >保存</a>
        <a  @click="sortFlag = false">取消</a>
      </div>
      <el-table
        v-loading="loading"
        :data="list"
        stripe
        border
        highlight-current-row
        size="medium"
        id="leaderList"
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
            <el-button @click.native="openEditNode(scope.row)" type="text" size="small">
              删除
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
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable],
  props: ['nodeInfo', 'contentPage'],
  data () {
    return {
      sortFlag: false,
      mainList: [],
      list: []
    }
  },
  methods: {
    getGrid () {
      let data = {
        nodeType: '1',
        nodeId: this.nodeInfo.nodeId
      }
      this.loading = true
      api[urlNames['findLeaderList']](data).then((res) => {
        this.loading = false
        this.list = res.data
        console.log(33, this.list)
      }, () => {
        this.loading = false
        this.list = []
        this.page.total = 0
      })
    }
  },
  created () {
    this.getGrid()
  },
  watch: {
    sortFlag: {
      handler (val) {
        const tbody = document.querySelector('#leaderList tbody')
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
            }
          })
        } else {
          this.sortListFlag = false
          // this.getGrid()
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
