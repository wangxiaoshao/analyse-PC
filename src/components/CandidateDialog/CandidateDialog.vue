<template>
  <div class="candidate">
    <!--    seleceDialog: {-->
    <!--    selectMenmberTitle: '选人组件', // 选人组件标题-->
    <!--    selectMenmberFlag: false, // 是否显示弹窗，-->
    <!--    isSingleSelect: false // 是否为单选框  false为多选，true为单选-->
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
        <div class="member-list">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">选择
          </el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="select-member">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">已选
          </el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'

const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  name: 'Candidate',
  props: ['seleceDialog'],
  data () {
    return {
      nodeTree: [],
      nodeSonTree: [],
      memberList: [],
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
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

    // 获取机构树--初始化
    findNodeTree (parentId) {
      api[urlNames['getTree']]({
        parentId: parentId
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
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    handleNodeClick (node) {
      console.log(JSON.parse(JSON.stringify(node)), '-----------------')
    }
  }
}
</script>

<style scoped lang="less">
  @import "./Candidate";
</style>
