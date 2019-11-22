<template>
  <div class="pass-change">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="account-info">
          <p>账号信息</p>
          <div v-for="index in [1,2,3]" :key="index">
            <el-button>管理员</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="修改密码" name="first">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div :style="{margin: '20px'}" class="account-name">
                <i class="el-icon-user" :style="{marginRight: '20px'}">{{userName}}</i>
              </div>
              <el-form-item label="原密码" prop="oldPass">
                <el-input
                  type="password"
                  v-model.number="ruleForm.oldPass"
                  show-password>
                </el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPass">
                <el-input
                  type="password"
                  v-model="ruleForm.newPass"
                  autocomplete="off"
                  show-password>
                </el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                  show-password>
                </el-input>
              </el-form-item>
              <div class="pass-rule"><i class="el-icon-warning"></i>{{passRule}}</div>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="重置密码" name="second">
            重置密码
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { api, urlNames } from '@src/api'

export default {
  data () {
    var validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原始密码'))
      } else {
        callback()
      }
    }
    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        let reg = /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.*/]*|[a-zA-Z!@#\$%_\.*/]*)$)[a-zA-Z\d!@#\$%_\.*/]{8,}$/
        reg.test(value) ? callback() : callback(new Error('请按照密码规则填写'))
        console.log(reg.test(value))

        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validateCheckPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'first',
      userName: '管理员管理员',
      passRule: '密码规则:必须含数字、字母(区分大小写)、特殊字符(如！@#$_等)，且长度不少于8位。如：bgt123@SZF',
      ruleForm: {
        oldPass: '',
        checkPass: '',
        newPass: ''
      },
      rules: {
        oldPass: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validateCheckPass, trigger: 'blur' }
        ],
        newPass: [
          { validator: validateNewPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>


