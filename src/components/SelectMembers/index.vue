<template>
  <div class="select-members">
    <el-dialog
      custom-class="select-member-dialog"
      :title="seleceDialog.selectMenmberTitle"
      :visible.sync="seleceDialog.selectMenmberFlag"
      center
      :before-close="handleClose">
      <div class="select-category"
           v-if="seleceDialog.notOnlyPerson === true&&seleceDialog.isOnlyOrg === true">
        <el-button type="primary" @click="selectCategory = 1;searchType = '2'" :plain="selectCategory!==1">
          单位/部门
        </el-button>
        <el-button type="primary" @click="selectCategory = 0;searchType = '12'" :plain="selectCategory===1">
          人员
        </el-button>
      </div>
      <div class="search">
        <el-input
        placeholder="请输入内容"
        v-model="searchKeyWord"
        @input="getResult"
        @keyup.enter.native="getResult"
        class="input-with-select">
        <el-select v-model="searchType" style="width: 80px" @change="getType" slot="prepend" placeholder="请选择">
          <el-option v-if="selectCategory!==0" label="单位" value="2">单位</el-option>
          <el-option v-if="selectCategory!==0" label="部门" value="3">部门</el-option>
          <el-option v-if="selectCategory===0"  label="人员" value="12">人员</el-option>
        </el-select>
        <el-button slot="append" @click="getResult" icon="el-icon-search"></el-button>
      </el-input></div>
      <div class="select-panel" style="display: flex">
        <div class="tree">
          <el-tree
            :data="nodeTree"
            lazy
            :load="loadNode"
            :props="defaultProps"
            @node-click="handleNodeClick">
            <span class=" svg-container" slot-scope="{ node, data }">
                <span class="iconfont iconzuzhijigou" v-if="data.nodeType === 1"></span>
                <span class="iconfont icondanwei" v-if="data.nodeType === 2"></span>
                <span class="iconfont iconbumen" v-if="data.nodeType === 3"></span>
                <span>{{node.label}}</span>
              </span>
          </el-tree>
        </div>
        <div class="wait-select">
          <div v-if="selectCategory === 0">
            <div v-if="seleceDialog.isSingleSelect!==true">
              <el-checkbox v-model="member" class="member-item" @change="toggleAllMembers">全选</el-checkbox>
              <el-checkbox-group v-model="membersModel" @change="toggleMember">
                <el-checkbox style="display: block" class="member-item text-ellipsis"
                             v-for="member in memberList"
                             :key="member.uid"
                             :label="JSON.stringify(member)">
                  {{member.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="seleceDialog.isSingleSelect===true">
              <el-radio-group v-model="memberSingleModel" @change="singleSelectMember">
                <el-radio v-for="member in memberList" :key="member.uid" style="display: block" :label="JSON.stringify(member)">{{member.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div v-if="selectCategory === 1">
           <div v-if="seleceDialog.isSingleOrgSelect!==true">
             <el-checkbox v-model="org" class="member-item" @change="toggleAllOrgs">全选</el-checkbox>
             <el-checkbox-group v-model="orgsModel" @change="toggleOrg">
               <el-checkbox style="display: block" class="member-item text-ellipsis"
                            v-for="org in orgList"
                            :key="org.id"
                            :label="JSON.stringify(org)">
                 {{org.name}}
               </el-checkbox>
             </el-checkbox-group>
           </div>
            <div v-if="seleceDialog.isSingleOrgSelect===true">
              <el-radio-group v-model="orgSingleModel" @change="toggleSingleOrg">
                <el-radio v-for="org in orgList" :key="org.id" style="display: block" :label="JSON.stringify(org)">{{org.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="container">
          <div v-if="selectCategory === 0">
            <el-button size="small"
                       type="text"
                       v-show="selectedMembers.length > 0"
                       @click="removeAllSelected">取消全部
            </el-button>
            <el-checkbox-group v-model="selectedMembersModel" @change="toggleSelectedOrg">
              <el-checkbox style="display: block" v-for="member in selectedMembers" :label="JSON.stringify(member)"
                           :key="member.uid"> {{member.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div v-if="selectCategory === 1">
            <el-button size="small"
                       type="text"
                       v-show="selectedOrgs.length > 0"
                       @click="removeAllSelectedOrg">取消全部
            </el-button>
            <el-checkbox-group v-model="selectedOrgsModel" @change="toggleSelectedOrg">
              <el-checkbox style="display: block" v-for="org in selectedOrgs" :label="JSON.stringify(org)"
                           :key="org.id"> {{org.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
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
      submitDisable: '',
      searchKeyWord: '',
      searchType: '12', // 搜索类型
      selectCategory: 0, // 0 人员 ，1 部门/单位
      nodeTree: [], // 树
      defaultProps: {
        children: 'children',
        label: 'name',
        uid: '',
        isLeaf: 'leaf'
      },
      // 中间待选择的成员数据，可能是人员，也可能是单位
      memberList: [], // 人员
      membersModel: [], // 人员
      memberSingleModel: [], // 单选
      orgList: [], // 部门
      orgsModel: [], // 部门
      orgSingleModel: [], // 部门单选
      // 右侧已经选择的成员数据
      selectedMembers: [],
      selectedMembersModel: [],
      selectedOrgs: [],
      selectedOrgsModel: []
    }
  },
  created () {
    if (this.seleceDialog.notOnlyPerson === true && this.seleceDialog.isOnlyOrg === false) {
      this.selectCategory = 0
    } else if (this.seleceDialog.notOnlyPerson === false && this.seleceDialog.isOnlyOrg === true) {
      this.selectCategory = 1
      this.searchType = '2'
    }
    if (this.seleceDialog.nodeInfo) {
      this.nodeTree.push(this.seleceDialog.nodeInfo)
    } else {
      this.findNodeTree()
    }
  },
  methods: {
    /*
  seleceDialog: {
  selectMenmberTitle: '分组成员添加', // 选人组件标题
  selectMenmberFlag: false, // 显示弹窗，
  isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
  notOnlyPerson: true, // 选人，默认为false（只选人）
  isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选(与notOnlyPerson一起使用，notOnlyPerson为true是有效
  isSingleOrgSelect: false, // 是否为单选框  false为多选（默认），true为单选(与isOnlyOrg一起使用，isOnlyOrg为true时部门/单位单选)
  isOnlyOrg: true //  是否选部门/单位 true为选部门
  }
  */
    // 返回数据
    submitBackData () {
      if (this.seleceDialog.isOnlyOrg && this.seleceDialog.notOnlyPerson) {
        this.$emit('dialogReturnMembersInfo', this.selectedMembers, this.selectedOrgs)
      } else {
        // 单独选人或者单独选部门
        if (this.selectCategory === 0) {
          if (this.seleceDialog.isAllData) {
            this.$emit('dialogReturnMembersInfo', this.selectedMembers, this.selectCategory)
          } else {
            let ids = []
            this.selectedMembers.forEach(item => {
              ids.push(item.uid)
            })
            this.$emit('dialogReturnMembersInfo', ids, this.selectCategory)
          }
        } else if (this.selectCategory === 1) {
          if (this.seleceDialog.isAllData) {
            this.$emit('dialogReturnMembersInfo', this.selectedOrgs, this.selectCategory)
          } else {
            let ids = []
            this.selectedOrgs.forEach(item => {
              ids.push(item.uid)
            })
            this.$emit('dialogReturnMembersInfo', ids, this.selectCategory)
          }
        }
      }
      this.handleClose()
    },
    // 关闭选人弹窗组件
    handleClose () {
      this.selectedMembers = this.selectedMembersModel = this.selectedOrgs = this.selectedOrgsModel = this.selectedMembersModel = []
      this.orgSingleModel = this.memberSingleModel = []
      this.removeAllSelected()
      this.removeAllSelectedOrg()
      this.$emit('closeselectMenmber')
    },
    // 获取机构树--初始化
    findNodeTree () {
      api[urlNames['getTree']]({}).then((res) => {
        this.nodeTree = res.data
      })
    },
    // 加载下一级
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.nodeTree)
      }
      api[urlNames['getTree']]({
        parentId: node.data.id
      }).then((res) => {
        if (res.status === 0) {
          let treeData = []
          res.data.forEach(item => {
            if (item.hasChildren === 0) {
              item.leaf = true
            }
            treeData.push(item)
          })
          resolve(treeData)
        }
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
      }
    },
    // 查询部门下的所有人员
    findDepartmentMembers (deptId) {
      api[urlNames['findDepartmentMembers']]({
        deptId: deptId
      }).then((res) => {
        this.memberList = res.data
      })
    },
    // 查询单位下的所有人员
    findOrganizationMembers (orgId) {
      api[urlNames['findOrganizationMembers']]({
        orgId: orgId
      }).then((res) => {
        this.memberList = res.data
      })
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
      })
    },
    // 人员处理
    // 全选
    toggleAllMembers (selected) {
      let that = this
      if (selected) {
        that.memberList.forEach((member) => {
          const label = JSON.stringify(member)
          that.addToSelectedModel(label)
          that.addSelectedMember(member)
          if (!that.membersModel.includes(label)) {
            that.membersModel.push(label)
          }
        })
      } else {
        that.memberList.forEach((member) => {
          const label = JSON.stringify(member)
          that.removeFromMemberModel(label)
          that.removeSelectedMember(member)

          const indexOf = that.membersModel.indexOf(label)
          if (indexOf !== -1) {
            that.membersModel.splice(indexOf, 1)
          }
        })
      }
      console.log(JSON.parse(JSON.stringify(this.selectedMembers)), '------------')
    },
    toggleMember (members) {
      this.selectedMembers = members.map((member) => {
        const label = JSON.parse(member)
        this.addToSelectedModel(member)
        return label
      })
    },
    singleSelectMember (members) {
      this.selectedMembersModel = []
      this.selectedMembers[0] = JSON.parse(this.memberSingleModel)
      this.selectedMembersModel.push(members)
    },
    toggleSelectedMember (members) {
      this.membersModel.forEach((member) => {
        if (!members.includes(member)) {
          this.removeFromMemberModel(member)
          this.removeSelectedMember(JSON.parse(member))
        }
      })
    },
    addToSelectedModel (label) {
      if (!this.selectedMembersModel.includes(label)) {
        this.selectedMembersModel.push(label)
      }
    },
    removeFromMemberModel (label) {
      const index = this.membersModel.indexOf(label)
      if (index !== -1) {
        this.membersModel.splice(index, 1)
      }
    },
    addSelectedMember (member) {
      console.log(JSON.parse(JSON.stringify(this.selectedMembers)), 'this.selectedMembers---123')
      let i = this.selectedMembers.length - 1
      while (i >= 0) {
        const current = this.selectedMembers[i]
        if (current.uid === member.uid && current.type === member.type) {
          return
        }

        i -= 1
      }

      this.selectedMembers.push(member)
    },
    removeSelectedMember (member) {
      let i = this.selectedMembers.length - 1
      while (i >= 0) {
        const current = this.selectedMembers[i]
        if (current.id === member.id && current.memberType === member.memberType) {
          this.selectedMembers.splice(i, 1)
          return
        }

        i -= 1
      }
    },
    removeAllSelected () {
      this.selectedMembers = []
      this.selectedMembersModel = []
      this.membersModel = []
    },
    getSelectedMembers () {
      return [...this.selectedMembers]
    },
    // 部门/单位处理
    // 全选
    toggleAllOrgs (selected) {
      let that = this
      if (selected) {
        that.orgList.forEach((org) => {
          const label = JSON.stringify(org)
          that.addToSelectedOrgModel(label)
          that.addSelectedOrg(org)
          if (!that.orgsModel.includes(label)) {
            that.orgsModel.push(label)
          }
        })
      } else {
        that.orgList.forEach((org) => {
          const label = JSON.stringify(org)
          that.removeFromOrgModel(label)
          that.removeSelectedOrg(org)

          const indexOf = that.orgsModel.indexOf(label)
          if (indexOf !== -1) {
            that.orgsModel.splice(indexOf, 1)
          }
        })
      }
      console.log(JSON.parse(JSON.stringify(this.selectedOrgs)), '------------')
    },
    toggleOrg (orgs) {
      this.selectedOrgs = orgs.map((org) => {
        const label = JSON.parse(org)
        this.addToSelectedOrgModel(org)
        return label
      })
    },
    toggleSingleOrg (org) {
      this.selectedOrgsModel = []
      this.selectedOrgs[0] = this.orgSingleModel
      this.selectedOrgsModel.push(org)
    },
    toggleSelectedOrg (orgs) {
      this.orgsModel.forEach((org) => {
        if (!orgs.includes(org)) {
          this.removeFromOrgModel(org)
          this.removeSelectedOrg(JSON.parse(org))
        }
      })
    },
    addToSelectedOrgModel (label) {
      if (!this.selectedOrgsModel.includes(label)) {
        this.selectedOrgsModel.push(label)
      }
    },
    removeFromOrgModel (label) {
      const index = this.orgsModel.indexOf(label)
      if (index !== -1) {
        this.orgsModel.splice(index, 1)
      }
    },
    addSelectedOrg (org) {
      let i = this.selectedOrgs.length - 1
      while (i >= 0) {
        const current = this.selectedOrgs[i]
        if (current.id === org.id && current.type === org.type) {
          return
        }

        i -= 1
      }

      this.selectedOrgs.push(org)
    },
    removeSelectedOrg (org) {
      let i = this.selectedOrgs.length - 1
      while (i >= 0) {
        const current = this.selectedOrgs[i]
        if (current.id === org.id && current.orgType === org.orgType) {
          this.selectedOrgs.splice(i, 1)
          return
        }

        i -= 1
      }
    },
    removeAllSelectedOrg () {
      this.selectedOrgs = []
      this.selectedOrgsModel = []
      this.orgsModel = []
      this.selectedOrgsModel = []
    },
    // 获取搜索结果
    getResult () {
      let data = {}
      if (this.searchType === '2' || this.searchType === '3') {
        data = {
          name: this.searchKeyWord,
          nodeType: this.searchType
        }
        api[urlNames['searchViewNode']](data).then(res => {
          this.orgList = res.data
        })
      } else {
        data = {
          name: this.searchKeyWord
        }
        api[urlNames['searchMember']](data).then(res => {
          this.memberList = res.data
        })
      }
    },
    getType (el) {
      this.searchType = el
    }
  }
}
</script>

<style lang="less">
  @import "./index";
</style>
