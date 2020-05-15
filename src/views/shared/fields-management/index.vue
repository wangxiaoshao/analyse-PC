<template>
<div class="fields-management">
   <div class="parameter-item">
      <div class="header">共享字段设置
         <span class="info-msg">（如下字段被选中以后再被修改，则需要审核后方可生效；不选中的字段被修改，不需要审核）</span>
      </div>
      <el-form ref="systemAuditField" :model="systemAuditField" label-width="160px">
        <div class="table">
          <div class="table-row">
            <div class="table-td" style="text-align: center">模块</div>
            <div class="table-td" style="text-align: center">功能</div>
          </div>
          <div class="table-row">
            <div class="table-td" style="text-align: center">
              节点
            </div>
            <div class="table-td">
              <el-checkbox-group v-model="systemAuditField.checkedNodeAuditList" @change="handleCheckAllChange">
                <el-checkbox v-for="item in nodeAuditList" :label="item.name" :key="item.name">{{item.checkname}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="table-row">
            <div class="table-td" style="text-align: center">
              单位
            </div>
            <div class="table-td">
              <p>
                <el-checkbox-group v-model="systemAuditField.checkedOrgAuditList" @change="handleCheckAllChange">
                  <el-checkbox v-for="item in orgAuditList" :label="item.name" :key="item.name">{{item.checkname}}
                  </el-checkbox>
                </el-checkbox-group>
              </p>
            </div>
          </div>
          <div class="table-row">
            <div class="table-td" style="text-align: center">
              内设机构
            </div>
            <div class="table-td">
              <el-checkbox-group v-model="systemAuditField.checkedDepAuditList" @change="handleCheckAllChange">
                <el-checkbox v-for="item in depAuditList" :label="item.name" :key="item.name">{{item.checkname}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="table-row">
            <div class="table-td" style="text-align: center">
              人员
            </div>
            <div class="table-td">
              <el-checkbox-group v-model="systemAuditField.checkedUserAuditList" @change="handleCheckAllChange">
                <el-checkbox v-for="item in userAuditList" :label="item.name" :key="item.name">{{item.checkname}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="getShareFields">保存</el-button>
          <el-button @click="cancel">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
</div>
</template>
<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
const nodeAuditList = [/* {
    name: 'id',
    checkname: '结点ID'
  },
  {
    name: 'parentId',
    checkname: '父结点ID'
  },
  {
    name: 'viewId',
    checkname: '视图ID'
  }, */
  {
    name: 'name',
    checkname: '节点名称'
  },
  {
    name: 'systemType',
    checkname: '所属系统'
  },
  {
    name: 'areaId',
    checkname: '所属区域'
  }
  /* {
    name: 'syncChildren',
    checkname: '是否同步子级'
  },
  {
    name: 'nodeType',
    checkname: '结点类型'
  },
  {
    name: 'bindId',
    checkname: '绑定成员ID'
  },
  {
    name: 'sort',
    checkname: '排序值，小的在前面'
  },
  {
    name: 'removed',
    checkname: '是否已经删除'
  },
  {
    name: 'createTime',
    checkname: '创建时间'
  },
  {
    name: 'updateTime',
    checkname: '修改时间'
  } */
]
const orgAuditList = [
  {
    name: 'name',
    checkname: '单位名称'
  },
  {
    name: 'shortName',
    checkname: '单位简称'
  },
  {
    name: 'level',
    checkname: '单位级别'
  },
  {
    name: 'type',
    checkname: '所属体系'
  },
  {
    name: 'systemType',
    checkname: '所属系统'
  },
  {
    name: 'phone',
    checkname: '单位电话'
  },
  {
    name: 'creditId',
    checkname: '统一社会信用代码'
  },
  {
    name: 'otherName',
    checkname: '其他名称'
  },
  {
    name: 'address',
    checkname: '单位地址'
  },
  {
    name: 'zipCode',
    checkname: '邮政编码'
  },
  {
    name: 'fax',
    checkname: '传真号'
  },
  {
    name: '_tag',
    checkname: '单位标签'
  },
  {
    name: '_introduction',
    checkname: '单位简介'
  }/* ,
  {
    name: 'id',
    checkname: '单位ID'
  },
  {
    name: 'parentId',
    checkname: '父级ID'
  },
  {
    name: 'dutyLevel',
    checkname: '职能级别：正厅级等'
  },
  {
    name: 'creditIdValidated',
    checkname: '统一社会信用代码是否认证通过'
  },
  {
    name: 'ext01',
    checkname: '扩展属性1'
  },
  {
    name: 'ext02',
    checkname: '扩展属性2'
  },
  {
    name: 'ext03',
    checkname: '扩展属性3'
  },
  {
    name: 'ext04',
    checkname: '扩展属性4'
  },
  {
    name: 'ext05',
    checkname: '扩展属性5'
  },
  {
    name: 'removed',
    checkname: '启用禁用'
  },
  {
    name: 'createTime',
    checkname: '创建时间'
  },
  {
    name: 'updatedTime',
    checkname: '修改时间'
  } */
]
const depAuditList = [
  {
    name: 'sort',
    checkname: '排序值'
  },
  {
    name: 'name',
    checkname: '内设机构名称'
  },
  {
    name: 'type',
    checkname: '内设机构类型'
  },
  {
    name: 'phone',
    checkname: '内设机构电话'
  },
  {
    name: 'description',
    checkname: '内设机构介绍'
  },
  {
    name: 'duty',
    checkname: '内设机构职责'
  }/* ,
  {
    name: 'id',
    checkname: '部门ID'
  },
  {
    name: 'parentId',
    checkname: '父级ID'
  },
  {
    name: 'orgId',
    checkname: '所属单位ID'
  },
  {
    name: 'removed',
    checkname: '启用禁用'
  },
  {
    name: 'createTime',
    checkname: '创建时间'
  },
  {
    name: 'updateTime',
    checkname: '修改时间'
  } */
]
const userAuditList = [
  {
    name: 'name',
    checkname: '用户姓名'
  },
  {
    name: 'idcard',
    checkname: '身份证号'
  },
  {
    name: 'userType',
    checkname: '人员类型'
  },
  {
    name: 'userState',
    checkname: '人员状态'
  },
  {
    name: 'mobile',
    checkname: '手机号'
  },
  {
    name: 'mobile2',
    checkname: '备用手机号'
  },
  {
    name: 'officePhone',
    checkname: '座机号'
  },
  {
    name: 'sex',
    checkname: '性别'
  },
  {
    name: 'birthday',
    checkname: '出生年月日'
  },
  {
    name: 'portraitUrl',
    checkname: '头像'
  },
  {
    name: 'qualification',
    checkname: '学历'
  },
  {
    name: 'professionalTitle',
    checkname: '职称'
  },
  {
    name: 'positionClass',
    checkname: '职级'
  },
  {
    name: 'nation',
    checkname: '民族'
  },
  {
    name: 'politicalParty',
    checkname: '党派'
  },
  {
    name: 'address',
    checkname: '通讯地址'
  },
  {
    name: 'type',
    checkname: '身份类型'
  },
  {
    name: 'dutyName',
    checkname: '职务'
  },
  {
    name: 'postName',
    checkname: '岗位'
  },
  {
    name: 'sort',
    checkname: '排序值'
  },
  {
    name: '_tag',
    checkname: '标签'
  },
  {
    name: '_introduction',
    checkname: '人员简介'
  }/* ,
  {
    name: 'uid',
    checkname: '用户ID'
  },
  {
    name: 'idCardValidated',
    checkname: '身份证号是否验证通过'
  },
  {
    name: 'ext01',
    checkname: '扩展属性1'
  },
  {
    name: 'ext02',
    checkname: '扩展属性2'
  },
  {
    name: 'ext03',
    checkname: '扩展属性3'
  },
  {
    name: 'ext04',
    checkname: '扩展属性'
  },
  {
    name: 'ext05',
    checkname: '扩展属性5'
  },
  {
    name: 'signed',
    checkname: '签名值'
  },
  {
    name: 'removed',
    checkname: '是否已经删除'
  },
  {
    name: 'createTime',
    checkname: '创建时间'
  },
  {
    name: 'updatedTime',
    checkname: '修改时间'
  },
  {
    name: 'departmentId',
    checkname: '部门ID'
  },
  {
    name: 'orgId',
    checkname: '单位ID'
  } */
]
export default {
  mixins: [handleBreadcrumb],
  data () {
    return {
      orgAuditList: orgAuditList, // 单位共享字段数据
      nodeAuditList: nodeAuditList,
      depAuditList: depAuditList,
      userAuditList: userAuditList,
      selectAry: [],
      systemAuditField: {
        checkedNodeAuditList: [], // 节点选中数据
        checkedOrgAuditList: [], // 单位选中数据
        checkedDepAuditList: [], //  内设机构
        checkedUserAuditList: [] // 人员选中
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.pushBreadcrumb({
        name: '应用配置',
        parent: {
          name: 'AppManagement',
          query: {
            type: 'back'
          }
        }
      })
    }
    this.getUserfindShare()
    // this.getShareFields()
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    handleCheckAllChange (val) {
    },
    getShareFields () {
      let data1 = {
        dataType: 1,
        fieldName: JSON.stringify(this.systemAuditField.checkedNodeAuditList)
      }
      let data2 = {
        dataType: 2,
        fieldName: JSON.stringify(this.systemAuditField.checkedOrgAuditList)
      }
      let data3 = {
        dataType: 3,
        fieldName: JSON.stringify(this.systemAuditField.checkedDepAuditList)
      }
      let data4 = {
        dataType: 4,
        fieldName: JSON.stringify(this.systemAuditField.checkedUserAuditList)
      }
      this.selectAry = [data1, data2, data3, data4]
      let result = this.selectAry.filter(function (val, i) {
        return (val.fieldName !== '[]')
      })
      this.selectAry = result
      let list = {
        appId: this.$route.query.id,
        shareFields: this.selectAry
      }
      api[urlNames['createShareFiled']](list).then(res => {
        if (res.status === 0) {
          this.$message.success('设置成功')
        }
      })
    },
    filterObj (dataObj) {
      for (let item in dataObj) {
        if (item === 'fieldName' && dataObj[item] !== '[]') {
          this.selectAry.push(dataObj)
        }
      }
    },
    getUserfindShare () {
      api[urlNames['findShareFiledByAppId']]({
        appId: this.$route.query.id
      }).then(res => {
        res.data.forEach(val => {
          if (val.dataType === 1) {
            this.systemAuditField.checkedNodeAuditList = JSON.parse(val.fieldName)
          }
          if (val.dataType === 2) {
            this.systemAuditField.checkedOrgAuditList = JSON.parse(val.fieldName)
          }
          if (val.dataType === 3) {
            this.systemAuditField.checkedDepAuditList = JSON.parse(val.fieldName)
          }
          if (val.dataType === 4) {
            this.systemAuditField.checkedUserAuditList = JSON.parse(val.fieldName)
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../system-setting/parmaeter-system-form/index';
</style>
