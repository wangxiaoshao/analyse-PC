<template>
  <div class="node-edit">
    <el-dialog
    :title="nodeInfo.title"
    :visible.sync="nodeInfo.openNodeFlag"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal="false"
  >
    <div class="dialog-close" @click="close"><i class="el-icon-close"></i></div>
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
    </el-form>
  </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" v-if="isShowEditFlag" @click="submitForm('ruleForm')">{{submitHtml}}</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
export default {
  name: 'index',
  props: ['nodeInfo'],
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
        parentName: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入节点名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    close () {
      this.$emit('closeNode', false)
    },
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            reason: this.ruleForm.reason,
            viewNode: {
              nodeType: 1,
              id: this.nodeInfo.id,
              parentId: this.nodeInfo.parentId,
              name: this.ruleForm.name,
              enable: this.ruleForm.enable
            }
          }
          api[urlNames['createViewNode']](data).then((res) => {
            this.$emit('closeNode', false)
            this.$emit('succese', true)
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
        console.log(res.data)
        if (this.$route.name === 'NodeAdd') {
          this.ruleForm.parentName = res.data.name
        } else {
          this.ruleForm.name = res.data.name
        }
        this.ruleForm.parentName = res.data.parentName
        this.ruleForm.parentId = res.data.id
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    }
  },
  created () {
    console.log(this.nodeInfo)
    const obj = {
      enable: this.ruleForm.enable,
      reason: this.ruleForm.reason
    }
    this.oldFrom = JSON.parse(JSON.stringify(obj))
    /* if (this.nodeInfo.infoFlag) {
      this.getNodeDetail()
    } */
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
  @import "index";
</style>
