<template>
  <div class="organization-content">
    <el-row>
      <el-col :span="7" class="organization-left">
        <el-row>
          <el-col :span="6">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="18">
            <el-input
              placeholder="搜索" suffix-icon="el-icon-search" v-model="keyWord">
            </el-input>
          </el-col>
        </el-row>
        <organization-tree></organization-tree>
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
import organizationTree from './components/organizationTree'
export default {
  name: 'index',
  components: {
    organizationTree
  },
  data () {
    return {
      keyWord: '',
      options: [{
        value: 'all',
        label: '全部'
      }, {
        value: 'department',
        label: '部门'
      }, {
        value: 'unit',
        label: '单位'
      }, {
        value: 'person',
        label: '人员'
      }],
      value: '全部'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less">
  @import "index";
</style>
