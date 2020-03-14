<template>
  <div class="create-group">
    <el-dialog
      :title="creatTitle"
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
          <el-form-item label="分组所属">
            <el-select v-model="groupFrom.ownerType" placeholder="请选分组所属">
              <el-option label="本单位" :value="1"></el-option>
              <el-option label="本内设机构" :value="2"></el-option>
              <el-option label="本人" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用">
              <el-switch v-model="groupFrom.removed"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="createGroup">确 定</el-button>
       <el-button @click="colseDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
import hasRight from '@src/mixins/has-right'

export default {
  name: 'CreateGroupDialog',
  props: ['creategroupdialogVisible', 'groupFrom', 'creatTitle'],
  mixins: [hasRight],
  data () {
    return {
      rules: {
        name: [
          { required: true, message: '请输入分组名称', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    // 提交表单
    createGroup () {
      if (this.groupFrom.name.trim().length === 0) {
        this.$message.warning('请输入分组名称')
        return false
      }
      let ownerType = this.groupFrom.ownerType + 0 // 1单位、2内设机构、3个人
      if (ownerType === 1 && !this.hasRight('orgGroupCreate')) {
        this.$message.warning('您没有创建单位分组的权限')
        return false
      } else if (ownerType === 2 && !this.hasRight('departmentGroupCreate')) {
        this.$message.warning('您没有创建内设机构分组的权限')
        return false
      } else if (ownerType === 3 && !this.hasRight('userGroupCreate')) {
        this.$message.warning('您没有创建个人分组的权限')
        return false
      }
      if (this.groupFrom.id === undefined || this.groupFrom.id === '') {
        api[urlNames['createGroup']]({
          ownerType: ownerType,
          name: this.groupFrom.name,
          description: this.groupFrom.description,
          removed: this.groupFrom.removed ? 0 : 1
        }).then((res) => {
          if (res.status === 0) {
            this.colseDialog()
            this.$message.success('创建分组成功')
            this.groupFrom.name = this.groupFrom.description = ''
          }
        })
      } else {
        api[urlNames['renameGroup']]({
          id: this.groupFrom.id,
          ownerType: this.groupFrom.ownerType, // 1单位、2内设机构、3个人
          name: this.groupFrom.name,
          description: this.groupFrom.description,
          removed: this.groupFrom.removed ? 0 : 1
        }).then((res) => {
          if (res.status === 0) {
            this.colseDialog()
            this.$message.success('修改分组成功')
            this.groupFrom.name = this.groupFrom.description = ''
          }
        })
      }
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
