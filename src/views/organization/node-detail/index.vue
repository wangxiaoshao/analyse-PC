<template>
  <div v-loading="loading">
     <!-- <el-drawer
    title="选择区域"
    :visible.sync="areaFlag"
    :direction="'rtl'">
      <area-list @get-area="getAreaId" @close="close" v-model="ruleForm.areaId"></area-list>
    </el-drawer> -->
      <el-dialog
    title="选择区域"
    :visible.sync="areaFlag"
   >
      <area-list @get-area="getAreaId" @close="close" v-model="ruleForm.areaId"></area-list>
      </el-dialog>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      :disabled="!isShowEditFlag"
      class="demo-ruleForm"
    >
      <el-form-item label="节点名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="上级节点" prop="parentName">
        <el-input v-model="ruleForm.parentName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="removed">
        <el-switch v-model="ruleForm.removed"></el-switch>
      </el-form-item>
      <el-form-item label="申请原因" prop="reason">
        <el-input type="textarea" v-model="ruleForm.reason"></el-input>
      </el-form-item>
      <el-form-item label="所属系统" prop="systemType">
        <el-select v-model="ruleForm.systemType" @change="getSystemType" placeholder="请选择所属系统">
          <el-option
            v-for="item in applicationOption"
            :key="item.id"
            :value="item.value"
            :label="item.text"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属区域" prop="areaId">
        <el-input v-model="ruleForm.areaId" style="display: none"></el-input>
        <el-input v-model="areaCheck" @focus="openArea"></el-input>
      </el-form-item>
      <el-form-item v-if="isShowEditFlag">
        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="!hasRight('viewNodeSetting')">{{submitHtml}}</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import dicOption from '@src/mixins/dic-options.js'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import hasRight from '@src/mixins/has-right'
import areaList from '../components/AreaList/index'
export default {
  name: 'index',
  components: { areaList },
  mixins: [handleBreadcrumb, dicOption, hasRight],
  data () {
    return {
      loading: false,
      isShowEditFlag: true,
      disabledFlag: false,
      current: false,
      breadcrumbTitle: '添加节点',
      submitHtml: '保存',
      areaCheck: '',
      oldFrom: {},
      areaFlag: false,
      areaOption: [],
      allAreaList: [],
      ruleForm: {
        reason: '',
        name: '',
        removed: true,
        parentName: '',
        id: '',
        areaId: '',
        systemType: ''
      },
      rules: {
        name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }]
      },
      backId: ''
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
  methods: {
    getSystemType (el) {
      this.ruleForm.systemType = el
    },
    getAreaId (val) {
      this.areaCheck = val.name
      this.ruleForm.areaId = val.id
    },
    close (val) {
      this.areaFlag = val
    },
    openArea (e) {
      this.areaFlag = true
      e.target.blur()
    },
    findMenuByPath (list) {
      for (let item of list) {
        this.areaOption.push(item)
        if (item.children && item.children.length > 0) {
          this.findMenuByPath(item.children)
        } else {
        }
      }
    },
    getNodeDetail () {
      let data = {
        id: this.$route.params.id || this.$route.params.parentId
      }
      this.loading = true
      api[urlNames['findViewNodeById']](data).then(
        res => {
          this.loading = false
          if (this.$route.name === 'NodeAdd') {
            this.ruleForm.parentName = res.data.name
            this.ruleForm.parentId = res.data.id
          } else {
            this.findMenuByPath(res.data.nodeArea)
            if (res.data.nodeArea.length > 0) {
              this.ruleForm.areaId = this.areaOption[this.areaOption.length - 1].id
              this.areaOption.forEach(item => {
                this.areaCheck += item.name + '/'
              })
            }
            this.ruleForm.parentName = res.data.parentName
            this.ruleForm.parentId = res.data.parentId
            this.ruleForm.name = res.data.name
            this.ruleForm.id = res.data.id
            this.ruleForm.removed = !res.data.removed
            this.ruleForm.systemType = res.data.systemType
            this.ruleForm.areaId = res.data.areaId
          }
          if (this.ruleForm.parentId === '-1') {
            this.backId = this.ruleForm.id
          } else {
            this.backId = this.ruleForm.parentId
          }
          this.pushBreadcrumb({
            name: this.breadcrumbTitle,
            parent: {
              name: 'OrganizationContent',
              params: {
                nodeId: this.backId
              },
              query: {
                type: 'back'
              }
            }
          })
        },
        () => {
          this.$message.error(`没有内容`)
        }
      )
    },
    setBreadcrumbTitle () {
      // 设置面包屑title
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
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          const data = {
            reason: this.ruleForm.reason,
            viewNode: {
              nodeType: 1,
              id: this.$route.params.id,
              parentId: this.ruleForm.parentId || this.$route.params.parentId,
              name: this.ruleForm.name,
              removed: this.ruleForm.removed ? 0 : 1,
              areaId: this.ruleForm.areaId,
              systemType: this.ruleForm.systemType
            }
          }
          api[urlNames['createViewNode']](data).then(
            res => {
              this.$message.success(`保存成功`)
              this.goBack()
            },
            () => {}
          )
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    /*
     * 返回上一页
     * */
    goBack () {
      let breadcrumb = [...this.app.pageBreadcrumb]
      let currentPage = breadcrumb[breadcrumb.length - 1]
      breadcrumb.splice(-1, 1)
      this.SET_PAGE_BREADCRUMB(breadcrumb)
      this.$router.push(currentPage.parent)
    }
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
  beforeRouteUpdate (to, from, next) {
    next()
    this.setBreadcrumbTitle()
  },
  watch: {
    /* newValue: {
      handler (val) {
        if (val.enable !== this.oldFrom.enable || val.reason !== this.oldFrom.reason) {
          this.submitHtml = '保存并提交申请'
        } else {
          this.submitHtml = '保存'
        }
      },
      deep: true
    } */
  }
}
</script>

<style lang="less">

</style>
