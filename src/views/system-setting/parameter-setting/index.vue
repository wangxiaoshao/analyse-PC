<template>
    <div class="parameter-settings">
        <el-tabs v-model="activeName">
            <el-tab-pane
                label="全局参数设置"
                name="first"
                v-if="hasRight('viewGlobalParameter')"
            >
                <parmaeter-system-form
                    @setOrgParamsFun="setOrgParamsFun"
                ></parmaeter-system-form>
            </el-tab-pane>
            <el-tab-pane
                label="单位参数"
                :name="
                    !hasRight('viewGlobalParameter') &&
                    hasRight('viewOrgParameter')
                        ? 'first'
                        : 'second'
                "
                v-if="hasRight('viewOrgParameter')"
            >
                <parmaeter-org-form
                    :isSetOrgParams="isSetOrgParams"
                ></parmaeter-org-form>
            </el-tab-pane>
            <el-tab-pane label="消息模板配置" v-if="false">
                <msg-setting></msg-setting>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ParmaeterOrgForm from "@src/views/system-setting/parmaeter-org-form/index";
import ParmaeterSystemForm from "@src/views/system-setting/parmaeter-system-form/index";
import MsgSetting from "./msg-setting/index";
import hasRight from "@src/mixins/has-right";
export default {
    name: "ParameterSettings",
    mixins: [hasRight],
    components: {
        ParmaeterOrgForm,
        ParmaeterSystemForm,
        MsgSetting,
    },
    data() {
        return {
            activeName: "first",
            submitLevel: 1,
            isSetOrgParams: 0,
        };
    },
    methods: {
        setOrgParamsFun(setOrg) {
            this.isSetOrgParams = setOrg;
        },
    },
};
</script>

<style scoped lang="less">
@import "index";
</style>
