<template>
    <div class="group-management">
      <div class="group-operation">
        <el-select v-model="type" placeholder="请选择" @change="typeChange">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="create-btn" type="primary" @click="openDialog">创建分组</el-button>
      </div>
      <div class="table">
        <el-table
          ref="singleTable"
          :data="groupList"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            property="name"
            label="分组名称"
            align="center">
          </el-table-column>
          <el-table-column
            property="description"
            label="分组描述"
            align="center">
          </el-table-column>
          <el-table-column
          property="time"
          align="center"
          label="创建时间">
        </el-table-column>
          <el-table-column label="启用状态" prop="removed" width="80" align="center">
            <template slot-scope="scope">
              <span class="text-able" v-show="scope.row.removed">启用</span>
              <span class="text-disable" v-show="!scope.row.removed">停用</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="180">
            <template slot-scope="scope">
              <el-button @click="handleClickToDetail(scope.row)" type="text" size="small">编辑成员</el-button>
              <el-button @click="handleEditGroup(scope.row)" type="text" size="small">编辑分组</el-button>
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
      <create-group-dialog :groupFrom="groupFrom" @close="close" :creategroupdialogVisible="creategroupdialogVisible"></create-group-dialog>
    </div>
</template>

<script>
import CreateGroupDialog from '@src/views/shared/group-management/create-group-dialog/create-group-dialog'
import { api, urlNames } from '@src/api'
export default {
  name: 'GroupManagement',
  components: {
    CreateGroupDialog
  },
  data () {
    return {
      groupList: [],
      total: 0,
      creategroupdialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      groupFrom: {
        ownerType: 1, // 1用户、2部门、3单位
        name: '',
        description: '',
        removed: true
      },
      type: '',
      options: [{
        value: '1',
        label: '单位分组'
      }, {
        value: '2',
        label: '部门分组'
      }, {
        value: '3',
        label: '个人分组'
      }],
      currentRow: null
    }
  },
  created () {
    this.getGroupList(1, 10, '')
  },
  methods: {
    getGroupList (page, limt, type) {
      api[urlNames['getGroupList']]({
        page: page,
        limit: limt,
        ownerType: type
      }).then((res) => {
        this.total = parseInt(res.total)
        this.groupList = res.data
      })
    },
    // 关闭弹窗
    close () {
      this.getGroupList(this.currentPage, this.pageSize, this.type)
      this.creategroupdialogVisible = false
    },
    // 打开创建弹窗
    openDialog () {
      this.creategroupdialogVisible = true
    },
    // 编辑分组
    handleEditGroup (row) {
      this.creategroupdialogVisible = true
      this.findGroupDetail(row.id)
    },
    // 获取分组详情
    findGroupDetail (id) {
      api[urlNames['findGroupById']]({
        id: id
      }).then((res) => {
        if (res.status === 0) {
          this.groupFrom = res.data
        }
      })
    },
    handleCurrentChange (val) {
      this.currentRow = val
    },
    handleClick (row) {
      this.$router.push({ name: 'GroupDetail' })
      console.log(row)
    },
    handleClickToDetail (row) {
      this.$router.push({ path: `/group-management/group-detail/${row.id}` })
    },
    // typeChange
    // 单位部门
    typeChange () {
      this.getGroupList(this.currentPage, this.pageSize, this.type)
    },
    // 每一页请求条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getGroupList(this.currentPage, val, this.type)
    },
    // 分页
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.getGroupList(val, this.pageSize, this.type)
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
