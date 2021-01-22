<template>
    <div class="moreAnnoument">
        <el-table :show-header="false" :data="tableData">
            <template slot="empty">
                <div class="empty">
                    <p>
                        <img
                            class="data-pic"
                            src="@src/common/images/no-data1.png"
                            alt=""
                        />
                    </p>
                    <p><span style="padding-left: 8px;">暂无数据</span></p>
                </div>
            </template>
            <el-table-column>
                <template slot-scope="scope">
                    <div
                        class="notice-info"
                        @click="goFindAnnountDetial(scope.row.id)"
                    >
                        <span>{{ scope.row.title }}</span>
                        <!-- <div class="notice-msg">
                            <span>{{ scope.row.content }}</span>
                        </div> -->
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
import { mapState, mapMutations } from 'vuex'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable],
  data () {
    return {
      tableData: [
        {
          title: '为推进改造，系统登录密码深度优化通知。',
          content:
                        '为推进改造，系统登录密码深度优化通知,为推进改造，系统登录密码深度优化通知。',
          creareTime: '2020-03-12',
          id: 1,
          url: ''
        }
      ]
    }
  },
  mounted () {
    this.page.total = 1
    this.app.noticeShowBtn = true
    this.SET_BREADCRUMB([{ name: '平台公告' }])
    this.getGird()
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    ...mapMutations(['SET_BREADCRUMB']),
    getGird () {
      const data = {
        page: this.page.current,
        pageSize: this.page.limit
      }
      api[urlNames.getSystemNoticeList](data).then((res) => {
        if (res) {
          this.tableData = res.data
        }
      })
    },
    goFindAnnountDetial (id) {
      this.$router.push({
        path: '/moreAnnoument/announceDetail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index";
</style>
