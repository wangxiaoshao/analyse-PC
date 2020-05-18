<template>
  <div class="notification">
          <el-table :show-header="false"  :data='tableData' style="width:100%">
             <template slot="empty">
                <div class="empty">
                  <p><img class="data-pic" src="@src/common/images/no-data1.png" alt=""/></p>
                  <p><span style="padding-left: 8px;">暂无数据</span></p>
                </div>
              </template>
          <el-table-column>
            <template slot-scope="scope">
              <div class="notice-info">
                <el-badge :is-dot='scope.row.hasRead===0'>{{scope.row.typeText}}</el-badge>
                <div class="notice-msg">
                  {{scope.row.content}}
                </div>
                <p>{{scope.row.creareTime}}</p>
                <span class="btn"><el-button type='primary' size="mini"
                :style="scope.row.hasRead===1?'background-color:#d8d7d7;border-color:#d8d7d7':''"
                 @click="doFindNotice(scope.row)">{{scope.row.hasRead===1?'已查看':'去查看'}}</el-button></span>
              </div>
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
  </div>
</template>
<script>
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
export default {
  name: 'notification',
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getGrid()
    this.app.noticeShowBtn = true
    this.SET_BREADCRUMB([{ name: '通知中心' }])
  },
  mounted () {
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    ...mapMutations(['SET_BREADCRUMB', 'SET_PAGE_BREADCRUMB']),
    getGrid () {
      let data = {
        page: this.page.current,
        limit: this.page.limit
      }
      this.loading = true
      api[urlNames['notificationList']](data).then((res) => {
        this.loading = false
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.loading = false
        this.tableData = []
        this.page.total = 0
      })
    },
    doFindNotice (val) {
      if (val.type === 1) {
        // 待我审核  信息确认  我的申请
        this.$router.push('/wait-approval')
      } else if (val.type === 2) {
        this.$router.push('/confirm-info')
      } else if (val.type === 3) {
        this.$router.push('/my-application')
      }
    }
  },
  destroyed () {
    this.app.noticeShowBtn = false
  }
}

</script>
<style lang="less"  scoped>
  @import "./index";
</style>

