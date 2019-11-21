<template>
  <div class="site-module mod-dictionary">
    <!--表格-->
    <site-table :tableConfig="tableConfig"
                :tableHeight="tableHeight"
                :operateWidth="operateWidth"
                :operate="operate"
                :tableData="tableData">
    </site-table>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import SiteTable from '@src/components/SiteTable/index.vue'
import tableConfig from './tableConfig'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { SiteTable },
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      tableConfig,
      tableData: [],
      operateWidth: 100,
      tableHeight: null,
      tableCheckbox: true,
      operate: false
    }
  },
  computed: {
    ...mapState(['application', 'examine'])
  },
  created () {
    this.getGrid()
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
    search () {
      this.$nextTick(() => {
        this.page.current = 1
        this.getGrid()
      })
    },
    getGrid () {
      this.loading = true
      let data = {
        date: this.$route.params.month,
        confirmId:  this.$route.params.id,
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
      api[urlNames['findConfirmMemberById']](data).then((res) => {
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.tableData = []
        this.page.total = 0
      })
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>


