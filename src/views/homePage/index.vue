<template>
  <div  class="homePage">
     <div class="homeContent">
      <div  class="userInfo">
        <div class="noticeInfo">
          <span class="userImg">
            <i class="el-icon-user"></i>
          </span>
          <div>
            <p>系统管理员</p>
            <p>欢迎您，您是今天第2345个用户！</p>
          </div>
        </div>
        <div class="noticeInfo">
          <ul>
            <li>
              <span>所属单位</span>
              <span>|</span>
            <span>贵州省信息中心</span></li>
            <li><span>职位</span>
            <span>|</span>
            <span>处长</span></li>
            <li><span>身份类型</span>
            <span>|</span>
            <span>兼职</span></li>
          </ul>
          <div  @click="goPersonalPage">完善信息</div>
        </div>
      </div>
    </div>
     <div class="homeContent">
      <div class="header-title">代办事项</div>
      <div  class="notice">
        <div class="noticeInfo">
          <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
          <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
           <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>

        </div>
        <div class="noticeInfo">
          <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
          <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
           <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
         <a href="javaScript:void(0)" @click="goMoreNotice">查看更多待办事项
           <i class="el-icon-d-arrow-right"></i>
         </a>
        </div>
      </div>
    </div>
    <div class="homeContent">
      <div class="header-title">平台公告</div>
      <div  class="notice">
        <div class="noticeInfo">
          <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
          <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
           <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>

        </div>
        <div class="noticeInfo">
          <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
          <p>
            <span class="msg">春节期间修改修改字段审核通知</span>
            <span class="date">2020年1月20日</span>
          </p>
           <a href="javaScript:void(0)">查看更多公告
             <i class="el-icon-d-arrow-right"></i></a>
        </div>
      </div>
    </div>
    <div class="homeContent">
      <div class="header-title">昨日数据  <span style="color:#999;font-size:12px;margin-left:5px">更新至2020年1月20日</span></div>
      <div class="info-box">
        <div class="detailInfo">
          <p>登录人数</p>
          <p>2000</p>
          <ul>
            <li>日<a href="">20% <i class="el-icon-bottom"></i></a></li>
            <li>周<a href="">20% <i class="el-icon-bottom"></i></a></li>
            <li>月<a href="">20% <i class="el-icon-bottom"></i></a></li>
          </ul>
        </div>
        <div class="detailInfo"></div>
        <div class="detailInfo"></div>
        <div class="detailInfo"></div>
      </div>
    </div>
    <div class="homeContent">
      <div class="header-title">数据来源概况</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    goPersonalPage(){
      this.$router.push('/pass-change')
    },
    goMoreNotice(){
       this.$router.push('/notification')
    }
  }
}
</script>
<style lang="less" scoped>
@import 'index.less';
</style>