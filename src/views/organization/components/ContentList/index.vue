<template>
  <div class="content-list">
    <div class="button-wrap">
      <el-button @click="sortBtnFlag" :disabled="!hasRight('departmentOrder')">调整排序</el-button>
    </div>
    <div class="sort-do" v-if="sortFlag">
      按住左键上下拖动调整排序
      <a @click="sublimeSort">保存</a>
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
      <template slot="empty">
        <div class="empty">
          <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
          <p><span style="padding-left: 8px">暂无数据！</span></p>
        </div>
      </template>
      <el-table-column prop="description" width="60" align="center" v-if="sortFlag">
        <template>
          <i class="sortBtnDo menu-icon iconfont iconpaixu" style="font-size: 25px;cursor: move;"></i>
          <!--<span :title="scope" v-else>{{scope.$index + 1}}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="启用状态" prop="removed" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed === 0">启用</span>
          <span class="text-disable" v-show="scope.row.removed===1">停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="审核状态" width="100" align="center">
        <template slot-scope="scope">
          <span v-show="scope.row.state === 0" style="color: #F56C6C">待审核</span>
          <span v-show="scope.row.state === 1" style="color: #67C23A">已审核</span>
          <span v-show="scope.row.state === 2" style="color: #67C23A">正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="act" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button v-show="scope.row.nodeType === 1" @click.native="openEditNode(scope.row)" type="text" size="small">
            修改
          </el-button>
          <el-button v-show="scope.row.nodeType === 3" @click.native="openDepartmentEdit(scope.row)" type="text" size="small">
            修改
          </el-button>
          <el-button v-show="scope.row.nodeType === 2" @click.native="openEditUnit(scope.row)" type="text" size="small">
            修改
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="contentPage.current"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="contentPage.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="contentPage.total">
    </el-pagination>
  </div>
</template>

<script>
import organizationEdit from '@src/mixins/organization'
import Sortable from 'sortablejs'
import handleTable from '@src/mixins/handle-table'
import hasRight from '@src/mixins/has-right'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable, organizationEdit, hasRight],
  data () {
    return {
      loading: true,
      list: [],
      sortListFlag: false,
      isShowEditFlag: true,
      sortList: [],
      nodeId: this.$route.params.nodeId
    }
  },
  props: ['sortFlag', 'contentPage', 'succese', 'contentId'],
  created () {
    this.init()
  },
  watch: {
    contentId (newVal) {
      this.nodeId = newVal
      this.init()
    },
    sortFlag: {
      handler (val) {
        const tbody = document.querySelector('#contentTable tbody')
        let that = this
        if (val) {
          Sortable.create(tbody, {
            handle: '.sortBtnDo',
            animation: 150,
            onUpdate: function (evt) {
              let items = that.list
              const newIndex = evt.newIndex
              const oldIndex = evt.oldIndex
              const $li = tbody.children[newIndex]
              const $oldLi = tbody.children[oldIndex]
              if (newIndex > oldIndex) {
                tbody.insertBefore($li, $oldLi)
              } else {
                tbody.insertBefore($li, $oldLi.nextSibling)
              }

              let item = items.splice(oldIndex, 1)
              // console.log(item)
              items.splice(newIndex, 0, item[0])
              // 排序后列表
              that.list = items
            }

          })
        } else {
          this.sortListFlag = false
        }
      },
      deep: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.nodeId = to.params.nodeId
    this.getGrid()
  },
  methods: {
    init () {
      this.contentPage.current = 1
      this.getGrid()
      if (this.succese) {
        this.getGrid()
      }
      if (this.$route.name === 'OrganizationContent') {
        this.isShowEditFlag = true
      } else {
        this.isShowEditFlag = false
      }
    },
    handleSizeChange (val) {
      this.contentPage.current = 1
      this.contentPage.limit = val
      this.getGrid()
      // this.cancelSort()
      this.$emit('cancel', false)
      this.$emit('getPage', this.contentPage)
    },
    handleCurrentChange (val) {
      this.contentPage.current = val
      this.getGrid()
      // this.cancelSort()
      this.$emit('cancel', false)
      this.$emit('getPage', this.contentPage)
    },
    getGrid () {
      // this.cancelSort()
      let data = {
        page: this.contentPage.current,
        parentId: this.nodeId,
        limit: this.contentPage.limit
      }
      this.loading = true
      api[urlNames['findViewNodeList']](data).then((res) => {
        this.loading = false
        this.list = res.data
        this.contentPage.total = res.total
      }, () => {
        this.loading = false
        this.list = []
        this.contentPage.total = 0
      })
    },
    cancelSort () {
      this.init()
      this.$emit('cancel', false)
    },
    sortBtnFlag () {
      this.$emit('cancel', true)
    },
    // 保存排序
    sublimeSort () {
      let sortList = []
      this.list.forEach((item, index) => {
        const sortObj = {
          id: item.id,
          sort: index
        }
        sortList.push(sortObj)
      })
      let data = {
        page: this.contentPage.current,
        limit: this.contentPage.limit,
        sortList
      }
      api[urlNames['setViewNodeSort']](data).then((res) => {
        this.$message.success(`保存成功`)
        // this.cancelSort()
        this.$emit('cancel', false)
        this.$emit('getPage', this.contentPage)
      }, () => {
        this.$message.error(`保存失败，请重试`)
      })
    }
  }
}
</script>

<style lang="less">
  @import "index";
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
