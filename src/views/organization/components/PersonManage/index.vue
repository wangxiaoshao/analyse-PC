<template>
  <div class="person-manage-content">
    <add-tags
      :openSearchFlag="openSearchFlag"
      :addInfo="addInfo"
      @close="getClose"
      @getTag="getTag"
    ></add-tags>
    <!--人员管理-->
    <el-form
      :model="userDetail" :disabled="disabledFlag" ref="userDetail"
      label-width="100px"
      class="demo-personFrom"
      style="width: 100%">
      <el-row class="row-item">
        <el-col :span="12" style="position: relative">
          <el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '姓名不能为空'}]">
            <el-popover
              placement="bottom-start"
              width="500"
              trigger="click"
            >
              <el-input
                placeholder="请输入姓名"
                :disabled="isDefaultFlag"
                v-model="userDetail.name"
                id="nameSearch"
                slot="reference"
                @input="loadSearch"></el-input>
              <div class="result-list">
                <div class="default-warn" style="color: #FF6633">
                  <i class="el-icon-warning"></i>
                  若您是为同一个人开通兼职帐号，直接选择以下人员进行帐号开通
                </div>
                <el-table
                  v-if="searchFlag"
                  v-loading="loadFlag"
                  max-height="200"
                  :data="list"
                  @row-click="selectRow"
                  :show-header="true">
                  <el-table-column property="name" label="姓名">
                    <template slot-scope="scope">
                      <span :title="scope.row.name" class="table-span">{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column property="orgName" label="单位名称">
                    <template slot-scope="scope">
                      <span :title="scope.row.orgName" class="table-span">{{scope.row.orgName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column property="duty" label="职位">
                    <template slot-scope="scope">
                      <span :title="scope.row.duty" class="table-span">{{scope.row.duty}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-popover>
            <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
              <div class="tip-msg"
                   v-show="userAuditFields.indexOf('name') > -1 && userDetail.name !== oldUserInfo.user.name">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
          <el-form-item label="职务" prop="professionalTitle" :rules="[{ required: true, message: '职务不能为空'}]">
            <el-input
              placeholder="请输入职务"
              v-model="userDetail.professionalTitle"></el-input>
            <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
              <div class="tip-msg"
                   v-show="userAuditFields.indexOf('professionalTitle') > -1 && userDetail.professionalTitle !== oldUserInfo.user.professionalTitle">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="手机号"
            prop="mobile"
            :rules="[{ required: true, message: '手机号不能为空'}]"
          >
            <el-input
              placeholder="请输入手机号"
              :disabled="isDefaultFlag"
              v-model="userDetail.mobile"></el-input>
            <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
              <div class="tip-msg"
                   v-show="userAuditFields.indexOf('mobile') > -1 && userDetail.mobile !== oldUserInfo.user.mobile">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
          <!--:rules="[{ required: true, message: '请选择身份类型'}]"-->
          <el-form-item label="身份类型" prop="userType" :rules="[{ required: true, message: '请选择身份类型'}]">
            <el-select placeholder="请选择身份类型" v-model="userDetail.userType" @change="getIdentityType">
              <el-option
                v-for="item in userTypeOptions"
                :key="item.id"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
            <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
              <div class="tip-msg"
                   v-show="userAuditFields.indexOf('userType') > -1 && userDetail.userType !== oldUserInfo.user.userType">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-collapse>
        <el-collapse-item name="1" title="完善其他信息">
          <el-row class="row-item">
            <el-col :span="12">
              <el-form-item label="头像">
                <el-upload
                  :disabled="disabledFlag"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="备用手机号" prop="mobile2">
                <el-input
                  placeholder="请输入备用手机号"
                  :disabled="isDefaultFlag"
                  v-model="userDetail.mobile2"></el-input>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('mobile2') > -1 && userDetail.mobile2 !== oldUserInfo.user.mobile2">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="民族" prop="nation">
                <el-select
                  placeholder="请选择民族"
                  :disabled="isDefaultFlag"
                  @change="getNation"
                  v-model="userDetail.nation">
                  <el-option
                    v-for="item in userNationOptions"
                    :key="item.id"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('nation') > -1 && userDetail.nation !== oldUserInfo.user.nation">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="性别"  prop="sex">
                <el-select
                  placeholder="请选择性别"
                  :disabled="isDefaultFlag"
                  @change="getSex"
                  v-model="userDetail.sex">
                  <el-option
                    v-for="item in userSexOptions"
                    :key="item.id"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('sex') > -1 && userDetail.sex !== oldUserInfo.user.sex">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="所属党派" prop="politicalParty">
                <el-select
                  placeholder="请选择所属党派"
                  :disabled="isDefaultFlag"
                  @change="getPolicalParty"
                  v-model="userDetail.politicalParty">
                  <el-option
                    v-for="item in partisanOptions"
                    :key="item.id"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('politicalParty') > -1 && userDetail.politicalParty !== oldUserInfo.user.politicalParty">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="人员类型" prop="userAccount" >
                <el-select
                  placeholder="请选择人员类型"
                  @change="getUserType"
                  v-model="userDetail.userType">
                  <el-option
                    v-for="item in personTypeOptions"
                    :key="item.id"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                  <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                    <div class="tip-msg"
                         v-show="userAuditFields.indexOf('userType') > -1 && userDetail.userType !== oldUserInfo.user.userType ">
                      添加或修改该字段需要提交审核
                    </div>
                  </div>
              </el-form-item>
              <el-form-item label=" 办公电话" prop="officePhone">
                <el-input
                  placeholder="请输入办公电话"
                  :disabled="isDefaultFlag"
                  v-model="userDetail.officePhone"></el-input>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('officePhone') > -1 && userDetail.officePhone !== oldUserInfo.user.officePhone">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件照">
                <el-upload
                  class="avatar-uploader"
                  :disabled="isDefaultFlag"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="身份证号" prop="idcard">
                <el-input placeholder="请输入内容" :disabled="isDefaultFlag" v-model="userDetail.idcard">
                  <el-button slot="append" v-if="!disabledFlag" type="success" class="form-btn">点击实名认证</el-button>
                </el-input>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('idcard') > -1 && userDetail.idcard !== oldUserInfo.user.idcard">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="学历" prop="qualification">
                <el-select
                  placeholder="请选择学历"
                  :disabled="isDefaultFlag"
                  @change="getQualification"
                  v-model="userDetail.qualification">
                  <el-option
                    v-for="item in userEducationOptions"
                    :key="item.id"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('qualification') > -1 && userDetail.qualification !== oldUserInfo.user.qualification">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="职级" prop="positionClass">
                <el-select
                  placeholder="请选择职级"
                  @change="getPositionClass"
                  :disabled="isDefaultFlag"
                  v-model="userDetail.positionClass">
                  <el-option
                    v-for="item in userPankOptions"
                    :key="item.id"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('positionClass') > -1 && userDetail.positionClass !== oldUserInfo.user.positionClass">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label=" 人员状态" prop="action">
                <el-select
                  placeholder="请选择人员状态"
                  :disabled="isDefaultFlag"
                  @change="getUserState"
                  v-model="userDetail.userState">
                  <el-option
                    v-for="item in userActionOptions"
                    :key="item.id"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('userState') > -1 && userDetail.userState !== oldUserInfo.user.userState">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label=" 岗位" prop="postName">
                <el-input placeholder="请输入岗位" v-model="postDetail.postName"></el-input>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('postName') > -1 && postDetail.postName !== oldUserInfo.identity.postName">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="人员标签">
              <el-tag
                v-model="sendLabelId"
                v-for="tag in tagsName"
                :key="tag"
                type="info"
                closable
                :title="tag"
                @close="removeTag(tag,index)"
              >
                {{tag}}
              </el-tag>
              <el-tag class="add-tag-btn" v-if="!disabledFlag" @click="openSearchFlag = true">
                <i class="el-icon-plus"></i>添加标签
              </el-tag>
              <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                <div class="tip-msg"
                     v-show="userAuditFields.indexOf('labelId') > -1 && sendLabelId !== oldUserInfo.labelId">
                  添加或修改该字段需要提交审核
                </div>
              </div>
            </el-form-item>
          </el-row>
          <el-row class="row-item">
            <el-col :span="12">
              <el-form-item label="人员介绍" prop="instruction">
                <el-input type="textarea" v-model="userDetail.ext01" :disabled="isDefaultFlag"></el-input>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('ext01') > -1 && userDetail.ext01 !== oldUserInfo.user.ext01">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="人员职责" prop="reason">
                <el-input type="textarea" v-model="userDetail.ext02" :disabled="isDefaultFlag"></el-input>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="userAuditFields.indexOf('ext02') > -1 && userDetail.ext02 !== oldUserInfo.user.ext02">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <el-footer class="add-person-footer">
     <span v-if="this.$route.name === 'PersonAdd' || this.$route.name === 'PersonEdit'">
        <el-button type="primary" @click="next('userDetail')" :disabled="false">下一步</el-button>
        <el-button @click="goBack">取消</el-button>
     </span>
    </el-footer>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import addTags from '../AddTags/index'
import dicOption from '@src/mixins/dic-options.js'
export default {
  props: ['disabledFlag', 'isShowEditFlag', 'userDetail', 'postDetail', 'isDefaultFlag', 'userAuditFields', 'oldUserInfo', 'labelId'],
  mixins: [dicOption],
  components: {
    addTags
  },
  data () {
    return {
      openSearchFlag: false,
      option: [],
      restaurants: [],
      state: '',
      timeout: null,
      personFrom: this.userDetail,
      postFrom: this.postDetail,
      imageUrl: '',
      tagsName: [],
      sendLabelId: this.labelId,
      list: [],
      searchFlag: false,
      loadFlag: true,
      openMoreFlag: false,
      addInfo: {
        searchFlag: false,
        type: 3 // 1.单位，2、部门，3、人员
      }
    }
  },
  created () {
    this.init()
  },
  computed: {
  },
  watch: {
    focusFlag (newVal) {
      alert(newVal)
    }
  },
  methods: {
    init () {

    },
    // 搜索表格点击当前行
    selectRow (val) {
      let uid = val.uid
      this.searchFlag = false
      this.$emit('get-uid', uid)
      this.$emit('get-defauf', true)
    },
    // 搜索数据
    loadSearch () {
      this.searchFlag = false
      if (this.$route.name === 'PersonAdd' && this.personFrom.name.length > 1) {
        this.searchFlag = true
        this.loadFlag = true
        setTimeout(() => {
          api[urlNames['findUserByParams']]({
            name: this.personFrom.name
          }).then((res) => {
            this.loadFlag = false
            this.list = res.data
            console.log(this.list)
          }, (error) => {
            this.list = []
          })
        }, 500)
      } else {
        this.searchFlag = false
      }
    },
    // 选择身份类型
    getIdentityType (val) {
      this.postFrom.type = val
    },
    // 选择民族
    getNation (val) {
      this.personFrom.nation = val
    },
    // 选择学历
    getQualification (val) {
      this.personFrom.qualification = val
    },
    // 选择性别
    getSex (val) {
      this.personFrom.sex = val
    },
    // 选择职级
    getPositionClass (val) {
      this.personFrom.positionClass = val
      console.log(this.personFrom.positionClass)
    },
    // 选择党派
    getPolicalParty (val) {
      this.personFrom.politicalParty = val
    },
    // 选择人员状态
    getUserState (val) {
      this.personFrom.userState = val
    },
    // 选择人员类型
    getUserType (val) {
      this.personFrom.userType = val
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
    getClose (val) {
      this.openSearchFlag = val
    },
    getTag (val) {
      val.forEach((item) => {
        this.tagsName.push(item.split('|')[1])
        this.sendLabelId.push(item.split('|')[0])
      })
      this.$emit('get-label', this.sendLabelId)
    },
    removeTag (tag, index) {
      this.tagsName.splice(index, 1)
      this.sendLabelId.splice(index, 1)
      this.$emit('get-label', this.sendLabelId)
    },
    next (userDetail) {
      this.$refs[userDetail].validate((valid) => {
        if (valid) {
          this.$emit('get-post', this.postFrom)
          this.$emit('get-user', this.personFrom)
        } else {
          console.log('error submit!!')
          return false
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
