<template>
    <div class="announceDetail">
        <div class="content">
            <div class="header-title">为推进改造，系统密码强度优化通知。</div>
            <div class="createTime">2020年3月12日22：00</div>
            <div class="msg">
                <p>一、品牌定位</p>
                <p>
                    以猛犸饰品商行注册淘宝平台，集中高档及低档为一体，
                    前期通过低档产品做一些宣传和推广，提高网店的点击率，从而推动成交率。
                </p>
                <p>二、操作流程</p>
                <p>
                    提交运营方案模特及摄影拍摄产品上传客服和物流三、人员分工表
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "announceDetail",
    data() {
        return {};
    },

    created() {
        // this.app.breadcrumb=[{name: '文章详情'}]
    },
    computed: {
        ...mapState(["app"]),
    },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
