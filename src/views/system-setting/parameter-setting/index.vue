<template>
  <div class="parameter-settings">
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统参数" name="first">
        <parmaeter-system-form></parmaeter-system-form>
      </el-tab-pane>
      <el-tab-pane label="单位参数" name="second">
        <parmaeter-org-form></parmaeter-org-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ParmaeterOrgForm from '@src/views/system-setting/parmaeter-org-form/index'
import ParmaeterSystemForm from '@src/views/system-setting/parmaeter-system-form/index'
export default {
  name: 'ParameterSettings',
  components: {
    ParmaeterOrgForm,
    ParmaeterSystemForm
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
