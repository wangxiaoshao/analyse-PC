<template>
    <div class="look-person">
      <add-person :seleceDialog="selectDialog" @closeselectMenmber="closeselectMenmber"></add-person>
      <permission-set :setFlag="setFlag" @getSetFlag="getSetFlag"></permission-set>
      <div class="button-wrap">
        <el-button type="primary" @click="selectDialog.selectMenmberFlag = true">添加人员</el-button>
        <el-button @click="setFlag = true">权限配置</el-button>
      </div>
      <!--表格-->
      <el-table v-loading="loading" :data="list" :max-height="tableMaxHeight" border style="width: 100%">
        <el-table-column prop="description" label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span :title="scope">{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="成员姓名">
        </el-table-column>
        <el-table-column prop="account" label="账号">
        </el-table-column>
        <el-table-column prop="unitName" label="单位名称">
        </el-table-column>
        <el-table-column prop="value" label="启用状态">
          <template slot-scope="scope">
            <span class="text-green" v-show="scope.row.enable === 1">启用</span>
            <span class="text-red" v-show="scope.row.enable === 0">停用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="goLookPerson(scope.row)">删除</el-button>
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
    </div>
</template>

<script>
import addPerson from '../../../components/CandidateDialog/CandidateDialog'
import permissionSet from '../components/PermissionSet/index'
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  mixins: [handleTable, handleBreadcrumb],
  components: { permissionSet, addPerson },
  data () {
    return {
      list: [],
      permissionId: '',
      loading: false,
      setFlag: false,
      selectDialog: {
        selectMenmberTitle: '添加人员', // 选人组件标题
        selectMenmberFlag: false, // 是否显示弹窗，
        isSingleSelect: false // 是否为单选框  false为多选，true为单选
      }
    }
  },
  computed: {
    ...mapState(['roleManage'])
  },
  methods: {
    ...mapMutations(['PERSON_PAGE', 'ROLE_ID']),
    getGrid () {
      let data = {
        page: this.page.current,
        parentId: this.$route.params.nodeId,
        limit: this.page.limit
      }
      this.loading = true
      api[urlNames['findPerson']](data).then((res) => {
        this.loading = false
        this.list = res.data
        this.permissionId = res.roleId
      }, () => {
        this.loading = false
        this.list = []
        this.page.total = 0
      })
    },
    goPermission () {
      this.PERSON_PAGE(this.page)
      this.ROLE_ID(this.$route.params.id)
      this.$router.push({
        name: 'PermissionSetting',
        params: {
          id: this.permissionId
        }
      })
    },
    getSetFlag (val) {
      this.setFlag = val
    },
    closeselectMenmber (val) {
      this.selectDialog.selectMenmberFlag = val
    }
  },
  created () {
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.roleManage.page)
      this.$router.push({
        name: 'lookPersonPermission',
        params: {
          type: 'back',
          id: this.roleManage.roleId
        }
      })
    } else {
      this.PERSON_PAGE({})
      this.ROLE_ID({})
    }
    this.getGrid()
  },
  mounted () {
    this.pushBreadcrumb({
      name: '查看成员及权限',
      parent: {
        name: 'RoleList',
        query: {
          type: 'back'
        }
      }
    })
  }
}
</script>

<style lang="less">
  @import "index";
</style>
