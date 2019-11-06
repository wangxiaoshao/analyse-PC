<template>
  <div v-loading="loading">
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
      <el-form-item label="上级节点" prop="parentName">
        <el-input v-model="ruleForm.parentName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch v-model="ruleForm.enable"></el-switch>
      </el-form-item>
      <el-form-item label="申请原因" prop="reason">
        <el-input type="textarea" v-model="ruleForm.reason"></el-input>
      </el-form-item>
      <el-form-item v-if="isShowEditFlag">
        <el-button type="primary" @click="submitForm('ruleForm')">{{submitHtml}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
export default {
  name: 'index',
  mixins: [ handleBreadcrumb ],
  data () {
    return {
      loading: false,
      isShowEditFlag: true,
      disabledFlag: false,
      current: false,
      breadcrumbTitle: '添加节点',
      submitHtml: '保存',
      oldFrom: {},
      parentId: '',
      ruleForm: {
        reason: '',
        name: '',
        enable: false,
        parentName: '',
        id: '',
        parentId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    setBreadcrumbTitle () { // 设置面包屑title
      if (this.$route.name === 'NodeEdit' || this.$route.name === 'NodeAdd') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'NodeEdit') {
          this.breadcrumbTitle = '编辑节点'
        } else {
          this.breadcrumbTitle = '添加节点'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumbTitle = '节点详情'
      }
    },
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            reason: this.ruleForm.reason,
            viewNode: {
              nodeType: 1,
              id: this.$route.params.id,
              parentId: this.ruleForm.parentId || this.$route.params.parentId,
              name: this.ruleForm.name,
              enable: true
            }
          }
          api[urlNames['createViewNode']](data).then((res) => {
            this.$message.success(`添加成功`)
            console.log(res)
          }, (error) => {

          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getNodeDetail () {
      let data = {
        id: this.$route.params.id || this.$route.params.parentId
      }
      this.loading = true
      api[urlNames['findViewNodeById']](data).then((res) => {
        this.loading = false
        if (this.$route.name === 'NodeAdd') {
          this.ruleForm.parentName = res.data.name
          this.ruleForm.parentId = res.data.id
        } else {
          this.ruleForm.parentName = res.data.parentName
          this.ruleForm.parentId = res.data.parentId
          this.ruleForm.name = res.data.name
          this.ruleForm.id = res.data.id
        }
        let backId = ''
        if (this.ruleForm.parentId === '-1') {
          backId = this.ruleForm.id
        } else {
          backId = this.ruleForm.parentId
        }
        this.pushBreadcrumb({
          name: this.breadcrumbTitle,
          parent: {
            name: 'OrganizationContent',
            params: {
              nodeId: backId
            },
            query: {
              type: 'back'
            }
          }
        })
        console.log(res.data)
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    }
  },
  mounted () {
    this.setBreadcrumbTitle()
  },
  created () {
    const obj = {
      enable: this.ruleForm.enable,
      reason: this.ruleForm.reason
    }
    this.oldFrom = JSON.parse(JSON.stringify(obj))
    this.getNodeDetail()
  },
  computed: {
    newValue () {
      const obj = {
        enable: this.ruleForm.enable,
        reason: this.ruleForm.reason
      }
      return obj
    }
  },
  watch: {
    $route: {
      handler (val) {
        this.setBreadcrumbTitle()
      },
      deep: true
    },
    newValue: {
      handler (val) {
        if (val.enable !== this.oldFrom.enable || val.reason !== this.oldFrom.reason) {
          this.submitHtml = '保存并提交申请'
        } else {
          this.submitHtml = '保存'
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less">

</style>
