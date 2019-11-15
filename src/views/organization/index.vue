<template>
  <el-container class="organization-content">
    <el-row style="height: 100%;width: 100%">
      <el-col :span="6" style="height: 100%">
       <div class="site-scroll" style="padding-right: 20px;">
         <search-result :defaultNodeId="defaultNodeId"></search-result>
         <div class="tree-content">
           <organization-tree @handle-node-click="handleNodeClick" @get-default-node="getDefaultNode"></organization-tree>
         </div>
       </div>
      </el-col>
      <el-col :span="18" style="border-left: 1px solid #f2f2f2;height: 100%" >
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
  computed: {
    scrollStyle () {
      return {
        height: (this.app.windowHeight - 123) + 'px',
        width: '100%'
      }
    }
  },
  created () {

  },
  methods: {
    // 点击节点加载子节点
    handleNodeClick (node) {
      let id = ''
      id = node.id
      let bindId = node.bindId || ''
      this.$router.push({
        name: 'OrganizationContent',
        params: {
          nodeId: id
        }
      })
    },
    getDefaultNode (val) {
      this.defaultNodeId = val
      alert(val)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
