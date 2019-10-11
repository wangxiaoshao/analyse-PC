<template>
  <div class="site-module mod-application-config">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="12">
        <el-radio-group v-model="type" size="small" @change="typeChange">
          <el-radio-button label="content">信息订阅配置</el-radio-button>
          <el-radio-button label="quick-link">快捷入口配置</el-radio-button>
          <el-radio-button label="todo">待办事项配置</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button type="danger" @click="showAddDialog">新增</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading"
              :data="list"
              :max-height="tableMaxHeight"
              border
              style="width: 100%">

      <el-table-column prop="description" label="名称">
        <template slot-scope="scope">
          <span :title="scope.row.name">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="dataUrl" label="地址">
        <template slot-scope="scope">
          <span :title="scope.row.dataUrl">{{scope.row.dataUrl}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="type!=='content'" label="图标" width="180">
        <template slot-scope="scope">
          <span v-show="type!=='content'"><img class="table-logo" :src="scope.row.logo" alt=""></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="showEditDialog(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleAction('delete', scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
<!--    <el-pagination-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--      :current-page="page.current"-->
<!--      :page-sizes="[10, 30, 50, 100]"-->
<!--      :page-size="page.limit"-->
<!--      layout="total, sizes, prev, pager, next, jumper"-->
<!--      :total="page.total">-->
<!--    </el-pagination>-->
    <!--编辑dialog-->
    <edit-dialog :visible="editDialogVisible"
                 :config-type="type"
                 :current="currentEdit"
                 @refreshList="getGrid"
                 @close="closeEditDialog"></edit-dialog>
    <!--添加dialog-->
    <edit-dialog
      :visible="addDialogVisible"
      :config-type="type"
      @refreshList="getGrid"
      @close="closeAddDialog"></edit-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import handleTable from '@src/mixins/handleTable'
  import { api, urlNames } from '@src/api';
  import handleBreadcrumb from '@src/mixins/handleBreadcrumb.js'
  import EditDialog from '../components/ConfigDialog'

  export default {
    components: {EditDialog},
    mixins: [handleTable, handleBreadcrumb],
    data () {
      return {
        currentEdit: null,
        editDialogVisible: false,
        addDialogVisible: false,
        type: 'content',
        loading: true,
        searchQuery: {
          type: ''
        },
        list: [],
        configData: {
          content: [],
          'quick-link': [],
          todo: []
        },
        dictionaryNameList: [],
        // page: {
        //   limit: 10,
        //   total: 0,
        //   current: 1
        // },
      }
    },
    computed: {
      tableMaxHeight () {
        return this.$store.state.app.windowHeight - 200
      }
    },
    mounted () {
      this.pushBreadcrumb({
        name: '配置',
        parent: {
          name: 'ApplicationList',
          query: {
            type: 'back'
          }
        }
      })
      this.getGrid()
    },
    methods: {
      trim (str) {
        return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
      },
      closeEditDialog () {
        this.editDialogVisible = false
      },
      closeAddDialog () {
        this.addDialogVisible = false
      },
      typeChange () {
        // this.page.current = 1
        this.$nextTick(()=> {
          this.list = this.configData[this.type]
          // this.getGrid()
        })
      },
      showAddDialog () {
        this.addDialogVisible = true
      },
      showEditDialog (row) {
        this.currentEdit = JSON.parse(JSON.stringify(row))
        this.editDialogVisible = true
      },
      getGrid () {
        this.loading = true
        let data = {
          // page: this.page.current,
          // pageSize: this.page.limit,
          parentApp: this.$route.params.id,
          type: this.type
        }
        api[urlNames['getApplicationConfig']](data).then((res) => {
          this.loading = false
          this.configData = res.result
          this.list = this.configData[this.type]
          // this.page.total = res.result.total_items
        },() => {
          this.loading = false
          this.list = []
          // this.page.total = 0
        })
      },
      handleAction (action, row) {
        let actionName = '删除'
        let actionUrl = 'deleteApplication'
        let data = {
          id: row.id,
          type: this.type
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
      },
    }
  }
</script>
<style lang="less">
  @import "./index";
</style>


