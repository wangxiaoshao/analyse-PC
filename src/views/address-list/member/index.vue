<template>
  <div  class="memberInfo">
    <div class="moreInfo" v-if="orgInfo.nodeType==2 && activeColor==2||orgInfo.nodeType==3&&activeColor==2">
      <div class="header-title">部门信息</div>
      <div class="infoContent">
        <el-form :inline="true" label-width="100px" label-position='right'>
          <el-row>
            <el-col>
              <el-form-item label="单位名称">
                <div  class="table-td"  :title="orgInfo.name">{{orgInfo.name}}</div>
              </el-form-item>
              <el-form-item label="单位地址">
                <div  class="table-td">{{orgInfo.address||'无'}}</div>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="单位电话">
                <div  class="table-td">
                  <span >{{orgInfo.phone||'无'}} </span>
                <span v-if="orgInfo.phone&&orgInfo.phone!=''&&!orgInfo.isLooked"
               class="findMobileBtn" @click="findPhone(orgInfo.nodeType,orgInfo.bindId,1)">查看</span>
                </div>
              </el-form-item>
              <el-form-item label="邮   编">
                <div  class="table-td">{{orgInfo.zipCode||'无'}}</div>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </div>
    </div>
    <div class="member-tab">
      <div class="header-title">人员信息</div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
    >
      <template slot="empty">
        <div class="empty">
          <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
          <p><span style="padding-left: 8px">暂无数据！</span></p>
        </div>
      </template>
      <el-table-column  type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column  prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="duty" label="职务" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.duty||'暂无'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center">
         <template slot-scope="scope">
            <span>{{scope.row.mobile||'无'}}</span>
            <span v-if="scope.row.mobile&&scope.row.mobile!=''&&!scope.row.isLooked"
             class="findMobileBtn"
             @click="findMobileById(scope.row.uid,scope.$index,1)">查看</span>
           </template>
      </el-table-column>
      <el-table-column  prop="officePhone" label="座机号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.officePhone||'无'}}</span>
          <span v-if="scope.row.officePhone&&scope.row.officePhone!=''&&scope.row.officePhone!='无'&&!scope.row.isOfficePhone"
          class="findMobileBtn"
            @click="findMobileById(scope.row.uid,scope.$index,2)">查看</span>
          </template>
      </el-table-column>


<!--            <span v-if="scope.row.portraitUrl !== '0'&&scope.row.portraitUrl!==undefined"><img  :src="scope.row.portraitUrl"></span>-->
      <!-- <el-table-column
        align="center"
        width="120"
      height="40">
        <template slot-scope="scope">
            <span>
              <span class="header-img">{{scope.row.name.slice(-2,scope.row.name.length)}}</span>
            </span>
        </template>
      </el-table-column> -->

    </el-table>
  </div>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'

export default {
  props: ['tableData', 'memberProps', 'activeColor', 'orgInfo'],
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    // 查看电话
    findPhone (nodeType, bindId, state) {
      api[urlNames['getOrgMobile']]({
        nodeType,
        bindId
      }).then(res => {
        if (res && state == 1) {
          this.orgInfo.phone = res.data.phone
          this.orgInfo.isLooked = true
        }
      })
    },
    findMobileById (uid, index, state) {
      api[urlNames['findMobileById']]({ uid }).then(res => {
        if (res && state == 1) {
          this.tableData[index].mobile = res.data.mobile
          this.tableData[index].isLooked = true
        }
        if (res && state == 2) {
          this.tableData[index].officePhone = res.data.officePhone
          this.tableData[index].isOfficePhone = true
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  @import './index';
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
