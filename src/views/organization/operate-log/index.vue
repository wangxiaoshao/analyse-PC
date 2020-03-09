<template>
<div class="operate-log">
  
  <el-table
    :data="logList"
    border
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
<!--    <el-table-column-->
<!--      type="selection"-->
<!--      width="55">-->
<!--    </el-table-column>-->
    <el-table-column
      prop="actionTime"
      label="时间"
      align="center"
      >
    </el-table-column>
    <el-table-column
      prop="actionUserName"
      label="操作人"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="描述"
      align="center"
      >
      <template slot-scope="scope">
        <span v-if="scope.row.actionType === 1">信息新增</span>
        <span v-if="scope.row.actionType === 2">信息修改</span>
        <span v-if="scope.row.actionType === 3">信息删除</span>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      >
      <template slot-scope="scope">
         <a style="color:red;"  href="jacascript:void(0)" @click="findInfo(scope.row)">详情</a>
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
   <!-- 详细信息弹窗 -->
    <div class="dialog-box">
      <el-dialog :visible.sync="DetialInfoVisible"  width="450px">
        <div slot="title" style="padding:20px">
          日志详情
          <i class="el-icon-document-copy" style="color:red"></i>
        </div>
           <el-form
              inline
              style="width:100%;"
              label-width="110px"
            >
              <el-form-item label="操作日期" >
                <div class="table-td">
                  {{DetialInfo.actionTime}}
                </div>
              </el-form-item>
              <el-form-item label="操作人">
                <div class="table-td">
                 {{DetialInfo.actionUserName}}
                </div>
              </el-form-item>
              <el-form-item label="操作类型" >
                <div class="table-td">
                  <span v-if="DetialInfo.actionType === 1">信息新增</span>
                  <span v-if="DetialInfo.actionType === 2">信息修改</span>
                  <span v-if="DetialInfo.actionType === 3">信息删除</span>
                </div>
              </el-form-item>
              <el-form-item label="操作标识">
                <div class="table-td">
                  {{DetialInfo.entityId }}
                </div>
              </el-form-item>
              <el-form-item label="实体类型">
                <div class="table-td">
                  {{DetialInfo.entityType }}
                </div>
              </el-form-item>
              <el-form-item label="类型描述">
                <div class="table-td">
                 {{DetialInfo.entityTypeText}}
                </div>
              </el-form-item>
              
              <el-form-item label="操作详情">
                <div class="table-td">
                 <p> {{DetialInfo.changeContent }}</p>
                </div>
              </el-form-item>
            </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="DetialInfoVisible = false" width="120px">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable, handleBreadcrumb],
  name: 'OperateLog',
  data () {
    return {
      logList: [],
      DetialInfoVisible:false,
      DetialInfo:{
        id:'',
        actionUserName:'',
        actionType :'',
        actionTime :'',
        changeContent :'',
        entityId :'',
        entityType :'',
        entityTypeText :''
      }
    }
  },
  created () {
    this.findEntityChangeLoggerList(this.$route.params.id, this.$route.query.type, 1, 10)
  },
  mounted () {
    this.pushBreadcrumb({
      name: `${this.$route.query.title}日志`,
      parent: {
        name: 'OrganizationContent',
        params: {
          nodeId: this.$route.params.id
        },
        query: {
          type: 'back'
        }
      }
    })
  },
  methods: {
    findEntityChangeLoggerList (id, type, page, limit) {
      if (type === 2) {
        type = 3
      } else if (type === 3) {
        type = 2
      }
      api[urlNames['findEntityChangeLoggerList']]({
        entityType: type,
        entityId: id,
        page: page,
        limit: limit
      }).then((res) => {
        if (res.status === 0) {
          this.logList = res.data
        }
      }, (error) => {
      })
    },

    // 查看详情
    findInfo(data){
      api[urlNames['getEntityChangeLoggerDetail']]({
        id:data.id,
        entityType: data.entityType,
        entityId: data.entityId
      }).then((res) => {
        if (res) {
          this.DetialInfo = res.data
        }
      }, (error) => {
      })
      this.DetialInfoVisible=true
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
