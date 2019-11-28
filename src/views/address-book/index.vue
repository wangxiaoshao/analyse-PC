<template>
  <div>
    <el-container class="organization-content">
      <el-row>
        <el-col :span="6">
          <div class="organ-top">
            <div class="top-one" :class="activeColor==1?'top-active':''" @click="onChange(1)">本单位通讯录</div>
            <div class="top-two" :class="activeColor==2?'top-active':''" @click="onChange(2)">其他单位通讯录</div>
          </div>
          <div class="tree-main">
            <search-choose v-if="activeColor==2" :defaultNodeId="defaultNodeId"></search-choose>
            <div>
              <address-book-tree v-if="thisUnit && isShow===1" @handle-nodeClick="handleNodeClickTree" :thisUnit="thisUnit"
              ></address-book-tree>
            </div>
              
            <other-address-book-tree v-if="otherUnit&&isShow===2" @handle-nodeClick="handleNodeClickTree" :otherUnit='otherUnit'  ></other-address-book-tree>
            
          </div>
        </el-col>
        <el-col :span="18" style="border-left: 1px solid #f2f2f2;height: 100%">
          <div>
            <el-breadcrumb separator="/" style="padding:20px;">
              <el-breadcrumb-item>{{navigation1.name}}</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item,index) in navigation" :key="index" >
                <a v-if="navigation.length-1!==index"  @click.prevent='goCurrentNodeDetail(item.id, index)'>{{item.name}}</a>
                <span v-if="navigation.length-1===index" href="" disabled >{{item.name}}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>

            <transition name="fade-transform" mode="out-in" style="height: 100%;border:1px solid red">
            <el-scrollbar>
                <Department   
                  :departmentList="departmentList" 
                  :otherDepartmentList="otherDepartmentList"
                  :treeList="treeList" 
                  @handle-child-click="handleChildClick"></Department>
                  <div class="member-tab-content">
                    <member-table :member-props="memberProps" :table-data="memberList"></member-table>
                  </div>
               <!-- <member-table :personnel="personnel" :memberList="memberList" :treeList="treeList"></member-table> -->
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
import searchChoose from '@src/components/Result/index'
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
    MemberTable,
    otherAddressBookTree,
    otherUnitAddressBook
  },
  data () {
    return {
      color: true,
      isShow: 1,
      personnelDepartmentMemberProp: {
        name: 'name',
        duty: 'dutyname',
        mobile: 'mobile',
        portraitUrl:'portraitUrl'
      },
      otherDepartmentMemberProp: {
        name: 'name',
        duty: 'dutyname',
        mobile: 'mobile',
        portraitUrl:'portraitUrl'
      },
      memberProps: {},
      defaultNodeId: null,
      activeColor: 1,
      thisUnit: null,
      userId: '1111111111111111111',
      departmentList: [],
      otherDepartmentList:[],
      memberList: [],
      navigation: [],
      navigation1: [],
      treeList: {},
      otherUnit: {},
      otherNavigation: [],
      neid: 1212,
      defaultNode: {}
    }
  },
  computed: {

  },
  created () {
    this.getAddressBook(),
    this.navigation1.name="本单位通讯录"
    // this.findNodeTree(bindId)
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
    findNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        // viewId: -1,
        id:-1
      }).then((res) => {
          this.otherUnit = res.data
          for(let i;i<this.otherUnit.length;i++){
            if(this.otherUnit[i].nodeType===3){
              this.departmentList.push(this.otherUnit[i]);
            }
          }
          this.handleNodeClickTree(this.otherUnit)
      })
    },
    //
    handleChildClick (node) {
      this.navigation.push({ id: node.id, name: node.name })
      this.getDetail(node.id)
    },
    // 选择本单位通讯录
    handleNodeClickTree (node) {
      this.treeList = node
      this.navigation = []
      this.navigation.push({ id: node.id, name: node.name })
      this.getDetail(node.id)
      this.otherDepartmentList=[]
    },
    // 选择其他单位通讯录
    handleNodeOtherClickTree (node) {
      console.log('________', node)
      this.treeList = node
      this.navigation = []
      this.navigation.push({ id: node.id, name: node.name })
      this.getDetail(node.id)
      this.otherDepartmentList = []
    },
    getDetail (nodeId) {
      this.getDepartmentList(nodeId)
      this.getPersonnelDepartmentMembers(nodeId)
      // this.getPersonnelDepartmentMembers(nodeId)
      // this.activeColor === 1 ? this.getPersonnelDepartmentMembers(nodeId) : this.getOtherDepartmentMembers(nodeId)
    },

    getDepartmentList (nodeId) {
      api[urlNames['getOrgDepartmentTxlList']]({
        orgId: nodeId
      }).then(res => {
        this.departmentList = res.data
      })
    },

    //其他单位通讯录-单位下人员
    getOtherDepartmentMembers (id) {
      api[urlNames['findOrganizationMembers']]({
        orgId: id
      }).then((res) => {
        console.log("1213213============",res)
        this.memberList = res.data
      })
    },

    //本单位通讯录-单位下人员
    getPersonnelDepartmentMembers (orgId) {
      let data = {
        page: 1,
        limit: 10000,
        orgId: orgId
      }
      api[urlNames['getOrgUserTxlList']](data).then(res => {
        this.memberList = res.data
      })
    },

  //本单位通讯录-部门下人员
    getPersonnelmember(departmentId){
      api[urlNames['getDepartmentPersonList']]({
        departmentId:departmentId
      }).then(res => {
        console.log(res,'111')
        this.memberList = res.data
      }).catch(err => {
        console.log(err)
      })
      },

    getMemberList (nodeId) {
      api[urlNames['getOrgDepartmentTxlList']]({
        orgId: nodeId
      }).then(res => {
        this.departmentList = res.data
      })
    },
    goCurrentNodeDetail (depid, index) {
      let len = this.navigation.length
      this.navigation.splice(index + 1, len - index + 1)
      // debugger
      this.getDetail(depid)
    },
    getDefault (val) {
      this.defaultNodeId = val
    },
 
/** 
 * 其他单位下部门
*/
    findDepartmentList(nodeId){
      api[urlNames['getTree']]
      ({bindId:nodeId}).then(res=>{
        console.log(JSON.parse(JSON.stringify(res.data)),'----------222222222222-')
    this.otherDepartmentList=res.data
      })
    },
    
    /** 
     * 其他单位--部门下所有人员[urlNames.findOrganizationMembers] [urlNames.findMemberList]
     *   // 查询部门下的所有人员findDepartmentMembers: 'findDepartmentMembers',
     * // 查询单位下的所有人员findOrganizationMembers: 'findOrganizationMembers',
    */

/**
 * 其他通讯录下-单位下人员
 */
// findOrganizationMembers(){

// }

   
    /**
     * 切换通讯录
     */
    onChange (e) {
      this.activeColor = e,
      this.isShow = e
      if (e === 1) {
        this.getAddressBook()
        this.navigation1.name = '本单位通讯录'
        // this.memberProps=personnelDepartmentMemberProp

      } else if (e === 2) {
        this.navigation1.name = '其他单位通讯录'
        // this.memberProps=otherDepartmentMemberProp
        

      }
    },

     findNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
      }).then((res) => {
        this.nodeTree = res.data
          this.handleNodeClickTree(this.nodeTree[0])
      })
    },
  }

}
</script>

<style lang="less">
  @import 'index';
</style>
