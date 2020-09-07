<template>
    <div class="PersonInfo">
        <el-form label-width="100px" label-position="right">
            <el-row>
                <el-col :span="14">
                    <el-form-item label="姓名">
                        <div class="table-td" :title="personInfoList.name">
                            {{ personInfoList.name }}
                        </div>
                    </el-form-item>
                    <el-form-item label="职   务">
                        <div
                            class="table-td"
                            :title="
                                personInfoList.duty ? personInfoList.duty : ''
                            "
                        >
                            {{ personInfoList.duty || "无" }}
                        </div>
                    </el-form-item>
                    <el-form-item label="所属单位" v-if="activeColor === 2">
                        <div class="table-td">
                            {{ personInfoList.orgName || "无" }}
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="手机号码">
                        <div class="table-td">
                            <span>{{ personInfoList.mobile || "无" }}</span>
                            <span
                                class="findMobileBtn"
                                v-if="
                                    personInfoList.mobile &&
                                    personInfoList.mobile != '' &&
                                    personInfoList.mobile !== '无' &&
                                    !personInfoList.isLooked
                                "
                                @click="findMobile(1)"
                                >查看</span
                            >
                        </div>
                    </el-form-item>
                    <el-form-item label="座机号码">
                        <div class="table-td">
                            <span>{{
                                personInfoList.officePhone || "无"
                            }}</span>
                            <span
                                class="findMobileBtn"
                                v-if="
                                    personInfoList.officePhone &&
                                    personInfoList.officePhone != '' &&
                                    personInfoList.officePhone !== '无' &&
                                    !personInfoList.isOfficePhone
                                "
                                @click="findMobile(2)"
                                >查看</span
                            >
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
export default {
    name: "personInfo",
    props: ["personInfoList", "phoneState", "activeColor"],
    data() {
        return {
            state: "",
            showBtn: true,
            val: "",
        };
    },
    methods: {
        findMobile(state) {
            api[urlNames["findMobileById"]]({
                uid: this.personInfoList.uid,
                type: state,
            }).then((res) => {
                if (res && state === 1) {
                    this.personInfoList.mobile = res.data.mobile;
                    this.personInfoList.isLooked = true;
                }
                if (res && state === 2) {
                    this.personInfoList.officePhone = res.data.officePhone;
                    this.personInfoList.isOfficePhone = true;
                }
            });
        },
    },
};
</script>
<style lang="less">
@import "index.less";
</style>
