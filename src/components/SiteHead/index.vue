<template>
    <div>
        <div class="site__head">
            <div class="logo">
                <img src="@src/common/images/logo1.png" alt="" />
            </div>
            <div class="site__head-content">
                <div class="site__head--center">
                    <div class="name">
                        <h2>
                            应用考核统计分析平台
                            <span
                                class="img1"
                                style="margin-left: 35px;"
                                title="我的应用情况"
                                @click="goMyApplication"
                            >
                                <img
                                    src="@src/common/images/apply1.png"
                                    alt=""
                                />
                            </span>
                            <span
                                class="img1"
                                style="margin-left: 15px;"
                                title="退出"
                                @click="loginout"
                            >
                                <img
                                    src="@src/common/images/loginout.png"
                                    alt=""
                                />
                            </span>
                        </h2>
                    </div>

                    <span></span>
                </div>
                <div class="site__head--right">
                    <a
                        ><span class="el-icon-user userIcon"></span
                        >{{
                            this.$store.state.app.rolesInfo.roleTitle ||
                            this.$store.state.app.rolesInfo.userName ||
                            ""
                        }}</a
                    >
                    <!-- <a class="my-apply" @click="goMyApplication"
                        >我的应用情况</a
                    > -->
                    <!-- <a
                        >退出
                        <a
                            style="cursor: pointer;"
                            class="ico fa fa-sign-in"
                            title="退出登录"
                            target="_self"
                            :href="logoutURL"
                        ></a>
                    </a> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * Created by lxe on 2019-09-18.
 */
import { api, urlNames } from "@src/api";
import { mapState } from "vuex";
export default {
    name: "Head",
    props: ["breadcrumb", "pageBreadcrumb"],
    data() {
        return {
            logoutURL: "",
            userList: [], // 用户身份列表
            defaultName: "", // 默认身份
        };
    },
    computed: {
        ...mapState(["app"]),
    },
    created() {
        this.logoutURL = "/api/gate/cas/logout";
        // this.findSessionUserList();
    },
    methods: {
        goBack() {
            this.$emit("go-back");
        },
        loginout() {
            window.location.href = this.logoutURL;
        },
        // 获取用户身份列表
        findSessionUserList() {
            api[urlNames["findSessionUserList"]]().then((res) => {
                this.userList = res.data.userIdVos;
                this.userList.forEach((item) => {
                    item.typeName = item.typeName ? item.typeName : " ";
                    if (item.userId === res.data.id) {
                        this.defaultName =
                            (item.orgName || "") +
                            " " +
                            (item.dutyName || "") +
                            " " +
                            (item.typeName || "");
                    }
                });
            });
        },
        goMyApplication() {
            this.$router.push("/my-application");
        },
    },
};
</script>
<style lang="less">
@import "./index";
</style>
