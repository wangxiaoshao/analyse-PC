<template>
  <div class="word-center">
    <el-tabs v-model="activeName">
      <el-tab-pane label="操作文档" name="actionWord">
        <p>操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作文档操作文档</p>
      </el-tab-pane>
      <el-tab-pane label="权限说明" name="authorityDescript">
        <p>权限说明</p>
      </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'WordCenter',
  data () {
    return {
      activeName: 'actionWord'
    }
  },
  created () {
    console.log('breadcrumb:',this.app.breadcrumb)
    // this.app.breadcrumb=this.app.breadcrumb.slice(0,2)
  },
  methods: {},
   computed: {
   ...mapState(['app']),
  },
}
</script>

<style lang="less">
  .word-center {
    p {
      text-indent: 2rem;
      text-align:justify;
      letter-spacing:2px;
      line-height: 20px;
    }
  }
</style>
