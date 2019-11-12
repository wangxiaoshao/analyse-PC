<template>
  <div>
    <el-container class="organization-content">
      <el-row>
        <el-col :span="6">
          <div class="organ-top">
            <div class="top-one" :class="activeColor==1?'top-active':''" @click="onChange(1)">本单位通讯录</div>
            <div
              class="top-two"
              :class="activeColor==2?'top-active':''"
              @click="onChange(2)"
            >其他单位通讯录</div>
            <!-- <el-radio-group v-model="tabPosition" @change="communications">
              <el-radio-button label="thisUnit" autofocus="true">本单位通讯录</el-radio-button>
              <el-radio-button label="OtherUnits">其他单位通讯录</el-radio-button>
            </el-radio-group>-->
          </div>
          <div class="site-scroll" style="padding-right: 10px;margin-top:-20px;">
            <search-choose :defaultNodeId="defaultNodeId"></search-choose>
            <div class="tree-content">
              <address-book-tree></address-book-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="18" style="background:#F5F6F8;border-left: 1px solid #f2f2f2;height: 100%">
          <div>
            <el-breadcrumb separator="/" style="background:#F5F6F8;padding:20px;">
              <el-breadcrumb-item>本单位名称</el-breadcrumb-item>
              <el-breadcrumb-item>本单位名称</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>-->
          <transition name="fade-transform" mode="out-in" style="height: 100%">
            <el-scrollbar class="site-scroll">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </el-scrollbar>
          </transition>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import addressBookTree from './components/Tree/index'
import searchChoose from './components/Choose/index'
export default {
  name: 'AddressBook',
  mixins: [handleTable],
  components: {
    addressBookTree,
    searchChoose
  },
  data () {
    return {
      defaultNodeId: null,
      activeColor: 1,

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
    getDefault (val) {
      this.defaultNodeId = val
    },
    /**
     * 切换通讯录
     */
    onChange (e) {
      this.activeColor = e;
      // if(e===1){
      //   this.activeColor=e;
      // }else if(e===2){
      // }
    },
    // getAddressBook(){
    //       api[urlNames['getAddressBoookList']]({
    //     parentId: parentId,
    //     getDataType: 2 //1:只查人员，2:查人员和部门
    //   }).then(res => {
    //     // success callback（）
    //   })
    // },

    toUnit () {
      alert(1)
      this.$router.push({
        name: 'UnitAddressBook'
      })
    },
    toOtherUnit () {
      alert(2)
      this.$router.push({
        name: 'UnitAddressBook'
      })
    }
  },

}
</script>

<style lang="less">
@import 'index';
</style>
