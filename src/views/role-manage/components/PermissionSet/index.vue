<template>
  <div class="permission-setting">
    <el-dialog
      title="权限设置"
      :visible.sync="setFlag"
      width="50%"
      :show-close="false"
      >
      <div class="dialog-close" @click="closeDialog"><i class="el-icon-close"></i></div>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :check-strictly="true"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
      <el-footer class="permission-setting-footer">
        <el-button type="primary">保存</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </el-footer>
    </el-dialog>
  </div>
</template>

<script>
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleBreadcrumb],
  props: ['setFlag'],
  data () {
    return {
      ManageList: [], // 权限列表
      data: [{
        id: 1,
        label: '一级 1',
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
  },
  created () {
  },
  methods: {
    closeDialog () {
      this.$emit('getSetFlag', false)
    },
    findAuthorityManageList (roleId) {
      api[urlNames['findAuthorityManageList']]({
        roleId: roleId
      }).then((res) => {
        if (res.status === 0) {
          this.ManageList = res.data
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "index";
</style>
