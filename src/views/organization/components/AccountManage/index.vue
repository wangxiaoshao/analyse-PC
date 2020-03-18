<template>
  <div class="account-manage">
    <div class="set-default" v-if="accountList.length > 0">
      <div class="default-warn"><i class="el-icon-warning"></i>默认帐号用于您一个帐号全站都能使用，若遇到不能使用的业务系统，请切换身份类型即可。</div>
      设置默认帐号
      <el-select
        v-model="accountSelect"
        @change="getDefaultAccount"
        :disabled="disabledFlag"
        class="account-select"
        placeholder="请选择">
        <el-option
          v-for="item in accountList"
          :key="item.id"
          :label="item.name"
          :value="item.defaultAccount">
        </el-option>
      </el-select>
    </div>
    <el-collapse v-model="activeAccount" accordion class="account-list">
      <el-collapse-item v-for="(item,index) in accountList" :key="item.id" :title="item.name + ' ' + userInfo.name">
          <!-- <bind-system :user-account="userAccount" @get-app="getAppId"></bind-system> -->
          <bind-system :list="item.account4AppDtos || []" :sysIndex='index'  @app-change="getAppId"></bind-system>
      </el-collapse-item>
    </el-collapse>
    <div class="creat-account-content" v-if="this.$route.name === 'PersonAdd' || this.$route.name === 'PersonEdit'">
      <el-button class="creat-btn" v-show="!disabledFlag" @click="creatAccount">
       <!-- <i class="el-icon-plus el-icon&#45;&#45;left">创建账号</i>-->
        创建账号
      </el-button>
      <el-form label-width="100px" :model="addAccount"  ref="addAccount" v-if="!addFlag">
        <input type="password" class="hideIpt" />
        <input type="text" class="hideIpt"/>
        <el-form-item label="登录帐号" prop="name">
          <el-input v-model="addAccount.name"></el-input>
        </el-form-item>
        <el-form-item label="登录别名" prop="nickName">
          <el-input v-model="addAccount.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addAccount.password" show-password></el-input>
        </el-form-item>
         <el-form-item label="关联系统">
         <bind-system :list="[]" :isCreate="true" @app-change="getAppId"></bind-system>
        </el-form-item>
        <el-form-item label="是否启用" prop="removed">
          <el-switch v-model="addAccount.removed"></el-switch>
        </el-form-item>
        <el-form-item label="申请原因" prop="reason">
          <el-input type="textarea" v-model="addAccount.reason"></el-input>
        </el-form-item>
      </el-form>
    </div>
      <el-footer class="add-person-footer">
        <span v-if="this.$route.name === 'PersonAdd' || this.$route.name === 'PersonEdit'">
        <el-button type="primary" @click="lastStep" :disabled="false">上一步</el-button>
        <el-button type="primary" @click="fromSublime">保存</el-button>
        <el-button @click="goBack">取消</el-button>
        </span>
      </el-footer>
  </div>
</template>

<script>
import bindSystem from '../BindSystem/index'
export default {
  components: { bindSystem },
  props: ['disabledFlag', 'isShowEditFlag', 'accountList', 'userInfo', 'isDefaultFlag', 'userAccount', 'isExit'],
  data () {
    return {
      addAccount: {
        password: '',
        removed: true,
        appId: [],
        name: '',
        nickName: '',
        id: '',
        defaultAccount: null,
        reason: ''
      },
      oldFrom: {},
      // addFlag: this.isDefaultFlag,
      addFlag: true,
      activeAccount: '1',
      tags: [], // 提交的标签
      options: [],
      accountSend: [],
      accountSelect: '',
      doIndex: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let that = this
      this.oldFrom = JSON.parse(JSON.stringify(this.addAccount))
      this.accountList.forEach(function (item) {
        that.accountSend.push(item)
      })
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    creatAccount () {
      this.addFlag=!this.addFlag 
    },
    getDefaultAccount (val) {
      this.accountList.forEach((item) => {
        if (item.id === val.value) {
          let obj = {
            id: item.id,
            defaultAccount: 1,
            password: item.password,
            removed: item.removed,
            appId: item.appId,
            name: item.name,
            reason: ''
          }
          this.accountSend.push(obj)
        } else {
          this.accountSend.push(item)
        }
      })
    },
    fromSublime () {
      let accountObj = {
        password: this.addAccount.password,
        removed: this.addAccount.removed ? 0 : 1,
        appId: this.addAccount.appId,
        name: this.addAccount.name,
        nickName: this.addAccount.nickName,
        id: '',
        defaultAccount: null,
        reason: this.addAccount.reason
      }
      let that = this
      let state = true
      if (this.addAccount.name !== this.oldFrom.name && this.addAccount.password !== this.oldFrom.password) {
        that.accountSend.forEach(function (item, index) {
          if (accountObj.name === item.name) {
            state = false
            that.$message.error('该用户名已存在，请重新设置')
          }
        })
        if (!this.isExit) {
          that.accountSend.pop()
        }
        if (state) {
          that.accountSend.push(accountObj)
          this.$emit('get-account', this.accountSend)
        }
      }
      // console.log(' accountObj:', accountObj)
      if (this.doIndex || this.doIndex === 0) {
        this.accountSend[this.doIndex].appId = this.addAccount.appId
        this.$emit('get-account', this.accountSend)
      }
      if (accountObj.name === '') {
        this.$emit('get-account', this.accountSend)
      }
    },
    lastStep () {
      this.$emit('get-back', true)
    },
    goBack () {
      this.$router.go(-1)
    },
    getAppId (val, index) {
      this.addAccount.appId = val
      this.doIndex = index
    }
  }
}
</script>

<style lang="less"  scoped>
  @import "index";
</style>
