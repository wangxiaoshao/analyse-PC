<template>
  <div class="editAccount">
    <div class="parameter-item">
      <!-- <div class="header">账号设置</div> -->
      <el-form label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="登录账号">
              <el-input placeholder="请输入登录账号" style="width:200px" disabled></el-input>
                <div style="color:rgb(252, 112, 73);font-size:10px"><span style="margin-right:5px">*</span>登录账号暂不支持修改</div>
            </el-form-item>
            <el-form-item label="关联系统">
              <!--  -->
              <bind-system :list="account4AppDtos"  @app-change="getAppId"></bind-system>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="登录别名">
              <el-input placeholder="请输入登录别名" style="width:200px"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="removed">
              <el-switch v-model="addAccount.removed"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="parameter-item">
      <!-- <div class="header">密码设置</div> -->
      <div class="resetPwd">
        <p style="margin:10px 0;">
          <i class="el-icon-info" :style="{fontSize: '16px',color:'#FC7049'}"></i>
          点击以下按钮进行密码修改，请确保修改改账号的原密码输入正确，如忘记密码请点击重置密码进行密码重置。
        </p>
        <el-button type="primary" @click="modifiePwd">修改密码</el-button>
      </div>

      <div class="resetPwd">
        <p style="margin:10px 0;">
          <i class="el-icon-info" :style="{fontSize: '16px',color:'#FC7049'}"></i>
          忘记原有密码，点击以下按钮进行重置，请确保该账号的手机号能正常接收信息！
        </p>
        <el-button type="primary" @click="resetPwd">重置密码</el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="20">
        <el-footer style="text-align:center">
          <el-button type="primary" @click="saveAccount">保存</el-button>
          <el-button  @click="goBack">取消</el-button>
        </el-footer>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import bindSystem from '../../../organization/components/BindSystem/index'
export default {
  components: {
    bindSystem
  },
  props:['accountInfo'],
  data() {
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
      account4AppDtos: [{id: 56, accountId: "-1412639883282593319", appId: 62, appName: "党建系统"}]
    }
  },
  created(){
    console.log('accountInfo:',this.accountInfo)
  },
  methods: {
    // 重置密码
    resetPwd() {
      this.$emit('resetPwd')
    },

    // 修改密码
    modifiePwd() {
      this.$emit('modifiePwd')
    },

    // 保存修改
    saveAccount(){
      this.goBack()
    },

    // 返回
    goBack(){
      this.$emit('goBack')
    },

    // 获取账号id
    getAppId (val) {
      this.addAccount.appId = val
    }
  }
}
</script>
<style lang="less" scoped>
@import 'index.less';
</style>