<template>
    <div class="permission-set">
       <el-table
          :data="menuAuthList"
          border
          size="medium"
          style="width: 100%">
          <template slot="empty">
          <div class="empty">
              <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
              <p><span style="padding-left: 8px">暂无数据！</span></p>
          </div>
         </template>
          <el-table-column
          label="全部模块"
          width="200"
          align="center"
          >
            <template slot-scope="scope">
              <span>{{scope.row.menu.moduleTitle}}</span>
            </template>
          </el-table-column>
          <el-table-column
          prop=""
          label="对应权限配置"
         >
           <template slot-scope="scope">
            <el-checkbox-group v-model="defaultSelect" class="table-td"  @change="selectChange">
              <el-checkbox class="text-ellipsis"
                  v-for="item in scope.row.authorityList"
                  :key="item.authorityName"
                  :label="item.authorityName"> {{item.authorityTitle}}
              </el-checkbox>
            </el-checkbox-group>
          </template>
          </el-table-column>
      </el-table>

      <el-footer class="authority-setting-footer">
          <el-button type="primary" @click="saveAuthorityManage">保存</el-button>
          <el-button @click="cancel">取消</el-button>
      </el-footer>
    </div>
</template>
<script>
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleBreadcrumb],
  data () {
    return {
      menuAuthList: [], // 分类后的菜单
      defaultSelect: this.$store.state.app.option.actions, // 默认选中操作
      allAction: [], // 所有操作
      checkboxtSelect: [],
      roleId: this.$route.params.id
    }
  },
  created () {
    this.sortModuleList()
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
    // 对菜单进行分类
    sortModuleList () {
      let menuList = this.$store.state.app.option.menus
      let obj = {}
      menuList.forEach(item => {
        if (item.authorityId) {
          this.allAction.push({
            id: item.authorityId,
            authorityName: item.authorityName,
            isAuthority: false
          })
        }
        if (obj[item.moduleName]) {
          obj[item.moduleName].authorityList.push({
            authorityName: item.authorityName,
            authorityTitle: item.authorityTitle
          })
        } else {
          if (item.authorityId === undefined) {
            obj[item.moduleName] = {
              menu: {
                moduleName: item.authorityName,
                moduleTitle: item.moduleTitle
              },
              authorityList: []
            }
          } else {
            obj[item.moduleName] = {
              menu: {
                moduleName: item.authorityName,
                moduleTitle: item.moduleTitle
              },
              authorityList: [{
                authorityName: item.authorityName,
                authorityTitle: item.authorityTitle
              }]
            }
          }
        }
      })
      Object.keys(obj).forEach((key) => {
        this.menuAuthList.push(obj[key])
      })
    },
    selectChange (val) {
      this.checkboxtSelect = val
    },

    // 保存
    saveAuthorityManage () {
      this.allAction.forEach(item => {
        for (let i = 0; i < this.checkboxtSelect.length; i++) {
          if (item.authorityName === this.checkboxtSelect[i]) {
            item.isAuthority = true
            break
          }
        }
      })

      api[urlNames['editAuthorityManage']]({
        roleId: this.roleId,
        authorityManageVos: this.allAction
      }).then(res => {
        if (res.status === 0) {
          this.$message.success(`保存成功`)
          this.allAction = []
          this.sortModuleList()
        }
      })
    },

    cancel () {
      this.allAction = []
      this.sortModuleList()
    }
  }
}
</script>
<style lang="less">
  @import "index1";
</style>
