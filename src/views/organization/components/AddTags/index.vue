<template>
  <el-dialog title="选择标签" :visible.sync="openSearchFlag" :showClose="false">
    <i class="el-icon-close tag-close" @click="close"></i>
    <el-input placeholder="请输入内容" v-model="tagKeyWord" @change="searchTag(addInfo.type,tagKeyWord)" class="input-with-select">
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
        <el-button type="primary" @click="sendTags">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['addInfo', 'openSearchFlag'],
  data () {
    return {
      addFlag: false,
      tagKeyWord: '',
      checkTagGroup: [],
      searchTags: [],
      getCheckTags: [],
      sendInfo: {}
    }
  },
  created () {
    this.addFlag = this.sendInfo.searchFlag
    console.log(this.addInfo)
  },
  methods: {
    close () {
      /* this.addFlag = false
      this.sendInfo = {
        searchFlag: false,
        id: this.addInfo.id
      }
      this.$emit('addInfo', this.sendInfo) */
      this.$emit('close', false)
    },
    // 搜索标签
    searchTag (type, name) {
      api[urlNames['findLabelByType']]({
        type: type,
        name: name
      }).then((res) => {
        this.searchTags = res.data
      }, (error) => {

      })
    },
    sendTags () {
      this.$emit('getTag', this.checkTagGroup)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
