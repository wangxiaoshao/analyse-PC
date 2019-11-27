<template>
  <div class="search-content">
    <el-row>
      <el-input
        placeholder="请输入内容"
        v-model="keyWord"
        onFocus
        @change="getResult"
        class="input-with-select"
      >
        <el-select
          v-model="value"
          style="width: 80px"
          @change="getType"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option
            v-for="item in nodeTree"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append" @click="getResult" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['defaultNodeId'],
  data () {
    return {
      keyWord: '',

      value: '选择',
      gridData: [],
      nodeType: '',

      nodeTree: []
    }
  },

  created () {
    // this.findNodeTree(-1)
  },
  methods: {
    // 获取机构树--初始化
    // findNodeTree (parentId) {
    //   api[urlNames['getTree']]({
    //     parentId: parentId,
    //     viewId: -1
    //   }).then((res) => {
    //     res.data.forEach(element => {
    //       this.nodeTree.push({
    //         value: element.nodeType,
    //         label: element.name
    //       })
    //     })
    //   })
    // },

    getType (e) {
      this.nodeType = e
    },
    onFocus () {
      this.getResult()
    },
    // 获取搜索结果
    getResult () {
      let data = {
        name: this.keyWord,
        nodeType: this.nodeType
      }
      this.loadFlag = true
      // api[urlNames['searchViewNode']](data).then(res => {
      //   console.log(res, '===')
      //   this.gridData = res.data
      // })
    }
  }

}
</script>

<style lang="less">
@import 'index';
</style>
