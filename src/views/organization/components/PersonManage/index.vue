<template>
    <div class="person-manage-content">
        <add-tags
            :openSearchFlag="openSearchFlag"
            :addInfo="addInfo"
            @close="getClose"
            @getTag="getTag"
            :delSelectLabelId="delSelectLabelId"
        ></add-tags>
        <!--人员管理-->
        <el-form
            :model="{ ...userDetail, ...postDetail }"
            :disabled="disabledFlag"
            ref="userDetail"
            label-width="100px"
            class="demo-personFrom"
            style="width: 100%;"
            :rules="rulesOption"
        >
            <el-row>
                <el-form-item label="头像">
                    <el-upload
                        :disabled="disabledFlag"
                        class="avatar-uploader"
                        :action="
                            'http://' +
                            uploadHost +
                            '/api/jg_manage/image/upload?_=' +
                            downloadBinaryFile()[0] +
                            '&sign=' +
                            downloadBinaryFile()[1]
                        "
                        :show-file-list="false"
                        name="files"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        list-type="picture"
                    >
                        <img
                            v-if="personFrom.portraitUrl"
                            :src="personFrom.portraitUrl"
                            class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div style="font-size: 10px; color: #606266;">
                        <span style="color: #58a4f3;">*</span
                        >（支持PNG、JPG、JPEG格式，建议使用100*100像素大小，2M以内）
                    </div>
                </el-form-item>
            </el-row>
            <el-row class="row-item">
                <el-col :span="12" styl="position: relative">
                    <el-form-item label="姓名" prop="name">
                        <el-popover
                            placement="bottom-start"
                            ref="popover"
                            width="500"
                        >
                            <!-- :disabled="isDefaultFlag" -->
                            <el-input
                                v-popover:popover
                                slot="reference"
                                placeholder="请输入姓名"
                                v-model="userDetail.name"
                                @blur="blur"
                                @input="loadSearch"
                                @change="idAutherntication"
                                @keyup.enter.native="loadSearch"
                            ></el-input>
                            <div class="result-list" v-if="searchFlag">
                                <div
                                    class="default-warn"
                                    style="color: #ff6633;"
                                >
                                    <i class="el-icon-warning"></i>
                                    若您是为同一个人开通兼职帐号，直接选择以下人员进行帐号开通
                                </div>
                                <el-table
                                    max-height="200"
                                    :data="list"
                                    @row-click="selectRow"
                                    :show-header="true"
                                >
                                    <el-table-column
                                        property="name"
                                        label="姓名"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <span
                                                :title="scope.row.name"
                                                class="table-span"
                                                >{{ scope.row.user.name }}</span
                                            >
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        property="orgName"
                                        label="原单位名称"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <span
                                                :title="
                                                    scope.row.userIdentity
                                                        .dutyName
                                                "
                                                class="table-span"
                                                >{{
                                                    scope.row.userIdentity
                                                        .dutyName
                                                }}</span
                                            >
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        property="orgName"
                                        label="当前状态"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <span
                                                title="申请调入"
                                                class="table-span"
                                                v-if="scope.row.status === 1"
                                                >申请调入</span
                                            >
                                            <span
                                                title="申请兼职"
                                                class="table-span"
                                                v-if="scope.row.status === 2"
                                                >申请兼职</span
                                            >
                                            <span
                                                title="申请挂职"
                                                class="table-span"
                                                v-if="scope.row.status === 3"
                                                >申请挂职</span
                                            >
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        property="duty"
                                        label="是否申请我单位"
                                        align="center"
                                    >
                                        <template slot-scope="scope">
                                            <span
                                                class="table-span"
                                                v-if="
                                                    scope.row.isApplyMyOrg === 1
                                                "
                                                >是</span
                                            >
                                            <span
                                                class="table-span"
                                                v-if="
                                                    scope.row.isApplyMyOrg === 0
                                                "
                                                >否</span
                                            >
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-popover>
                        <div
                            class="el-form-item__error"
                            v-show="this.iptMsgVisible['name']"
                        >
                            {{ iptMsgInfoStr }}
                        </div>
                    </el-form-item>

                    <el-form-item
                        label="职务"
                        prop="dutyName"
                    >
                        <el-input
                            placeholder="请选择职务"
                            ref="dutyNameInput"
                            v-model="postDetail.dutyName"
                            @focus="showdutyNameList"
                            :disabled="$route.name === 'PassChange'?true:false"
                        ></el-input>
                        <span
                            style="
                                font-size: 12px;
                                position: relative;
                                top: -7px;
                                color: #8c939d;
                            "
                            >请先选择再输入,职务以逗号隔开</span
                        >
                        <el-popover
                            class="popover-fix"
                            placement="bottom"
                            width="160"
                            v-model="dutyNameSelectVisible"
                        >
                            <div>
                                <el-button size="mini" @click="hidedutyNameList"
                                    >关闭</el-button
                                >
                                <el-checkbox-group
                                    @change="selectDutyName"
                                    size="medium"
                                    v-model="dutyNameCheckd"
                                >
                                    <el-checkbox
                                        style="display: block;"
                                        v-for="item in dutyNameTypeOptions"
                                        :value="item.text"
                                        :label="item.text"
                                        :key="item.text"
                                    ></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-popover>
                        <div
                            class="el-form-item__error"
                            v-show="this.iptMsgVisible['dutyName']"
                        >
                            {{ iptMsgInfoStr }}
                        </div>
                    </el-form-item>
                    <!-- <el-form-item
                        label="所属单位"
                        v-if="showexportIdentityType"
                        prop="orgName"
                    >
                        <el-input
                            placeholder="所属单位"
                            v-model="postDetail.orgName"
                            @input="showIptMsg('orgName')"
                        >
                            <el-button
                                type="primary"
                                slot="append"
                                class="form-btn1"
                                @click="exportOrg"
                                :disabled="!hasRight('personUserIdTransfe')"
                                >调出</el-button
                            >
                        </el-input>
                        <div
                            class="el-form-item__error"
                            v-show="this.iptMsgVisible['orgName']"
                        >
                            {{ iptMsgInfoStr }}
                        </div>
                    </el-form-item> -->
                    <!-- <el-form-item label="身份证号" prop="idcard">
            <el-input placeholder="请输入内容" :disabled="isDefaultFlag" v-model="userDetail.idcard" @input="showIptMsg('idcard')">
              <el-button slot="append" v-if="!disabledFlag" type="success" class="form-btn1" @click="idAutherntication">点击实名认证</el-button>
            </el-input>
            <div class="el-form-item__error" v-show="this.iptMsgVisible['idcard']">
              {{iptMsgInfoStr}}
            </div>
            <span style="font-size: 12px;position: relative;top:-7px;color: #8c939d;">如果不录入不影响新帐号创建</span>
          </el-form-item>-->
                    <el-form-item
                        label="人员ID"
                        prop="uid"
                        :disabled="true"
                        v-if="this.$route.name === 'QueryPersonDetail'"
                    >
                        <el-input
                            :placeholder="userDetail.uid"
                            :disabled="isDefaultFlag"
                            v-model="userDetail.uid"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" prop="mobile">
                        <!-- :disabled="isDefaultFlag" -->
                        <el-input
                            placeholder="请输入手机号"
                            v-model="userDetail.mobile"
                            @input="showIptMsg('mobile')"
                        ></el-input>
                        <div
                            class="el-form-item__error"
                            v-show="this.iptMsgVisible['mobile']"
                        >
                            {{ iptMsgInfoStr }}
                        </div>
                        <div class="el-form-item__error" v-show="isSameMobile">
                            该手机号已和其他用户绑定
                        </div>
                    </el-form-item>

                    <el-form-item
                        label="身份类型"
                        prop="type"
                        required
                        v-if="
                            this.$route.name == 'PersonAdd' ||
                            this.$route.name == 'PersonEdit'
                        "
                    >
                        <el-select
                            placeholder="请选择身份类型"
                            v-model="postDetail.type"
                            @change="getIdentityType"
                        >
                            <el-option
                                v-for="item in userTypeOptions"
                                :key="item.id"
                                :label="item.text"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <div
                            class="el-form-item__error"
                            v-show="this.iptMsgVisible['type']"
                        >
                            {{ iptMsgInfoStr }}
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="身份证号" prop="idcard">
                        <el-input
                            placeholder="请输入内容"
                            :disabled="isDefaultFlag"
                            v-model="userDetail.idcard"
                            @input="showIptMsg('idcard')"
                            @blur="idAutherntication"
                        >
                            <!-- <el-button
                                slot="append"
                                v-if="!disabledFlag"
                                type="success"
                                class="form-btn1"
                                @click="idAutherntication"
              >点击实名认证</el-button> -->
                        </el-input>
                        <div
                            class="el-form-item__error"
                            v-show="this.iptMsgVisible['idcard']"
                        >
                            {{ iptMsgInfoStr }}
                        </div>
                        <p
                            style="color: #8c939d;"
                            class="el-form-item__error"
                            v-if="isShowMsg"
                        >
                            如果不录入不影响新帐号创建
                        </p>
                        <p
                            v-if="idCardState.errorVisiable"
                            class="el-form-item__error"
                        >
                            <i class="el-icon-error"></i>
                            身份证号码不正确。
                        </p>
                        <p
                            style="color: green;"
                            v-if="idCardState.successVisiable"
                            class="el-form-item__error"
                        >
                            <i class="el-icon-success"></i>
                            身份证号码验证通过。
                        </p>
                        <p
                            style="color: #8c939d;"
                            v-if="idCardState.requiring"
                            class="el-form-item__error"
                        >
                            <i class="el-icon-loading iconload"></i>
                            身份证号码正在验证...
                        </p>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-collapse>
                <el-collapse-item name="1" title="完善其他信息">
                    <el-row class="row-item">
                        <el-col :span="12">
                            <el-form-item label="备用手机号" prop="mobile2">
                                <el-input
                                    placeholder="请输入备用手机号"
                                    :disabled="isDefaultFlag"
                                    v-model="userDetail.mobile2"
                                    @input="showIptMsg('mobile2')"
                                ></el-input>
                                <div
                                    class="el-form-item__error"
                                    v-show="this.iptMsgVisible['mobile2']"
                                >
                                    {{ iptMsgInfoStr }}
                                </div>
                            </el-form-item>
                            <el-form-item label="民族" prop="nation">
                                <el-select
                                    placeholder="请选择民族"
                                    :disabled="isDefaultFlag"
                                    @change="getNation"
                                    v-model="userDetail.nation"
                                >
                                    <el-option
                                        v-for="item in userNationOptions"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                                <div
                                    class="el-form-item__error"
                                    v-show="this.iptMsgVisible['nation']"
                                >
                                    {{ iptMsgInfoStr }}
                                </div>
                            </el-form-item>
                            <el-form-item label="性别" prop="sex">
                                <el-select
                                    placeholder="请选择性别"
                                    :disabled="isDefaultFlag"
                                    @change="getSex"
                                    v-model="userDetail.sex"
                                >
                                    <el-option
                                        v-for="item in userSexOptions"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                                <div
                                    class="el-form-item__error"
                                    v-show="this.iptMsgVisible['sex']"
                                >
                                    {{ iptMsgInfoStr }}
                                </div>
                            </el-form-item>
                            <el-form-item
                                label="所属党派"
                                prop="politicalParty"
                            >
                                <el-select
                                    placeholder="请选择所属党派"
                                    :disabled="isDefaultFlag"
                                    @change="getPolicalParty"
                                    v-model="userDetail.politicalParty"
                                >
                                    <el-option
                                        v-for="item in partisanOptions"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="人员类型" prop="userAccount">
                                <el-select
                                    placeholder="请选择人员类型"
                                    @change="getUserType"
                                    v-model="userDetail.userType"
                                >
                                    <el-option
                                        v-for="item in personTypeOptions"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label=" 办公电话" prop="officePhone">
                                <el-input
                                    placeholder="请输入办公电话"
                                    :disabled="isDefaultFlag"
                                    v-model="userDetail.officePhone"
                                    @input="showIptMsg('officePhone')"
                                ></el-input>
                                <div
                                    class="el-form-item__error"
                                    v-show="this.iptMsgVisible['officePhone']"
                                >
                                    {{ iptMsgInfoStr }}
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学历" prop="qualification">
                                <el-select
                                    placeholder="请选择学历"
                                    :disabled="isDefaultFlag"
                                    @change="getQualification"
                                    v-model="userDetail.qualification"
                                >
                                    <el-option
                                        v-for="item in userEducationOptions"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="职级" prop="positionClass">
                                <el-select
                                    placeholder="请选择职级"
                                    @change="getPositionClass"
                                    :disabled="isDefaultFlag"
                                    v-model="userDetail.positionClass"
                                >
                                    <el-option
                                        v-for="item in userPankOptions"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label=" 人员状态" prop="userState">
                                <el-select
                                    placeholder="请选择人员状态"
                                    :disabled="isDefaultFlag"
                                    @change="getUserState"
                                    v-model="userDetail.userState"
                                >
                                    <el-option
                                        v-for="item in userActionOptions"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label=" 岗位">
                                <el-input
                                    placeholder="请输入岗位"
                                    v-model="postDetail.postName"
                                    @input="showIptMsg('postName')"
                                ></el-input>
                                <div
                                    class="el-form-item__error"
                                    v-show="this.iptMsgVisible['postName']"
                                >
                                    {{ iptMsgInfoStr }}
                                </div>
                            </el-form-item>
                            <el-form-item label="通讯地址">
                                <el-input
                                    placeholder="请输入通讯地址"
                                    v-model="userDetail.address"
                                    @input="showIptMsg('address')"
                                ></el-input>
                                <div
                                    class="el-form-item__error"
                                    v-show="this.iptMsgVisible['address']"
                                >
                                    {{ iptMsgInfoStr }}
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="人员标签">
                            <el-tag
                                v-model="sendLabelId"
                                v-for="(tag, index) in tagsName"
                                :key="tag"
                                type="info"
                                closable
                                :title="tag"
                                @close="removeTag(tag, index)"
                                >{{ tag }}</el-tag
                            >
                            <el-tag
                                class="add-tag-btn"
                                v-if="!disabledFlag"
                                @click="openSearchFlag = true"
                            >
                                <i class="el-icon-plus"></i>添加标签
                            </el-tag>
                            <div
                                v-if="
                                    this.$route.name === 'PersonEdit' ||
                                    this.$route.name === 'PersonAdd'
                                "
                            >
                                <div
                                    class="tip-msg"
                                    v-show="
                                        this.app.option.options.userAuditFields.indexOf(
                                            'labelId'
                                        ) > -1
                                    "
                                >
                                    {{ iptMsgInfoStr }}
                                </div>
                            </div>
                        </el-form-item>
                    </el-row>
                    <el-row class="row-item">
                        <el-col :span="12">
                            <el-form-item label="人员介绍" prop="instruction">
                                <el-input
                                    type="textarea"
                                    v-model="userDetail.ext01"
                                    :disabled="isDefaultFlag"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="人员职责" prop="reason">
                                <el-input
                                    type="textarea"
                                    v-model="userDetail.ext02"
                                    :disabled="isDefaultFlag"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="row-item">
                        <el-col :span="12">
                            <el-form-item label="自定义字段1">
                                <el-input
                                    type="textarea"
                                    v-model="userDetail.ext03"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="自定义字段2">
                                <el-input
                                    type="textarea"
                                    v-model="userDetail.ext04"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>
        </el-form>

        <el-footer class="add-person-footer">
            <span
                v-if="
                    this.$route.name === 'PersonAdd' ||
                    (this.$route.name === 'PersonEdit' && !hidefooter)
                "
            >
                <el-button
                    type="primary"
                    @click="next('userDetail')"
                    :disabled="false"
                    >下一步</el-button
                >
                <el-button @click="goBack">取消</el-button>
            </span>
            <span
                v-if="this.$route.name === 'PassChange' && hidefooter == false"
            >
                <el-button type="primary" @click="modifieUserInfo('userDetail')"
                    >立即更改</el-button
                >
            </span>
        </el-footer>
    </div>
</template>

<script>
import { api, urlNames } from "@src/api";
import addTags from "../AddTags/index";
import dicOption from "@src/mixins/dic-options.js";
import uploadFile from "@src/mixins/uploadFile.js";
import { mapState, mapMutations } from "vuex";
import HasRight from "@src/mixins/has-right";
export default {
    props: [
        "userInfo",
        "disabledFlag",
        "isShowEditFlag",
        "userDetail",
        "showexportIdentityType",
        "postDetail",
        "isDefaultFlag",
        "userAuditFields",
        "oldUserInfo",
        "labelId",
        "labelList",
        "oldPostDetail",
        "oldUserDetail",
    ],
    mixins: [dicOption, uploadFile, HasRight],
    components: {
        addTags,
    },
    data() {
        // 验证手机号
        let validateMobile = (rule, value, callback) => {
            if (value !== "") {
                let reg = /(^\s{0}$)|(0\d{2,3}-\d{7,8}|\(?0\d{2,3}[)-]?\d{7,8}|\(?0\d{2,3}[)-]*\d{7,8})|(^((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147)|(199))\d{8}$)/;
                if (reg.test(value)) {
                    this.findMobileIsSame(callback);
                } else {
                    callback(new Error("请输入11位有效号码"));
                }
            } else {
                callback();
            }
        };

        // 验证办公电话
        let validateOffice = (rule, value, callback) => {
            if (value !== "") {
                let reg = /(^\s{0}$)|(0\d{2,3}-\d{7,8}|\(?0\d{2,3}[)-]?\d{7,8}|\(?0\d{2,3}[)-]*\d{7,8})/;
                reg.test(value)
                    ? callback()
                    : callback(new Error("请输入有效的办公电话"));
            } else {
                callback();
            }
        };

        // 验证身份证号
        let validateId = (rule, value, callback) => {
            if (value !== "") {
                let reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
                if (reg.test(value)) {
                    this.isValidate = true;
                    this.isShowMsg = true;
                    this.idCardState.successVisiable = false;
                    this.idCardState.errorVisiable = false;
                    this.idCardState.requiring = false;
                    callback();
                } else {
                    this.isValidate = false;
                    this.isShowMsg = false;
                    this.idCardState.successVisiable = false;
                    this.idCardState.errorVisiable = false;
                    this.idCardState.requiring = false;
                    callback(new Error("请输入有效身份证号"));
                }
                // reg.test(value) ? callback() : callback(new Error('请输入有效身份证号'))
            } else {
                this.isValidate = false;
                this.isShowMsg = true;
                this.idCardState.successVisiable = false;
                this.idCardState.errorVisiable = false;
                this.idCardState.requiring = false;
                callback();
            }
        };

        return {
            iptMsgInfoStr: "添加或修改该字段需要提交审核",
            iptMsgVisible: {},
            rulesOption: {
                name: [
                    {
                        required: true,
                        message: "姓名不能为空",
                        trigger: "blur",
                    },
                    { message: "", trigger: "change" },
                ],
                mobile: [
                    {
                        required: true,
                        message: "手机号不能为空",
                        trigger: "blur",
                    },
                    { message: "", trigger: "change" },
                    { validator: validateMobile, trigger: "blur" },
                ],
                dutyName: [
                    {
                        required: true,
                        message: "职务不能为空",
                        trigger: "blur",
                    },
                    { message: "", trigger: "change" },
                ],
                mobile2: [{ validator: validateMobile, trigger: "blur" }],
                officePhone: [{ validator: validateOffice, trigger: "blur" }],
                type: [
                    {
                        required: true,
                        message: "请选择身份类型",
                        trigger: "blur",
                    },
                    { type: "number", message: "", trigger: "change" },
                ],
                idcard: [{ validator: validateId, trigger: "blur" }],
            },
            idCardState: {
                errorVisiable: false,
                successVisiable: false,
                requiring: false,
            },
            isSameMobile: false,
            isSubmit: false,
            isValidate: false,
            isShowMsg: true,
            isChange: false,
            isAudit: false,
            showPopover: false, // 是否显示 Popover
            hidefooter: false,
            msgVisiable: false,
            dutyNameCheckd: [],
            dutyNameSelectVisible: false,
            uploadUrl: "",
            uploadHost: window.location.host,
            openSearchFlag: false,
            option: [],
            restaurants: [],
            state: "",
            timeout: null,
            personFrom: this.userDetail,
            postFrom: this.postDetail,
            imageUrl: "",
            tagsName: [],
            delSelectLabelId: null, // 添加后未提交到后台移除的标签
            tempLabelId: [],
            sendLabelId: this.labelId,
            list: [],
            searchFlag: false,
            loadFlag: true,
            openMoreFlag: false,
            addInfo: {
                searchFlag: false,
                type: 3, // 1.单位，2、内设机构，3、人员
            },
            timer: null,
            showPopoverFlag: false,
            initCount: 0,
        };
    },
    created() {
        this.initIptMsgVisible();
    },
    mounted() {
        // this.oldUserDetail = JSON.parse(JSON.stringify(this.userDetail))
        // this.oldPostDetail ={...this.postDetail}
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        ...mapMutations(["SET_OPTION"]),

        exportOrg() {
            this.$emit("exportOrg", 3);
        },
        findMobileIsSame(successCallback = null) {
            let data = {
                mobile: this.userDetail.mobile,
                uid: this.userDetail.uid,
            };
            if (this.$route.name === "PersonEdit") {
                data.uid = this.$route.params.id;
            }
            api[urlNames["selectMobileIsSame"]](data).then(
                (res) => {
                    if (res.data) {
                        this.isSameMobile = false;
                        this.isSubmit = true;
                        if (successCallback) {
                            successCallback();
                        }
                    } else {
                        this.$message.error(
                            "该手机号已和其他用户绑定，请尝试输入新的手机号码。"
                        );
                        this.isSameMobile = true;
                        this.isSubmit = false;
                    }
                },
                () => {
                    this.isSameMobile = false;
                    this.isSubmit = false;
                }
            );
        },
        // 身份证认证
        idAutherntication() {
            // 522501199512028321
            let that = this;
            this.idCardState.successVisiable = false;
            this.idCardState.errorVisiable = false;
            this.idCardState.requiring = false;
            //
            if (this.userDetail.name !== "") {
                if (this.userDetail.idcard !== "" && this.isValidate) {
                    if (this.isValidate) {
                        this.isShowMsg = false;
                        this.idCardState.requiring = true;
                        api[urlNames["idCardValidation"]]({
                            idCard: this.userDetail.idcard,
                            name: this.userDetail.name,
                        }).then(
                            (res) => {
                                if (res.data) {
                                    that.idCardState.successVisiable = true;
                                    that.idCardState.errorVisiable = false;
                                    that.idCardState.requiring = false;
                                    that.isShowMsg = false;
                                } else {
                                    that.idCardState.errorVisiable = true;
                                    that.isShowMsg = false;
                                    that.idCardState.requiring = false;
                                    that.idCardState.successVisiable = false;
                                }
                            },
                            () => {}
                        );
                    } else {
                        this.$message.error("请输入有效身份证号码");
                    }
                }
            } else {
                this.$message.error("请先输入人员姓名");
            }
        },
        getUserAccount(userId) {
            api[urlNames["findUserAccountByUid"]]({
                userId: userId,
            }).then(
                (res) => {
                    this.userInfo.userAccount = res.data;
                    this.accountList = res.data;
                },
                () => {}
            );
        },
        // 设置各个字段的验证提示信息的可见性
        initIptMsgVisible() {
            for (let field in this.userDetail) {
                this.iptMsgVisible[field] = false;
            }
        },
        showIptMsg(fieldName) {
            if (
                this.app.option.options.userAuditFields.indexOf(fieldName) >
                    -1 &&
                this.$route.name === "PersonEdit"
            ) {
                this.iptMsgVisible[fieldName] = true;
                this.isAudit = true;
            }
        },
        modifieUserInfo(userDetail) {
            this.$refs[userDetail].validate((valid) => {
                if (valid) {
                    this.$emit(
                        "goModifieUserInfo",
                        this.personFrom,
                        this.isAudit
                    );
                } else {
                    this.$message.warning(`请填写必填字段`);
                    return false;
                }
            });
        },
        // 搜索表格点击当前行
        selectRow(val) {
            let uid = val.user.uid;
            this.searchFlag = false;

            this.$emit("get-uid", uid, val.status);
            this.$emit("get-defauf", true);
        },
        // 搜索数据
        loadSearch() {
            this.showIptMsg("name");
            this.searchFlag = false;
            //
            if (
                this.$route.name === "PersonAdd" &&
                this.personFrom.name.length > 1
            ) {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.timer = setTimeout(() => {
                    this.showPopoverFlag = true;
                    this.searchFlag = true;
                    this.loadFlag = true;
                    api[urlNames["findUserByParams"]]({
                        name: this.personFrom.name,
                    }).then(
                        (res) => {
                            // if (res.data.length !== 0) {
                            // }
                            this.loadFlag = false;
                            this.list = res.data;
                        },
                        () => {
                            this.list = [];
                        }
                    );
                }, 800);
            } else {
                this.searchFlag = false;
                this.showPopoverFlag = false;
                this.timer = null;
            }
        },
        blur() {
            this.timer = null;
        },
        // 选择身份类型
        getIdentityType(val) {
            this.postFrom.type = val;
            this.showIptMsg("type");
        },
        // 选择民族
        getNation(val) {
            this.personFrom.nation = val;
            this.showIptMsg("nation");
        },
        // 选择学历
        getQualification(val) {
            this.personFrom.qualification = val;
        },
        // 选择性别
        getSex(val) {
            this.personFrom.sex = val;
            this.showIptMsg("sex");
        },
        // 选择职级
        getPositionClass(val) {
            this.personFrom.positionClass = val;
        },
        // 选择党派
        getPolicalParty(val) {
            this.personFrom.politicalParty = val;
        },
        // 选择人员状态
        getUserState(val) {
            this.personFrom.userState = val;
        },
        // 选择人员类型
        getUserType(val) {
            this.personFrom.userType = val;
        },
        handleAvatarSuccess(res, file) {
            this.personFrom.portraitUrl =
                res.data[0] || URL.createObjectURL(file.raw);
        },

        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let data = new FormData();
                    let keys = Object.keys(this.editForm);
                    let len = keys.length;
                    for (let i = 0; i < len; i++) {
                        let key = keys[i];
                        let value = this.editForm[key];
                        if (value) {
                            data.append(key, value);
                        }
                    }
                    api[urlNames["sendEditRightsInfo"]](data).then(
                        (res) => {
                            this.$message({
                                message: this.current ? "修改成功" : "添加成功",
                                type: "success",
                            });
                            this.$emit("refreshList");
                            this.closeDialog();
                        },
                        () => {}
                    );
                }
            });
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isPNG = file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG && !isPNG) {
                this.$message.error("上传头像图片只支持PNG、JPG、JPEG格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return (isJPG || isPNG) && isLt2M;
        },
        getClose(val) {
            this.openSearchFlag = val;
        },
        getTag(val) {
            const res = new Map();
            let tag = [];
            val.forEach((item) => {
                this.tagsName.push(item.split("|")[1]);
                tag.push(item.split("|")[0]);
            });
            this.tagsName = this.tagsName.filter(
                (a) => !res.has(a) && res.set(a, 1)
            );
            this.sendLabelId = tag.filter((a) => !res.has(a) && res.set(a, 1));
            // this.ruleForm.labelId = tagIdList
            /* val.forEach((item) => {
        this.tagsName.push(item.split('|')[1])
        this.sendLabelId.push(item.split('|')[0])
      }) */
            this.$emit("get-label", this.sendLabelId);
        },
        removeTag(tag, index) {
            this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    api[urlNames["deleteUserLabelOrDeptLabelOrOrgLabel"]]({
                        id: this.oldUserInfo.userId,
                        type: 3,
                        labelId: this.sendLabelId[index],
                    }).then((res) => {
                        if (res.status === 0) {
                            this.$message.success("删除成功");
                            this.tagsName.splice(index, 1);
                            this.sendLabelId.splice(index, 1);
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
            this.$emit("get-label", this.sendLabelId);
        },

        next(userDetail) {
            // this.findMobileIsSame(() => {
            if (this.idCardState.errorVisiable) {
                this.$message.error("身份证号码与人员姓名不匹配，请重新输入");
            } else if (
                this.idCardState.successVisiable ||
                this.userDetail.idcard === ""
            ) {
                this.$refs[userDetail].validate((valid) => {
                    if (valid) {
                        if (this.isSubmit && !this.isSameMobile) {
                            this.isChange = false;
                            this.$emit("get-post", this.postFrom, this.isAudit);
                            this.$emit(
                                "get-user",
                                this.personFrom,
                                this.isAudit
                            );
                        } else if (this.isSameMobile) {
                            this.$message.warning(
                                `该手机号已和其他用户绑定，请尝试输入新的手机号码。`
                            );
                        }
                    } else {
                        this.$message.warning(`请根据提示填写有效身份信息`);
                        this.isChange = false;
                        return false;
                    }
                });
            } else if (this.userDetail.idcard !== "") {
                this.$message.warning(`请先进行身份证号实名认证!`);
            }
            // });
        },
        addWatch() {
            return (
                JSON.stringify(this.userDetail) !==
                    JSON.stringify(this.oldUserDetail) ||
                JSON.stringify(this.postDetail) !==
                    JSON.stringify(this.oldPostDetail)
            );
        },
        goBack() {
            this.isChange = this.addWatch();
            //
            if (this.isChange) {
                this.$confirm("修改内容尚未保存, 确定要取消吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.$router.go(-1);
                    })
                    .catch(() => {
                        this.isChange = false;
                    });
            } else {
                this.$router.go(-1);
                this.isChange = false;
            }
        },
        handleSelect(item) {},
        showdutyNameList() {
            this.dutyNameSelectVisible = true;
        },
        hidedutyNameList() {
            this.dutyNameSelectVisible = false;
        },
        selectDutyName() {
            this.postDetail.dutyName = JSON.parse(
                JSON.stringify(this.dutyNameCheckd)
            ).toString();
        },
    },
    watch: {
        labelList(val) {
            val.forEach((item) => {
                this.tagsName = [];
                this.sendLabelId = [];
                this.tagsName.push(item.name);
                this.sendLabelId.push(item.id);
            });
            this.tempLabelId = JSON.parse(JSON.stringify(this.sendLabelId));
        },
    },
};
</script>

<style lang="less" scoped>
@import "index";
</style>
