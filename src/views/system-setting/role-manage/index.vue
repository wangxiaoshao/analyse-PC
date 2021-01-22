<template>
    <div class="site-module mod-dictionary">
        <transition name="fade-transform" mode="out-in">
            <!--      <keep-alive v-if="$route.meta.keepAlive">-->
            <!--        <router-view></router-view>-->
            <!--      </keep-alive>-->
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>
<style scoped lang="less">
@import "./index";
</style>
