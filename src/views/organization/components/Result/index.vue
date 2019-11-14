<template>
  <div class="search-content">
    <el-popover
      v-if="resultFlag"
      placement="top-start"
      width="100%"
    >
      <div class="result-list">
        <div class="back-btn">
          <el-button size="mini" @click="goBackTree">返回</el-button>
        </div>
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
        placeholder="请输入内容"
        v-model="keyWord"
        @input="getResult"
        class="input-with-select">
        <el-select v-model="value" style="width: 80px" @change="getType" slot="prepend" placeholder="请选择">
          <el-option label="节点" value="1"></el-option>
          <el-option label="部门" value="2"></el-option>
          <el-option label="单位" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import debounce from '@src/mixins/debounce'
export default {
  mixins: [ debounce ],
  data () {
    return {
      debouncedSearch: null,
      resultFlag: false,
      loadFlag: true,
      keyWord: '',
      value: '部门',
      gridData: [],
      type: '1',
      restaurants: []
    }
  },
  props: ['defaultNodeId'],
  methods: {
    getType (el) {
      this.type = el
    },
    onFocus () {
      this.resultFlag = true
    },
    onBlur () {
      this.resultFlag = false
    },
    onChange () {
      this.debouncedSearch()
    },
    // 获取搜索结果
    getResult () {
      this.resultFlag = true
      let data = {
        name: this.keyWord,
        nodeType: this.type
      }
      this.loadFlag = true
      if (this.keyWord !== '') {
        setTimeout(() => {
          api[urlNames['searchViewNode']](data).then(res => {
            this.gridData = res.data
            this.loadFlag = false
          })
        }, 500)
      }
    },
    setNodeId (row) {
      this.$router.push({
        name: 'OrganizationContent',
        params: {
          nodeId: row.id
        }
      })
    },
    goBackTree () {
      this.resultFlag = false
      /*this.$router.push({
        name: 'OrganizationContent',
        params: {
          nodeId: this.defaultNodeId
        }
      })*/
    }
  },
  created () {
    this.debouncedSearch = this.debounce(this.getResult, 600)
    // this.getResult()
    // this.debouncedSearch = this.debounce(this.getResult, 5000)
  },
  watch: {
    keyWord: {
      handler (val) {
        if (val !== '') {
          // this.debouncedSearch = this.debounce(this.getResult, 500)
          // this.getResult
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
