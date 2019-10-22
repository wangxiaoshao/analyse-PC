<template>
  <div class="organization-content">
    <el-row>
      <el-col :span="7">
        <search-result></search-result>
        <div class="tree-content">
          <organization-tree></organization-tree>
        </div>
      </el-col>
      <el-col :span="17">
        <transition name="fade-transform" mode="out-in">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import organizationTree from './components/Tree/index'
import searchResult from './components/Result/index'
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
