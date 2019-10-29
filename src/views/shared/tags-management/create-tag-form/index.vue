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
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标签类别">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="单位标签" value="shanghai"></el-option>
                <el-option label="部门标签" value="beijing"></el-option>
                <el-option label="个人标签" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item v-if="flagdata.flag!==1" label="父级标签">
              <el-input disabled="" v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleClose">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'CreateTagForm',
  props: ['createTagDialogVisible', 'createFlag', 'flagdata'],
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
    onSubmit () {
      console.log('submit!')
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
