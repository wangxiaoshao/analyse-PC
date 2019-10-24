<template>
  <div class="create-app-management">
    <div class="to-log">
      <el-button type="primary">查看数据推送日志</el-button>
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="应用名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="绑定视图">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="应用接口账号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="接口账号密码">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="联系人">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="联系电话">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form-item label="应用访问地址">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-form-item label="备注说明">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handleTable'
import handleBreadcrumb from '@src/mixins/handleBreadcrumb.js'

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
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
