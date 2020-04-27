<template>
  <div class="content-list">
    <div class="button-wrap">
      <el-button @click="sortBtnFlag" :disabled="!hasRight('departmentOrder')">调整排序</el-button>
    </div>
    <div class="sort-do" v-if="sortFlag">
      按住左键上下拖动调整排序
      <a @click="sublimeSort" href="javascript: void ( 0 ); ">保存</a>
      <a  @click="cancelSort"  href="javascript: void ( 0 ); ">取消</a>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      stripe
      border
      highlight-current-row
      size="medium"
      id="contentTable"
      @current-change="handleRow"
      :row-class-name='RowClassName'
    >
      <template slot="empty">
        <div class="empty">
          <p><img class="data-pic" src="@src/common/images/no-data1.png" alt=""/></p>
          <p><span style="padding-left: 8px;">暂无数据</span></p>
        </div>
      </template>
      <el-table-column prop="description" width="60" align="center" v-if="sortFlag">
        <template>
          <i class="sortBtnDo menu-icon iconfont iconpaixu" style="font-size: 25px;cursor: move;"></i>
          <!--<span :title="scope" v-else>{{scope.$index + 1}}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" align="center" width="60">
        <template slot-scope="scope"><span v-text='getIndex(scope.$index)'></span></template>
      </el-table-column>
      <el-table-column label="名称" prop="name" align="center"></el-table-column>
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
          <el-button v-show="scope.row.nodeType === 1" @click.native="openEditNode(scope.row)" type="text" size="small" class="btnMar">
            修改
          </el-button>
          <el-button v-show="scope.row.nodeType === 3" @click.native="openDepartmentEdit(scope.row)" type="text" size="small" class="btnMar">
            修改
          </el-button>
          <el-button v-show="scope.row.nodeType === 2" @click.native="openEditUnit(scope.row)" type="text" size="small" class="btnMar">
            修改
          </el-button>
          <el-button  @click.native="goSort(scope.row)" type="text" size="small">
            排序
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
    <el-dialog :visible.sync="showSortDilog" width="420px">
      <div slot="title" style=" padding: 20px; background-color: #fff;">
        <span>数值排序</span>
        <i class="el-icon-document-copy" style="color:#58a4f3;margin-left:6px"></i>
      </div>
      <div class="sort-ipt">
        请输入排序目标序号：
        <div style="display:inline-block">
          <el-input v-model="sortValue" placeholder="请输入排序目标序号" ></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitNumSort" width="120px">确 定</el-button>
      </div>
    </el-dialog>
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
  props: ['sortFlag', 'contentPage', 'succese', 'contentId'],
  data () {
    return {
      loading: true,
      list: [],
      originList: [],
      sortListFlag: false,
      isShowEditFlag: true,
      sortList: [],
      sortValue: null,
      sortNum: null,
      nodeId: this.$route.params.nodeId,
      showSortDilog: false,
      sortParam: {}
    }
  },
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
              tbody.removeChild($li)
              if (newIndex > oldIndex) {
                tbody.insertBefore($li, $oldLi)
              } else {
                tbody.insertBefore($li, $oldLi.nextSibling)
              }

              let item = items.splice(oldIndex, 1)

              items.splice(newIndex, 0, item[0])

              this.list = items
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
    getIndex ($index) {
      return (this.contentPage.current - 1) * this.contentPage.limit + $index + 1
    },
    RowClassName ({ row, rowIndex }) {
      rowIndex = this.getIndex(rowIndex)
      row.index = rowIndex
    },
    handleRow (row) {
      // console.log(' row:', row)
      // console.log(' this.list:', this.list)
    },
    handleSizeChange (val) {
      this.contentPage.current = 1
      this.contentPage.limit = val
      // this.getGrid()
      this.cancelSort()
      // this.$emit('cancel', false)
      this.$emit('getPage', this.contentPage)
    },
    handleCurrentChange (val) {
      this.contentPage.current = val
      // this.getGrid()
      this.cancelSort()
      // this.$emit('cancel', false)
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
        this.originList = JSON.parse(JSON.stringify(this.list))
        this.contentPage.total = res.total
      }, () => {
        this.loading = false
        this.list = []
        this.originList = JSON.parse(JSON.stringify(this.list))
        this.contentPage.total = 0
      })
    },
    cancelSort () {
      this.getGrid()
      this.$emit('cancel', false)
    },
    sortBtnFlag () {
      this.$emit('cancel', true)
    },
    // 保存排序
    sublimeSort () {
      let that = this
      let sortList = []
      // 对之前已经排序好的
      this.list.forEach(function (item, index) {
        sortList.push({
          id: item.id,
          sort: that.originList[index].sort
        })
      })

      let data = {
        page: this.contentPage.current,
        limit: this.contentPage.limit,
        sortList
      }

      api[urlNames['setViewNodeSort']](data).then((res) => {
        this.$message.success(`保存成功`)
        this.$emit('cancel', false)
        this.$emit('getPage', this.contentPage)
      }, () => {
        this.$message.error(`保存失败，请重试`)
      })
    },

    // 数值排序弹框
    goSort (val) {
      this.showSortDilog = true
      this.sortParam = {
        nowId: val.id
      }
    },

    // 保存数值排序
    submitNumSort () {
      this.showSortDilog = false
      let data = {
        page: this.sortValue,
        parentId: this.nodeId,
        limit: 1
      }
      api[urlNames['findViewNodeList']](data).then(
        res => {
          this.loading = false
          if (res.data.length > 0) {
            this.sortParam.id = res.data[0].id
            this.NumSortFun(this.sortParam)
          }
          if (res.data.length === 0) {
            this.$message.error('找不到目标序号，请重新输入')
            this.showSortDilog = false
          }
        },
        () => {}
      )
    },
    NumSortFun (data) {
      api[urlNames['setViewNodeSortThroughNumerical']](data).then(
        res => {
          if (res) {
            this.showSortDilog = false
            this.$message.success('排序成功')
            this.contentPage.current = Math.ceil(this.sortValue / this.contentPage.limit)
            this.getGrid()
            this.sortValue = ''
          }
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
