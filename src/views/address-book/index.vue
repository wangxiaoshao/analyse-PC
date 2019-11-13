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
          </div>
          <div class="tree-main">
            <search-choose :defaultNodeId="defaultNodeId"></search-choose>
            <div>
              <address-book-tree :thisUnit="thisUnit"></address-book-tree>
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
            <el-scrollbar>
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
import { api, urlNames } from '@src/api'
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

      thisUnit: {},
      userId: "1111111111111111111",
    }
  },
  computed: {

  },
  created () {
    this.getAddressBook()
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
      if (e === 1) {
        this.getAddressBook()
      } else if (e === 2) {

      }
    },
    getAddressBook () {
      api[urlNames['getAddressBookList']]({
        uid: this.userId
      }).then(res => {
        this.thisUnit = res.data;
      }).catch(err => {
        console.log(err)
      })
    },

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
  }

}
</script>

<style lang="less">
@import 'index';
</style>
