<template>
  <div>
    <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input> -->

    <el-tree
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree"
    ></el-tree>
  </div>
</template>
<script>
export default {
  props: ['ThisUnit'],
  data () {
    return {
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1
    }
  },
  created () {
    console.log(this.ThisUnit, '=====')
    this.IntoList()
  },
  methods: {
    handleCheckChange (data, checked, indeterminate) {
      // console.log(data, checked, indeterminate);
    },
    handleNodeClick (data) {
      // console.log(data, "111111111111111");
    },
    loadNode (node, resolve) {
      // console.log(node.level, "=======");
      if (node.level === 0) {
        return resolve([{ name: 'region1', id: 1 }, { name: 'region2', id: 2 }])
      }
      if (node.level > 1) {
        // console.log("大于1")
      }
      // if (node.level > 3) return resolve([]);

      var hasChild
      if (node.data.name === 'region1') {
        hasChild = true
      } else if (node.data.name === 'region2') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0
      }

      setTimeout(() => {
        var data
        if (hasChild) {
          data = [{
            name: 'zone' + this.count++
          }, {
            name: 'zone' + this.count++
          }]
        } else {
          data = []
        }

        resolve(data)
      }, 500)
    },


    IntoList () {
      let treeList = [{ id: this.ThisUnit.id, name: this.ThisUnit.name }]
      for (const key in treeList) {
        if (treeList.hasOwnProperty(key)) {
          const element = treeList[key]
          // this.listData.push(element)
        }
      }
    },


    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>
