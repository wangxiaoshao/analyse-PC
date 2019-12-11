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
      v-if="showSystemList.length ===0"
      :key="tag"
      type="info"
      v-for="tag in systemList"
      closable
      :disable-transitions="false"
      style="margin: 5px"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag> <el-tag
      v-if="showSystemList.length !==0"
      :key="tag"
      type="info"
      v-for="tag in showSystemList"
      closable
      :disable-transitions="false"
      style="margin: 5px"
      @close="handleCloseDel(tag.appId, tag.id)">
      {{tag.appName}}
    </el-tag>
    <div v-if="showSystemList.length===0" style="color: #FC7049;font-size: 10px">请先填写账号和密码，否则关联系统无效</div>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
export default {
  props: ['disabledFlag', 'userAccount'],
  data () {
    return {
      checkSystem: [],
      appList: [],
      showPopover: false,
      systemList: [],
      showSystemList: []
    }
  },
  created () {
    this.getApp()
  },
  mounted () {
    this.showSystemList = this.userAccount[0].account4AppDtos
  },
  methods: {
    handleClose (tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.systemList.splice(this.systemList.indexOf(tag), 1)
      this.checkSystem.forEach((item, i) => {
        if (item.indexOf(tag) !== -1) {
          this.checkSystem.splice(i, 1)
        }
      })
    },
    handleCloseDel (appId, id) {
      let accountId = ''
      let name = ''
      this.userAccount[0].account4AppDtos.forEach(item => {
        if (item.id === id) {
          accountId = item.accountId
          name = item.appName
        }
      })
      api[urlNames['deleteAppBindAccount']]({
        accountId: accountId,
        appId: appId
      }).then((res) => {
        if (res.status === 0) {
          this.$message.success('删除成功')
          let name = ''
          this.showSystemList.splice(this.showSystemList.indexOf(name), 1)
        }
      }, (error) => {
      })
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
      console.log(JSON.parse(JSON.stringify(this.appList)), '--------------')
      console.log(JSON.parse(JSON.stringify(this.systemList)), '-----1---------')
      console.log(JSON.parse(JSON.stringify(this.checkSystem)), '-----33---------')
      const appIdList = []
      const res = new Map()
      this.checkSystem.forEach((item) => {
        this.systemList.push(item.split('|')[1])
        appIdList.push(item.split('|')[0])
      })
      this.systemList = this.systemList.filter(function (element, index, self) {
        return self.indexOf(element) === index
      })
      let sendId = appIdList.filter(function (element, index, self) {
        return self.indexOf(element) === index
      })
      // this.systemList = this.systemList.filter(a => !res.has(a) && res.set(a, 1))
      // let sendId = appIdList.filter(a => res.has(a) && !res.set(a, 1))
      this.$emit('get-app', sendId)
      this.showPopover = false
    }
  }

}
</script>

<style lang="less">
  @import "index";
</style>
