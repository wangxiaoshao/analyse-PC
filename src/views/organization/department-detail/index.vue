<template>
  <div class="form-content" v-loading="loading">
    <search-lable
      :openSearchFlag="openSearchFlag"
      :addInfo="addInfo"
      @close="getClose"
      @getTag="getTag"
    ></search-lable>
    <el-form :model="ruleForm" :disabled="disabledFlag" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="detail-title">
        <i class="menu-icon fa fa-sitemap" style="margin: 0px 5px;"></i>部门信息
      </div>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">基础信息</el-menu-item>
      </el-menu>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="部门名称"
            prop="department.name"
            :rules="[{ required: true, message: '名称不能为空'}]"
          >
            <el-input v-model="ruleForm.department.name"></el-input>
          </el-form-item>
          <el-form-item label=" 上级部门" prop="parentDep">
            <el-input v-model="parentDep" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label=" 启用状态" prop="department.removed">
            <el-switch v-model="ruleForm.department.removed"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
         <!-- <el-form-item label="部门简称" prop="shortName">
            <el-input v-model="ruleForm.department.shortName"></el-input>
          </el-form-item>-->
          <el-form-item
            label="部门电话"
            prop="department.phone"
          >
            <el-input v-model="ruleForm.department.phone"></el-input>
          </el-form-item>
          <el-form-item label="上级单位" prop="orgName">
            <el-input v-model="orgName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="单位标签" prop="labelId">
          <el-tag
            v-for="(tag,index) in tagsName"
            :key="tag"
            type="info"
            closable
            :title="tag"
            @close="removeTag(tag,index)"
          >
            {{tag}}
          </el-tag>
          <el-tag class="add-tag-btn" v-if="!disabledFlag" @click="openSearchFlag = true"><i class="el-icon-plus"></i>添加标签</el-tag>
        </el-form-item>
      </el-row>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">扩展属性</el-menu-item>
      </el-menu>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位介绍" prop="department.duty">
            <el-input type="textarea" v-model="ruleForm.department.duty"></el-input>
          </el-form-item>
          <el-form-item label="申请原因" prop="reason">
            <el-input type="textarea" v-model="ruleForm.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位职责" prop="department.description">
            <el-input type="textarea" v-model="ruleForm.department.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-show="isShowEditFlag">
        <el-button type="primary" @click="submitForm('ruleForm')">{{submitHtml}}</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import searchLable from '../components/AddTags/index'
export default {
  name: 'index',
  mixins: [ handleBreadcrumb ],
  components: { searchLable },
  /* props: {
    // TODO breadcrumb可采用组件传参的模式替换路由判断，将配置权交给调用方
    breadcrumb: {
      type: Object,
      default () {
        return {
          name: '部门详情',
          parent: null
        }
      }
    }
  }, */
  data () {
    return {
      breadcrumb: {
        name: '部门详情',
        parent: null
      },
      openSearchFlag: false,
      addInfo: {
        searchFlag: false,
        type: 2 // 1.单位，2、部门，3、人员
      },
      loading: false,
      isShowEditFlag: true,
      disabledFlag: false,
      breadcrumbTitle: '添加节点',
      submitHtml: '保存',
      oldFrom: {},
      tagKeyWord: '',
      tagsName: [],
      orgName: '',
      parentDep: '',
      parentName: '',
      bindId: '',
      ruleForm: {
        reason: '',
        nodeId: '',
        labelId: [],
        department: {
          removed: true,
          phone: '',
          name: '',
          description: '',
          duty: '',
          id: '',
          shortName: '',
          parentId: '',
          orgId: ''
        }
      },
      systemTypeOption: [
        {
          label: '人大',
          value: 1
        }, {
          label: '党委',
          value: 2
        }
      ]
    }
  },
  mounted () {
    this.setBreadcrumbTitle()
  },
  created () {
    this.init()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.setBreadcrumbTitle()
  },
  methods: {
    init () {
      api[urlNames['findViewNodeById']]({
        id: this.$route.params.parentId || this.$route.params.id
      }).then((res) => {
        this.bindId = res.data.bindId
        this.ruleForm.nodeId = res.data.id
        if (res.data.bindId) {
          if (res.data.nodeType === 2) {
            api[urlNames['findOrganizationById']]({
              id: res.data.bindId
            }).then((res) => {
              this.orgName = res.data.name
              this.ruleForm.department.orgId = res.data.id
            })
          }
          if (res.data.nodeType === 3) { // 上级部门
            this.ruleForm.department.parentId = res.data.bindId
            this.getDetail()
          }
          if (this.$route.name !== 'DepartmentAdd') {
            this.findLabel(res.data.nodeType)
          }
        }
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    },
    getDetail () {
      let data = {
        id: this.bindId
      }
      this.loading = true
      api[urlNames['findDepartmentById']](data).then((res) => {
        this.loading = false
        if (this.$route.name === 'DepartmentAdd') {
          this.orgName = res.data.orgName
          this.ruleForm.department.orgId = res.data.orgId
        } else {
          this.orgName = res.data.orgName
          this.ruleForm.department.orgId = res.data.orgId
          if (res.data.parentId) {
            this.parentDep = res.data.parentName
          } else {
            this.parentDep = ''
          }
          this.ruleForm.department.id = res.data.id
          this.ruleForm.department.phone = res.data.phone
          this.ruleForm.department.name = res.data.name
          this.ruleForm.department.description = res.data.description
          this.ruleForm.department.duty = res.data.duty
        }
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    },
    // 获取标签
    findLabel (type) {
      api[urlNames['findLabel']]({
        id: this.bindId,
        type: type
      }).then((res) => {
        res.data.forEach((item) => {
          this.tagsName.push(item.split('|')[1])
          this.ruleForm.labelId.push(item.split('|')[0])
        })
      }, (error) => {
      })
    },
    removeTag (tag, index) {
      this.tagsName.splice(index, 1)
      this.ruleForm.labelId.splice(index, 1)
    },
    getClose (val) {
      this.openSearchFlag = val
    },
    // 获取选中的标签
    getTag (val) {
      console.log('标签', val)
      val.forEach((item) => {
        this.tagsName.push(item.split('|')[1])
        this.ruleForm.labelId.push(item.split('|')[0])
      })
    },
    setBreadcrumbTitle () { // 设置面包屑title
      // TODO breadcrumbTitle可采用组件传参的模式替换路由判断，将配置权交给调用方
      if (this.$route.name === 'DepartmentEdit' || this.$route.name === 'DepartmentAdd') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'DepartmentEdit') {
          this.breadcrumb.name = '编辑部门'
        } else {
          this.breadcrumb.name = '添加部门'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumbTitle = '部门详情'
      }
      this.pushBreadcrumb(this.breadcrumb)
    },
    getSystemType (el) {
      this.ruleForm.department.systemType = el
    },
    getType (el) {
      this.ruleForm.department.type = el
    },
    getAreaId (val) {
      this.ruleForm.areaId = val
    },
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          api[urlNames['createDepartment']](this.ruleForm).then((res) => {
            this.$message.success(`添加成功`)
            this.goBack()
          }, (error) => {

          })
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
