<template>
  <div class="content-list">
    <select-members
      :seleceDialog="selectDialog"
      @dialogReturnMembersInfo="dialogReturnMembersInfo"
      @closeselectMenmber="closeselectMenmber"
    ></select-members>
    <!--解除兼职-->
    <el-dialog title="填写解除挂职说明" :visible.sync="removeFlag" width="40%">
      <span class="remove-des">您确定解除该人员在本单位的挂职身份？解除之后该人员将无法使用该身份下的账号使用应用系统。</span>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="申请原因" prop="reason">
          <el-input type="textarea" v-model="ruleForm.reason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="removeFlag = false">取 消</el-button>
          <el-button type="primary" @click="submitRemoveDuty('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--人员调出弹窗-->
    <el-dialog title="填写调出说明" :visible.sync="calloutFlag" width="50%">
      <el-form
        :model="formCallout"
        :rules="rulesCallou"
        ref="formCallout"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="调出单位">
          <span class="name-span">{{orgName}}</span>
          <span class="name-span" v-if="depName !== ''">/{{depName}}</span>
          <el-button @click="addMainLeader">选择调出单位/内设机构</el-button>
        </el-form-item>
        <el-form-item label="申请原因" prop="reason">
          <el-input type="textarea" v-model="formCallout.reason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formCallout')">确定</el-button>
          <el-button @click="calloutFlag = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 提交调出申请弹框 -->
    <el-dialog :visible.sync="submitVisible" width="410px">
      <div slot="title" style="padding:20px; background-color: #fff;">
        <span class="msg-title">{{callMag.title}}</span>
       <i class="el-icon-document-copy" style="color:red"></i>
      </div>
      <div class="msg-box">{{callMag.msg}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitVisible = false" width="120px">确 定</el-button>
      </div>
    </el-dialog>
    <div class="button-wrap">
      <span>
        <slot name="AddBtn"></slot>
      </span>
      <el-button @click="sortList" :disabled="!hasRight('userOrder')">调整排序</el-button>
      <el-button @click="exportUser" :disabled="!hasRight('userExport')">导出人员</el-button>
      <el-button size="small" type="primary" @click="exportPerson" :disabled="!hasRight('userImport')">导入人员</el-button>

    </div>
    <div class="sort-do" v-if="sortFlag">
      按住左键上下拖动调整排序
      <a @click="sublimeSort">保存</a>
      <a @click="cancelSort">取消</a>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      stripe
      border
      highlight-current-row
      row-key="id"
      size="medium"
      id="personTable"
    >
      <template slot="empty">
        <div class="empty">
          <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
          <p><span style="padding-left: 8px">暂无数据！</span></p>
        </div>
      </template>
      <el-table-column prop="description" width="60" align="center" v-if="sortFlag">
        <template>
          <i class="sortBtnDo menu-icon iconfont iconpaixu" style="font-size: 25px; cursor: move;"></i>
          <!--<span :title="scope" v-else>{{scope.$index + 1}}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="序号" type="index" align="center" width="60">
        <template slot-scope="scope"><span v-text='getIndex(scope.$index)'></span></template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" align="center"></el-table-column>
      <!-- <el-table-column label="登录账号" prop="account"></el-table-column> -->
      <el-table-column label="职务" prop="duty" align="center"></el-table-column>
      <el-table-column label="手机号" width="150" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.isLooked ? scope.row.mobile:hideMobile(scope.row.mobile) || '无'}}</span>
          <span v-if="scope.row.mobile&&scope.row.mobile!=''&&scope.row.mobile!='无'&&!scope.row.isLooked"
          class="findMobileBtn"
            @click="findMobileById(scope.row.uid,scope.$index)">查看</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="身份类型" prop="typeText"></el-table-column> -->
      <el-table-column label="启用状态" prop="removed" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed === 0">启用</span>
          <span class="text-disable" v-show="scope.row.removed===1">停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="act" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="openEiditPerson(scope.row)" type="text" size="small" class="btnMar"
           :disabled="!hasRight('userSetting')">修改</el-button>
          <el-button @click.native.prevent="calloutDialog(scope.row)" type="text" size="small" class="btnMar"
           :disabled="!hasRight('userIdTransfe')">调出</el-button>
          <el-button
            v-if="scope.row.type === 1 || scope.row.type === '1'"
            @click.native.prevent="removeDuty(scope.row)"
            type="text"
            size="small"
            class="btnMar"
          >解除兼职</el-button>
          <el-button
            v-if="scope.row.type === 2 || scope.row.type === '2'"
            @click.native.prevent="removeDuty(scope.row)"
            type="text"
            size="small"
            class="btnMar"
            :disabled="!hasRight('userIdRemove')"
          >解除挂职</el-button>
          <el-button  @click.native="goSort(scope.row)" type="text" size="small" >
            排序
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="contentPage.current"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="contentPage.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="contentPage.total"
    ></el-pagination>

    <!-- 数值排序弹框 -->
    <el-dialog :visible.sync="showSortDilog" width="420px">
       <div slot="title" style=" padding: 20px; background-color: #fff;">
        <span>数值排序</span>
        <i class="el-icon-document-copy" style="color:red;margin-left:6px"></i>
      </div>
      <div class="sort-ipt">
        请输入排序目标序号：
        <div style="display:inline-block">
          <el-input v-model="sortValue" placeholder="请输入排序目标序号" ></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitNumSort" width="120px">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import organizationEdit from '@src/mixins/organization'
import SelectMembers from '@src/components/SelectMembers/index'
import downloadBinaryFile from '@src/mixins/downloadBinaryFile'
import HasRight from '@src/mixins/has-right'

export default {
  mixins: [handleTable, organizationEdit, downloadBinaryFile, HasRight],
  props: ['contentPage', 'id', 'sortFlag', 'type', 'exportData'],
  components: { SelectMembers },
  data () {
    return {
      formFile: {}, // 文件form表单
      fileList: [], // 文件列表
      loading: true,
      list: [],
      originList: [],
      sortListFlag: false,
      isShowEditFlag: true,
      submitVisible: false,
      removeFlag: false,
      calloutFlag: false,
      orgName: '',
      depName: '',
      showSortDilog: false,
      lastIndex:null,
      ruleForm: {
        identityId: '',
        reason: ''
      },
      // 人员调出表单
      formCallout: {
        identityId: '',
        uid: '',
        deptId: '',
        orgId: '',
        reason: ''
      },
      rulesCallou: {
        orgId: [{ required: true, message: '请选择调出单位', trigger: 'blur' }]
      },
      rules: {
        reason: [{ required: true, message: '请填写申请原因', trigger: 'blur' }]
      },
      selectDialog: {
        selectMenmberTitle: '选择调出单位或内设机构', // 选人组件标题
        selectMenmberFlag: false, // 显示弹窗，
        isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
        notOnlyPerson: false, // 是否选人，默认为false（只选人）
        isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选
        isSingleOrgSelect: true, // 是否为单选框  false为多选（默认），true为单选(isOnlyOrg为true时内设机构/单位单选)
        isOnlyOrg: true
      },
      sortValue: null,
      // 数值排序参数
      sortParam: {},
       callMag:{
        title:'调出申请提交',
        msg:'您的调出申请已提交，等待管理员审核通过后即可生效。'
      }
    }
  },
  created () {
    this.getGrid()
    if (this.$route.name === 'OrganizationContent') {
      this.isShowEditFlag = true
    } else {
      this.isShowEditFlag = false
    }
  },
  methods: {
    exportPerson () {
      this.$emit('goExportPerson')
    },
    // 过滤手机号
    hideMobile (phone) {
      return (phone + '').replace(/^(.{3})(?:\d+)(.{4})$/, '$1****$2')
    },                   
    findMobileById (uid, index) {
      this.list.forEach(function(val,index){
        if(val.isLooked){
          val.isLooked=false
        }
      })
      this.list[index].isLooked = true
      api[urlNames['findMobileById']]({ uid }).then(res => {
      })
    },
    getGrid () {
      // this.cancelSort()
      this.loading = true
      // let bindId = this.$route.params.bindId
      if (this.type === 3) {
        let data = {
          deptId: this.id,
          page: this.contentPage.current,
          limit: this.contentPage.limit
        }
        api[urlNames['findDepartmentMembers']](data).then(
          res => {
            this.loading = false
            this.list = res.data
            this.originList = JSON.parse(JSON.stringify(this.list))
            this.contentPage.total = res.total
          },
          () => {
            this.loading = false
            this.list = []
            this.originList = JSON.parse(JSON.stringify(this.list))
            this.contentPage.total = 0
          }
        )
      }
      if (this.type === 2) {
        let data = {
          orgId: this.id,
          page: this.contentPage.current,
          limit: this.contentPage.limit
        }
        api[urlNames['findOrganizationMembers']](data).then(
          res => {
            this.loading = false
            this.list = res.data
            this.originList = JSON.parse(JSON.stringify(this.list))
            this.contentPage.total = res.total
          },
          () => {
            this.loading = false
            this.list = []
            this.originList = JSON.parse(JSON.stringify(this.list))
            this.contentPage.total = 0
          }
        )
      }
    },
    // 保存排序
    sublimeSort () {
      let that = this
      let sortList = []
      // 对之前已经排序好的
      this.list.forEach(function (item, index) {
        sortList.push({
          id: item.uid,
          sort: that.originList[index].sort,
          name: item.name
        })
      })
      let data = {
        page: this.contentPage.current,
        limit: this.contentPage.limit,
        sortList
      }
      api[urlNames['setUserSort']](data).then(
        res => {
          this.$message.success(`保存成功`)
          this.cancelSort()
        },
        () => {
          this.$message.error(`保存失败，请重试`)
        }
      )
    },
    handleSizeChange (val) {
      this.contentPage.current = 1
      this.contentPage.limit = val
      this.cancelSort()
      this.$emit('getPage', this.contentPage)
    },
    handleCurrentChange (val) {
      this.contentPage.current = val
      // this.getGrid()
      // this.$emit('cancel', false)
      this.cancelSort()
      this.$emit('getPage', this.contentPage)
    },
    cancelSort () {
      this.getGrid()
      this.$emit('cancel', false)
    },
    sortList () {
      this.$emit('cancel', true)
    },
    getIndex ($index) {
      return (this.contentPage.current - 1) * this.contentPage.limit + $index + 1
    },
    // 数值排序弹框
    goSort (val) {
      console.log(' val:', val)
      this.showSortDilog = true
      this.sortParam.nowId = parseInt(val.identityId)
      this.sortParam = {
        // id: '',
        nowId: val.identityId,
        orgId: val.orgId,
        departmentId: val.deptId
      }
    },
    // 保存数值排序
    submitNumSort () {
      if (this.type === 3) {
        let data = {
          deptId: this.id,
          page: this.sortValue,
          limit: 1
        }
        api[urlNames['findDepartmentMembers']](data).then(
          res => {
            this.loading = false
            if (res.data.length > 0) {
              this.sortParam.id = res.data[0].identityId
              this.NumSortFun(this.sortParam)
              // console.log(' this.sortParam:', this.sortParam)
            }
            if (res.data.length === 0) {
              this.$message.error('找不到目标序号，请重新输入')
              this.showSortDilog = false
            }
          },
          () => {}
        )
      }

      if (this.type === 2) {
        let data = {
          orgId: this.id,
          page: this.sortValue,
          limit: 1
        }
        api[urlNames['findOrganizationMembers']](data).then(
          res => {
            this.loading = false
            if (res.data.length > 0) {
              this.sortParam.id = res.data[0].identityId
              this.NumSortFun(this.sortParam)
              // console.log(' this.sortParam:', this.sortParam)
            }
            if (res.data.length === 0) {
              this.$message.error('找不到目标序号，请重新输入')
              this.showSortDilog = false
            }
          },
          () => {}
        )
      }
    },
    NumSortFun (data) {
      api[urlNames['setSortThroughNumerical']](data).then(
        res => {
          if (res) {
            this.showSortDilog = false
            this.$message.success('排序成功')
            this.contentPage.current = Math.ceil(this.sortValue / this.contentPage.limit)
            this.getGrid()
            this.sortValue = ''
          }
        })
    },


    // 表单初始化
    fromInit () {
      this.calloutFlag = false
      this.removeFlag = false
      this.formCallout = {
        identityId: '',
        uid: '',
        deptId: '',
        orgId: '',
        reason: ''
      }
      this.ruleForm = {
        identityId: '',
        reason: ''
      }
    },

    // 调出
    calloutDialog (row) {
      this.formCallout.identityId = row.identityId
      this.formCallout.uid = row.uid
      this.calloutFlag = true
      this.$emit('cancel', false)
    },
    // 解除
    removeDuty (row) {
      this.removeFlag = true
      this.$emit('cancel', false)
      this.ruleForm.identityId = row.identityId
      // this.ruleForm.type = row.type
    },
    // 提交调出
    submitForm (formCallout) {
      this.$refs[formCallout].validate(valid => {
        if (valid) {
          api[urlNames['calloutUser']](this.formCallout).then(
            res => {
              // this.$message.success(`调出成功`)
              this.calloutFlag = false
              this.submitVisible = true
              this.getGrid()
              this.fromInit()
              this.formCallout.deptId = this.formCallout.orgId = ''
              this.orgName = this.depName = ''
            },
            (error) => {
              if (error) {
                this.calloutFlag = false
                this.submitVisible = true
                this.callMag.title='请勿重复提交调出申请'
                this.callMag.msg='在此之前，您已经提交过调出申请，请等待管理员审核完成后再操作！'
              }
            }
          )
        }
      })
    },
    // 提交解除兼职
    submitRemoveDuty (ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          api[urlNames['removeDuty']](this.ruleForm).then(
            res => {
              this.$message.success(`解除成功`)
              this.calloutFlag = false
              this.fromInit()
              this.getGrid()
            },
            () => {}
          )
        }
      })
    },
    // 选人弹窗组件返回的人员信息
    dialogReturnMembersInfo (data) {
      if (data[0].nodeType === 2) {
        this.formCallout.orgId = data[0].bindId
        this.orgName = data[0].name
      }
      if (data[0].nodeType === 3) {
        this.formCallout.deptId = data[0].bindId
        api[urlNames['findDepartmentById']]({
          id: data[0].bindId
        }).then(
          res => {
            this.formCallout.orgId = res.data.orgId
            this.orgName = res.data.orgName
            this.depName = res.data.name
          },
          () => {}
        )
      }
      // this.orgName = res.data.orgName
      // this.depName
    },
    // 关闭选人弹窗
    closeselectMenmber () {
      this.selectDialog.selectMenmberFlag = false
    },
    // 打开选人组件
    addMainLeader () {
      this.selectDialog.selectMenmberFlag = true
      this.selectDialog.isSingleSelect = false
      this.selectDialog.notOnlyPerson = false
      this.selectDialog.isSingleOrgSelect = false
      this.selectDialog.isOnlyOrg = true
      this.selectDialog.isAllData = true
    },
    exportUser () {
      let host = window.location.href.split('#')[0]
      this.downloadBinaryFile(host, this.id, this.type)
    }
  },


  watch: {
    sortFlag: {
      handler (val) {
        const tbody = document.querySelector('#personTable tbody')
        let that = this
        if (val) {
          Sortable.create(tbody, {
            handle: '.sortBtnDo',
            animation: 150,
            onUpdate: function (evt) {
              let items = that.list
              const newIndex = evt.newIndex
              const oldIndex = evt.oldIndex
              const $li = tbody.children[newIndex]
              const $oldLi = tbody.children[oldIndex]
              if (newIndex > oldIndex) {
                tbody.insertBefore($li, $oldLi)
              } else {
                tbody.insertBefore($li, $oldLi.nextSibling)
              }
              let item = items.splice(oldIndex, 1)
              items.splice(newIndex, 0, item[0])
              this.list = items // 排序后列表
            }
          })
        } else {
          this.sortListFlag = false
          this.getGrid()
        }
      },
      deep: true
    },
    calloutFlag: {
      handler (val) {
        if (val === false) {
          this.fromInit()
        }
      }
    },
    removeFlag: {
      handler (val) {
        if (val === false) {
          this.fromInit()
        }
      }
    }
  }
}
</script>

<style lang="less"  scoped>
  @import "index";
  .empty {
    p {
      margin: 0;
      font-size: 0px;
      text-align: center;
      line-height: 16px!important;
    }

    span {
      font-size: 12px;
    }
  }

  .data-pic {
    padding-top: 20px;
    width: 60px;
    height: auto;
  }
</style>
