<template>
<div class="scope-authorization">
  <div class="operate-btn">
    <span>该成员的权限可以在以下范围内行使，若需修改授权范围点击右侧的编辑按钮</span>
    <div style="float: right">
      <el-button @click="addArea" type="primary">授权区域</el-button>
      <el-button @click="addDep" type="primary">授权单位</el-button>
    </div>
  </div>
  <div class="table">
    <el-table
          :data="AuthorizedList"
          border
          size="medium"
        >
          <template slot="empty">
            <div class="empty">
              <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
              <p><span style="padding-left: 8px">暂无数据！</span></p>
            </div>
          </template>
          <el-table-column label="名称" prop="name">

          </el-table-column>
          <el-table-column label="上级" prop="removed" align="center"></el-table-column>
          <el-table-column label="区域" prop="state" align="center">
          </el-table-column>
        </el-table>
      </div>
  <select-org :openSelectOrg="openSelectOrg" @dialogReturnOrg="dialogReturnOrg" @closeSelectOrg="closeSelectOrg"></select-org>
  <select-area :openSelectArea="openSelectArea" @dialogReturnArea="dialogReturnArea" @closeSelectArea="closeSelectArea"></select-area>
</div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import SelectOrg from '@src/components/SelectOrg/index'
import SelectArea from '@src/components/SelectArea/index'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
export default {
  mixins: [handleTable, handleBreadcrumb],
  name: 'ScopeAuthorization',
  data () {
    return {
      openSelectOrg: false,
      openSelectArea: false,
      AuthorizedList: []
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
  },
  methods: {
    ...mapMutations(['GET_OPTION']),
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
    dialogReturnOrg (data) {
      let parmas = {
        uid: this.app.option.user.uid,
        authorizedType: 1,
        userAuthorizedEntityList: data
      }
      api[urlNames['insertAuthorizedEntity']](parmas).then((res) => {
      })
    },
    dialogReturnArea (data) {
      let parmas = {
        uid: this.app.option.user.uid,
        authorizedType: 3,
        userAuthorizedEntityList: data
      }
      api[urlNames['insertAuthorizedEntity']](parmas).then((res) => {
      })
      // console.log(JSON.parse(JSON.stringify(data)))
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
