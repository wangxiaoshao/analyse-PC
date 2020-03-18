<template>
  <div class="push-log">
    <!-- 详细信息弹窗 -->
    <div class="dialog-box">
      <el-dialog :visible.sync="detialInfoVisible"  width="450px">
        <div slot="title" style="padding:20px">
          日志详情
          <i class="el-icon-document-copy" style="color:red"></i>
        </div>
           <el-form
              inline
              style="width:100%;"
              label-width="110px"
            >
              <el-form-item label="同步实体ID" >
                <div class="table-td">
                  {{detialInfo.entityId}}
                </div>
              </el-form-item>
              <el-form-item label="异常信息">
                <div class="table-td">
                  {{detialInfo.exceptionMessage}}
                </div>
              </el-form-item>
              <el-form-item label="同步地址">
                <div class="table-td">
                 {{detialInfo.pushUrl}}
                </div>
              </el-form-item>
              <el-form-item label="同步参数">
                <div class="table-td">
                  {{detialInfo.pushBody}}
                </div>
              </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detialInfoVisible = false" width="120px">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
    :data="logList"
    border
    stripe
     highlight-current-row
    style="width: 100%">
    <template slot="empty">
      <div class="empty">
        <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
        <p><span style="padding-left: 8px">暂无数据！</span></p>
      </div>
    </template>
    <el-table-column
      type="index"
      width="65"
      label="序号"
    align="center">
    </el-table-column>
    <el-table-column
      prop="entityId"
      label="同步事件"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="fieldName"
      label="同步类型"
      align="center"
      >
    </el-table-column>
    <el-table-column
    prop="executeMs"
      label="同步耗时"
      align="center"
      >
    </el-table-column>
      <el-table-column
      prop="success"
      label="同步状态"
      align="center"
      >
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      >
      <template slot-scope="scope">
         <a style="color:#FC7049;"  href="javaScript:void(0)" @click="findInfo(scope.row)">详情</a>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="备注">
      <template>
        <span>无</span>
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
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
export default {
   mixins: [handleTable, handleBreadcrumb],
   data(){
     return {
        logList: [{}],
        detialInfoVisible:false,
        detialInfo:{}

     }
   },
   created(){
     this.getLogList()
   },
    mounted () {
    this.pushBreadcrumb({
      name: '应用日志',
      parent: {
        name: 'AppManagement',
        query: {
          type: 'back'
        }
      }
    })
  },
  methods:{
     getLogList () {
       let data={
          page: this.page.current,
          limit: this.page.limit,
          appId: this.$route.query.id
       }
      api[urlNames['findPushLoggers']](data).then(res => {
         this.page.total = res.total
        res.data.forEach(val => {
          if (val.dataType === 1) {
            val.fieldName  ='用户变更数据'
          }
          if (val.dataType === 2) {
             val.fieldName  ='用户身份变更数据'
          }
          if (val.dataType === 3) {
            val.fieldName  ='部门变更数据'
          }
          if (val.dataType === 4) {
            val.fieldName  ='单位变更数据'
          }
          if (val.dataType === 5) {
            val.fieldName  ='视图变更数据'
          }
        })
         this.logList=res.data
        
      })
    },
    findInfo(val){
      this.detialInfo=val
      this.detialInfoVisible=true
    }
  }
  
}
</script>
<style scoped lang="less">
@import "./index";
.empty {
  p {
    margin: 0;
    font-size: 0px;
    text-align: center;
    line-height: 16px!important;
  }

  span {
    font-size: 12px;
  }
}
.data-pic {
  padding-top: 20px;
  width: 60px;
  height: auto;
}
</style>