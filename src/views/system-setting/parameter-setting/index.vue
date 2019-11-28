<template>
  <div class="parameter-settings">
    <el-tabs v-model="activeName">
      <el-tab-pane label="系统参数" name="first">
        <parmaeter-from :submitLevel="submitLevel=1"></parmaeter-from>
      </el-tab-pane>
      <el-tab-pane label="单位参数" name="second">
        <parmaeter-from :submitLevel="submitLevel=2"></parmaeter-from>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ParmaeterFrom from '@src/views/system-setting/parmaeter-from/index'
export default {
  name: 'ParameterSettings',
  components: { ParmaeterFrom },
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
