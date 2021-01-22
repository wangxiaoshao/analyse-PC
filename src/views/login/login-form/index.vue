<template>
    <div class="login-form">
        <el-form
            :model="ruleForm"
            status-icon
            ref="ruleForm"
            label-width="40px"
            class="demo-ruleForm"
        >
            <el-form-item label="账号">
                <el-input v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input
                    type="password"
                    v-model="ruleForm.checkPass"
                    show-password
                ></el-input>
            </el-form-item>
        </el-form>
        <el-button class="submit" type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
        >
        <p>
            <el-button class="edit-password" type="text">忘记密码？</el-button>
        </p>
    </div>
</template>

<script>
export default {
  name: 'loginForm',
  data () {
    return {
      ruleForm: {
        pass: '',
        checkPass: '',
        age: ''
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
