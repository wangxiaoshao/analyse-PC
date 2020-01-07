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
    this.getModuleList()
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    sortModuleList () {
      let obj = {}
      this.$store.state.app.option.menus.forEach(item => {
        if (obj.hasOwnProperty(item.moduleName)) {
          obj.menus.id = item.moduleName
          obj.menus.moduleNamelist.push(item.authorityName)
        } else {
          obj.menusId = item.moduleName
          obj.list.push(item.authorityName)
        }
      })
    },
    getModuleList () {
      this.moduleTitleList = this.$store.state.app.option.menus
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
