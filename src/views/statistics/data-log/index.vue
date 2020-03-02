<template>
  <div class="data-log">
    <div class="all-log">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="登录日志">
          <!-- <personal-log :loginLog='logAry[0]'></personal-log> -->
        </el-tab-pane>
        <el-tab-pane label="操作日志" name="first">
          <!-- <div v-if="newsList && newsList.length === 0" class="noDataList">暂无数据</div> -->
          <!-- <el-row v-if="newsList && newsList.length > 0">
            <el-col :span="14" :style="{ marginLeft: '80px', marginTop: '20px'}">
              <div class="timeLine">
                <el-timeline :reverse="reverse">
                  <el-timeline-item
                    v-for="(activity, index) in newsList"
                    :key="index"
                    placement="top"
                    :timestamp="activity.actionTime"
                  >{{activity.userName}}{{activity.description}}</el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </el-row>-->
          <!-- <div class="log-table">
            <el-table :data="systemData" stripe border align="center" style="width: 100%">
              <el-table-column type="index" label="序号" width="80"></el-table-column>
              <el-table-column prop="actionTime" label="时间"></el-table-column>
              <el-table-column prop="userName" label="操作人"></el-table-column>
              <el-table-column prop="description" label="描述"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <a
                    href="javascript:void(0);"
                    style="color:red;font-size:12px"
                    @click="opensystemInfo(scope.row)"
                  >详情</a>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            ></el-pagination>
          </div>-->
          <personal-log :loginLog="logAry[1]"></personal-log>
        </el-tab-pane>
        <el-tab-pane label="系统日志">
          <personal-log :loginLog="logAry[2]"></personal-log>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import PersonalLog from '@src/components/PersonalLog/index'
export default {
  mixins: [handleTable],
  components: { PersonalLog },
  data() {
    return {
      searchQuery: {
        areaId: '',
        status: '',
        keyword: ''
      },
      logAry: [1, 2, 3],
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
        disabledDate(time) {
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
  created() {
    let datefilters = this.$options.filters['date'](
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
    this.getGrid(this.date)
  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    opensystemInfo() {},
    selectChange(val) {
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
    dateChange(val) {
      if (val) {
        this.date = val
        this.getGrid()
      }
    },
    getGrid() {
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
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style lang="less">
@import './index';
</style>


