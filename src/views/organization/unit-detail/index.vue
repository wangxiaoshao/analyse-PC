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
           <el-input v-model="ruleForm.name"></el-input>
         </el-form-item>
         <el-form-item label="单位地址" prop="addr">
           <el-input v-model="ruleForm.addr"></el-input>
         </el-form-item>
         <el-form-item label="传真号码" prop="tel">
           <el-input v-model="ruleForm.fax"></el-input>
         </el-form-item>
         <el-form-item label="统一单位信用编码" prop="uiniteCode">
           <el-input v-model="ruleForm.uniteCode" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label=" 上级单位" prop="parentName">
           <el-input v-model="ruleForm.parentName" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="所属类型" prop="type">
           <el-select v-model="ruleForm.type" placeholder="请选择所属类型">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
         </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="单位简称" prop="shortName">
           <el-input v-model="ruleForm.shortName"></el-input>
         </el-form-item>
         <el-form-item label="单位电话" prop="tel">
           <el-input v-model="ruleForm.tel"></el-input>
         </el-form-item>
         <el-form-item label="邮编" prop="zipCode">
           <el-input v-model="ruleForm.zipCode"></el-input>
         </el-form-item>
         <el-form-item label="区域">
            <!--选择区域组件-->
           <area-list></area-list>
         </el-form-item>
         <el-form-item label="所属系统" prop="system">
           <el-select v-model="ruleForm.system" placeholder="请选择所属系统">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label=" 启用状态" prop="enable">
           <el-switch v-model="ruleForm.enable"></el-switch>
         </el-form-item>
       </el-col>
     </el-row>
      <el-row>
        <el-form-item label="单位标签">
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            type="info"
            closable
            :title="tag.name"
          >
            {{tag.name}}
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
            <el-input type="textarea" v-model="ruleForm.ext01"></el-input>
          </el-form-item>
          <el-form-item label="申请原因" prop="reason">
            <el-input type="textarea" v-model="ruleForm.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位职责" prop="ext02">
            <el-input type="textarea" v-model="ruleForm.ext02"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-show="isShowEditFlag">
        <el-button type="primary" @click="submitForm('ruleForm')">{{submitHtml}}</el-button>
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
        type: 3
      },
      loading: false,
      isShowEditFlag: true,
      disabledFlag: false,
      breadcrumbTitle: '添加节点',
      submitHtml: '保存',
      oldFrom: {},
      tagKeyWord: '',
      tags: [], // 提交的标签
      ruleForm: {
        name: '',
        shortName: '',
        addr: '',
        tel: '',
        fax: '',
        zipCode: '',
        uniteCode: '',
        parentName: '',
        parentId: '',
        system: '',
        type: '',
        enable: false,
        ext01: '',
        ext02: '',
        reason: '',
        uiniteCode: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        enable: [
          { required: true, message: '请选中启用状态', trigger: 'blur' }
        ],
        unitParent: [
          { required: true, message: '上级单位不能为空', trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  mounted () {
    this.setBreadcrumbTitle()
  },
  created () {
    this.getDetail()
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.setBreadcrumbTitle()
  },
  methods: {
    getDetail () {
      let data = {
        id: this.$route.params.id || this.$route.params.parentId
      }
      this.loading = true
      api[urlNames['findViewNodeById']](data).then((res) => {
        console.log(999999, res.data)
        this.loading = false
        let backId = ''
        if (this.$route.name === 'UnitAdd') {
          this.ruleForm.parentName = res.data.name
          backId = res.data.id
        } else {
          this.ruleForm.name = res.data.name
          this.ruleForm.parentName = res.data.parentName
          this.ruleForm.enable = res.data.removed
          backId = res.data.parentId
        }
        /* if (this.ruleForm.parentId === '-1') {
          this.backId = this.ruleForm.id
        } else {
          this.backId = this.ruleForm.parentId
        } */
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
      }, (error) => {
        this.$message.error(`没有内容`)
      })
    },
    getClose (val) {
      this.openSearchFlag = val
    },
    // 获取选中的标签
    getTag (val) {
      val.forEach((item) => {
        this.tags.push(item)
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
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            reason: this.ruleForm.reason,
            nodeId: this.ruleForm.parentId,
            areaId: '2400',
            labelId: [],
            organization: {
              nodeType: 3,
              zipCode: this.ruleForm.zipCode, // 邮编
              address: this.ruleForm.addr,
              ext01: this.ruleForm.ext01,
              ext02: this.ruleForm.ext02,
              type: 1,
              creditId: this.ruleForm.uiniteCode,
              removed: this.ruleForm.enable,
              phone: this.ruleForm.tel,
              systemType: this.ruleForm.system,
              id: this.$route.params.id,
              parentId: this.ruleForm.parentId || this.$route.params.parentId,
              name: this.ruleForm.name,
              otherName: this.ruleForm.shortName,
              enable: true,
              fax: this.ruleForm.fax
            }
          }
          api[urlNames['createOrganization']](data).then((res) => {
            this.$message.success(`添加成功`)
            console.log(res)
          }, (error) => {

          })
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
