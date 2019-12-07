<template>
  <div class="select-members">
    <el-dialog
      custom-class="select-member-dialog"
      :title="seleceDialog.selectMenmberTitle"
      :visible.sync="seleceDialog.selectMenmberFlag"
      center
      :before-close="handleClose">
      <div class="top-operate">
        <div class="operate">
          <el-button type="primary" :disabled="orgDisable" @click="selectCategory = 1" :plain="selectCategory!==1">
            单位/部门
          </el-button>
          <el-button type="primary" :disabled="personPisable" @click="selectCategory = 0" :plain="selectCategory===1">
            人员
          </el-button>
        </div>
        <div class="search">
          <el-popover
            ref="popover"
            placement="bottom-start"
            trigger="manual"
            v-model="resultFlag"
            width="300">
            <div class="back-btn">
              <el-button size="mini" @click="goBackTree">返回</el-button>
              <el-button size="mini" type="primary" @click="sureSelect">确定</el-button>
            </div>
            <div class="result-list" style="overflow-y: auto;height: 280px">
              <el-table v-loading="loadFlag" :data="gridData" :show-header="false"
                        @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column property="name">
                  <template slot-scope="scope">
                    <span :title="scope.row.name" class="table-span"
                          @click="setNodeId(scope.row)">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-popover>
          <el-row>
            <el-input
              v-popover:popover
              placeholder="请输入内容"
              v-model="searchKeyWord"
              @input="getResult"
              @blur="blur"
              @keyup.enter.native="getResult"
              class="input-with-select">
              <el-select v-model="searchType" style="width: 80px" @change="getType" slot="prepend" placeholder="请选择">
                <el-option label="单位" value="2">单位</el-option>
                <el-option label="部门" value="3">部门</el-option>
                <el-option label="人员" value="14">人员</el-option>
              </el-select>
              <el-button slot="append" @click="getResult" icon="el-icon-search"></el-button>
            </el-input>
          </el-row>
        </div>
      </div>
      <div class="tree">
        <div class="view-tree">
          <div class="views">
            <el-tree
              :data="nodeTree"
              lazy
              :load="loadNode"
              :props="defaultProps"
              @node-click="handleNodeClick">
             <span class="custom-tree-node" slot-scope="{ node, data }">
               <i class="imenu-icon fa fa-sitemap" v-if="data.nodeType === 1"></i>
               <i class="imenu-icon fa fa-building-o" v-if="data.nodeType === 2"></i>
               <i class="imenu-icon fa fa-institution" v-if="data.nodeType === 3"></i>
               <span>{{node.label}}</span>
             </span>
            </el-tree>
          </div>
        </div>
        <div class="transfer">
          <el-transfer v-if="selectCategory===1" @left-check-change="singleSelectOrg" @change="treeOrgChange"
                       v-model="treeOrgSelected" :titles="['选择单位/部门', '已选单位/部门']" :data="orgList"
                       :props="{key: 'id',label: 'name'}"></el-transfer>
          <el-transfer v-if="selectCategory!==1" @left-check-change="singleSelectMember" @change="treeMemberChange"
                       v-model="treeMemberSelected" :titles="['选择人员', '已选人员']" :data="memberList"
                       :props="{key: 'uid',label: 'name'}"></el-transfer>
        </div>
      </div>
      <div class="submit">
        <el-button type="primary" @click="submitBackData">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'

export default {
  name: 'SelectMembers',
  props: ['seleceDialog'],
  data () {
    return {
      submitDisable: true,
      selectCategory: 1,
      personPisable: false,
      orgDisable: false,
      searchKeyWord: '', // 搜索关键字
      searchType: '2',
      resultFlag: false,
      loadFlag: false, // 加载loding
      gridData: [],
      nodeTree: [], // 父级树
      nodeSonTree: [], // 树子集
      defaultProps: {
        children: 'children',
        label: 'name',
        id: ''
      },
      orgList: [], // 单位部门
      memberList: [], // 单位部门下的人员数据
      treeOrgSelected: [], // 单位部门选中数据
      treeOrgSelectedAllData: [], // 单位部门完成选中数据
      treeMemberSelected: [], // 人员选中ID
      treeMemberSelectedAllData: [], // 人员选中完整数据
      searchMemberData: [], // 搜索选中人员数据
      searchOrgData: [] // 搜索选中单位数据
    }
  },
  created () {
    // isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
    //   notOnlyPerson: true, // 选人，默认为false（选人）
    //   isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选(与notOnlyPerson一起使用，notOnlyPerson为true是有效
    //   isSingleOrgSelect: false, // 是否为单选框  false为多选（默认），true为单选(与isOnlyOrg一起使用，isOnlyOrg为true时部门/单位单选)
    //   isOnlyOrg: false //  是否选部门/单位 true为选部门
    if (this.seleceDialog.notOnlyPerson === true && this.seleceDialog.isOnlyOrg === true) {
      this.personPisable = this.orgDisable = false
    } else if (this.seleceDialog.notOnlyPerson === true && this.seleceDialog.isOnlyOrg === false) {
      this.personPisable = false
      this.orgDisable = true
      this.selectCategory = 0
    } else if (this.seleceDialog.notOnlyPerson === false && this.seleceDialog.isOnlyOrg === true) {
      this.personPisable = true
      this.orgDisable = false
      this.selectCategory = 1
    }
    if (this.seleceDialog.nodeInfo) {
      this.nodeTree.push(this.seleceDialog.nodeInfo)
    } else {
      this.findNodeTree()
    }
  },
  methods: {
    // 返回数据
    submitBackData () {
      // isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
      //   notOnlyPerson: true, // 选人，默认为false（只选人）
      //   isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选(与notOnlyPerson一起使用，notOnlyPerson为true是有效
      //   isSingleOrgSelect: false, // 是否为单选框  false为多选（默认），true为单选(与isOnlyOrg一起使用，isOnlyOrg为true时部门/单位单选)
      //   isOnlyOrg: false //  是否选部门/单位 true为选部门
      if (this.seleceDialog.isAllData) {
        // 1单位 0选择人员
        if (this.selectCategory === 1) {
          this.$emit('dialogReturnMembersInfo', this.treeOrgSelectedAllData, this.selectCategory)
        } else {
          this.$emit('dialogReturnMembersInfo', this.treeMemberSelectedAllData, this.selectCategory)
        }
      } else {
        if (this.selectCategory === 1) {
          this.$emit('dialogReturnMembersInfo', this.treeOrgSelected, this.selectCategory)
        } else {
          this.$emit('dialogReturnMembersInfo', this.treeMemberSelected, this.selectCategory)
        }
      }
      this.treeMemberSelected = this.treeOrgSelected = this.treeMemberSelectedAllData = this.treeOrgSelectedAllData = []
      this.memberList = this.orgList = []
      this.submitDisable = true
      this.handleClose()
    },
    // 获取机构树--初始化
    findNodeTree () {
      api[urlNames['getTree']]({}).then((res) => {
        this.nodeTree = res.data
      })
    },
    // 获取机构树--加载子节点
    findSonNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId
      }).then((res) => {
        this.nodeSonTree = res.data
      })
    },
    // 加载下一级
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.nodeTree)
      }
      this.findSonNodeTree(node.data.id)
      setTimeout(() => {
        resolve(this.nodeSonTree)
      }, 500)
      this.nodeSonTree = []
    },
    // 获取机构树-加载可选
    findcheckNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId
      }).then((res) => {
        this.orgList = []
        res.data.forEach(item => {
          if (item.nodeType === 2 || item.nodeType === 3) {
            this.orgList.push(item)
          }
        })
        this.orgList = this.orgList.concat(this.treeOrgSelectedAllData)
        this.treeMemberSelected = this.treeMemberSelectedAllData = []
      })
    },
    // 节点被点击时
    handleNodeClick (node) {
      if (this.seleceDialog.isOnlyOrg) {
        this.findcheckNodeTree(node.id)
      }
      // （1:分类结点、3:部门结点、2:单位结点）
      if (this.selectCategory === 0) {
        if (node.nodeType === 3) {
          this.findDepartmentMembers(node.bindId)
        } else if (node.nodeType === 2) {
          this.findOrganizationMembers(node.bindId)
        }
        this.treeOrgSelected = this.treeOrgSelectedAllData = []
      }
    },
    // 查询部门下的所有人员
    findDepartmentMembers (deptId) {
      api[urlNames['findDepartmentMembers']]({
        deptId: deptId
      }).then((res) => {
        this.memberList = res.data
        this.memberList = this.memberList.concat(this.treeMemberSelectedAllData)
      })
    },
    // 查询单位下的所有人员
    findOrganizationMembers (orgId) {
      api[urlNames['findOrganizationMembers']]({
        orgId: orgId
      }).then((res) => {
        this.memberList = res.data
        this.memberList = this.memberList.concat(this.treeMemberSelectedAllData)
      })
    },
    treeOrgChange (value, direction, movedKeys) {
      if (direction === 'right') {
        movedKeys.forEach(item => {
          let list = this.orgList.filter(function (listItem) {
            return listItem.id === item
          })
          this.treeOrgSelectedAllData = this.treeOrgSelectedAllData.concat(list)
        })
      } else if (direction === 'left') {
        movedKeys.forEach(item => {
          this.treeOrgSelectedAllData = this.treeOrgSelectedAllData.filter(function (listItem) {
            return listItem.id !== item
          })
        })
      }
      if (this.treeOrgSelected.length !== 0) {
        this.submitDisable = false
      }
    },
    // 人员穿梭处理
    treeMemberChange (value, direction, movedKeys) {
      if (direction === 'right') {
        // if (this.seleceDialog.isSingleSelect === true && this.treeMemberSelected.length < 1) {
        //   this.treeMemberSelected = value[0]
        //   let list = this.memberList.filter(function (listItem) {
        //     return listItem.uid === this.treeMemberSelected[0]
        //   })
        //   this.treeMemberSelectedAllData = this.treeMemberSelectedAllData.concat(list)
        // } else {
        movedKeys.forEach(item => {
          let list = this.memberList.filter(function (listItem) {
            return listItem.uid === item
          })
          this.treeMemberSelectedAllData = this.treeMemberSelectedAllData.concat(list)
        })
        // }
      } else if (direction === 'left') {
        movedKeys.forEach(item => {
          this.treeMemberSelectedAllData = this.treeMemberSelectedAllData.filter(function (listItem) {
            return listItem.uid !== item
          })
        })
      }
      if (this.treeOrgSelected.length !== 0) {
        this.submitDisable = false
      }
    },
    singleSelectMember (value, direction, movedKeys) {
      if (this.seleceDialog.isSingleSelect) {
        if (value.length === 0) {
          for (let i = 0; i < this.memberList.length; i++) {
            this.memberList[i].disabled = false
          }
        } else {
          for (let i = 0; i < this.memberList.length; i++) {
            if (this.memberList[i].id === value[0]) {
              this.memberList[i].disabled = true
              if (this.orgList[i].id === value[0]) {
                this.memberList[i].disabled = false
              }
            }
          }
        }
        if (value.length > 1 && this.seleceDialog.isSingleSelect === true) {
          this.$message.info('抱歉您只能选择一个人员')
          return false
        }
      }
      if (this.treeMemberSelected.length !== 0) {
        this.submitDisable = false
      }
    },
    singleSelectOrg (value, direction, movedKeys) {
      if (this.seleceDialog.isSingleOrgSelect) {
        if (value.length === 0) {
          for (let i = 0; i < this.orgList.length; i++) {
            this.orgList[i].disabled = false
          }
        } else {
          for (let i = 0; i < this.orgList.length; i++) {
            this.orgList[i].disabled = true
            if (this.orgList[i].id === value[0]) {
              this.orgList[i].disabled = false
            }
          }
        }
        console.log(JSON.parse(JSON.stringify(this.orgList)), '--------------')
        if (value.length > 1 && this.seleceDialog.isOnlyOrg === true) {
          this.$message.info('抱歉您只能选择一个单位或部门')
          return false
        }
      }
      if (this.treeMemberSelected.length !== 0) {
        this.submitDisable = false
      }
    },
    // 关闭选人弹窗组件
    handleClose () {
      this.$emit('closeselectMenmber')
      this.goBackTree()
      this.treeMemberSelected = this.treeOrgSelected = this.treeMemberSelectedAllData = this.treeOrgSelectedAllData = []
      this.memberList = this.orgList = []
      this.submitDisable = true
    },
    // 获取搜索结果
    getResult () {
      let data = {}
      if (this.searchType === '2' || this.searchType === '3') {
        data = {
          name: this.searchKeyWord,
          nodeType: this.searchType
        }
      } else {
        data = {
          name: this.searchKeyWord
        }
        api[urlNames['searchMember']](data).then(res => {
          this.gridData = res.data
          this.loadFlag = false
        })
      }

      if (this.searchKeyWord.length > 1) {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }
        // this.timer = this.debounce(this.getResultList, 800)
        this.timer = setTimeout(() => {
          this.resultFlag = true
          this.loadFlag = true
          if (this.searchType === '2' || this.searchType === '3') {
            api[urlNames['searchViewNode']](data).then(res => {
              this.gridData = res.data
              this.loadFlag = false
            })
          }
        }, 800)
      } else {
        this.resultFlag = false
        this.timer = null
      }
    },
    getType (el) {
      this.searchType = el
    },
    blur () {
      this.timer = null
    },
    goBackTree () {
      this.searchKeyWord = ''
      this.resultFlag = false
    },
    // 搜索选中
    handleSelectionChange (val) {
      this.searchOrgData = []
      if (this.searchType === '2' || this.searchType === '3') {
        this.searchOrgData = val
      } else {
        this.searchMemberData = val
      }
    },
    // 确认搜索选中
    sureSelect () {
      if (this.searchType === '2' || this.searchType === '3') {
        this.searchOrgData.forEach(item => {
          this.treeOrgSelected.push(item.id)
        })
        this.treeOrgSelectedAllData = this.treeOrgSelectedAllData.concat(this.searchOrgData)
        this.orgList = this.orgList.concat(this.searchOrgData)
      } else {
        this.searchMemberData.forEach(item => {
          this.treeMemberSelected.push(item.uid)
        })
        this.treeMemberSelectedAllData = this.treeMemberSelectedAllData.concat(this.searchMemberData)
        this.memberList = this.memberList.concat(this.searchMemberData)
      }
      this.goBackTree()
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
