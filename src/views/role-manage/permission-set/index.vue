<template>
  <div class="permission-setting">
      <el-tree
        :data="ManageList"
        node-key="id"
        show-checkbox
        @check-change="handleCheckChange"
        :check-strictly="true"
        :props="defaultProps"
        :default-checked-keys="isAuthorityCheck">
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
        children: 'authorityManageVoList',
        label: 'title'
      },
      authorityManageList: [],
      checked: true,
      isAuthorityCheck: []
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
          this.ManageList = res.data
          res.data.forEach(item => {
            if (item.isAuthority) {
              this.isAuthorityCheck.push(item.id)
            }
          })
        }
      })
    },
    // 复选框选中
    handleCheckChange (data, checked, indeterminate) {
      if (checked) {
        let dataitem = {
          id: data.id,
          isAuthority: true
        }
        this.authorityManageList.push(dataitem)
        this.authorityManageList.filter(function (element, index, self) {
          return self.indexOf(element.id) === index.id
        })
      } else {
        let dataitem = {
          id: data.id,
          isAuthority: false
        }
        this.authorityManageList.push(dataitem)
        this.authorityManageList.filter(function (element, index, self) {
          return self.indexOf(element.id) === index.id
        })
      }
      console.log(JSON.parse(JSON.stringify(data)), checked, indeterminate, 'data, checked, indeterminate')
      console.log(JSON.parse(JSON.stringify(this.authorityManageList)), checked, indeterminate, 'this.authorityManageList')
    },
    saveAuthorityManage () {
      api[urlNames['saveAuthorityManage']]({
        authorityManageList: this.authorityManageList
      }).then((res) => {
        this.$message.success(`保存成功`)
        console.log(res)
      }, (error) => {
        this.$message.error(`保存失败，请重试`)
      })
    },
    /* getCheckList () {
      console.log(21221,this.ManageList)
    }, */
    goBack () {
      this.$router.go(-1)
    }

  }
}
</script>

<style lang="less">
@import "index";
</style>
