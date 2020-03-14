<template>
<div class="fields-management">
   <div class="parameter-item">
      <div class="header">申请审核字段设置</div>
      <el-form ref="systemAuditField" :model="systemAuditField" label-width="160px">
        <div class="table">
          <div class="table-row">
            <div class="table-td" style="text-align: center">模块</div>
            <div class="table-td" style="text-align: center">功能</div>
          </div>
          <div class="table-row">
            <div class="table-td">
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
            <div class="table-td">
              <p>单位</p>
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
            <div class="table-td">
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
            <div class="table-td">
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
const nodeAuditList = [{ name: 'name', checkname: '节点名称' }]
const orgAuditList = [{ name: 'name', checkname: '单位全称' }, { name: 'shortName', checkname: '单位简称' }, {
  name: 'address',
  checkname: '单位地址'
}, { name: 'phone', checkname: '电话' }, { name: 'systemType', checkname: '所属系统' }, { name: 'type', checkname: '所属类型'
}, { name: 'removed', checkname: '启用禁用' }]
const depAuditList = [{ name: 'name', checkname: '内设机构名称' }, {
  name: 'phone',
  checkname: '电话'
}, { name: 'duty', checkname: '内设机构职责' }, { name: 'removed', checkname: '启用禁用' }, { dataType: 3 }]
const userAuditList = [{ name: 'name', checkname: '用户姓名' }, { name: 'mobile', checkname: '手机号' }, {
  name: 'dutyName', checkname: '职务' }, { name: 'type', checkname: '身份类型' }]
export default {
  data () {
    return {
      orgAuditList: orgAuditList, // 单位审核字段数据
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
