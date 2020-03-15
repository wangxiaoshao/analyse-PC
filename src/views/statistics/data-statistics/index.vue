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
          <div>//{{dateName}}</div>
          <div>内设机构总数</div>
          <div>{{countData.deptCount}}</div>
        </div>
      </span>
      <span class="template-two light-blue">
        <div style="position: absolute" class="add-depart">
          <div>//{{dateName}}</div>
          <div>单位总数</div>
          <div>{{countData.organCount}}</div>
        </div>
      </span>
      <span class="template-two light-orange">
        <div style="position: absolute" class="add-member">
          <div>//{{dateName}}</div>
          <div>接入应用总数</div>
          <div>{{applyCount}}</div>
        </div>
      </span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="statistic-tab">
      <el-tab-pane label="各市州单位总数占比" name="unit" lazy >
        <echarts :echartsAry='echartsAry1' v-if="activeName=='unit'"></echarts>
      </el-tab-pane>
      <el-tab-pane label="各市州内设机构数占比" name="department"  lazy> 
         <echarts :echartsAry='echartsAry2' v-if="activeName=='department'"></echarts>
      </el-tab-pane>
      <el-tab-pane label="各市州人员总数占比" name="member">
         <echarts :echartsAry='echartsAry3' v-if="activeName=='member'"></echarts>
      </el-tab-pane>
      <el-tab-pane label="接入应用数占比" name="applyCount">
         <echarts :echartsAry='echartsAry3' v-if="activeName=='applyCount'"></echarts>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="12" :style="{padding: '10px 40px', paddingRight: '90px'}">
        <!--<div :style="{width: '100%', height: '500px', backgroundColor: 'red'}"></div>-->
        <el-row>
          <el-col :span="24">
            <div class="template-btn unit-query" @click="jumpQuery('unit')">单位查询</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="template-btn depart-query" @click="jumpQuery('department')">内设机构查询</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="template-btn member-query" @click="jumpQuery('member')">人员查询</div>
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
          :timestamp="activity.actionTime">
            {{activity.userName}}{{activity.description}}
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
import echartsDept from '../components/EchartsDept'
import echartsPeople from '../components/EchartsPeople'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { echarts ,echartsDept,echartsPeople},
  mixins: [handleTable],
  data () {
    return {
      echartsName:'unit',
      reverse: true,
      newsList: [],
      dateName:'今天',
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
      countData: {
        organizationCount:null,
        deptCount:null,
        organCount:null
      },
      applyCount:null,
      echartsAry1: [
            ['amount', 'product'],
            [58212, '贵阳市'],
            [78254, '遵义市'],
            [41032, '安顺市'],
            [12755, '六盘水'],
            [20145, '毕节市'],
            [79146, '铜仁市'],
            [91852, '黔南州'],
            [101852, '黔西南州'],
            [20112, '黔东南州']
          ],
           echartsAry2: [
            ['amount', 'product'],
            [63455, '贵阳市'],
            [40089, '遵义市'],
            [40076, '安顺市'],
            [12755, '六盘水'],
            [20003, '毕节市'],
            [59802, '铜仁市'],
            [54383, '黔南州'],
            [58003, '黔西南州'],
            [34677, '黔东南州']
          ],
           echartsAry3: [
            ['amount', 'product'],
            [120000, '贵阳市'],
            [68000, '遵义市'],
            [56003, '安顺市'],
            [76890, '六盘水'],
            [34899, '毕节市'],
            [56788, '铜仁市'],
            [69990, '黔南州'],
            [86667, '黔西南州'],
            [20112, '黔东南州']
          ]
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {
    this.initDataStatistics()
    // 获取接应用总数 
    api[urlNames['findApplicationCount']]().then((res) => {
        this.applyCount = res.data[0]
      })
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
      let selected=this.dataList.filter(item=> item.type==this.selected.type)
      this.dateName=selected[0].name
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
    handleClick (targetName,num) {
      // console.log('targetName:',targetName.name)
      this.echartsName=targetName.name
    },
    jumpQuery (routerParams) { // routerParams === Unit|Department|Member
      this.$router.push({
        path: routerParams + '-query'
      })
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


