<template>
  <el-steps :space="200" :active="active" finish-status="success" style="padding-bottom: 20px">
    <el-step title="人员管理"></el-step>
    <el-step title="账号管理"></el-step>
  </el-steps>
</template>

<script>
export default {
  props: ['active'],
  data () {
    return {

    }
  },
  created () {

  }
}
</script>

<style scoped>

</style>
