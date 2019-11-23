<template>
  <div class="area-content">
    <!--<el-cascader
      :options="options"
      :props="props"
      style="width: 100%"
      v-model="areaValue"
      @change="getAreaValue"
    >
    </el-cascader>-->
    <!--<el-tree
      :data="treeList"
      node-key="id"
      :props="defaultProps"
      :highlight-current="true"
      :default-expanded-keys="defaultNode"
      lazy
      ref="treeList"
      :load="loadNode"
      @node-click="handleNodeClick"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <el-radio v-model="data.id">{{node.label}}</el-radio>
      </span>
    </el-tree>-->
    <div class="tree-content">
      <el-tree
        :data="treeList"
        node-key="id"
        :props="defaultProps"
        ref="areaTree"
        lazy
        :load="loadNode"
        @node-click="handleNodeClick"
        :expand-on-click-node="false">
        <span class="department-tree-node" slot-scope="{ node, data }">{{data.name }}</span>
      </el-tree>
    </div>
    <div class="tree-footer">
      <el-button type="primary" @click="submitArea">确认</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'

export default {
  props: ['areaOption'],
  data () {
    return {
      areaValue: [],
      options: [], // 第一次加载数据
      value: '',
      props: {
        multiple: false,
        lazy: true,
        children: 'children',
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.data) {
            return
          }
          if (node.data) {
            api[urlNames['getAreaList']]({
              parentId: node.data.id
            }).then((res) => {
              resolve(res.data)
              this.value = node.data.id
            })
          }
        }
      },
      treeList: [],
      treeSonList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      id: '',
      parentId: '',
      checkOption: []
    }
  },
  created () {
    this.findTreeList()
  },
  methods: {
    loadNode (node, resolve) {
      if (node.level === 0) {
        return resolve(this.treeList)
      } else {
        this.findTreeSonList(node.data.id)
        this.id = node.data.id
        setTimeout(() => {
          resolve(this.treeSonList)
        }, 800)
        this.treeSonList = []
      }
    },
    findTreeList (parentId) {
      api[urlNames['getAreaList']]({
        parentId: parentId
      }).then((res) => {
        this.total = parseInt(res.total)
        this.treeList = res.data
      })
    },
    // 获取子节点
    findTreeSonList (parentId) {
      api[urlNames['getAreaList']]({
        parentId: parentId
      }).then((res) => {
        this.treeSonList = res.data
      })
    },
    handleNodeClick (data) {
      console.log(data, 415415)
      this.checkOption = data
    },
    submitArea () {
      this.$emit('get-area', this.checkOption)
      this.$emit('close', false)
    },
    close () {
      this.$emit('close', false)
    },
    /*  getArea (parentId) {
      api[urlNames['getAreaList']]({
        parentId: parentId
      }).then((res) => {
        this.options = res.data
      })
    }, */
    getAreaValue (val) {
      // this.$emit('getAreaId', val[val.length - 2])
      // this.$emit('getAreaId', val)
      console.log(val)
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>
