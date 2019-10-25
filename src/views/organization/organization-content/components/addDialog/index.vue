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
          <el-button @click="goAddNode" v-if="showAddNodeFlag">添加节点</el-button>
          <el-button v-if="showAddDepartmentFlag">添加部门</el-button>
          <el-button v-if="showAddUnitFlag" @click="goAddUnit">添加单位</el-button>
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
      visibleFlag: false,
      showAddNodeFlag: false,
      showAddDepartmentFlag: false,
      showAddUnitFlag: false
    }
  },
  computed: {
    ...mapState(['app'])
  },
  created () {
    this.showBtn()
  },
  methods: {
    showBtn () {
      if (this.$route.params.nodeType === 'node') {
        this.showAddNodeFlag = true
        this.showAddDepartmentFlag = false
        this.showAddUnitFlag = true
      } else if (this.$route.params.nodeType === 'department') {
        this.showAddNodeFlag = false
        this.showAddDepartmentFlag = true
        this.showAddUnitFlag = false
      } else if (this.$route.params.nodeType === 'unit') {
        this.showAddNodeFlag = false
        this.showAddDepartmentFlag = true
        this.showAddUnitFlag = true
      }
    },
    goAddNode () {
      this.$router.push({
        name: 'NodeAdd',
        params: {
          parentId: this.$route.params.nodeId,
          name: this.$route.params.name
        }
      })
      this.$emit('close', false)
    },
    closeDialog () {
      this.$emit('close', false)
    },
    goAddUnit () {
      this.$router.push({
        name: 'UnitAdd',
        params: {
          parentId: this.$route.params.nodeId,
          name: this.$route.params.name
        }
      })
      this.$emit('close', false)
    }
  },
  watch: {
    '$route.params.nodeType': {
      handler () {
        this.showBtn()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
