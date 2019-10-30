<template>
  <div class="person-detail-content">
   <div class="step-content operator-row">
     <el-steps :active="1" finish-status="success" simple>
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
    <el-container :max-height="tableMaxHeight">
      <!--人员管理-->
      <el-form v-if="active = 0" :model="ruleForm" :disabled="disabledFlag" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width: 100%">
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
            <el-form-item label="民族" prop="system">
              <el-select v-model="ruleForm.system" placeholder="请选择民族">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属党派" prop="system">
              <el-select v-model="ruleForm.system" placeholder="请选择所属党派">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" 岗位" prop="system">
              <el-select v-model="ruleForm.system" placeholder="请选择岗位">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" 办公电话" prop="tel">
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
                <el-button slot="append" type="success" class="form-btn">点击实名认证</el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="学历" prop="system">
              <el-select v-model="ruleForm.system" placeholder="请选择学历">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职级" prop="system">
              <el-select v-model="ruleForm.system" placeholder="请选择职级">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" 人员状态" prop="system">
              <el-select v-model="ruleForm.system" placeholder="请选择人员状态">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="人员类型" prop="system">
              <el-select v-model="ruleForm.system" placeholder="请选择人员类型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="部门标签">
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="人员介绍" prop="instruction">
              <el-input type="textarea" v-model="ruleForm.instruction"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="人员职责" prop="reason">
              <el-input type="textarea" v-model="ruleForm.reason"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--账号管理-->
      <div v-if="active = 1" style="width: 100%">
        <div class="set-default">
          <div class="default-warn"><i class="el-icon-warning"></i>默认帐号用于您一个帐号全站都能使用，若遇到不能使用的业务系统，请切换身份类型即可。</div>
          设置默认帐号
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in accountOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-collapse v-model="activeName" accordion class="account-list">
          <el-collapse-item title="账号：chengyu" name="1">
            <bind-system></bind-system>
          </el-collapse-item>
        </el-collapse>
        <el-button><i class="el-icon-plus el-icon--left">创建账号</i></el-button>
        <el-form label-width="100px" :model="addAccount">
          <el-form-item label="登录帐号">
            <el-input v-model="addAccount.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-container>
    <el-footer class="add-person-footer">
      <el-button type="primary" @click="next">下一步</el-button>
      <el-button>取消</el-button>
    </el-footer>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import handleTable from '@src/mixins/handle-table'
import bindSystem from '../components/bindSystem/index'
export default {
  mixins: [ handleBreadcrumb, handleTable ],
  components: {
    bindSystem
  },
  data () {
    return {
      breadcrumbTitle: '',
      isShowEditFlag: false,
      disabledFlag: false,
      active: 1,
      openAddTagFlag: false,
      activeName: '1',
      tagKeyWord: '',
      accountOptions: [], // 账号
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
    },
    goBack () {
      this.$emit('go-back')
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
