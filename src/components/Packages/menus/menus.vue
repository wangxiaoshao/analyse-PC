<template>
    <el-menu
        ref="menu"
        :default-active="defaultActive"
        :default-openeds="defaultOpeneds"
        :mode="mode"
        :collapse="collapse"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :unique-opened="uniqueOpened"
        :menu-trigger="menuTrigger"
        :router="true"
    >
        <sub-menu
            v-for="route in menus"
            :key="route.path"
            :menu-item="route"
            :base-path="route.path"
        ></sub-menu>
    </el-menu>
</template>
<script>
import subMenu from "./sub-menu.vue";
import util from "../utils";

export default {
    name: "menus",
    components: {
        subMenu,
    },
    data() {
        return {
            innerMenus: [],
            indexMap: {},
        };
    },
    props: {
        menus: Array,
        mode: String,
        defaultOpeneds: Array,
        // defaultActive: [String, Number],
        collapse: Boolean,
        backgroundColor: String,
        textColor: String,
        activeTextColor: String,
        uniqueOpened: Boolean,
        menuTrigger: String,
        router: Boolean,
    },
    computed: {
        defaultActive() {
            const route = this.$route;
            const { meta, path } = route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
    },
};
</script>
