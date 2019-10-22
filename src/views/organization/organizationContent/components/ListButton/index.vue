<template>
  <div class="button-content">
    <div class="button-wrap">
      <el-button>{{buttonTitle}}</el-button>
      <el-button @click="sortShowFlag = true">调整排序</el-button>
    </div>
    <div class="sort-do" v-if="sortShowFlag">
      按住左键上下拖动调整排序
      <a>保存</a>
      <a  @click="sortShowFlag = false">取消</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      sortShowFlag: false
    }
  },
  props: {
    buttonTitle: {
      type: String,
      required: true
    },
    currentTab: { // 判断当前tab
      type: String,
      required: true
    }
  },
  methods: {

  },
  watch: {

  }
}
</script>

<style lang="less">
  @import "index";
</style>
