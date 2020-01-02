<template>
  <div class="group-detail">
    <div class="add-member">
      <el-button type="primary"
                 @click="seleceDialog.selectMenmberFlag = true">添加成员</el-button>
    </div>
    <el-table
      ref="singleTable"
      :data="memberList"
      border
      highlight-current-row
      style="width: 100%">
      <template slot="empty">
        <div class="empty">
          <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
          <p><span style="padding-left: 8px">暂无数据！</span></p>
        </div>
      </template>
      <el-table-column
        label="名称"
      align="center">
        <template slot-scope="scope">
         <div>
           <span>{{scope.row.name}}</span>
         </div>
        </template>
      </el-table-column>
      <el-table-column
        property="memberId"
        label="成员ID"
        align="center">
      </el-table-column>
      <el-table-column
        label="成员类型"
        align="center">
        <template slot-scope="scope">
            <div>
              <span v-if="scope.row.memberType ===3">单位</span>
              <span v-if="scope.row.memberType ===2">内设机构</span>
              <span v-if="scope.row.memberType ===1">人员</span>
            </div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="140">
        <template slot-scope="scope">
          <el-button @click="deleteGroupMembers(scope.row)" type="text" size="small">删除</el-button>
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
    <select-members @dialogReturnMembersInfo="dialogReturnMembersInfo" @closeselectMenmber="closeselectMenmber" :seleceDialog="seleceDialog"></select-members>
      <!--    <candidate-dialog @dialogReturnMembersInfo="dialogReturnMembersInfo" @closeselectMenmber="closeselectMenmber"-->
<!--                      :seleceDialog="seleceDialog"></candidate-dialog>-->
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleTable from '@src/mixins/handle-table'
import hasRight from '@src/mixins/has-right'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import SelectMembers from '@src/components/SelectMembers/index'

export default {
  name: 'GroupDetail',
  mixins: [handleTable, handleBreadcrumb, hasRight],
  components: {
    SelectMembers
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      memberList: [],
      groupId: this.$route.params.id,
      seleceDialog: {
        selectMenmberTitle: '分组成员添加', // 选人组件标题
        selectMenmberFlag: false, // 显示弹窗，
        isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
        notOnlyPerson: true, // 选人，默认为false（只选人）
        isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选(与notOnlyPerson一起使用，notOnlyPerson为true是有效
        isSingleOrgSelect: false, // 是否为单选框  false为多选（默认），true为单选(与isOnlyOrg一起使用，isOnlyOrg为true时部门/单位单选)
        isOnlyOrg: true //  是否选部门/单位 true为选部门
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
    // 删除成员
    deleteGroupMembers (row) {
      this.$confirm('此操作将永久删除成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api[urlNames['deleteGroupMembers']]({
          groupId: this.groupId,
          memberId: row.memberId
        }).then((res) => {
          if (res.status === 0) {
            this.$message.success('删除成功')
            this.getGroupUsers(this.currentPage, this.pageSize)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 关闭选人弹窗
    closeselectMenmber () {
      this.seleceDialog.selectMenmberFlag = false
    },
    dialogReturnMembersInfo (memberData, orgData) {
      if (memberData.length === 0 && orgData.length === 0) {
        this.$message.info('您没有选择成员')
        return false
      }
      if (orgData.length !== 0) {
        orgData.forEach(item => {
          let type = 2
          if (item.nodeType === 2) {
            type = 3
          } else if (item.nodeType === 3) {
            type = 2
          }
          this.groupMemberInfo.push({
            memberId: item.bindId,
            memberType: type,
            groupId: this.groupId
          })
        })
      }
      if (memberData.length !== 0) {
        memberData.forEach(item => {
          this.groupMemberInfo.push({
            memberId: item.uid,
            memberType: 1,
            groupId: this.groupId
          })
        })
      }
      // memberData.forEach(item => {
      //   this.groupMemberInfo.push({
      //     memberId: item.uid,
      //     memberType: 1,
      //     groupId: this.groupId
      //   })
      // })
      // orgdData.forEach(item => {
      //   let type = 2
      //   if (item.nodeType === 2) {
      //     type = 3
      //   } else if (item.nodeType === 3) {
      //     type = 2
      //   }
      //   this.groupMemberInfo.push({
      //     memberId: item.bindId,
      //     memberType: type,
      //     groupId: this.groupId
      //   })
      // })
      this.addGroupUsers(this.groupMemberInfo)
      this.groupMemberInfo = []
    },
    // 添加成员
    addGroupUsers (data) {
      api[urlNames['addGroupUsers']]({ data }).then((res) => {
        if (res.status === 0) {
          this.getGroupUsers(this.currentPage, this.pageSize)
          this.$message.success('添加成功')
        }
      })
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
