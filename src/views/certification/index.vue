<template>
<div class="push-log">
    <!-- 详细信息弹窗 -->
    <div class="dialog-box">
        <el-dialog :visible.sync="detialInfoVisible" width="600px">
            <div slot="title" style="padding:20px">
                新增生物认证方式
                <i class="el-icon-document-copy" style="color:red"></i>
            </div>
            <el-form inline style="width:100%;" label-width="110px">
                <el-form-item label="选择认证方式">
                    <el-select v-model="selectedCertifyType" placeholder="请选择">
                      <el-option
                        v-for="item in certifyTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="detialInfoVisible = false" width="120px">确 定</el-button>
            </div>
        </el-dialog>
    </div>
    <el-form inline>
        <el-form-item>
            <el-button type="primary" @click="detialInfoVisible = true">新增生物认证方式</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="logList" border stripe style="width: 100%">
        <template slot="empty">
            <div class="empty">
                <p><img class="data-pic" src="@src/common/images/no-data1.png" alt="" /></p>
                <p><span style="padding-left: 8px;">暂无数据</span></p>
            </div>
        </template>
        <el-table-column type="index" width="65" label="人员ID" align="center">
        </el-table-column>
        <el-table-column prop="pushTime" label="认证方式" align="center">
        </el-table-column>
        <el-table-column prop="name" label="时间" align="center">
        </el-table-column>
        <el-table-column prop="fieldName" label="状态" align="center">
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current" :page-sizes="[10, 30, 50, 100]" :page-size="page.limit" layout="total, sizes, prev, pager, next, jumper" :total="page.total"></el-pagination>
</div>
</template>

<script>
import handleTable from '@src/mixins/handle-table'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import {
  mapState,
  mapMutations
} from 'vuex'
export default {
  mixins: [handleTable, handleBreadcrumb],
  data () {
    return {
      logList: [],
      detialInfoVisible: false,
      detialInfo: {},
      value: '',
      inputValue: '',
      certifyTypeList: [],
      selectedCertifyType: null
    }
  },
  created () {},
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
    getGrid () {

    }
  },
  computed: {
    ...mapState(['application'])
  }

}
</script>

<style lang="less" scoped>
@import "./index";

.empty {
    p {
        margin: 0;
        font-size: 0px;
        text-align: center;
        line-height: 16px !important;
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
