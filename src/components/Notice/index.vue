<template>
  <div class="notice">
    <div class="notice-header">
      <span style="padding-left: 12px;">通知</span>
      <i class="el-icon-close" @click="closeNotice"></i>
    </div>
    <div class="notice-content">
      <el-table :show-header="false" :data="noticeData">
        <!-- <template slot="empty">
          <div class="empty">
            <span style="padding-left: 8px">暂无通知消息！</span>
          </div>
        </template>-->
        <el-table-column>
          <template slot-scope="scope">
            <div class="notice-info">
              <el-badge :is-dot="scope.row.hasRead===0">{{scope.row.typeText}}</el-badge>
              <div class="notice-msg">
                <p :title="scope.row.content">{{scope.row.content}}</p>
              </div>
              <p>{{scope.row.createTime}}</p>
              <span class="btn">
                <el-button
                  type="primary"
                  size="mini"
                  :style="scope.row.hasRead===1?'background-color:#d8d7d7;border-color:#d8d7d7':''"
                  @click="doFindNotice(scope.row)"
                >{{scope.row.hasRead===1?'已查看':'去查看'}}</el-button>
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="nitoce-footer">
        <!-- v-if="showAllReadVisiable" -->
        <a href="javascript:void(0)" @click="goAllRead" v-if="showAllReadVisiable">全部标记为已读</a>
        <a href="javascript:void(0)" @click="goNotification" class="findMore">
          查看更多通知
          <i class="el-icon-d-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['noticeData', 'showAllReadVisiable'],
  data() {
    return {
      total: null,
      tableData: []
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    closeNotice() {
      this.$emit('closeNotice', false)
    },
    goNotification() {
      this.closeNotice()
      this.$router.push('/notification')
    },
    doFindNotice(val) {
      this.closeNotice()
      api[urlNames['notificationRead']]({ id: val.id }).then(res => {})
      if (val.typeText === '消息确认通知') {
        this.$router.push('/confirm-info')
      } else {
        this.$router.push('/wait-approval')
      }
    },
    goAllRead() {
      this.$emit('goAllRead')
    }
  }
}
</script>
<style lang="less">
@import './index';
.el-button--primary {
  color: #fff;
  background-color: #fc7049;
  border-color: #fc7049;
}
.colorB {
  color: #fff;
  background-color: #888;
  // border-color: #888;
}
</style>
