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
        <i class="menu-icon fa fa-sitemap" style="margin: 0px 5px;"></i>单位信息
      </div>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">基础信息</el-menu-item>
      </el-menu>
     <el-row>
       <el-col :span="12">
         <el-form-item label="单位名称" prop="organization.name" :rules="[{ required: true, message: '名称不能为空'}]">
           <el-input v-model="ruleForm.organization.name"></el-input>
         </el-form-item>
         <el-form-item label="单位地址" prop="organization.address">
           <el-input v-model="ruleForm.organization.address"></el-input>
         </el-form-item>
         <el-form-item label="传真号码" prop="organization.fax">
           <el-input v-model="ruleForm.organization.fax"></el-input>
         </el-form-item>
         <el-form-item label="统一单位信用编码" prop="organization.creditId">
           <el-input v-model="ruleForm.organization.creditId" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label=" 上级单位">
           <el-input v-model="parentName" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label="所属类型" prop="organization.type">
           <el-select v-model="ruleForm.organization.type" @change="getType" placeholder="请选择所属类型">
             <el-option
               v-for="item in classOption"
               :key="item.id"
               :label="item.text"
               :value="item.value"></el-option>
           </el-select>
         </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="单位简称" prop="organization.shortName">
           <el-input v-model="ruleForm.organization.shortName"></el-input>
         </el-form-item>
         <el-form-item label="单位电话" prop="organization.phone">
           <el-input v-model="ruleForm.organization.phone"></el-input>
         </el-form-item>
         <el-form-item label="邮编" prop="organization.zipCode">
           <el-input v-model="ruleForm.organization.zipCode"></el-input>
         </el-form-item>
         <el-form-item label="所属区域" prop="areaId">
            <!--选择区域组件-->
           <el-input v-model="ruleForm.areaId" style="display: none"></el-input>
           <area-list @getAreaId="getAreaId"></area-list>
         </el-form-item>
         <el-form-item label="所属系统" prop="organization.systemType">
           <el-select v-model="ruleForm.organization.systemType" @change="getSystemType" placeholder="请选择所属系统">
             <el-option
               v-for="item in applicationOption"
               :key="item.id"
               :value="item.value"
               :label="item.text"
             ></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label=" 启用状态" prop="organization.removed" :rules="[{ required: true, message: '请选择启用状态 '}]">
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
          <el-tag class="add-tag-btn" v-if="!disabledFlag" @click="openSearchFlag = true"><i class="el-icon-plus"></i>添加标签</el-tag>
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
import dicOption from '@src/mixins/dic-options.js'
import searchLable from '../components/AddTags/index'
import areaList from '../components/AreaList/index'
export default {
  name: 'index',
  mixins: [ handleBreadcrumb, dicOption],
  components: { areaList, searchLable },
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
        name: '单位详情',
        parent: null
      },
      openSearchFlag: false,
      addInfo: {
        searchFlag: false,
        type: 1 // 1.单位，2、部门，3、人员
      },
      loading: false,
      isShowEditFlag: true,
      disabledFlag: false,
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
      }
    }
  },
  computed: {
  },
  mounted () {
    this.setBreadcrumbTitle()
  },
  created () {
    this.init()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  methods: {
    init () {
      api[urlNames['findViewNodeById']]({
        id: this.$route.params.parentId || this.$route.params.id
      }).then((res) => {
        this.getArea(res.data.bindId)
        if (res.data.bindId) {
          this.parentName = res.data.name
          this.bindId = res.data.bindId
          if (this.$route.name !== 'UnitAdd') {
            if (res.data.bindId === 2) {
              this.ruleForm.organization.parentId = res.data.bindId
            }
            this.ruleForm.nodeId = res.data.id
            this.findLabel(1)
            this.getDetail()
          } else {
            this.ruleForm.nodeId = res.data.id
            this.ruleForm.organization.parentId = res.data.bindId
          }
        } else {
          this.parentName = ''
          this.ruleForm.nodeId = res.data.id
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
      api[urlNames['findOrganizationById']](data).then((res) => {
        this.loading = false
        if (this.$route.name === 'UnitAdd') {
        } else {
          this.ruleForm.areaId = res.data.areaId
          this.ruleForm.labelId = res.data.labelId
          this.ruleForm.organization.address = res.data.address
          this.ruleForm.organization.name = res.data.name
          this.ruleForm.organization.address = res.data.address
          // this.ruleForm.nodeId = res.data.parentId
          // this.ruleForm.organization.parentId = ''
          this.ruleForm.organization.id = res.data.id
          this.ruleForm.organization.removed = res.data.removed
          this.ruleForm.organization.fax = res.data.fax
          this.ruleForm.organization.phone = res.data.phone
          this.ruleForm.organization.shortName = res.data.shortName
          this.ruleForm.organization.systemType = res.data.systemType
          this.ruleForm.organization.type = res.data.type
          this.ruleForm.organization.zipCode = res.data.zipCode
          this.ruleForm.organization.ext01 = res.data.ext01
          this.ruleForm.organization.ext02 = res.data.ext02
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
          this.tagsName.push(item.name)
          this.ruleForm.labelId.push(item.id)
        })
      }, (error) => {
      })
    },
    // 获取区域
    getArea (orgId) {
      api[urlNames['findOrgAreaList']]({
        orgId: orgId
      }).then((res) => {
        console.log(res.data)
      }, (error) => {
      })
    },
    getClose (val) {
      this.openSearchFlag = val
    },
    // 获取选中的标签
    getTag (val) {
      console.log('标签', val)
      let tag = []
      val.forEach((item) => {
        this.tagsName.push(item.split('|')[1])
        tag.push(item.split('|')[0])
        console.log(item.split('|')[0])
      })
      this.ruleForm.labelId = tag
    },
    setBreadcrumbTitle () { // 设置面包屑title
      if (this.$route.name === 'UnitEdit' || this.$route.name === 'UnitAdd') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'UnitEdit') {
          this.breadcrumb.name = '编辑单位'
        } else {
          this.breadcrumb.name = '添加单位'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumb.name = '单位详情'
      }
      this.pushBreadcrumb(this.breadcrumb)
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
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
