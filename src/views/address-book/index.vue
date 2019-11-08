<template>

  <el-container class="organization-content">

    <el-row style="height: 100%;width: 100%">
      <el-col :span="6" style="height: 100%">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
       <el-radio-button label="本单位通讯录" @click="toUnit(unit)" autofocus="true">本单位通讯录</el-radio-button>
       <el-radio-button label="其他单位通讯录" @click="toOtherUnit">其他单位通讯录</el-radio-button>
    </el-radio-group>
    <!-- <el-tabs v-model="activeTab" @tab-click="tabClick">
    <el-tab-pane label="本单位通讯录" name="first">我爱你</el-tab-pane>
    <el-tab-pane label="其他单位通讯录" name="yanggb2">我好爱你</el-tab-pane>
  </el-tabs> -->
       <div class="site-scroll" style="padding-right: 10px;margin-top:-20px;">
         <search-choose :defaultNodeId="defaultNodeId"></search-choose>
         <div class="tree-content">
           <address-book-tree ></address-book-tree>
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
import handleTable from '@src/mixins/handle-table'
import addressBookTree from './components/Tree/index'
import searchChoose from './components/Choose/index'
export default {
  name: 'AddressBook',
  mixins: [ handleTable ],
  components: {
    // organizationTree, searchResult
    addressBookTree, searchChoose
  },
  data () {
    return {
      defaultNodeId: null,
      tabPosition: 'top'

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
  methods: {
    getDefault (val) {
      this.defaultNodeId = val
    },
    // getAddressBook(){
    //       api[urlNames['getAddressBoookList']]({
    //     parentId: parentId,
    //     getDataType: 2 //1:只查人员，2:查人员和部门
    //   }).then(res => {
    //     // success callback（）
    //   })
    // },

    toUnit(){
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
  created () {

  }
  
  
}
</script>

<style lang="less">
  @import "index";
</style>
