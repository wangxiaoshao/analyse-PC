<template>
  <div class="tags-mnagement">
    <div class="operate">
      <el-select width="200px" @change="selectSearch" v-model="value" placeholder="请选择">
        <el-option label="全部" :value="0"></el-option>
        <el-option label="单位标签" :value="1"></el-option>
        <el-option label="部门标签" :value="2"></el-option>
        <el-option label="个人标签" :value="3"></el-option>
      </el-select>
      <el-button type="primary" @click="createTag('',{flag:1,title:'新增一级标签'})">新增一级标签</el-button>
    </div>
    <div class="tag-panel">
      <el-tree
        :data="labelList"
        node-key="id"
        :props="defaultProps"
        lazy
        :load="loadNode"
        :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="custom-tree-float">
          <el-button
            type="text"
            size="mini"
            @click="createTag(data, {flag:0,title:node.label})">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            class="delete"
            @click="deleteLabel(node.id)">
            删除
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>
    <create-tag-form @updateLabelLiat="updateLabelLiat" @close="close" :flagdata="flagdata" :createData="createData"
                     :createTagDialogVisible="createTagDialogVisible"></create-tag-form>
  </div>
</template>

<script>
import CreateTagForm from '@src/views/shared/tags-management/create-tag-form/index'
import { api, urlNames } from '@src/api'

export default {
  name: 'TagsManagement',
  components: {
    CreateTagForm
  },
  data () {
    return {
      createTagDialogVisible: false,
      createData: '',
      flagdata: '',
      labelList: [],
      labelSonList: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: ''
      },
      value: ''
    }
  },
  created () {
    this.findLabelList('-1', '')
  },
  methods: {
    // 获取标签列表
    findLabelList (parentId, type) {
      api[urlNames['findLabelList']]({
        parentId: parentId,
        type: type
      }).then((res) => {
        this.total = parseInt(res.total)
        this.labelList = res.data
      })
    },
    // 获取子节点
    findLabelSonList (parentId) {
      api[urlNames['findLabelList']]({
        parentId: parentId
      }).then((res) => {
        this.labelSonList = res.data
      })
    },
    // 点击节点加载子节点
    handleNodeClick (node) {
      this.findLabelSonList(node.id)
    },
    // 追加子节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.labelList)
      }
      this.findLabelSonList(node.data.id)
      setTimeout(() => {
        resolve(this.labelSonList)
      }, 500)
      this.labelSonList = []
    },
    // 添加成功之后更新
    updateLabelLiat () {
      this.findLabelList('-1')
    },
    // 删除节点
    deleteLabel (id) {
      api[urlNames['deleteLabel']]({
        id: id + ''
      }).then((res) => {
      })
    },
    selectSearch () {
      if (this.value === 0) {
        this.findLabelList('-1')
      } else {
        this.findLabelList('-1', this.value)
      }
    },
    createTag (data, flag) {
      this.createTagDialogVisible = true
      this.createData = data
      this.flagdata = flag
    },
    // 关闭有弹窗
    close () {
      this.createTagDialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
