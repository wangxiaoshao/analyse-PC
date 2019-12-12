<template>
  <div class="search-content">
    <el-popover
      ref="popover"
      placement="bottom-start"
      v-if="resultFlag"
      width="300"
    >
      <div class="back-btn-address">
        <el-button size="mini" @click="goBackTree">返回</el-button>
      </div>
      <div class="result-list" style="overflow-y: auto;height: 300px;">
        <el-table v-loading="loadFlag" :data="gridData" :show-header="false">
          <el-table-column property="name">
            <template slot-scope="scope">
              <span v-if="selectType!=='0'" :title="scope.row.name" class="table-span" @click="getDetail(scope.row)">{{scope.row.name}}</span>
              <span v-if="selectType==='0'" :title="scope.row.orgName+'-'+scope.row.name" class="table-span">{{scope.row.name}}-{{scope.row.mobile}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-popover>
    <el-row>
      <el-input v-if="myOrgFlag===1" @change="getResult" placeholder="请输入内容" v-model="keyWord" class="input-with-select">
        <el-select v-model="selectType"  style="width: 80px"  slot="prepend" placeholder="请选择">
          <el-option label="内设机构" value="3"></el-option>
          <el-option label="人员" value="0"></el-option>
        </el-select>
        <el-button slot="append" @click="getResult" icon="el-icon-search"></el-button>
      </el-input>
      <el-input v-if="myOrgFlag!==1" @change="getOtherResult" placeholder="请输入内容" v-model="keyWord" class="input-with-select">
        <el-select v-model="selectType"  style="width: 80px"    slot="prepend" placeholder="请选择">
          <el-option label="单位" value="2"></el-option>
          <el-option label="部门" value="3"></el-option>
          <el-option label="人员" value="0"></el-option>
        </el-select>
        <el-button slot="append" @click="getOtherResult" icon="el-icon-search"></el-button>
      </el-input>
<!--      <el-input-->
<!--        placeholder="请输入人员姓名"-->
<!--        v-model="keyWord"-->
<!--        onFocus-->
<!--        @change="getResult"-->
<!--        class="input-with-select"-->
<!--      >-->
<!--        <el-button slot="append"  icon="el-icon-search"></el-button>-->
<!--      </el-input>-->
    </el-row>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import debounce from '@src/mixins/debounce'
import { mapState, mapMutations } from 'vuex'
export default {
  props: ['defaultNodeId', 'myOrgFlag'],
  data () {
    return {
      selectType: '3',
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
  computed: {
    ...mapState(['app'])
  },
  methods: {
    ...mapMutations(['GET_OPTION']),
    onFocus () {
      this.getResult()
    },
    // 获取搜索结果
    getResult () {
      if (this.selectType === '0') {
        api[urlNames['getAddressListUserByName']]({
          name: this.keyWord,
          orgId: this.app.option.user.orgId
        }).then(res => {
          this.gridData = res.data
          this.resultFlag = true
        })
      } else if (this.selectType === '3') {
        console.log(this.app.option.user.deptId)
        api[urlNames['searchMyDep']]({
          deptName: this.keyWord,
          orgId: this.app.option.user.orgId
        }).then(res => {
          this.gridData = res.data
          this.resultFlag = true
        })
      }
    },
    getOtherResult () {
      if (this.selectType === '0') {
        api[urlNames['getAddressListUserByName']]({
          name: this.keyWord
        }).then(res => {
          this.gridData = res.data
          this.resultFlag = true
        })
      } else if (this.selectType === '2' || this.selectType === '3') {
        api[urlNames['searchOtherDep']]({
          name: this.keyWord,
          nodeType: this.selectType
        }).then(res => {
          this.gridData = res.data
          this.resultFlag = true
        })
      }
    },
    goBackTree () {
      this.keyWord = ''
      this.resultFlag = false
      if (this.myOrgFlag === 1) {
        this.$emit('searchMyBack')
      } else {
        this.$emit('searchOtherBack')
      }
    },
    getDetail (val) {
      this.$emit('searchListResult', val)
    }
  },
  watch: {
    myOrgFlag (val) {
      this.selectType = '3'
      this.keyWord = ''
      this.resultFlag = false
    }
  }
}
</script>

<style lang="less">
@import 'index';
</style>
