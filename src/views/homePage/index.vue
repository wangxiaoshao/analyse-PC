<template>
  <div  class="homePage">
     <div class="homeContent" v-if="hasRight('viewBasicInformation')">
      <div  class="userInfo">
        <div class="noticeInfo">
          <span class="userImg">
            <i class="el-icon-user"></i>
          </span>
          <div>
            <p>{{userIdentityInfo.userName}}</p>
            <p>欢迎您，您是今天第{{loginNumber}}个登录用户！</p>
          </div>
        </div>
        <div class="noticeInfo">
          <ul>
            <li>
              <span>所属单位</span>
              <span>|</span>
            <span>{{userIdentityInfo.organizationName||'无'}}</span></li>
            <li><span>职位</span>
            <span>|</span>
            <span>{{userIdentityInfo.dutyName||'无'}}</span></li>
            <li><span>身份类型</span>
            <span>|</span>
            <span>{{ userIdentityInfo.type&&userIdentityInfo.type!==null&&userIdentityInfo.type!==''? filterType(userIdentityInfo.type):'无'}}</span>
            </li>
          </ul>
          <div  @click="goPersonalPage">完善信息</div>
        </div>
      </div>
    </div>
     <div class="homeContent" v-if="hasRight('viewCommissionMatters')">
      <div class="header-title">待办事项</div>
      <div  class="notice">
        <div class="noticeInfo" v-for="(itemList,index) in doNoticeList" :key="index">
          <p v-for="val in itemList" :key="val.id"  @click="doFindNotice(val)">
            <el-row>
              <el-col :span="16"> <span class="msg" :title="val.typeText">{{val.content}}</span></el-col>
              <el-col :span="8"> <span class="date">{{val.createTime}}</span></el-col>
            </el-row>
          </p>
        </div>
        <a href="javaScript:void(0)"  @click="goMoreNotice">查看更多待办事项
             <i class="el-icon-d-arrow-right"></i></a>
      </div>
    </div>
    <div class="homeContent" v-if="hasRight('viewPlatformAnnouncement')">
      <div class="header-title">平台公告</div>
      <div  class="notice">
        <div class="noticeInfo" v-for="(itemList,index) in doAnnouncementList" :key="index">
          <p v-for="val in itemList" :key="val.id"  @click="goFindAnnountDetial(val)">
            <el-row>
              <el-col :span="16"> <span class="msg" :title="val.typeText">{{val.content}}</span></el-col>
              <el-col :span="8"> <span class="date">{{val.creareTime}}</span></el-col>
            </el-row>
          </p>
        </div>
         <a href="javaScript:void(0)" @click="goMoreAnnounts">查看更多公告
             <i class="el-icon-d-arrow-right"></i></a>
      </div>
    </div>
    <div class="homeContent" v-if="hasRight('viewYesterdayData')">
      <div class="header-title">昨日数据
        <span style="color:#999;font-size:12px;margin-left:5px">更新于{{dataStr}}</span></div>
      <div class="info-box">
        <div class="detailInfo">
          <p>组织机构注册总人数</p>
          <p>{{countData.userCount}}</p>
          <ul>
            <li>日<a href="">0% <i class="el-icon-top"></i></a></li>
            <li>周<a href="">10% <i class="el-icon-top"></i></a></li>
            <li>月<a href="">30% <i class="el-icon-top"></i></a></li>
          </ul>
        </div>
        <div class="detailInfo">
          <p>单位总数</p>
          <p>{{countData.organCount}}</p>
          <ul>
            <li>日<a href="">1% <i class="el-icon-top"></i></a></li>
            <li>周<a href="">5% <i class="el-icon-top"></i></a></li>
            <li>月<a href="">10% <i class="el-icon-top"></i></a></li>
          </ul>
        </div>
        <div class="detailInfo">
          <p>内设机构总数</p>
          <p>{{countData.deptCount}}</p>
          <ul>
            <li>日<a href="">0% <i class="el-icon-top"></i></a></li>
            <li>周<a href="">3% <i class="el-icon-top"></i></a></li>
            <li>月<a href="">5% <i class="el-icon-top"></i></a></li>
          </ul>
        </div>
        <div class="detailInfo">
          <p>人员变动数</p>
          <p>{{countData.userChangedCount}}</p>
          <ul>
            <li>日<a href="">0% <i class="el-icon-top"></i></a></li>
            <li>周<a href="">3% <i class="el-icon-top"></i></a></li>
            <li>月<a href="">5% <i class="el-icon-top"></i></a></li>
          </ul>
        </div>
        <div class="detailInfo">
          <p>接入应用总数</p>
          <p>{{applyCount}}</p>
          <ul>
            <li>日<a href="">0% <i class="el-icon-top"></i></a></li>
            <li>周<a href="">0% <i class="el-icon-top"></i></a></li>
            <li>月<a href="">0% <i class="el-icon-top"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <el-button type="primary" @click="configDialogVisible = true" class="config-button">配置</el-button>

    <el-dialog title="首页显示项配置"
                align="left"
                :fullscreen="false"
                :visible.sync="configDialogVisible"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :show-close="true"
                width="50">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-table
            :data="homepageConfig"
            stripe
            style="width: 100%">
            <el-table-column
              prop="name">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isChecked"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row :gutter="20" :style="{marginTop: '20px'}">
        <el-col :span="12" :offset="6">
          <el-button
            type="primary"
            @click="saveHomepageConfig" v-show="hasRight('homepageConfig')">保存</el-button>
          <el-button @click="configDialogVisible = false" :style="{marginLeft: '60px'}">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog> -->
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
import { mapState } from 'vuex'
import hasRight from '@src/mixins/has-right'
import dicOption from '@src/mixins/dic-options.js'

export default {
  mixins: [dicOption, hasRight],
  data () {
    return {
      userIdentityInfo: {
        userName: '',
        id: '',
        type: null,
        uid: '',
        departmentId: '',
        orgId: '-',
        dutyName: '',
        postName: '',
        organizationName: '',
        departmentName: ''
      },
      // 待办事项列表
      noticeList: [
        {
          id: 1,
          content: '22消息确认通知消息确认通知消息确认通知息确认通知消息确认通知消息确认通22消息确认通知消息确认通知消息确认通知息确认通知消息确认通知消息确认通',
          typeText: '消息确认通知',
          creareTime: '2020-2-24 14:19:20',
          hasRead: 0
        },
        {
          id: 2,
          content: '11',
          typeText: '审核通知',
          creareTime: '2020-1-20 14:19:20',
          hasRead: 1
        },
        {
          id: 3,
          content: '11',
          typeText: '审核通知',
          creareTime: '2020-2-24 14:19:20',
          hasRead: 0
        },
        {
          id: 4,
          content: '13',
          typeText: '审核通知',
          creareTime: '2020-2-24 14:19:20',
          hasRead: 0
        }
      ],
      // 处理待办事项列表
      doNoticeList: [],
      // 平台公告列表
      announcementList: [
        {
          id: 1,
          content: '为推进改造，系统密码强度优化通知。',
          typeText: '消息确认通知',
          creareTime: '2020-03-15 20:07:17',
          hasRead: 0
        },
        {
          id: 2,
          content: '组织机构添加单位时，单位地址信息为必填相关通知。',
          typeText: '审核通知',
          creareTime: '2020-03-01 20:07:17',
          hasRead: 1
        },
        {
          id: 3,
          content: '2020年春节期间系统运维时间调整公告！',
          typeText: '审核通知',
          creareTime: '2020-02-26 20:07:17',
          hasRead: 0
        },
        {
          id: 4,
          content: '2020年春节系统更新及版本V1.0.1公告！',
          typeText: '审核通知',
          creareTime: '2020-02-15 20:07:17',
          hasRead: 0
        }
      ],
      // 处理平台公告列表
      doAnnouncementList: [],
      dataStr: '',
      // 详细数据
      countData: {
        userCount: null,
        deptCount: null,
        organCount: null,
        userChangedCount:null
      },
      loginNumber: 0,
      applyCount: null,
      // 人员变动数
      changeAccount: null,

      configDialogVisible: false,
      homepageConfig: [
        {
          name: '基本信息',
          isChecked: true
        },
        {
          name: '待办事项',
          isChecked: false
        },
        {
          name: '平台公告',
          isChecked: true
        },
        {
          name: '昨日数据',
          isChecked: true
        }
      ]
    }
  },
  created () {
    this.getUserIdentityInfo()
    this.getAccountData()
    this.getNoticeList()
    // 获取接应用总数
    api[urlNames['findApplicationCount']]().then((res) => {
      this.applyCount = res.data[0]
    })
  },
  mounted () {
    this.userIdentityInfo.userName = this.app.option.user.name
    this.getLoginIndex()
    this.doArray()
  },
  methods: {
    // 获取第几个用户
    getLoginIndex () {
      // {dataString:'2020-03-15'}
      api[urlNames['loginIndex']]().then(
        res => {
          this.loginNumber = res.data
        }
      )
    },
    // 获取用户身份信息
    getUserIdentityInfo () {
      api[urlNames['findIdentityById']]({
        identityId: this.app.option.user.identityId
      }).then(
        res => {
          Object.assign(this.userIdentityInfo, res.data)
        },
        () => {
          /* this.$message.error(`没有内容`) */
        }
      )
    },

    // 获取待办事项
    getNoticeList () {
      let data = {
        page: 1,
        limit: 6
      }
      api[urlNames['notificationList']](data).then((res) => {
        this.noticeList = res.data
        this.doNoticeList.push(this.noticeList.slice(0, 3), this.noticeList.slice(3))
      })
    },

    // 获取昨日数据
    // getStatistiscCount
    getAccountData () {
      api[urlNames['getStatistiscCount']]().then((res) => {
        this.countData = res.data
      })
    },

    // 待办事项点击查看
    doFindNotice (val) {
      if (val.typeText === '消息确认通知') {
        this.$router.push('/confirm-info')
      } else {
        this.$router.push('/wait-approval')
      }
    },
    goFindAnnountDetial (val) {
      this.$router.push({
        path: '/announceDetail',
        query: {
          id: val.id
        }
      })
    },

    doArray () {
      this.dataStr = new Date().getFullYear() + '年' + (new Date().getMonth() + 1) + '月' + new Date().getDate() + '日'
      this.doAnnouncementList.push(this.announcementList.slice(0, 3), this.announcementList.slice(3))
    },
    filterType (val) {
      let typeList = this.userTypeOptions.filter(item => item.value === val)
      return typeList[0].text
    },
  

    goPersonalPage () {
      this.$router.push('/pass-change')
    },
    goMoreNotice () {
      this.$router.push('/notification')
    },
    goMoreAnnounts () {
      this.$router.push('/moreAnnoument')
    }/* ,
    // 保存首页配置
    saveHomepageConfig () {} */
  },
  computed: {
    ...mapState(['app'])
  }
}
</script>
<style lang="less" scoped>
@import 'index.less';
</style>
