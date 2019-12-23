<template>
  <div class="pass-change">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="account-info">
          <p>账号信息</p>
          <div v-for="(item, index) in accountInfoList" :key="item.id">
            <el-button
              @click="selectAccount(item, index)"
              :type="currentIndex === index ? 'primary' : ''"
            >{{item.name}}</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我的信息" name="first">
            <person-manage
              :user-detail="userInfo.user"
              :post-detail="userInfo.identity"
              :label-id="userInfo.labelId"
              :label-list="fromLabelList"
              @get-user="getUser"
              @get-post="getPost"
            ></person-manage>
          </el-tab-pane>
          <el-tab-pane label="修改密码">
            <div class="modifiePwd">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <div :style="{margin: '20px'}" class="account-name">
                  <i class="el-icon-user" :style="{marginRight: '20px'}">{{currentSetAccount.name}}</i>
                </div>
                <el-form-item label="原密码" prop="oldPass">
                  <el-input type="password" v-model="ruleForm.oldPass" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPass">
                  <el-input
                    type="password"
                    v-model="ruleForm.newPass"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input
                    type="password"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
                <div class="pass-rule">
                  <i class="el-icon-warning"></i>
                  {{passRule}}
                </div>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                  <el-button @click="resetForm('ruleForm')">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="重置密码"></el-tab-pane>
          <!--<el-tab-pane label="重置密码" name="second">-->
          <!--重置密码-->
          <!--</el-tab-pane>-->
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
import personManage from "../../organization/components/PersonManage";

export default {
  components: {
    personManage
  },
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原始密码"));
      } else {
        callback();
      }
    };
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        let reg = /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.*/]*|[a-zA-Z!@#\$%_\.*/]*)$)[a-zA-Z\d!@#\$%_\.*/]{8,}$/;
        reg.test(value)
          ? callback()
          : callback(new Error("请按照密码规则填写"));
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      currentIndex: 0,
      accountInfoList: [],
      currentSetAccount: {},
      activeName: "first",
      userName: "管理员管理员",
      passRule:
        "密码规则:必须含数字、字母(区分大小写)、特殊字符(如！@#$_等)，且长度不少于8位。如：bgt123@SZF",
      ruleForm: {
        oldPass: "",
        checkPass: "",
        newPass: ""
      },
      rules: {
        oldPass: [{ validator: validateOldPass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
        newPass: [{ validator: validateNewPass, trigger: "blur" }]
      },
      userInfo: {
        userAccount: [], // 账户
        labelId: [],
        identity: {
          departmentId: "", // 部门id
          postName: "", // 岗位名称
          id: "",
          type: null,
          orgId: "",
          dutyName: "" // 职务名称
        },
        userId: "",
        user: {
          birthday: "",
          nation: null,
          portraitUrl: "",
          sex: null,
          mobile: "",
          politicalParty: null,
          qualification: null,
          positionClass: null,
          officePhone: "",
          idcard: "",
          mobile2: "",
          name: "",
          professionalTitle: "",
          userState: null,
          userType: null,
          ext01: "",
          ext02: "",
          ext03: ""
        }
      },
      fromLabelList: [],
    };
  },
  created() {
    api[urlNames["findUserAccountByUid"]]().then(
      res => {
        if (res && res.data) {
          this.accountInfoList = res.data;
          this.currentSetAccount = res.data[0];
          this.getUserDetail(res.data[0].id)
        }
      },
      () => {
        this.accountInfoList = [];
      }
    );
  },
  computed: {
    ...mapState(["app"])
  },
  methods: {
      getUserDetail (id) {
      this.loading = true
      api[urlNames['findUserById']]({
        id: id
      }).then((res) => {
        if(res.data.sex){
            res.data.sex=parseInt(res.data.sex);
        }
        if(res.data.positionClass){
            res.data.positionClass=parseInt(res.data.positionClass);
        }
        if(res.data.nation){
            res.data.nation=parseInt(res.data.nation);
        }
        if(res.data.qualification){
            res.data.qualification=parseInt(res.data.qualification);
        }
        if(res.data.politicalParty){
            res.data.politicalParty=parseInt(res.data.politicalParty);
        }
       let doUserDetail= Object.assign(this.userInfo.user, res.data);

       this.userInfo.user=doUserDetail;
        this.loading = false
      }, (error) => {
        this.$message.error(`保存失败，请重试`)
      })
    },
    getUser(val) {
      // 获取用户信息
      this.userInfo.user = val;
      this.stepTwoFlag = true;
      this.activeIndex = 1;
      this.sendUserFlag = true;
      console.log(val)
      // this.submitForm()
    },
    // 绑定身份
    getPost(val) {
      this.userInfo.identity = val;
    },

    selectAccount(item, index) {
      console.log(item, index);
      this.currentIndex = index;
      this.currentSetAccount = item;
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            accountId: this.currentSetAccount.id,
            oldPwd: this.ruleForm.oldPass,
            newPwd: this.ruleForm.newPass,
            repeatPwd: this.ruleForm.checkPass
          };
          api[urlNames["updatePwd"]](data).then(
            res => {
              let status = res.status;
              this.$message({
                message: status === 0 ? "修改成功" : "修改失败",
                type: status === 0 ? "success" : "error"
              });
            },
            () => {}
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
@import "index";
</style>


