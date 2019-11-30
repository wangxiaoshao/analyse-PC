<template>
  <div class="candidate">
    <el-dialog
      custom-class="right-dialog edit-dialog"
      :title="seleceDialog.selectMenmberTitle"
      :visible.sync="seleceDialog.selectMenmberFlag"
      :fullscreen="true"
      center
      :before-close="handleClose">
      <div class="tree-inner">
        <div class="operate">
         <p>
           <el-button type="primary" @click="selectCategory = false" :plain="selectCategory">单位/部门</el-button>
           <el-button type="primary" @click="selectCategory = true" :plain="!selectCategory">人员</el-button>
         </p>
          <p class="search">
            <el-popover
              ref="popover"
              placement="bottom-start"
              trigger="manual"
              v-model="resultFlag"
              width="300">
              <div class="back-btn">
                <el-button size="mini" @click="goBackTree">返回</el-button>
              </div>
              <div class="result-list">
                <el-table v-loading="loadFlag" :data="gridData" :show-header="false" @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column property="name">
                    <template slot-scope="scope">
                      <span :title="scope.row.name" class="table-span" @click="setNodeId(scope.row)">{{scope.row.name}}</span>
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
                </el-select>
                <el-button slot="append" @click.native="getResult" icon="el-icon-search"></el-button>
              </el-input>
            </el-row>
          </p>
        </div>
        <div class="panel">
          <div class="select-tree">
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
          <div class="member-list">
            <div v-if="selectCategory&&!seleceDialog.isSingleSelect" class="member-panel">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllMember" @change="handleCheckAllMemberChange">
                选择人员
              </el-checkbox>
              <el-checkbox-group v-model="checkedMemberList" @change="handleCheckedMemberChange">
                <el-checkbox v-for="item in memberList" :label="item.uid" :key="item.uid">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="member-panel" v-if="selectCategory&&seleceDialog.isSingleSelect">
              <p>选择人员</p>
              <el-radio-group @change="singleChecked" v-model="checkedMemberList">
                <el-radio :key="item.uid" v-for="item in memberList" :label="item.uid">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
            <div class="dep-panel" v-if="!selectCategory&&!seleceDialog.isSingleOrgSelect">
              <el-checkbox :indeterminate="isIndeterminateOrg" v-model="checkAllOrg" @change="handleCheckAllOrgChange">
                选择单位/部门
              </el-checkbox>
              <el-checkbox-group v-model="checkedOrgList" @change="handleCheckedOrgChange">
                <el-checkbox v-for="item in orgList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="dep-panel" v-if="!selectCategory&&seleceDialog.isSingleOrgSelect">
              <p>选择单位/部门</p>
              <el-radio-group @change="singleCheckedOrg"   v-model="checkedOrgList">
                <el-radio :key="item.id" v-for="item in orgList" :label="item.id">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="select-member">
            <div class="member-panel" v-if="selectCategory">
              <p>已选人员:</p>
              <el-checkbox-group v-model="selectedMenbersID" @change="handleCheckedSelectChange">
                <el-checkbox  v-for="item in selectedMenbers" :label="item.uid" :key="item.uid">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="dep-panel" v-if="!selectCategory">
              <p>已选单位/部门:</p>
              <el-checkbox-group v-model="selectedOrgID" @change="handleCheckedSelectOrgChange">
                <el-checkbox v-for="item in selectedOrg" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
// 参数列表
// seleceDialog: {
//   selectMenmberTitle: '选人组件', // 选人组件标题
//     selectMenmberFlag: false, // 显示弹窗，
//     isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
//     notOnlyPerson: false, // 是否只选人，默认为false（只选人），true可以选择单位和部门
//     isSingleSelect: false // 是否为单选框  false为多选（默认），true为单选(isOnlyOrg为true时部门/单位单选)
//     isOnlyOrg: false //  是否只选部门/单位 false为不是只选部门，true为只选部门
// }
export default {
  name: 'Candidate',
  props: ['seleceDialog'],
  data () {
    return {
      // 搜索信息
      searchKeyWord: '',
      searchType: '2',
      resultFlag: false,
      loadFlag: false,
      gridData: [],
      timer: null,
      restaurants: [],
      searchOrgTemp: [], // 搜索选中中间变量
      selectOrgTemp: [], // 搜索选中中间变量
      selectMemberTemp: [], // 搜索选中中间变量
      selectCategory: false,
      nodeTree: [], // 机构树
      nodeSonTree: [], // 子节点
      defaultProps: {
        children: 'children',
        label: 'name',
        id: ''
      }, // 树的绑定形式
      memberList: [], // 人员列表
      checkAllMember: false, // 是否全选
      checkedMemberList: [], // 已选择的人员ID-左边选中
      selectedMenbers: [], // 右边列表
      selectedMenbersID: [], // 已选择的人员ID -- 用于右边
      isIndeterminate: false, // 选人不确定状态

      memberData: [], // 返回给调用者数据
      orgData: [],
      orgList: [],
      isIndeterminateOrg: false, // 部门单位不确定状态
      checkAllOrg: false, // 是否全选-checkAllMember
      selectedOrg: [], // 右边列表
      selectedOrgID: [], // 已选择的人员ID -- 用于右边
      checkedOrgList: [], // 已选部门--左边选中-checkedMemberList
      singleFlag: false,
      memberstyle: 'memberstyle',
      noorgstyle: 'no-orgstyle',
      orgstyle: 'orgstyle',
      singlecheck: 'singlecheck'
    }
  },
  created () {
    this.findNodeTree()
  },
  methods: {
    // 部门/人员/单位选择
    selectCheck () {
      this.selectCategory
    },
    // 确定获取数据
    submit () {
      if (this.seleceDialog.isAllData) {
        this.memberData = this.selectedMenbers
      } else {
        this.memberData = this.selectedMenbersID
      }
      if (this.seleceDialog.notOnlyPerson && this.seleceDialog.isOnlyOrg) {
        this.$emit('dialogReturnMembersInfo', this.memberData, this.selectedOrg)
      } else if (this.seleceDialog.notOnlyPerson) {
        this.$emit('dialogReturnMembersInfo', this.memberData)
      } else if (this.seleceDialog.isOnlyOrg) {
        this.$emit('dialogReturnMembersInfo', this.selectedOrg)
      }
      this.checkedMemberList = this.selectedMenbers = this.selectedMenbers = this.selectedOrgID = this.selectedOrg = this.memberData = []
      this.$emit('closeselectMenmber')
      this.isIndeterminate = this.checkAllMember = false
    },
    // 获取机构树--初始化
    findNodeTree (parentId) {
      api[urlNames['getTree']]({
      }).then((res) => {
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
    // 获取机构树-加载可选
    findcheckNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId
      }).then((res) => {
        this.orgList = []
        this.checkAllOrg = false
        res.data.forEach(item => {
          if (item.nodeType === 2 || item.nodeType === 3) {
            this.orgList.push(item)
          }
        })
      })
    },
    // 追加子节点
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
    // 关闭选人弹窗组件
    handleClose () {
      // 返回人员信息
      // this.$emit('dialogReturnMembersInfo', this.MembersInfo)
      this.$emit('closeselectMenmber')
    },
    // 查询部门下的所有人员
    findDepartmentMembers (deptId) {
      api[urlNames['findDepartmentMembers']]({
        deptId: deptId
      }).then((res) => {
        this.memberList = res.data
        this.checkAllMember = false
      })
    },
    // 查询单位下的所有人员
    findOrganizationMembers (orgId) {
      api[urlNames['findOrganizationMembers']]({
        orgId: orgId
      }).then((res) => {
        this.memberList = res.data
        this.checkAllMember = false
      })
    },
    // 节点被点击时
    handleNodeClick (node) {
      if (this.seleceDialog.isOnlyOrg) {
        this.findcheckNodeTree(node.id)
      }
      // （1:分类结点、3:部门结点、2:单位结点）
      if (node.nodeType === 3) {
        this.findDepartmentMembers(node.bindId)
      } else if (node.nodeType === 2) {
        this.findOrganizationMembers(node.bindId)
      }
    },
    // 选择框全选--到达已选框-人员
    handleCheckAllMemberChange (val) {
      let ids = []
      this.memberList.forEach(item => {
        ids.push(item.uid)
      })
      this.checkedMemberList = this.selectedMenbersID = val ? ids : []
      this.selectedMenbers = val ? this.memberList : []
      this.isIndeterminate = false
    },
    // 选择框单选--到达已选框人员
    handleCheckedMemberChange (val) {
      this.selectedMenbers = this.selectedMenbersID = []
      val.forEach(item => {
        let list = this.memberList.filter(function (x) {
          return x.uid === item
        })
        this.selectedMenbers = this.selectedMenbers.concat(list)
      })
      this.selectedMenbersID = val
      if (val.length === 0) {
        this.selectedMenbers = []
      }
      let checkedCount = val.length
      this.checkAllMember = checkedCount === this.memberList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.memberList.length
    },
    // 已选-状态改变-人员
    handleCheckedSelectChange (value) {
      // this.selectedMenbers = this.selectedMenbers.filter(item => value.indexOf(item.uid) > -1)
    },
    // 选择框全选--到达已选框单位/部门
    handleCheckAllOrgChange (val) {
      let ids = []
      this.orgList.forEach(item => {
        ids.push(item.id)
      })
      // if (val) {
      //   this.checkedOrgList = ids
      //   this.selectedOrgID = this.selectedOrgID.concat(ids) // 全选ID
      //   this.selectedOrgID = this.selectedOrgID.filter(function (element, index, self) {
      //     return self.indexOf(element) === index
      //   })
      //   this.selectedOrg = this.selectedOrg.concat(this.orgList) // q全选
      // } else {
      //   this.checkedOrgList = []
      //   this.selectedOrgID = this.selectedOrgID.splice((this.selectedOrgID.length - ids.length), ids.length)
      //   console.log(this.selectedOrg.length,'------------')
      //   this.selectedOrg = this.selectedOrg.splice((this.selectedOrg.length - ids.length), ids.length)
      // }
      this.selectedOrg = this.selectedOrg.filter(function (element, index, self) {
        return self.indexOf(element.id) === index.id
      })
      this.checkedOrgList = this.selectedOrgID = val ? ids : [] // 全选ID
      this.selectedOrg = val ? this.orgList : [] // q全选
      this.isIndeterminateOrg = false
    },
    // 选择框单选--到达已选框单位部门
    handleCheckedOrgChange (val, e) {
      let that = this
      if (that.selectOrgTemp.length + 1 === val.length) {
        that.selectedOrgID.push(val[val.length - 1])
        let list = that.orgList.filter(function (x) {
          return x.id === val[val.length - 1]
        })
        that.selectedOrg = that.selectedOrg.concat(list)
        that.selectOrgTemp = val
      } else if (that.selectOrgTemp.length - 1 === val.length) {
        that.selectedOrgID = that.selectedOrgID.filter(function (item) {
          return item !== that.selectOrgTemp[that.selectOrgTemp.length - 1]
        })
        that.selectedOrg = that.selectedOrg.filter(function (item) {
          return item.id !== that.selectOrgTemp[that.selectOrgTemp.length - 1]
        })
        that.selectOrgTemp = val
      }
      // this.selectedOrg = this.selectedOrgID = []
      // val.forEach(item => {
      //   let list = this.orgList.filter(function (x) {
      //     return x.id === item
      //   })
      //   this.selectedOrg = this.selectedOrg.concat(list)
      // })
      // this.selectedOrgID = val
      // if (val.length === 0) {
      //   this.selectedOrg = []
      // }
      let checkedCount = val.length
      that.checkAllOrg = checkedCount === that.orgList.length
      that.isIndeterminateOrg = checkedCount > 0 && checkedCount < that.orgList.length
    },
    handleCheckedSelectOrgChange (value) {
      // this.selectedOrg = this.selectedOrg.filter(item => value.indexOf(item.id) > -1)
    },
    // 单选时的操作--人员
    singleChecked () {
      let that = this
      that.selectedMenbers = that.selectedMenbersID = []
      that.selectedMenbersID[0] = that.checkedMemberList
      let list = that.memberList.filter(function (x) {
        return x.uid === that.selectedMenbersID[0]
      })
      that.selectedMenbers = { ...list }
    },
    // 单选操作--部门/单位
    singleCheckedOrg () {
      let that = this
      that.selectedOrg = that.selectedOrgID = []
      that.selectedOrgID[0] = that.checkedOrgList
      let list = that.orgList.filter(function (x) {
        return x.id === that.selectedOrgID[0]
      })
      that.selectedOrg = { ...list }
    },

    // 获取搜索结果
    getResult () {
      let data = {
        name: this.searchKeyWord,
        nodeType: this.searchType
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
          api[urlNames['searchViewNode']](data).then(res => {
            this.gridData = res.data
            this.loadFlag = false
          })
        }, 800)
      } else {
        this.resultFlag = false
        this.timer = null
      }
    },
    blur () {
      this.timer = null
    },
    getType (el) {
      this.searchType = el
    },
    goBackTree () {
      this.searchKeyWord = ''
      this.resultFlag = false
    },
    searchChack (e) {
      console.log(e)
    },
    handleSelectionChange (val) {
      let that = this
      if (that.searchOrgTemp.length + 1 === val.length) {
        if (that.searchType === '2' || that.searchType === '3') {
          that.selectedOrgID.push(val[val.length - 1].id)
          that.selectedOrg.push(val[val.length - 1])
        }
        that.searchOrgTemp = JSON.parse(JSON.stringify(val))
      } else if (that.searchOrgTemp.length - 1 === val.length) {
        if (that.searchType === '2' || that.searchType === '3') {
          that.selectedOrgID = that.selectedOrgID.filter(function (item) {
            return item !== that.searchOrgTemp[that.searchOrgTemp.length - 1].id
          })
          that.selectedOrg = that.selectedOrg.filter(function (item) {
            return item.id !== that.searchOrgTemp[that.searchOrgTemp.length - 1].id
          })
        }
        that.searchOrgTemp = val
      }
      console.log(JSON.parse(JSON.stringify(this.selectedOrgID)))
      console.log(JSON.parse(JSON.stringify(this.selectedOrg)))
    }
  },
  watch: {
    searchType (newVal) {
      this.searchType = newVal
      this.getResult()
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
  // 不选单位样式
  .no-orgstyle {
    height: 400px;
  }

  // 选单位人员checkbox样式
  .memberstyle {
    height: 200px
  }

  // 选单位 单位/部门checkbox样式
  .orgstyle {
    height: 200px;
    margin-top: 5px
  }
  //是否单选
  .singlecheck{
    height: 380px;
  }
</style>
