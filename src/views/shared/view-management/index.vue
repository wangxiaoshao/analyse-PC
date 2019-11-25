<template>
  <div class="view-management">
    <div class="create-btn">
      <el-button type="primary" @click="createView">创建视图</el-button>
    </div>
    <div class="table">
      <el-table
        ref="singleTable"
        :data="viewList"
        border
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%">
        <el-table-column
          property="name"
          label="视图名称"
          align="center">
        </el-table-column>
        <el-table-column
          property="id"
          label="视图ID"
          align="center">
        </el-table-column>
        <el-table-column
          property="createTime"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          property="viewAdmin"
          align="center"
          label="视图管理员">
        </el-table-column>
        <el-table-column label="启用状态" prop="removed" width="80" align="center">
          <template slot-scope="scope">
            <span class="text-able" v-show="scope.row.removed">启用</span>
            <span class="text-disable" v-show="!scope.row.removed">停用</span>
          </template>
        </el-table-column>
<!--     暂时隐藏   <el-table-column-->
<!--          property="remark"-->
<!--          align="center"-->
<!--          label="备注说明">-->
<!--        </el-table-column>-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
<!--    <el-button @click="seleceDialog.selectMenmberFlag = true">选人组件</el-button>-->
    <candidate-dialog @dialogReturnMembersInfo="dialogReturnMembersInfo" @closeselectMenmber="closeselectMenmber" :seleceDialog="seleceDialog"></candidate-dialog>
  </div>
</template>

<script>
import CandidateDialog from '@src/components/CandidateDialog/index.vue'
import { api, urlNames } from '@src/api'
export default {
  name: 'ViewManagement',
  components: {
    CandidateDialog
  },
  data () {
    return {
      total: 0, // 总页码
      viewList: [],
      currentPage: 1,
      pageSize: 10,
      currentRow: null,
      seleceDialog: {
        selectMenmberTitle: '选人组件', // 选人组件标题
        selectMenmberFlag: false, // 显示弹窗，
        isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
        notOnlyPerson: false, // 是否只选人，默认为false（只选人），true可以选择单位和部门
        isSingleSelect: false // 是否为单选框  false为多选（默认），true为单选
      }
    }
  },
  created () {
    this.getViewList(1, 10)
  },
  methods: {
    getViewList (page, limt) {
      api[urlNames['getViewList']]({
        page: page,
        limit: limt
      }).then((res) => {
        this.total = parseInt(res.total)
        this.viewList = res.data
      })
    },
    // 跳转创建视图
    createView () {
      this.$router.push({ path: '/view-management/create-view/0' })
    },
    // 关闭选人弹窗
    closeselectMenmber () {
      this.seleceDialog.selectMenmberFlag = false
    },
    // 选人弹窗组件返回的人员信息
    dialogReturnMembersInfo (data) {
      console.log(JSON.parse(JSON.stringify(data)))
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    // 编辑
    handleEdit (index, row) {
      this.$router.push({ path: `/view-management/create-view/${row.id}` })
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getViewList(this.currentPage, val)
    },
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.getViewList(val, this.pageSize)
    }
  }

}
</script>

<style scoped lang="less">
@import 'index.less';
</style>
