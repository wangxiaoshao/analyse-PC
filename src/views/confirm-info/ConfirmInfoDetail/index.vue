<template>
  <div class="site-module mod-dictionary">
    <!--表格-->
    <site-table :tableConfig="tableConfig"
                :tableHeight="tableHeight"
                :operateWidth="operateWidth"
                :operate="operate"
                :tableData="tableData">
      <template slot-scope="{slotScope}" slot="status">
      </template>
    </site-table>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import SiteTable from '@src/components/SiteTable/index.vue'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { SiteTable },
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      gridData: [{
        counts: '1202',
        name: '王小虎'
      }],
      loading: true,
      statusOptions: [{
        value: '选项1',
        label: '已确认'
      },
        {
          value: '选项2',
          label: '未确认'
        },
        {
          value: '选项3',
          label: '待确认'
        }],
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
        orgName: {
          key: 1,
          field: 'orgName',
          tooltip: false,
          formatter: this.formatter,
          label: '单位名称',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        mainLeader: {
          key: 2,
          field: 'mainLeader',
          tooltip: true,
          formatter: this.formatter,
          label: '单位主要领导',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        confirmMonth: {
          key: 3,
          field: 'confirmMonth',
          tooltip: false,
          formatter: this.formatter,
          label: '确认月份',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        state: {
          key: 4,
          field: 'state',
          tooltip: false,
          formatter: this.formatter,
          label: '确认状态',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        confirmTime: {
          key: 5,
          field: 'confirmTime',
          tooltip: false,
          formatter: this.formatter,
          label: '确认时间',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        },
        confirmStaff: {
          key: 6,
          field: 'confirmStaff',
          tooltip: false,
          formatter: this.formatter,
          label: '确认人员',
          sortable: false,
          showOverflowTooltip: false,
          minWidth: 100
        }
      },

      tableData: [],
      operateWidth: 100,
      tableHeight: 200,
      tableCheckbox: true,
      operate: false
    }
  },
  computed: {
    ...mapState(['application', 'examine'])
  },
  created () {
    this.initQuery()
    this.getGrid()
    this.getMyAuditList()
  },
  mounted () {
    this.pushBreadcrumb({
      name: '人员明细',
      parent: {
        name: this.examine.backPath,
        query: {
          type: 'back'
        }
      }
    })
  },
  methods: {
    ...mapMutations([
      'SET_APPLICATION_PAGE',
      'SET_EXAMINE_TABLEDATA',
      'SET_EXAMINE_DETAIL',
      'SET_EXAMINE_SEARCH_QUERY',
      'SET_EXAMINE_BACKPATH']),
    scrollStyle () {
      return {
        height: this.$store.state.app.windowHeight - 30 + 'px'
      }
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
    trim (str) {
      return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
    },
    getMyAuditList () {
      api[urlNames['getInfoConfirmList']]().then((res) => {
        this.tableData.push(res.data.confirmationOrgDto)
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
      this.$router.push({
        name: 'ConfirmInfoDetail',
        query: { id: row.id }
      })
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    handleClose () {
      this.dialogVisible = false
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
  @import "index";
</style>


