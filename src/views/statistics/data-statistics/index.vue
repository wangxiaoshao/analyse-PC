<template>
  <div class="data-statistic">
    <!--顶部时间筛选row-->
    <div class="">
      <el-row class="operator-row">
        <el-col :span="18">
          <el-row :gutter="10" type="flex">
            <el-col :span="6">
              <el-select
                v-model="searchQuery.areaId"
                filterable
                clearable
                @change="search"
                placeholder="今天">
                <el-option
                  v-for="item in areaList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
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
          <div>203350人</div>
        </div>
      </span>
      <span class="template-two light-purple">
        <div style="position: absolute" class="add-unit">
          <div>//今天</div>
          <div>新增单位</div>
           <div>20</div>
        </div>
      </span>
      <span class="template-two light-blue">
        <div style="position: absolute" class="add-depart">
          <div>//今天</div>
          <div>新增部门</div>
          <div>20</div>
        </div>
      </span>
      <span class="template-two light-orange">
        <div style="position: absolute" class="add-member">
          <div>//今天</div>
          <div>新增人员</div>
          <div>20</div>
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
            <el-button style="float: right; padding: 3px 0" type="text">查看更多</el-button>
          </div>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import echarts from '../components/Echarts'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { echarts },
  mixins: [handleTable],
  data () {
    return {
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
      areaList: [
        { id: 1, name: '今天', code: 1910291111 },
        { id: 2, name: '昨天', code: 1910291112 },
        { id: 3, name: '一周', code: 1910291113 },
        { id: 4, name: '一月', code: 1910291114 }
      ],
      searchQuery: {
        areaId: '',
        keyword: ''
      },
      activeName: 'unit'
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {

  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    search () {},
    getGrid () {},
    handleClick () {},
    jumpQuery (routerParams) { // routerParams === Unit|Department|Member
      this.$router.push({
        name: routerParams + 'Query'
      })
    },
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


