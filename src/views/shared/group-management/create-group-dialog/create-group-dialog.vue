<template>
  <div class="create-group">
    <el-dialog
      title="创建分组"
      custom-class="edit-dialog"
      :visible.sync="creategroupdialogVisible"
      :fullscreen="true"
      center
      :before-close="handleClose">
      <div class="panel">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="分组名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="分组描述">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="选择单位">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="colseDialog">取 消</el-button>
    <el-button type="primary" @click="colseDialog">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreateGroupDialog',
  props: ['creategroupdialogVisible'],
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    // 提交表单
    onSubmit () {
      console.log('submit!')
    },
    colseDialog () {
      this.$emit('close')
    },
    handleClose (done) {
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
