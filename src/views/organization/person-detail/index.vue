<template>
  <div class="person-detail-content">
   <div class="step-content">
     <el-steps :active="active" finish-status="success" simple>
       <el-step title="人员管理">
       </el-step>
       <el-step title="账号管理"></el-step>
     </el-steps>
   </div>
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
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item>基础信息</el-menu-item>
        </el-menu>
        <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="职务" prop="system">
            <el-select v-model="ruleForm.system" placeholder="请选择职务">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="tel">
            <el-input v-model="ruleForm.tel"></el-input>
          </el-form-item>
          <el-form-item label="身份类型" prop="system">
            <el-select v-model="ruleForm.system" placeholder="请选择身份类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item>完善其他信息</el-menu-item>
        </el-menu>
        <el-row>
          <el-col :span="12">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="ruleForm.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件照">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="身份证号" prop="tel">
              <el-input placeholder="请输入内容" v-model="ruleForm.tel">
                <el-button slot="append" type="success">1111</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
    </el-form>
    <el-form label-width="100px" class="demo-ruleForm">

    </el-form>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
export default {
  mixins: [ handleBreadcrumb ],
  data () {
    return {
      breadcrumbTitle: '',
      isShowEditFlag: false,
      disabledFlag: false,
      active: 0,
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
        parent: '',
        system: '',
        type: '',
        able: false,
        instruction: '',
        duties: '',
        reason: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  methods: {
    setBreadcrumbTitle () { // 设置面包屑title
      if (this.$route.name === 'PersonEdit' || this.$route.name === 'PersonAdd') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'NodeEdit') {
          this.breadcrumbTitle = '编辑人员'
        } else {
          this.breadcrumbTitle = '添加人员'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumbTitle = '人员详情'
      }
      this.pushBreadcrumb({
        name: this.breadcrumbTitle,
        parent: {
          name: 'OrganizationContent',
          query: {
            type: 'back'
          }
        }
      })
    },
    getCheckTags () {
      this.openAddTagFlag = false
      this.tags = this.checkTagGroup
    },
    next () {
      if (this.active++ > 2) this.active = 0
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  created () {
    this.setBreadcrumbTitle()
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
