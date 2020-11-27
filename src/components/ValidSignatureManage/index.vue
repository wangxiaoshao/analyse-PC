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
        <div slot="title" style="padding: 10px 20px;">
            校验结果
        </div>
        <p v-if="this.isValidSuccess" class="text-green">
            <img src="@src/common/images/v2_qb1aza.svg" alt="" />
            {{ validSuccessMsg }}
        </p>
        <p v-else class="text-red">
            <img src="@src/common/images/v2_qb1b03.svg" alt="" />
            {{ validFailMsg }}
        </p>
        <div slot="footer" class="dialog-footer">
            <el-button
                type="success"
                @click="hide"
                v-if="this.isValidSuccess"
                style="width: 120px;"
                >确定
            </el-button>
            <span v-else
                ><el-button type="danger" @click="hide" plain
                    >继续使用系统
                </el-button>
                <el-button
                    type="info"
                    @click="window.location.href = '/api/gate/logout'"
                    >退出
                </el-button></span
            >
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "validSignatureManage",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        isValidSuccess: {
            type: Boolean,
            default: true,
        },
        validSuccessMsg: {
            type: String,
            default: "签名验证通过",
        },
        validFailMsg: {
            type: String,
            default: "签名验证未通过，请及时联系运维人员处理。",
        },
    },
    data() {
        return {};
    },
    methods: {
        hide() {
            this.$emit("update:visible", false);
        },
    },
};
</script>

<style lang="less">
@import "index";
</style>
