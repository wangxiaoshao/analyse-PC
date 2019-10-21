<template>
  <div class="application-edit-dialog">
    <el-dialog custom-class="edit-dialog"
               :fullscreen="true"
               :visible.sync="visible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="dialog-close" @click="closeDialog"><i class="el-icon-close"></i></div>
      <el-scrollbar :style="scrollStyle">
        <h2 class="dialog-title">{{this.current ? '编辑应用' : '新增应用'}}</h2>
        <!--表单-->
        <el-form class="edit-form" :model="editForm" :rules="rules" ref="editForm">
          <el-row :gutter="15">
            <el-col :span="12">
              <el-form-item label="应用名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="editForm.name" :minlength="1" :maxlength="50" placeholder="请输入应用名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应用简称" prop="shortName" :label-width="formLabelWidth">
                <el-input v-model="editForm.shortName" :minlength="1" :maxlength="50" placeholder="请输入应用简称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应用简介" prop="description" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="5"
                  v-model="editForm.description"
                  :minlength="1"
                  :maxlength="1000"
                  placeholder="请输入应用简介"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="应用图标" prop="logo" :label-width="formLabelWidth">
                <el-upload
                  :class="file || editForm.logo?'has-img':''"
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-change="fileChange">
                  <i slot="default" class="el-icon-plus"></i>
                </el-upload>
                <ul v-if="file || editForm.logo" class="el-upload-list el-upload-list--picture-card">
                  <li class="el-upload-list__item">
                    <img :src="file?file.url:editForm.logo"
                         class="el-upload-list__item-thumbnail">
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-delete" @click="removeFile"><i
                        class="el-icon-delete"></i></span>
                    </span>
                  </li>
                </ul>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电脑端链接" prop="dataUrl" :label-width="formLabelWidth">
                <el-input v-model="editForm.dataUrl" :minlength="1" :maxlength="480" placeholder="请输入电脑端链接"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="移动端链接" prop="mobileUrl" :label-width="formLabelWidth">
                <el-input v-model="editForm.mobileUrl" :minlength="1" :maxlength="480" placeholder="请输入移动端链接"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="建设单位" prop="developOrgId" :label-width="formLabelWidth">
                <div @click="openChoseParentDialog">
                  <el-input class="chose-parent" v-model="editForm.develop" :readonly="true"
                            placeholder="请选择建设单位"></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="厂商信息" prop="info" :label-width="formLabelWidth">
                <el-input v-model="editForm.info" :minlength="1" :maxlength="480"
                          placeholder="请输入厂商信息"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="运维服务电话" prop="serverMobile" :label-width="formLabelWidth">
                <el-input v-model="editForm.serverMobile" :minlength="1" :maxlength="50"
                          placeholder="请输入运维服务电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人" prop="contact" :label-width="formLabelWidth">
                <el-input v-model="editForm.contact" :minlength="1" :maxlength="50" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="contactMobile" :label-width="formLabelWidth">
                <el-input v-model="editForm.contactMobile" :minlength="1" :maxlength="50"
                          placeholder="请输入联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="排序权重" prop="sort" :label-width="formLabelWidth">
                <el-input-number v-model="editForm.sort" :min="0" :max="99999" label="排序权重"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <p class="tip-msg">数值越大，排序越靠前</p>
            </el-col>
            <el-col :span="24">
              <el-form-item label="开通范围" prop="areaId" :label-width="formLabelWidth">
                <el-select v-model="editForm.areaId"
                           multiple
                           filterable
                           clearable
                           placeholder="请选择地区">
                  <el-option
                    v-for="item in areaList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.code.toString()">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="confirm-btn">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="danger" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-form>
      </el-scrollbar>

      <!--二次弹框-->
      <el-dialog custom-class="chose-parent-dialog"
                 title="选择建设单位"
                 :visible.sync="choseParentDialogVisible"
                 width="480px"
                 :fullscreen="true"
                 append-to-body>
        <el-scrollbar :style="scrollStyle">
          <div class="org-tree-content">
            <el-tree
              node-key="id"
              ref="departmentTree"
              lazy
              :load="loadNode"
              @node-click="handleNodeClick"
              :expand-on-click-node="false">
              <span class="department-tree-node" slot-scope="{ node, data }">{{data.name }}</span>
            </el-tree>
            <div class="confirm-btn">
              <el-button @click="choseParentDialogVisible = false">取 消</el-button>
              <el-button type="danger" @click="confirmChose" :disabled="!this.currentChoseNode">确 定</el-button>
            </div>
            <!--            <el-tree class="parent-tree"-->
            <!--                     :data="orgList"-->
            <!--                     node-key="menuId"-->
            <!--                     :props="defaultProps"-->
            <!--                     @node-click="handleNodeClick"-->
            <!--                     default-expand-all-->
            <!--                     ref="editParentTree"-->
            <!--                     :expand-on-click-node="false">-->
            <!--              <el-row class="custom-tree-node" slot-scope="{ node, data }">-->
            <!--                <span v-if="data.type!==1 && data.type!==2">{{data.name}}<span class="menu-type text-blue">目录</span></span>-->
            <!--                <span v-if="data.type===1">{{data.name}}<span class="menu-type text-green">菜单</span></span>-->
            <!--              </el-row>-->
            <!--            </el-tree>-->
          </div>
        </el-scrollbar>
      </el-dialog>

    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex'
import { api, urlNames } from '@src/api'

export default {
  props: ['current', 'refreshList', 'visible', 'close', 'areaList'],
  components: {},
  data () {
    return {
      file: null,
      formLabelWidth: '120px',
      defaultForm: {
        type: 'system',
        id: '',
        name: '', // 名称
        shortName: '', // 简称
        description: '', // 简介
        logo: '', // 图标
        develop: '', // 建设单位
        developOrgId: '',
        dataUrl: '', // 应用链接
        mobileUrl: '',
        info: '', // 厂商
        serverMobile: '', // 运维服务电话
        contact: '', // 联系人
        contactMobile: '', // 联系电话
        areaId: [], // 开通范围
        sort: 0
      },
      currentChoseNode: null,
      orgList: [],
      defaultProps: {},
      choseParentDialogVisible: false,
      rules: {
        name: [
          { required: true, message: '', trigger: 'blur' }
        ],
        shortName: [
          { required: true, message: '', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '', trigger: 'blur' }
        ],
        dataUrl: [
          { required: true, message: '', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '', trigger: 'blur' }
        ],
        serverMobile: [
          { required: true, message: '', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, message: '', trigger: 'blur' }
        ],
        developOrgId: [
          { required: true, message: '', trigger: 'blur' }
        ],
        areaId: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapState(['app']),
    editForm () {
      if (this.current) {
        return this.current
      } else {
        return this.defaultForm
      }
    },
    scrollStyle () {
      return {
        height: this.$store.state.app.windowHeight - 30 + 'px'
      }
    }
  },
  methods: {
    closeDialog () {
      this.file = null
      if (this.current) {
        this.$refs.editForm.clearValidate()
      } else {
        this.$refs.editForm.resetFields()
      }
      this.$emit('close')
    },
    fileChange (file) {
      if (file) {
        this.file = file
      } else {
        this.file = null
      }
    },
    removeFile () {
      this.file = null
      this.editForm.logo = ''
    },
    submitForm (form) {
      if (!this.file && !this.editForm.logo) {
        this.$message('请先上传应用图标')
        return
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          let data = new FormData()
          let keys = Object.keys(this.editForm)
          let len = keys.length
          for (let i = 0; i < len; i++) {
            let key = keys[i]
            let value = this.editForm[key]
            if (value) {
              data.append(key, value)
            }
          }
          if (this.file) {
            data.append('file', this.file.raw)
          }
          api[urlNames['editApplication']](data).then((res) => {
            this.$message({
              message: this.current ? '修改成功' : '添加成功',
              type: 'success'
            })
            this.$emit('refreshList')
            this.closeDialog()
          }, (error) => {

          })
        }
      })
    },
    openChoseParentDialog () {
      this.currentChoseNode = null
      this.choseParentDialogVisible = true
    },
    handleNodeClick (data) {
      this.currentChoseNode = data
    },
    loadNode (node, resolve) {
      if (node.level === 0) {
        this.asyncDepartment(resolve)
      }
      if (node && node.data && node.data.id) {
        this.asyncDepartment(resolve, node.data.id)
      }
    },
    async asyncDepartment (resolve, currentId) {
      let arr = []
      await api[urlNames['getDepartmentNodes']]({
        parentId: currentId
      }).then(res => {
        if (res && res.result) {
          arr = [...res.result]
        } else {
          arr = []
        }
        resolve(arr)
      })
    },
    confirmChose () {
      if (this.currentChoseNode) {
        this.editForm.developOrgId = this.currentChoseNode.id
        this.editForm.develop = this.currentChoseNode.name
      }
      this.choseParentDialogVisible = false
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>
