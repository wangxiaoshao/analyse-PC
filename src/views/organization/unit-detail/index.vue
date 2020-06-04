<template>
    <div class="form-content" v-loading="loading">
        <search-lable
            :openSearchFlag="openSearchFlag"
            :addInfo="addInfo"
            :delSelectLabelId="delSelectLabelId"
            :default-list="defaultList"
            @close="getClose"
            @getTag="getTag"
        ></search-lable>
        <!-- <el-drawer
      title="选择区域"
      :visible.sync="areaFlag"
      :direction="'rtl'">
      <area-list
        @get-area="getAreaId"
        @close="close"
        v-model="ruleForm.areaId"></area-list>
    </el-drawer>-->
        <el-dialog title="选择区域" :visible.sync="areaFlag">
            <area-list
                @get-area="getAreaId"
                @close="close"
                v-model="ruleForm.areaId"
            ></area-list>
        </el-dialog>
        <el-form
            :model="ruleForm"
            :disabled="disabledFlag"
            :rules="rules"
            ref="ruleForm"
            label-width="130px"
        >
            <div class="detail-title">
                <i
                    class="imenu-icon iconfont icondanwei big-icon"
                    style="margin: 0px 5px;"
                ></i
                >单位信息
            </div>
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">基础信息</el-menu-item>
            </el-menu>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="单位名称" prop="organization.name">
                        <el-input
                            v-model="ruleForm.organization.name"
                            @change="handleCredit"
                            @input="showIptMsg('name')"
                        ></el-input>
                        <div v-if="this.$route.name === 'UnitEdit'">
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['name']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="其他名称"
                        prop="organization.otherName"
                    >
                        <el-input
                            v-model="ruleForm.organization.otherName"
                            @input="showIptMsg('otherName')"
                        ></el-input>
                        <div v-if="this.$route.name === 'UnitEdit'">
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['otherName']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="单位地址" prop="organization.address">
                        <el-input
                            v-model="ruleForm.organization.address"
                            @input="showIptMsg('address')"
                        ></el-input>
                        <div v-if="this.$route.name === 'UnitEdit'">
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['address']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="传真号码" prop="organization.fax">
                        <el-input
                            v-model="ruleForm.organization.fax"
                            @input="showIptMsg('fax')"
                        ></el-input>
                        <div v-if="this.$route.name === 'UnitEdit'">
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['fax']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="统一社会信用代码"
                        prop="organization.creditId"
                    >
                        <el-input
                            v-model="ruleForm.organization.creditId"
                            @blur="handleCredit"
                            :disabled="creditIddisable"
                        >
                            <i
                                class="el-icon-loading iconload"
                                v-if="loadVisiable"
                                slot="suffix"
                            ></i>
                        </el-input>
                        <div class="tip-msg">
                            <p style="color: red;" v-if="errorVisiable">
                                <i class="el-icon-error"></i>
                                统一社会信用代码与单位名称不匹配。
                            </p>
                            <p style="color: green;" v-if="successVisiable">
                                <i class="el-icon-success"></i>
                                统一社会信用代码验证成功。
                            </p>
                            <p style="color: #999;" v-if="requiring">
                                统一社会信用代码正在验证...
                            </p>
                        </div>
                    </el-form-item>
                    <el-form-item label=" 上级单位">
                        <el-input
                            v-model="parentName"
                            :disabled="true"
                        ></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="启用状态" prop="organization.removed" v-if="this.$route.name === 'UnitEdit'&&this.isOrgManage"> -->
                    <el-form-item
                        label="启用状态"
                        prop="organization.removed"
                        v-if="false"
                    >
                        <el-switch
                            v-model="ruleForm.organization.removed"
                            @change="showIptMsg('removed')"
                        ></el-switch>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['removed']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label="单位简称"
                        prop="organization.shortName"
                    >
                        <el-input
                            v-model="ruleForm.organization.shortName"
                            @input="showIptMsg('shortName')"
                        ></el-input>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['shortName']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="单位电话" prop="organization.phone">
                        <el-input
                            v-model="ruleForm.organization.phone"
                            @input="showIptMsg('phone')"
                        ></el-input>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['phone']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="邮政编码" prop="organization.zipCode">
                        <el-input
                            v-model="ruleForm.organization.zipCode"
                            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
                            maxlength="6"
                            @input="showIptMsg('zipCode')"
                        ></el-input>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['zipCode']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="所属区域" prop="areaId">
                        <!--选择区域组件-->
                        <el-input
                            v-model="ruleForm.areaId"
                            style="display: none;"
                        ></el-input>
                        <el-input
                            v-model="areaCheck"
                            @focus="openarea"
                        ></el-input>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <!-- <div
                class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('areaId') > -1"
              >添加或修改该字段需要提交审核</div>-->
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="所属系统"
                        prop="organization.systemType"
                    >
                        <el-select
                            v-model="ruleForm.organization.systemType"
                            @change="getSystemType"
                            placeholder="请选择所属系统"
                        >
                            <el-option
                                v-for="item in applicationOption"
                                :key="item.id"
                                :value="item.value"
                                :label="item.text"
                            ></el-option>
                        </el-select>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['systemType']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="所属体系" prop="organization.type">
                        <el-select
                            v-model="ruleForm.organization.type"
                            @change="getType"
                            placeholder="请选择所属类型"
                        >
                            <el-option
                                v-for="item in classOption"
                                :key="item.id"
                                :label="item.text"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['type']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="单位标签">
                    <el-tag
                        v-for="(tag, index) in tagsName"
                        :key="tag"
                        type="info"
                        closable
                        :title="tag"
                        v-model="ruleForm.labelId"
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
                            this.$route.name === 'UnitEdit' ||
                            this.$route.name === 'UnitAdd'
                        "
                    >
                        <!-- <div
              class="tip-msg"
              v-show="this.app.option.options.orgAuditFields.indexOf('labelId') > -1"
            >添加或修改该字段需要提交审核</div>-->
                    </div>
                </el-form-item>
            </el-row>
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">扩展属性</el-menu-item>
            </el-menu>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="单位简介" prop="ext01">
                        <el-input
                            type="textarea"
                            v-model="ruleForm.organization.ext01"
                            @input="showIptMsg('ext01')"
                        ></el-input>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <div
                                class="el-form-item__error"
                                v-show="this.iptMsgVisible['ext01']"
                            >
                                {{ iptMsgInfoStr }}
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="申请备注" prop="reason">
                        <el-input
                            type="textarea"
                            v-model="ruleForm.reason"
                        ></el-input>
                        <div
                            v-if="
                                this.$route.name === 'UnitEdit' ||
                                this.$route.name === 'UnitAdd'
                            "
                        >
                            <!-- <div
                class="tip-msg"
                v-show="this.app.option.options.orgAuditFields.indexOf('reason') > -1 "
              >添加或修改该字段需要提交审核</div>-->
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label="单位职责" prop="ext02">
            <el-input type="textarea" v-model="ruleForm.organization.ext02" @input="showIptMsg('ext02')"></el-input>
            <div v-if="this.$route.name === 'UnitEdit' ||  this.$route.name === 'UnitAdd'">
              <div class="el-form-item__error" v-show="this.iptMsgVisible['ext02']">
              {{iptMsgInfoStr}}
              </div>
            </div>
          </el-form-item>-->
                </el-col>
            </el-row>
            <el-form-item v-show="isShowEditFlag">
                <el-button type="primary" @click="submitForm('ruleForm')">{{
                    submitHtml
                }}</el-button>
                <el-button @click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { api, urlNames } from "@src/api";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import goBack from "@src/mixins/go-back.js";
import dicOption from "@src/mixins/dic-options.js";
import searchLable from "../components/AddTags/index";
import areaList from "../components/AreaList/index";
import { mapState, mapMutations } from "vuex";

export default {
    name: "index",
    mixins: [handleBreadcrumb, dicOption, goBack],
    components: { areaList, searchLable },
    /* props: {
      // TODO breadcrumb可采用组件传参的模式替换路由判断，将配置权交给调用方
      breadcrumb: {
        type: Object,
        default () {
          return {
            name: '内设机构详情',
            parent: null
          }
        }
      }
    }, */
    data() {
        // 验证邮编
        let validateZipCode = (rule, value, callback) => {
            if (value !== "") {
                let reg = /(^\s{0}$)|^[1-9]\d{5}$/;
                reg.test(value)
                    ? callback()
                    : callback(new Error("请输入有效邮政编码"));
            } else {
                callback();
            }
        };
        // 验证传真
        let validateFax = (rule, value, callback) => {
            if (value !== "") {
                let reg = /(^\s{0}$)|^(\d{3,4}-)?\d{7,8}$/;
                reg.test(value)
                    ? callback()
                    : callback(new Error("请输入有效传真号码"));
            } else {
                callback();
            }
        };

        // 验证单位电话
        let validateOffice = (rule, value, callback) => {
            if (value !== "") {
                let reg = /(^\s{0}$)|(0\d{2,3}-\d{7,8}|\(?0\d{2,3}[)-]?\d{7,8}|\(?0\d{2,3}[)-]*\d{7,8})/;
                reg.test(value)
                    ? callback()
                    : callback(new Error("请输入有效单位电话"));
            } else {
                callback();
            }
        };
        return {
            iptMsgInfoStr: "添加或修改该字段需要提交审核",
            iptMsgVisible: {},
            breadcrumb: {
                name: "单位详情",
                parent: null,
            },
            loadVisiable: false, // 信用代码加载图标,
            requiring: false, // 验证中
            successVisiable: false,
            errorVisiable: false,
            areaFlag: false,
            areaCheck: "",
            areaOptions: [],
            props: {
                multiple: false,
                children: "children",
                label: "name",
                value: "id",
            },
            openSearchFlag: false,
            addInfo: {
                searchFlag: false,
                type: 1, // 1.单位，2、内设机构，3、人员
            },
            loading: false,
            isShowEditFlag: true,
            disabledFlag: false,
            submitHtml: "保存",
            isOrgManage: true,
            oldFrom: {},
            tagKeyWord: "",
            tagsName: [],
            parentName: "",
            bindId: "",
            areaOption: [],
            allAreaList: [],
            defaultList: [],
            delSelectLabelId: null, // 添加后未提交到后台移除的标签
            tempLabelId: [],
            creditIddisable: false,
            rules: {
                "organization.name": [
                    {
                        required: true,
                        message: "请输入单位名称",
                        trigger: "blur",
                    },
                ],
                "organization.zipCode": [
                    { validator: validateZipCode, trigger: "blur" },
                ],
                "organization.fax": [
                    { validator: validateFax, trigger: "blur" },
                ],
                "organization.phone": [
                    { validator: validateOffice, trigger: "blur" },
                ],
                // 'organization.creditId':[ { validator: validateCreditId, trigger: 'blur' }]
            },
            ruleForm: {
                reason: "",
                nodeId: "", // 节点id
                areaId: null,
                labelId: [],
                nodeType: 2,
                organization: {
                    id: "",
                    parentId: "", // bindId
                    zipCode: "",
                    address: "",
                    ext02: "",
                    ext01: "",
                    type: null,
                    creditId: "",
                    removed: true,
                    phone: "",
                    systemType: null, // 1人大，2党委，4政府，8政协
                    name: "",
                    otherName: "",
                    shortName: "",
                    fax: "",
                },
            },
            isAudit: false,
        };
    },
    computed: {
        ...mapState(["app"]),
    },
    mounted() {
        this.setBreadcrumbTitle();
    },
    created() {
        console.log(this.$route.params, "params");
        this.init();
        this.initIptMsgVisible();
    },
    beforeRouteUpdate(to, from, next) {
        next();
    },
    methods: {
        ...mapMutations(["SET_OPTION"]),
        init() {
            let that = this;
            if (this.$route.name === "UnitEdit") {
                this.app.option.authorizedEntityVos.forEach(function (item) {
                    if (item.roleName === "ORG_MANAGER") {
                        that.isOrgManage = false;
                    } else {
                        that.isOrgManage = true;
                    }
                });
            }
            if (
                this.$route.name === "UnitAdd" ||
                this.$route.name === "UnitEdit"
            ) {
                api[urlNames["findViewNodeById"]]({
                    id: this.$route.params.parentId || this.$route.params.id,
                }).then(
                    (res) => {
                        if (res.data.bindId) {
                            this.parentName = res.data.parentName;
                            this.bindId = res.data.bindId;
                            if (this.$route.name !== "UnitAdd") {
                                this.getArea(res.data.bindId);
                                if (res.data.bindId === 2) {
                                    this.ruleForm.organization.parentId =
                                        res.data.bindId;
                                }
                                this.ruleForm.nodeId = res.data.id;
                                this.findLabel(1);
                                this.getDetail();
                            } else {
                                this.ruleForm.nodeId = res.data.id;
                                this.ruleForm.organization.parentId =
                                    res.data.bindId;
                            }
                        } else {
                            this.parentName = "";
                            this.ruleForm.nodeId = res.data.id;
                        }
                        this.oldFrom = JSON.parse(
                            JSON.stringify(this.ruleForm)
                        );
                        //  console.log('ruleForm1:',this.ruleForm,this.oldFrom)
                    },
                    (/* error */) => {
                        this.$message.error(`没有内容`);
                    }
                );
            } else {
                this.bindId = this.$route.params.id;
                this.findLabel(1);
                this.getDetail();
            }
        },
        // 设置各个字段的验证提示信息的可见性
        initIptMsgVisible() {
            for (let field in this.ruleForm.organization) {
                this.iptMsgVisible[field] = false;
            }
        },
        showIptMsg(fieldName) {
            if (
                this.app.option.options.orgAuditFields.indexOf(fieldName) > -1
            ) {
                this.iptMsgVisible[fieldName] = true;
                this.isAudit = true;
            }
        },
        openarea(e) {
            this.areaFlag = true;
            e.target.blur();
        },
        getDetail() {
            let data = {
                id: this.bindId,
            };
            this.loading = true;
            api[urlNames["findOrganizationById"]](data).then(
                (res) => {
                    this.loading = false;
                    if (this.$route.name === "UnitAdd") {
                    } else {
                        this.ruleForm.areaId = res.data.areaId;
                        this.ruleForm.organization.address = res.data.address;
                        this.ruleForm.organization.name = res.data.name;
                        this.ruleForm.organization.id = res.data.id;
                        this.ruleForm.organization.removed = !res.data.removed;
                        this.ruleForm.organization.fax = res.data.fax;
                        this.ruleForm.organization.phone = res.data.phone;
                        this.ruleForm.organization.shortName =
                            res.data.shortName;
                        this.ruleForm.organization.otherName =
                            res.data.otherName;
                        this.ruleForm.organization.systemType =
                            res.data.systemType;
                        this.ruleForm.organization.type = res.data.type;
                        this.ruleForm.organization.zipCode = res.data.zipCode;
                        this.ruleForm.organization.ext01 = res.data.ext01;
                        this.ruleForm.organization.ext02 = res.data.ext02;
                        this.ruleForm.organization.creditId = res.data.creditId;
                        if (res.data.creditId && res.data.creditId !== "") {
                            this.creditIddisable = true;
                        }
                        this.oldFrom = JSON.parse(
                            JSON.stringify(this.ruleForm)
                        );
                        console.log("ruleForm2:", this.ruleForm, this.oldFrom);
                    }
                },
                () => {
                    this.$message.error(`没有内容`);
                }
            );
        },
        // 获取标签
        findLabel(type) {
            api[urlNames["findLabel"]]({
                id: this.bindId,
                type: type,
            }).then(
                (res) => {
                    this.defaultList = res.data;
                    res.data.forEach((item) => {
                        this.tagsName.push(item.name);
                        this.ruleForm.labelId.push(item.id);
                    });
                    this.tempLabelId = JSON.parse(
                        JSON.stringify(this.ruleForm.labelId)
                    );
                },
                (/* error */) => {}
            );
        },
        removeTag(tag, index) {
            let that = this;
            let lIds = [];
            lIds = that.tempLabelId.filter(function (item) {
                return item === that.ruleForm.labelId[index];
            });
            if (lIds.length !== 0) {
                that.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        api[urlNames["deleteUserLabelOrDeptLabelOrOrgLabel"]]({
                            id: that.ruleForm.organization.id,
                            type: that.ruleForm.organization.type,
                            labelId: that.ruleForm.labelId[index],
                        }).then((res) => {
                            if (res.status === 0) {
                                that.$message.success("删除成功");
                                that.tagsName.splice(index, 1);
                                that.ruleForm.labelId.splice(index, 1);
                            }
                        });
                    })
                    .catch(() => {
                        that.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            } else {
                that.delSelectLabelId =
                    that.ruleForm.labelId[index] + "|" + that.tagsName[index];
                that.ruleForm.labelId.splice(index, 1);
                that.tagsName.splice(index, 1);
            }
        },
        // deleteUserLabelOrDeptLabelOrOrgLabel (id, type, labelId) {
        //   api[urlNames['deleteUserLabelOrDeptLabelOrOrgLabel']]({
        //     id: id,
        //     type: type,
        //     labelId: labelId
        //   }).then(res => {
        //     if (res.status === 0) {
        //       this.$message.info('删除成功')
        //     }
        //   })
        // },
        // 获取区域
        getArea(orgId) {
            api[urlNames["findOrgAreaList"]]({
                orgId: orgId,
            }).then(
                (res) => {
                    this.allAreaList = res.data;
                    this.findMenuByPath(res.data);
                    if (this.areaOption.length > 1) {
                        if (this.areaOption[this.areaOption.length - 1].id) {
                            this.ruleForm.areaId = this.areaOption[
                                this.areaOption.length - 1
                            ].id;
                        }
                    }

                    this.areaOption.forEach((item) => {
                        this.areaCheck += item.name + "/";
                    });
                    this.oldFrom = JSON.parse(JSON.stringify(this.ruleForm));
                    console.log("ruleForm3:", this.ruleForm, this.oldFrom);
                },
                (/* error */) => {}
            );
        },
        getClose(val) {
            this.openSearchFlag = val;
        },
        // 获取选中的标签
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
            let tagIdList = [];
            tagIdList = tag.filter((a) => !res.has(a) && res.set(a, 1));
            tagIdList.forEach((item) => {
                this.ruleForm.labelId.push(parseInt(item));
            });
        },
        setBreadcrumbTitle() {
            // 设置面包屑title
            if (
                this.$route.name === "UnitEdit" ||
                this.$route.name === "UnitAdd"
            ) {
                this.isShowEditFlag = true;
                this.disabledFlag = false;
                if (this.$route.name === "UnitEdit") {
                    this.breadcrumb.name = "编辑单位";
                } else {
                    this.breadcrumb.name = "添加单位";
                }
            } else {
                this.isShowEditFlag = false;
                this.disabledFlag = true;
                this.breadcrumb.name = "单位详情";
            }
            this.pushBreadcrumb(this.breadcrumb);
        },
        getSystemType(el) {
            this.ruleForm.organization.systemType = el;
            this.showIptMsg("systemType");
        },
        getType(el) {
            this.ruleForm.organization.type = el;
            this.showIptMsg("getType");
        },
        getAreaId(val) {
            this.areaCheck = val.name;
            this.ruleForm.areaId = val.id;
            // this.ruleForm.areaId = val
        },
        submitForm(ruleForm) {
            //  || this.ruleForm.organization.creditId == ''
            if (this.$route.params.nodeType === 1) {
                this.ruleForm.organization.parentId = "-1";
            } else {
                this.ruleForm.organization.parentId = this.$route.params.parentId;
            }

            if (
                this.successVisiable ||
                this.ruleForm.organization.creditId === ""
            ) {
                this.ruleForm.organization.removed = this.ruleForm.organization
                    .removed
                    ? 0
                    : 1;
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        api[urlNames["createOrganization"]](this.ruleForm).then(
                            (res) => {
                                if (
                                    this.$route.name === "UnitEdit" &&
                                    this.isAudit
                                ) {
                                    this.$alert(
                                        "保存成功，待审核管理员审核通过后方生效",
                                        "保存成功",
                                        {
                                            confirmButtonText: "确定",
                                            callback: (action) => {
                                                this.$router.go(-1);
                                                this.isChange = false;
                                                this.$emit(
                                                    "on-update-organization-tree"
                                                );
                                            },
                                        }
                                    );
                                } else {
                                    this.$message.success(`保存成功`);
                                    this.$router.go(-1);
                                    this.isChange = false;
                                    this.$emit("on-update-organization-tree");
                                }
                            },
                            (/* error */) => {}
                        );
                    } else {
                        this.$message.error("请填写必要字段");
                        this.loadVisiable = false;
                        this.successVisiable = false;
                        this.errorVisiable = false;
                    }
                });
            } else if (this.errorVisiable) {
                this.$message.error("请输入与单位名称相匹配的统一社会信用代码");
            }
        },
        goBack() {
            this.isChange = this.addWatch(this.ruleForm, this.oldFrom);
            if (this.isChange) {
                this.goBackDilog(this.submitForm, "ruleForm");
                this.isChange = false;
            } else {
                this.isChange = false;
                this.$router.go(-1);
            }
        },
        close(val) {
            this.areaFlag = val;
        },
        findMenuByPath(list) {
            for (let item of list) {
                this.areaOption.push(item);
                if (item.children && item.children.length > 0) {
                    this.findMenuByPath(item.children);
                } else {
                }
            }
        },
        // 社会信用代码
        handleCredit() {
            // 51522300C58060003M
            // this.ruleForm.organization.creditId = '51522300C58060003M'
            // this.ruleForm.organization.name = '黔西南布依族苗族自治州消费者协会'
            if (
                this.ruleForm.organization.name === "" &&
                this.ruleForm.organization.creditId !== ""
            ) {
                this.$message.error("请输入单位名称");
            } else if (this.ruleForm.organization.creditId !== "") {
                this.loadVisiable = true;
                this.requiring = true;
                this.successVisiable = false;
                this.errorVisiable = false;
                let param = {
                    orgName: this.ruleForm.organization.name,
                    creditId: this.ruleForm.organization.creditId,
                };
                api[urlNames["orgCreditId"]](param).then(
                    (res) => {
                        if (res.data === 1) {
                            window.setTimeout(() => {
                                this.successVisiable = true;
                                this.requiring = false;
                                this.loadVisiable = false;
                                this.errorVisiable = false;
                            }, 2000);
                        } else {
                            window.setTimeout(() => {
                                this.errorVisiable = true;
                                this.loadVisiable = false;
                                this.successVisiable = false;
                                this.requiring = false;
                            }, 2000);
                        }
                    },
                    () => {}
                );
            } else {
                this.errorVisiable = false;
                this.loadVisiable = false;
                this.successVisiable = false;
            }
        },
    },
};
</script>

<style lang="less" scoped>
@import "index";
</style>
