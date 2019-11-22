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
              <address-book-tree v-if="thisUnit && isShow===1" @handle-nodeClick="handleNodeClickTree" :thisUnit="thisUnit"
              ></address-book-tree>
            </div>
              
            <other-address-book-tree v-if="otherUnit&&isShow===2" @handle-nodeClick="handleNodeClickTree" :otherUnit='otherUnit'  ></other-address-book-tree>
            
          </div>
        </el-col>
        <el-col :span="18" style="background:#F5F6F8;border-left: 1px solid #f2f2f2;height: 100%">
          <div>
            <el-breadcrumb separator="/" style="background:#F5F6F8;padding:20px;">
              <el-breadcrumb-item>{{navigation1.name}}</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item,index) in navigation" :key="index" >
                <a v-if="navigation.length-1!==index"  @click.prevent='goCurrentNodeDetail(item.id, index)'>{{item.name}}</a>
                <span v-if="navigation.length-1===index" href="" disabled >{{item.name}}</span>
                
              </el-breadcrumb-item>
            </el-breadcrumb>

            <transition name="fade-transform" mode="out-in" style="height: 100%;border:1px solid red">
            <el-scrollbar>
              <keep-alive>
                <Department   
                  :departmentList="departmentList" 
                  :otherDepartantList="otherDepartantList"
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
// import { type } from 'os';
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
      thisUnit: null,
      userId: '1111111111111111111',
      departmentList: [],
      otherDepartantList:[],
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
    this.navigation1.name="本单位通讯录"
    // this.findNodeTree()
  },
  methods: {
      getAddressBook () {
        api[urlNames['getAddressBookList']]({
          uid: this.userId
        }).then(res => {
          this.thisUnit = res.data
          this.handleNodeClickTree(this.thisUnit)
      })
    },
    // findNodeTree (parentId) {
    //   api[urlNames['getTree']]({
    //     parentId: parentId,
    //     viewId: -1,
    //     id:-1
    //   }).then((res) => {
    //     console.log(res,'111111111111111111')
    //       this.otherUnit = res.data
    //       this.handleNodeClickTree(this.otherUnit)
    //     // res.data.forEach(element => {
    //     //   this.nodeTree.push({
    //     //     value: element.nodeType,
    //     //     label: element.name
    //     //   })
    //     // })
    //   })
    // },
    handleChildClick (node) {
      this.navigation.push({id: node.id, name: node.name})
      this.getDetail(node.id)
    },
    handleNodeClickTree (node) {
      this.treeList = node
      // console.log(this.treeList,'+++++++++++')
      this.navigation = []
      this.navigation.push({ id: node.id, name: node.name })
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
 * 其他单位部门
*/
    findDepartmentList(){
       api[urlNames['findDepartmentList']](data).then((res) => {
         this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.tableData = []
        this.page.total = 0
      })

    },
    /** 
    //  * 其他单位--部门下所有人员[urlNames.findOrganizationMembers] [urlNames.findMemberList]
    */

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
        this.findNodeTree(-1)
        this.navigation1.name="其他单位通讯录"
      }
    },

     findNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1,
      }).then((res) => {

        this.nodeTree = res.data
          this.handleNodeClickTree(this.nodeTree[0])
      // console.log(res.data,'-----------------')    
      })
    },
  }

}
</script>

<style lang="less">
  @import 'index';
</style>
