<template>
    <div class="create-tag-form">
      <el-dialog
        :title="flagdata.title"
        custom-class="right-dialog"
        :visible.sync="createTagDialogVisible"
        :fullscreen="true"
        center
        width="35%"
        :before-close="handleClose">
        <div class="panel">
          <el-form ref="form" :model="labelForm" label-width="80px">
            <el-form-item label="标签类别">
              <el-select v-model="labelForm.type" placeholder="请选择分类">
                <el-option label="单位标签" :value="1"></el-option>
                <el-option label="内设机构标签" :value="2"></el-option>
                <el-option label="个人标签" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签名称">
              <el-input v-model="labelForm.name"></el-input>
            </el-form-item>
            <el-form-item v-if="flagdata.flag!==1" label="上级标签">
              <el-input disabled="" v-model="flagdata.title"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="onSubmit" :disabled="disabledBtn()">确 定</el-button>
    <el-button @click="handleClose">取 消</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import hasRight from '@src/mixins/has-right'
export default {
  name: 'CreateTagForm',
  props: ['createTagDialogVisible', 'createData', 'flagdata'],
  mixins: [hasRight],
  data () {
    return {
      rightKey: {
        1: 'labelOrgCreate',
        2: 'labelDepartmentCreate',
        3: 'labelUserCreate'
      },
      labelForm: {
        type: 2,
        parentId: '',
        name: ''
      }
    }
  },
  created () {
  },
  methods: {
    disabledBtn () {
      return !this.hasRight(this.rightKey[this.labelForm.type])
    },
    // 创建标签
    onSubmit () {
      let parentId = null
      if (this.createData.id === '' || this.createData.id === undefined) {
        parentId = '-1'
      } else {
        parentId = this.createData.id
      }
      api[urlNames['createLabel']]({
        name: this.labelForm.name,
        type: this.labelForm.type,
        parentId: parentId
      }).then((res) => {
        if (res.status === 0) {
          this.$message.success('创建成功')
          this.$emit('close')
          this.$emit('updateLabelLiat')
          this.labelForm.name = ''
        }
      })
    },
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
@import "./index";
</style>
