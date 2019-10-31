<template>
  <div class="choose-content">
    <el-button v-popover:popover class="choose-btn">选择关联系统</el-button>
    <el-popover
      ref="popover"
      placement="bottom"
      width="500"
      trigger="click"
      popper-class="system-popover"
    >
      <div>
        <el-checkbox-group v-model="checkSystem">
          <el-checkbox v-for="item in systemList" border :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-popover>
    <el-tag
      :key="tag"
      type="info"
      v-for="tag in checkSystem"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <div class="password-content">密码：115145</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkSystem: ['上海'],
      systemList: ['上海', '北京', '广州', '深圳']
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    }
  }

}
</script>

<style lang="less">
  @import "index";
</style>
