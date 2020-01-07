<template>
  <el-container class="adress-list">
    <el-row class="address-row">
      <el-col :span="6" style="height: 100%">
       <div class="site-scroll">
           <div class="organ-top">
            <div class="top-one" :class="activeColor==1?'top-active':''" @click="onChange(1)">本单位通讯录</div>
            <div class="top-two" :class="activeColor==2?'top-active':''" @click="onChange(2)">其他单位通讯录</div>
          </div>
         <search-result @searchMyBack="searchMyBack" @searchListResult="searchListResult" :myOrgFlag="activeColor" :defaultNodeId="defaultNodeId"></search-result>
         <div class="tree-content">
           <address-list-tree :tree-list="treeList" @handle-node-click="handleNodeClickTree"></address-list-tree>
         </div>
       </div>
      </el-col>
      <el-col :span="18" class="address-container" >
         <el-breadcrumb separator="/" style="padding:20px;">
              <el-breadcrumb-item>{{navigation1.name}}</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item,index) in navigation" :key="index" >
                <a v-if="navigation.length-1!==index"  @click.prevent='goCurrentNodeDetail(item.id, index)'>{{item.name}}</a>
                <span v-if="navigation.length-1===index" href="" disabled >{{item.name}}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
        <transition name="fade-transform" mode="out-in" style="height: 100%">
             <div style="padding: 0 20px">
               <department :departmentList="departmentList" :treeList="treeList" @handle-child-click="handleChildClick"></department>
               <member :table-data="memberList"></member>
             </div>
        </transition>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import { api, urlNames } from '@src/api'
import searchResult from './components/Choose/index'
import department from './department/index'
import member from './member/index'
import addressListTree from './components/Tree/index'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    searchResult,
    department,
    member,
    addressListTree
  },
  data () {
    return {
      isShow: 1,
      activeColor: 1,
      defaultNodeId: '',
      navigation: [],
      navigation1: [],
      departmentList: [],
      memberList: [],
      treeList: [],
      hasChildren: true,
      name: ''
    }
  },
  created () {
    if (this.app.option.user && this.app.option.user.orgId) {
      this.getAddressListUnitTree()
      this.getAddressListOrganizationMembers()
      this.getAddressListdepartment()
    }
    this.navigation1.name = '本单位通讯录'
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    /**
     * 切换通讯录
     */
    onChange (e) {
      this.activeColor = e
      this.isShow = e
      if (e === 1) {
        // alert(this.app.option.user.orgId)
        this.navigation1.name = '本单位通讯录'
        this.getAddressListUnitTree()
        this.getAddressListOrganizationMembers()
        this.getAddressListdepartment()
        // this.getAddressListUnitUser()
      } else if (e === 2) {
        this.navigation1.name = '其他单位通讯录'
        this.getAddressListOthertTree()
        this.getAddressListOrganizationMembers()
        // this.getAddressListOtherUser()
      }
    },

    /** 通讯录视图 */
    getAddressListUnitTree () {
    // console.log(this.app.option.user,'wertyui12345====')
      api[urlNames['getAddressListTree']]({
        orgId: this.app.option.user.orgId
      }).then((res) => {
        this.treeList = res.data
        // this.departmentList=res.data
        this.handleNodeClickTree(this.treeList[0])
      })
    },
    getAddressListOthertTree () {
      api[urlNames['getAddressListTree']]({
      }).then(res => {
        this.treeList = res.data
        this.handleNodeClickTree(this.treeList[0])
      })
    },
    // 搜索返回数据点击
    searchListResult (data) {
      this.treeList = this.departmentList = []
      this.getAddressListDepartmentMembers(data.id)
    },
    // 我的搜索返回
    searchMyBack () {
      this.getAddressListUnitTree()
      this.getAddressListOrganizationMembers()
      this.getAddressListdepartment()
    },
    // 其他单位
    searchOtherBack () {
      this.getAddressListOthertTree()
      this.getAddressListOrganizationMembers()
    },
    /** 点击树节点显示内容 */
    handleNodeClickTree (node) {
      this.navigation = []
      this.navigation.push({ id: node.id, name: node.name })

      if (node.nodeType === 3) {
        this.getAddressListDepartmentMembers(node.bindId)
      } else if (node.nodeType === 2) {
        this.getAddressListOrganizationMembers(node.bindId)
      }
      this.getAddressListdepartment(node.id)
    },
    handleChildClick (node) {
      console.log(JSON.parse(JSON.stringify(node)), '-------------node')
      this.navigation.push({ id: node.id, name: node.name })
      this.getAddressListOrganizationMembers(node.id)
      this.getAddressListdepartment(node.id)
      this.getAddressListDepartmentMembers(node.id)
    },

    /** 单位下部门 */
    getAddressListdepartment (id) {
      api[urlNames['getAddressListTree']]({
        parentId: id
      }).then(res => {
        this.departmentList = res.data
      })
    },

    /** 单位下人员 getAddressListOrganizationMembers */
    getAddressListOrganizationMembers () {
      api[urlNames['getAddressListOrganizationMembers']]({
        orgId: this.app.option.user.orgId
      }).then(res => {
        this.memberList = res.data
      })
    },


    /** 部门下人员getAddressListDepartmentMembers */
    getAddressListDepartmentMembers (id) {
      api[urlNames['getAddressListDepartmentMembers']]({
        deptId: id
      }).then(res => {
        this.memberList = res.data
      })
    },

    /** 点击回到当前 */
    goCurrentNodeDetail (depid, index) {
      let len = this.navigation.length
      this.navigation.splice(index + 1, len - index + 1)
      this.getAddressListdepartment(depid)
      this.getAddressListOrganizationMembers(depid.id)
      this.getAddressListDepartmentMembers(depid.id)
    },

    /** 人员搜索 */
    getAddressListUnitUser () {
      api[urlNames['getAddressListUserByName']]({
        orgId: this.app.option.user.orgId,
        name: this.name
      }).then(res => {
        console.log(res, '===1111111111')
        // this.gridData = res.data
      })
    },
    getAddressListOtherUser () {
      api[urlNames['getAddressListUserByName']]({
        name: this.name
      }).then(res => {
        console.log(res, '========222222222222')
        // this.gridData = res.data
      })
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
