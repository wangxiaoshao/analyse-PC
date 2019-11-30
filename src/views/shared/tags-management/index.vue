<template>
  <div class="tags-mnagement">
    <div class="operate">
      <el-select width="200px" @change="selectSearch" v-model="selectValue" placeholder="请选择">
        <el-option label="全部" :value="0"></el-option>
        <el-option label="单位标签" :value="1"></el-option>
        <el-option label="部门标签" :value="2"></el-option>
        <el-option label="个人标签" :value="3"></el-option>
      </el-select>
      <el-button type="primary" @click="createTag('',{flag:1,title:'新增'})">新增</el-button>
    </div>
    <div class="tag-panel">
      <el-tree
        :data="labelList"
        node-key="id"
        :props="defaultProps"
        lazy
        :load="loadNode"
      >
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
<!-- fa   fa-tags-->
<!--    user-circle-o-->
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
      selectValue: 0
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
      this.$confirm('此操作将会永久删除下级的所有标签, 您确认删除么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api[urlNames['deleteLabel']]({
          id: id
        }).then((res) => {
          if (res.status === 0) {
            this.findLabelList('-1', '')
            this.$message({
              type: 'success',
              message: '删除标签成功'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    selectSearch () {
      if (this.selectValue === 0) {
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
