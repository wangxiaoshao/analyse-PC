<template>
  <div class="search-content">
    <!-- <el-popover v-if="resultFlag" placement="top-start" width="100%">
      <div class="result-list">
        <div class="back-btn">
          <el-button size="mini" @click="goBackTree">返回</el-button>
        </div>
        <el-table v-loading="loadFlag" :data="gridData" :show-header="false">
          <el-table-column property="name">
            <template slot-scope="scope">
              <span
                :title="scope.row.name"
                class="table-span"
                @click="setNodeId(scope.row)"
              >{{scope.row.name}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-popover>-->
    <el-row>
      <el-input placeholder="请输入内容" v-model="keyWord" @change="getResult" class="input-with-select">
        <el-select
          v-model="value"
          style="width: 80px"
          @change="getType"
          slot="prepend"
          placeholder="请选择"
        >
          <el-option
            v-for="item in departmentunit"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
/* import debounce from '@src/mixins/debounce' */
export default {
  /*  mixins: [ debounce ], */
  data () {
    return {
      resultFlag: false,
      loadFlag: true,


      keyWord: '',
      departmentunit: [{
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
    getType (e) {
      this.type = e
    },
    onFocus () {
      this.resultFlag = true
      this.getResult()
    },
    // 获取搜索结果
    getResult () {
      let data = {
        name: this.keyWord
      }
      this.loadFlag = true
      api[urlNames['searchViewNode']](data).then(res => {
        console.log(res, '===')
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
@import 'index';
</style>
