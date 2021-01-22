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
        <site-table
            :tableConfig="tableConfig"
            :tableHeight="tableHeight"
            :operateWidth="operateWidth"
            :operate="operate"
            :tableData="tableData"
        >
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <span v-show="scope.row.auditState === 1" class="text-green"
                        >已审核</span
                    >
                    <span v-show="scope.row.auditState !== 1" class="text-red"
                        >待审核</span
                    >
                </template>
            </el-table-column>
            <template slot-scope="{ slotScope }" slot="operate">
                <el-button
                    size="mini"
                    type="text"
                    @click="goDetail(slotScope.row)"
                    :disabled="
                        !(
                            hasRight('auditUserCreate') &&
                            hasRight('auditUserUpdate') &&
                            hasRight('auditUserRemove') &&
                            hasRight('auditOrgCreate') &&
                            hasRight('auditOrgUpdate') &&
                            hasRight('auditDepartmentCreate') &&
                            hasRight('auditDepartmentUpdate') &&
                            hasRight('auditOrgRemove') &&
                            hasRight('auditDepartmentRemove')
                        )
                    "
                    >去审核</el-button
                >
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
            :total="page.total"
        >
        </el-pagination>
    </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import SiteTable from '@src/components/SiteTable/index.vue'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import tableConfig from './tableConfig'
export default {
  components: { SiteTable },
  mixins: [handleTable],
  data () {
    return {
      tableConfig,
      loading: true,
      searchQuery: {
        id: '',
        status: '',
        keyword: ''
      },
      list: [],
      areaList: [
        {
          id: 1,
          code: '1',
          name: '单位'
        },
        {
          id: 2,
          code: '2',
          name: '内设机构'
        },
        {
          id: 3,
          code: '3',
          name: '人员'
        }
      ],
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
      this.searchQuery = Object.assign(
        this.searchQuery,
        this.examine.searchQuery
      )
      this.tableData = Object.assign(
        this.tableData,
        this.examine.tableData
      )
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
      'SET_EXAMINE_BACKPATH'
    ]),
    initQuery () {
      const keys = Object.assign({}, this.$route.query)
      const len = keys.length
      for (let i = 0; i < len; i++) {
        const key = keys[i]
        const value = this.$route.query[key]
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
        // this.getGrid()
      })
    },
    getGrid () {
      this.loading = true
      const data = {
        type: 0,
        page: this.page.current,
        limit: this.page.limit
      }
      const keys = Object.keys(this.searchQuery)
      const len = keys.length
      for (let i = 0; i < len; i++) {
        const key = keys[i]
        const value = this.searchQuery[key]
        if (typeof value !== 'number') {
          if (value) {
            data[key] = value
          }
        } else {
          data[key] = value
        }
      }
      api[urlNames.getAuditList](data).then(
        (res) => {
          this.loading = false
          this.tableData = res.data
          this.page.total = res.total
        },
        () => {
          this.loading = false
          this.tableData = []
          this.page.total = 0
        }
      )
    },
    goDetail (row) {
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_EXAMINE_SEARCH_QUERY(this.searchQuery)
      this.SET_EXAMINE_TABLEDATA(this.tableData)
      this.SET_EXAMINE_DETAIL(row)
      this.SET_EXAMINE_BACKPATH(this.$route.name)
      this.$router.push({
        name: 'WaitApprovalDetail',
        params: {
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
