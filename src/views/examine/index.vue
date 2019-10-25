<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="18">
        <el-row :gutter="10" type="flex">
          <el-col :span="5">
            <el-select v-model="searchQuery.areaId" filterable clearable @change="search" placeholder="地区">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="请输入用户名"
                      v-model="searchQuery.keyword"
                      clearable
                      @change="getGrid">
              <el-button slot="append"
                         icon="el-icon-search"
                         @click="search">
              </el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="danger" @click="showAddDialog">新增</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table v-loading="loading"
              :data="list"
              :max-height="tableMaxHeight"
              border
              style="width: 100%">
      <el-table-column prop="userName" label="用户名">
        <template slot-scope="scope">
          <span :title="scope.row.uname">{{scope.row.uname}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="areaName" label="地区">
        <template slot-scope="scope">
          <span :title="scope.row.areaName">{{scope.row.areaName}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="rights" label="权限">
        <template slot-scope="scope">
          <span :title="scope.row.type">{{+scope.row.type === 1 ? '超级管理员':'管理员'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="mobile" label="电话">
        <template slot-scope="scope">
          <span :title="scope.row.mobile">{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="text"
                     @click="handleAction('delete', scope.row)">删除
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
    <!--编辑dialog-->
    <edit-dialog :visible="editDialogVisible"
                 :current="currentEdit"
                 @refreshList="getGrid"
                 @close="closeEditDialog"></edit-dialog>
    <!--添加dialog-->
    <edit-dialog :visible="addDialogVisible"
                 @refreshList="getGrid"
                 @close="closeAddDialog"></edit-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import EditDialog from './components/EditDialog/index.vue'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'

export default {
  components: { EditDialog },
  mixins: [handleTable],
  data () {
    return {
      loading: true,
      searchQuery: {
        areaId: '',
        keyword: ''
      },
      areaList: [],
      list: [],
      dictionaryNameList: [],
      editDialogVisible: false,
      addDialogVisible: false,
      currentEdit: null,
      currentParent: {
        areaName: '',
        mobile: ''
      },
      page: {
      }
    }
  },
  computed: {
  },
  mounted () {
    this.getAreaList()
    this.getGrid()
  },
  methods: {
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    search () {
      this.$nextTick(() => {
        this.getGrid()
      })
    },
    getAreaList () {
      api[urlNames['getAreaList']]().then((res) => {
        this.areaList = res.data
      })
    },
    getGrid () {
      this.loading = true
      let data = {
        page: this.page.current,
        pageSize: this.page.limit
      }
      let keys = Object.keys(this.searchQuery)
      let len = keys.length
      for (let i = 0; i < len; i++) {
        let key = keys[i]
        let value = this.searchQuery[key]
        if (value) {
          data[key] = value
        }
      }
      if (this.trim(this.searchQuery.type)) {
        data = Object.assign(data, this.searchQuery)
      }
      api[urlNames['getUserRightsList']](data).then((res) => {
        this.loading = false
        this.list = res.result.items
        this.page.total = res.result.total_items
      }, () => {
        this.loading = false
        this.list = []
        this.page.total = 0
      })
    },
    showEditDialog (row) {
      api[urlNames['getEditRightsInfo']]({
        id: row.id
      }).then((res) => {
        this.currentEdit = res.result[0]
        this.editDialogVisible = true
      })
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    addChild (index, row) {
      this.currentParent.type = row.type
      this.currentParent.description = row.description
      this.currentParent.orderNum = row.orderNum + 10
    },
    closeEditDialog () {
      this.editDialogVisible = false
    },
    closeAddDialog () {
      this.addDialogVisible = false
    },
    handleAction (action, row) {
      let actionName = '删除'
      let actionUrl = 'getUserRemoveRight'
      this.$msgbox({
        message: `确认${actionName}？`,
        title: '提示',
        showCancelButton: true,
        type: 'warning',
        beforeClose: (action, instance, done) => {
          console.log(action)
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = `${actionName}中...`
            api[urlNames[actionUrl]]({ id: row.id }).then(() => {
              instance.confirmButtonLoading = false
              this.$message.success(`${actionName}成功`)
              this.getGrid()
            }, () => {
              instance.confirmButtonLoading = false
            })
            done()
          } else {
            instance.confirmButtonLoading = false
            done()
          }
        }
      }).then(() => {

      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


