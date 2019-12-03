<template>
  <div class="login">
    <img class="form-bg" src="@src/common/images/login-bg.jpg">
    <div class="form" :style="formPosition">
      <div class="login-inner">
        <div class="form-header">
         <p class="logo"> <img src="../../../src/common/images/logo.png"></p>
          <p class="name"><img src="../../../src/common/images/title.png"></p>
        </div>
        <login-form></login-form>
      </div>
    </div>
  </div>
</template>
<script>
import loginForm from '@src/views/login/login-form/index'
export default {
  name: 'Login',
  components: {
    loginForm
  },
  data () {
    return {
      formPosition: {
        left: '',
        top: ''
      }
    }
  },
  created () {
    this.getWindowInner()
  },
  methods: {
    getWindowInner () {
      this.formPosition.left = (window.innerWidth - 400) / 2 + 'px'
      this.formPosition.top = (window.innerHeight - 450) / 2 + 'px'
    }
  }
}
</script>

<style scoped lang="less">
  @import "./index";
</style>
