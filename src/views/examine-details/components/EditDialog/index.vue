<template>
  <div class="dic-edit-dialog">
    <el-dialog custom-class="edit-dialog"
               :fullscreen="false"
               :visible.sync="visible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="dialog-close" @click="closeDialog"><i class="el-icon-close"></i></div>
        <h2 class="dialog-title">{{dialogTitle}}</h2>
        <!--表单-->

      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="desc">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            v-model="form.desc"
            :placeholder="`请输入${dialogTitle}`">
          </el-input>
        </el-form-item>
        <el-form-item >
          <el-row :gutter="20">
          <el-col :span="12" :offset=8>
            <el-button  type="primary" @click="passExamine('form')">确认</el-button>
            <el-button @click="closeDialog('form')">取消</el-button>
          </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex'
import { api, urlNames } from '@src/api'

export default {
  props: ['visible', 'close', 'dialogTitle', 'auditResult'],
  components: {},
  data () {
    return {
      rules: {
        desc: [
          { required: true, message: `请输入${this.dialogTitle}`, trigger: 'blur' }
        ]
      },
      textareaVal: '',
      form: {
        desc: ''
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    closeDialog (form) {
      this.$refs[form].resetFields()
      this.$emit('close')
    },
    passExamine (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let obj = {
            message: this.form.desc,
            auditResult: this.auditResult,
            id: this.$route.query.id
          };
          this.$emit('close')
          api[urlNames['saveAudit']](obj).then((res) => {
            if (res && res.message === 'success') {
              // this.$emit('refreshList')
              this.$router.push({
                name: 'ApprovedDetail',
                query: {
                  id: this.$route.query.id,
                  type: this.$route.query.type
                }
              })
            }
          }, (error) => {

          })
        }
      })
    }
  }
}
</script>
