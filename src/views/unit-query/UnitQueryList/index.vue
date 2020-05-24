<template>
  <div class="site-module mod-dictionary">
    <search-lable
      :openSearchFlag="openSearchFlag"
      :addInfo="addInfo"
      @close="getClose"
      @getTag="getTag"
      :delSelectLabelId="delSelectLabelId"
    ></search-lable>

    <!--操作row-->
    <el-row class="operator-row">
      <el-col :span="24">
        <el-row :gutter="10" type="flex">
          <el-col :span="4">
            <el-input placeholder="单位名称" v-model="searchQuery.name" @clear="clearSearch()" clearable>
            </el-input>
          </el-col>
<!--          <el-col :span="4">-->
<!--            <el-input placeholder="单位ID" v-model="searchQuery.id"  @clear="clearSearch()" clearable>-->
<!--            </el-input>-->
<!--          </el-col>-->
          <el-col :span="4">
            <el-input placeholder="上级名称" v-model="searchQuery.parentName"  @clear="clearSearch()" clearable>
            </el-input>
          </el-col>
          <el-col :span="2">
            <el-input placeholder="请选择标签" v-model="searchQuery.labelName"  @focus="openSearchFlag = true" clearable @clear="selectedTags = []">
            </el-input>
          </el-col>
          <el-col :span="2" class="text-left">
            <el-button type="primary" plain @click="getGrid(1)"
              :disabled="!hasRight('searchOrg')"
            >查询</el-button>
            <!-- <el-button type="primary" plain @click="getGrid">返回</el-button> -->
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
import tableConfig from './tableConfig'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import HasRight from '@src/mixins/has-right'
import searchLable from '@src/views/organization/components/AddTags/index.vue'

export default {
  components: { SiteTable, searchLable },
  mixins: [handleTable, HasRight],
  data () {
    return {
      openSearchFlag: false,
      delSelectLabelId: null,
      addInfo: {
        searchFlag: false,
        type: 1 // 1.单位，2、内设机构，3、人员
      },
      selectedTags: [],
      tableConfig,
      searchQuery: {
        name: '',
        id: '',
        parentName: '',
        parentId: '',
        labelName: ''
      },
      tableData: [],
      tableHeight: null,
      operateWidth: 100,
      tableCheckbox: true,
      operate: true,
      restaurants: [],
      selectValue: '',
      triggerOnFocus: false,
      timeout: null
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
    // this.getGrid()
  },
  methods: {
    ...mapMutations([
      'SET_APPLICATION_PAGE',
      'SET_EXAMINE_TABLEDATA',
      'SET_EXAMINE_DETAIL',
      'SET_EXAMINE_SEARCH_QUERY',
      'SET_EXAMINE_BACKPATH']),
    querySearchAsync (queryString, cb) {
      api[urlNames['findLabelByType']]({
        type: 1,
        name: queryString
      }).then((res) => {
        if (res) {
          let data = res.data
          clearTimeout(this.timeout)
          var results = queryString ? data.filter(this.createStateFilter(queryString)) : data
          this.timeout = setTimeout(() => {
            cb(results)
          }, 3000 * Math.random())
        }
      }, () => {
        return []
      })
    },
    getClose () {
      this.openSearchFlag = false
    },
    getTag (selectedTagList) {
      this.selectedTags = []
      let tmpLabel = []
      selectedTagList.forEach(item => {
        this.selectedTags.push({
          name: item.split('|')[1]
        })
        tmpLabel.push(item.split('|')[1])
      })
      this.searchQuery.labelName = tmpLabel.join(',')
    },
    handleClose (tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1)
      let tmpLabel = []
      this.selectedTags.forEach(item => {
        tmpLabel.push(item.name)
      })
      this.searchQuery.labelName = tmpLabel.join(',')
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.searchQuery.labelName = item.name
    },
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
    search () {
      this.$nextTick(() => {
        this.getGrid()
      })
    },
    clearSearch () {
      this.getGrid()
    },
    inputClear () {
      if (this.searchQuery.labelName === '') {
        this.getGrid()
      }
    },
    getGrid (findPage) {
      let data = {
        page: this.page.current,
        limit: this.page.limit
      }
      if (findPage === 1) {
        data.page = findPage
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
      api[urlNames['findOrganizationList']](data).then((res) => {
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.loading = false
        this.tableData = []
        this.page.total = 0
      })
    },
    goDetails (row) {
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_EXAMINE_SEARCH_QUERY(this.searchQuery)
      this.SET_EXAMINE_TABLEDATA(this.tableData)
      this.SET_EXAMINE_DETAIL(row)
      this.SET_EXAMINE_BACKPATH(this.$route.name)
      this.$router.push({
        path: `/${this.$route.meta.prePath}/unitDetail/${row.id}`
      })
    }
  }
}
</script>
<style lang="less"  scoped>
  @import "index";
</style>


