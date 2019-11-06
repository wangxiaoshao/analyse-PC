<template>
  <div class="candidate">
<!--    seleceDialog: {-->
<!--    selectMenmberTitle: '选人组件', // 选人组件标题-->
<!--    selectMenmberFlag: false, // 显示弹窗，-->
<!--    isAllData: false, // 是否需完整数据-默认为不需要（false，只包含用户id）-->
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
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllMember" @change="handleCheckAllMemberChange">选择
          </el-checkbox>
          <el-checkbox-group v-model="checkedMemberList" @change="handleCheckedMemberChange">
            <el-checkbox v-for="item in memberList" :label="item.uid" :key="item.uid">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="select-member">
          <p>已选:</p>
          <el-checkbox-group v-model="selectedMenbersID" @change="handleCheckedSelectChange">
            <el-checkbox v-for="item in selectedMenbers" :label="item.uid" :key="item.uid">{{item.name}}</el-checkbox>
          </el-checkbox-group>
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
      nodeTree: [],
      nodeSonTree: [],
      memberList: [],
      checkAllMember: false, // 全选人员
      checkedMemberList: [], // 已选择的人员数据
      selectedMenbers: [],
      memberData: [], // 返回给调用者数据
      MembersInfo: {},
      selectedMenbersID: [],
      isIndeterminate: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        id: ''
      }
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
      this.$emit('dialogReturnMembersInfo', this.memberData)
      this.$emit('closeselectMenmber')
      this.checkedMemberList = this.selectedMenbers = this.memberData = []
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
      this.$emit('dialogReturnMembersInfo', this.MembersInfo)
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
    handleNodeClick (node) {
      // （1:分类结点、2:部门结点、3:单位结点）
      if (node.nodeType === 2) {
        this.findDepartmentMembers(node.bindId)
      } else if (node.nodeType === 3) {
        this.findOrganizationMembers(node.bindId)
      }
    },
    // 选择框全选--到达已选框k
    handleCheckAllMemberChange (val) {
      let ids = []
      this.memberList.forEach(item => {
        ids.push(item.uid)
      })
      this.checkedMemberList = this.selectedMenbersID = val ? ids : []
      this.selectedMenbers = val ? this.memberList : []
      this.isIndeterminate = false
    },
    // 选择框单选--到达已选框
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
    // 已选-状态改变
    handleCheckedSelectChange (value) {
      console.log(value, '-------------')
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
