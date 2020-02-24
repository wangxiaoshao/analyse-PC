<template>
  <div class="notice">
    <div class="notice-header">
      <span style="padding-left: 12px;">通知</span>
      <i class="el-icon-close"  @click="closeNotice"></i>
    </div>
    <div class="notice-content">
      <el-table :show-header="false"  :data='tableData'>
          <el-table-column>
            <template slot-scope="scope">
              <div class="notice-info">
                <el-badge :is-dot='scope.row.hasRead===0'>{{scope.row.typeText}}</el-badge>
                <div class="notice-msg">
                  <span>你有一条待审核的事件待处理，请尽快前往审核。</span>
                </div>
                <p>{{scope.row.creareTime}}</p>
                <span class="btn"><el-button type='primary' size="mini" 
                :style="scope.row.hasRead===1?'background-color:#d8d7d7;border-color:#d8d7d7':''" 
                 @click="doFindNotice(scope.row)">{{scope.row.hasRead===1?'已查看':'去查看'}}</el-button></span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      <div class="nitoce-footer">
        <a href="javascript:void(0)"  @click="goAllRead">全部标记为已读</a>
        <a href="javascript:void(0)" @click="goNotification">查看更多通知<i class="el-icon-d-arrow-right"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  data () {
    return {
      tableData:[
        {
          id:2,
          content:'22',
          typeText:"消息确认通知",
          creareTime:'2020-2-24 14:19:20',
          hasRead:0
        },
        {
          id:1,
          content:'11',
          typeText:"审核通知",
          creareTime:'2020-2-24 14:19:20',
          hasRead:1
        }
        ]
    }
  },
  methods: {
    closeNotice () {
      this.$emit('closeNotice', false)
    },
    goNotification () {
      this.closeNotice()
      this.$router.push('/notification')
    },
    doFindNotice(val){
      this.closeNotice()
      if(val.typeText==='消息确认通知'){
          this.$router.push('/confirm-info')
      }else{
         this.$router.push('/wait-approval')
      }
    },
    goAllRead(){

    }
  }
}
</script>
<style lang="less">
  @import "./index";
  .el-button--primary {
    color: #FFF;
    background-color: #FC7049;
    border-color: #FC7049;
}
.colorB {
    color: #FFF;
    background-color: #888;
    // border-color: #888;
}
</style>
