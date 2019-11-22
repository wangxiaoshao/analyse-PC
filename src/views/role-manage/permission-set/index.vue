<template>
  <div class="permission-setting">
      <el-tree
        :data="ManageList"
        node-key="id"
        show-checkbox
        @check-change="handleCheckChange"
        :check-strictly="true"
        :props="defaultProps">
<!--        <span class="custom-tree-node" slot-scope="{ node, data }">-->
<!--          <span class="tree-check">-->
<!--             <el-checkbox v-model="data.isAuthority"></el-checkbox>-->
<!--          </span>-->
<!--            <span>{{node.label}}</span>-->
<!--        </span>-->
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
      selectAdmin: [],
      authorityManageList: [],
      checked: true
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
        }
      })
    },
    // 复选框选中
    handleCheckChange () {},
    saveAuthorityManage () {
      this.authorityManageList = this.ManageList
      api[urlNames['saveAuthorityManage']](this.authorityManageList).then((res) => {
        this.$message.success(`保存成功`)
        this.dialogVisible = false
        this.getGrid()
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
