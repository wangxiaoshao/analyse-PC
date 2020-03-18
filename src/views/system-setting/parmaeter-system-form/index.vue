<!--<script src="../../../api/interceptors.js"></script>-->
<template>
  <div class="parmaeterFrom">
    <div class="parameter-item" v-if="false">
      <div class="header">用户密码安全设置</div>
      <el-form ref="systemUserSecuritySettings"  label-width="160px">
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="用户默认密码">
                <el-input size="mini" v-model="systemUserSecuritySettings.defaultPassword"></el-input>
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
                <el-input size="mini" v-model="systemUserSecuritySettings.loginFailNum"></el-input>
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
                <el-input size="mini" v-model="systemUserSecuritySettings.lockTime"></el-input>
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
                <el-input size="mini" v-model="systemUserSecuritySettings.passwordOverdueTime"></el-input>
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
                <el-select size="mini" v-model="systemUserSecuritySettings.changePassword" placeholder="请选择">
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
                <el-input size="mini" v-model="systemUserSecuritySettings.changePasswordLength"></el-input>
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
                <el-select size="mini" v-model="systemUserSecuritySettings.passwordStrength" placeholder="请选择活动区域">
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
      <el-form ref="addressBookSet"  label-width="120px">
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
        <div class="header">信息确认设置</div>
        <el-form ref="systemMessageRemind" label-width="160px">
            <el-form-item label="单位信息确认">
                <el-switch v-model="systemMessageConfirm" @change="showMessageConfirmDialog()" active-text="" inactive-text="">
                </el-switch>
            </el-form-item>
            <div v-if="systemMessageConfirm">
                <el-form-item label="设置信息确认弹窗提醒">
                    <el-radio-group size="medium" v-model="systemMessageRemind">
                        <el-radio-button label="7">每月最后七天</el-radio-button>
                        <el-radio-button label="5">每月最后五天</el-radio-button>
                        <el-radio-button label="3">每月最后三天</el-radio-button>
                        <el-radio-button label="-1">不提醒</el-radio-button>
                    </el-radio-group>
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
      <el-form ref="systemAuditField"  label-width="160px">
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
          <el-button type="primary" @click="systemSubmit(3)">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="parameter-item">
      <div class="header">系统配置</div>
        <el-form label-width="auto" :model="systemNameLogoIcon">
          <el-row :gutter="8">
            <el-col>
              <el-form-item label="系统名称">
                <el-col :span="5">
                  <el-input placeholder="系统名称" v-model="systemNameLogoIcon.systemName">
                </el-input>
                </el-col>
                <el-col :span="2"><el-button type="primary"  size="small" @click="updateSystemName">提交</el-button></el-col>
              </el-form-item>
               <el-form-item label="系统图标">
                 <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    name="files"
                    :action="'http://' + uploadHost + '/api/jg_manage/image/upload?_='+downloadBinaryFile()[0]+'&sign='+downloadBinaryFile()[1]"
                    :on-success="handleSystemLogo"
                    :before-upload="beforeUpload"
                    :auto-upload="true"
                    list-type="picture"
                  >
                <img v-if="systemNameLogoIcon.systemLogo" :src="systemNameLogoIcon.systemLogo" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                 <div slot="tip" style="font-size: 10px;color: #606266">
                  <span style="color: #FC7049">*</span>只支持jpg格式，100*100像素的图片
                  <el-button type="primary" size="small" @click="updateSystemLogo">提交</el-button>
                  </div>
              </el-upload>
              </el-form-item>
               <el-form-item label="favicon图标">
                <el-upload
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false"
                    name="favicon"
                    :on-change='systemFaviconFileChange'
                    :auto-upload="false"
                    :before-upload="beforeUpload"
                    :on-success="handleSystemFavicon"
                    list-type="picture"
                  >
                <img v-if="systemNameLogoIcon.favicon" :src="systemNameLogoIcon.favicon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" style="font-size: 10px;color: #606266">
                    <span style="color: #FC7049">*</span>只支持jpg格式，100*100像素的图片
                    <el-button type="primary" size="small" @click="updateSystemFavicon">提交</el-button>
                  </div>
              </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

    </div>

    <!-- 单位确认信息对话框 -->
    <el-dialog :visible.sync="systemMsgConfirmOpenVisible" width="410px" :show-close="false">
        <div slot="title" style="padding:20px; background-color: #fff;">
            <span class="msg-title">确认打开单位信息确认</span>
            <span class="svg-container" style="color:red">
                <span class="el-icon-document-copy"></span>
            </span>
        </div>
        <div class="msg-box">打开单位信息确认后，从下月起，您的单位信息将需要手动确认。</div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSavesystemMessageConfirm()">确定打开</el-button>
            <el-button type="default" @click="systemMsgConfirmOpenVisible = false; systemMessageConfirm = !systemMessageConfirm;" width="100px">取 消</el-button>
        </div>
    </el-dialog>

    <el-dialog :visible.sync="systemMsgConfirmCloseVisible" width="410px" :show-close="false">
        <div slot="title" style="padding:20px; background-color: #fff;">
            <span class="msg-title">确认关闭单位信息确认</span>
            <span class="svg-container" style="color:red">
                <span class="el-icon-document-copy"></span>
            </span>
        </div>
        <div class="msg-box">关闭单位信息确认后，从下月起，您的单位信息将不再需要手动确认。</div>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSavesystemMessageConfirm()">确定关闭</el-button>
            <el-button type="default" @click="systemMsgConfirmCloseVisible = false; systemMessageConfirm = !systemMessageConfirm;" width="100px">取 消</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'
import uploadFile from '@src/mixins/uploadFile.js'
import hasRight from '@src/mixins/has-right'

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
  mixins: [uploadFile, hasRight],
  data () {
    return {
      systemUserSecuritySettings: {// 用户安全
        defaultPassword: '123456',
        loginFailNum: 10,
        lockTime: 10,
        passwordOverdueTime: -1,
        changePassword: false,
        changePasswordLength: -1,
        passwordStrength: 0
      },
      systemAddressBookSet: { // 通讯录
        allOrgInfo: 0,
        userName: 0,
        userMobile: 0,
        userPhone: 0,
        userDetail: 0,
        depPhone: 0
      },
      systemNameLogoIcon: {
        systemName: '',
        systemLogo: '',
        favicon: ''
      },
      uploadHost: window.location.host,
      systemMsgConfirmOpenVisible: false, // 打开单位信息确认对话框
      systemMsgConfirmCloseVisible: false, // 关闭单位信息确认对话框
      systemMessageConfirm: true, // 单位信息确认
      systemMessageRemind: {}, // 消息提醒
      modeAuditList: [],
      orgAuditList: orgAuditList, // 单位审核字段数据
      nodeAuditList: nodeAuditList,
      depAuditList: depAuditList,
      userAuditList: userAuditList,
      systemAuditField: {
        checkedNodeAuditList: [], // 节点选中数据
        checkedOrgAuditList: [], // 单位选中数据
        checkedDepAuditList: [], //  内设机构
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
    this.getSystemParameterlevel(1)
    this.getSystemNameLogoIon()
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    ...mapMutations(['SET_OPTION']),
    getSystemParameterlevel (level) {
      api[urlNames['getSystemParameterlevel']]({
        level: level
      }).then((res) => {
        res.data.forEach(item => {
          if (item.name === 'systemAddressBookSet') {
            this.systemAddressBookSet = JSON.parse(item.value)
          }
          if (item.name === 'systemUserSecuritySettings') {
            this.systemUserSecuritySettings = JSON.parse(item.value)
          }
          if (item.name === 'systemMessageRemind') {
            this.systemMessageRemind = JSON.parse(item.value)
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
          if (item.name === 'nodeAuditFields') {
            // console.log([item.value.slice(2,item.value.length-2)])
            // this.systemAuditField.checkedNodeAuditList=[item.value.slice(2,item.value.length-2)]
            this.systemAuditField.checkedNodeAuditList = item.value
          }
        })
      })
    },
    handleSystemLogo (res, file) {
      this.systemNameLogoIcon.systemLogo = res.data[0]
    },
    handleSystemFavicon (res, file) {
      this.systemNameLogoIcon.favicon = res.data[0]
    },
    onToggleMessageConfirm () {
      this.systemMsgConfirmOpenVisible = false
      this.systemMsgConfirmCloseVisible = false

      // 处理“单位确认信息”开关的切换
    },
    showMessageConfirmDialog () {
      if (this.systemMessageConfirm) {
        this.systemMsgConfirmOpenVisible = true
      } else {
        this.systemMsgConfirmCloseVisible = true
      }
    },
    onSavesystemMessageConfirm () {
      this.systemMsgConfirmOpenVisible = false
      this.systemMsgConfirmCloseVisible = false
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 获取系统名称，系统图标
    getSystemNameLogoIon () {
      this.systemNameLogoIcon.systemName = this.app.option.options.systemName
      this.systemNameLogoIcon.systemLogo = this.app.option.options.systemLogo
      this.systemNameLogoIcon.favicon = this.app.option.options.favicon
    },
    systemLogoFileChange (file, fileList) {
      // debugger
      // this.systemNameLogoIcon.systemLogo = file.url
    },
    systemFaviconFileChange (file, fileList) {
      // this.systemNameLogoIcon.favicon = file.url
    },
    // 更新系统名称
    updateSystemName () {
      let list = {
        level: 1,
        name: 'systemName',
        value: this.systemNameLogoIcon.systemName
      }
      this.setClientOptions(list)
    },
    // 更新系统图标
    updateSystemLogo () {
      let list = {
        level: 1,
        name: 'systemLogo',
        value: this.systemNameLogoIcon.systemLogo
      }
      this.setClientOptions(list)
    },
    // 更新favicon图标
    updateSystemFavicon () {
      let list = {
        level: 1,
        name: 'favicon',
        value: this.systemNameLogoIcon.favicon
      }
      this.setClientOptions(list)
    },
    getSystemParameter () {
      // getSystemParameter
      api[urlNames['getSystemParameter']]({}).then((res) => {
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
    // 单位设置提交
    orgFormSetSubmit () {
      console.log(this.orgFormSet.nameSet, 'orgFormSet')
    },
    userFormSetSubmit () {
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
        list.name = 'systemUserSecuritySettings'
        list.value = this.systemUserSecuritySettings
      } else if (flag === 1) {
        list.name = 'systemAddressBookSet'
        list.value = this.systemAddressBookSet
      } else if (flag === 2) {
        list.name = 'systemMessageRemind'
        list.value = this.systemMessageRemind
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
        this.SET_OPTION(res.data)
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
