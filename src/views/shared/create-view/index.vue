<template>
  <div class="create-view">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="视图基本信息" name="first">
        <div class="from">
          <el-form ref="form" :model="ViewFrom" label-width="100px">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <el-form-item label="视图名称">
                    <el-input v-model="ViewFrom.name"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="视图管理员">
                    <el-select v-model="ViewFrom.roleBindUserId" placeholder="请选择活动区域">
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
                  <el-form-item label="备注">
                    <el-input v-model="ViewFrom.remark"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-form-item label="启用状态">
                    <el-switch v-model="ViewFrom.removed"></el-switch>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="createView">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="视图组织机构" name="second">
        <div class="from">
          <el-form ref="form" :model="form" label-width="100px">
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
                        @check-change="currentchange"
                        :check-strictly="true"
                        :allow-drop="allowDrop"
                        @node-drag-end="nodedragend"
                        @node-drag-over="handleDragOver"
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
                        :check-strictly="true"
                        @node-drag-enter="handleDragEnter"
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
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
      activeName: 'first',
      data: JSON.parse(JSON.stringify(data)),
      data2: JSON.parse(JSON.stringify(data)),
      ViewFrom: {
        name: '',
        remark: '',
        removed: '',
        roleBindUserId: ''
      },
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
    createView () {
      console.log(JSON.parse(JSON.stringify(this.ViewFrom)), '--------------')
      api[urlNames['createView']]({
        name: this.ViewFrom.name,
        remark: this.ViewFrom.remark,
        removed: 0,
        roleBindUserId: 1
      }).then((res) => {
        console.log(res, '--------------')
      })
    },
    allowDrop (draggingNode, dropNode, type) {
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('Tree drag over: ', dropNode.label)
    },
    // 拖拽结束时触发的事件
    nodedragend (Node, lastNode, lastTree, e) {
      if (e.screenX > 1020 && e.screenX < 1330 && e.screenY > 425 && e.screenY < 725) {
        console.log('111111')
      }
      // console.log(e.screenX, '1020----------1330')
      // console.log(e.screenY, '425----------725')
    },
    handleDragEnter () {
    },
    onSubmit () {
      console.log('submit!')
    },
    // 单选框选中
    currentchange (node, checked) {
      if (checked) {
        this.$confirm('是否选择子节点', '提示', {
          confirmButtonText: '选择',
          cancelButtonText: '不选择',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '选择!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '不选择'
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
