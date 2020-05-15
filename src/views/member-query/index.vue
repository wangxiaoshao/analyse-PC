<template>
    <div>
        <transition name="fade-transform" mode="out-in">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {},
  data () {
    return {

    }
  },
  created () {

  },
  methods: {}
}
</script>
