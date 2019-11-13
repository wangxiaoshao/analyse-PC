<template>
  <div class="data-statistic">
    <!--顶部时间筛选row-->
    <div class="">
      <el-row class="operator-row">
        <el-col :span="18">
          <el-row :gutter="10" type="flex">
            <el-col :span="6">
              <el-select
                v-model="selected.type"
                filterable
                clearable
                @change="search"
                placeholder="今天">
                <el-option
                  v-for="item in dataList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.type">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--四张人数统计背景图片-->
    <div class="statistic-bgi">
      <span class="template-one dark-blue">
        <div style="position: absolute" class="register">
          <div>//截止今天</div>
          <div>机构人员注册总数</div>
          <div>{{countData.organizationCount}}</div>
        </div>
      </span>
      <span class="template-two light-purple">
        <div style="position: absolute" class="add-unit">
          <div>//今天</div>
          <div>新增单位</div>
          <div>{{countData.userCount}}</div>
        </div>
      </span>
      <span class="template-two light-blue">
        <div style="position: absolute" class="add-depart">
          <div>//今天</div>
          <div>新增部门</div>
          <div>{{countData.deptCount}}</div>
        </div>
      </span>
      <span class="template-two light-orange">
        <div style="position: absolute" class="add-member">
          <div>//今天</div>
          <div>新增人员</div>
          <div>{{countData.organCount}}</div>
        </div>
      </span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="statistic-tab">
      <el-tab-pane label="各市州新增单位占比" name="unit">
        <echarts></echarts>
      </el-tab-pane>
      <el-tab-pane label="各市州新增部门占比" name="department">各市州新增部门占比</el-tab-pane>
      <el-tab-pane label="各市州新增人员占比" name="member">各市州新增人员占比</el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="12" :style="{padding: '10px 40px', paddingRight: '140px'}">
        <!--<div :style="{width: '100%', height: '500px', backgroundColor: 'red'}"></div>-->
        <el-row>
          <el-col :span="24">
            <div class="template-btn unit-query" @click="jumpQuery('Unit')">单位查询</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="template-btn depart-query" @click="jumpQuery('Department')">部门查询</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="template-btn member-query" @click="jumpQuery('Member')">人员查询</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" :style="{paddingRight: '30px'}">
        <el-card class="box-card" shadow="hover" :style="{height:'300px'}">
          <div slot="header" class="clearfix">
            <span>最新动态</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="handleMore">查看更多</el-button>
          </div>
          <div class="timeLine">
          <el-timeline :reverse="reverse">
          <el-timeline-item
          v-for="(activity, index) in newsList"
          :key="index"
          placement="top"
          :timestamp="activity.timestamp">
          {{activity.content}}
          </el-timeline-item>
          </el-timeline>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import filters from '@src/filters'
import echarts from '../components/Echarts'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { echarts, filters },
  mixins: [handleTable],
  data () {
    return {
      reverse: true,
      newsList: [],
      dataList: [
        { id: 1, name: '今天', type: 1 },
        { id: 2, name: '昨天', type: 2 },
        { id: 3, name: '一周', type: 3 },
        { id: 4, name: '一月', type: 4 }
      ],
      selected: {
        type: 1
      },
      activeName: 'unit',
      countData: []
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {
    this.initDataStatistics()
  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    handleMore () {
      this.$router.push({
        name: 'DataLog'
      })
    },
    search () {
      this.initDataStatistics()
    },
    initDataStatistics () {
      let datefilters = this.$options.filters['date'](new Date().getTime(), 'yyyy-MM')
      let data = {
        date: datefilters,
        type: 4,
        page: 1,
        limit: 5
      }
      api[urlNames['getStatistiscManageDto']]({
        type: this.selected.type
      }).then((res) => {
        this.countData = res.data
      })
      api[urlNames['getDataLogList']](data).then((res) => {
        this.newsList = res.data
      })
    },
    handleClick () {},
    jumpQuery (routerParams) { // routerParams === Unit|Department|Member
      this.$router.push({
        name: routerParams + 'Query'
      })
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


