<template>
  <div class="creat-account-content">
    <el-button class="creat-btn" @click="creatAccount"><i class="el-icon-plus el-icon--left">创建账号</i></el-button>
    <el-form label-width="100px" :model="addAccount" v-for="item in accountList" :key="item">
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
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      addAccount: {
        name: '',
        password: '',
        able: false,
        checkSystem: ['上海']
      },
      systemList: ['上海', '北京', '广州', '深圳'],
      accountList: []
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    creatAccount () {
      this.accountList.push('新增账号')
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
