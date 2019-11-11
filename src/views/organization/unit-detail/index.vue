<template>
  <div class="form-content" v-loading="loading">
    <search-lable
      :openSearchFlag="openSearchFlag"
      :addInfo="addInfo"
      @close="getClose"
      @getTag="getTag"
    ></search-lable>
    <el-form :model="ruleForm" :disabled="disabledFlag" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="detail-title">
        <i class="menu-icon fa fa-sitemap" style="margin: 0px 5px;"></i>单位信息
      </div>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">基础信息</el-menu-item>
      </el-menu>
     <el-row>
       <el-col :span="12">
         <el-form-item label="单位名称" prop="name">
           <el-input v-model="ruleForm.organization.name"></el-input>
         </el-form-item>
         <el-form-item label="单位地址" prop="addr">
           <el-input v-model="ruleForm.organization.address"></el-input>
         </el-form-item>
         <el-form-item label="传真号码" prop="tel">
           <el-input v-model="ruleForm.organization.fax"></el-input>
         </el-form-item>
         <el-form-item label="统一单位信用编码" prop="uiniteCode">
           <el-input v-model="ruleForm.organization.creditId" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label=" 上级单位">
           <el-input v-model="parentName" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="所属类型" prop="type">
           <el-select v-model="ruleForm.organization.type" @change="getType" placeholder="请选择所属类型">
             <el-option label="区域一" value="1"></el-option>
             <el-option label="区域二" value="2"></el-option>
           </el-select>
         </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="单位简称" prop="shortName">
           <el-input v-model="ruleForm.organization.shortName"></el-input>
         </el-form-item>
         <el-form-item label="单位电话" prop="phone">
           <el-input v-model="ruleForm.organization.phone"></el-input>
         </el-form-item>
         <el-form-item label="邮编" prop="zipCode">
           <el-input v-model="ruleForm.organization.zipCode"></el-input>
         </el-form-item>
         <el-form-item label="区域">
            <!--选择区域组件-->
           <area-list @getAreaId="getAreaId"></area-list>
         </el-form-item>
         <el-form-item label="所属系统" prop="systemType">
           <el-select v-model="ruleForm.organization.systemType" @change="getSystemType" placeholder="请选择所属系统">
             <el-option
               v-for="item in systemTypeOption"
               :key="item.value"
               :value="item.value"
               :label="item.label"
             ></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label=" 启用状态" prop="enable">
           <el-switch v-model="ruleForm.organization.removed"></el-switch>
         </el-form-item>
       </el-col>
     </el-row>
      <el-row>
        <el-form-item label="单位标签">
          <el-tag
            v-for="tag in tagsName"
            :key="tag"
            type="info"
            closable
            :title="tag"
          >
            {{tag}}
          </el-tag>
          <el-tag class="add-tag-btn" @click="openSearchFlag = true"><i class="el-icon-plus"></i>添加标签</el-tag>
        </el-form-item>
      </el-row>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">扩展属性</el-menu-item>
      </el-menu>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位介绍" prop="ext01">
            <el-input type="textarea" v-model="ruleForm.organization.ext01"></el-input>
          </el-form-item>
          <el-form-item label="申请原因" prop="reason">
            <el-input type="textarea" v-model="ruleForm.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位职责" prop="ext02">
            <el-input type="textarea" v-model="ruleForm.organization.ext02"></el-input>
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
import areaList from '../components/AreaList/index'
export default {
  name: 'index',
  mixins: [ handleBreadcrumb ],
  components: { areaList, searchLable },
  data () {
    return {
      openSearchFlag: false,
      addInfo: {
        searchFlag: false,
        type: 1 // 1.单位，2、部门，3、人员
      },
      loading: false,
      isShowEditFlag: true,
      disabledFlag: false,
      breadcrumbTitle: '添加节点',
      submitHtml: '保存',
      oldFrom: {},
      tagKeyWord: '',
      tagsName: [],
      parentName: '',
      bindId: '',
      ruleForm: {
        reason: '',
        nodeId: '', // 节点id
        areaId: null,
        labelId: [],
        nodeType: 2,
        organization: {
          id: '',
          parentId: '', // bindId
          zipCode: '',
          address: '',
          ext02: '',
          ext01: '',
          type: null,
          creditId: '',
          removed: false,
          phone: '',
          systemType: null, // 1人大，2党委，4政府，8政协
          name: '',
          otherName: '',
          shortName: '',
          fax: ''
        }
      },
      rules: {
        'organization.name': [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        'organization.removed': [
          { required: true, message: '请选中启用状态', trigger: 'blur' }
        ]
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
    this.getNodeInfo()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.setBreadcrumbTitle()
  },
  methods: {
    getNodeInfo () {
      api[urlNames['findViewNodeById']]({
        id: this.$route.params.parentId || this.$route.params.id
      }).then((res) => {
        this.ruleForm.nodeId = res.data.id
        this.bindId = res.data.bindId
        this.ruleForm.organization.parentId = res.data.bindId
        if (res.data.bindId) {
          this.getDetail()
        }
        this.parentName = res.data.name
        this.pushBreadcrumb({
          name: this.breadcrumbTitle,
          parent: {
            name: 'OrganizationContent',
            params: {
              nodeId: this.$route.params.parentId || this.$route.params.id
            },
            query: {
              type: 'back'
            }
          }
        })
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    },
    getDetail () {
      let data = {
        id: this.bindId
      }
      this.loading = true
      api[urlNames['findOrganizationById']](data).then((res) => {
        console.log('------', res.data)
        this.loading = false
        if (this.$route.name === 'UnitAdd') {
          /* this.parentName = res.data.name
          this.ruleForm.nodeId = res.data.id
          this.ruleForm.nodeId = res.data.id
          this.ruleForm.organization.parentId = res.data.id
          this.ruleForm.organization.id = '' */
        } else {
          this.ruleForm.areaId = res.data.areaId
          this.ruleForm.labelId = res.data.labelId
          this.ruleForm.organization.address = res.data.address
          this.ruleForm.organization.name = res.data.name
          this.ruleForm.organization.address = res.data.address
          this.ruleForm.nodeId = res.data.parentId
          // this.ruleForm.organization.parentId = ''
          this.ruleForm.organization.id = res.data.id
          this.ruleForm.organization.removed = res.data.removed
          this.ruleForm.organization.fax = res.data.fax
          this.ruleForm.organization.phone = res.data.phone
          this.ruleForm.organization.shortName = res.data.shortName
          this.ruleForm.organization.systemType = res.data.systemType
          this.ruleForm.organization.type = res.data.type
          this.ruleForm.organization.zipCode = res.data.zipCode
        }
      }, (error) => {
        this.$message.error(`没有内容`)
      })
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
      if (this.$route.name === 'UnitEdit' || this.$route.name === 'UnitAdd') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'UnitEdit') {
          this.breadcrumbTitle = '编辑单位'
        } else {
          this.breadcrumbTitle = '添加单位'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumbTitle = '单位详情'
      }
    },
    getSystemType (el) {
      this.ruleForm.organization.systemType = el
    },
    getType (el) {
      this.ruleForm.organization.type = el
    },
    getAreaId (val) {
      this.ruleForm.areaId = val
    },
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          api[urlNames['createOrganization']](this.ruleForm).then((res) => {
            this.$message.success(`添加成功`)
            this.goBack()
          }, (error) => {

          })
        }
      })
    },
    goBack () {
      let breadcrumb = [...this.app.pageBreadcrumb]
      let currentPage = breadcrumb[breadcrumb.length - 1]
      breadcrumb.splice(-1, 1)
      this.SET_PAGE_BREADCRUMB(breadcrumb)
      this.$router.push(currentPage.parent)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
