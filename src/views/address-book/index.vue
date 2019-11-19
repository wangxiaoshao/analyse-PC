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
              
            <other-address-book-tree @handle-nodeClick="handleNodeClickTree" :otherUnit='otherUnit'  v-if="isShow===2"></other-address-book-tree>
            
          </div>
        </el-col>
        <el-col :span="18" style="background:#F5F6F8;border-left: 1px solid #f2f2f2;height: 100%">
          <div>
            <el-breadcrumb separator="/" style="background:#F5F6F8;padding:20px;">
              <el-breadcrumb-item>{{navigation1.name}}</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item,index) in navigation" :key="index" class='class1 class2' >
                <a v-if="navigation.length-1!==index"  @click.prevent='goCurrentNodeDetail(item.id, index)'>{{item.name}}</a>
                <span v-if="navigation.length-1===index" href="" disabled >{{item.name}}</span>
                <!-- <span :class="color?'class1':'class2'"></span> -->
                <!-- <span v-if="index<navigation.length-1?'(:class='class1')':'(:class='class2')'"></span> -->
                
              </el-breadcrumb-item>
            </el-breadcrumb>

            <transition name="fade-transform" mode="out-in" style="height: 100%;border:1px solid red">
            <el-scrollbar>
              <keep-alive>
                <Department   
                  :departmentList="departmentList" 
                  :treeList="treeList" 
                  @handle-child-click="handleChildClick"></Department>
               <!-- <member-table :personnel="personnel" :memberList="memberList" :treeList="treeList"></member-table> -->
              </keep-alive>
            </el-scrollbar>
          </transition>
        </div>
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
import MemberTable from './components/Member/index'
import otherAddressBookTree from './components/Maintree/index'
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
    // MemberTable
    otherAddressBookTree,
    otherUnitAddressBook
  },
  data () {
   
    return {
      color:true,
      isShow:1,
      defaultNodeId: null,
      activeColor: 1,

      thisUnit: {},
      userId: '1111111111111111111',
      departmentList: [],
      memberList: [],
      navigation: [],
      navigation1: [],
      treeList: {},
      otherUnit:{},
      otherNavigation:[]
      
    }
  },
  computed: {

  },
  created () {
    this.getAddressBook(),
    this.findNodeTree()
    this.navigation1.name="本单位通讯录"
    
  },
  methods: {
      getAddressBook () {
        api[urlNames['getAddressBookList']]({
          uid: this.userId
        
        }).then(res => {
          // console.log("----------11")
          // console.log(res)
          // console.log("----------22")
          this.thisUnit = res.data
          this.handleNodeClickTree(this.thisUnit)
      })
      // console.log(uid)
    },
    findNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
          this.otherUnit = res.data
        
          // console.log(res)
        // res.data.forEach(element => {
        //   this.nodeTree.push({
        //     value: element.nodeType,
        //     label: element.name
        //   })
        // })
      })
    },
    handleChildClick (node) {
      this.navigation.push({id: node.id, name: node.name})
      this.getDetail(node.id)
    },
    handleNodeClickTree (node) {
      this.treeList = node
      this.navigation = []
      this.navigation.push({ id: node.id, name: node.name })
      // console.log(1212)
      // console.log(this.navigation)
      this.getDetail(node.id)
      
    },
    getDetail (nodeId) {
      this.getDepartmentList(nodeId)
      // this.getMemberList(nodeId)
    },
    getDepartmentList (nodeId) {
      api[urlNames['getOrgDepartmentTxlList']]({
        orgId: nodeId
      }).then(res => {
        this.departmentList = res.data
      })
    },
    goCurrentNodeDetail(depid, index){
      let len = this.navigation.length
      this.navigation.splice(index+1, len - index + 1)
      // debugger
      this.getDetail(depid)
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
        this.navigation1.name="本单位通讯录"
      } else if (e === 2) {
        this.findNodeTree()
        this.navigation1.name="其他单位通讯录"
        
      }
      // console.log(this.navigation)
    },
    //  findNodeTree (parentId) {
    //   api[urlNames['getTree']]({
    //     parentId: parentId,
    //     viewId: -1
    //   }).then((res) => {
    //     this.nodeTree = res.data
    //   })
    // },
     
  }

}
</script>

<style lang="less">
  @import 'index';
</style>
