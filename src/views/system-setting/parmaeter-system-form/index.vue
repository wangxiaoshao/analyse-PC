<script src="../../../api/interceptors.js"></script>
<template>
  <div class="parmaeterFrom">
    <div class="parameter-item">
      <div class="header">用户密码安全设置</div>
      <el-form ref="UserSecuritySettings" :model="UserSecuritySettings" label-width="160px">
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="用户默认密码">
                <el-input size="mini" v-model="UserSecuritySettings.defaultPassword"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">主要用于设置创建人账号时，人员默认登录密码</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="登录失败次数">
                <el-input size="mini" v-model="UserSecuritySettings.loginFailNum"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">次，主要用于限定人员登录失败次数，如果超过该设置次数账号将被锁定，当设置为-1时失败次数无限制。</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="锁定用户时长">
                <el-input size="mini" v-model="UserSecuritySettings.lockTime"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">分钟，当人员输入密码错误超过最大限制时，人员账号将会被锁定时长。</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="密码过期周期">
                <el-input size="mini" v-model="UserSecuritySettings.passwordOverdueTime"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">分钟，主要用于设置对人员密码设置过期时长限制时，人员账号将会被锁定时长。</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="密码是否强制修改">
                <el-select size="mini" v-model="UserSecuritySettings.changePassword" placeholder="请选择">
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">主要用于设置密码过期时，是否强制修改密码，如果不修改密码将不能登录系统</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="密码强制修改单位范围">
                <el-input size="mini" v-model="UserSecuritySettings.changePasswordLength"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">主要用于设置那些单位登录系统需强制修改密码。-1或空则所有单位都需强制修改，如果设置有单位id，则只要求设置的单位登录系统后强制密码修改。</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="用户登录密码强度">
                <el-select size="mini" v-model="UserSecuritySettings.passwordStrength" placeholder="请选择活动区域">
                  <el-option label="强" :value="0"></el-option>
                  <el-option label="中" :value="1"></el-option>
                  <el-option label="弱" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">强：由数字、字母(区分大小写)、特殊字符!@#$^&*三中同时组合，且长度8位以上</div>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="systemSubmit(0)">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="parameter-item">
      <div class="header">通讯录权限设置</div>
      <el-form ref="addressBookSet" :model="addressBookSet" label-width="120px">
        <el-form-item label="所有单位信息">
          <el-radio-group v-model="addressBookSet.allOrgInfo">
            <el-radio :label="false">不可见</el-radio>
            <el-radio :label="true">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员姓名">
          <el-radio-group v-model="addressBookSet.userName">
            <el-radio :label="false">不可见</el-radio>
            <el-radio :label="true">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员手机号">
          <el-radio-group v-model="addressBookSet.userMobile">
            <el-radio :label="false">不可见</el-radio>
            <el-radio :label="true">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单位座机号">
          <el-radio-group v-model="addressBookSet.userPhone">
            <el-radio :label="false">不可见</el-radio>
            <el-radio :label="true">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员详情页">
          <el-radio-group v-model="addressBookSet.userDetail">
            <el-radio :label="false">不可见</el-radio>
            <el-radio :label="true">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门座机号">
          <el-radio-group v-model="addressBookSet.depPhone">
            <el-radio :label="false">不可见</el-radio>
            <el-radio :label="true">可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="systemSubmit(1)">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="parameter-item">
      <div class="header">其他设置</div>
      <el-form ref="MessageRemind" :model="MessageRemind" label-width="160px">
        <el-form-item label="设置信息确认弹窗提醒">
          <el-checkbox-group size="medium" v-model="MessageRemind">
            <el-checkbox-button label="7">每月最后七天</el-checkbox-button>
            <el-checkbox-button label="5">每月最后五天</el-checkbox-button>
            <el-checkbox-button label="3">每月最后三天</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="systemSubmit(2)">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="parameter-item">
      <div class="header">申请审核字段设置</div>
      <el-form ref="auditField" :model="auditField" label-width="160px">
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
              <el-checkbox-group v-model="auditField.checkedNodeAuditList" @change="handleCheckAllChange">
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
                <el-checkbox-group v-model="auditField.checkedOrgAuditList" @change="handleCheckAllChange">
                  <el-checkbox v-for="item in orgAuditList" :label="item.name" :key="item.name">{{item.checkname}}
                  </el-checkbox>
                </el-checkbox-group>
              </p>
            </div>
          </div>
          <div class="table-row">
            <div class="table-td">
              部门
            </div>
            <div class="table-td">
              <el-checkbox-group v-model="auditField.checkedDepAuditList" @change="handleCheckAllChange">
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
              <el-checkbox-group v-model="auditField.checkedUserAuditList" @change="handleCheckAllChange">
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
  import {api, urlNames} from '@src/api'

  const nodeAuditList = [{name: 'name', checkname: '结点名称'}]
  const orgAuditList = [{name: 'name', checkname: '单位全称'}, {name: 'shortName', checkname: '单位简称'}, {
    name: 'address',
    checkname: '单位地址'
  }, {name: 'phone', checkname: '电话'}, {name: 'systemType', checkname: '所属系统'}, {
    name: 'type',
    checkname: '所属类型'
  }, {name: 'removed', checkname: '启用禁用'}]
  const depAuditList = [{name: 'name', checkname: '部门名称'}, {name: 'type', checkname: '部门类型'}, {
    name: 'phone',
    checkname: '电话'
  }, {name: 'duty', checkname: '部门职责'}, {name: 'removed', checkname: '启用禁用'}]
  const userAuditList = [{name: 'name', checkname: '用户姓名'}, {name: 'mobile', checkname: '手机号'}, {
    name: 'dutyName',
    checkname: '职务'
  }, {name: 'type', checkname: '身份类型'}]
  export default {
    name: 'parmaeterFrom',
    data() {
      return {
        UserSecuritySettings: {// 用户安全
          defaultPassword: '123456',
          loginFailNum: 10,
          lockTime: 10,
          passwordOverdueTime: -1,
          changePassword: false,
          changePasswordLength: -1,
          passwordStrength: 0
        },
        addressBookSet: { // 通讯录
          allOrgInfo: false,
          userName: false,
          userMobile: false,
          userPhone: false,
          userDetail: false,
          depPhone: false
        },
        MessageRemind: [], // 消息提醒
        modeAuditList: [],
        orgAuditList: orgAuditList, // 单位审核字段数据
        nodeAuditList: nodeAuditList,
        depAuditList: depAuditList,
        userAuditList: userAuditList,
        auditField: {
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
    created() {
      this.getSystemParameterlevel(1)
    },
    methods: {
      getSystemParameterlevel(level) {
        api[urlNames['getSystemParameterlevel']]({
          level: level
        }).then((res) => {
          res.data.forEach(item => {
            if (item.name === '') {
            }
          })
          console.log(res, 'getSystemParameter')
        })
      },
      getSystemParameter() {
        // getSystemParameter
        api[urlNames['getSystemParameter']]({}).then((res) => {
          console.log(res, 'getSystemParameter')
        })
      },
      handleCheckAllChange(val) {
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      },
      // 单位设置提交
      orgFormSetSubmit() {
        console.log(this.orgFormSet.nameSet, 'orgFormSet')
      },
      userFormSetSubmit() {
        let list = {
          level: 1,
          name: 'userAuditFields',
          value: this.orgFormSet.systemUserSet
        }
        api[urlNames['setClientOptions']](list).then((res) => {
          if (res.status === 0) {
            this.$message.success('设置用户信息成功')
          }
        })
      },
      onSubmit(flag) {
        console.log('submit!')
      },
      systemSubmit(flag) {
        // 0 用户安全设置
        // 1通讯录设置
        // 2消息提醒设置
        let list = {
          level: 1,
          name: '',
          value: null
        }
        if (flag === 0) {
          list.name = 'UserSecuritySettings'
          list.value = this.UserSecuritySettings
        } else if (flag === 1) {
          list.name = 'addressBookSet'
          list.value = this.addressBookSet
        } else if (flag === 2) {
          list.name = 'addressBookSet'
          list.value = this.MessageRemind
        } else if (flag === 3) {
          list.name = 'addressBookSet'
          list.value = {
            checkedNodeAuditList: this.auditField.checkedNodeAuditList,
            checkedOrgAuditList: this.auditField.checkedOrgAuditList,
            checkedDepAuditList: this.auditField.checkedDepAuditList,
            checkedUserAuditList: this.auditField.checkedUserAuditList
          }
        }
        this.setClientOptions(list)
      },
      setClientOptions(list) {
        api[urlNames['setClientOptions']](list).then((res) => {
          if (res.status === 0) {
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
