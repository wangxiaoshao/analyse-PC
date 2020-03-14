<template>
  <div class="moreAnnoument">
    <el-table :show-header="false"  :data='tableData'>
             <template slot="empty">
                <div class="empty">
                  <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
                  <p><span style="padding-left: 8px">暂无数据！</span></p>
                </div>
              </template>
          <el-table-column>
            <template slot-scope="scope">
              <div class="notice-info">
                <el-badge :is-dot='scope.row.hasRead===0'>{{scope.row.typeText}}</el-badge>
                <div class="notice-msg">
                  <span>{{scope.row.content}}</span>
                </div>
                <!-- <p>{{scope.row.creareTime}}</p>
                <span class="btn"><el-button type='primary' size="mini" 
                :style="scope.row.hasRead===1?'background-color:#d8d7d7;border-color:#d8d7d7':''" 
                 @click="doFindNotice(scope.row)">{{scope.row.hasRead===1?'已查看':'去查看'}}</el-button></span> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          ></el-pagination>
  </div>
</template>
<script>
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { mapState, mapMutations } from 'vuex'
export default {
    mixins: [handleTable],
    data () {
    return {
      tableData:[
        {
          typeText:'为推进国密改造，系统登录密码深度优化通知。',
          content:'为推进国密改造，系统登录密码深度优化通知,为推进国密改造，系统登录密码深度优化通知。',
          hasRead:0,
          creareTime:'2020-03-12'
        }
      ]
    }
  },
   mounted () {
  // this.app.breadcrumb=[{name: '平台公告'}]
  this.page.total=1
   
  },
   computed: {
   ...mapState(['app']),
  },
  methods:{
  }
  
}
</script>
<style lang="less"  scoped>
  @import "./index";
</style>