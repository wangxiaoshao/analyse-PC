<template>
  <div class="view-management">
    试图
    <el-button @click="seleceDialog.selectMenmberFlag = true">hahaha</el-button>
    <candidate @closeselectMenmber="closeselectMenmber" :seleceDialog="seleceDialog"></candidate>
  </div>
</template>

<script>
import Candidate from '@src/components/Candidate/Candidate.vue'
export default {
  name: 'ViewManagement',
  components: {
    Candidate
  },
  data () {
    return {
      seleceDialog: {
        selectMenmberTitle: '选人组件',
        selectMenmberFlag: false
      }
    }
  },
  methods: {
    closeselectMenmber () {
      this.seleceDialog.selectMenmberFlag = false
    }
  }

}
</script>

<style scoped>
@import './ViewManagement.less';
</style>
