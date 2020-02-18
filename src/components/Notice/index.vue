<template>
  <div class="notice">
    <div class="notice-header">
      <span style="padding-left: 12px;">通知</span>
      <i class="el-icon-close"  @click="closeNotice"></i>
    </div>
    <div class="notice-content">
      <div class="notice-info">
        <el-badge is-dot>待处理通知</el-badge>
        <div class="notice-msg">
          <span>你有一条待审核的事件待处理，请尽快前往审核。</span>
           <span><el-button type='primary' size="mini">去处理</el-button></span>
        </div>
        <p>2020-02-12</p>
      </div>
      <div class="notice-info">
        <el-badge :is-dot='false'>单位信息确认</el-badge>
        <div class="notice-msg">
          <span>你有一条待审核的事件待处理，请尽快前往审核。</span>
           <span><el-button type='primary' size="mini">去处理</el-button></span>
        </div>
        <p>2020-02-12</p>
      </div>
      <div class="nitoce-footer">
        <a href="javascript:void(0)">全部标记为已读</a>
        <a href="javascript:void(0)" @click="goNotification">查看更多通知<i class="el-icon-d-arrow-right"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    closeNotice () {
      this.$emit('closeNotice', false)
    },
    goNotification () {
      this.closeNotice()
      this.$router.push('/notification')
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>
