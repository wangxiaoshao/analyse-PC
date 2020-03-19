<template>
<div class="parmaeterFrom">
    <div class="parameter-item" v-if="false">
        <div class="header">用户密码安全设置</div>
        <el-form ref="orgUserSecuritySettings" :model="orgUserSecuritySettings" label-width="160px">
            <el-row>
                <el-col :span="7">
                    <div class="grid-content bg-purple">
                        <el-form-item label="用户默认密码">
                            <el-input size="mini" v-model="orgUserSecuritySettings.defaultPassword"></el-input>
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
                            <el-input size="mini" v-model="orgUserSecuritySettings.loginFailNum"></el-input>
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
                            <el-input size="mini" v-model="orgUserSecuritySettings.lockTime"></el-input>
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
                            <el-input size="mini" v-model="orgUserSecuritySettings.passwordOverdueTime"></el-input>
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
                            <el-select size="mini" v-model="orgUserSecuritySettings.changePassword" placeholder="请选择">
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
                            <el-input size="mini" v-model="orgUserSecuritySettings.changePasswordLength"></el-input>
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
                            <el-select size="mini" v-model="orgUserSecuritySettings.passwordStrength" placeholder="请选择活动区域">
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
        <el-form ref="orgAddressBookSet" :model="orgAddressBookSet" label-width="120px">
            <el-form-item label="所有单位信息">
                <el-radio-group v-model="orgAddressBookSet.allOrgInfo">
                    <el-radio :label="0">不可见</el-radio>
                    <el-radio :label="1">可见</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="人员姓名">
                <el-radio-group v-model="orgAddressBookSet.userName">
                    <el-radio :label="0">不可见</el-radio>
                    <el-radio :label="1">可见</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="人员手机号">
                <el-radio-group v-model="orgAddressBookSet.userMobile">
                    <el-radio :label="0">不可见</el-radio>
                    <el-radio :label="1">可见</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="单位座机号">
                <el-radio-group v-model="orgAddressBookSet.userPhone">
                    <el-radio :label="0">不可见</el-radio>
                    <el-radio :label="1">可见</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="人员详情页">
                <el-radio-group v-model="orgAddressBookSet.userDetail">
                    <el-radio :label="0">不可见</el-radio>
                    <el-radio :label="1">可见</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="内设机构座机号">
                <el-radio-group v-model="orgAddressBookSet.depPhone">
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
        <div class="header">信息确认设置</div>
        <el-form ref="orgMessageRemind" label-width="160px">
            <el-form-item label="单位信息确认">
                <el-switch v-model="orgMessageConfirm" @change="showMessageConfirmDialog()" active-text="" inactive-text="">
                </el-switch>
            </el-form-item>
            <div v-if="orgMessageConfirm">
                <el-form-item label="设置信息确认弹窗提醒">
                    <el-date-picker
                        v-model="orgRemindTimeRange"
                        type="daterange"
                        :editable="false"
                        :clearable="true"
                        format="dd号"
                        min-date="2020-01-01"
                        max-date="2020-01-31"
                        start-placeholder="选择提醒开始时间"
                        end-placeholder="选择提醒结束时间"
                        @change="noRemind = false">
                      </el-date-picker>
                      <el-checkbox-button v-model="noRemind" checked @change="orgRemindTimeRange = []">不提醒</el-checkbox-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="systemSubmit(2)">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
    <div class="parameter-item">
        <div class="header">申请审核字段设置
          <span class="info-msg">（如下字段被选中以后再被修改，则需要审核后方可生效；不选中的字段被修改，不需要审核）</span>
        </div>
        <el-form ref="orgAuditField" :model="orgAuditField" label-width="160px">
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
                    <div class="table-td" style="text-align: center">
                        节点
                    </div>
                    <div class="table-td">
                        <el-checkbox-group v-model="orgAuditField.checkedNodeAuditList" @change="handleCheckAllChange">
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
                            <el-checkbox-group v-model="orgAuditField.checkedOrgAuditList" @change="handleCheckAllChange">
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
                        <el-checkbox-group v-model="orgAuditField.checkedDepAuditList" @change="handleCheckAllChange">
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
                        <el-checkbox-group v-model="orgAuditField.checkedUserAuditList" @change="handleCheckAllChange">
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

    <!-- 单位确认信息对话框 -->
    <el-dialog :visible.sync="orgMsgConfirmOpenVisible" width="410px" :show-close="false">
        <div slot="title" style="padding:20px; background-color: #fff;">
            <span class="msg-title">确认打开单位信息确认</span>
            <span class="svg-container" style="color:red">
                <span class="el-icon-document-copy"></span>
            </span>
        </div>
        <div class="msg-box">打开单位信息确认后，从下月起，您的单位信息将需要手动确认。</div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSaveOrgMessageConfirm()">确定打开</el-button>
            <el-button type="default" @click="orgMsgConfirmOpenVisible = false; orgMessageConfirm = !orgMessageConfirm;" width="100px">取 消</el-button>
        </div>
    </el-dialog>

    <el-dialog :visible.sync="orgMsgConfirmCloseVisible" width="410px" :show-close="false">
        <div slot="title" style="padding:20px; background-color: #fff;">
            <span class="msg-title">确认关闭单位信息确认</span>
            <span class="svg-container" style="color:red">
                <span class="el-icon-document-copy"></span>
            </span>
        </div>
        <div class="msg-box">关闭单位信息确认后，从下月起，您的单位信息将不再需要手动确认。</div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSaveOrgMessageConfirm()">确定关闭</el-button>
            <el-button type="default" @click="orgMsgConfirmCloseVisible = false; orgMessageConfirm = !orgMessageConfirm;" width="100px">取 消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
  api,
  urlNames
} from '@src/api'
const nodeAuditList = [{
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
},
{
  name: 'areaId',
  checkname: '区域ID'
},
{
  name: 'name',
  checkname: '结点名称'
},
{
  name: 'syncChildren',
  checkname: '是否同步子级'
},
{
  name: 'nodeType',
  checkname: '结点类型'
},
{
  name: 'systemType',
  checkname: '从属哪些四大班子体系'
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
}
]
const orgAuditList = [{
  name: 'id',
  checkname: '单位ID'
},
{
  name: 'parentId',
  checkname: '父级ID'
},
{
  name: 'level',
  checkname: '单位级别：省市县'
},
{
  name: 'dutyLevel',
  checkname: '职能级别：正厅级等'
},
{
  name: 'type',
  checkname: '所属类型'
},
{
  name: 'systemType',
  checkname: '所属系统'
},
{
  name: 'name',
  checkname: '单位全称'
},
{
  name: 'shortName',
  checkname: '单位简称'
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
  checkname: '邮编'
},
{
  name: 'fax',
  checkname: '传真号'
},
{
  name: 'phone',
  checkname: '电话'
},
{
  name: 'creditId',
  checkname: '统一社会信用代码'
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
}
]
const depAuditList = [{
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
  checkname: '电话'
},
{
  name: 'description',
  checkname: '部门介绍'
},
{
  name: 'duty',
  checkname: '内设机构职责'
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
}]
const userAuditList = [{
  name: 'uid',
  checkname: '用户ID'
},
{
  name: 'name',
  checkname: '用户姓名'
},
{
  name: 'idcard',
  checkname: '身份证号'
},
{
  name: 'idCardValidated',
  checkname: '身份证号是否验证通过'
},
{
  name: 'userType',
  checkname: '人员类型：事业编制、行政编制、企业编制'
},
{
  name: 'userState',
  checkname: '人员状态：在职、离职、退休'
},
{
  name: 'mobile',
  checkname: '手机号'
},
{
  name: 'mobile2',
  checkname: '手机号2'
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
  checkname: '头像地址'
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
  checkname: '地址'
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
  name: 'type',
  checkname: '身份类型'
},
{
  name: 'departmentId',
  checkname: '部门ID'
},
{
  name: 'orgId',
  checkname: '单位ID'
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
}]
export default {
  name: 'parmaeterFrom',
  data () {
    return {
      orgUserSecuritySettings: { // 用户安全
        defaultPassword: '123456',
        loginFailNum: 10,
        lockTime: 10,
        passwordOverdueTime: -1,
        changePassword: false,
        changePasswordLength: -1,
        passwordStrength: 0
      },
      orgAddressBookSet: { // 通讯录
        allOrgInfo: false,
        userName: false,
        userMobile: false,
        userPhone: false,
        userDetail: false,
        depPhone: false
      },
      orgMsgConfirmOpenVisible: false, // 打开单位信息确认对话框
      orgMsgConfirmCloseVisible: false, // 关闭单位信息确认对话框
      orgMessageConfirm: true, // 单位信息确认
      orgMessageRemind: -1, // 消息提醒
      noRemind: true, // 消息提醒，默认不提醒
      orgRemindTimeRange: [], // 提醒的时间区间
      modeAuditList: [],
      orgAuditList: orgAuditList, // 单位审核字段数据
      nodeAuditList: nodeAuditList,
      depAuditList: depAuditList,
      userAuditList: userAuditList,
      orgAuditField: {
        checkedNodeAuditList: [], // 节点选中数据
        checkedOrgAuditList: [], // 单位选中数据
        checkedDepAuditList: [], //  内设机构
        checkedUserAuditList: [] // 人员选中
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
    this.getSystemParameterlevel(1)
  },
  methods: {
    getSystemParameterlevel (level) {
      api[urlNames['getSystemParameterlevel']]({
        level: level
      }).then((res) => {
        res.data.forEach(item => {
          if (item.name === 'orgAddressBookSet') {
            this.orgAddressBookSet = JSON.parse(item.value)
          }
          if (item.name === 'orgUserSecuritySettings') {
            this.orgUserSecuritySettings = JSON.parse(item.value)
          }
          if (item.name === 'orgMessageRemind') {
            this.orgMessageRemind = JSON.parse(item.value)
          }
          if (item.name === 'orgCheckedAuditList') {
            this.orgAuditField = JSON.parse(item.value)
          }
        })
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
    onToggleMessageConfirm () {
      this.orgMsgConfirmOpenVisible = false
      this.orgMsgConfirmCloseVisible = false

      // 处理“单位确认信息”开关的切换
    },
    showMessageConfirmDialog () {
      if (this.orgMessageConfirm) {
        this.orgMsgConfirmOpenVisible = true
      } else {
        this.orgMsgConfirmCloseVisible = true
      }
    },
    onSaveOrgMessageConfirm () {
      this.orgMsgConfirmOpenVisible = false
      this.orgMsgConfirmCloseVisible = false
    },
    onSubmit (flag) {
      console.log('submit!')
    },
    systemSubmit (flag) {
      // 0 用户安全设置
      // 1通讯录设置
      // 2消息提醒设置
      let list = {
        level: 1,
        name: '',
        value: null
      }
      if (flag === 0) {
        list.name = 'orgUserSecuritySettings'
        list.value = this.orgUserSecuritySettings
      } else if (flag === 1) {
        list.name = 'orgAddressBookSet'
        list.value = this.orgAddressBookSet
      } else if (flag === 2) {
        list.name = 'orgMessageRemind'
        list.value = this.orgMessageRemind
      } else if (flag === 3) {
        list.name = 'orgCheckedAuditList'
        list.value = {
          checkedNodeAuditList: this.orgAuditField.checkedNodeAuditList,
          checkedOrgAuditList: this.orgAuditField.checkedOrgAuditList,
          checkedDepAuditList: this.orgAuditField.checkedDepAuditList,
          checkedUserAuditList: this.orgAuditField.checkedUserAuditList
        }
      }
      this.setClientOptions(list)
    },
    setClientOptions (list) {
      api[urlNames['setClientOptions']](list).then((res) => {
        if (res.status === 0) {
          this.$message.success('设置成功')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "index";
</style>
