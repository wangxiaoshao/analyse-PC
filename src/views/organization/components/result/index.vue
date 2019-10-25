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
      <el-col :span="7">
        <el-select v-model="value" placeholder="请选择" @change="getType">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="17">
        <el-input
          placeholder="搜索" suffix-icon="el-icon-search" v-model="keyWord"
          @input="onFocus"
        >
        </el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import debounce from '@src/mixins/debounce'
export default {
  name: 'index',
  mixins: [ debounce ],
  data () {
    return {
      resultFlag: false,
      loadFlag: true,
      keyWord: '',
      options: [{
        value: 'department',
        label: '部门'
      }, {
        value: 'unit',
        label: '单位'
      }, {
        value: 'person',
        label: '人员'
      }],
      value: '部门',
      gridData: [],
      type: 'department'
    }
  },
  props: ['defaultNodeId'],
  methods: {
    getType (el) {
      this.type = el
    },
    onFocus () {
      this.resultFlag = true
      //this.debounce(this.getResult, 600)
      this.getResult()
    },
    // 获取搜索结果
    getResult () {
      let data = {
        name: this.keyWord,
        type: this.type
      }
      this.loadFlag = true
      api[urlNames['searchViewNode']](data).then(res => {
        this.gridData = res.data
        this.loadFlag = false
      })
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
      this.$router.push({
        name: 'OrganizationContent',
        params: {
          nodeId: this.defaultNodeId
        }
      })
    }
  },
  created () {
    // this.debouncedSearch = this.debounce(this.getResult, 5000)
  }
}
</script>

<style lang="less">
  @import "index";
</style>
