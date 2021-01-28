<template>
    <div class="related-manage">
        <!-- 创建账号弹窗 -->
        <el-dialog
            width="40%"
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
                <el-form-item label="账号：" prop="account_number">
                    <el-input
                        placeholder="请输入账号"
                        readonly
                        v-model="createdOrUpdateForm.account_number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input
                        readonly
                        type="password"
                        show-password
                        placeholder="请输入密码"
                        v-model="createdOrUpdateForm.password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="单位名称：" prop="company">
                    <el-input
                        placeholder="请输入单位名称"
                        v-model="createdOrUpdateForm.company"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系人：" prop="contacts">
                    <el-input
                        placeholder="请输入联系人"
                        v-model="createdOrUpdateForm.contacts"
                    ></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" prop="telephone_number">
                    <el-input
                        placeholder="请输入联系电话"
                        v-model="createdOrUpdateForm.telephone_number"
                    ></el-input>
                </el-form-item>
                <el-form-item label="是否启用：" prop="is_banned">
                    <el-switch
                        :active-value="0"
                        :inactive-value="1"
                        v-model="createdOrUpdateForm.is_banned"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="备注说明：" prop="comment">
                    <el-input
                        v-model="createdOrUpdateForm.comment"
                        type="textarea"
                        placeholder="请输入..."
                    ></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: center; margin-top: -25px;" slot="footer">
                <el-button
                    type="primary"
                    @click="submitAccount('createdOrUpdateForm')"
                    >保存</el-button
                >
                <el-button @click="closeCreateDailog">取消</el-button>
            </div>
        </el-dialog>
        <div style="margin-bottom: 10px;">
            <el-button
                type="primary"
                @click="openCreateDailog('createdOrUpdateForm')"
                >创建关联</el-button
            >
        </div>
        <div class="table-box">
            <el-table :data="accountList" stripe border style="width: 100%;">
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
                    prop="account_number"
                    label="账号"
                    align="center"
                ></el-table-column>

                <el-table-column
                    prop="create_time"
                    label="创建时间"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="company"
                    label="公司/单位名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="contacts"
                    label="联系人"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="is_banned"
                    label="启用状态"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span
                            :class="
                                scope.row.is_banned === 0
                                    ? 'text-green'
                                    : 'text-red'
                            "
                            >{{
                                scope.row.is_banned === 0 ? "启用" : "禁用"
                            }}</span
                        >
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="110px">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="openEditDialog(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            size="mini"
                            type="text"
                            @click="comfirmDeleteAccount(scope.row.id)"
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
    // 验证手机号
    const validateMobile = (rule, value, callback) => {
      if (value !== '' && value) {
        const reg = /^((13[0-9])|(15[^4])|(18[0,1,2,3,5-9])|(17[0-8])|(147)(199))\d{8}$/
        reg.test(value)
          ? callback()
          : callback(new Error('请输入11位有效号码'))
      } else {
        callback()
      }
    }
    const validateContacts = (rule, value, callback) => {
      if (value !== '' && value) {
        const reg = /^[\u4e00-\u9fa5a-zA-Z_]{1,10}$/
        reg.test(value)
          ? callback()
          : callback(new Error('只能输入中英文，不超过10个字符'))
      } else {
        callback()
      }
    }
    const validateCompany = (rule, value, callback) => {
      if (value !== '' && value) {
        const reg = /^[\u4e00-\u9fa5a-zA-Z_]{1,20}$/
        reg.test(value)
          ? callback()
          : callback(new Error('只能输入中英文，不超过20个字符'))
      } else {
        callback()
      }
    }
    return {
      accountList: [],
      dialogTitle: '创建关联',
      createdOrUpdateVisiable: false,
      createdOrUpdateForm: {
        account_number: '',
        password: '',
        company: '',
        contacts: '',
        telephone_number: '',
        is_banned: 0,
        id: '',
        comment: '',
        oldState: 0
      },
      rulesOption: {
        account_number: [
          {
            required: true,
            message: '账号不能为空',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ],
        company: [
          {
            required: true,
            message: '单位名称不能为空',
            trigger: 'blur'
          },
          { validator: validateCompany, trigger: 'blur' }
        ],
        contacts: [
          {
            required: true,
            message: '联系人不能为空',
            trigger: 'blur'
          },
          { validator: validateContacts, trigger: 'blur' }
        ],
        telephone_number: [
          {
            required: true,
            message: '联系电话不能为空',
            trigger: 'blur'
          },
          { validator: validateMobile, trigger: 'blur' }
        ],
        is_banned: [
          {
            required: true,
            message: '联系电话不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.getGrid()
  },
  methods: {
    // 获取关联类表
    generateRandomAccount () {
      this.createdOrUpdateForm.account_number = ''
      this.createdOrUpdateForm.password = ''
      const lib =
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@'
      const libLength = lib.length
      const usernameLength = 5
      const passwordlength = 32

      for (let i = 0; i < usernameLength; i++) {
        this.createdOrUpdateForm.account_number +=
                    lib[Math.floor(Math.random() * libLength)]
      }
      this.createdOrUpdateForm.account_number +=
                '' + new Date().getTime()
      for (let i = 0; i < passwordlength; i++) {
        this.createdOrUpdateForm.password +=
                    lib[Math.floor(Math.random() * libLength)]
      }
    },
    getGrid () {
      const data = {
        page: this.page.current,
        limit: this.page.limit
      }
      api[urlNames.findAccountNumberList](data).then(
        (res) => {
          this.accountList = res.data
          this.page.total = res.total
        },
        () => {
          this.accountList = []
          this.page.total = 0
        }
      )
    },
    openCreateDailog (formName) {
      this.resetForm()
      this.generateRandomAccount()
      this.dialogTitle = '创建关联'
      this.createdOrUpdateVisiable = true
      this.$nextTick(() => {
        this.$refs.createdOrUpdateForm.clearValidate()
      })
    },
    closeCreateDailog () {
      this.createdOrUpdateVisiable = false
    },
    openEditDialog (row) {
      this.dialogTitle = '编辑账号'
      this.createdOrUpdateForm.id = row.id
      this.createdOrUpdateForm.account_number = row.account_number
      this.createdOrUpdateForm.password = row.password
      this.createdOrUpdateForm.company = row.company
      this.createdOrUpdateForm.contacts = row.contacts
      this.createdOrUpdateForm.telephone_number = row.telephone_number
      this.createdOrUpdateForm.is_banned = row.is_banned
      this.oldState = row.is_banned
      this.createdOrUpdateVisiable = true
      this.$nextTick(() => {
        this.$refs.createdOrUpdateForm.clearValidate()
      })
    },
    submitAccount (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let apiUrl = ''
          if (this.createdOrUpdateForm.id === '') {
            apiUrl = 'createSystemMessage'
          } else {
            apiUrl = 'updatesSystemMessage'
            if (this.oldState === 1) {
              this.createdOrUpdateForm.next = 2
            } else {
              if (this.createdOrUpdateForm.is_banned === 1) {
                this.createdOrUpdateForm.next = 1
              } else {
                this.createdOrUpdateForm.next = 2
              }
            }
          }
          api[urlNames[apiUrl]](this.createdOrUpdateForm).then(
            (res) => {
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
            },
            (msg) => {
              if (msg.error === 8006) {
                this.handleRow(
                  '该账号正在使用，禁用后会导致与之关联的应用和数据共享任务失败！您确定要禁用吗？',
                  this.createdOrUpdateForm,
                  this.saveUpdate
                )
              } else {
                this.$message.error('网络错误，请稍后重试')
              }
            }
          )
        } else {
          this.$message.warning('请根据提示填写相关字段')
        }
      })
    },
    saveUpdate () {
      const apiUrl = 'updatesSystemMessage'
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
    comfirmDeleteAccount (id) {
      this.handleRow('确定要删除该数据吗？', id, this.deleteAccount)
    },
    deleteAccount (id) {
      api[urlNames.deleteAccountNumber]({ id }).then(
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
      this.createdOrUpdateForm = {
        account_number: '',
        password: '',
        company: '',
        contacts: '',
        telephone_number: '',
        is_banned: 0,
        id: '',
        comment: '',
        oldState: 0
      }
    }
  }
}
</script>
