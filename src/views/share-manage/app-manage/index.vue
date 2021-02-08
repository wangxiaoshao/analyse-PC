<template>
    <div class="app-manage">
        <!-- 创建账号弹窗 -->
        <el-dialog
            width="50%"
            :title="dialogTitle"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :visible.sync="createdOrUpdateVisiable"
            center
        >
            <el-form
                label-width="100px"
                :model="createdOrUpdateForm"
                :rules="rulesOption"
                ref="createdOrUpdateForm"
            >
                <el-form-item label="单位名称：" prop="company_id">
                    <el-select
                        style="width: 100%;"
                        v-model="companyParams"
                        filterable
                        @change="companyChange"
                        :disabled="isEdit==='detial'"
                        value-key="company_id"
                        placeholder="请选择单位名称"
                    >
                        <el-option
                            v-for="item in companyList"
                            :key="item.company_id"
                            :label="item.company"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="应用名称：" prop="system_name">
                    <el-input
                     :readonly="isEdit==='detial'"
                        placeholder="请输入应用名称"
                        v-model="createdOrUpdateForm.system_name"
                    ></el-input>
                </el-form-item>
                <template v-if="isEdit!=='detial'">
                <el-form-item label="表格名称：" prop="table_name">
                  <div class="input-item">
                    <el-input
                        placeholder="请输入表格名称"
                        v-model="createdOrUpdateForm.table_name"
                        :disabled="createdOrUpdateForm.system_id != ''"
                    >
                        <span
                            slot="prepend"
                            v-if="createdOrUpdateForm.system_id === ''"
                            >{{ table_header }}</span>
                    </el-input>

                    <div class="add_box" >
                       <i class="el-icon-circle-plus-outline" @click="addTableInput" title="添加表格"></i>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item  :prop="'addTableList.' + index + '.value'"  v-for="(item,index) in createdOrUpdateForm.addTableList" :key="index" :rules="rulesOption.table_name">
                  <div class="table-form-item">
                    <el-input
                        placeholder="请输入表格名称"
                        v-model="item.value"
                        :disabled='item.notAdd'
                    >
                        <span
                            slot="prepend"
                             v-if="!item.notAdd"
                            >{{ table_header }}</span
                        >
                    </el-input>
                    <div class="delete_box"><i class="el-icon-circle-close" title="删除表格" @click="deleteTableInput(index,item)"></i></div>
                  </div>
                </el-form-item>
                </template>
                <el-form-item label="表格名称：" prop="table_name" v-else>
                  <el-row>
                    <el-col :span="12" v-for="(item,index) in detialTableList" :key="index" :style="index%2===0?'padding-right:5px;margin-bottom:5px':'margin-bottom:5px'">
                      <el-input
                          placeholder="请输入表格名称"
                          v-model="item.value"
                          readonly
                      >
                      <span
                            slot="prepend"
                            >表{{ index+1 }}</span>
                      </el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="是否启用：" prop="is_banned">
                    <el-switch
                    :disabled="isEdit==='detial'"
                        active-value="0"
                        inactive-value="1"
                        v-model="createdOrUpdateForm.is_banned"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="备注说明：" prop="comment">
                    <el-input
                     :readonly="isEdit==='detial'"
                        v-model="createdOrUpdateForm.comment"
                        type="textarea"
                        placeholder="请输入..."
                    ></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center; margin-top: -25px;" slot="footer">
              <template v-if="isEdit!=='detial'">
                <el-button
                    type="primary"
                    @click="createdOrUpdateApp('createdOrUpdateForm')"
                    >保存</el-button
                >
                <el-button @click="closeCreateDailog">取消</el-button>
                </template>
                <el-button
                v-else
                    type="primary"
                    @click="closeCreateDailog"
                    >确定</el-button
                >
            </div>
        </el-dialog>
        <div style="margin-bottom: 10px;">
            <el-button
                type="primary"
                @click="openCreateDailog('createdOrUpdateForm')"
                >创建应用</el-button
            >
        </div>
        <div class="table-box">
            <el-table :data="applyList" stripe border style="width: 100%;">
                <template slot="empty">
                    <div class="empty">
                        <p>
                            <img
                                class="data-pic"
                                src="@src/common/images/no-data1.png"
                                alt=""
                            />
                        </p>
                        <p><span style="padding-left: 8px;">暂无数据</span></p>
                    </div>
                </template>
                <el-table-column
                    prop="systemName"
                    label="应用名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="company"
                    label="公司名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="tableNumber"
                    label="表单数量"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="contactName"
                    label="联系人"
                    align="center"
                ></el-table-column>
                <el-table-column prop="state" label="启用状态" align="center">
                    <template slot-scope="scope">
                        <span>{{
                            parseInt(scope.row.is_banned) === 0
                                ? "启用"
                                : "禁用"
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="openEditDialog(scope.row,'edit')"
                            >编辑</el-button
                        >
                         <el-button
                            size="mini"
                            type="text"
                            @click="openEditDialog(scope.row,'detial')"
                            >详情</el-button
                        >
                        <el-button
                            size="mini"
                            type="text"
                            @click="comfirmDeleteApp(scope.row.systemId)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="page.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total"
            ></el-pagination>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from '@src/api'
import handleTable from '@src/mixins/handle-table'
export default {
  mixins: [handleTable],
  data () {
    const validateTableName = (rule, value, callback) => {
      if (value === '') {
        callback(
          new Error(
            '表格名称不能为空，名称前缀已固定为logger_server_'
          )
        )
      } else {
        if (this.createdOrUpdateForm.system_id === '') {
          const reg = /^[a-zA-Z]{4,20}$/
          reg.test(value)
            ? callback()
            : callback(
              new Error(
                '仅允许输入大小写字母，不能有空格和特殊字符，长度为4-20的字符'
              )
            )
          return
        }

        callback()
      }
    }
    return {
      loading: false,
      companyParams: {},
      selectLoading: false,
      table_header: 'logger_server_',
      applyList: [],
      companyList: [],
      dialogTitle: '创建应用',
      createdOrUpdateVisiable: false,
      name1: '',
      createdOrUpdateForm: {
        companyName: '',
        system_name: '',
        table_name: '',
        is_banned: 0,
        comment: '',
        company_id: '',
        system_id: '',
        addTableList: []
      },
      oldState: 0,
      timeout: null,
      rulesOption: {
        company_id: [
          {
            required: true,
            message: '单位名称不能为空',
            trigger: ['blur', 'change']
          }
        ],
        system_name: [
          {
            required: true,
            message: '应用名称不能为空',
            trigger: 'blur'
          }
        ],
        table_name: [
          {
            required: true,
            message: '表格名称不能为空，名称前缀已固定为logger_server_',
            trigger: 'blur'
          },
          { validator: validateTableName, trigger: 'blur' }
        ]
      },
      detialTableList: [],
      isEdit: ''
    }
  },
  created () {
    this.getInfoByCompanyName()
    this.getGrid()
  },
  methods: {
    getGrid () {
      const data = {
        page: this.page.current,
        limit: this.page.limit
      }
      api[urlNames.findSystemTableMessage](data).then(
        (res) => {
          this.applyList = res.data
          this.page.total = res.total
        },
        () => {
          this.applyList = []
          this.page.total = 0
        }
      )
    },
    getInfoByCompanyName () {
      this.loading = true
      api[urlNames.getSystemId]().then(
        (res) => {
          this.companyList = res.data
        },
        () => {
          this.companyList = []
        }
      )
    },
    addTableInput () {
      this.createdOrUpdateForm.addTableList.push({ value: '' })
    },
    deleteTableInput (index, item) {
      if (item.notAdd) {
        const data = {
          name: item.value,
          index: index
        }
        this.handleRow('删除后该表格将从数据库里面移除，确定要删除该表格吗？', data, this.deleteTableByName)
      } else {
        this.createdOrUpdateForm.addTableList.splice(index, 1)
      }
    },
    deleteTableByName (data) {
      api[urlNames.deleteTableByName]({ tableName: data.name }).then(
        (res) => {
          if (res) {
            this.createdOrUpdateForm.addTableList.splice(data.index, 1)
            this.getGrid()
            this.$message.success('操作成功')
          }
        },
        () => {
          this.$message.error('操作失败，请稍后重试')
        }
      )
    },
    companyChange (val) {
      this.createdOrUpdateForm.company_id = val.company_id
      this.createdOrUpdateForm.companyName = val.company
    },
    openCreateDailog (formName) {
      this.resetForm()
      this.dialogTitle = '创建应用'
      this.createdOrUpdateVisiable = true
      this.$nextTick(() => {
        this.$refs.createdOrUpdateForm.clearValidate()
      })
    },
    closeCreateDailog () {
      this.createdOrUpdateVisiable = false
    },
    openEditDialog (row, type) {
      this.resetForm()
      if (type === 'edit') {
        this.dialogTitle = '编辑应用'
      } else {
        this.dialogTitle = '应用详情'
      }

      // const tableNameList = ['table1', 'table2', 'table3']
      // row.tableNameList = tableNameList
      this.isEdit = type
      row.tableNameList.forEach((name, index) => {
        if (index !== 0) {
          this.createdOrUpdateForm.addTableList.push({ value: name, notAdd: true })
        }
        this.detialTableList.push({ value: name, notAdd: true })
      })
      this.companyParams.company_id = row.companyId
      this.createdOrUpdateForm.company_id = row.companyId
      this.createdOrUpdateForm.system_id = row.systemId
      this.createdOrUpdateForm.companyName = row.company
      // this.createdOrUpdateForm.table_name = row.tableName
      this.createdOrUpdateForm.table_name = row.tableNameList[0]
      this.createdOrUpdateForm.system_name = row.systemName
      this.createdOrUpdateForm.is_banned = row.is_banned
      this.oldState = row.is_banned
      this.createdOrUpdateForm.comment = row.comment
      this.createdOrUpdateVisiable = true
      this.$nextTick(() => {
        this.$refs.createdOrUpdateForm.clearValidate()
      })
    },
    createdOrUpdateApp (form) {
      let apiUrl = ''
      const data = {
        company: this.createdOrUpdateForm.companyName,
        system_name: this.createdOrUpdateForm.system_name,
        tableNameList: [],
        // table_name: this.createdOrUpdateForm.table_name,
        is_banned: this.createdOrUpdateForm.is_banned,
        comment: this.createdOrUpdateForm.comment,
        company_id: this.createdOrUpdateForm.company_id,
        system_id: this.createdOrUpdateForm.system_id
      }
      let flag = false
      this.createdOrUpdateForm.addTableList.forEach(item => {
        if (item.value === '') {
          flag = true
        }
      })
      if (flag) {
        this.$message.warning('请填写完所有表格名称或删除多余表格字段')
        return false
      }
      const tableNameAry = []
      this.createdOrUpdateForm.addTableList.forEach(item => {
        if (!item.notAdd) {
          tableNameAry.push('logger_server_' + item.value)
        }
      })
      data.tableNameList = tableNameAry
      if (this.createdOrUpdateForm.system_id === '') {
        apiUrl = 'createTable'

        data.table_name =
                    this.table_header + this.createdOrUpdateForm.table_name
      } else {
        apiUrl = 'updateSystemTableMessage'
        console.log(this.oldState)
        if (parseInt(this.oldState) === 1) {
          data.next = 2
        } else {
          if (parseInt(this.createdOrUpdateForm.is_banned) === 1) {
            data.next = 1
          } else {
            data.next = 2
          }
        }
      }
      this.submitForm(form, apiUrl, data)
    },
    submitForm (form, apiUrl, data) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.createdOrUpdateForm.system_id === '') {
            data.tableNameList.unshift('logger_server_' + this.createdOrUpdateForm.table_name)
          }
          console.log(data.tableNameList, ' data.tableNameList')
          api[urlNames[apiUrl]](data).then(
            (res) => {
              if (res.status === 0) {
                this.closeCreateDailog()
                this.getGrid()
                this.$message.success(
                  this.createdOrUpdateForm.system_id === ''
                    ? '创建成功'
                    : '编辑成功'
                )
              } else {
                this.$message.warning('操作失败，请稍后再试')
              }
            },
            (msg) => {
              if (msg.error === 8006) {
                this.handleRow(
                  '该应用正在执行数据共享任务，禁用后将会导致数据共享任务失败！您确定要禁用吗？',
                  this.createdOrUpdateForm,
                  this.saveUpdate
                )
              } else {
                this.$message.error('网络错误，请稍后重试')
              }
            }
          )
        } else {
          this.$message.warning('请根据提示填写必填字段')
        }
      })
    },
    saveUpdate () {
      const apiUrl = 'updateSystemTableMessage'
      this.createdOrUpdateForm.next = 2
      api[urlNames[apiUrl]](this.createdOrUpdateForm).then((res) => {
        if (res.status === 0) {
          this.getGrid()
          this.closeCreateDailog()
          this.$message.success(
            this.createdOrUpdateForm.id === ''
              ? '创建成功'
              : '编辑成功'
          )
        } else {
          this.$message.warning('操作失败，请稍后再试')
        }
      })
    },
    comfirmDeleteApp (systemId) {
      this.handleRow('确定要删除该数据吗？', systemId, this.deleteApp)
    },
    deleteApp (systemId) {
      api[urlNames.deleteSystemTableMessage]({ systemId }).then(
        (res) => {
          if (res) {
            this.getGrid()
            this.$message.success('删除成功')
          }
        },
        () => {
          this.$message.error('操作失败，请稍后重试')
        }
      )
    },
    resetForm () {
      this.isEdit = ''
      this.createdOrUpdateForm = {
        companyName: '',
        system_name: '',
        table_name: '',
        is_banned: '0',
        comment: '',
        company_id: '',
        system_id: '',
        addTableList: []
      }
      this.companyParams = {}
      this.detialTableList = []
    }
  }
}
</script>
<style lang="less" scoped>
.table-form-item{
//  margin-bottom: 10px;
 display: flex;
 align-items: center;
 .delete_box{
   i{
      display: block;
      font-size: 18px;
      color:#ff6247;
      margin-left: 8px;
      cursor: pointer;
   }
 }
}
.add_box{
  cursor: pointer;
  // text-align: center;
}
.input-item{
   display: flex;
 align-items: center;
 .add_box{
   i{
      display: block;
      font-size: 18px;
     color:#3997FA;
      margin-left: 8px;
      cursor: pointer;
   }
 }
}
</style>
