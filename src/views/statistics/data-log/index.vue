<template>
  <div class="data-log">
    <div class="all-log">
      <el-tabs>
        <el-tab-pane label="操作日志"  v-if="hasRight('systemLogingAccess')">
          <personal-log :loginLog="logAry[1]" :showFindBtn='showFindBtn'></personal-log>
        </el-tab-pane>
        <el-tab-pane label="系统日志"  v-if="hasRight('systemLogingSystemAccess')">
          <personal-log :loginLog="logAry[2]" :showFindBtn='showFindBtn'></personal-log>
        </el-tab-pane>
        <el-tab-pane label="共享日志"  v-if="hasRight('systemLogingPushAccess')">
          <push-log></push-log>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import HasRight from '@src/mixins/has-right'
/* import { api, urlNames } from '@src/api' */
import { mapState, mapMutations } from 'vuex'
import PersonalLog from '@src/components/PersonalLog/index'
import PushLog from '@src/views/shared/push-log'
export default {
  mixins: [handleTable, HasRight],
  components: { PersonalLog, PushLog },
  data () {
    return {
      searchQuery: {
        areaId: '',
        status: '',
        keyword: ''
      },
      logAry: [1, 2, 3],
      showFindBtn: true,
      systemLogingAccess: false,
      systemLogingSystemAccess: false,
      systemLogingPushAccess: false,
      systemData: [],
      weekstart: '',
      activeName: 'first',
      reverse: true,
      newsList: [],
      currentDateVal: '',
      openPicker: false,
      selectValue: '',
      date: '',
      inputValue: '',
      dateType: '',
      format: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e6
        },
        shortcuts: null
      },
      value: ''
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {
    /* let datefilters = this.$options.filters['date'](
      new Date().getTime(),
      'yyyy-MM-dd'
    )
    this.date = datefilters
    this.weekstart = datefilters
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(
        this.searchQuery,
        this.application.searchQuery
      )
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_APPLICATION_SEARCH_QUERY({})
    }
    this.getGrid(this.date) */
  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    opensystemInfo () {}
    /* selectChange (val) {
      this.date = ''
      this.currentDateVal = ''
      this.openPicker = false
      let todayDate = new Date()
      if (val && val.length > 1) {
        this.openPicker = true
        this.dateType = val[0]
        this.value = val[1]
        this.format = val[2]
        return false
      } else if (val && val[0] === 'yesterday') {
        todayDate = new Date(todayDate.setDate(todayDate.getDate() - 1))
        this.dateType = val[0]
      }
      this.date = this.$options.filters['date'](
        todayDate.getTime(),
        'yyyy-MM-dd'
      )
      if (this.date) {
        this.getGrid()
      }
    },
    dateChange (val) {
      if (val) {
        this.date = val
        this.getGrid()
      }
    },
    getGrid () {
      let data = {
        date: this.date,
        type: this.dateType === 'month' ? 4 : 0, // 后端需要传输的数据类型 月份type：4 || 天：0
        page: this.page.current,
        limit: this.page.limit
      }
      api[urlNames['getDataLogList']](data).then(
        res => {
          // this.newsList = res.data
          this.systemData = res.data
          this.page.total = res.total
        },
        () => {
          this.list = []
          this.page.total = 0
        }
      )
    }, */
    /* handleClick (tab, event) {
      if(this.activeName=='first'){
        this.showFindBtn=true
      }else{
        this.showFindBtn=false
      }
    } */
  }
}
</script>
<style lang="less">
@import './index';
</style>


