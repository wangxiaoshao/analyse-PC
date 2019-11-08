<template>
  <div class="data-log">
    <!--时间轴-->
    <el-row :style="{paddingLeft: '60px'}">
      <el-col :span="4">
        <div class="block">
          <el-select v-model="selectValue"
          slot="prepend"
          align="center"
          placeholder="今天"
          @change="selectChange(selectValue)">
          <el-option label="今天" :value="['today']"></el-option>
          <el-option label="昨天" :value="['yesterday']"></el-option>
          <!--<el-option label="周" :value="['week', '周', 'yyyy 第 WW 周']"></el-option>-->
            <el-option label="月" :value="['month', '月', 'yyyy-DD']"></el-option>
          <el-option label="选择日期" :value="['date', '日期', 'yyyy-MM-DD']"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6" :style="{width: '220px'}">
        <div class="block" v-if="openPicker">
          <el-date-picker
            slot="append"
            v-model="currentDateVal"
            :type="dateType"
            :default-value="weekstart"
            :format="format"
            :placeholder="'选择'+value"
            @change="dateChange">
          </el-date-picker>
        </div>
        <div v-else>
          <el-input v-model="inputValue" :placeholder="date" :disabled="true">
            <i slot="prefix" class="el-input__icon el-icon-date"></i>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="14" :style="{ marginLeft: '80px', marginTop: '20px'}">
        <div class="timeLine">
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              placement="top"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-col>
    </el-row>

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
import { api, urlNames } from '@src/api'
import { filters } from '@src/filters'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { filters },
  mixins: [handleTable],
  data () {
    return {
      searchQuery: {
        areaId: '',
        status: '',
        keyword: ''
      },
      weekstart: '',
      reverse: true,
      activities: [{
        content: '陈宇 修改了 贵州省人力资源管理局 的单',
        timestamp: '2018-04-15'
      },
      {
        content: '陈宇 修改了 贵州省人力资源管理局 的单',
        timestamp: '2018-04-13'
      },
      {
        content: '陈宇 修改了 贵州省人力资源管理局 的单',
        timestamp: '2018-04-13'
      },
      {
        content: '陈宇 修改了 贵州省人力资源管理局 的单',
        timestamp: '2018-04-13'
      },
      {
        content: '陈宇 登陆系统备份 4',
        timestamp: '2018-04-11'
      }],
      currentDateVal: '',
      openPicker: false,
      selectValue: '',
      date: '',
      inputValue: '',
      dateType: '',
      format: '',
      value: ''
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {
    let datefilters = this.$options.filters['date'](new Date().getTime(), 'yyyy-MM-dd')
    this.date = datefilters
    this.weekstart = datefilters
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(this.searchQuery, this.application.searchQuery)
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_APPLICATION_SEARCH_QUERY({})
    }
    this.initQuery()
    this.getGrid()
  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    selectChange (val) {
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
      }
      this.date = this.$options.filters['date'](todayDate.getTime(), 'yyyy-MM-dd')
    },
    dateChange (val) {
      console.log(val)
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
    getAreaList () {
      api[urlNames['getAreaList']]().then((res) => {
        this.areaList = res.data
      })
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
      api[urlNames['getApplicationList']](data).then((res) => {
        this.list = res.data
        this.page.total = res.total
      }, () => {
        this.list = []
        this.page.total = 0
      })
    },
    goConfig (row) {
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_APPLICATION_SEARCH_QUERY(this.searchQuery)
      this.$router.push({
        name: 'ExamineDetails',
        params: {
          id: 12
        }
      })
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


