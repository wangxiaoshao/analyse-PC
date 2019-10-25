<template>
      <div class="rights-management">
        <div class="operate">
          <el-button>添加成员</el-button>
          <el-button type="primary">权限配置</el-button>
        </div>
        <div>
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
          <div>
            <el-button type="primary">保存</el-button>
            <el-button>取消</el-button></div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'RightsManagement',
  data () {
    return {
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
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
