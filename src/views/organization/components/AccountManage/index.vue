<template>
  <div class="account-manage">
    <div class="set-default" v-if="accountList.length > 0">
      <div class="default-warn"><i class="el-icon-warning"></i>默认帐号用于您一个帐号全站都能使用，若遇到不能使用的业务系统，请切换身份类型即可。</div>
      设置默认帐号
      <el-select
        v-model="accountSelect"
        @change="getDefaultAccount"
        :disabled="disabledFlag"
        class="account-select"
        placeholder="请选择">
        <el-option
          v-for="item in accountList"
          :key="item.id"
          :label="item.name"
          :value="item.defaultAccount">
        </el-option>
      </el-select>
    </div>
    <el-collapse v-model="activeAccount" accordion class="account-list">
      <el-collapse-item v-for="(item,index) in accountList" :key="item.id" :title="item.name + ' ' + userInfo.name">
          <!-- <bind-system :user-account="userAccount" @get-app="getAppId"></bind-system> -->
          <bind-system :list="item.account4AppDtos || []" :sysIndex='index'  :isCreate="false"  @app-change="getAppId"></bind-system>
      </el-collapse-item>
    </el-collapse>
    <div class="creat-account-content" v-if="this.$route.name === 'PersonAdd' || this.$route.name === 'PersonEdit'">
      <el-button class="creat-btn" v-show="!disabledFlag" @click="creatAccount">
       <!-- <i class="el-icon-plus el-icon&#45;&#45;left">创建账号</i>-->
        创建账号
      </el-button>
      <el-form label-width="100px" :model="addAccount" :rules="rulesOption" ref="addAccount" v-if="!addFlag">
        <input type="password" class="hideIpt" />
        <input type="text" class="hideIpt"/>
        <el-form-item label="登录帐号" prop="name">
          <el-input v-model="addAccount.name"></el-input>
        </el-form-item>
        <el-form-item label="登录别名" prop="nickName">
          <el-input v-model="addAccount.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addAccount.password" show-password></el-input>
        </el-form-item>
         <el-form-item label="关联系统">
         <bind-system :list="[]" :isCreate="true" @app-change="getAppId"></bind-system>
        </el-form-item>
        <el-form-item label="是否启用" prop="removed">
          <el-switch v-model="addAccount.removed"></el-switch>
        </el-form-item>
        <el-form-item label="申请原因" prop="reason">
          <el-input type="textarea" v-model="addAccount.reason"></el-input>
        </el-form-item>
      </el-form>
    </div>
      <el-footer class="add-person-footer">
        <span v-if="this.$route.name === 'PersonAdd' || this.$route.name === 'PersonEdit'">
        <el-button type="primary" @click="lastStep" :disabled="false">上一步</el-button>
        <el-button type="primary" @click="fromSublime('addAccount')">保存</el-button>
        <el-button @click="goBack">取消</el-button>
        </span>
      </el-footer>
  </div>
</template>

<script>
import bindSystem from '../BindSystem/index'
import goBack from '@src/mixins/go-back.js'
export default {
  mixins:[goBack],
  components: { bindSystem },
  props: ['disabledFlag', 'isShowEditFlag', 'accountList', 'userInfo', 'isDefaultFlag', 'userAccount', 'isExit'],
  data () {
    
    var validateName = (rule, value, callback) => {
      if (value === '') {
        allback(new Error('登录账号不能为空'))
      } else {
       let reg=/^[a-z]([a-z\d\.\@\.\_\-]){5,19}$/
        reg.test(value) ? callback() : callback(new Error('以小写字母开头，不能使用中文或大写字母，特殊符号仅允许"@"、"."、"_"、"—"，长度为6-20个字符。'))
        callback()
      }
    } 
    var validateNickName = (rule, value, callback) => {
      if (value === '') {
        allback(new Error('登录别名不能为空'))
      } else {
        let reg=/^[a-z]([a-z\d\.\@\.\_\-]){5,19}$/
        reg.test(value) ? callback() : callback(new Error('以小写字母开头，不能使用中文或大写字母，特殊符号仅允许"@"、"."、"_"、"—"。长度为6-20个字符。'))
        callback()
      }
    }
     var validatePwd = (rule, value, callback) => {
      if (value === '') {
        allback(new Error('登录密码不能为空'))
      } else {
        let reg=/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@._-])[\da-zA-Z~@._-]{8,}$/
        reg.test(value) ? callback() : callback(new Error('必须包含字母、数字和特殊字符（特殊符号仅允许“@”、“.”、“_”、“—”。）,长度至少为8个字符。'))
        callback()
      }
    }
    return {
      addAccount: {
        password: '',
        removed: true,
        appId: [],
        name: '',
        nickName: '',
        id: '',
        defaultAccount: null,
        reason: ''
      },
      isCreate:true,
      isCommit:false,
      updateSystem:false,
      oldAddAccount: {},
      // addFlag: this.isDefaultFlag,
      addFlag: true,
      activeAccount: '1',
      tags: [], // 提交的标签
      options: [],
      accountSend: [],
      accountSelect: '',
      doIndex: '',
      rulesOption:{
        name:[
          { required: true, message: '登录账号不能为空', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
          ],
        nickName:[{ required: true, message: '登录别名不能为空', trigger: 'blur' },
         { validator: validateNickName, trigger: 'blur' }

        ],
        password:[{ required: true, message: '登录密码不能为空', trigger: 'blur' },
         { validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let that = this
      this.oldAddAccount = JSON.parse(JSON.stringify(this.addAccount))
      this.accountList.forEach(function (item) {
        that.accountSend.push(item)
      })
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    creatAccount () {
      this.addFlag = !this.addFlag
    },
    getDefaultAccount (val) {
      this.accountList.forEach((item) => {
        if (item.id === val.value) {
          let obj = {
            id: item.id,
            defaultAccount: 1,
            password: item.password,
            removed: item.removed,
            appId: item.appId,
            name: item.name,
            reason: ''
          }
          this.accountSend.push(obj)
        } else {
          this.accountSend.push(item)
        }
      })
    },
    fromSublime (addAccount) {
      // 情况二：添加账号信息
        this.addAccount.removed= this.addAccount.removed ? 0 : 1
        let that = this
        if (!this.isExit) {
          that.accountSend.pop()
           this.$nextTick(() => {                            
          this.$refs['addAccount'].resetFields()
          })
        }
        if(this.addAccount.name!==''||this.addAccount.nickName!==''||this.addAccount.password!==''){
          this.$refs[addAccount].validate(valid => {
          if (valid) {
            that.accountSend.push(that.addAccount)
            this.$emit('get-account', that.accountSend)
          } else {
            this.$message.warning(`请根据提示输入必填字段`)
            return false
          }
          })
        }else{
           if(this.isCommit){
           this.$emit('get-account', this.accountSend)
          }
        }
        if(this.addAccount.name==''&&this.addAccount.nickName==''&&this.addAccount.password==''){
           this.$emit('get-account', this.accountSend)
        }
        

       
    },
    lastStep () {
      this.$emit('get-back', true)
    },
    goBack () {
       this.isChange= this.addWatch(this.addAccount,this.oldAddAccount)
      if(this.isChange){
        this.goBackDilog(this.fromSublime,'addAccount')
      }else{
        this.isChange=false
        this.$router.go(-1)
      }
    },
    getAppId (val, index,change) {
      this.addAccount.appId = val
      this.doIndex=index
      this.isCommit=change
      if(index!==undefined&&index!==''&&this.isCommit){
        this.accountSend[index].appId = this.addAccount.appId
      }
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
