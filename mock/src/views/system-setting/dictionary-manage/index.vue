<template>
  <div class="site-module mod-dictionary">
    <el-row class="operator-row" :gutter="24">
      <el-col :span="24" class="text-right">
      </el-col>
    </el-row>
    <!--表格-->
    <site-table :tableConfig="tableConfig"
                :tableHeight="tableHeight"
                :operateWidth="operateWidth"
                :operate="operate"
                :tableData="tableData">
      <el-table-column label="启用状态" align="center" min-width="50">
        <template slot-scope="scope">
          <span v-show="scope.row.removed === 1" class="text-green">启用</span>
          <span v-show="scope.row.removed !== 1" class="text-red">禁用</span>
        </template>
      </el-table-column>
      <template slot-scope="{slotScope}" slot="operate">
        <el-button size="mini" type="text" @click="openDialog(slotScope.row)">添加</el-button>
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
    <edit-dialog
      :visible="dialogVisible"
      :config-type="type"
      :dialogTitle="title"
      @refreshList="getGrid"
      @close="closeAddDialog"></edit-dialog>
    <dictionary-list
      :visible="dicDialogVisible"
      :config-type="type"
      :dialogTitle="dicTitle"
      :dictionaryType="dictionaryType"
      @refreshList="getGrid"
      @close="closeAddDialog"></dictionary-list>
  </div>
</template>

<script type="text/ecmascript-6">
import EditDialog from '../components/EditDialog/index'
import DictionaryList from '../components/DictionaryListDialog/index'
import handleTable from '@src/mixins/handle-table'
import tableConfig from './tableConfig'
import { api, urlNames } from '@src/api'
import SiteTable from '@src/components/SiteTable/index.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { EditDialog, DictionaryList, SiteTable },
  mixins: [handleTable],
  data () {
    return {
      tableConfig,
      dialogVisible: false,
      dicDialogVisible: false,
      type: '',
      tableData: [],
      tableHeight: null,
      operateWidth: 100,
      tableCheckbox: true,
      operate: true,
      dictionaryType: '',
      title: '创建字典',
      dicTitle: '职级字段列表'
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
    this.getGrid()
  },
  methods: {
    ...mapMutations([
      'SET_APPLICATION_PAGE',
      'SET_EXAMINE_TABLEDATA',
      'SET_EXAMINE_DETAIL',
      'SET_EXAMINE_SEARCH_QUERY',
      'SET_EXAMINE_BACKPATH']),
    addDictionary () {
      this.dialogVisible = true
    },
    scrollStyle () {
      return {
        height: this.$store.state.app.windowHeight - 30 + 'px'
      }
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
      api[urlNames['getDictionaryList']](data).then((res) => {
        this.loading = false
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.loading = false
        this.page.total = 0
      })
    },
    openDialog (row) {
      if (row && row.id) {
        this.dictionaryType = row.id

        this.dicDialogVisible = true
      }
    },
    closeAddDialog (dialogName) {
      this[dialogName] = false
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>


