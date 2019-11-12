<template>
  <div class="create-app-management">
    <div class="to-log">
      <el-button type="primary" @click="toDataLog">查看数据推送日志</el-button>
    </div>
    <el-form ref="ruleForm"   :rules="rules" :model="appFrom" label-width="120px">
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="应用名称" prop="name">
              <el-input placeholder="应用名称请输入" v-model="appFrom.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="绑定视图" prop="viewId">
<!--              <el-autocomplete-->
<!--                v-model="appFrom.viewId"-->
<!--                placeholder="请输入内容"-->
<!--                @select="handleSelect"-->
<!--                width="100%"-->
<!--              ></el-autocomplete>-->
              <el-select  v-model="appFrom.viewId" placeholder="请选择视图">
                <el-option label="视图1" :value="1">视图1</el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="应用接口账号" prop="apiAccount">
              <el-input placeholder="请输入应用接口账号" style="ime-mode:disabled;" v-model="appFrom.apiAccount"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="接口账号密码" prop="apiPassword">
              <el-input maxlength="18"  minlength="6" placeholder="请输入接口账号6-18位密码" v-model="appFrom.apiPassword" show-password></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="联系人" prop="concatUser">
              <el-input placeholder="请输入联系人" v-model="appFrom.concatUser"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="联系电话" prop="concatPhone">
              <el-input placeholder="请输入联系电话" v-model="appFrom.concatPhone"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="应用访问地址" prop="apiUrl">
              <el-input placeholder="请输入应用访问地址"  v-model="appFrom.apiUrl"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="备注说明" prop="description">
              <el-input placeholder="请输入备注说明"  v-model="appFrom.description"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="启用状态">
        <el-switch v-model="appFrom.removed"></el-switch>
      </el-form-item>
      <el-form-item align="center">
        <el-button v-if="$route.query.id=== undefined" type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
        <el-button v-if="$route.query.id!== undefined" type="primary" @click="onSubmit('ruleForm')">修改</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
export default {
  name: 'CreateAppManagement',
  mixins: [handleTable, handleBreadcrumb],
  mounted () {
    this.pushBreadcrumb({
      name: '创建接入应用',
      parent: {
        name: 'AppManagement',
        query: {
          type: 'back'
        }
      }
    })
  },
  data () {
    // 验证密码
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validPhone = (rule, value, callback) => {
      let reg = '/^1[3|4|5|7|8][0-9]\\d{8}$/'
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      viewList: [],
      appFrom: {
        id: '',
        name: '',
        viewId: 1,
        apiAccount: '',
        apiPassword: '',
        concatUser: '',
        concatPhone: '',
        apiUrl: '',
        description: '',
        removed: true
      },
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        apiAccount: [
          { required: true, message: '请输填写应用接口账号', trigger: 'blur' }
        ],
        apiPassword: [
          { required: true, validator: validatePass, message: '请输填写应用接口账号', trigger: 'blur' }
        ],
        viewId: [
          { required: true, message: '请选择视图ID', trigger: 'change' }
        ],
        concatUser: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        concatPhone: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        apiUrl: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    if (this.$route.query.id !== undefined) {
      this.getAppDetail(this.$route.query.id)
    }
  },
  methods: {
    toDataLog () {
      this.$router.push({ path: '/data-log' })
    },
    back () {
      this.$router.push({ name: 'AppManagement' })
    },
    getViewList (page, limt) {
      api[urlNames['getViewList']]({
        page: page,
        limit: limt
      }).then((res) => {
        this.viewList = res.data
      })
    },
    onSubmit (ref) {
      if (this.$route.query.id === undefined) {
        this.createApp()
      } else if (this.$route.query.id !== undefined) {
        this.updateApp()
      }
    },
    createApp () {
      api[urlNames['createApp']]({
        name: this.appFrom.name,
        viewId: 1,
        apiAccount: this.appFrom.apiAccount,
        apiPassword: this.appFrom.apiPassword,
        concatUser: this.appFrom.concatUser,
        concatPhone: this.appFrom.concatPhone,
        apiUrl: this.appFrom.apiUrl,
        description: this.appFrom.description,
        removed: this.appFrom.removed
      }).then((res) => {
        if (res.status === 0 && this.$route.query.id === undefined) {
          this.$message.success('创建成功')
        }
      })
    },
    updateApp () {
      api[urlNames['updateApp']]({
        id: this.appFrom.id,
        name: this.appFrom.name,
        viewId: this.appFrom.viewId,
        apiAccount: this.appFrom.apiAccount,
        apiPassword: this.appFrom.apiPassword,
        concatUser: this.appFrom.concatUser,
        concatPhone: this.appFrom.concatPhone,
        apiUrl: this.appFrom.apiUrl,
        description: this.appFrom.description,
        removed: this.appFrom.removed
      }).then((res) => {
        if (res.status === 0) {
          this.$message.success('修改成功')
        }
      })
    },
    getAppDetail (id) {
      api[urlNames['getAppDetail']]({
        id: id
      }).then((res) => {
        this.appFrom = res.data
      })
    },
    // 搜索选择
    handleSelect (item) {
      console.log(item)
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
