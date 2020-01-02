<template>
    <div class="group-management">
      <div class="group-operation">
        <el-select v-model="groupType" placeholder="请选择" @change="typeChange">
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
          <template slot="empty">
            <div class="empty">
              <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
              <p><span style="padding-left: 8px">暂无数据！</span></p>
            </div>
          </template>
          <el-table-column
            property="name"
            label="分组名称"
            align="center">
          </el-table-column>
          <el-table-column
            label="分组所属"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.ownerType===1">本单位</span>
              <span v-if="scope.row.ownerType===2">本部门</span>
              <span v-if="scope.row.ownerType===3">本人</span>
            </template>
          </el-table-column>
          <el-table-column
            property="description"
            label="分组描述"
            align="center">
          </el-table-column>
          <el-table-column
          property="createTime"
          align="center"
          label="创建时间">
        </el-table-column>
          <el-table-column label="启用状态" prop="removed" width="80" align="center">
            <template slot-scope="scope">
              <span class="text-able" v-show="scope.row.removed===0">启用</span>
              <span class="text-disable" v-show="scope.row.removed===1">停用</span>
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
      <create-group-dialog :creatTitle="creatTitle" :groupFrom="groupFrom" @close="close" :creategroupdialogVisible="creategroupdialogVisible"></create-group-dialog>
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
      creatTitle: '',
      creategroupdialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      groupFrom: {
        ownerType: 1, // 1用户、2部门、3单位
        name: '',
        description: '',
        removed: true
      },
      groupType: '',
      options: [{
        value: '',
        label: '全部'
      }, {
        value: '1',
        label: '本单位'
      }, {
        value: '2',
        label: '本部门'
      }, {
        value: '3',
        label: '本人'
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
      this.getGroupList(this.currentPage, this.pageSize, this.groupType)
      this.creategroupdialogVisible = false
    },
    // 打开创建弹窗
    openDialog () {
      // 创建初始化--防止修改数据覆盖
      this.creatTitle = '创建分组'
      this.groupFrom.ownerType = 1 // 1用户、2部门、3单位
      this.groupFrom.name = ''
      this.groupFrom.description = ''
      this.groupFrom.removed = true
      this.creategroupdialogVisible = true
    },
    // 编辑分组
    handleEditGroup (row) {
      this.creatTitle = '编辑分组'
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
          this.groupFrom.removed = !res.data.removed
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
      this.$router.push({ path: `/group-management/group-detail/${row.id}/${row.ownerType}` })
    },
    // typeChange
    // 单位部门
    typeChange () {
      this.getGroupList(this.currentPage, this.pageSize, this.groupType)
    },
    // 每一页请求条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getGroupList(this.currentPage, val, this.groupType)
    },
    // 分页
    handleCurrentPageChange (val) {
      this.currentPage = val
      this.getGroupList(val, this.pageSize, this.groupType)
    }
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
