<template>
  <div class="organization-content">
    <el-row>
      <el-col :span="7">
       <div style="padding-right: 20px">
         <search-result></search-result>
         <div class="tree-content">
           <organization-tree></organization-tree>
         </div>
       </div>
      </el-col>
      <el-col :span="17" style="border-left: 1px solid #f2f2f2">
        <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
// import organizationTree from './components/tree/index'
// import searchResult from './components/result/index'
export default {
  name: 'index',
  components: {
    organizationTree, searchResult
  },
  data () {
    return {

    }
  },
  computed: {
  },
  methods: {
  },
  created () {

  }
}
</script>

<style lang="less">
  @import "index";
</style>
