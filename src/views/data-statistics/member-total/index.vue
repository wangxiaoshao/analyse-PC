<template>
    <div class="member-total">
        <el-form label-position="right" inline>
            <el-form-item label="选择人员：">
                <el-input
                    @focus="openSelectDailog"
                    placeholder="请选择人员"
                    v-model="memberName"
                    readonly
                    style="width: 130px; margin: 0px 10px;"
                ></el-input>
            </el-form-item>
            <el-form-item label="日期：">
                <!-- <span>日期：</span> -->
                <el-date-picker
                    v-model="searchDate"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="dateChange"
                    @blur="onDateBlur"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="system-list">
            <transition-group tag="ul" appear>
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
                    v-for="item in appList"
                    :key="item.id"
                    :class="{
                        isActive: systemId == item.id,
                    }"
                    @click="applyChange(item.id)"
                >
                    {{ item.systemName }}
                </li>
            </transition-group>
        </div>
        <div class="system-data">
            <div class="chart-box">
                <iframe
                 v-if="srcUrl"
                    :src="srcUrl"
                    id="memberFrame"
                    frameborder="0"
                    scrolling="no"
                    ref="iframe"
                ></iframe>
                <div class="no-data" v-else>
                  <img
                      src="@src/common/images/no-data1.png"
                      alt=""
                  />
                  <div class="no-text">
                      暂无数据！
                  </div>
              </div>
            </div>
        </div>
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeSelectDailog"
        ></select-tree>
    </div>
</template>
<script>
import SelectTree from '@src/components/SelectTree/index'
import dataStatistics from '@src/mixins/data-statistics'
import { mapState } from 'vuex'
import applicationList from '@src/mixins/apply'
export default {
  mixins: [dataStatistics, applicationList],
  components: {
    SelectTree
  },
  data () {
    return {
      memberName: this.$store.state.app.rolesInfo.userName,
      appList: [],
      systemId: -1,
      userId: this.$store.state.app.rolesInfo.uid,
      orgId: this.$store.state.app.rolesInfo.orgId,
      deptId: this.$store.state.app.rolesInfo.deptId
        ? this.$store.state.app.rolesInfo.deptId
        : '',
      selectTreeDailog: {
        title: '选择人员',
        openSelectTreeVisiable: false,
        isSelectType: 3, // 1 区县  2  单位  3 人员 4 市州
        isSingSelect: true // 是否单选,true 单选，false:多选
      }
    }
  },
  created () {
    this.doApplyList()
    this.pickDateOptionRules()
    this.initializeDate()
  },
  mounted () {
    this.searchData()
    this.initMemberHeight()
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    initMemberHeight () {
      const that = this
      const memberFrame = document.getElementById('memberFrame')
      if (!memberFrame) {
        return false
      }
      memberFrame.onload = function () {
        that.dataAry = []
        window.addEventListener(
          'message',
          function (e) {
            if (e.data.height) {
              memberFrame.style.height = e.data.height + 'px'
            } else {
              memberFrame.style.height = '500px'
            }
            // console.log(e.data, "memberFrame");
          },

          false
        )
      }
    },
    dateChange (val) {
      if (val) {
        this.startDate = val[0]
        this.endDate = val[1]
      }
    },
    doApplyList () {
      const appList = [...this.applicationList]
      appList.map((item, index) => {
        if (item.id === 1 || item.id === 5) {
          appList.splice(index, 1)
        }
        return true
      })
      this.appList = appList
    },
    openSelectDailog () {
      this.selectTreeDailog.openSelectTreeVisiable = true
    },
    closeSelectDailog () {
      this.selectTreeDailog.openSelectTreeVisiable = false
    },
    dialogReturnData (userData, authData) {
      authData = authData || []
      const dataAry = [...userData, ...authData]
      this.memberName = dataAry[0].treeName
      this.userId = dataAry[0].treeId
      this.orgId = ''
      this.deptId = ''
    },
    applyChange (val) {
      const memberFrame = document.getElementById('memberFrame')
      if (memberFrame) {
        memberFrame.style.height = '500px'
      }

      this.systemId = val
      this.searchData()
    },
    searchData () {
      const data = {
        userId: this.userId,
        startDate: this.startDate,
        endDate: this.endDate,
        orgId: this.orgId,
        deptId: this.deptId
      }
      this.initSystem('person', this.doSrcParams(data))
    }
  },
  watch: {
    applicationList () {
      this.doApplyList()
    }
  }
}
</script>
<style lang="less" scoped>
@import "../area-total/index.less";
#memberFrame {
    width: 100%;
    height: 480px;
    overflow: hidden;
}
.system-data{
  .chart-box{
    .no-data{
      width:100%;
      height: 200px;
     border: 1px solid #d9dee9;
     border-radius: 4px;
      text-align: center;
      img{
        width: 100px;
        margin-top: 55px;
      }

    }
  }
}
</style>
