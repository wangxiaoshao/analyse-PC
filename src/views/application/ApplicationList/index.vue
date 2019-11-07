<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="18">
        <el-row :gutter="10" type="flex">
          <el-col :span="6">
            <el-select v-model="searchQuery.areaId" filterable clearable @change="search" placeholder="地区">
              <el-option
                      v-for="item in areaList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.code">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="searchQuery.status" filterable clearable @change="search"  placeholder="状态">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="停用" :value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="请输入关键字搜索" v-model="searchQuery.keyword" clearable @change="getGrid">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="danger" @click="showAddDialog">新增</el-button>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table v-loading="loading" :data="list" :max-height="tableMaxHeight" border style="width: 100%">
      <el-table-column prop="name" label="应用名称">
        <template slot-scope="scope"><span :title="scope.row.name">{{scope.row.name}}</span></template>
      </el-table-column>
      <el-table-column prop="areaName" label="地区">
        <template slot-scope="scope"><span :title="scope.row.areaName">{{scope.row.areaName}}</span></template>
      </el-table-column>
      <el-table-column prop="info" label="厂商">
        <template slot-scope="scope"><span :title="scope.row.info">{{scope.row.info}}</span></template>
      </el-table-column>
      <el-table-column prop="value" label="状态">
        <template slot-scope="scope">
          <span class="text-green" v-show="scope.row.enable === 1">启用</span>
          <span class="text-red" v-show="scope.row.enable === 0">停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleAction('enable', scope.row)">{{scope.row.enable === 1 ? '停用':'启用'}}</el-button>
          <el-button size="mini" type="text" @click="handleAction('delete', scope.row)">删除</el-button>
          <el-button size="mini" type="text" @click="goConfig(scope.row)">配置</el-button>
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
                 :areaList="areaList"
                 @refreshList="getGrid"
                 @close="closeEditDialog"></edit-dialog>
    <!--添加dialog-->
    <edit-dialog
      :visible="addDialogVisible"
      :areaList="areaList"
      @refreshList="getGrid"
      @close="closeAddDialog"></edit-dialog>
    <!--配置dialog-->
    <config-dialog
      :visible="configDialogVisible"
      :areaList="areaList"
      @refreshList="getGrid"
      @close="closeConfigDialogVisible"></config-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import EditDialog from '../components/EditDialog'
import ConfigDialog from '../components/ConfigDialog'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, ConfigDialog },
  mixins: [handleTable],
  data () {
    return {
      loading: true,
      searchQuery: {
        areaId: '',
        status: '',
        keyword: ''
      },
      list: [],
      areaList: [],
      dictionaryNameList: [],
      editDialogVisible: false,
      addDialogVisible: false,
      configDialogVisible: false,
      currentEdit: null,
      currentParent: {
        description: '',
        label: '',
        remarks: '',
        orderNum: '',
        type: '',
        value: ''
      }
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(this.searchQuery, this.application.searchQuery)
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_APPLICATION_SEARCH_QUERY({})
    }
    this.initQuery()
    // this.getAreaList()
    this.getGrid()
  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    initQuery () {
      let keys = Object.assign({}, this.$route.query)
      let len = keys.length
      for (let i = 0; i < len; i++) {
        let key = keys[i]
        let value = this.$route.query[key]
        if (this.page[key] !== undefined) {
          this.page[key] = value
        } else if (this.searchQuery[key] !== undefined) {
          this.searchQuery[key] = value
        }
      }
    },
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    getAreaList () {
      api[urlNames['getAreaList']]().then((res) => {
        this.areaList = res.data
      })
    },
    search () {
      this.$nextTick(() => {
        this.page.current = 1
        this.getGrid()
      })
    },
    getGrid () {
      this.loading = true
      let data = {
        page: this.page.current,
        limit: this.page.limit
      }
      let keys = Object.keys(this.searchQuery)
      let len = keys.length
      for (let i = 0; i < len; i++) {
        let key = keys[i]
        let value = this.searchQuery[key]
        if (typeof value !== 'number') {
          if (value) { data[key] = value }
        } else {
          data[key] = value
        }
      }
      api[urlNames['getApplicationList']](data).then((res) => {
        this.loading = false
        this.list = res.result.items
        this.page.total = res.result.total_items
      }, () => {
        this.loading = false
        this.list = []
        this.page.total = 0
      })
    },
    addChild (index, row) {
      this.currentParent.type = row.type
      this.currentParent.description = row.description
      this.currentParent.orderNum = row.orderNum + 10
      this.configDialogVisible = true
    },
    showEditDialog (row) {
      api[urlNames['getApplicationDetail']]({ id: row.id }).then((res) => {
        this.currentEdit = res.result[0]
        this.currentEdit.areaId = this.currentEdit.areaId.toString().split(',')
        this.editDialogVisible = true
      })
    },
    goConfig (row) {
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_APPLICATION_SEARCH_QUERY(this.searchQuery)
      this.$router.push({
        name: 'ApplicationConfig',
        params: {
          id: row.id
        }
      })
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    closeEditDialog () {
      this.editDialogVisible = false
    },
    closeAddDialog () {
      this.addDialogVisible = false
    },
    closeConfigDialogVisible () {
      this.configDialogVisible = false
    },
    handleAction (action, row) {
      let actionName = '删除'
      let actionUrl = 'deleteApplication'
      let data = {
        id: row.id,
        type: row.type
      }
      if (action === 'enable') {
        actionName = row.enable === 1 ? '停用' : '启用'
        actionUrl = 'toggleApplication'
        data.status = row.enable === 1 ? 0 : 1
      }
      this.$msgbox({
        message: `确认${actionName}？`,
        title: '提示',
        showCancelButton: true,
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = `${actionName}中...`
            api[urlNames[actionUrl]](data).then((res) => {
              instance.confirmButtonLoading = false
              this.$message.success(`${actionName}成功`)
              this.getGrid()
            }, (res) => {
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


