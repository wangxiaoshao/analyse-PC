<template>
  <div class="content-list">
    <!--解除兼职-->
    <el-dialog
      title="填写解除挂职说明"
      :visible.sync="removeFlag"
      width="40%">
      <span class="remove-des">您确定解除该人员在本单位的挂职身份？解除之后该人员将无法使用该身份下的账号使用应用系统。</span>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="申请原因" prop="reason">
          <el-input type="textarea" v-model="ruleForm.reason"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="removeFlag = false">取 消</el-button>
          <el-button type="primary" @click="submitRemoveDuty(ruleForm)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--人员调出弹窗-->
    <el-dialog
      title="填写调出说明"
      :visible.sync="calloutFlag"
      width="50%"
      :before-close="handleClose">
      <el-form :inline="true" :model="formCallout" :rules="rulesCallou" ref="formCallout" class="demo-form-inline">
        <el-form-item label="调出单位">
          <el-select v-model="formCallout.orgId" placeholder="请选择调出单位">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调出部门">
          <el-select v-model="formCallout.deptId" placeholder="请选择调出部门">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调出原因" prop="formInline.reason">
          <el-input type="textarea" v-model="formCallout.reason"></el-input>
        </el-form-item>
      </el-form>
    <el-button @click="calloutFlag = false">取 消</el-button>
    <el-button type="primary" @click="submitCalloutForm(rulesCallou)">确 定</el-button>
    </el-dialog>
    <div class="button-wrap">
      <el-button @click="sortList">调整排序</el-button>
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
      <el-table-column prop="description" label="序号" width="60" align="center">
        <template slot-scope="scope">
          <i class="sortBtnDo menu-icon fa fa-bars"  v-if="sortFlag" style="font-size: 25px"></i>
          <span :title="scope" v-else>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="学历" prop="qualification"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="启用状态" prop="removed" align="center">
        <template slot-scope="scope">
          <span class="text-able" v-show="scope.row.removed">启用</span>
          <span class="text-disable" v-show="!scope.row.removed">停用</span>
        </template>
      </el-table-column>
      <el-table-column prop="act" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData4)"
            type="text"
            size="small">
            修改
          </el-button>
          <el-button
            @click.native.prevent="calloutDialog(scope.row)"
            type="text"
            size="small">
            调出
          </el-button>
          <el-button
            @click.native.prevent="removeDuty(scope.row)"
            type="text"
            size="small">
            解除兼职
          </el-button>
          <el-button
            @click.native.prevent="removePerson(scope.row)"
            type="text"
            size="small">
            解除挂职
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
      :page-size="page.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="contentPage.total">
    </el-pagination>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable],
  props: ['contentPage', 'id', 'sortFlag', 'type'],
  data () {
    return {
      loading: true,
      list: [],
      sortListFlag: false,
      isShowEditFlag: true,
      removeFlag: false,
      calloutFlag: false,
      ruleForm: {
        uid: '',
        type: '',
        reason: ''
      },
      // 人员调出表单
      formCallout: {
        uid: '',
        deptId: '',
        orgId: '',
        reason: ''
      },
      rulesCallou: {
        rules: {
          reason: [
            { required: true, message: '请填写申请原因', trigger: 'blur' }
          ],
          deptId: [
            { required: true, message: '请选择调出部门', trigger: 'blur' }
          ],
          orgId: [
            { required: true, message: '请选择调出单位', trigger: 'blur' }
          ]
        }
      },
      rules: {
        reason: [
          { required: true, message: '请填写申请原因', trigger: 'blur' }
        ]
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
    getGrid () {
      this.loading = true
      let bindId = this.$route.params.bindId
      if (this.type === 3) {
        let data = {
          deptId: bindId,
          page: this.contentPage.current,
          pageSize: this.contentPage.limit
        }
        api[urlNames['findDepartmentMembers']](data).then((res) => {
          this.loading = false
          this.list = res.data
        }, () => {
          this.loading = false
          this.list = []
          this.contentPage.total = 0
        })
      }
      if (this.type === 2) {
        let data = {
          orgId: bindId,
          page: this.contentPage.current,
          pageSize: this.contentPage.limit
        }
        api[urlNames['findOrganizationMembers']](data).then((res) => {
          this.loading = false
          this.list = res.data
        }, () => {
          this.loading = false
          this.list = []
          this.contentPage.total = 0
        })
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
      api[urlNames['setUserSort']](data).then((res) => {
        this.$message.success(`保存成功`)
        this.cancelSort()
      }, () => {
        this.$message.error(`保存失败，请重试`)
      })
    },
    handleSizeChange (val) {
      this.contentPage.current = 1
      this.contentPage.limit = val
      this.getGrid()
      this.$emit('getPage', this.contentPage)
    },
    handleCurrentChange (val) {
      this.contentPage.current = val
      this.getGrid()
      this.$emit('getPage', this.contentPage)
    },
    cancelSort () {
      this.$emit('cancel', false)
    },
    sortList () {
      this.$emit('cancel', true)
    },
    calloutDialog (row) {
      this.calloutFlag = true
    },
    removePerson (row) {
      this.removeFlag = true
      this.formCallout.uid = row.id
      // 当前row.id
    },
    removeDuty (row) {
      this.removeFlag = true
      this.ruleForm.uid = row.id
      this.ruleForm.type = row.type
    },
    // 提交调出人员
    submitCalloutForm (rulesCallou) {
      this.$refs[rulesCallou].validate((valid) => {
        if (valid) {
          api[urlNames['calloutUser']](this.formCallout).then((res) => {
            this.$message.success(`调出成功`)
            this.calloutFlag = false
            console.log(res)
          }, (error) => {

          })
        }
      })
    },
    // 解除兼职
    submitRemoveDuty (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          api[urlNames['removeDuty']](this.formCallout).then((res) => {
            this.$message.success(`解除成功`)
            this.calloutFlag = false
            console.log(res)
          }, (error) => {

          })
        }
      })
    }
  },
  watch: {
    sortFlag: {
      handler (val) {
        const tbody = document.querySelector('#personTable tbody')
        const items = this.list
        if (val) {
          Sortable.create(tbody, {
            handle: '.sortBtnDo',
            animation: 150,
            onUpdate: function (evt) {
              const newIndex = evt.newIndex
              const oldIndex = evt.oldIndex
              const $li = tbody.children[newIndex]
              const $oldLi = tbody.children[oldIndex]
              if (newIndex > oldIndex) {
                tbody.insertBefore($li, $oldLi)
              } else {
                tbody.insertBefore($li, $oldLi.nextSibling)
              }
              const item = items.splice(oldIndex, 1)
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
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
