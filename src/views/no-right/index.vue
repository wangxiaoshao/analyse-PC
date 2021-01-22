<template>
    <div class="no-right">
        <img class="no-content-img" :src="imgSrc" alt="" />
        您没有权限访问该页面，请联系管理员开通该模块权限
    </div>
</template>

<script>
import noDataImg from '@src/common/images/no-data1.png'

export default {
  data () {
    return {
      imgSrc: noDataImg
    }
  }
}
</script>
<style lang="less" scoped>
.no-right {
    padding-top: 40px;
    text-align: center;
    .no-content-img {
        display: block;
        margin: 0 auto 30px auto;
        width: 188px;
        height: 204px;
    }
}
</style>
