<template>
  <div class="pass-change">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="account-info">
          <p>账号信息</p>
          <div v-for="(item, index) in accountInfoList" :key="item.id">
            <el-button
              @click="selectAccount(item)"
              :autofocus="index === 0">{{item.name}}
            </el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="修改密码" name="first">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div :style="{margin: '20px'}" class="account-name">
                <i class="el-icon-user" :style="{marginRight: '20px'}">{{currentSetAccount.name}}</i>
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
import { mapState } from 'vuex'

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
      accountInfoList: [],
      currentSetAccount: {},
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
  created () {
    console.log(this.app['option'])
    let uid = this.app['option']
    api[urlNames['findUserAccountByUid']]().then((res) => {
      if (res && res.data) {
        this.accountInfoList = res.data
        this.currentSetAccount = res.data[0]
      }
    }, (error) => {
      this.accountInfoList = []
    })
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    selectAccount (val) {
      console.log(val)
      this.currentSetAccount = val
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            'accountId': this.currentSetAccount.id,
            'oldPwd': this.ruleForm.oldPass,
            'newPwd': this.ruleForm.newPass,
            'repeatPwd': this.ruleForm.checkPass
          }
          api[urlNames['updatePwd']](data).then((res) => {
            console.log(res)
            let status = res && res.status ? res.status : ''
            this.$message({
              message: status === 0 ? '修改成功' : '修改失败',
              type: status === 0 ? 'success' : 'error'
            })
          }, () => {

          })
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


