<template>
    <div class="organization-add">
      <el-dialog custom-class="add-dialog"
                 :visible.sync="visible">
        <div class="add-content">
          <ul>
            <li>
              <a>添加节点</a>
            </li>
            <li>
              <a>添加单位</a>
            </li>
            <li>
              <a>添加部门</a>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      visible: true
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
