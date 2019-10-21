<template>
  <div class="site-module mod-parameter">
    <el-row :gutter="20">
      <el-col :span="12" class="parameter-item">
        <el-card class="box-card">
          <el-row slot="header" class="clearfix">
            <el-col :span="12">
              <span class="card-title">应用入口</span>
            </el-col>
          </el-row>
          <el-form class="edit-form" :model="editForm.appEntrance" :rules="appEntranceRules" ref="editForm">
            <el-form-item label="最多显示应用数" prop="count" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.appEntrance.count" :min="1" :max="100"></el-input-number> 个
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12" class="parameter-item">
        <el-card class="box-card">
          <el-row slot="header" class="clearfix">
            <el-col :span="12">
              <span class="card-title">快捷入口</span>
            </el-col>
          </el-row>
          <el-form class="edit-form" :model="editForm.fastEntrance" :rules="fastEntranceRules" ref="editForm">
            <el-form-item label="最多显示应用数" prop="name" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.fastEntrance.count" :min="1" :max="100"></el-input-number> 个
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12" class="parameter-item">
        <el-card class="box-card">
          <el-row slot="header" class="clearfix">
            <el-col :span="12">
              <span class="card-title">信息订阅</span>
            </el-col>
          </el-row>
          <el-form class="edit-form" :model="editForm.subscribe" :rules="subscribeRules" ref="editForm">
            <el-form-item label="最多可显示订阅模块" prop="maxModule" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.subscribe.maxModule" :min="1" :max="100"></el-input-number> 块
            </el-form-item>
            <el-form-item label="每个模块消息数" prop="maxInfo" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.subscribe.maxInfo" :min="1" :max="100"></el-input-number> 条
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12" class="parameter-item">
        <el-card class="box-card">
          <el-row slot="header" class="clearfix">
            <el-col :span="12">
              <span class="card-title">代办事项</span>
            </el-col>
          </el-row>
          <el-form class="edit-form" :model="editForm.todoList" :rules="todoListRules" ref="editForm">
            <el-form-item label="应用模块数" prop="MaxModule" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.todoList.maxModule" :min="1" :max="100"></el-input-number> 块
            </el-form-item>
            <el-form-item label="每个模块消息数" prop="maxInfo" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.todoList.maxInfo" :min="1" :max="100"></el-input-number> 条
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="24" class="text-center">
        <el-button type="danger" @click="submit">确 定</el-button>
        <el-button @click="initConfig">还原默认设置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api, urlNames} from '@src/api';

  export default {
    components: {},
    mixins: [],
    data() {
      return {
        formLabelWidth: '150px',
        defaultForm: {
          appEntrance: {
            name: '应用入口',
            key: 'appEntrance',
            count: 5,
          },
          fastEntrance: {
            name: '快捷入口',
            key: 'fastEntrance',
            count: 5,
          },
          subscribe: {
            name: '信息订阅',
            key: 'subscribe',
            maxModule: 5,
            maxInfo: 5
          },
          todoList: {
            name: '待办事项',
            key: 'todoList',
            maxModule: 5,
            maxInfo: 3
          },
        },
        editForm: {
          appEntrance: {},
          fastEntrance: {},
          subscribe: {},
          todoList: {},
        },
        appEntranceRules: {},
        fastEntranceRules: {},
        subscribeRules: {},
        todoListRules: {},
      }
    },
    computed: {},
    mounted() {
      this.getConfig()
    },
    methods: {
      getConfig () {
        api[urlNames['getParameter']]({
          type: 'pcServiceCount'
        }).then((res) => {
          let value = JSON.parse(res.result.value)
          let len = value.length
          for (let i = 0; i < len; i++) {
            let item = value[i]
            this.editForm[item.key] = item
          }
        }, (res) => {

        })
      },
      submit() {
        let formData = {
          type: 'pcServiceCount',
          level: 1,
          value: JSON.stringify([this.editForm.appEntrance, this.editForm.fastEntrance, this.editForm.subscribe, this.editForm.todoList])
        }
        api[urlNames['setParameter']](formData).then((res) => {
          if (res.error === 0) {
            this.$message.success('保存成功')
          } else {
            this.$message.success(res.message)
          }
        }, (res) => {
          this.$message.success('服务器异常，请稍后重试')
        })
      },
      initConfig() {
        this.editForm.appEntrance = Object.assign({}, this.defaultForm.appEntrance)
        this.editForm.fastEntrance = Object.assign({}, this.defaultForm.fastEntrance)
        this.editForm.subscribe = Object.assign({}, this.defaultForm.subscribe)
        this.editForm.todoList = Object.assign({}, this.defaultForm.todoList)
        this.submit()
      }
    }
  }
</script>
<style lang="less">
  @import "index";
</style>


