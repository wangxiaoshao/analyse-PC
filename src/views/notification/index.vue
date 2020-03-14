<template>
  <div class="notification">
    <!-- <div class="notice-info">
      <el-badge is-dot>修改单位名称的审核结果</el-badge>
      <div class="notice-msg">
        <span>你申请原单位“贵州省信息中心”修改为“贵州省新信息中心已审核通过”。</span>
          <span><el-button type='primary' size="mini">去处理</el-button></span>
      </div>
    </div>
    <div class="notice-info">
      <el-badge is-dot>修改单位名称的审核结果</el-badge>
      <div class="notice-msg">
        <span>你申请原单位“贵州省信息中心”修改为“贵州省新信息中心已审核通过”。</span>
          <span><el-button type='primary' size="mini">去处理</el-button></span>
      </div>
    </div> -->
          <el-table :show-header="false"  :data='tableData' 	>
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
                <p>{{scope.row.creareTime}}</p>
                <span class="btn"><el-button type='primary' size="mini" 
                :style="scope.row.hasRead===1?'background-color:#d8d7d7;border-color:#d8d7d7':''" 
                 @click="doFindNotice(scope.row)">{{scope.row.hasRead===1?'已查看':'去查看'}}</el-button></span>
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
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'notification',
  mixins: [handleTable],
  data () {
    return {
      tableData:[]
    }
  },
  created(){
    this.getGrid()
    this.app.breadcrumb=[{name: '通知中心'}]
  },

  methods: {
    getGrid () {
      let data = {
        page: this.page.current,
        limit: this.page.limit
      }
      this.loading = true
      api[urlNames['notificationList']](data).then((res) => {
        this.loading = false
        this.tableData = res.data
        this.page.total = res.total
      }, () => {
        this.loading = false
        this.tableData = []
        this.page.total = 0
      })
    },
    doFindNotice(val){
      if(val.typeText==='消息确认通知'){
          this.$router.push('/confirm-info')
      }else{
         this.$router.push('/wait-approval')
      }
    },

  },
  computed: {
   ...mapState(['app']),
  },
}

</script>
<style lang="less"  scoped>
  @import "./index";
</style>

