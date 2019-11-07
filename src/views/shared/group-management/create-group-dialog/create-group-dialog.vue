<template>
  <div class="create-group">
    <el-dialog
      title="创建分组"
      custom-class="right-dialog"
      :visible.sync="creategroupdialogVisible"
      :fullscreen="true"
      center
      :before-close="colseDialog">
      <div class="panel">
        <el-form ref="form" :rules="rules" :model="groupFrom" label-width="80px">
          <el-form-item label="分组名称" prop="name">
            <el-input v-model="groupFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="分组描述">
            <el-input v-model="groupFrom.description"></el-input>
          </el-form-item>
          <el-form-item label="选择单位">
            <el-select v-model="groupFrom.ownerType" placeholder="请选类型">
              <el-option label="单位" :value="3"></el-option>
              <el-option label="部门" :value="2"></el-option>
              <el-option label="用户" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-radio-group v-model="groupFrom.removed">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="colseDialog">取 消</el-button>
    <el-button type="primary" @click="createGroup">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'

export default {
  name: 'CreateGroupDialog',
  props: ['creategroupdialogVisible'],
  data () {
    return {
      groupFrom: {
        ownerType: 3, // 1用户、2部门、3单位
        name: '',
        description: '',
        removed: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交表单
    createGroup () {
      if (this.groupFrom.name.trim().length === 0) {
        this.$message.warning('请输入分组名称')
        return false
      }
      console.log(JSON.parse(JSON.stringify(this.groupFrom)))
      api[urlNames['createGroup']]({
        ownerType: this.groupFrom.ownerType, // 1用户、2部门、3单位
        name: this.groupFrom.name,
        description: this.groupFrom.description,
        removed: this.groupFrom.removed
      }).then((res) => {
        if (res.status === 0) {
          this.$message.success('创建分组成功')
        }
      })
    },
    colseDialog () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
