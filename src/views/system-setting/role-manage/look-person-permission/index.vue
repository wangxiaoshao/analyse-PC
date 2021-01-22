<template>
    <div class="look-person">
        <select-tree
            :selectTreeDailog="selectTreeDailog"
            @dialogReturnData="dialogReturnData"
            @closeSelectDailog="closeselectMenmber"
            @next="next"
            @last="last"
        ></select-tree>
        <div class="button-wrap">
            <el-button
                type="primary"
                class="addPerson"
                @click="openselectMember"
                >添加角色成员</el-button
            >
            <el-input
                placeholder="请输入搜索关键词"
                v-model="searchName"
                prefix-icon="el-icon-search"
                style="width: 200px; margin: 0px 10px;"
            ></el-input>
            <el-button @click="getGrid(true)" type="primary" plain
                >查询</el-button
            >
        </div>
        <!--表格-->
        <el-table :data="userlist" border>
            <template slot="empty">
                <div class="empty">
                    <p>
                        <img
                            class="data-pic"
                            src="@src/common/images/no-data1.png"
                            alt=""
                        />
                    </p>
                    <p><span style="padding-left: 8px;">暂无数据</span></p>
                </div>
            </template>
            <el-table-column
                label="序号"
                width="60"
                align="center"
                type="index"
            >
            </el-table-column>
            <el-table-column prop="uName" label="成员姓名"> </el-table-column>
            <el-table-column prop="orgName" label="单位名称"> </el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center">
                <template slot-scope="scope">
                    <span>{{
                        scope.row.createTime | dataFilter("YYYY-MM-DD HH:mm:ss")
                    }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="updateTime" label="修改时间" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.updateTime">
                        {{
                            scope.row.updateTime
                                | dataFilter("YYYY-MM-DD HH:mm:ss")
                        }}
                    </span>
                    <span v-else></span>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="text"
                        v-if="roleId === 3 || roleId === 4 || roleId === 5"
                        @click="toAuthorization(scope.row)"
                        >授权{{ authorizedName }}</el-button
                    >
                    <el-button
                        size="mini"
                        type="text"
                        @click="deleteRoleUser(scope.row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
        >
        </el-pagination>
    </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
import SelectTree from '@src/components/SelectTree/index'
export default {
  name: 'LookPersonPermission',
  mixins: [handleTable, handleBreadcrumb],
  components: { SelectTree },
  data () {
    return {
      userlist: [{ uid: 3211 }],
      loading: false,
      roleId: parseInt(this.$route.params.roleId),
      searchName: '',
      authorizedName: '市州',
      selectTreeDailog: {
        title: '选择人员',
        openSelectTreeVisiable: false,
        isSelectType: 3, // 1 区县  2  单位  3 人员 4 市州
        isSingSelect: false, // 是否单选,true 单选，false:多选
        isNext: true, // 显示授权范围上一步，
        isLast: false, // 显示授权范围下一步
        isDisabled: true // 是否禁止选择人员有其他角色的情况  true  禁选人员有其他角色的情况；
      },
      userId: [],
      authorizedType: null
    }
  },
  created () {
    this.init()
    this.getGrid()
  },
  mounted () {
    this.pushBreadcrumb({
      name: '查看成员及权限',
      parent: {
        name: 'RoleList',
        query: {
          type: 'back'
        }
      }
    })
  },
  methods: {
    init () {
      switch (this.$route.params.roleName) {
        case 'CITY_MANAGER':
          this.authorizedType = 2
          this.authorizedName = '市州'
          break
        case 'COUNTY_MANAGER':
          this.authorizedType = 3
          this.authorizedName = '区县'
          break
        case 'UNIT_MANAGER':
          this.authorizedType = 4
          this.authorizedName = '单位'
          break
        default:
          return ''
      }
    },
    getGrid (flag) {
      if (flag) {
        this.page.current = 1
      }
      const data = {
        keyword: this.searchName,
        roleId: this.$route.params.roleId,
        page: this.page.current,
        pageSize: this.page.limit
      }
      this.loading = true
      api[urlNames.getAuthUsersByRole](data).then(
        (res) => {
          this.loading = false
          this.userlist = res.data
          this.page.total = res.total
        },
        () => {
          this.loading = false
        }
      )
    },
    toAuthorization (val) {
      this.$router.push({
        name: 'ScopeAuthorization',
        params: {
          oleId: this.roleId,
          uid: val.uid,
          roleName: this.$route.params.roleName
        }
      })
    },
    deleteRoleUser (row) {
      this.handleRow(
        '此操作将永久删除该数据, 是否继续?',
        row,
        this.deleteRoleBindUser
      )
    },
    // 删除角色绑定人员
    deleteRoleBindUser (row) {
      api[urlNames.deleteRoleUser]({
        roleId: this.$route.params.roleId,
        uid: row.uid
      }).then(
        (res) => {
          this.$message.success('删除成功')
          this.getGrid()
        },
        (/* error */) => {
          this.$message.error('保存失败，请重试')
        }
      )
    },
    openselectMember () {
      this.selectTreeDailog.openSelectTreeVisiable = true
      this.selectTreeDailog.title = '选择人员'
      this.selectTreeDailog.isSelectType = 3
      this.selectTreeDailog.isNext = true
      this.selectTreeDailog.isLast = false
    },
    closeselectMenmber () {
      this.selectTreeDailog.openSelectTreeVisiable = false
    },
    dialogReturnData (userData, authData) {
      authData = authData || []
      console.log(this.$store.state.app.rolesInfo)
      const dataAry = [...userData, ...authData]
      const uid = []
      const authorizedOid = []
      dataAry.forEach((item) => {
        if (item.treeType === 5) {
          uid.push(item.treeId)
        } else {
          authorizedOid.push(item.treeId)
        }
      })
      const data = {
        roleId: this.$route.params.roleId,
        authorizedType: this.authorizedType,
        uid,
        authorizedOid
      }
      this.addUserAuth(data)
    },
    addUserAuth (data) {
      api[urlNames.addUsersAuthScope](data).then(
        (res) => {
          this.$message.success('添加成功')
          this.getGrid()
        },
        () => {
          this.$message.error('保存失败，请重试')
        }
      )
    },
    next () {
      this.selectTreeDailog.isNext = false
      this.selectTreeDailog.isLast = true
      if (this.$route.params.roleName === 'CITY_MANAGER') {
        this.selectTreeDailog.isSelectType = 4
        this.selectTreeDailog.title = '授权市州'
        this.selectTreeDailog.isSingSelect = true
      } else if (this.$route.params.roleName === 'COUNTY_MANAGER') {
        this.selectTreeDailog.isSelectType = 1
        this.selectTreeDailog.title = '授权区县'
      } else if (this.$route.params.roleName === 'UNIT_MANAGER') {
        this.selectTreeDailog.isSelectType = 2
        this.selectTreeDailog.title = '授权单位'
      } else {
        this.selectTreeDailog.isSelectType = 3
      }
    },
    last () {
      this.selectTreeDailog.title = '选择人员'
      this.selectTreeDailog.isSelectType = 3
      this.selectTreeDailog.isNext = true
      this.selectTreeDailog.isLast = false
    }
  }
}
</script>

<style lang="less">
@import "index";
.empty {
    p {
        margin: 0;
        font-size: 0px;
        text-align: center;
        line-height: 16px !important;
    }

    span {
        font-size: 12px;
    }
}

.data-pic {
    padding-top: 20px;
    width: 60px;
    height: auto;
}
</style>
