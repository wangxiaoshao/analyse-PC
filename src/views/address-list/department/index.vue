<template>
  <div class="departmentStyle">
    <div
      class="moreInfo"
      v-if="orgInfo.nodeType==2 && activeColor==2||orgInfo.nodeType==3&&activeColor==2"
    >
      <div v-if="visableData.allOrgInfo==1">
        <div class="header-title">部门信息</div>
        <div class="infoContent">
          <el-form :inline="true" label-width="100px" label-position="right">
            <el-row>
              <el-col>
                <el-form-item label="单位名称">
                  <div class="table-td" :title="orgInfo.name">{{orgInfo.name}}</div>
                </el-form-item>
                <el-form-item label="单位地址">
                  <div class="table-td">{{orgInfo.address||'无'}}</div>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="单位电话">
                  <div class="table-td">
                    <span>{{orgInfo.phone||'无'}}</span>
                    <a
                      href="javaScrpit:void(0)"
                      v-if="orgInfo.phone&&orgInfo.phone!=''&& !orgInfo.isLooked"
                      style="color: #FC7049;font-size:12px;margin-left:5px"
                      @click="findPhone(orgInfo.nodeType,orgInfo.bindId,1)"
                    >查看</a>
                  </div>
                </el-form-item>
                <el-form-item label="邮政编码">
                  <div class="table-td">{{orgInfo.zipCode||'无'}}</div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
    <div class="department-tab-content" v-if="visableData.allOrgInfo==1">
      <div class="header-title">详细数据</div>
      <!-- v-show="departmentList.length!==0" -->
      <el-table :data="departmentList" style="width: 100%;" class="eltab" border stripe>
        <template slot="empty">
          <div class="empty">
            <p>
              <img class="data-pic" src="@src/common/images/no-data.png" alt />
            </p>
            <p>
              <span style="padding-left: 8px">暂无数据</span>
            </p>
          </div>
        </template>
        <!-- <el-table-column prop="name" label width="100" align="left" height="0"></el-table-column>
        <el-table-column label="内设机构电话" width="115">内设机构电话:</el-table-column>
        <el-table-column prop="phone" label></el-table-column>
        <el-table-column label="下级" align="right" width class-name="next-btn">
          <template slot-scope="scope">
            <i class="el-icon-share"></i>
            <span @click="childClick(scope.row)">下级</span>
          </template>
        </el-table-column>-->
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column prop="name" label="所有下级" width="180px">
          <template slot-scope="scope">
            <span class="svg-container" style="color:#FC7049">
              <span class="iconfont iconzuzhijigou" v-if="scope.row.nodeType === 1"></span>
              <span class="iconfont icondanwei" v-if="scope.row.nodeType === 2"></span>
              <span class="iconfont iconbumen" v-if="scope.row.nodeType === 3"></span>
              <span class="el-icon-user" v-if="!scope.row.nodeType"></span>
            </span>
            <span v-if="!scope.row.nodeType">{{visableData.userName==0 ? hideName(scope.row.name):scope.row.name}}</span>
            <span style="margin-left:5px" v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="下级类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.nodeType==1">节点</span>
            <span v-if="scope.row.nodeType==2">单位</span>
            <span v-if="scope.row.nodeType==3">内设机构</span>
            <span v-if="!scope.row.nodeType">个人</span>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系方式" align="center" width="140px">
          <template slot-scope="scope">
            <!-- <span>{{scope.row.phone=='' ||!scope.row.phone ?'无':scope.row.phone}}</span> -->
            <span>{{scope.row.phone || scope.row.mobile ||  '无'}}</span>
            <el-button type="text"
              v-if="scope.row.phone&&scope.row.phone!='' && !scope.row.isLooked"
              class="findMobileBtn"
              :disabled='visableData.userPhone==0&&scope.row.nodeType==3'
              @click="findPhone(scope.row.nodeType,scope.row.bindId,2,scope.$index)"
            >查看
            </el-button>
            <el-button
             type="text"
              v-if="scope.row.mobile&&scope.row.mobile!='' && !scope.row.isLooked"
              class="findMobileBtn"
              :disabled='visableData.userMobile==0'
              @click="findMobileById(scope.row.uid,scope.$index,1)"
            >
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="下级" align="center">
          <template slot-scope="scope">
            <!-- <i class="el-icon-share"></i> -->

            <span v-if="!scope.row.nodeType">无</span>
            <span v-else
              class="findMobileBtn"
              @click="childClick(scope.row)"
            >查看下级</span>

          </template>
        </el-table-column>
        <el-table-column prop label="备注" align="center"></el-table-column>
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
import { mapState, mapMutations } from 'vuex'
import noDataImg from '@src/common/images/no-data.png'
import handPhoneName from '@src/mixins/phone-name.js'
export default {
  props: ['departmentList', 'orgInfo', 'activeColor','msg','visableData'],
  mixins:[handPhoneName],
  data () {
    //  allOrgInfo
    //     userName
    //     userMobile
    //     userPhone
    //     userDetail
    //     depPhone
    return {
      status: 0,
      isShow: true,
      tableData: [],
      personnel: {},
      userId: '',
      infoVisiable: false,
      deptMemberList: [],
      imgSrc: noDataImg

    }
  },
  computed: {
    ...mapState(['app'])
  },
  mounted () {

  },
  methods: {
    childClick (node) {
      this.$emit('handle-child-click', node)
    },
   
    // 查看电话
    findPhone (nodeType, bindId, state, index) {
      api[urlNames['getOrgMobile']]({
        nodeType,
        bindId
      }).then(res => {
        if (res && state == 1) {
          this.orgInfo.phone = res.data.phone
          this.orgInfo.isLooked = true
        }
        if (res && state == 2) {
          this.departmentList[index].phone = res.data.phone
          this.departmentList[index].isLooked = true
        }
      })
    },
    findMobileById (uid, index, state) {
      api[urlNames['findMobileById']]({ uid }).then(res => {
        if (res && state == 1) {
          this.departmentList[index].mobile = res.data.mobile
          this.departmentList[index].isLooked = true
        }
        if (res && state == 2) {
          this.departmentList[index].officePhone = res.data.officePhone
          this.departmentList[index].isOfficePhone = true
        }
      })
    }
  }
}
</script>
<style lang="less"  scoped>
@import 'index';
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
