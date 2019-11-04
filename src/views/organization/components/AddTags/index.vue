<template>
  <el-dialog title="选择标签" :visible.sync="tagsFlag" :showClose="false">
    <i class="el-icon-close tag-close" @click="close"></i>
    <el-input placeholder="请输入内容" v-model="tagKeyWord" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <div class="tag-content">
      <el-checkbox-group
        v-model="checkTagGroup">
        <el-checkbox
          v-for="item in searchTags"
          border
          :label="item.name"
          :title="item.name"
          :key="item.name"
        >{{item.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['tagsFlag'],
  data () {
    return {
      tagKeyWord: '',
      checkTagGroup: [],
      searchTags: [],
      getCheckTags: []
    }
  },
  methods: {
    close () {
      this.$emit('getFlag', false)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
