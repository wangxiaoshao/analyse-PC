<template>
  <div class="permission-setting">
      <el-tree
        :data="ManageList"
        node-key="id"
        show-checkbox
        @check-change="handleCheckChange"
        :check-strictly="true"
        :props="defaultProps"
        v-model="chexk"
        :default-checked-keys="isAuthorityCheck">
<!--                <span class="custom-tree-node" slot-scope="{ node, data }">-->
<!--                  <span class="tree-check">-->
<!--                     <el-checkbox v-model="data.isAuthority"></el-checkbox>-->
<!--                  </span>-->
<!--                    <span>{{node.label}}</span>-->
<!--                </span>-->
      </el-tree>
      <el-footer class="permission-setting-footer">
        <el-button type="primary" @click="saveAuthorityManage">保存</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-footer>
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
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      authorityManageList: [],
      checked: true,
      isAuthorityCheck: [],
      list: {
        authorityManageVos: [],
        roleId: this.$route.params.id
      },
      chexk: []
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.pushBreadcrumb({
      name: '权限配置',
      parent: {
        name: 'lookPersonPermission',
        query: {
          type: 'back'
        }
      }
    })
  },
  methods: {
    init () {
      this.findAuthorityManageList(this.$route.params.id)
    },
    closeDialog () {
      this.$emit('getSetFlag', false)
    },
    findAuthorityManageList (roleId) {
      api[urlNames['findAuthorityManageList']]({
        roleId: roleId
      }).then((res) => {
        if (res.status === 0) {
          res.data.forEach(item => {
            if (item.isAuthority) {
              this.isAuthorityCheck.push(item.id)
            }
          })
          this.ManageList = this.listToTree(res.data)
        }
      })
    },
    //  树结构转换
    listToTree (list) {
      let map = {}
      let node
      let roots = []
      for (let i = 0; i < list.length; i++) {
        map[list[i].id] = i // initialize the map
        list[i].children = [] // initialize the children
      }
      for (let i = 0; i < list.length; i++) {
        node = list[i]
        if (node.parentId !== -1) {
          // node.titleS = list[map[node.parentId]].title
          list[map[node.parentId]].children.push(node)
        } else {
          roots.push(node)
        }
      }
      return roots
    },
    // 复选框选中
    handleCheckChange (data, checked, indeterminate) {
      if (checked) {
        let dataitem = {
          id: data.id,
          isAuthority: true
        }
        let item = this.isAuthorityCheck.filter(function (item) {
          return item === data.id
        })
        if (item.length !== 0) {
          return false
        } else {
          this.list.authorityManageVos.push(dataitem)
        }
      } else {
        this.list.authorityManageVos.forEach((item, i) => {
          if (item.id === data.id) {
            this.list.authorityManageVos = this.list.authorityManageVos.splice(i - 1, 1)
          } else {
            let dataitem = {
              id: data.id,
              isAuthority: false
            }
            this.list.authorityManageVos.push(dataitem)
          }
        })
        this.isAuthorityCheck.forEach(item => {
          if (item === data.id) {
            let dataitem = {
              id: data.id,
              isAuthority: false
            }
            this.list.authorityManageVos.push(dataitem)
          }
        })
      }
      console.log(JSON.parse(JSON.stringify(this.list.authorityManageVos)), '---------')
    },
    saveAuthorityManage () {
      if (this.list.authorityManageVos.length === 0) {
        this.$message.warning('您没有选择要修改的权限')
        return false
      }
      api[urlNames['saveAuthorityManage']](this.list).then((res) => {
        if (res.status === 0) {
          this.$message.success(`配置成功`)
        }
      }, (error) => {
        this.$message.error(`保存失败，请重试`)
      })
    },
    goBack () {
      this.$router.go(-1)
    }

  }
}
</script>

<style lang="less">
@import "index";
</style>
