<template>
  <div>
    <el-container class="organization-content">
      <el-row>
        <el-col :span="6">
          <div class="organ-top">
            <div class="top-one" :class="activeColor==1?'top-active':''" @click="onChange(1)" >本单位通讯录</div>
            <div
              class="top-two"
              :class="activeColor==2?'top-active':''"
              @click="onChange(2)"
             
            >其他单位通讯录</div>
          </div>
          <div class="tree-main">
            <search-choose :defaultNodeId="defaultNodeId"></search-choose>
            <div>
              <address-book-tree @handle-nodeClick="handleNodeClickTree" :thisUnit="thisUnit" 
              v-if="isShow===1"
              ></address-book-tree>
              <!-- <addTreeList :thisUnit="thisUnit"></addTreeList> -->
            </div>
              
            <other-address-book-tree @handle-nodeClick="handleNodeClickTree" :otherUnit='nodeTree'  v-if="isShow===2"></other-address-book-tree>
            
          </div>
        </el-col>
        <el-col :span="18" style="background:#F5F6F8;border-left: 1px solid #f2f2f2;height: 100%">
          <div>
            <el-breadcrumb separator="/" style="background:#F5F6F8;padding:20px;">
              <el-breadcrumb-item>本单位通讯录</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item,index) in navigation" :key="index">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>

            <transition name="fade-transform" mode="out-in" style="height: 100%;border:1px solid red">
            <el-scrollbar>
              <keep-alive>
                <Department :departmentList="departmentList" :treeList="treeList" ></Department>
              </keep-alive>
            </el-scrollbar>
          </transition>
        </div>
          <!-- <div v-if="isShow===2">
            <el-breadcrumb separator="/" style="background:#F5F6F8;padding:20px;">
              <el-breadcrumb-item>其他单位名称</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item,index) in navigation" :key="index">{{item.name}}</el-breadcrumb-item>
            </el-breadcrumb>
            <transition name="fade-transform" mode="out-in" style="height: 100%;border:1px solid red">
            <el-scrollbar>
              <keep-alive>
                <other-unit-address-book :departmentList="departmentList" :treeList="treeList" ></other-unit-address-book>
              </keep-alive>
            </el-scrollbar>
          </transition>
          </div> -->

          
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import addressBookTree from './components/Tree/index'
import searchChoose from './components/Choose/index'
import addTreeList from './components/TreeList'
import Department from './components/Department'
import otherAddressBookTree from '@src/components/Tree/'
import otherUnitAddressBook from './unit-address-book/index'
import { api, urlNames } from '@src/api'
import { type } from 'os';
export default {
  name: 'AddressBook',
  mixins: [handleTable],
  components: {
    addressBookTree,
    searchChoose,
    addTreeList,
    Department,
    otherAddressBookTree,
    otherUnitAddressBook
  },
  data () {
   
    return {
      isShow:1,
      defaultNodeId: null,
      activeColor: 1,

      thisUnit: {},
      userId: '1111111111111111111',
      departmentList: [],
      navigation: [],
      treeList: {},

      nodeTree:{},
      otherNavigation:[]


    }
  },
  computed: {

  },
  created () {
    this.getAddressBook(),
    this.findNodeTree()
  },
  methods: {
    handleNodeClickTree (event) {
      this.treeList = event
      this.navigation = []
      this.navigation.push({ id: event.id, name: event.name })
      api[urlNames['getOrgDepartmentTxlList']]({
        orgId: event.id
      }).then(res => {
        // this.departmentList = res.data
      })
    },
    getDefault (val) {
      this.defaultNodeId = val
    },
    /**
     * 切换通讯录
     */
    onChange (e) {
      this.activeColor = e,
      this.isShow=e
      if (e === 1) {
        this.getAddressBook()
        navigation:[{name:"本单位名称"}]
      } else if (e === 2) {
        console.log(1111111)
        this.findNodeTree()
        navigation:[{name:"其他单位名称"}]
        
      }
    },
    getAddressBook () {
      api[urlNames['getAddressBookList']]({
        uid: this.userId
      }).then(res => {
        this.thisUnit = res.data
      })
    },
    //  findNodeTree (parentId) {
    //   api[urlNames['getTree']]({
    //     parentId: parentId,
    //     viewId: -1
    //   }).then((res) => {
    //     this.nodeTree = res.data
    //   })
    // },
     findNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        res.data.forEach(element => {
          // this.nodeTree.push({
          //   value: element.nodeType,
          //   label: element.name
          // })
        })
      })
    },
  }

}
</script>

<style lang="less">
@import 'index';
</style>
