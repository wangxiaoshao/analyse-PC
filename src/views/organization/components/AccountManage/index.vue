<template>
  <div class="account-manage">
    <div class="set-default">
      <div class="default-warn"><i class="el-icon-warning"></i>默认帐号用于您一个帐号全站都能使用，若遇到不能使用的业务系统，请切换身份类型即可。</div>
      设置默认帐号
      <el-select v-model="value" :disabled="disabledFlag" placeholder="请选择">
        <el-option
          v-for="item in accountOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-collapse v-model="activeAccount" accordion class="account-list">
      <el-collapse-item title="帐号：chenyu27  身份：省委办公厅   电子政务处   副处长 " name="1">
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
      </el-collapse-item>
    </el-collapse>
    <div class="creat-account-content">
      <el-button class="creat-btn" v-show="!disabledFlag" @click="creatAccount"><i class="el-icon-plus el-icon--left">创建账号</i></el-button>
      <el-form label-width="100px" :model="addAccount" v-if="addFlag">
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
  </div>
</template>

<script>
import bindSystem from '../BindSystem/index'
export default {
  components: { bindSystem },
  props: ['disabledFlag', 'isShowEditFlag'],
  data () {
    return {
      addAccount: {
        name: '',
        password: '',
        able: false,
        checkSystem: ['上海']
      },
      systemList: ['上海', '北京', '广州', '深圳'],
      addFlag: false,
      activeAccount: '1',
      tags: [], // 提交的标签
      options: [],
      accountOptions: [],
      value: '',
      editForm: {
        editForm: 'chengyu',
        passWord: '1124154'
      }
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    creatAccount () {
      this.addFlag = true
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
