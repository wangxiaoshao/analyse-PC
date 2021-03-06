<template>
    <div class="app-manage">
        <!-- 创建共享应用弹窗 -->
        <el-dialog
            width="40%"
            :title="dialogTitle"
            :close-on-click-modal="false"
            :modal-append-to-body="false"
            :visible.sync="createdOrUpdateVisiable"
            center
        >
            <el-form
                label-width="120px"
                :model="createdOrUpdateForm"
                :rules="rulesOption"
                ref="createdOrUpdateForm"
            >
                <el-form-item label="应用名称：" prop="system_id">
                    <el-select
                        style="width: 100%;"
                        v-model="systemParams"
                        filterable
                        @change="systemNameSelect"
                        value-key="systemId"
                        placeholder="请选择应用"
                    >
                        <el-option
                            v-for="item in systemList"
                            :key="item.systemId"
                            :label="item.systemName"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="单位名称：" prop="company_id">
                    <el-select
                        v-model="companyParams"
                        filterable
                        value-key="companyId"
                        placeholder="请选择单位"
                        @change="companyNameSelect"
                    >
                        <el-option
                            v-for="item in companyList"
                            :key="item.companyId"
                            :label="item.company"
                            :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用：" prop="is_banned">
                    <el-switch
                        active-value="0"
                        inactive-value="1"
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
                    @click="createdOrUpdateShareData('createdOrUpdateForm')"
                    >保存</el-button
                >
                <el-button @click="closeCreateDailog">取消</el-button>
            </div>
        </el-dialog>
        <div style="margin-bottom: 10px;">
            <el-button
                type="primary"
                @click="openCreateDailog('createdOrUpdateForm')"
                >创建共享任务</el-button
            >
        </div>
        <div class="table-box">
            <el-table :data="shareDataList" stripe border style="width: 100%;">
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
                    label="共享应用名称"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="companyName"
                    label="公司/单位名称"
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
                <el-table-column
                    prop="is_banned"
                    label="启用状态"
                    align="center"
                >
                    <template slot-scope="scope">
                        <span>{{
                            scope.row.is_banned === "0" ? "启用" : "禁用"
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="150px">
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
                            @click="comfirmDeleteShareData(scope.row.shareId)"
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
    return {
      companyParams: {},
      systemParams: {},
      shareDataList: [{}],
      companyList: [],
      systemList: [],
      dialogTitle: '创建共享任务',
      createdOrUpdateVisiable: false,
      createdOrUpdateForm: {
        system_id: '',
        system_name: '',
        company_id: '',
        companyName: '',
        is_banned: '0',
        shareId: '',
        comment: ''
      },
      rulesOption: {
        system_id: [
          {
            required: true,
            message: '应用名称不能为空',
            trigger: ['blur', 'change']
          }
        ],
        company_id: [
          {
            required: true,
            message: '公司名称不能为空',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created () {
    this.getInfoBySystemName(1)
    this.getInfoBySystemName(0)
    this.getGrid()
  },
  methods: {
    getGrid () {
      const data = {
        page: this.page.current,
        limit: this.page.limit
      }
      api[urlNames.findShareList](data).then(
        (res) => {
          this.shareDataList = res.data
          this.page.total = res.total
        },
        () => {
          this.shareDataList = []
          this.page.total = 0
        }
      )
    },
    // 1 公司  0  系统 type
    getInfoBySystemName (type) {
      api[urlNames.findShareIdByName]({ type }).then((res) => {
        if (type === 1) {
          this.companyList = res.data
        } else {
          this.systemList = res.data
        }
      })
    },
    systemNameSelect (item) {
      this.createdOrUpdateForm.system_id = item.systemId
      this.createdOrUpdateForm.system_name = item.systemName
    },
    companyNameSelect (item) {
      this.createdOrUpdateForm.company_id = item.companyId
      this.createdOrUpdateForm.companyName = item.company
    },
    openCreateDailog (formName) {
      this.dialogTitle = '创建共享任务'
      this.resetForm()
      this.createdOrUpdateVisiable = true
      this.$nextTick(() => {
        this.$refs.createdOrUpdateForm.clearValidate()
      })
    },
    closeCreateDailog () {
      this.createdOrUpdateVisiable = false
    },
    openEditDialog (row) {
      this.resetForm()
      this.dialogTitle = '编辑共享任务'
      this.companyParams.companyId = row.companyId
      this.systemParams.systemId = row.systemId
      this.createdOrUpdateForm.shareId = row.shareId
      this.createdOrUpdateForm.system_name = row.systemName
      this.createdOrUpdateForm.companyName = row.companyName
      this.createdOrUpdateForm.system_id = row.systemId
      this.createdOrUpdateForm.company_id = row.companyId
      this.createdOrUpdateForm.is_banned = row.is_banned
      this.createdOrUpdateForm.comment = row.comment
      this.createdOrUpdateVisiable = true
      this.$nextTick(() => {
        this.$refs.createdOrUpdateForm.clearValidate()
      })
    },
    createdOrUpdateShareData (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const data = {
            system_id: this.createdOrUpdateForm.system_id,
            system_name: this.createdOrUpdateForm.system_name,
            company_id: this.createdOrUpdateForm.company_id,
            comment: this.createdOrUpdateForm.comment,
            is_banned: this.createdOrUpdateForm.is_banned,
            shareId: this.createdOrUpdateForm.shareId
          }
          const apiUrl =
                        this.createdOrUpdateForm.shareId === ''
                          ? 'saveShareSystemMessage'
                          : 'updateDataShare'
          api[urlNames[apiUrl]](data).then((res) => {
            if (res.status === 0) {
              this.closeCreateDailog()
              this.getGrid()
              this.$message.success(
                this.createdOrUpdateForm.shareId === ''
                  ? '创建成功'
                  : '编辑成功'
              )
            } else {
              this.$message.warning('操作失败，请稍后再试')
            }
          })
        } else {
          this.$message.warning('请根据提示填写必填字段')
        }
      })
    },
    comfirmDeleteShareData (shareId) {
      this.handleRow(
        '确定要删除该数据吗？',
        shareId,
        this.deleteShareData
      )
    },
    deleteShareData (shareId) {
      api[urlNames.deleteDataShare]({ shareId }).then(
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
        system_id: '',
        system_name: '',
        company_id: '',
        companyName: '',
        is_banned: '0',
        shareId: '',
        comment: ''
      }
      this.systemParams = {}
      this.companyName = {}
    }
  }
}
</script>
