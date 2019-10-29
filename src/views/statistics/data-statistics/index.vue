<template>
  <div>
    <!--顶部时间筛选row-->
    <div class="">
      <el-row class="operator-row">
        <el-col :span="18">
          <el-row :gutter="10" type="flex">
            <el-col :span="6">
              <el-select v-model="searchQuery.areaId" filterable clearable @change="search" placeholder="单位">
                <el-option
                  v-for="item in areaList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-input placeholder="请输入关键字搜索" v-model="searchQuery.keyword" clearable @change="getGrid">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!--四张人数统计背景图片row-->
    <div class="statistic-bgc-row">
      <el-row>
        <el-col :span="8"><div  style="background-color: #999999; margin-right: 24px; height: 60px"></div></el-col>
        <el-col :span="16" style=" height: 60px">
          <el-col :span="8"><div  style="background-color: red; height: 60px; margin-right: 24px"></div></el-col>
          <el-col :span="8"><div  style="background-color: rebeccapurple; height: 60px;"></div></el-col>
          <el-col :span="8"><div  style="background-color: royalblue; height: 60px;"></div></el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { },
  mixins: [handleTable],
  data () {
    return {
      areaList: [
        {id: 1, name: 999, code: 1910291113}
      ],
      searchQuery: {
        areaId: '',
        keyword: '',
      }
    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {

  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    search () {},
    getGrid () {},
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


