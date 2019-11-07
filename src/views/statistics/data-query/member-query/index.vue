<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="24">
        <el-row :gutter="10" type="flex">
          <el-col :span="7">
            <el-input placeholder="人员名称" v-model="searchQuery.name" clearable>
            </el-input>
          </el-col>
          <el-col :span="7">
            <el-input placeholder="人员ID" v-model="searchQuery.uid" clearable>
            </el-input>
          </el-col>
          <el-col :span="7">
            <el-input placeholder="登陆账号" v-model="searchQuery.account" clearable>
            </el-input>
          </el-col>
          <el-col :span="3" class="text-right">
            <el-button type="primary" plain @click="getGrid">查询</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="operator-row">
      <el-col :span="24">
        <el-row :gutter="10" type="flex">
          <el-col :span="7">
            <el-input placeholder="所属单位" v-model="searchQuery.orgName" clearable>
            </el-input>
          </el-col>
          <el-col :span="7">
            <el-input placeholder="所属部门" v-model="searchQuery.deptName" clearable>
            </el-input>
          </el-col>
          <el-col :span="7">
            <el-input placeholder="标签" v-model="searchQuery.labelName" clearable>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--表格-->
    <site-table :tableConfig="tableConfig"
                :tableHeight="tableHeight"
                :operateWidth="operateWidth"
                :operate="operate"
                :tableData="tableData">
      <template slot-scope="{slotScope}" slot="status">
      </template>
          <template slot-scope="{slotScope}" slot="operate">
            <el-button size="mini" type="text" @click="goDetails(slotScope.row)">查看明细</el-button>
          </template>
    </site-table>
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

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import SiteTable from '@src/components/SiteTable/index.vue'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { SiteTable },
  mixins: [handleTable],
  data () {
    return {
      searchQuery: {
        name: '',
        uid: '',
        account: '',
        orgName: '',
        deptName: '',
        labelName: ''
      },
      tableConfig: {
        order: {
          key: 0,
          field: 'order',
          tooltip: false,
          formatter: this.formatter,
          label: '序号',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 50
        },
        name: {
          key: 1,
          field: 'name',
          tooltip: false,
          formatter: this.formatter,
          label: '人员名称',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        uid: {
          key: 2,
          field: 'uid',
          tooltip: true,
          formatter: this.formatter,
          label: '人员ID',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        account: {
          key: 3,
          field: 'account',
          tooltip: false,
          formatter: this.formatter,
          label: '登陆账号',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        orgName: {
          key: 4,
          field: 'orgName',
          tooltip: false,
          formatter: this.formatter,
          label: '所属单位',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        deptName: {
          key: 5,
          field: 'deptName',
          tooltip: false,
          formatter: this.formatter,
          label: '所属部门',
          sortable: true,
          showOverflowTooltip: false,
          minWidth: 100
        },
        labelName: {
          key: 6,
          field: 'labelName',
          tooltip: false,
          formatter: this.formatter,
          label: '标签',
          sortable: true,
          showOverflowTooltip: false,
          minWidth: 100
        }
      },
      tableData: [],
      tableHeight: null,
      operateWidth: 100,
      tableCheckbox: true,
      operate: true
    }
  },
  computed: {
    ...mapState(['application', 'examine'])
  },
  created () {
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(this.searchQuery, this.examine.searchQuery)
      this.tableData = Object.assign(this.tableData, this.examine.tableData)
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_EXAMINE_SEARCH_QUERY({})
      this.SET_EXAMINE_TABLEDATA({})
      this.SET_EXAMINE_DETAIL({})
      this.SET_EXAMINE_BACKPATH({})
    }
    this.initQuery()
    this.getGrid()
  },
  methods: {
    ...mapMutations([
      'SET_APPLICATION_PAGE',
      'SET_EXAMINE_TABLEDATA',
      'SET_EXAMINE_DETAIL',
      'SET_EXAMINE_SEARCH_QUERY',
      'SET_EXAMINE_BACKPATH']),
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
    search () {
      this.$nextTick(() => {
        this.page.current = 1
        this.getGrid()
      })
    },
    getGrid () {
      let data = {
        page: this.page.current,
        pageSize: this.page.limit
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
      api[urlNames['findMemberList']](data).then((res) => {
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.tableData = []
        this.page.total = 0
      })
    },
    goDetails (row) {
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_EXAMINE_SEARCH_QUERY(this.searchQuery)
      this.SET_EXAMINE_TABLEDATA(this.tableData) // 存储当前页面table的数据列表
      this.SET_EXAMINE_DETAIL(row) // ExamineDetails页面需要用到的当前列表中点击项的数据
      this.SET_EXAMINE_BACKPATH(this.$route.name) // ExamineDetails页面需要用到的当前列表中点击项的数据
      this.$router.push({
        name: 'ExamineDetails',
        params: { parentCode: 1910281645 }
      })
    },
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


