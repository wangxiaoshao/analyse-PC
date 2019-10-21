<template>
  <div class="create-view">
    <div class="from">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="视图名称">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="使用对象">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="视图管理员">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="启用状态">
                  <el-switch v-model="form.delivery"></el-switch>
                </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="选择组织机构">
                <div class="select-org">
                  <el-tree
                    :data="data"
                    show-checkbox
                    node-key="id"
                    draggable
                    :expand-on-click-node="false">
                  </el-tree>
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7" :offset="2">
            <div class="grid-content bg-purple-light">
              <el-form-item label="视图组织机构">
                <div class="select-org">
                  <el-tree
                    :data="data2"
                    show-checkbox
                    node-key="id"
                    draggable
                    :allow-drop="allowDrop"
                    :expand-on-click-node="false">
                  </el-tree>
                </div>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handleTable'
import handleBreadcrumb from '@src/mixins/handleBreadcrumb.js'

export default {
  name: 'CreateView',
  mixins: [handleTable, handleBreadcrumb],
  data () {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    },
    {
      id: 4,
      label: '一级 3',
      children: [{
        id: 9,
        label: '二级 3-1'
      }, {
        id: 10,
        label: '二级 3-2'
      }]
    }]
    return {
      data: JSON.parse(JSON.stringify(data)),
      data2: JSON.parse(JSON.stringify(data)),
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
  mounted () {
    this.pushBreadcrumb({
      name: '创建视图',
      parent: {
        name: 'ViewManagement',
        query: {
          type: 'back'
        }
      }
    })
  },
  methods: {
    allowDrop (draggingNode, dropNode, type) {
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
