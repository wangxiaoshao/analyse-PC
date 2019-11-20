<template>
  <div class="choose-content">
    <el-button v-popover:popover class="choose-btn" v-if="!disabledFlag && this.$route.name !== 'PersonDetail'" @click="openPopover">选择关联系统</el-button>
    <el-popover
      ref="popover"
      width="700"
      trigger="click"
      popper-class="system-popover"
      placement="bottom-start"
    >
      <div class="app-content"  v-if="showPopover">
        <el-checkbox-group v-model="checkSystem">
          <el-checkbox
            class="app-check"
            v-for="item in appList"
            border
            :label="`${item.id}` + '|' + `${item.name}`"
            :title="item.name"
            style="width: 132px;overflow: hidden;margin: 10px"
            :key="item.id">{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <div class="popover-footer">
          <el-button type="primary" @click="sendApp">确定</el-button>
          <el-button @click="showPopover = false">取消</el-button>
        </div>
      </div>
    </el-popover>
    <el-tag
      :key="tag"
      type="info"
      v-for="tag in systemList"
      closable
      :disable-transitions="false"
      style="margin: 5px"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['disabledFlag'],
  data () {
    return {
      checkSystem: [],
      appList: [],
      showPopover: false,
      systemList: []
    }
  },
  created () {
    this.getApp()
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    getApp () {
      api[urlNames['getAppList']]().then((res) => {
        this.appList = res.data
      }, (error) => {
      })
    },
    openPopover () {
      this.showPopover = true
    },
    sendApp () {
      const appIdList = []
      this.checkSystem.forEach((item) => {
        this.systemList.push(item.split('|')[1])
        appIdList.push(item.split('|')[0])
      })
      this.$emit('get-app', appIdList)
      this.showPopover = false
    }
  }

}
</script>

<style lang="less">
  @import "index";
</style>
