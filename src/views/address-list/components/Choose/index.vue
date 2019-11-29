<template>
  <div class="search-content">
    <el-popover
      ref="popover"
      placement="bottom-start"
      v-if="resultFlag"
      width="300"
    >
      <div class="back-btn">
        <el-button size="mini" @click="goBackTree">返回</el-button>
      </div>
      <div class="result-list">
        <el-table v-loading="loadFlag" :data="gridData" :show-header="false">
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
        placeholder="请输入人员姓名"
        v-model="keyWord"
        onFocus
        @change="getResult"
        class="input-with-select"
      >
        <el-button slot="append" @click="getResult" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import debounce from '@src/mixins/debounce'
export default {
  props: ['defaultNodeId'],
  data () {
    return {
      keyWord: '',
      value: '选择',
      gridData: [],
      nodeType: '',
      nodeTree: [],
       debouncedSearch: null,
      resultFlag: false,
      loadFlag: false,
      type: 2,
      restaurants: [],
      timer: null
    }
  },

  created () {
  
  },
  methods: {

    onFocus () {
      this.getResult()
    },
    // 获取搜索结果
    getResult () {
        api[urlNames['getAddressListUserByName']]({
          name:this.keyWord
      }).then(res => {
        this.getUserDetail=res.data
          console.log(this.getUserDetail, '===人员姓名')
      })
    },

    goBackTree () {
      this.keyWord = ''
      this.resultFlag = false
      this.$router.push({
        name: 'Department',
        params: {
          nodeId: this.defaultNodeId
        }
      })
    }

  }
}
</script>

<style lang="less">
@import 'index';
</style>
