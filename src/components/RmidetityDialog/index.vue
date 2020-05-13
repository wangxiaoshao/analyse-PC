<template>
  <div class="rmIdetityDialog">
    <!--解除兼职/挂职说明-->
    <el-dialog :title='identityDialogParams.identityTitle' :visible.sync="identityDialogParams.removeFlag" width="40%">
      <span class="remove-des">您确定解除该人员在本单位的{{identityDialogParams.identityName}}身份？解除之后该人员将无法使用该身份下的账号使用应用系统。</span>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="申请原因" prop="reason">
          <el-input type="textarea" v-model="ruleForm.reason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submitRemoveDuty('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'rmidetityDialog',
  props:['identityDialogParams','ruleForm'],
  data(){
    return {
       rules: {
        reason: [{ required: true, message: '请填写申请原因', trigger: 'blur' }]
      }
    }
  },
  methods:{
    submitRemoveDuty(ruleForm){
          this.$refs[ruleForm].validate(valid => {
        if (valid) {
          api[urlNames['removeDuty']](this.ruleForm).then(
            res => {
              this.$message.success(`解除成功`)
              this.calloutFlag = false
              this.cancel()
              // this.fromInit()
              // this.getGrid()
            },
            () => {}
          )
        }
      })
    },
    cancel(){
      this.$emit('cancel')
    }
  }
}
</script>
<style lang="less">
@import './index';
</style>