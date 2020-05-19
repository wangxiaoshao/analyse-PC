<template>
  <div class="appLogs">
    <!-- 输入应用账号弹框 -->
      <el-dialog :visible.sync="appApplictaionVisible" width="440px" :show-close='false' :close-on-click-modal='false'>
        <div slot="title" style="padding:20px">
          接入应用账号、密码
          <i class="el-icon-edit" style="color:red"></i>
        </div>
        <el-form inline label-width="130px">
          <el-form-item label="接入应用账号">
            <el-input placeholder="请输入接入应用账号"></el-input>
          </el-form-item>
          <el-form-item label="接入应用账号密码">
              <el-input placeholder="请输入接入应用密码"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button type="primary" @click="appApplictaionVisible = false" style="padding:8px 35px">确 定</el-button>
        </div>
      </el-dialog>
      <div v-if="!appApplictaionVisible">
        <div class="table-box">
          <div class="table-title">应用信息</div>
          <el-table :data="applactionList" border  style="width: 100%">
            <template slot="empty">
              <div class="empty">
                <p>
                  <img class="data-pic" src="@src/common/images/no-data1.png" alt />
                </p>
                <p>
                  <span style="padding-left: 8px;">暂无数据</span>
                </p>
              </div>
            </template>
            <el-table-column prop="name"
              label="应用名称"
              width="180"
              align="center"
            ></el-table-column>
            <el-table-column prop="fieldName" label="应用编号" align="center"></el-table-column>
            <el-table-column  align="center" label="应用接口账号">
            </el-table-column>
            <el-table-column prop="executeMs" label="接入时间" align="center"></el-table-column>
            <el-table-column prop="success" label="联系人员" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.success==0 ?'失败':'成功'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="应用状态">
              <template>
                <span>无</span>
              </template>
            </el-table-column>
        </el-table>
        </div>
        <div class="table-box">
          <div class="table-title" style="margin:20px 0">同步日志</div>
          <push-log></push-log>
        </div>
      </div>
  </div>
</template>
<script>
import PushLog from '@src/views/shared/push-log'
export default {
  name: 'AppLogs',
  components: { PushLog },
  data () {
    return {
      appApplictaionVisible: true,
      applactionList: [],
      appLogsList: []
    }
  }
}
</script>
