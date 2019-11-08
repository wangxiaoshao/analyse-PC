<template>
  <div class="candidate">
    <!--    seleceDialog: {-->
    <!--    selectMenmberTitle: '选人组件', // 选人组件标题-->
    <!--    selectMenmberFlag: false, // 显示弹窗，-->
    <!--    isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）-->
    <!--    notOnlyPerson: false, // 是否只选人，默认为false（只选人），true可以选择单位和部门-->
    <!--    isSingleSelect: false // 是否为单选框  false为多选（默认），true为单选-->
    <!--    }-->
    <el-dialog
      custom-class="right-dialog edit-dialog"
      :title="seleceDialog.selectMenmberTitle"
      :visible.sync="seleceDialog.selectMenmberFlag"
      :fullscreen="true"
      center
      :before-close="handleClose">
      <div class="panel">
        <div class="select-tree">
          <el-tree
            :data="nodeTree"
            lazy
            :load="loadNode"
            :props="defaultProps"
            @node-click="handleNodeClick"></el-tree>
        </div>
        <!--        <div class="transfer">-->
        <!--          <el-transfer-->
        <!--            filterable-->
        <!--            height="360px"-->
        <!--            filter-placeholder="请输入名字"-->
        <!--            v-model="selectedMenbers"-->
        <!--            :props="{key: 'uid',label: 'name'}"-->
        <!--            :titles="['选择', '已选']"-->
        <!--            :data="memberList">-->
        <!--          </el-transfer>-->
        <!--        </div>-->
        <div class="member-list">
          <div v-if="!seleceDialog.isSingleSelect" class="member-panel" :class="seleceDialog.notOnlyPerson?memberstyle:noorgstyle">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllMember" @change="handleCheckAllMemberChange">
              选择人员
            </el-checkbox>
            <el-checkbox-group v-model="checkedMemberList" @change="handleCheckedMemberChange">
              <el-checkbox v-for="item in memberList" :label="item.uid" :key="item.uid">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="member-panel" v-if="seleceDialog.isSingleSelect">
            <p>选择人员</p>
            <el-radio-group @change="singleChecked" :class="seleceDialog.notOnlyPerson?memberstyle:singlecheck"  v-model="checkedMemberList">
              <el-radio :key="item.uid" v-for="item in memberList" :label="item.uid">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
          <div class="dep-panel" v-if="seleceDialog.notOnlyPerson" :class="{orgstyle:seleceDialog.notOnlyPerson}">
            <el-checkbox :indeterminate="isIndeterminateOrg" v-model="checkAllOrg" @change="handleCheckAllOrgChange">
              选择单位/部门
            </el-checkbox>
            <el-checkbox-group v-model="checkedOrgList" @change="handleCheckedOrgChange">
              <el-checkbox v-for="item in orgList" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="select-member">
          <div class="member-panel" :class="seleceDialog.notOnlyPerson?memberstyle:noorgstyle">
            <p>已选人员:</p>
            <el-checkbox-group v-model="selectedMenbersID" @change="handleCheckedSelectChange">
              <el-checkbox  v-for="item in selectedMenbers" :label="item.uid" :key="item.uid">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="dep-panel" v-if="seleceDialog.notOnlyPerson" :class="{orgstyle:seleceDialog.notOnlyPerson}">
            <p>已选单位/部门:</p>
            <el-checkbox-group v-model="selectedOrgID" @change="handleCheckedSelectOrgChange">
              <el-checkbox v-for="item in selectedOrg" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'

export default {
  name: 'Candidate',
  props: ['seleceDialog'],
  data () {
    return {
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
    this.findNodeTree('-1')
  },
  methods: {
    // 确定获取数据
    submit () {
      if (this.seleceDialog.isAllData) {
        this.memberData = this.selectedMenbers
      } else {
        this.memberData = this.selectedMenbersID
      }
      if (this.seleceDialog.notOnlyPerson) {
        this.$emit('dialogReturnMembersInfo', this.memberData, this.selectedOrg)
      } else {
        this.$emit('dialogReturnMembersInfo', this.memberData)
      }
      this.checkedMemberList = this.selectedMenbers = this.selectedMenbers = this.selectedOrgID = this.selectedOrg = this.memberData = []
      this.$emit('closeselectMenmber')
      this.isIndeterminate = this.checkAllMember = false
    },
    // 获取机构树--初始化
    findNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.nodeTree = res.data
      })
    },
    // 获取机构树--加载子节点
    findSonNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.nodeSonTree = res.data
      })
    },
    // 获取机构树-加载可选
    findcheckNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId,
        viewId: -1
      }).then((res) => {
        this.orgList = []
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
    // 节点被点击时
    handleNodeClick (node) {
      if (this.seleceDialog.notOnlyPerson) {
        this.findcheckNodeTree(node.id)
      }
      // （1:分类结点、2:部门结点、3:单位结点）
      if (node.nodeType === 2) {
        this.findDepartmentMembers(node.bindId)
      } else if (node.nodeType === 3) {
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
    // 选择框单选--到达已选框单位/部门
    handleCheckAllOrgChange (val) {
      let ids = []
      this.orgList.forEach(item => {
        ids.push(item.id)
      })
      this.checkedOrgList = this.selectedOrgID = val ? ids : [] // 权限ID
      this.selectedOrg = val ? this.orgList : [] // q全选
      this.isIndeterminateOrg = false
    },
    // 选择框单选--到达已选框单位部门
    handleCheckedOrgChange (val) {
      this.selectedOrg = this.selectedOrgID = []
      val.forEach(item => {
        let list = this.orgList.filter(function (x) {
          return x.id === item
        })
        this.selectedOrg = this.selectedOrg.concat(list)
      })
      this.selectedOrgID = val
      if (val.length === 0) {
        this.selectedOrg = []
      }
      let checkedCount = val.length
      this.checkAllOrg = checkedCount === this.orgList.length
      this.isIndeterminateOrg = checkedCount > 0 && checkedCount < this.orgList.length
    },
    handleCheckedSelectOrgChange (value) {
      // this.selectedOrg = this.selectedOrg.filter(item => value.indexOf(item.id) > -1)
    },
    // 单选时的操作
    singleChecked () {
      let that = this
      that.selectedMenbers = that.selectedMenbersID = []
      that.selectedMenbersID[0] = that.checkedMemberList
      let list = that.memberList.filter(function (x) {
        return x.uid === that.selectedMenbersID[0]
      })
      that.selectedMenbers = { ...list }
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
