<template>
    <div class="group-detail">
      <div class="add-member">
        <el-button type="primary" @click="seleceDialog.selectMenmberFlag = true">添加成员</el-button>
      </div>
      <el-table
        ref="singleTable"
        :data="memberList"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          property="name"
          label="名称"
          align="center">
        </el-table-column>
        <el-table-column
          property="name"
          label="成员ID"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="140">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
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
      <candidate-dialog @dialogReturnMembersInfo="dialogReturnMembersInfo" @closeselectMenmber="closeselectMenmber" :seleceDialog="seleceDialog"></candidate-dialog>
    </div>
</template>

<script>
import CandidateDialog from '@src/components/CandidateDialog/index.vue'
import { api, urlNames } from '@src/api'
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
export default {
  name: 'GroupDetail',
  mixins: [handleTable, handleBreadcrumb],
  components: {
    CandidateDialog
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 1,
      total: 0,
      memberList: [],
      groupId: this.$route.params.id,
      seleceDialog: {
        selectMenmberTitle: '分组成员添加', // 选人组件标题
        selectMenmberFlag: false, // 显示弹窗，
        isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
        notOnlyPerson: true, // 是否只选人，默认为false（只选人），true可以选择单位和部门
        isSingleSelect: false // 是否为单选框  false为多选（默认），true为单选
      },
      groupMemberInfo: []
    }
  },
  created () {
    this.getGroupUsers(1, 10)
  },
  methods: {
    // 获取成员列表
    getGroupUsers (page, limt) {
      api[urlNames['getGroupUsers']]({
        groupId: this.groupId,
        page: page,
        limit: limt
      }).then((res) => {
        if (res.status === 0) {
          this.total = res.total
          this.memberList = res.data
        }
      })
    },
    // 关闭选人弹窗
    closeselectMenmber () {
      this.seleceDialog.selectMenmberFlag = false
    },
    dialogReturnMembersInfo (memberData, orgdData) {
      console.log(JSON.parse(JSON.stringify(orgdData)), 'this.$route.params.id')
      memberData.forEach(item => {
        this.groupMemberInfo.push({
          memberId: item.uid,
          memberType: 3,
          groupId: this.groupId
        })
      })
      orgdData.forEach(item => {
        this.groupMemberInfo.push({
          memberId: item.bindId,
          memberType: item.nodeType,
          groupId: this.groupId
        })
      })
      this.addGroupUsers(this.groupMemberInfo)
      this.groupMemberInfo = []
    },
    // 添加成员
    addGroupUsers (data) {
      api[urlNames['addGroupUsers']]({ data }).then((res) => {
        console.log('-------------')
      })
    },
    handleClick (row) {
      console.log(row)
    },
    // 每一页请求条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getGroupUsers(this.currentPage, val)
    },
    // 分页
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.getGroupUsers(val, this.pageSize)
    }
  },
  mounted () {
    this.pushBreadcrumb({
      name: '分组成员列表',
      parent: {
        name: 'GroupManagement',
        query: {
          type: 'back'
        }
      }
    })
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
