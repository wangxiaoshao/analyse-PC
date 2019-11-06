<template>
  <div class="dic-edit-dialog">
    <el-dialog :title="dialogTitle"
               :fullscreen="false"
               :visible.sync="visible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="dialog-close" @click="closeDialog"><i class="el-icon-close"></i></div>
      <el-scrollbar :style="scrollStyle">
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 请输入名称</el-button>
        <el-tag
          :key="index"
          v-for="(tag, index) in dynamicTags"
          :disable-transitions="false">
          <span :style="{marginRight: '15px', color: '#95c9ff'}">{{index + 1}}</span>
          <span>{{tag}}</span>
        </el-tag>
      </el-scrollbar>
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
      dynamicTags: ['正厅级', '副厅级'],
      inputVisible: false,
      inputValue: '',
      formLabelWidth: '120px',
      stateValue: ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapState(['app']),
    scrollStyle () {
      return {
        maxHeight: this.$store.state.app.windowHeight / 2 + 'px'
      }
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      });
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    passExamine () {
      this.dialogVisible = true
    },
    closeDialog () {
      this.$emit('close', 'dicDialogVisible')
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
<style lang="less">
  @import "index";
</style>
