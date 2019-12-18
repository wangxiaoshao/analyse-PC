<template>
  <el-container class="organization-content">
    <el-row class="organization-row">
      <el-col :span="6" style="height: 100%">
        <el-scrollbar class="site-scroll">
         <search-result :defaultNodeId="defaultNodeId"></search-result>
         <div class="tree-content" style="overflow: auto">
           <organization-tree @handle-node-click="handleNodeClick" @get-default-node="getDefaultNode"></organization-tree>
         </div>
        </el-scrollbar>
      </el-col>
      <el-col :span="18" class="organization-container" >
        <transition name="fade-transform" mode="out-in" style="height: 100%">
          <el-scrollbar class="site-scroll">
            <router-view></router-view>
          </el-scrollbar>
        </transition>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import organizationTree from '@src/components/Tree/index'
import searchResult from './components/Result/index'
export default {
  components: {
    organizationTree, searchResult
  },
  data () {
    return {
      defaultNodeId: ''
    }
  },
  methods: {
    // 点击节点加载子节点
    handleNodeClick (node) {
      let id = ''
      id = node.id
      this.$router.push({
        name: 'OrganizationContent',
        params: {
          nodeId: id
        }
      })
    },
    getDefaultNode (val) {
      this.defaultNodeId = val
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
