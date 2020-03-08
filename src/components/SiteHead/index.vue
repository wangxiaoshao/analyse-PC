<template>
  <div>
    <div class="site__head">
      <div class="site__head-content">
        <div class="site__head--center">
          <div class="logo">
            <img :src="app.option.options.systemLogo" />
          </div>
          <div class="name">
            <h2>{{app.option.options.systemName || ''}}</h2>
          </div>
        </div>
        <div class="site__head--right">
          <div style="display:inline-block;" @click="showNotice">
            <el-badge :value="msgNum" class="item" title="查看通知" style=" cursor: pointer;">
              <i class="el-icon-bell"></i>
            </el-badge>
          </div>
          <i class="ico fa fa-file-text-o"></i>
          <a style="cursor: pointer" @click="goToWordCenter" href="javascript:void(0)">数据文档</a>
          <!--          <i class="ico fa fa-phone"></i>-->
          <!--          <a href="">联系我们</a>-->
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              当前身份：{{defaultName}}
              <i class="el-icon-caret-bottom"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                @click.native="changeSessionUser(item.userId,item.uid)"
                v-for="(item, index) in userList"
                :key="index"
              >{{item.orgName}} {{item.dutyName}} {{item.typeName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="margin:0 4px;">欢迎您!</span>
          <span>{{app.option.user.name || ''}}</span>

          <a
            style="cursor: pointer"
            class="ico fa fa-sign-in"
            title="退出登录"
            target="_self"
            :href="logoutURL"
          ></a>
        </div>
      </div>
      <div class="notice-box" v-if="showNoticeDilog">
        <notice
          @closeNotice="showNotice"
          :noticeData="noticeData"
          @goAllRead="goAllRead"
          :showAllReadVisiable="showAllReadVisiable"
        ></notice>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
/**
 * Created by lxe on 2019-09-18.
 */
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import Notice from '@src/components/Notice'
export default {
  name: 'Head',
  components: { Notice },
  props: ['breadcrumb', 'pageBreadcrumb'],
  data() {
    return {
      logoutURL: '',
      url: window.location.host,
      noticeData: [],
      showNoticeDilog: false,
      showAllReadVisiable: false,
      msgNum: null,
      userList: [], // 用户身份列表
      defaultName: '' // 默认身份
    }
  },
  computed: {
    ...mapState(['app'])
  },
  created() {
    this.logoutURL = '/api/gate/logout'
    this.getList()
    this.findSessionUserList()
  },
  methods: {
    goBack() {
      this.$emit('go-back')
    },
    // 消息通知
    getList() {
      api[urlNames['notificationIndex']]().then(res => {
        this.noticeData = res.data
        this.msgNum = res.total
        if (this.msgNum === 0) {
          this.msgNum=''
          this.showAllReadVisiable = false
          this.showNoticeDilog = false
        } else {
          this.showAllReadVisiable = true
          this.showNoticeDilog = true
        }
      })
    },
    showNotice() {
      this.showNoticeDilog = !this.showNoticeDilog
    },
    // 标记全部已读
    goAllRead() {
      api[urlNames['notificationRead']]().then(res => {
        if (res) {
          this.showNoticeDilog = false
          this.showAllReadVisiable = false
          this.msgNum = 0
          this.noticeData = []
        }
      })
    },

    // 获取用户身份列表
    findSessionUserList() {
      api[urlNames['findSessionUserList']]().then(res => {
        this.userList = res.data.userIdVos
        this.userList.forEach(item => {
          if (item.userId === res.data.id) {
            this.defaultName =
              item.orgName + ' ' + item.dutyName + ' ' + item.typeName
          }
        })
      })
    },
    // 切换用户身份
    changeSessionUser(id) {
      api[urlNames['changeSessionUserId']]({
        userId: id
      }).then(res => {
        window.setTimeout(() => {
          this.$router.go(0) // 刷新页面
          this.message.success('切换成功')
        }, 500)
      })
    },
    goToWordCenter() {
      if (this.$route.name !== 'WordCenter') {
        this.$router.push('/word-center')
      }
    },
    showNotice() {
      this.showNoticeDilog = !this.showNoticeDilog
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('Logout').then(() => {
          this.$router.push({
            path: '/login'
          })
        })
      }
    }
  }
}
</script>
<style lang="less">
@import './index';
</style>

