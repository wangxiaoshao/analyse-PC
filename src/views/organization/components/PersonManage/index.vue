<template>
  <div class="person-manage-content">
   <!-- <add-tags :tagsFlag="openAddTagFlag" @getFlag="getFlag"></add-tags>-->
    <!--人员管理-->
    <el-form :disabled="disabledFlag" ref="personFrom" label-width="100px" class="demo-personFrom" style="width: 100%">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item>基础信息</el-menu-item>
      </el-menu>
      <el-row class="row-item">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-autocomplete
              v-model="personFrom.name"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="职务" prop="dutyName">
            <el-input placeholder="请输入职务" v-model="personFrom.professionalTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="mobile">
            <el-input placeholder="请输入手机号" v-model="personFrom.mobile"></el-input>
          </el-form-item>
          <el-form-item label="身份类型" prop="type">
            <el-select placeholder="请选择身份类型" v-model="postFrom.type">
              <el-option
                v-for="item in userTypeOptions"
                :key="item.id"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item>完善其他信息</el-menu-item>
      </el-menu>
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
            <el-input placeholder="请输入备用手机号" v-model="personFrom.mobile2"></el-input>
          </el-form-item>
          <el-form-item label="民族" prop="nation">
            <el-select placeholder="请选择民族" v-model="personFrom.nation">
              <el-option
                v-for="item in userNationOptions"
                :key="item.id"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属党派" prop="politicalParty">
            <el-select placeholder="请选择所属党派" v-model="personFrom.politicalParty">
              <el-option
                v-for="item in partisanOptions"
                :key="item.id"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" 岗位" prop="postName">
            <el-input placeholder="请输入岗位" v-model="postFrom.postName"></el-input>
          </el-form-item>
          <el-form-item label=" 办公电话" prop="officePhone">
            <el-input placeholder="请输入办公电话" v-model="personFrom.officePhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件照">
            <el-upload
              class="avatar-uploader"
              :disabled="disabledFlag"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
            <el-input placeholder="请输入内容" v-model="personFrom.idcard">
              <el-button slot="append" v-if="!disabledFlag" type="success" class="form-btn">点击实名认证</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="学历" prop="qualification">
            <el-select placeholder="请选择学历" v-model="personFrom.qualification">
              <el-option
                v-for="item in userEducationOptions"
                :key="item.id"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职级" prop="positionClass">
            <el-select placeholder="请选择职级" v-model="personFrom.positionClass">
              <el-option
                v-for="item in userPankOptions"
                :key="item.id"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label=" 人员状态" prop="action">
            <el-select placeholder="请选择人员状态" v-model="personFrom.userState">
              <el-option
                v-for="item in userActionOptions"
                :key="item.id"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员类型" prop="userAccount" >
            <el-select placeholder="请选择人员类型" v-model="personFrom.userType">
              <el-option
                v-for="item in personTypeOptions"
                :key="item.id"
                :label="item.text"
                :value="item.value"
              ></el-option>
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
          <el-tag class="add-tag-btn" v-if="!disabledFlag" @click="openAddTagFlag =  true">
            <i class="el-icon-plus"></i>添加标签
          </el-tag>
        </el-form-item>
      </el-row>
      <el-row class="row-item">
        <el-col :span="12">
          <el-form-item label="人员介绍" prop="instruction">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="人员职责" prop="reason">
            <el-input type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import addTags from '../AddTags/index'
import dicOption from '@src/mixins/dic-options.js'
export default {
  props: ['disabledFlag', 'isShowEditFlag', 'userDetail', 'postDetail'],
  mixins: [dicOption],
  components: {
    addTags
  },
  data () {
    return {
      openAddTagFlag: false,
      option: [],
      restaurants: [],
      state: '',
      timeout: null,
      personFrom: this.userDetail,
      postFrom: this.postDetail,
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ]
      },
      imageUrl: '',
      tags: []
    }
  },
  created () {
    this.init()
  },
  computed: {

  },
  watch: {
    'personFrom.name': {
      handler (val) {
        if (val.length > 1) {
          this.restaurants = this.loadAll()
        }
      }
    }
  },
  methods: {
    init () {
      // this.getDicList(28) // 民族
    },
    loadAll () {
      api[urlNames['findUserByParams']]({
        name: this.personFrom.name
      }).then((res) => {
        this.restaurants = res.data
      }, (error) => {

      })
    },
    querySearchAsync (queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      console.log(item)
    },
    // 字典列表
    /* getDicList (id) {
      api[urlNames['dicList']]({
        id: id
      }).then((res) => {
        this.option = res.data
        console.log(this.option)
      }, (error) => {
      })
    }, */
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
    getFlag (val) {
      this.openAddTagFlag = val
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
