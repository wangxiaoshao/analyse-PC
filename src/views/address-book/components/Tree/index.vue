<template>
  <div>
    <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input> -->

    <el-tree
      :props="props"
      :load="loadNode"
      node-key="id"
      lazy
      @node-click="handleNodeClick"
      @node-expand="handleCheckChange"
    ></el-tree>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['thisUnit'],
  data () {
    return {
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      this_unit: {},
      childrenTree: [],
      subsetId: null,
    };
  },
  created () {

  },
  methods: {
    handleCheckChange (data) {
      this.getTmentChild(data.id)
    },
    handleNodeClick (data) {
      console.log(data, "111111111111111")
    },
    loadNode (node, resolve) {
      console.log(node.level, "=======node")
      setTimeout(() => {
        if (node.level === 0) {
          let treeParent = [{ name: this.thisUnit.name, id: this.thisUnit.id }]
          return resolve(treeParent);
        }
        if (node.level > 1) {

        }
        // if (node.level > 3) return resolve([]);
        var hasChild;
        if (this.childrenTree.length > 0) {
          hasChild = true;
        } else {
          hasChild = false;
        }

        setTimeout(() => {
          var data;
          if (hasChild) {
            data = this.childrenTree
          } else {
            data = [];
          }
          resolve(data);
        }, 500);
      }, 500)
    },
    /**
     * 查询部门下的下级部门
     */
    getTmentChild (subsetId) {
      this.childrenTree = [];
      api[urlNames['getDepartmentChildtree']]({
        departmentId: subsetId,
      }).then(res => {
        if (res.data.length > 0) {
          res.data.forEach(element => {
            this.childrenTree.push(element)
          });
        }
      }).catch(err => {
        console.log(err)
      })
    },


    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  watch: {
    thisUnit (newvalue, oldvalue) {
      this.this_unit = newvalue;
    }
  },
};
</script>
<style lang="less">
@import 'index';
</style>
