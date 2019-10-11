<template>
  <div class="application-config-dialog">
    <el-dialog custom-class="edit-dialog"
               :fullscreen="true"
               :visible.sync="visible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="dialog-close" @click="closeDialog"><i class="el-icon-close"></i></div>
      <el-scrollbar :style="scrollStyle">
        <h2 class="dialog-title">{{this.current ? '编辑配置' : '新增配置'}}</h2>
        <!--表单-->
        <el-form :model="editForm" :rules="rules" ref="editForm" class="edit-form">
          <el-row class="edit-cnt">
            <el-col :span="24">
              <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="editForm.name" placeholder="请输入应用名称"></el-input>
              </el-form-item>
              <el-form-item label="接口地址"
                            prop="dataUrl" :label-width="formLabelWidth">
                <el-input v-model="editForm.dataUrl" :minlength="1" :maxlength="480" placeholder="请输入应用链接"></el-input>
              </el-form-item>
              <el-form-item v-show="configType !== 'content'" label="图标" prop="logo" :label-width="formLabelWidth">
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
          </el-row>
          <div class="confirm-btn">
            <el-button @click="closeDialog">取 消</el-button>
            <el-button type="danger" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-form>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import { api, urlNames } from '@src/api';

  export default {
    props: ['current', 'refreshList', 'visible', 'close', 'configType'],
    components: {},
    data() {
      return {
        file: null,
        formLabelWidth: '120px',
        defaultForm: {
          name: '',
          dataUrl: '',
          logo: ''
        },
        rules: {
          name: [
            {required: true, message: '', trigger: 'blur'},
            {min: 1, max: 500, message: '', trigger: 'blur'}
          ],
          dataUrl: [
            {required: true, message: '', trigger: 'blur'},
            {min: 1, max: 500, message: '', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      ...mapState(['app']),
      editForm() {
        if (this.current) {
          return this.current
        } else {
          return this.defaultForm
        }
      },
      scrollStyle() {
        return {
          height: this.$store.state.app.windowHeight - 30 + 'px'
        }
      }
    },
    methods: {
      closeDialog() {
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
      submitForm(form) {
        if (this.configType !=='content' && (!this.file && !this.editForm.logo)) {
          this.$message('请先上传图标')
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
            data.append('parentApp', this.$route.params.id)
            data.append('type', this.configType)
            if (this.file) {
              data.append('file', this.file.raw)
            }
            api[urlNames['editApplicationConfig']](data).then((res) => {
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
    }
  }
</script>
<style lang="less">
  @import "./index";
</style>
