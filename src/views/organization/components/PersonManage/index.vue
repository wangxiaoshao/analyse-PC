<template>
  <div class="person-manage-content">
    <add-tags
      :openSearchFlag="openSearchFlag"
      :addInfo="addInfo"
      @close="getClose"
      @getTag="getTag"
      :delSelectLabelId="delSelectLabelId"
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
              ref="popover"
              width="500"
            >
              <el-input
                v-popover:popover
                slot="reference"
                placeholder="请输入姓名"
                :disabled="isDefaultFlag"
                v-model="userDetail.name"
                @blur="blur"
                @input="loadSearch"
                @keyup.enter.native="loadSearch"></el-input>
              <div class="result-list" v-if="searchFlag">
                <div class="default-warn" style="color: #FF6633">
                  <i class="el-icon-warning"></i>
                  若您是为同一个人开通兼职帐号，直接选择以下人员进行帐号开通
                </div>
                <el-table
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
                   v-show="this.app.option.options.userAuditFields.indexOf('name') > -1 && userDetail.name !== oldUserInfo.user.name">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
          <el-form-item label="职务" prop="dutyName">
            <el-input
              placeholder="请输入职务"
              v-model="postDetail.dutyName"  @focus="showdutyNameList"></el-input>
            <span style="font-size: 12px;position: relative;top:-7px;color: #8c939d;">请先选择再输入,职务以逗号隔开</span>
            <el-popover
              placement="bottom"
              width="160"
              v-model="dutyNameSelectVisible">
              <div>
                <el-button size="mini" @click="dutyNameSelectVisible = false">关闭</el-button>
                <el-checkbox-group  @change="selectDutyName" size="medium" v-model="dutyNameCheckd">
                  <el-checkbox style="display: block" v-for="item in dutyNameTypeOptions" :value="item.text" :label="item.text"  :key="item.text"></el-checkbox>
                </el-checkbox-group>
              </div>
            </el-popover>
            <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
              <div class="tip-msg" style="right: 0"
                   v-show="this.app.option.options.userAuditFields.indexOf('dutyName') > -1 && postDetail.dutyName !== oldUserInfo.identity.dutyName">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
              <el-input placeholder="请输入内容" :disabled="isDefaultFlag" v-model="userDetail.idcard">
                <el-button slot="append" v-if="!disabledFlag" type="success" class="form-btn">点击实名认证</el-button>
              </el-input>
              <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                <div class="tip-msg"
                     v-show="this.app.option.options.userAuditFields.indexOf('idcard') > -1 && userDetail.idcard !== oldUserInfo.user.idcard">
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
                   v-show="this.app.option.options.userAuditFields.indexOf('mobile') > -1 && userDetail.mobile !== oldUserInfo.user.mobile">
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
                   v-show="this.app.option.options.userAuditFields.indexOf('userType') > -1 && userDetail.userType !== oldUserInfo.user.userType">
                添加或修改该字段需要提交审核
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>

      <el-collapse>
        <el-collapse-item name="1" title="完善其他信息">
          <el-row>
            <el-form-item label="头像">
              <el-upload
                :disabled="disabledFlag"
                class="avatar-uploader"
                :action="'http://' + uploadHost + '/api/jg_manage/image/upload?_='+downloadBinaryFile()[0]+'&sign='+downloadBinaryFile()[1]"
                :show-file-list="false"
                name="files"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="personFrom.portraitUrl" :src="personFrom.portraitUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div style="font-size: 10px;color: #606266"><span style="color: #FC7049">*</span>只支持jpg格式，100*100像素的图片</div>
            </el-form-item>
          </el-row>
          <el-row class="row-item">
            <el-col :span="12">
              <el-form-item label="备用手机号" prop="mobile2">
                <el-input
                  placeholder="请输入备用手机号"
                  :disabled="isDefaultFlag"
                  v-model="userDetail.mobile2"></el-input>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="this.app.option.options.userAuditFields.indexOf('mobile2') > -1 && userDetail.mobile2 !== oldUserInfo.user.mobile2">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('nation') > -1 && userDetail.nation !== oldUserInfo.user.nation">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('sex') > -1 && userDetail.sex !== oldUserInfo.user.sex">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('politicalParty') > -1 && userDetail.politicalParty !== oldUserInfo.user.politicalParty">
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
                         v-show="this.app.option.options.userAuditFields.indexOf('userType') > -1 && userDetail.userType !== oldUserInfo.user.userType ">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('officePhone') > -1 && userDetail.officePhone !== oldUserInfo.user.officePhone">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('qualification') > -1 && userDetail.qualification !== oldUserInfo.user.qualification">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('positionClass') > -1 && userDetail.positionClass !== oldUserInfo.user.positionClass">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label=" 人员状态" prop="userState">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('userState') > -1 && userDetail.userState !== oldUserInfo.user.userState">
                    添加或修改该字段需要提交审核
                  </div>
                </div>
              </el-form-item>
              <el-form-item label=" 岗位" prop="postName">
                <el-input placeholder="请输入岗位" v-model="postDetail.postName"></el-input>
                <div v-if="this.$route.name === 'PersonEdit' ||  this.$route.name === 'PersonAdd'">
                  <div class="tip-msg"
                       v-show="this.app.option.options.userAuditFields.indexOf('postName') > -1 && postDetail.postName !== oldUserInfo.identity.postName">
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
                v-for="(tag,index) in tagsName"
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
                     v-show="this.app.option.options.userAuditFields.indexOf('labelId') > -1 && sendLabelId !== oldUserInfo.labelId">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('ext01') > -1 && userDetail.ext01 !== oldUserInfo.user.ext01">
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
                       v-show="this.app.option.options.userAuditFields.indexOf('ext02') > -1 && userDetail.ext02 !== oldUserInfo.user.ext02">
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
import uploadFile from '@src/mixins/uploadFile.js'
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['disabledFlag', 'isShowEditFlag', 'userDetail', 'postDetail', 'isDefaultFlag', 'userAuditFields', 'oldUserInfo', 'labelId', 'labelList'],
  mixins: [dicOption, uploadFile],
  components: {
    addTags
  },
  data () {
    return {
      dutyNameCheckd: [],
      dutyNameSelectVisible: false,
      uploadUrl: '',
      uploadHost: window.location.host,
      openSearchFlag: false,
      option: [],
      restaurants: [],
      state: '',
      timeout: null,
      personFrom: this.userDetail,
      postFrom: this.postDetail,
      imageUrl: '',
      tagsName: [],
      delSelectLabelId: null, // 添加后未提交到后台移除的标签
      tempLabelId: [],
      sendLabelId: this.labelId,
      list: [],
      searchFlag: false,
      loadFlag: true,
      openMoreFlag: false,
      addInfo: {
        searchFlag: false,
        type: 3 // 1.单位，2、部门，3、人员
      },
      timer: null,
      showPopoverFlag: false,
      rules: {
        dutyName: [
          { required: true, message: '职务不能为空' }
        ]
      }
    }
  },
  created () {
    this.init()
  },
  comments: {
    ...mapState(['app'])
  },
  methods: {
    ...mapMutations(['GET_OPTION']),
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
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        this.timer = setTimeout(() => {
          this.showPopoverFlag = true
          this.searchFlag = true
          this.loadFlag = true
          api[urlNames['findUserByParams']]({
            name: this.personFrom.name
          }).then((res) => {
            if (res.data.length !== 0) {}
            this.loadFlag = false
            this.list = res.data
          }, (error) => {
            this.list = []
          })
        }, 800)
      } else {
        this.searchFlag = false
        this.showPopoverFlag = false
        this.timer = null
      }
    },
    blur () {
      this.timer = null
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
      this.personFrom.portraitUrl = res.data[0] || URL.createObjectURL(file.raw)
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let data = new FormData()
          let keys = Object.keys(this.editForm)
          let len = keys.length
          for (let i = 0; i < len; i++) {
            let key = keys[i]
            let value = this.editForm[key]
            if (value) {
              data.append(key, value)
            }
          }
          api[urlNames['sendEditRightsInfo']](data).then((res) => {
            this.$message({
              message: this.current ? '修改成功' : '添加成功',
              type: 'success'
            })
            this.$emit('refreshList')
            this.closeDialog()
          }, (error) => {

          })
        }
      })
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
      const res = new Map()
      let tag = []
      val.forEach((item) => {
        this.tagsName.push(item.split('|')[1])
        tag.push(item.split('|')[0])
      })
      this.tagsName = this.tagsName.filter(a => !res.has(a) && res.set(a, 1))
      this.sendLabelId = tag.filter(a => !res.has(a) && res.set(a, 1))
      // this.ruleForm.labelId = tagIdList
      /* val.forEach((item) => {
        this.tagsName.push(item.split('|')[1])
        this.sendLabelId.push(item.split('|')[0])
      }) */
      this.$emit('get-label', this.sendLabelId)
    },
    removeTag (tag, index) {
      let that = this
      let lIds = []
      lIds = that.tempLabelId.filter(function (item) {
        return item === that.sendLabelId[index]
      })
      if (lIds.length !== 0) {
        that.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api[urlNames['deleteUserLabelOrDeptLabelOrOrgLabel']]({
            id: that.oldUserInfo.userId,
            type: 3,
            labelId: that.sendLabelId[index]
          }).then((res) => {
            if (res.status === 0) {
              that.$message.success('删除成功')
              that.tagsName.splice(index, 1)
              that.sendLabelId.splice(index, 1)
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        that.delSelectLabelId = that.sendLabelId[index] + '|' + that.tagsName[index]
        that.sendLabelId.splice(index, 1)
        that.tagsName.splice(index, 1)
      }
      that.$emit('get-label', that.sendLabelId)
    },
    next (userDetail) {
      if (userDetail.name === '') {
        this.$message.success('请填写用户名称')
      }
      this.$refs[userDetail].validate((valid) => {
        if (valid) {
          this.$emit('get-post', this.postFrom)
          this.$emit('get-user', this.personFrom)
        } else {
          this.$message.warning(`请填写必填字段`)
          return false
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    handleSelect (item) {
      console.log(item)
    },
    showdutyNameList () {
      this.dutyNameSelectVisible = true
    },
    hidedutyNameList () {
      this.dutyNameSelectVisible = false
    },
    selectDutyName () {
      this.postDetail.dutyName = JSON.parse(JSON.stringify(this.dutyNameCheckd)).toString()
    }
  },
  watch: {
    labelList (val) {
      val.forEach((item) => {
        this.tagsName.push(item.name)
        this.sendLabelId.push(item.id)
      })
      this.tempLabelId = JSON.parse(JSON.stringify(this.sendLabelId))
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
