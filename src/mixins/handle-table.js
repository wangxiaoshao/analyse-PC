/**
 * mixins
 * 翻页、排序、过滤、自动计算table高度
 * 获取列表方法名需要统一为 getGrid()
 */
import pickerOptions from './picker-options'
export default {
  data () {
    return {
      searchQuery: {},
      page: {
        limit: 10,
        current: 1,
        total: 0
      },
      timeDuration: null,
      pickerOptions: pickerOptions
    }
  },
  computed: {
    // 采用computed，依赖store中windowHeight计算table高度，避免重复绑定resize事件
    tableMaxHeight () {
      return this.$store.state.app.windowHeight - 258
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.current = 1
      this.page.limit = val
      this.getGrid()
    },
    handleCurrentChange (val) {
      this.page.current = val
      this.getGrid()
    },
    // 排序
    sort (item) {
      if (item.order) {
        this.page.current = 1
        this.searchForm['sidx'] = `${item.prop} ${item.order === 'ascending' ? 'asc' : 'desc'}`
      } else {
        this.page.current = 1
        this.searchForm['sidx'] = ''
      }
      this.getGrid()
    },
    // 过滤
    filter (oFilter) {
      let aFilter = Object.keys(oFilter)
      let length = aFilter.length
      for (let i = 0; i < length; i++) {
        this.searchForm[aFilter[i]] = oFilter[aFilter[i]][0]
      }
      this.page.current = 1
      this.getGrid()
    },
    filterMethod () {
      return true
    },
    /* 时间段过滤 */
    dateChange (val) {
      this.searchForm.startDate = val ? this.$options.filters['date'](val[0].getTime(), 'yyyy-MM-dd') : ''
      this.searchForm.endDate = val ? this.$options.filters['date'](val[1].getTime(), 'yyyy-MM-dd') : ''
      this.getGrid(this.searchForm.startDate)
    },
    /* 导出table数据 */
    exportList (urlKey, fileName) {
      this.fullscreenLoading = this.$loading({
        lock: true,
        text: '导出中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.6)'
      })
      let data = {}
      let aKey = Object.keys(this.searchForm)
      for (let key of aKey) {
        if (this.trim(this.searchForm[key])) {
          data[key] = this.searchForm[key]
        }
      }
      this._http.doExport(this, urlKey, fileName, data, () => {
        this.fullscreenLoading.close()
      })
    },
    // 计算table高度
    bindTableHeight (height = 0) {
      this.tableHeight = document.documentElement.clientHeight - 160 - height
      window.addEventListener('resize', () => {
        this.tableHeight = document.documentElement.clientHeight - 160 - height
      })
    },
    /**
		 * 通用弹出确认操作 删除 下架等
		 * @param {*} text 提示
		 * @param {*} id row.id
		 * @param {*} cb 回调 
		 */
    handleRow (text, id, cb) {
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cb(id)
      }).catch(() => {
      })
    }
  },
  mounted () {}
}
