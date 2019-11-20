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
     <!-- <el-collapse-item title="帐号：chenyu27  身份：省委办公厅   电子政务处   副处长 " name="1">
        <bind-system :disabledFlag="disabledFlag"></bind-system>
        <div class="edit-content">
          <el-form ref="form" :disabled="disabledFlag" :model="editForm" label-width="80px" class="demo-personFrom">
            <el-form-item label="账号" prop="accountName">
              <el-input v-model="editForm.accountName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="editForm.passWord"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>-->
      <el-collapse-item v-for="item in accountList" :key="item.id" :title="item.name + ' ' + userInfo.name + ' ' + userInfo.dutyName + ' ' + userInfo.postName"></el-collapse-item>
    </el-collapse>
    <div class="creat-account-content">
      <el-button class="creat-btn" v-show="!disabledFlag" @click="creatAccount">
       <!-- <i class="el-icon-plus el-icon&#45;&#45;left">创建账号</i>-->
        创建账号
      </el-button>
      <el-form label-width="100px" :model="addAccount" v-if="!addFlag">
        <el-form-item label="登录帐号" prop="name">
          <el-input v-model="addAccount.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addAccount.password"></el-input>
        </el-form-item>
        <el-form-item label="关联系统">
          <div class="choose-content">
            <el-button v-popover:popover class="choose-btn">选择关联系统</el-button>
            <el-popover
              ref="popover"
              placement="bottom"
              width="500"
              trigger="click"
              popper-class="system-popover"
            >
              <div>
                <el-checkbox-group v-model="addAccount.checkSystem">
                  <el-checkbox v-for="item in systemList" border :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-popover>
            <el-tag
              :key="tag"
              type="info"
              v-for="tag in addAccount.checkSystem"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="是否禁用" prop="able">
          <el-switch v-model="addAccount.able"></el-switch>
        </el-form-item>
      </el-form>
    </div>
      <el-footer class="add-person-footer">
        <el-button type="primary" @click="lastStep">上一步</el-button>
        <el-button type="primary" @click="fromSublime">保存</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-footer>
  </div>
</template>

<script>
import bindSystem from '../BindSystem/index'
export default {
  components: { bindSystem },
  props: ['disabledFlag', 'isShowEditFlag', 'accountList', 'userInfo', 'isDefaultFlag'],
  data () {
    return {
      addAccount: {
        name: '',
        password: '',
        able: false,
        checkSystem: ['上海']
      },
      oldFrom: {},
      systemList: ['上海', '北京', '广州', '深圳'],
      addFlag: this.isDefaultFlag,
      activeAccount: '1',
      tags: [], // 提交的标签
      options: [],
      accountSend: [],
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
            name: item.name
          }
          this.accountSend.push(obj)
        } else {
          this.accountSend.push(item)
        }
      })
      console.log(val)
    },
    fromSublime () {
      let accountObj = {
        password: this.addAccount.password,
        removed: this.addAccount.able,
        appId: [],
        name: this.addAccount.name,
        id: '',
        defaultAccount: null
      }
      if (this.addAccount.name !== this.oldFrom.name && this.addAccount.password !== this.oldFrom.password) {
        debugger
        this.accountSend.push(accountObj)
      }
      this.$emit('get-account', this.accountSend)
    },
    lastStep () {
      this.$emit('get-back', true)
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
