<template>
    <el-dialog
        :visible.sync="visible"
        lock-scroll
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false"
        class="dialog-box"
        width="500px"
    >
        <div slot="title" style="padding: 20px;">
            校验结果
        </div>
        <p>
            <img src="@src/common/images/v2_qb1b03.png" alt="" />
            {{ message }}
        </p>
        <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="onGoOn" width="120px"
                >继续使用系统
            </el-button>
            <el-button
                v-if="'logout' === returnOrLogout"
                type="primary"
                width="120px"
            >
                <a :href="logoutUrl" style="color: #fff;">{{ interruptMsg }}</a>
            </el-button>
            <el-button
                v-else-if="'return' === returnOrLogout"
                @click="onReturn"
                type="primary"
                width="120px"
            >
                {{ interruptMsg }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import validSignature from "@src/mixins/valid-signature";

export default {
    name: "validSignatureManage",
    mixins: [validSignature],
    props: {
        startValid: {
            type: Boolean,
            default: false,
        },
        loadingMsg: {
            type: String,
            default: "验证中...",
        },
        message: {
            type: String,
            default: "签名验证未通过，请及时联系运维人员处理。",
        },
        returnOrLogout: {
            type: String,
            default: "logout",
        },
        params: Array,
    },
    data() {
        return {
            visible: false,
            logoutUrl: "/api/gate/logout",
            loader: null,
        };
    },
    computed: {
        interruptMsg() {
            if (this.returnOrLogout === "logout") {
                return "退出系统";
            }
            return "返回";
        },
    },
    watch: {
        startValid: {
            immediate: true,
            handler(isStart, oldVal) {
                if (isStart) {
                    this.doValidSignature();
                }
            },
        },
    },
    methods: {
        show() {
            this.visible = true;
        },
        hide() {
            this.visible = false;
            this.$emit("update:startValid", false);
        },
        onGoOn() {
            this.hide();
            this.$emit("goOn");
        },
        onReturn() {
            this.$router.back();
        },
        /**
         * {
         * params: [],
         * }
         */
        doValidSignature() {
            this.validSignature(
                this.loadingMsg,
                this.params,
                this.onGoOn,
                this.show
            );
        },
    },
};
</script>

<style lang="less">
@import "index";
</style>
