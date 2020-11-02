<template>
    <div class="site-module mod-dictionary">
        <transition name="fade-transform" mode="out-in">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {},
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
