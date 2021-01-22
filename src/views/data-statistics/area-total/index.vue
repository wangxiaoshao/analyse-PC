<template>
    <div class="area-total">
        <div class="serch-box" id="serch-box">
            <el-form label-position="right" inline>
                <el-row>
                    <el-form-item label="单位类型">
                        <el-select
                            style="width: 160px;"
                            size="medium"
                            placeholder="请选择单位类型"
                            @change="unitTypeChange"
                            v-model="unitType"
                        >
                            <el-option
                                v-for="item in unitTypeList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item
                        label="选择区域"
                        v-if="app.rolesInfo.roleName !== 'COUNTY_MANAGER'"
                    >
                        <el-select
                            size="medium"
                            placeholder="请选择区域"
                            @change="stateChange"
                            value-key="treeId"
                            v-model="stateParams"
                        >
                            <el-option
                                v-for="item in stateList"
                                :key="item.treeId"
                                :label="item.treeName"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择区县">
                        <el-select
                            size="medium"
                            placeholder="请选择区县"
                            @change="areaChange"
                            v-model="areaParams"
                            value-key="treeId"
                            filterable
                        >
                            <el-option
                                v-for="item in areaList"
                                :key="item.treeId"
                                :label="item.treeName"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <!-- <span>日期：</span> -->
                        <el-date-picker
                            v-if="systemId !== 6 && systemId !== 5"
                            v-model="searchDate"
                            type="daterange"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions"
                            @change="dateChange"
                            @blur="onDateBlur"
                        >
                        </el-date-picker>
                        <el-date-picker
                            v-else
                            style="width: 170px;"
                            v-model="searchEaraMouth"
                            type="month"
                            format="yyyy-MM"
                            value-format="yyyyMM"
                            :picker-options="pickerMounthOptions"
                            @change="earaMounthChange"
                            @blur="onDateBlur"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchData"
                            >查询</el-button
                        >
                        <el-button type="primary" @click="resetData"
                            >重置</el-button
                        >
                    </el-form-item>
                </el-row>
            </el-form>
            <div class="system-list">
                <ul>
                    <!-- <div class="is-bottom" id="is-bottom"></div> -->
                    <li
                        :key="-1"
                        @click="applyChange(-1)"
                        :class="{
                            isActive: systemId == -1,
                        }"
                    >
                        全部
                    </li>
                    <li
                        v-for="item in app.applicationList"
                        :key="item.id"
                        :class="{
                            isActive: systemId == item.id,
                        }"
                        @click="applyChange(item.id)"
                    >
                        {{ item.systemName }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="system-data">
            <!-- <el-button @click="send('_g().gotoNextPage()')">点击</el-button> -->
            <!-- <el-button @click="changSize">点击</el-button> -->
            <div class="chart-box">
                <iframe
                    :src="areaSrc"
                    id="areaFrame"
                    frameborder="0"
                    scrolling="no"
                    ref="areaFrame"
                ></iframe>
                <iframe
                    :src="areaTableSrc"
                    id="areaTableFrame"
                    frameborder="0"
                    scrolling="no"
                    ref="areaTableFrame"
                ></iframe>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="send('_g().gotoPreviousPage()')"
                    @next-click="send('_g().gotoNextPage()')"
                    :current-page="page.current"
                    :page-sizes="[10]"
                    :page-size="page.limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { api, urlNames } from '@src/api'
import dataStatistics from '@src/mixins/data-statistics'
import applicationList from '@src/mixins/apply'
export default {
  mixins: [dataStatistics, applicationList],
  data () {
    return {
      areaSrc: '',
      unitType: 2,
      stateParams: {
        // treeId: "520000",
      },
      areaParams: {},
      stateId: '',
      treeType: '',
      systemId: -1,
      stateList: [],
      areaList: [],
      page: {
        current: 1,
        limit: 10,
        total: 0
      },
      autoParams: {
        chartHeight: 300,
        tableHeight: 300,
        total: 0
      },
      liWidth: 0
    }
  },
  created () {
    this.initializeDate()
    this.initializeEaraMounth()
    this.pickDateOptionRules()
    this.pickMounthOptionRules()
    this.getStateList()
  },
  mounted () {
    this.searchData()
    this.initReportPage()
    this.initChartHeight()
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    changSize () {
      const win = document.getElementById('areaTableFrame').contentWindow
      win.postMessage(this.page.limit, '*')
    },
    initReportPage () {
      const ifr = document.getElementById('areaTableFrame').contentWindow
      const sendMessage = function () {
        if (window.postMessage) {
          if (window.addEventListener) {
            // window.addEventListener(
            //     "message",
            //     function (e) {
            //         // console.log(e.data, 1111);
            //     },
            //     false
            // );
          } else if (window.attachEvent) {
            window.attachEvent('onmessage', function (e) {
              console.log(e.data, 2222)
            })
          }
          return function (data) {
            console.log(data, 333)
            ifr.postMessage(data, '*')
          }
        } else {
          let hash = ''
          setInterval(function () {
            if (window.name !== hash) {
              hash = window.name
            }
          }, 200)
          return function (data) {
            console.log(data, 444)
            ifr.name = data
          }
        }
      }
      window.sendMessage = sendMessage()
    },
    send (msg) {
      window.sendMessage(msg)
    },
    initChartHeight () {
      const that = this
      document.getElementById('areaFrame').onload = function () {
        window.addEventListener(
          'message',
          function (e) {
            if (e.data.height > -1 && e.data.total > -1) {
              that.autoParams.tableHeight = e.data.height
              that.autoParams.total = e.data.total
            } else if (
              e.data.height > -1 &&
                            !e.data.total &&
                            e.data.total !== 0
            ) {
              that.autoParams.chartHeight = e.data.height
            }
            // console.log(e.data, "jjjjjjj");
          },
          false
        )
      }
    },
    handleSizeChange (val) {
      this.page.limit = val
    },
    handleCurrentChange (val) {
      this.page.current = val
      this.send(`_g().gotoPage(${this.page.current})`)
    },

    getStateList () {
      if (
        this.app.rolesInfo.roleName === 'SUPER_MANAGER' ||
                this.app.rolesInfo.roleName === 'PROVINCE_MANAGER'
      ) {
        api[urlNames.getTreeList]({
          treeId: '520000',
          treeType: 0
        }).then((res) => {
          if (res.data) {
            this.stateList = res.data
          }
        })
      } else {
        const data = {
          codeList: this.app.rolesInfo.authorizedOid,
          authorizedType: this.app.rolesInfo.authorizedType
        }
        api[urlNames.getAreaList](data).then((res) => {
          if (res.data) {
            const aryList = []
            res.data.forEach((item) => {
              const obj = {
                treeId: item.areaCode,
                treeName: item.areaName,
                treeType: item.areaType
              }
              aryList.push(obj)
            })
            if (this.app.rolesInfo.roleName === 'COUNTY_MANAGER') {
              this.areaList = aryList
              return
            }
            if (
              this.app.rolesInfo.roleName === 'SUPER_MANAGER' ||
                            this.app.rolesInfo.roleName ===
                                'PROVINCE_MANAGER' ||
                            this.app.rolesInfo.roleName === 'CITY_MANAGER'
            ) {
              this.stateList = aryList
            }
          }
        })
      }
      // this.searchData();
    },
    initArea (treeId, treeType) {
      if (treeId === '520000' && treeType === 1) {
        this.areaList = []
        return
      }
      api[urlNames.getTreeList]({
        treeId,
        treeType
      }).then((res) => {
        if (res.data) {
          this.areaList = res.data
        }
      })
    },
    unitTypeChange () {
      this.searchData()
    },
    stateChange (data) {
      this.areaParams = {}
      this.areaList = []
      this.stateId = data.treeId
      this.treeType = data.treeType
      this.initArea(this.stateId, this.treeType)
    },
    areaChange (val) {},
    applyChange (val) {
      this.unitType = 2
      // if (this.app.rolesInfo.roleName !== "COUNTY_MANAGER") {
      //     this.areaList = [];
      // }
      // this.stateParams = {};
      // this.areaParams = {};
      this.systemId = val
      // if (this.systemId === 5 || this.systemId === 6) {
      //     this.initializeEaraMounth();
      // } else {
      //     this.initializeDate();
      // }
      this.searchData()
    },
    searchData () {
      this.page.current = 1
      const authList = this.app.rolesInfo.authorizedOid
      let str = ''
      let codeNum = ''
      if (authList && authList.length > 0) {
        authList.forEach((item) => {
          str += item + ','
        })
        codeNum = str.substring(0, str.length - 1)
      }
      const data = {
        isStat: this.unitType === 0 ? 1 : '',
        notStat: this.unitType === 1 ? 1 : '',
        cityNum:
                    this.stateParams.treeId === '520000'
                      ? ''
                      : this.stateParams.treeId || '',
        codeNum:
                    this.stateParams.treeId === '520000'
                      ? 0
                      : this.stateParams.treeId ||
                          this.app.rolesInfo.roleName === 'COUNTY_MANAGER'
                        ? ''
                        : this.app.rolesInfo.roleName === 'CITY_MANAGER'
                          ? codeNum
                          : 520000,
        qxNum: this.areaParams.treeId
          ? this.areaParams.treeId
          : this.app.rolesInfo.roleName === 'COUNTY_MANAGER'
            ? codeNum
            : '',
        startDate: this.startDate,
        endDate: this.endDate
      }
      if (this.systemId === 5) {
        data.startDate = this.$moment(this.startDate1).format(
          'YYYY-MM'
        )
        data.endDate = ''
        // data.endDate = this.$moment(this.endDate).format("YYYY-MM");
      }
      if (this.systemId === 6) {
        data.startDate = this.startDate1
        data.endDate = ''
        // data.endDate = this.endDate1;
        // data.format1 = this.formatParams.format1;
        // data.format2 = this.formatParams.format2;
        // data.startDay = this.formatParams.format3;
        // data.size = this.formatParams.format4;
      }
      this.initSystem('area', this.doSrcParams(data))
    },
    resetData () {
      // this.applyChange(this.systemId);
      this.unitType = 2
      if (this.app.rolesInfo.roleName !== 'COUNTY_MANAGER') {
        this.areaList = []
      }
      this.stateParams = {}
      this.areaParams = {}
      if (this.systemId !== 5 && this.systemId !== 6) {
        this.initializeDate()
      } else {
        this.initializeEaraMounth()
      }
      this.searchData()
    }
  },
  watch: {
    autoParams: {
      deep: true, // 深度监听设置为 true
      handler: function (newV, oldV) {
        this.page.total = newV.total
        document.getElementById('areaFrame').style.height =
                    newV.chartHeight + 'px'
        document.getElementById('areaTableFrame').style.height =
                    newV.tableHeight + 'px'
        console.log('watch中：', newV)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
