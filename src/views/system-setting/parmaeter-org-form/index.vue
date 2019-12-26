<!--<script src="../../../api/interceptors.js"></script>-->
<template>
  <div class="parmaeterFrom">
    <div class="parameter-item">
      <div class="header">通讯录权限设置</div>
      <el-form ref="addressBookSet" :model="systemAddressBookSet" label-width="120px">
        <el-form-item label="所有单位信息">
          <el-radio-group v-model="systemAddressBookSet.allOrgInfo">
            <el-radio :label="0">不可见</el-radio>
            <el-radio :label="1">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员姓名">
          <el-radio-group v-model="systemAddressBookSet.userName">
            <el-radio :label="0">不可见</el-radio>
            <el-radio :label="1">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员手机号">
          <el-radio-group v-model="systemAddressBookSet.userMobile">
            <el-radio :label="0">不可见</el-radio>
            <el-radio :label="1">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单位座机号">
          <el-radio-group v-model="systemAddressBookSet.userPhone">
            <el-radio :label="0">不可见</el-radio>
            <el-radio :label="1">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员详情页">
          <el-radio-group v-model="systemAddressBookSet.userDetail">
            <el-radio :label="0">不可见</el-radio>
            <el-radio :label="1">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内设机构座机号">
          <el-radio-group v-model="systemAddressBookSet.depPhone">
            <el-radio :label="0">不可见</el-radio>
            <el-radio :label="1">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="systemSubmit(1)">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="parameter-item">
      <div class="header">申请审核字段设置</div>
      <el-form ref="systemAuditField" :model="systemAuditField" label-width="160px">
        <div class="table">
          <div class="table-row">
            <div class="table-td" style="text-align: center">模块</div>
            <div class="table-td" style="text-align: center">功能</div>
          </div>
          <!--            <div class="table-row">-->
          <!--              <div class="table-td">-->
          <!--                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
          <!--              </div>-->
          <!--              <div class="table-td"></div>-->
          <!--            </div>-->
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
          <el-button type="primary" @click="systemSubmit(3)">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
const nodeAuditList = [{ name: 'name', checkname: '节点名称' }]
const orgAuditList = [{ name: 'name', checkname: '单位全称' }, { name: 'shortName', checkname: '单位简称' }, {
  name: 'address',
  checkname: '单位地址'
}, { name: 'phone', checkname: '电话' }, { name: 'systemType', checkname: '所属系统' }, {
  name: 'type',
  checkname: '所属类型'
}, { name: 'removed', checkname: '启用禁用' }]
const depAuditList = [{ name: 'name', checkname: '内设机构名称' }, {
  name: 'phone',
  checkname: '电话'
}, { name: 'duty', checkname: '内设机构职责' }, { name: 'removed', checkname: '启用禁用' }]
const userAuditList = [{ name: 'name', checkname: '用户姓名' }, { name: 'mobile', checkname: '手机号' }, {
  name: 'dutyName',
  checkname: '职务'
}, { name: 'type', checkname: '身份类型' }]
export default {
  name: 'parmaeterFrom',
  data () {
    return {
      systemAddressBookSet: { // 通讯录
        allOrgInfo: 0,
        userName: 0,
        userMobile: 0,
        userPhone: 0,
        userDetail: 0,
        depPhone: 0
      },
      modeAuditList: [],
      orgAuditList: orgAuditList, // 单位审核字段数据
      nodeAuditList: nodeAuditList,
      depAuditList: depAuditList,
      userAuditList: userAuditList,
      systemAuditField: {
        checkedNodeAuditList: [], // 节点选中数据
        checkedOrgAuditList: [], // 单位选中数据
        checkedDepAuditList: [], //  部门
        checkedUserAuditList: [] // 人员选中
      },
      orgFormSet: {
        nameSet: [],
        systemUserSet: []
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      checkAll: false,
      isIndeterminate: true,
      checkboxGroup1: ''
    }
  },
  created () {
    this.getSystemParameterlevel(2)
  },
  methods: {
    ...mapMutations(['GET_OPTION']),
    getSystemParameterlevel (level) {
      api[urlNames['getSystemParameterlevel']]({
        level: level
      }).then((res) => {
        res.data.forEach(item => {
          if (item.name === 'systemAddressBookSet') {
            this.systemAddressBookSet = JSON.parse(item.value)
          }
          if (item.name === 'userAuditFields') {
            this.systemAuditField.checkedUserAuditList = item.value
          }
          if (item.name === 'departmentAuditFields') {
            this.systemAuditField.checkedDepAuditList = item.value
          }
          if (item.name === 'orgAuditFields') {
            this.systemAuditField.checkedOrgAuditList = item.value
          }
          // checkedNodeAuditList: [], // 节点选中数据
        })
      })
    },
    getSystemParameter () {
      // getSystemParameter
      api[urlNames['getSystemParameter']]({}).then((res) => {
        console.log(res, 'getSystemParameter')
      })
    },
    handleCheckAllChange (val) {
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    userFormSetSubmit () {
      let list = {
        level: 2,
        name: 'userAuditFields',
        value: this.orgFormSet.systemUserSet
      }
      api[urlNames['setClientOptions']](list).then((res) => {
        if (res.status === 0) {
          this.$message.success('设置用户信息成功')
        }
      })
    },
    systemSubmit (flag) {
      // 0 用户安全设置
      // 1通讯录设置
      // 2消息提醒设置
      let list = {
        level: 2,
        name: '',
        value: null
      }
      if (flag === 1) {
        list.name = 'systemAddressBookSet'
        list.value = this.systemAddressBookSet
      } else if (flag === 3) {
        list.name = 'nodeAuditFields'
        list.value = this.systemAuditField.checkedNodeAuditList
        this.setClientOptions(list)
        list.name = 'userAuditFields'
        list.value = this.systemAuditField.checkedUserAuditList
        this.setClientOptions(list)
        list.name = 'departmentAuditFields'
        list.value = this.systemAuditField.checkedDepAuditList
        this.setClientOptions(list)
        list.name = 'orgAuditFields'
        list.value = this.systemAuditField.checkedOrgAuditList
      }
      this.setClientOptions(list)
    },
    getOption () {
      api[urlNames['option']]().then((res) => {
        this.GET_OPTION(res.data)
      })
    },
    setClientOptions (list) {
      api[urlNames['setClientOptions']](list).then((res) => {
        if (res.status === 0) {
          this.getOption()
          this.$message.success('设置成功')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  @import "index";
</style>
