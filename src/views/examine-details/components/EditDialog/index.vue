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
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6}"
        v-model="textareaVal"
        :placeholder="`请输入${dialogTitle}`">
      </el-input>
      <el-row :gutter="20">
        <el-col :span="12" :offset=8>
          <div style="margin-top: 20px">
            <el-button  type="primary" @click="passExamine">确认</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex'
import { api, urlNames } from '@src/api'

export default {
  props: ['visible', 'close', 'dialogTitle'],
  components: {},
  data () {
    return {
      textareaVal: ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    passExamine () {
      this.addDialogVisible = true
    },
    closeDialog () {
      this.$emit('close')
    },
    submitForm (form) {
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
          api[urlNames['sendEditRightsInfo']](data).then((res) => {
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
    }
  }
}
</script>
