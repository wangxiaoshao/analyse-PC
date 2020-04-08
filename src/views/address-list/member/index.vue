<template>
  <div  class="memberInfo">
    <div class="moreInfo" v-if="orgInfo.nodeType==2 && activeColor==2||orgInfo.nodeType==3&&activeColor==2">
       <div v-if="visableData.allOrgInfo==1">
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
                  <el-button type="text" v-if="orgInfo.phone&&orgInfo.phone!=''&&!orgInfo.isLooked"
                   :disabled='visableData.depPhone==0'
                class="findMobileBtn" @click="findPhone(orgInfo.nodeType,orgInfo.bindId,1)">查看</el-button>
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
    </div>
    <div class="member-tab" v-if="visableData.allOrgInfo==1">
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
          <p><span style="padding-left: 8px">{{msg}}</span></p>
        </div>
      </template>
      <el-table-column  type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column   label="姓名" align="center">
        <template slot-scope="scope">
          <span >{{ visableData.userName==0 ? hideName(scope.row.name):scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="duty" label="职务" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.duty||'暂无'}}</span>
          </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机号" align="center">
         <template slot-scope="scope">
            <span>{{scope.row.mobile||'无'}}</span>
            <el-button type="text" v-if="scope.row.mobile&&scope.row.mobile!=''&&!scope.row.isLooked"
             class="findMobileBtn"
              :disabled='visableData.userMobile==0'
             @click="findMobileById(scope.row.uid,scope.$index,1)">查看</el-button>
           </template>
      </el-table-column>
      <el-table-column  prop="officePhone" label="座机号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.officePhone||'无'}}</span>
          <el-button type="text" v-if="scope.row.officePhone&&scope.row.officePhone!=''&&scope.row.officePhone!='无'&&!scope.row.isOfficePhone"
          class="findMobileBtn"
            @click="findMobileById(scope.row.uid,scope.$index,2)">查看</el-button>
          </template>
      </el-table-column>

    </el-table>
  </div>
   <div class="no-right" v-if="visableData.allOrgInfo==0" style="text-align:center;">
      <img class="no-content-img" :src="imgSrc" alt="" width="250px">
      <div style="font-size:20px;color:#999"> 该单位信息对外不可见！</div>
  </div>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
import noDataImg from '@src/common/images/no-data.png'
import handPhoneName from '@src/mixins/phone-name.js'

export default {
  props: ['tableData', 'memberProps', 'activeColor', 'orgInfo','msg','visableData'],
    mixins:[handPhoneName],
  data () {
    return {
        imgSrc: noDataImg
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
