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
      <el-collapse-item v-for="item in accountList" :key="item.id" :title="item.name + ' ' + userInfo.name">
        <bind-system :user-account="userAccount" @get-app="getAppId"></bind-system>
      </el-collapse-item>
    </el-collapse>
    <div class="creat-account-content" v-if="this.$route.name === 'PersonAdd' || this.$route.name === 'PersonEdit'">
      <el-button class="creat-btn" v-show="!disabledFlag" @click="creatAccount">
       <!-- <i class="el-icon-plus el-icon&#45;&#45;left">创建账号</i>-->
        创建账号
      </el-button>
      <el-form label-width="100px" :model="addAccount" v-if="!addFlag">
        <el-form-item label="登录帐号" prop="name">
          <el-input v-model="addAccount.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addAccount.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="关联系统">
         <bind-system @get-app="getAppId"></bind-system>
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
  props: ['disabledFlag', 'isShowEditFlag', 'accountList', 'userInfo', 'isDefaultFlag', 'userAccount'],
  data () {
    return {
      addAccount: {
        password: '',
        removed: true,
        appId: [],
        name: '',
        id: '',
        defaultAccount: null,
        reason: ''
      },
      oldFrom: {},
      addFlag: this.isDefaultFlag,
      activeAccount: '1',
      tags: [], // 提交的标签
      options: [],
      accountSend: this.accountList,
      accountSelect: 1
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.oldFrom = JSON.parse(JSON.stringify(this.addAccount))
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    creatAccount () {
      if (this.addFlag === true) {
        this.addFlag = false
      } else {
        this.addFlag = true
      }
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
        id: '',
        defaultAccount: null,
        reason: this.addAccount.reason
      }
      if (this.addAccount.name !== this.oldFrom.name && this.addAccount.password !== this.oldFrom.password) {
        this.accountSend.push(accountObj)
      }
      this.$emit('get-account', this.accountSend)
    },
    lastStep () {
      this.$emit('get-back', true)
    },
    goBack () {
      this.$router.go(-1)
    },
    getAppId (val) {
      this.addAccount.appId = val
      console.log(this.addAccount.appId, '---1111111111111111----')
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
