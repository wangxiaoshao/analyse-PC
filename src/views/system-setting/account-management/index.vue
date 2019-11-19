import class from '@vue/cli-service';
<template>
    <div class="account-management">
      <el-row>
        <el-col :span="5" style="text-align:center;">
            <div class="account-management-left-title">账号信息</div>
            <div style="margin: 10px 0;display:block;">
                <el-button plain type="primary" style="margin-bottom:10px;width:130px;margin-left:10px;">chenyuyu</el-button>
                <el-button  plain style="margin-bottom:10px;width:130px;">che11nyuyu</el-button>
                <el-button plain style="margin-bottom:10px;width:130px;">chenyuyuqq</el-button>
                <el-button plain style="margin-bottom:10px;width:130px;">chenyuyu</el-button>
            </div>
        </el-col>
        <el-col :span="16">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">处理中心</el-menu-item>
            </el-menu>
        </el-col>
      </el-row>
      

    </div>
</template>
<script>

export default {
    name:'AccountManagement',
      data() {
      return {
        activeIndex: '1',
      };
    },
}
</script>
<style lang="less">
  @import "index";
</style>
