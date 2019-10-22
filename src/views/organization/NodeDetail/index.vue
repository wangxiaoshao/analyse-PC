<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      :disabled="!isShowEditFlag"
      class="demo-ruleForm">
      <el-form-item label="节点名称" prop="name">
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="上级节点" prop="parent">
        <el-input v-model="ruleForm.parent"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="able">
        <el-switch v-model="ruleForm.able"></el-switch>
      </el-form-item>
      <el-form-item label="申请原因" prop="reason">
        <el-input type="textarea" v-model="ruleForm.reason"></el-input>
      </el-form-item>
      <el-form-item v-if="isShowEditFlag">
        <el-button type="primary" @click="submitForm('ruleForm')">{{submitHtml}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import handleBreadcrumb from '@src/mixins/handleBreadcrumb.js'
export default {
  name: 'index',
  mixins: [ handleBreadcrumb ],
  data () {
    return {
      isShowEditFlag: true,
      disabledFlag: false,
      breadcrumbTitle: '添加节点',
      submitHtml: '保存',
      ruleForm: {
        name: '',
        able: false,
        parent: '',
        reason: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ],
        reason: [
          { required: true, message: '请填写申请原因', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    console.log(this.$route.name)
    if (this.$route.name === 'NodeEdit') {
      this.isShowEditFlag = true
      this.disabledFlag = false
    } else {
      this.isShowEditFlag = false
      this.disabledFlag = true
    }
  },
  methods: {
    setBreadcrumbTitle () { // 设置面包屑title
      if (this.$route.name === 'NodeEdit') {
        if (this.$route.params.id) {
          this.breadcrumbTitle = '编辑节点'
        } else {
          this.breadcrumbTitle = '添加节点'
        }
      } else {
        this.breadcrumbTitle = '节点详情'
      }
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
  },
  mounted () {
    this.setBreadcrumbTitle()
    this.pushBreadcrumb({
      name: this.breadcrumbTitle,
      parent: {
        name: 'OrganizationContent',
        query: {
          type: 'back'
        }
      }
    })
  },
  watch: {
    $route: {
      handle (val) {
        this.setBreadcrumbTitle()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">

</style>
