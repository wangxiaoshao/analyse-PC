<template>
  <el-container class="authority-setting">
    <el-row class="authority-row">
      <el-col :span="6" style="height: 100%">
        <el-tree
          :data="ModuleList"
          node-key="id"
          :props="{label: 'title'}"
          :expand-on-click-node="false"
          @node-click="selectTreeNode"
        >
        </el-tree>
      </el-col>
      <el-col :span="18" class="authority-content" >
        <authority-table :tableId="selectTreeId" :tableData="AuthorityList" @changeSelection="changeTableSelection()"></authority-table>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
  import { api, urlNames } from '@src/api'
  import authorityTable from './authority-table/index'
  import { mapState, mapMutations } from 'vuex'
  export default {
    components: {
      authorityTable,
    },
    data () {
      return {
        selectTreeId: -1, // 默认选中id
        ModuleList: [], // 菜单列表
        AuthorityList: [], // 操作列表
        tableSelectionList: {}, // table中选中的项
      }
    },
    created () {
      this.getModuleList();
      this.getAuthorityList();
    },
    computed: {
    },
    methods: {
      // 获取所有菜单
      getModuleList () {
        api[urlNames['getModuleList']]().then(res => {
          this.ModuleList = res.data;
          if(this.ModuleList.length > 0) {
            this.selectTreeId = this.ModuleList[0].id;
            let tempId = this.selectTreeId;
            this.tableSelectionList.tempId = [];
          }
        })
      },

      // 获取所有权限
      getAuthorityList() {
        api[urlNames['getAuthorityList']]().then(res => {
          this.AuthorityList = res.data;
        })
      },

      // 选中tree节点
      selectTreeNode(data) {
        this.selectTreeId = data.id;
        let tempId = this.selectTreeId;
        if(!this.tableSelectionList.hasOwnProperty(this.selectTreeId)) {
          this.tableSelectionList.tempId = [];
        }
      },

      // 选中table行
      changeTableSelection(data, id) {
        this.tableSelectionList.id = data;
      }
    }
  }
</script>

<style lang="less">
  @import "index";
</style>
