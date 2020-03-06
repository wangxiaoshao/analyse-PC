<template>
  <div class="editAccount">
    <div class="parameter-item">
      <!-- <div class="header">账号设置</div> -->
      <el-form  label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="登录账号">
              <el-input placeholder="请输入登录账号"  v-model="accountInfo.name" style="width:200px" disabled></el-input>
                <div style="color:rgb(252, 112, 73);font-size:10px"><span style="margin-right:5px">*</span>登录账号暂不支持修改</div>
            </el-form-item>
            <el-form-item label="关联系统">
              <!--  -->
              <bind-system :list="accountInfo.account4AppDtos || []"  @app-change="getAppId"></bind-system>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="登录别名">
              <el-input placeholder="请输入登录别名" style="width:200px"  v-model="accountInfo.nickName"></el-input>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-switch v-model="accountInfo.removed"></el-switch>
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
import { api, urlNames } from '@src/api'
import bindSystem from '../../../organization/components/BindSystem/index'
export default {
  components: {
    bindSystem
  },
  props:['accountInfo'],
  data() {
    return {
        appId: []
    }
  },
  created(){
    
  },
  methods: {
    // 重置密码
    resetPwd() {
      this.$emit('resetPwd',this.accountInfo.id)
    },

    // 修改密码
    modifiePwd() {
      this.$emit('modifiePwd',this.accountInfo.id)
    },

    // 获取关联系统
    getAppId (val) {
      this.appId = val
    },

    // 保存修改
    saveAccount(){
      // 8442130717342908424
      let params={
        id:this.accountInfo.id,
        name:this.accountInfo.name,
        removed: this.accountInfo.removed ? 0 : 1,
        nickName:this.accountInfo.nickName,
        appId: this.appId
      }
      api[urlNames['updateAccount']](params).then(res=>{
        if(res){
          this.$message.info('设置成功')
         this.goBack()
        }
      
      })
     
    },

    // 返回
    goBack(){
      this.$emit('goBack')
    },

    
  }
}
</script>
<style lang="less" scoped>
@import 'index.less';
</style>