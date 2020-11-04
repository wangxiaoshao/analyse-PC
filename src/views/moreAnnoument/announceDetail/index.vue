<template>
    <div class="announceDetail">
        <div class="content">
            <div class="header-title">{{ noticeDetail.title }}</div>
            <div class="createTime">
                {{
                    noticeDetail.createTime | dataFilter("YYYY-MM-DD HH:mm:ss")
                }}
            </div>
            <div class="msg">
                {{ noticeDetail.content }}
                <!-- <p>一、品牌定位</p>
                <p>
                    以猛犸饰品商行注册淘宝平台，集中高档及低档为一体，
                    前期通过低档产品做一些宣传和推广，提高网店的点击率，从而推动成交率。
                </p>
                <p>二、操作流程</p>
                <p>
                    提交运营方案模特及摄影拍摄产品上传客服和物流三、人员分工表
                </p> -->
            </div>
        </div>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
import handleBreadcrumb from "@src/mixins/new/handle-breadcrumb.js";
export default {
    name: "announceDetail",
    mixins: [handleBreadcrumb],
    data() {
        return {
            noticeDetail: {
                id: 8228,
                title: "p",
                content: "B",
                url: "t0WA67xwi",
                createTime: "2020-03-12",
            },
        };
    },

    created() {},
    mounted() {
        this.app.noticeShowBtn = true;
        this.SET_BREADCRUMB([{ name: "公告详情" }]);
        this.getSystemNoticeDetail();
    },
    methods: {
        getSystemNoticeDetail() {
            api[urlNames["getSystemNoticeDetail"]]({
                id: this.$route.query.id,
            }).then(
                (res) => {
                    if (res) {
                        this.noticeDetail = res.data;
                    }
                },
                () => {
                    this.noticeDetail = {};
                }
            );
        },
    },
    computed: {
        ...mapState(["app"]),
    },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
