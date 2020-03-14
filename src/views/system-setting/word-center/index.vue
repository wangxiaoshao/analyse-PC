<template>
  <div class="word-center">
    <el-tabs v-model="activeName">
      <el-tab-pane label="操作文档" name="actionWord">
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
                <el-badge :is-dot='false'>{{scope.row.typeText}}</el-badge>
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
        
      </el-tab-pane>
      <el-tab-pane label="权限说明" name="authorityDescript">
        <p>权限说明</p>
      </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'WordCenter',
    mixins: [handleTable],
  data () {
    return {
      activeName: 'actionWord',
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
  created () {
      this.page.total=1
    // this.app.breadcrumb=this.app.breadcrumb.slice(0,2)
  },
  methods: {},
   computed: {
   ...mapState(['app']),
  },
}
</script>

<style lang="less"  scoped>
@import 'index.less';
  // .word-center {
  //   p {
  //     text-indent: 2rem;
  //     text-align:justify;
  //     letter-spacing:2px;
  //     line-height: 20px;
  //   }
  // }
</style>
