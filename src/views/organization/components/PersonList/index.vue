<template>
  <div class="content-list">
    <!--选择单位/内设机构-->
    <!--    <candidate-dialog-->
    <!--      :seleceDialog="selectDialog"-->
    <!--      @dialogReturnMembersInfo="dialogReturnMembersInfo"-->
    <!--      @closeselectMenmber="closeselectMenmber">-->
    <!--    </candidate-dialog>-->
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
    <div class="button-wrap">
      <span>
        <slot name="AddBtn"></slot>
      </span>
      <el-button @click="sortList" :disabled="!hasRight('userOrder')">调整排序</el-button>
      <el-button @click="exportUser" :disabled="!hasRight('userExport')">导出人员</el-button>
      <el-button size="small" type="primary" @click="exportPerson" :disabled="!hasRight('userImport')">导入人员</el-button>

      <!-- <el-form class="uploadForm" :model="formFile" ref="formFile" enctype="multipart/form-data">
        <el-upload
          class="uploadMembers"
          :show-file-list="false"
          :auto-upload="false"
          :limit="1"
          name="file"
          action="http://jg-dev.lonmo.com/api/jg_manage/import/userImport"
          :on-change="fileHandleChange"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">导入人员</el-button>
        </el-upload>
      </el-form> -->

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
          <i class="sortBtnDo menu-icon iconfont iconpaixu" style="font-size: 25px"></i>
          <!--<span :title="scope" v-else>{{scope.$index + 1}}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="登录账号" prop="account"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="职务" prop="duty"></el-table-column>
      <el-table-column label="身份类型" prop="typeText"></el-table-column>
      <el-table-column label="启用状态" prop="removed" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed === 0">启用</span>
          <span class="text-disable" v-show="scope.row.removed===1">停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="act" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button @click.native.prevent="openEiditPerson(scope.row)" type="text" size="small"  :disabled="!hasRight('userSetting')">修改</el-button>
          <el-button @click.native.prevent="calloutDialog(scope.row)" type="text" size="small"  :disabled="!hasRight('userIdTransfe')">调出</el-button>
          <el-button
            v-if="scope.row.type === 1 || scope.row.type === '1'"
            @click.native.prevent="removeDuty(scope.row)"
            type="text"
            size="small"
          >解除兼职</el-button>
          <el-button
            v-if="scope.row.type === 2 || scope.row.type === '2'"
            @click.native.prevent="removeDuty(scope.row)"
            type="text"
            size="small"
            :disabled="!hasRight('userIdRemove')"
          >解除挂职</el-button>
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
      sortListFlag: false,
      isShowEditFlag: true,
      removeFlag: false,
      calloutFlag: false,
      orgName: '',
      depName: '',
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
        isSingleOrgSelect: true, // 是否为单选框  false为多选（默认），true为单选(isOnlyOrg为true时部门/单位单选)
        isOnlyOrg: true
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
            this.contentPage.total = res.total
          },
          () => {
            this.loading = false
            this.list = []
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
            this.contentPage.total = res.total
          },
          () => {
            this.loading = false
            this.list = []
            this.contentPage.total = 0
          }
        )
      }
    },
    // 保存排序
    sublimeSort () {
      let sortList = []
      this.list.forEach((item, index) => {
        const sortObj = {
          id: item.uid,
          sort: index
        }
        sortList.push(sortObj)
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
              this.$message.success(`调出成功`)
              this.calloutFlag = false
              this.getGrid()
              this.fromInit()
              this.formCallout.deptId = this.formCallout.orgId = ''
              this.orgName = this.depName = ''
            },
            () => {}
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

<style lang="less">
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
