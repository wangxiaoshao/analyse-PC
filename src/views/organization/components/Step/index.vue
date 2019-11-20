<template>
  <div>
    <el-steps :space="200" :active="activeName" finish-status="success" style="padding-bottom: 20px">
      <el-step title="人员管理"></el-step>
      <el-step title="账号管理"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: ['active'],
  data () {
    return {
      activeName: this.active
    }
  },
  created () {

  },
  watch: {
    active: {
      activeName (val) {
        alert(val)
      }
    }
  }
}
</script>

<style scoped>

</style>
