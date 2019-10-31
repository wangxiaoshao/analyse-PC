<template>
  <div class="create-app-management">
    <div class="to-log">
      <el-button type="primary">查看数据推送日志</el-button>
    </div>
    <el-form ref="form" :rules="rules" :model="appFrom" label-width="100px">
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
              <el-select  v-model="appFrom.viewId" placeholder="请选择视图">
                <el-option label="视图1" value="1">视图1</el-option>
                <el-option label="视图1" value="1">视图2</el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="应用接口账号">
              <el-input placeholder="请输入应用接口账号" v-model="appFrom.apiAccount"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="接口账号密码">
              <el-input placeholder="请输入接口账号密码" v-model="appFrom.apiPassword"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="联系人">
              <el-input placeholder="请输入联系人" v-model="appFrom.concatUser"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="联系电话">
              <el-input placeholder="请输入联系电话" v-model="appFrom.concatPhone"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="应用访问地址">
              <el-input placeholder="请输入应用访问地址"  v-model="appFrom.url"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="备注说明">
              <el-input placeholder="请输入备注说明"  v-model="appFrom.description"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="启用状态">
        <el-radio-group v-model="appFrom.removed">
          <el-radio :label="0">启用</el-radio>
          <el-radio :label="1">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
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
    return {
      appFrom: {
        id: '',
        name: '',
        viewId: '',
        apiAccount: '',
        apiPassword: '',
        concatUser: '',
        concatPhone: '',
        url: '',
        description: '',
        removed: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' }
        ],
        viewId: [
          { required: true, message: '请选择视图ID', trigger: 'change' }
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
    onSubmit () {
      console.log(JSON.parse(JSON.stringify(this.appFrom)), 'this.appFrom')
      api[urlNames['createApp']]({
        id: this.appFrom.id,
        name: this.appFrom.name,
        viewId: this.appFrom.viewId,
        apiAccount: this.appFrom.apiAccount,
        apiPassword: this.appFrom.apiPassword,
        concatUser: this.appFrom.concatUser,
        concatPhone: this.appFrom.concatPhone,
        url: this.appFrom.url,
        description: this.appFrom.description,
        removed: this.appFrom.removed
      }).then((res) => {
        if (res.status === 0 && this.$route.query.id === undefined) {
          this.$message.success('创建成功')
        } else if (res.status === 0 && this.$route.query.id !== undefined) {
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
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
