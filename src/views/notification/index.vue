<template>
  <div class="notification">
    <div class="notice-info">
      <el-badge is-dot>修改单位名称的审核结果</el-badge>
      <div class="notice-msg">
        <span>你申请原单位“贵州省信息中心”修改为“贵州省新信息中心已审核通过”。</span>
          <span><el-button type='primary' size="mini">去处理</el-button></span>
      </div>
    </div>
    <div class="notice-info">
      <el-badge is-dot>修改单位名称的审核结果</el-badge>
      <div class="notice-msg">
        <span>你申请原单位“贵州省信息中心”修改为“贵州省新信息中心已审核通过”。</span>
          <span><el-button type='primary' size="mini">去处理</el-button></span>
      </div>
    </div>

      <!-- <div class="empty" v-if="page.total===0">
        <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
        <p><span style="padding-left: 8px">暂无数据！</span></p>
      </div> -->
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
export default {
  name: 'notification',
  mixins: [handleTable],
  data () {
    return {

    }
  },
  methods: {
    getGrid () {
      let data = {
        page: this.page.current,
        limit: this.page.limit
      }
      this.loading = true
    //   api[urlNames['findViewNodeList']](data).then((res) => {
    //     this.loading = false
    //     this.list = res.data
    //     this.contentPage.total = res.total
    //   }, () => {
    //     this.loading = false
    //     this.list = []
    //     this.contentPage.total = 0
    //   })
    // },
    }

  }
}

</script>
<style lang="less">
  @import "./index";
</style>

