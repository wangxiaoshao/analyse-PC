<template>
<div class="scope-authorization">
  <div class="operate-btn">
    <span>该成员的权限可以在以下范围内行使，若需修改授权范围点击右侧的编辑按钮</span>
    <div style="float: right">
      <el-button @click="addArea" type="primary" :disabled="!hasRight('roleSetAuthority')">授权区域</el-button>
      <el-button @click="addDep" type="primary" :disabled="!hasRight('roleSetAuthority')">授权单位</el-button>
    </div>
  </div>
  <div class="table">
          <table>
            <tr>
              <td>区域</td>
              <td><span v-for="(item,index) in orgNameList" :key="index">{{item}}</span></td>
            </tr>
            <tr>
              <td>单位</td>
              <td><span v-for="(item,index) in areaNameList" :key="index">{{item}}</span></td>
            </tr>
          </table>
   </div>
  <select-org :openSelectOrg="openSelectOrg" @dialogReturnOrg="dialogReturnOrg" @closeSelectOrg="closeSelectOrg"></select-org>
  <select-area :openSelectArea="openSelectArea"  @dialogReturnArea="dialogReturnArea" @closeSelectArea="closeSelectArea"></select-area>
</div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import hasRight from '@src/mixins/has-right'
import SelectOrg from '@src/components/SelectOrg/index'
import SelectArea from '@src/components/SelectArea/index'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [handleTable, handleBreadcrumb, hasRight],
  name: 'ScopeAuthorization',
  data () {
    return {
      openSelectOrg: false,
      openSelectArea: false,
      areaNameList: [],
      orgNameList: []

    }
  },
  components: {
    SelectOrg,
    SelectArea
  },
  computed: {
    ...mapState(['app'])
  },
  mounted () {
    this.pushBreadcrumb({
      name: '查看成员及权限',
      parent: {
        path: '/role-manage/look-person-permission/1'
      }
    })
    this.getfindAuthorizedEntity()
  },
  methods: {
    ...mapMutations(['SET_OPTION']),
    addArea () {
      this.openSelectArea = true
    },
    addDep () {
      this.openSelectOrg = true
    },
    closeSelectOrg () {
      this.openSelectOrg = false
    },
    closeSelectArea () {
      this.openSelectArea = false
    },
    getfindAuthorizedEntity () {
      this.areaNameList = []
      this.orgNameList = []
      api[urlNames['findAuthorizedEntityByUid']]({
        uid: parseInt(this.$route.params.id),
        roleId: parseInt(this.$route.query.roleId)
      }).then((res) => {
        if (res.data.length > 0) {
          let that = this
          res.data.forEach(val => {
            if (val.authorizedType === 1) {
              that.areaNameList.push(val.authorizedOid + '、')
            }
            if (val.authorizedType === 3) {
              that.orgNameList.push(val.authorizedOid + '、')
            }
          })
          let lastStr = this.areaNameList[this.areaNameList.length - 1]
          let lastStr1 = this.orgNameList[this.orgNameList.length - 1]
          this.areaNameList.splice(this.areaNameList.length - 1, 1, lastStr.substring(0, lastStr.length - 1))
          this.orgNameList.splice(this.orgNameList.length - 1, 1, lastStr1.substring(0, lastStr1.length - 1))
        }
      })
    },
    dialogReturnOrg (data) {
      let parmas = {
        uid: parseInt(this.$route.params.id),
        authorizedType: 1,
        userAuthorizedEntityList: data,
        roleId: parseInt(this.$route.query.roleId)
      }
      api[urlNames['insertAuthorizedEntity']](parmas).then((res) => {
        this.$message.success(`授权成功`)
        this.getfindAuthorizedEntity()
      })
    },
    dialogReturnArea (data) {
      let parmas = {
        uid: parseInt(this.$route.params.id),
        authorizedType: 3,
        userAuthorizedEntityList: data,
        roleId: parseInt(this.$route.query.roleId)
      }
      api[urlNames['insertAuthorizedEntity']](parmas).then((res) => {
        this.$message.success(`授权成功`)
        this.getfindAuthorizedEntity()
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
