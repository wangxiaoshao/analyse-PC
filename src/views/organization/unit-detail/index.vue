<template>
  <div class="form-content" v-loading="loading">
    <search-lable
      :openSearchFlag="openSearchFlag"
      :addInfo="addInfo"
      :default-list="defaultList"
      @close="getClose"
      @getTag="getTag"
    ></search-lable>
    <el-drawer
      title="选择区域"
      :visible.sync="areaFlag"
      :direction="'rtl'">
      <area-list
        @get-area="getAreaId"
        @close="close"
        v-model="ruleForm.areaId"></area-list>
    </el-drawer>
    <el-form :model="ruleForm" :disabled="disabledFlag" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="detail-title">
        <i class="imenu-icon fa fa-building-o big-icon" style="margin: 0px 5px;"></i>单位信息
      </div>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">基础信息</el-menu-item>
      </el-menu>
     <el-row>
       <el-col :span="12">
         <el-form-item label="单位名称" prop="organization.name" :rules="[{ required: true, message: '名称不能为空'}]">
           <el-input v-model="ruleForm.organization.name"></el-input>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
           <div class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('name') > -1 && ruleForm.organization.name !== oldFrom.organization.name">
             添加或修改该字段需要提交审核
           </div>
           </div>
         </el-form-item>
         <el-form-item label="单位其他名称" prop="organization.otherName">
           <el-input v-model="ruleForm.organization.otherName"></el-input>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
             <div class="tip-msg"
                  v-show="this.app.option.options.orgAuditFields.indexOf('otherName') > -1 && ruleForm.organization.otherName !== oldFrom.organization.otherName">
               添加或修改该字段需要提交审核
             </div>
           </div>
         </el-form-item>
         <el-form-item label="单位地址" prop="organization.address">
           <el-input v-model="ruleForm.organization.address"></el-input>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
           <div class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('address') > -1 && ruleForm.organization.address !== oldFrom.organization.address">
             添加或修改该字段需要提交审核
           </div>
           </div>
         </el-form-item>
         <el-form-item label="传真号码" prop="organization.fax">
           <el-input v-model="ruleForm.organization.fax"></el-input>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
           <div class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('fax') > -1 && ruleForm.organization.fax !== oldFrom.organization.fax">
             添加或修改该字段需要提交审核
           </div>
           </div>
         </el-form-item>
         <el-form-item label="统一单位信用编码" prop="organization.creditId">
           <el-input v-model="ruleForm.organization.creditId" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label=" 上级单位">
           <el-input v-model="parentName" :disabled="true"></el-input>
         </el-form-item>
         <el-form-item label=" 启用状态" prop="organization.removed">
           <el-switch v-model="ruleForm.organization.removed"></el-switch>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
             <div class="tip-msg"
                  v-show="this.app.option.options.orgAuditFields.indexOf('removed') > -1 && ruleForm.organization.removed !== oldFrom.organization.removed">
               添加或修改该字段需要提交审核
             </div>
           </div>
         </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="单位简称" prop="organization.shortName">
           <el-input v-model="ruleForm.organization.shortName"></el-input>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
             <div class="tip-msg"
                  v-show="this.app.option.options.orgAuditFields.indexOf('shortName') > -1 && ruleForm.organization.shortName !== oldFrom.organization.shortName">
               添加或修改该字段需要提交审核
             </div>
           </div>
         </el-form-item>
         <el-form-item label="单位电话" prop="organization.phone">
           <el-input v-model="ruleForm.organization.phone"></el-input>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
           <div class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('phone') > -1 && ruleForm.organization.phone !== oldFrom.organization.phone">
             添加或修改该字段需要提交审核
           </div>
           </div>
         </el-form-item>
         <el-form-item
           label="邮编"
           prop="organization.zipCode"
         >
           <el-input v-model="ruleForm.organization.zipCode" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" maxlength="6"></el-input>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
           <div class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('zipCode') > -1 && ruleForm.organization.zipCode !== oldFrom.organization.zipCode">
             添加或修改该字段需要提交审核
           </div>
           </div>
         </el-form-item>
         <el-form-item label="所属区域" prop="areaId">
            <!--选择区域组件-->
           <el-input v-model="ruleForm.areaId" style="display: none"></el-input>
           <el-input v-model="areaCheck" @focus="areaFlag = true"></el-input>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
           <div class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('areaId') > -1 && ruleForm.areaId !== oldFrom.areaId">
             添加或修改该字段需要提交审核
           </div>
           </div>
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
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
           <div class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('systemType') > -1 && ruleForm.organization.systemType !== oldFrom.organization.systemType">
             添加或修改该字段需要提交审核
           </div>
           </div>
         </el-form-item>
         <el-form-item label="所属类型" prop="organization.type">
           <el-select v-model="ruleForm.organization.type" @change="getType" placeholder="请选择所属类型">
             <el-option
               v-for="item in classOption"
               :key="item.id"
               :label="item.text"
               :value="item.value"></el-option>
           </el-select>
           <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
             <div class="tip-msg"
                  v-show="this.app.option.options.orgAuditFields.indexOf('type') > -1 && ruleForm.organization.type !== oldFrom.organization.type">
               添加或修改该字段需要提交审核
             </div>
           </div>
         </el-form-item>
       </el-col>
     </el-row>
      <el-row>
        <el-form-item label="单位标签">
          <el-tag
            v-for="(tag,index) in tagsName"
            :key="tag"
            type="info"
            closable
            :title="tag"
            v-model="ruleForm.labelId"
            @close="removeTag(tag,index)"
          >
            {{tag}}
          </el-tag>
          <el-tag class="add-tag-btn"
                  v-if="!disabledFlag"
                  @click="openSearchFlag = true">
            <i class="el-icon-plus"></i>添加标签
          </el-tag>
          <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
          <div class="tip-msg"
               v-show="this.app.option.options.orgAuditFields.indexOf('labelId') > -1 && ruleForm.labelId !== oldFrom.labelId">
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
          <el-form-item label="单位介绍" prop="ext01">
            <el-input type="textarea" v-model="ruleForm.organization.ext01"></el-input>
            <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
            <div class="tip-msg"
                 v-show="this.app.option.options.orgAuditFields.indexOf('ext01') > -1 && ruleForm.organization.ext01 !== oldFrom.organization.ext01">
              添加或修改该字段需要提交审核
            </div>
            </div>
          </el-form-item>
          <el-form-item label="申请原因" prop="reason">
            <el-input type="textarea" v-model="ruleForm.reason"></el-input>
            <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
            <div class="tip-msg"
                 v-show="this.app.option.options.orgAuditFields.indexOf('reason') > -1 && ruleForm.reason !== oldFrom.reason">
              添加或修改该字段需要提交审核
            </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位职责" prop="ext02">
            <el-input type="textarea" v-model="ruleForm.organization.ext02"></el-input>
            <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
            <div class="tip-msg"
                 v-show="this.app.option.options.orgAuditFields.indexOf('ext02') > -1 && ruleForm.organization.ext02 !== oldFrom.organization.ext02">
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
import dicOption from '@src/mixins/dic-options.js'
import searchLable from '../components/AddTags/index'
import areaList from '../components/AreaList/index'
import { mapState, mapMutations } from 'vuex'
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
      areaFlag: false,
      areaCheck: '',
      areaOptions: [],
      props: {
        multiple: false,
        children: 'children',
        label: 'name',
        value: 'id'
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
      areaOption: [],
      allAreaList: [],
      defaultList: [],
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
  comments: {
    ...mapState(['app'])
  },
  mounted () {
    this.setBreadcrumbTitle()
  },
  created () {
    // this.app.option.options.userAuditFields
    this.init()
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  methods: {
    ...mapMutations(['GET_OPTION']),
    init () {
      if (this.$route.name === 'UnitAdd' || this.$route.name === 'UnitEdit') {
        if (this.$route.name === 'UnitAdd') {
          this.oldFrom = JSON.parse(JSON.stringify(this.ruleForm))
        }
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
      } else {
        this.bindId = this.$route.params.id
        this.findLabel(1)
        this.getDetail()
      }
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
          if (this.$route.name === 'UnitEdit') {
            this.oldFrom = JSON.parse(JSON.stringify(this.ruleForm))
          }
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
        this.defaultList = res.data
        res.data.forEach((item) => {
          this.tagsName.push(item.name)
          this.ruleForm.labelId.push(item.id)
        })
      }, (error) => {
      })
    },
    removeTag (tag, index) {
      this.tagsName.splice(index, 1)
      this.ruleForm.labelId.splice(index, 1)
    },
    // 获取区域
    getArea (orgId) {
      api[urlNames['findOrgAreaList']]({
        orgId: orgId
      }).then((res) => {
        this.allAreaList = res.data
        this.findMenuByPath(res.data)
        this.ruleForm.areaId = this.areaOption[this.areaOption.length - 1].id
        this.areaOption.forEach((item) => {
          this.areaCheck += item.name + '/'
        })
      }, (error) => {
      })
    },
    getClose (val) {
      this.openSearchFlag = val
    },
    // 获取选中的标签
    getTag (val) {
      console.log('标签', val)
      const res = new Map()
      let tag = []
      val.forEach((item) => {
        this.tagsName.push(item.split('|')[1])
        tag.push(item.split('|')[0])
        console.log(item.split('|')[0])
      })
      this.tagsName = this.tagsName.filter(a => !res.has(a) && res.set(a, 1))
      let tagIdList = []
      tagIdList = tag.filter(a => !res.has(a) && res.set(a, 1))
      this.ruleForm.labelId = tagIdList
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
      this.areaCheck = val.name
      console.log(val)
      this.ruleForm.areaId = val.id
      // this.ruleForm.areaId = val
    },
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          api[urlNames['createOrganization']](this.ruleForm).then((res) => {
            this.$message.success(`保存成功`)
            this.goBack()
          }, (error) => {

          })
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    close () {
      this.areaFlag = false
    },
    findMenuByPath (list) {
      for (let item of list) {
        this.areaOption.push(item)
        if (item.children && item.children.length > 0) {
          this.findMenuByPath(item.children)
        } else {
        }
      }
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
