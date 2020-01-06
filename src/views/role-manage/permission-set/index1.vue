<template>
    <div class="permission-set">
        <!-- <table  border="1px solid gray" width="100%" style="border-collapse: collapse;">
            <thead>
                <th>模块</th>
                <th>方法</th>
            </thead>
            <tbody id="tb">
                <tr>
                    <td>
                        <el-checkbox @change="toggleAllMembers">首页</el-checkbox>
                        <span>首页</span>
                    </td>
                    <td>
                        <el-checkbox-group  v-model="selectModel" class="table-td"  @change="selectChange">
                            <el-checkbox style="display: block" class="text-ellipsis"
                                v-for="org in selectList"
                                :key="org.id"
                                :label="org"> {{org.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </td>
                </tr>

            </tbody>
        </table> -->
         <el-table
            :data="tableList"
            border
            style="width: 100%">
            <template slot="empty">
            <div class="empty">
                <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
                <p><span style="padding-left: 8px">暂无数据！</span></p>
            </div>
           </template>
            <el-table-column
            prop="modelName"
            label="全部模块"
            width="200"
            >
            </el-table-column>
            <el-table-column
            prop=""
            label="对应权限配置"
           >
             <template slot-scope="scope">

                <el-checkbox-group  v-model="scope.row.models.selected" class="table-td"  @change="selectChange">
                    <el-checkbox style="display: block" class="text-ellipsis"
                        v-for="item in scope.row.models"
                        :key="item.id"
                        :label="item.id"> {{item.label}}
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
import { api, urlNames } from '@src/api'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      menuAuthList: [],

      tableList: [
        {
          modelName: '组织机构',
          models: {
            selected: ['add', 'delete'],
            list: [
              {
                id: 'delete',
                label: '删除操作'
              },
              {
                id: 'add',
                label: '更新操作'
              }
            ]
          }
        },
        {
          modelName: '组织机构1',
          models: {
            selected: ['add', 'delete'],
            list: [
              {
                id: 'delete',
                label: '删除操作'
              },
              {
                id: 'add',
                label: '更新操作'
              }
            ]
          }
        }
      ],
      moduleTitleList: [],
      selectList: [
        {
          id: '11',
          name: '删除操作'
        },
        {
          id: '12',
          name: '添加操作'
        }
      ],
      modelList: [],
      selectModel: [],
      roleId: this.$route.params.id
    }
  },
  created () {
    // this.moduleTitleList = this.$store.state.app.option.menus
    this.sortModuleList()
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    // 对菜单进行分类
    sortModuleList () {
      let menuList = this.$store.state.app.option.menus;
      let obj = {};
      menuList.forEach(item => {
        if (obj[item.moduleName])  {
          obj[item.moduleName].authorityList.push({
            authorityName: item.authorityName,
            authorityTitle: item.authorityTitle,
          })
        } else {
          obj[item.moduleName] = {
            menuList: {
              moduleName: item.authorityName,
              moduleTitle: item.moduleTitle,
            },
            authorityList : [{
              authorityName: item.authorityName,
              authorityTitle: item.authorityTitle,
            }]
          }
        }
      })
      Object.keys(obj).forEach((key) => {
        this.menuAuthList.push(obj[key]);
      })
      console.log(obj)
      console.log(this.menuAuthList)
    },
    getModuleList () {
      let that = this
      let newAry = []

      let obj1 = {
        authorityTitle: [],
        authorityName: []
      }
      let obj = {
      }
      this.moduleTitleList = this.$store.state.app.option.menus
      this.moduleTitleList.forEach(function (item) {
        if (obj.hasOwnProperty(item.moduleName)) {
          obj1.authorityTitle.push(item.authorityTitle)
          obj1.authorityName.push(item.authorityName)
        } else {
          let obj2 = {}
          obj2.moduleName = item.moduleName
          obj2.moduleTitle = item.moduleTitle
          newAry.push(obj2)
        }
      })
    },
    selectChange (val) {

    },
    // 保存
    saveAuthorityManage () {

    },
    cancel () {

    }
  }
}
</script>
<style lang="less">
  @import "index1";
</style>
