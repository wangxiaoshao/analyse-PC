<template>
  <div class="tags-mnagement">
    <div class="operate">
      <el-select width="200px" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="createTag('',{flag:1,title:'新增一级标签'})">新增一级标签</el-button>
    </div>
     <div class="tag-panel">
       <el-tree
         :data="data"
         node-key="id"
         default-expand-all
         :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="createTag(data, {flag:0,title:node.label}),() => append(data)">
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
       </el-tree>
     </div>
    <create-tag-form @close="close" :flagdata="flagdata" :createData="createData" :createTagDialogVisible="createTagDialogVisible"></create-tag-form>
  </div>
</template>

<script>
import CreateTagForm from '@src/views/shared/tags-management/create-tag-form/index'
let id = 1000
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      data: [{
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
      }]
    }
  },
  methods: {
    append (data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    createTag (data, flag) {
      this.createTagDialogVisible = true
      this.createData = data
      this.flagdata= flag
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
