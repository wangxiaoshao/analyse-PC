<template>
  <div class="form-content">
    <el-dialog title="选择标签" :visible.sync="openAddTagFlag">
      <el-input placeholder="请输入内容" v-model="tagKeyWord" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <div class="tag-content">
        <el-checkbox-group
          v-model="checkTagGroup">
          <el-checkbox
            v-for="item in searchTags"
            border
            :label="item.name"
            :title="item.name"
            :key="item.name"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openAddTagFlag = false">取 消</el-button>
        <el-button type="primary" @click="getCheckTags">确 定</el-button>
      </span>
    </el-dialog>
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
         <el-form-item label=" 上级单位" prop="unitParent">
           <el-input v-model="ruleForm.unitParent" :disabled="true"></el-input>
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
         <el-form-item label="区域" prop="name">
           <el-cascader
             :options="options"
             filterable
           ></el-cascader>
         </el-form-item>
         <el-form-item label="所属系统" prop="system">
           <el-select v-model="ruleForm.system" placeholder="请选择所属系统">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label=" 启用状态" prop="able">
           <el-switch v-model="ruleForm.able"></el-switch>
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
          <el-tag class="add-tag-btn" @click="openAddTagFlag =  true"><i class="el-icon-plus"></i>添加标签</el-tag>
        </el-form-item>
      </el-row>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">扩展属性</el-menu-item>
      </el-menu>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位介绍" prop="instruction">
            <el-input type="textarea" v-model="ruleForm.instruction"></el-input>
          </el-form-item>
          <el-form-item label="申请原因" prop="reason">
            <el-input type="textarea" v-model="ruleForm.reason"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位职责" prop="duties">
            <el-input type="textarea" v-model="ruleForm.duties"></el-input>
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
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
export default {
  name: 'index',
  mixins: [ handleBreadcrumb ],
  data () {
    return {
      isShowEditFlag: true,
      disabledFlag: false,
      breadcrumbTitle: '添加节点',
      submitHtml: '保存',
      oldFrom: {},
      openAddTagFlag: false,
      tagKeyWord: '',
      searchTags: [], // 搜索标签结果
      checkTagGroup: [], // 选中的标签
      tags: [], // 提交的标签
      ruleForm: {
        name: '',
        shortName: '',
        addr: '',
        tel: '',
        fax: '',
        zipCode: '',
        uniteCode: '',
        unitParent: '',
        system: '',
        type: '',
        able: false,
        instruction: '',
        duties: '',
        reason: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入单位名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  methods: {
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
      // 设置返回路由
      this.pushBreadcrumb({
        name: this.breadcrumbTitle,
        parent: {
          name: 'Organization',
          query: {
            type: 'back'
          }
        }
      })
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
    getCheckTags () {
      this.openAddTagFlag = false
      this.tags = this.checkTagGroup
    }
  },
  mounted () {
    this.setBreadcrumbTitle()
  },
  created () {
  },
  computed: {
  },
  watch: {
    $route: {
      handler (val) {
        this.setBreadcrumbTitle()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
