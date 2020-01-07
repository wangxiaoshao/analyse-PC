<template>
  <el-container class="authority-setting">
    <el-row class="authority-row">
      <el-col :span="6" style="height: 100%">
        <h2 style="margin-bottom: 20px">全部模块:</h2>
        <el-tree
          ref="moduleTree"
          :data="moduleList"
          node-key="id"
          :props="{label: 'title'}"
          :default-checked-keys="defaultNode"
          @node-click="selectTreeNode"
        >
          <span class=" svg-container" slot-scope="{ node, data }">
            <span :class="[data.id===selectTreeId ?'active':'noActive']" class="iconfont icondanwei"></span>
            <span :class="[data.id===selectTreeId ?'active':'noActive']" style="margin-left:3px;">{{node.label}}</span>
          </span>
        </el-tree>
      </el-col>
      <el-col :span="18" class="authority-content" >
        <el-table
          ref="authorityTable"
          border
          stripe
          :data="authorityList"
          size="medium"
          @select="handleSelectionChange"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
          <el-table-column
            property="name"
            label="操作标识"
            align="center">
          </el-table-column>
          <el-table-column
            property="title"
            label="操作名称"
            align="center">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-footer class= "authority-setting-footer">
      <el-button type="primary" @click="saveAuthorityManage">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-footer>
  </el-container>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  data () {
    return {
      selectTreeId: -1, // 默认选中id
      moduleList: [], // 菜单列表
      authorityList: [], // 操作列表
      treeSelectData: {},
      tableSelectData: [],
      defaultNode: []
    }
  },
  created () {
    this.getModuleList()
  },
  methods: {
    // 获取所有菜单
    getModuleList () {
      api[urlNames['getModuleList']]().then(res => {
        this.moduleList = res.data
        if (this.moduleList.length > 0) {
          this.selectTreeId = this.moduleList[0].id
          this.defaultNode.push(this.moduleList[0].id)
          this.treeSelectData = this.moduleList[0]
          this.getAuthorityList(this.selectTreeId)
        }
      })
    },

    // 获取所有权限
    getAuthorityList (val) {
      api[urlNames['getAuthorityList']]({
        moduleId: val
      }).then(res => {
        this.tableSelectData = []
        this.authorityList = res.data
        this.authorityList.forEach(item => {
          if (item.isAuthority) {
            this.tableSelectData.push(item)
          }
        })
        // 更新DOM之后
        this.toggleSelection()
      })
    },
    // 异步选中
    async toggleSelection () {
      await this.$nextTick()
      this.initTableSelect(this.tableSelectData)
    },

    // 初始化默认选中权限
    initTableSelect (data) {
      data.forEach(item => {
        this.$refs.authorityTable.toggleRowSelection(item, true)
      })
    },
    // 切换tree节点
    selectTreeNode (data) {
      if (this.selectTreeId !== data.id) {
        this.selectTreeId = data.id
        this.treeSelectData = data
        this.getAuthorityList(this.selectTreeId)
      }
    },

    // 勾选数据
    handleSelectionChange (data) {
      this.tableSelectData = data
    },

    // 保存
    saveAuthorityManage () {
      let that = this
      this.authorityList.forEach((item) => {
        for (let i = 0; i < that.tableSelectData.length; i++) {
          if (item.id === that.tableSelectData[i].id) {
            item.isAuthority = true
            break
          } else {
            item.isAuthority = false
          }
        }
        if (that.tableSelectData.length === 0) {
          item.isAuthority = false
        }
      })
      if (this.tableSelectData.length <= 0) {
        this.$message.error(`至少勾选一个操作！`)
      } else {
        // let selectData = this.tableSelectData.map(item => {
        //   return { authorityId: item.id }
        // })
        api[urlNames['addAuthorityToModule']]({
          moduleId: this.selectTreeId,
          moduleAuthorityEntityList: this.authorityList
        }).then(res => {
          if (res.status === 0) {
            this.$message.success(`保存成功`)
          }
        })
      }
    },

    // 取消
    cancel () {
      this.getAuthorityList(this.selectTreeId)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>

