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
          <el-table-column>
            <template slot-scope="scope">
              <div class="notice-info">
                <el-badge :is-dot='scope.row.hasRead===0'>{{scope.row.typeText}}</el-badge>
                <div class="notice-msg">
                  <span>你有一条待审核的事件待处理，请尽快前往审核。</span>
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
export default {
  name: 'notification',
  mixins: [handleTable],
  data () {
    return {
      tableData:[
        {
          id:2,
          content:'22',
          typeText:"消息确认通知",
          creareTime:'2020-2-24 14:19:20',
          hasRead:0
        },
        {
          id:1,
          content:'11',
          typeText:"审核通知",
          creareTime:'2020-2-24 14:19:20',
          hasRead:1
        },
        {
          id:1,
          content:'11',
          typeText:"审核通知",
          creareTime:'2020-2-24 14:19:20',
          hasRead:0
        }
      ]
    }
  },
  methods: {
    getGrid () {
      let data = {
        page: this.page.current,
        limit: this.page.limit
      }
      this.loading = true
    //   api[urlNames['findViewNodeList']](data).then((res) => {
    //     this.loading = false
    //     this.list = res.data
    //     this.contentPage.total = res.total
    //   }, () => {
    //     this.loading = false
    //     this.list = []
    //     this.contentPage.total = 0
    //   })
    // },
    },
    doFindNotice(val){
      if(val.typeText==='消息确认通知'){
          this.$router.push('/confirm-info')
      }else{
         this.$router.push('/wait-approval')
      }
    },

  }
}

</script>
<style lang="less">
  @import "./index";
</style>

