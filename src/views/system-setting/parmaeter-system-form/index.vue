<!--<script src="../../../api/interceptors.js"></script>-->
<template>
    <div class="parmaeterFrom">
        <div class="parameter-item" v-if="false">
            <div class="header">用户密码安全设置</div>
            <el-form ref="systemUserSecuritySettings" label-width="160px">
                <el-row>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-form-item label="用户默认密码">
                                <el-input
                                    size="mini"
                                    v-model="
                                        systemUserSecuritySettings.defaultPassword
                                    "
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <div class="tip">
                                主要用于设置创建人账号时，人员默认登录密码
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-form-item label="登录失败次数">
                                <el-input
                                    size="mini"
                                    v-model="
                                        systemUserSecuritySettings.loginFailNum
                                    "
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <div class="tip">
                                次，主要用于限定人员登录失败次数，如果超过该设置次数账号将被锁定，当设置为-1时失败次数无限制。
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-form-item label="锁定用户时长">
                                <el-input
                                    size="mini"
                                    v-model="
                                        systemUserSecuritySettings.lockTime
                                    "
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <div class="tip">
                                分钟，当人员输入密码错误超过最大限制时，人员账号将会被锁定时长。
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-form-item label="密码过期周期">
                                <el-input
                                    size="mini"
                                    v-model="
                                        systemUserSecuritySettings.passwordOverdueTime
                                    "
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <div class="tip">
                                分钟，主要用于设置对人员密码设置过期时长限制时，人员账号将会被锁定时长。
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-form-item label="密码是否强制修改">
                                <el-select
                                    size="mini"
                                    v-model="
                                        systemUserSecuritySettings.changePassword
                                    "
                                    placeholder="请选择"
                                >
                                    <el-option
                                        label="是"
                                        :value="true"
                                    ></el-option>
                                    <el-option
                                        label="否"
                                        :value="false"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <div class="tip">
                                主要用于设置密码过期时，是否强制修改密码，如果不修改密码将不能登录系统
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-form-item label="密码强制修改单位范围">
                                <el-input
                                    size="mini"
                                    v-model="
                                        systemUserSecuritySettings.changePasswordLength
                                    "
                                ></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <div class="tip">
                                主要用于设置那些单位登录系统需强制修改密码。-1或空则所有单位都需强制修改，如果设置有单位id，则只要求设置的单位登录系统后强制密码修改。
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <div class="grid-content bg-purple">
                            <el-form-item label="用户登录密码强度">
                                <el-select
                                    size="mini"
                                    v-model="
                                        systemUserSecuritySettings.passwordStrength
                                    "
                                    placeholder="请选择活动区域"
                                >
                                    <el-option
                                        label="强"
                                        :value="0"
                                    ></el-option>
                                    <el-option
                                        label="中"
                                        :value="1"
                                    ></el-option>
                                    <el-option
                                        label="弱"
                                        :value="2"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-light">
                            <div class="tip">
                                强：由数字、字母(区分大小写)、特殊字符!@#$^&*三中同时组合，且长度8位以上
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="systemSubmit(0)"
                        >保存</el-button
                    >
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <div class="parameter-item" v-if="hasRight('optionSystemLevelTxlSetting')">
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
    </div> -->
        <div class="parameter-item">
            <div class="header">单位信息确认短信模板</div>
            <el-form class="sms-template">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            type="textarea"
                            v-model="orgMessageRemindTemplate"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <p>每月单位信息需要确认时发送短信。</p>
                        <br />
                        <p>
                            可用占位符：<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{单位名称}')"
                                >{单位名称}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{月份}')"
                                >{月份}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="
                                    insertTextIntoCursor('{信息确认截止时间}')
                                "
                                >{信息确认截止时间}</el-button
                            >
                        </p>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="saveorgMessageRemindTemplate"
                                >保存</el-button
                            >
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="parameter-item">
            <div class="header">发起审核通知短信模板</div>
            <el-form class="sms-template">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            type="textarea"
                            v-model="informationAuditTemplate"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <p>审核管理员有审核事项时，给相关人员发送短信。</p>
                        <br />
                        <p>
                            可用占位符：<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{单位名称}')"
                                >{单位名称}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{操作人名称}')"
                                >{操作人名称}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{修改字段}')"
                                >{修改字段}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{修改时间}')"
                                >{修改时间}</el-button
                            >。
                        </p>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="saveinformationAuditTemplate"
                                >保存</el-button
                            >
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="parameter-item">
            <div class="header">审核通过短信模板</div>
            <el-form class="sms-template">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            type="textarea"
                            v-model="informationAuditThroughTemplate"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <p>审核管理员有审核事项时，给相关人员发送短信。</p>
                        <br />
                        <p>
                            可用占位符：<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{单位名称}')"
                                >{单位名称}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{操作人名称}')"
                                >{操作人名称}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{修改字段}')"
                                >{修改字段}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{修改时间}')"
                                >{修改时间}</el-button
                            >。
                        </p>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="saveinformationAuditThroughTemplate"
                                >保存</el-button
                            >
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div
            class="parameter-item"
            v-if="hasRight('optionSystemLevelCSetting')"
        >
            <div class="header">信息确认设置</div>
            <el-form ref="messageRemind" label-width="160px">
                <el-form-item label="允许单位配置该参数">
                    <el-switch v-model="allowSetOrg"></el-switch>
                    <div class="info-msg" style="margin-left: -136px;">
                        (该配置项打开后，单位管理员可再次配置该参数，且最终以单位配置结果为准）
                    </div>
                </el-form-item>
                <el-form-item label="设置信息确认弹窗提醒">
                    <el-select
                        v-model="remindStartDate"
                        placeholder="选择提醒开始时间"
                        @change="onStartDateChanged"
                        :disabled="startDateDisabled"
                        ref="remindStartDate"
                    >
                        <el-option
                            v-for="item in remindStartDateList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                        >
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="remindEndDate"
                        placeholder="选择提醒结束时间"
                        @change="onEndDateChanged"
                        :disabled="endDateDisabled"
                        ref="remindEndDate"
                    >
                        <el-option
                            v-for="item in remindEndDateList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled"
                        >
                        </el-option>
                    </el-select>
                    <el-checkbox-button
                        class="button-no-remind"
                        v-model="noRemind"
                        @change="onNoRemind"
                        >不提醒</el-checkbox-button
                    >
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="systemSubmit(2)"
                        >保存</el-button
                    >
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="parameter-item">
            <div class="header">发送验证码短信模板</div>
            <el-form class="sms-template">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            type="textarea"
                            v-model="SMSVerificationCodeTemplate"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <p>审核管理员有审核事项时，给相关人员发送短信。</p>
                        <br />
                        <p>
                            可用占位符：
                            <el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{验证码}')"
                                >{验证码}</el-button
                            >。
                        </p>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="saveSMSVerificationCodeTemplate"
                                >保存</el-button
                            >
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="parameter-item">
            <div class="header">重置密码成功短信模板</div>
            <el-form class="sms-template">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input
                            type="textarea"
                            v-model="resetPasswordTemplate"
                        ></el-input>
                    </el-col>
                    <el-col :span="12">
                        <p>审核管理员有审核事项时，给相关人员发送短信。</p>
                        <br />
                        <p>
                            可用占位符：<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{验证码}')"
                                >{密码}</el-button
                            >，<el-button
                                type="primary"
                                size="small"
                                round
                                @click="insertTextIntoCursor('{重置时间}')"
                                >{重置时间}</el-button
                            >。
                        </p>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item>
                            <el-button
                                type="primary"
                                @click="saveresetPasswordTemplate"
                                >保存</el-button
                            >
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="parameter-item">
            <div class="header">系统配置</div>
            <el-form label-width="auto" :model="systemNameLogoIcon">
                <el-row :gutter="8">
                    <el-col>
                        <el-form-item label="系统名称">
                            <el-col :span="5">
                                <el-input
                                    placeholder="系统名称"
                                    v-model="systemNameLogoIcon.systemName"
                                >
                                </el-input>
                            </el-col>
                            <el-col :span="2"
                                ><el-button
                                    type="primary"
                                    size="small"
                                    @click="updateSystemName"
                                    >提交</el-button
                                ></el-col
                            >
                        </el-form-item>
                        <el-form-item label="系统图标">
                            <el-upload
                                class="avatar-uploader"
                                :show-file-list="false"
                                name="files"
                                :action="
                                    'http://' +
                                    uploadHost +
                                    '/api/jg_manage/image/upload?_=' +
                                    downloadBinaryFile()[0] +
                                    '&sign=' +
                                    downloadBinaryFile()[1]
                                "
                                :on-success="handleSystemLogo"
                                :before-upload="beforeUpload"
                                :auto-upload="true"
                                list-type="picture"
                            >
                                <img
                                    v-if="systemNameLogoIcon.systemLogo"
                                    :src="systemNameLogoIcon.systemLogo"
                                    class="avatar"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                                <div
                                    slot="tip"
                                    style="font-size: 10px; color: #606266;"
                                >
                                    <span style="color: #58a4f3;">*</span
                                    >图片大小为100*100像素
                                    <el-button
                                        type="primary"
                                        size="small"
                                        @click="updateSystemLogo"
                                        >提交</el-button
                                    >
                                </div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="favicon图标">
                            <el-upload
                                class="avatar-uploader"
                                action=""
                                :show-file-list="false"
                                name="favicon"
                                :on-change="systemFaviconFileChange"
                                :auto-upload="false"
                                :before-upload="beforeUpload"
                                :on-success="handleSystemFavicon"
                                list-type="picture"
                            >
                                <img
                                    v-if="systemNameLogoIcon.favicon"
                                    :src="systemNameLogoIcon.favicon"
                                    class="avatar"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                                <div
                                    slot="tip"
                                    style="font-size: 10px; color: #606266;"
                                >
                                    <span style="color: #58a4f3;">*</span
                                    >图片大小为100*100像素
                                    <el-button
                                        type="primary"
                                        size="small"
                                        @click="updateSystemFavicon"
                                        >提交</el-button
                                    >
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import { mapState, mapMutations } from "vuex";
import uploadFile from "@src/mixins/uploadFile.js";
import hasRight from "@src/mixins/has-right";
import insertTextIntoCursor from "@src/mixins/insertIntoCursor";

const level = 1;
export default {
    name: "parmaeterFrom",
    mixins: [uploadFile, hasRight, insertTextIntoCursor],
    data() {
        return {
            systemUserSecuritySettings: {
                // 用户安全
                defaultPassword: "123456",
                loginFailNum: 10,
                lockTime: 10,
                passwordOverdueTime: -1,
                changePassword: false,
                changePasswordLength: -1,
                passwordStrength: 0,
            },
            systemAddressBookSet: {
                // 通讯录
                allOrgInfo: 0,
                userName: 0,
                userMobile: 0,
                userPhone: 0,
                userDetail: 0,
                depPhone: 0,
            },
            systemNameLogoIcon: {
                systemName: "",
                systemLogo: "",
                favicon: "",
            },
            uploadHost: window.location.host,
            remindStartDate: 1,
            allowSetOrg: false, // 是否允许配置单位参数
            remindEndDate: 31,
            remindStartDateList: [],
            remindEndDateList: [],
            startDateDisabled: false,
            endDateDisabled: false,
            messageRemind: 0, // 消息提醒，0不提醒，1提醒
            noRemind: false, // 消息提醒，默认不提醒
            orgMessageRemindTemplate:
                "{单位名称}{月份}的单位信息需在{信息确认截止时间}日前确认，请及时前往确认。http://59.215.232.95/api/gate/forward",
            informationAuditTemplate:
                "{单位名称}{操作人名称}于{操作时间}修改了{修改字段}，请尽快前往后台处理。http://59.215.232.95/api/gate/forward",
            informationAuditThroughTemplate:
                "{单位名称}{操作人名称}于{操作时间}修改了{修改字段}已通过审核，请前往平台查看",
            SMSVerificationCodeTemplate: "验证码：{验证码}，有效期3分钟。",
            resetPasswordTemplate:
                "您于{重置时间}通过本人重置密码，新密码：{密码}，请妥善保管。",
            modeAuditList: [],
            orgFormSet: {
                nameSet: [],
                systemUserSet: [],
            },
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
            checkAll: false,
            isIndeterminate: true,
            checkboxGroup1: "",
        };
    },
    created() {
        this.getSystemParameterlevel(level);
        this.getSystemNameLogoIon();

        let startDate = 1;
        let endDate = 31;
        for (let i = startDate; i <= endDate; i++) {
            this.remindStartDateList.push({
                label: `每月从 ${i} 号开始`,
                value: i,
                disabled: false,
            });
            this.remindEndDateList.push({
                label: `到每月 ${i} 号结束`,
                value: i,
                disabled: false,
            });
        }
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        ...mapMutations(["SET_OPTION"]),
        saveorgMessageRemindTemplate() {
            this.setClientOptions({
                level: level,
                name: "orgMessageRemindTemplate",
                value: this.orgMessageRemindTemplate,
            });
        },
        saveinformationAuditTemplate() {
            this.setClientOptions({
                level: level,
                name: "informationAuditTemplate",
                value: this.informationAuditTemplate,
            });
        },
        saveinformationAuditThroughTemplate() {
            this.setClientOptions({
                level: level,
                name: "informationAuditThroughTemplate",
                value: this.informationAuditThroughTemplate,
            });
        },
        saveSMSVerificationCodeTemplate() {
            this.setClientOptions({
                level: level,
                name: "SMSVerificationCodeTemplate",
                value: this.SMSVerificationCodeTemplate,
            });
        },
        saveresetPasswordTemplate() {
            this.setClientOptions({
                level: level,
                name: "resetPasswordTemplate",
                value: this.resetPasswordTemplate,
            });
        },
        onStartDateChanged(startDate) {
            this.noRemind = false;

            let that = this;

            this.remindEndDateList.forEach((item, index) => {
                if (item.value < startDate) {
                    that.remindEndDateList[index].disabled = true;
                } else {
                    that.remindEndDateList[index].disabled = false;
                }
            });
        },
        onEndDateChanged(endDate) {
            this.noRemind = false;

            let that = this;

            this.remindStartDateList.forEach((item, index) => {
                if (item.value > endDate) {
                    that.remindStartDateList[index].disabled = true;
                } else {
                    that.remindStartDateList[index].disabled = false;
                }
            });
        },
        onNoRemind(isNoRemind) {
            if (isNoRemind) {
                this.startDateDisabled = true;
                this.endDateDisabled = true;
                this.messageRemind = 0;
            } else {
                this.startDateDisabled = false;
                this.endDateDisabled = false;
                this.messageRemind = 1;
            }
        },
        getSystemParameterlevel(level) {
            api[urlNames["getSystemParameterlevel"]]({
                level: level,
            }).then((res) => {
                res.data.forEach((item) => {
                    if (item.name === "systemAddressBookSet") {
                        this.systemAddressBookSet = JSON.parse(item.value);
                    }
                    if (item.name === "systemUserSecuritySettings") {
                        this.systemUserSecuritySettings = JSON.parse(
                            item.value
                        );
                    }
                    if (item.name === "orgMessageRemindTemplate") {
                        this.orgMessageRemindTemplate = item.value;
                    }
                    if (item.name === "informationAuditTemplate") {
                        this.informationAuditTemplate = item.value;
                    }
                    if (item.name === "informationAuditThroughTemplate") {
                        this.informationAuditThroughTemplate = item.value;
                    }
                    if (item.name === "SMSVerificationCodeTemplate") {
                        this.SMSVerificationCodeTemplate = item.value;
                    }
                    if (item.name === "resetPasswordTemplate") {
                        this.resetPasswordTemplate = item.value;
                    }
                    if (item.name === "systemMessageRemind") {
                        this.remindStartDate = parseInt(
                            JSON.parse(item.value)[0]
                        );
                        this.remindEndDate = parseInt(
                            JSON.parse(item.value)[1]
                        );
                        this.messageRemind = parseInt(
                            JSON.parse(item.value)[2]
                        );
                        this.allowSetOrg = item.lockedLevel !== 0;
                        this.$emit("setOrgParamsFun", this.allowSetOrg);
                        if (this.messageRemind === 0) {
                            this.startDateDisabled = true;
                            this.endDateDisabled = true;
                            this.noRemind = true;
                        } else {
                            this.startDateDisabled = false;
                            this.endDateDisabled = false;
                            this.noRemind = false;
                        }
                    }
                });
            });
        },
        handleSystemLogo(res, file) {
            this.systemNameLogoIcon.systemLogo = res.data[0];
        },
        handleSystemFavicon(res, file) {
            this.systemNameLogoIcon.favicon = res.data[0];
        },
        onToggleMessageConfirm() {
            this.systemMsgConfirmOpenVisible = false;
            this.systemMsgConfirmCloseVisible = false;

            // 处理“单位确认信息”开关的切换
        },
        onSavesystemMessageConfirm() {
            this.systemMsgConfirmOpenVisible = false;
            this.systemMsgConfirmCloseVisible = false;
        },
        beforeUpload(file) {
            // const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //   this.$message.error('上传头像图片只能是 JPG 格式!')
            // }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isLt2M;
        },
        // 获取系统名称，系统图标
        getSystemNameLogoIon() {
            this.systemNameLogoIcon.systemName = this.app.option.options.systemName;
            this.systemNameLogoIcon.systemLogo = this.app.option.options.systemLogo;
            this.systemNameLogoIcon.favicon = this.app.option.options.favicon;
        },
        systemLogoFileChange(file, fileList) {
            // debugger
            // this.systemNameLogoIcon.systemLogo = file.url
        },
        systemFaviconFileChange(file, fileList) {
            // this.systemNameLogoIcon.favicon = file.url
        },
        // 更新系统名称
        updateSystemName() {
            let list = {
                level: level,
                name: "systemName",
                value: this.systemNameLogoIcon.systemName,
            };
            this.setClientOptions(list);
        },
        // 更新系统图标
        updateSystemLogo() {
            let list = {
                level: level,
                name: "systemLogo",
                value: this.systemNameLogoIcon.systemLogo,
            };
            this.setClientOptions(list);
        },
        // 更新favicon图标
        updateSystemFavicon() {
            let list = {
                level: level,
                name: "favicon",
                value: this.systemNameLogoIcon.favicon,
            };
            this.setClientOptions(list);
        },
        getSystemParameter() {
            // getSystemParameter
            api[urlNames["getSystemParameter"]]({}).then((res) => {});
        },
        handleCheckAllChange(val) {
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.cities.length;
        },
        // 单位设置提交
        orgFormSetSubmit() {},
        userFormSetSubmit() {
            let list = {
                level: level,
                name: "userAuditFields",
                value: this.orgFormSet.systemUserSet,
            };
            api[urlNames["setClientOptions"]](list).then((res) => {
                if (res.status === 0) {
                    this.$message.success("设置用户信息成功");
                }
            });
        },
        systemSubmit(flag) {
            // 0 用户安全设置
            // 1通讯录设置
            // 2消息提醒设置
            let list = {
                level: level,
                name: "",
                value: null,
                lockedLevel: 0,
            };
            if (flag === 0) {
                list.name = "systemUserSecuritySettings";
                list.value = this.systemUserSecuritySettings;
            } else if (flag === 1) {
                list.name = "systemAddressBookSet";
                list.value = this.systemAddressBookSet;
            } else if (flag === 2) {
                list.lockedLevel = this.allowSetOrg ? 1 : 0;
                list.name = "systemMessageRemind";
                list.value = [
                    this.remindStartDate,
                    this.remindEndDate,
                    this.messageRemind,
                ];
            }
            this.setClientOptions(list);
        },
        getOption() {
            api[urlNames["option"]]().then((res) => {
                this.SET_OPTION(res.data);
            });
        },
        setClientOptions(list) {
            let that = this;

            let allSetClientOptions = function (list, index) {
                let i = index || 0;
                api[urlNames["setClientOptions"]](list[i]).then((res) => {
                    if (res.status === 0) {
                        if (i === list.length - 1) {
                            that.$message.success("设置成功");
                        } else {
                            allSetClientOptions(list, i + 1);
                        }
                    }
                });
            };

            if (Array.isArray(list)) {
                allSetClientOptions(list);
            } else {
                api[urlNames["setClientOptions"]](list).then((res) => {
                    if (res.status === 0) {
                        if (list.name === "systemMessageRemind") {
                            this.$emit("setOrgParamsFun", this.allowSetOrg);
                        }
                        this.$message.success("设置成功");
                    }
                });
            }
        },
    },
};
</script>

<style scoped lang="less">
@import "index";
</style>
