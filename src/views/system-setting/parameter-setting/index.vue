<template>
  <div class="parameter-settings">
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统参数" >
        <parmaeter-system-form></parmaeter-system-form>
      </el-tab-pane>
      <el-tab-pane label="单位参数">
        <parmaeter-org-form></parmaeter-org-form>
      </el-tab-pane>
      <el-tab-pane label="消息模板配置" name="first">
        <msg-setting></msg-setting>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ParmaeterOrgForm from '@src/views/system-setting/parmaeter-org-form/index'
import ParmaeterSystemForm from '@src/views/system-setting/parmaeter-system-form/index'
import MsgSetting from './msg-setting/index'
export default {
  name: 'ParameterSettings',
  components: {
    ParmaeterOrgForm,
    ParmaeterSystemForm,
    MsgSetting
  },
  data () {
    return {
      activeName: 'first',
      submitLevel: 1
    }
  }
}
</script>

<style scoped lang="less">
  @import "index";
</style>
