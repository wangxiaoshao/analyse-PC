<template>
    <div class="organization-add">
      <el-dialog custom-class="add-dialog"
                 title="添加下级"
                 :visible.sync="visible"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :show-close="false"
      >
        <div class="dialog-close" @click="closeDialog"><i class="el-icon-close"></i></div>
        <div class="add-content">
          <el-button @click="goAddNode">添加节点</el-button>
          <el-button>添加部门</el-button>
          <el-button @click="goAddUnit">添加单位</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'index',
  props: ['visible', 'close'],
  data () {
    return {
      visibleFlag: false
    }
  },
  computed: {
    ...mapState(['app'])
  },
  created () {
  },
  methods: {
    goAddNode () {
      this.$router.push({
        name: 'NodeAdd',
        params: {
          parentId: this.$route.params.nodeId
        }
      })
      this.$emit('close', false)
    },
    closeDialog () {
      this.$emit('close', false)
    },
    goAddUnit () {
      this.$router.push({
        name: 'UnitAdd'
      })
      this.$emit('close', false)
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
