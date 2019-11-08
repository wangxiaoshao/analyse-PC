<template>
  <div class="site-module mod-dictionary">
    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="18">
        <el-row :gutter="10" type="flex">
          <!--<el-col :span="6">-->
          <!--<el-select v-model="searchQuery.id" filterable clearable @change="search" placeholder="单位">-->
          <!--<el-option-->
          <!--v-for="item in areaList"-->
          <!--:key="item.id"-->
          <!--:label="item.name"-->
          <!--:value="item.code">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-col>-->
          <el-col :span="8">
            <!--<el-input placeholder="请输入关键字搜索" v-model="searchQuery.keyword" clearable @change="getGrid">-->
              <!--<el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
            <!--</el-input>-->
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
        <el-button size="mini" type="text" @click="goConfig(slotScope.row)">查看明细</el-button>
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
      loading: true,
      searchQuery: {
        id: '',
        status: '',
        keyword: ''
      },
      list: [],
      areaList: [
        {
          'id': 1,
          'code': '1',
          'name': '单位'
        },
        {
          'id': 2,
          'code': '2',
          'name': '部门'
        },
        {
          'id': 3,
          'code': '3',
          'name': '人员'
        }
      ],
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
        applyName: {
          key: 1,
          field: 'applyName',
          tooltip: false,
          formatter: this.formatter,
          label: '申请人',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        content: {
          key: 2,
          field: 'content',
          tooltip: true,
          formatter: this.formatter,
          label: '申请内容',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        applyTime: {
          key: 3,
          field: 'applyTime',
          tooltip: false,
          formatter: this.formatter,
          label: '申请时间',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        reason: {
          key: 4,
          field: 'reason',
          tooltip: true,
          formatter: this.formatter,
          label: '申请原因',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        state: {
          key: 5,
          field: 'state',
          tooltip: false,
          formatter: this.formatter,
          label: '审核状态',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        auditTime: {
          key: 6,
          field: 'auditTime',
          tooltip: false,
          formatter: this.formatter,
          label: '审核时间',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        auditOpinion: {
          key: 7,
          field: 'auditOpinion',
          tooltip: false,
          formatter: this.formatter,
          label: '审核意见',
          sortable: false,
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
      api[urlNames['getMyApplyAuditList']](data).then((res) => {
        this.loading = false
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.loading = false
        this.tableData = []
        this.page.total = 0
      })
    },
    goConfig (row) {
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_EXAMINE_SEARCH_QUERY(this.searchQuery)
      this.SET_EXAMINE_TABLEDATA(this.tableData) // 存储当前页面table的数据列表
      this.SET_EXAMINE_DETAIL(row) // ExamineDetails页面需要用到的当前列表中点击项的数据
      this.SET_EXAMINE_BACKPATH(this.$route.name) // ExamineDetails页面需要用到的当前列表中点击项的数据
      this.$router.push({
        name: 'MyApplicationDetail',
        query: {
          id: row.id,
          type: row.type
        }
      })
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>


