<template>
  <div class="form-content" v-loading="loading">
    <search-lable
      :openSearchFlag="openSearchFlag"
      :addInfo="addInfo"
      @close="getClose"
      @getTag="getTag"
      :delSelectLabelId="delSelectLabelId"
    ></search-lable>
    <el-form :model="ruleForm" :disabled="disabledFlag" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <div class="detail-title">
        <i class="imenu-icon iconfont iconbumen big-icon" style="margin: 0px 5px;"></i>内设机构信息
      </div>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">基础信息</el-menu-item>
      </el-menu>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="内设机构名称"
            prop="department.name"
            :rules="[{ required: true, message: '名称不能为空'}]"
          >
            <el-input v-model="ruleForm.department.name"></el-input>
            <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
              <div class="tip-msg"
                   v-show="this.app.option.options.departmentAuditFields.indexOf('name') > -1 && ruleForm.department.name !== oldFrom.department.name">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
          <el-form-item label=" 上级内设机构" prop="parentDep">
            <el-input v-model="parentDep" :disabled="true"></el-input>
          </el-form-item>
           <el-form-item label="内设机构ID">
            <el-input v-model="ruleForm.department.id" :disabled="true"></el-input>
            <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
             <div class="tip-msg"
                   v-show="this.app.option.options.departmentAuditFields.indexOf('id') > -1 && ruleForm.department.id !== oldFrom.department.id">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
         <!-- <el-form-item label="内设机构简称" prop="shortName">
            <el-input v-model="ruleForm.department.shortName"></el-input>
          </el-form-item>-->
          <el-form-item
            label="内设机构电话"
            prop="department.phone"
          >
            <el-input v-model="ruleForm.department.phone"></el-input>
            <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
            <div class="tip-msg"
                 v-show="this.app.option.options.departmentAuditFields.indexOf('phone') > -1 && ruleForm.department.phone !== oldFrom.department.phone">
              添加或修改该字段需要提交审核
            </div>
            </div>
          </el-form-item>
          <el-form-item label="上级单位" prop="orgName">
            <el-input v-model="orgName" :disabled="true"></el-input>
            <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
             <div class="tip-msg"
                   v-show="this.app.option.options.departmentAuditFields.indexOf('orgName') > -1 && ruleForm.department.orgName !== oldFrom.department.orgName">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
           <el-form-item label=" 启用状态" prop="department.removed">
            <el-switch v-model="ruleForm.department.removed"></el-switch>
            <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
              <div class="tip-msg"
                   v-show="this.app.option.options.departmentAuditFields.indexOf('removed') > -1 && ruleForm.department.removed !== oldFrom.department.removed">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="内设机构标签" prop="labelId">
          <el-tag
            v-model="ruleForm.labelId"
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
          <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
            <div class="tip-msg"
                 v-show="this.app.option.options.departmentAuditFields.indexOf('labelId') > -1 && ruleForm.labelId !== oldFrom.labelId">
              添加或修改该字段需要提交审核
            </div>
          </div>
        </el-form-item>
      </el-row>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">扩展属性</el-menu-item>
      </el-menu>
      <el-row>
        <el-col :span="12">
          <el-form-item label="内设机构介绍" prop="department.duty">
            <el-input type="textarea" v-model="ruleForm.department.duty"></el-input>
            <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
              <div class="tip-msg"
                   v-show="this.app.option.options.departmentAuditFields.indexOf('duty') > -1 && ruleForm.department.duty !== oldFrom.department.duty">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
          <el-form-item label="申请原因" prop="reason">
            <el-input type="textarea" v-model="ruleForm.reason"></el-input>
            <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
              <div class="tip-msg"
                   v-show="this.app.option.options.departmentAuditFields.indexOf('reason') > -1 && ruleForm.reason !== oldFrom.reason">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内设机构职责" prop="department.description">
            <el-input type="textarea" v-model="ruleForm.department.description"></el-input>
            <div v-if="this.$route.name === 'DepartmentEdit' ||  this.$route.name === 'DepartmentAdd'">
              <div class="tip-msg"
                   v-show="this.app.option.options.departmentAuditFields.indexOf('description') > -1 && ruleForm.department.description !== oldFrom.department.description">
                添加或修改该字段需要提交审核
              </div>
            </div>
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
import { mapState, mapMutations } from 'vuex'
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
          name: '内设机构详情',
          parent: null
        }
      }
    }
  }, */
  data () {
    return {
      breadcrumb: {
        name: '内设机构详情',
        parent: null
      },
      openSearchFlag: false,
      addInfo: {
        searchFlag: false,
        type: 2 // 1.单位，2、内设机构，3、人员
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
      tempLabelId: [], // 存储label中间变量
      delSelectLabelId: null,
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
  computed: {
    ...mapState(['app'])
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
    ...mapMutations(['SET_OPTION']),
    init () {
      if (this.$route.name === 'DepartmentAdd' || this.$route.name === 'DepartmentEdit') {
        if (this.$route.name === 'DepartmentAdd') {
          this.oldFrom = JSON.parse(JSON.stringify(this.ruleForm))
        }
        api[urlNames['findViewNodeById']]({
          id: this.$route.params.parentId || this.$route.params.id
        }).then((res) => {
          this.bindId = res.data.bindId
          this.ruleForm.nodeId = res.data.id
          if (res.data.bindId) {
            this.findLabel(2)
            if (res.data.nodeType === 2) {
              api[urlNames['findOrganizationById']]({
                id: res.data.bindId
              }).then((res) => {
                this.orgName = res.data.name
                this.ruleForm.department.orgId = res.data.id
              })
            }
            if (res.data.nodeType === 3) { // 上级内设机构
              this.ruleForm.department.parentId = res.data.bindId
              this.getDetail()
            }
          }
        }, () => {
          this.$message.error(`没有内容`)
        })
      } else {
        this.bindId = this.$route.params.id
        this.getDetail()
        this.findLabel(2)
      }
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
          this.ruleForm.department.removed = !res.data.removed
          if (this.$route.name === 'DepartmentEdit') {
            this.oldFrom = JSON.parse(JSON.stringify(this.ruleForm))
          }
        }
      }, () => {
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
          this.tagsName.push(item.name)
          this.ruleForm.labelId.push(item.id)
        })
      }, () => {
      })
    },
    removeTag (tag, index) {
      let that = this
      let lIds = []
      lIds = that.tempLabelId.filter(function (item) {
        return item === that.ruleForm.labelId[index]
      })
      if (lIds.length !== 0) {
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api[urlNames['deleteUserLabelOrDeptLabelOrOrgLabel']]({
            id: this.ruleForm.department.id,
            type: 2,
            labelId: this.ruleForm.labelId[index]
          }).then((res) => {
            if (res.status === 0) {
              this.$message.success('删除成功')
              this.tagsName.splice(index, 1)
              this.ruleForm.labelId.splice(index, 1)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        that.delSelectLabelId = that.ruleForm.labelId[index] + '|' + that.tagsName[index]
        that.ruleForm.labelId.splice(index, 1)
        that.tagsName.splice(index, 1)
      }
    },
    getClose (val) {
      this.openSearchFlag = val
    },
    // 获取选中的标签
    getTag (val) {
      const res = new Map()
      let tag = []
      val.forEach((item) => {
        this.tagsName.push(item.split('|')[1])
        tag.push(item.split('|')[0])
      })
      this.tagsName = this.tagsName.filter(a => !res.has(a) && res.set(a, 1))
      let tagIdList = []
      tagIdList = tag.filter(a => !res.has(a) && res.set(a, 1))
      tagIdList.forEach(item => {
        this.ruleForm.labelId.push(parseInt(item))
      })
    },
    setBreadcrumbTitle () { // 设置面包屑title
      // TODO breadcrumbTitle可采用组件传参的模式替换路由判断，将配置权交给调用方
      if (this.$route.name === 'DepartmentEdit' || this.$route.name === 'DepartmentAdd') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'DepartmentEdit') {
          this.breadcrumb.name = '编辑内设机构'
        } else {
          this.breadcrumb.name = '添加内设机构'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumbTitle = '内设机构详情'
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
      this.ruleForm.department.removed = this.ruleForm.department.removed ? 0 : 1
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          api[urlNames['createDepartment']](this.ruleForm).then((res) => {
            this.$message.success(`保存成功`)
            this.goBack()
          }, () => {

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
