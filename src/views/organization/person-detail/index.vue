<template>
  <div class="person-detail-content">
    <!--步骤条-->
    <step :active="activeIndex" @getActive="getActive"></step>
    <el-dialog title="选择标签" :visible.sync="openAddTagFlag">
     <el-input placeholder="请输入内容" v-model="tagKeyWord" class="input-with-select">
       <el-button slot="append" icon="el-icon-search"></el-button>
     </el-input>
     <div class="tag-content">
       <el-checkbox-group
         v-model="checkTagGroup">
         <el-checkbox
           v-for="item in searchTags"
           border
           :label="item.name"
           :title="item.name"
           :key="item.name"
         >{{item.name}}</el-checkbox>
       </el-checkbox-group>
     </div>
     <span slot="footer" class="dialog-footer">
       <el-button @click="openAddTagFlag = false">取 消</el-button>
       <el-button type="primary" @click="getCheckTags">确 定</el-button>
     </span>
   </el-dialog>
   <el-container>
     <!--账号管理-->
     <person-manage v-if="stepOneFlag"></person-manage>
    <div style="width: 100%"  v-if="stepTwoFlag">
       <div class="set-default">
         <div class="default-warn"><i class="el-icon-warning"></i>默认帐号用于您一个帐号全站都能使用，若遇到不能使用的业务系统，请切换身份类型即可。</div>
         设置默认帐号
         <el-select v-model="value" placeholder="请选择">
           <el-option
             v-for="item in accountOptions"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </div>
       <el-collapse v-model="activeAccount" accordion class="account-list">
         <el-collapse-item title="账号：chengyu" name="1">
           <bind-system></bind-system>
         </el-collapse-item>
       </el-collapse>
       <creat-account></creat-account>
     </div>
   </el-container>
   <el-footer class="add-person-footer">
      <el-button type="primary" @click="next" v-if="stepOneFlag">下一步</el-button>
      <el-button type="primary" @click="last" v-if="stepTwoFlag">上一步</el-button>
      <el-button type="primary">保存</el-button>
    </el-footer>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
import bindSystem from '../components/bindSystem/index'
import creatAccount from '../components/creatAccount/index'
import personManage from '../components/personManage/index'
import step from '../components/Step/index'
export default {
  mixins: [ handleBreadcrumb ],
  components: {
    bindSystem, creatAccount, personManage , step
  },
  data () {
    return {
      breadcrumbTitle: '',
      isShowEditFlag: false,
      disabledFlag: false,
      stepOneFlag: true,
      stepTwoFlag: false,
      openAddTagFlag: false,
      activeAccount: '1',
      activeIndex: 0,
      tagKeyWord: '',
      accountOptions: [], // 账号
      searchTags: [], // 搜索标签结果
      checkTagGroup: [], // 选中的标签
      tags: [], // 提交的标签
      options: [],
      value: ''
    }
  },
  methods: {
    setBreadcrumbTitle () { // 设置面包屑title
      if (this.$route.name === 'PersonEdit' || this.$route.name === 'PersonAdd') {
        this.isShowEditFlag = true
        this.disabledFlag = false
        if (this.$route.name === 'NodeEdit') {
          this.breadcrumbTitle = '编辑人员'
        } else {
          this.breadcrumbTitle = '添加人员'
        }
      } else {
        this.isShowEditFlag = false
        this.disabledFlag = true
        this.breadcrumbTitle = '人员详情'
      }
      this.pushBreadcrumb({
        name: this.breadcrumbTitle,
        parent: {
          name: 'OrganizationContent',
          query: {
            type: 'back'
          }
        }
      })
    },
    getCheckTags () {
      this.openAddTagFlag = false
      this.tags = this.checkTagGroup
    },
    next () {
      this.stepTwoFlag = true
      this.stepOneFlag = false
      this.activeIndex = 1
    },
    last () {
      this.stepTwoFlag = false
      this.stepOneFlag = true
      this.activeIndex = 0
    },
    goBack () {
      this.$emit('go-back')
    },
    getActive (val) {
      this.active = val
    }
  },
  created () {
    this.setBreadcrumbTitle()
  },
  watch: {
    $route: {
      handler (val) {
        this.setBreadcrumbTitle()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
