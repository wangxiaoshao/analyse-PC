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
import handleTable from "@src/mixins/handle-table";

export default {
    name: "SystemSetting",
    components: {},
    mixins: [handleTable],
    data() {
        return {
            loading: true,
            searchQuery: {
                type: "",
            },
            list: [],
            dictionaryNameList: [],
            page: {},

            pickerOptions: {
                shortcuts: [
                    {
                        text: "最近一周",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近一个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                    {
                        text: "最近三个月",
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            );
                            picker.$emit("pick", [start, end]);
                        },
                    },
                ],
            },
            dataValue: [],
        };
    },
    computed: {},
    mounted() {
        this.getGrid();
    },
    methods: {
        change() {
            this.page.current = 1;
            this.getGrid();
        },
        trim(str) {
            return (str + "").replace(/(\s+)$/g, "").replace(/^\s+/g, "");
        },
        selectDescription() {
            this.page.current = 1;
            this.getGrid();
        },
        getGrid() {
            this.loading = true;
            let data = {
                page: this.page.current,
                pageSize: this.page.limit,
            };
            if (this.dataValue && this.dataValue.length > 0) {
                data.startTime = this.dataValue[0];
                data.endTime = this.dataValue[1];
            }
            // api[urlNames['dictionaryList']](data).then((res) => {
            //   this.loading = false
            //   // this.list = res.result.items
            //   // this.page.total = res.total
            // }, () => {
            //   this.loading = false
            //   this.list = []
            //   this.page.total = 0
            // })
        },
    },
};
</script>
<style lang="less">
@import "./index";
</style>
