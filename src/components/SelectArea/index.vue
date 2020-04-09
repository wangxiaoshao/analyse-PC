<template>
  <div class="select-members">
    <el-dialog
      custom-class="select-member-dialog"
      title="选择授权区域"
      :visible.sync="openSelectArea"
      center
      :before-close="handleClose">
<!--      <div class="search">-->
<!--        <el-input-->
<!--        placeholder="请输入内容"-->
<!--        v-model="searchKeyWord"-->
<!--        @input="getResult"-->
<!--        @keyup.enter.native="getResult"-->
<!--        class="input-with-select">-->
<!--        <el-select v-model="searchType" style="width: 80px" @change="getType" slot="prepend" placeholder="请选择">-->
<!--          <el-option label="单位" value="2">单位</el-option>-->
<!--        </el-select>-->
<!--        <el-button slot="append" @click="getResult" icon="el-icon-search"></el-button>-->
<!--      </el-input></div>-->
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
                <span :title="node.label">{{node.label}}</span>
              </span>
          </el-tree>
        </div>
        <div class="wait-select">
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
        <div class="container">
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
      <div class="submit">
        <el-button type="primary" @click="submitBackData">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import CheckRole from '@src/mixins/checkRole'

export default {
  name: 'SelectArea',
  props: ['openSelectArea'],
  mixins: [CheckRole],
  data () {
    return {
      org: false,
      submitDisable: '',
      searchKeyWord: '',
      searchType: '2', // 搜索类型
      selectCategory: 0, // 0 人员 ，1 内设机构/单位
      nodeTree: [], // 树
      defaultProps: {
        children: 'children',
        label: 'name',
        id: '',
        isLeaf: 'leaf'
      },
      // 中间待选择的成员数据，可能是人员，也可能是单位
      orgList: [], // 内设机构
      orgsModel: [], // 内设机构
      orgSingleModel: [], // 内设机构单选
      // 右侧已经选择的成员数据
      selectedOrgs: [],
      selectedOrgsModel: []
    }
  },
  created () {
    if (this.isRole('AREA_MANAGE')) {
      this.nodeTree = []
      let that = this
      this.$store.state.app.option.authorizedEntityVos.forEach(function (item) {
        if (item.roleName === 'AREA_MANAGE') {
          item.authorizedEntityVos.forEach(function (item) {
            if (item.authorizedType === 3) {
              that.nodeTree.push({
                id: item.authorizedOid,
                name: item.name
              })
            }
          })
        }

      })
    } else {
      this.findNodeTree()
    }
  },
  methods: {
    // 返回数据
    submitBackData () {
      let idList = []
      let itemId = {}
      this.selectedOrgs.forEach(item => {
        itemId = {
          authorizedOid: item.id
        }
        idList.push(itemId)
      })
      this.$emit('dialogReturnArea', idList)
      this.handleClose()
    },
    // 关闭选人弹窗组件
    handleClose () {
      this.selectedOrgs = this.selectedOrgsModel = []
      this.removeAllSelectedOrg()
      this.$emit('closeSelectArea')
    },
    // 获取机构树--初始化
    findNodeTree () {
      api[urlNames['getAreaList']]({}).then((res) => {
        this.nodeTree = res.data
      })
    },
    // 加载下一级
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.nodeTree)
      }
      api[urlNames['getAreaList']]({
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
      this.findcheckNodeTree(node)
    },
    // 获取机构树-加载可选
    findcheckNodeTree (parentNode) {
      api[urlNames['getAreaList']]({
        parentId: parentNode.id
      }).then((res) => {
        this.orgList = [parentNode]
        res.data.forEach(item => {
          this.orgList.push(item)
        })
      })
    },
    // 内设机构/单位处理
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
      let data = {
        name: this.searchKeyWord,
        nodeType: this.searchType
      }
      api[urlNames['searchViewNode']](data).then(res => {
        this.orgList = res.data
      })
    },
    getType (el) {
      this.searchType = el
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
