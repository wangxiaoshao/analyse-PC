<template>
    <div class="permission-set">
        <el-table
            :data="menuAuthList"
            border
            size="medium"
            style="width: 100%;"
        >
            <template slot="empty">
                <div class="empty">
                    <p>
                        <img
                            class="data-pic"
                            src="@src/common/images/no-data1.png"
                            alt=""
                        />
                    </p>
                    <p><span style="padding-left: 8px;">暂无数据</span></p>
                </div>
            </template>
            <el-table-column label="全部模块" width="200" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.menu.moduleTitle }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="" label="对应权限配置">
                <template slot-scope="scope">
                    <el-checkbox-group
                        v-model="defaultSelect"
                        class="table-td"
                        @change="selectChange"
                    >
                        <el-checkbox
                            class="text-ellipsis"
                            v-for="item in scope.row.authorityList"
                            :key="item.authorityName"
                            :label="item.authorityName"
                        >
                            {{ item.authorityTitle }}
                            <el-button
                                @click="
                                    validSignatureManage(6, item.authorityId)
                                "
                                size="mini"
                                >验签</el-button
                            >
                        </el-checkbox>
                    </el-checkbox-group>
                </template>
            </el-table-column>
        </el-table>

        <el-footer class="authority-setting-footer">
            <el-button type="primary" @click="saveAuthorityManage"
                >保存</el-button
            >
            <el-button @click="cancel">返回</el-button>
        </el-footer>

        <valid-signature-manage
            loadingMsg="角色权限配置信息签名校验中..."
            message="角色权限配置信息签名验证未通过，请及时联系运维人员处理。"
            returnOrLogout="logout"
            :params="validParams"
            :startValid.sync="startValid"
        ></valid-signature-manage>
    </div>
</template>
<script>
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import getUserInfo from "@src/mixins/getUserInfo";
import { api, urlNames } from "@src/api";
import validSignatureManage from "@src/mixins/valid-signature-manage";

export default {
    mixins: [handleBreadcrumb, getUserInfo, validSignatureManage],
    data() {
        return {
            menuList: [],
            menuAuthList: [], // 分类后的菜单
            defaultSelect: [], // 默认选中操作
            allAction: [], // 所有操作
            checkboxtSelect: [],
            roleId: this.$route.params.id,
            // 验签提示对话框
            validParams: [],
            startValid: false,
        };
    },
    created() {
        this.init();
    },
    mounted() {
        this.pushBreadcrumb({
            name: "权限配置",
            parent: {
                name: "lookPersonPermission",
                query: {
                    type: "back",
                },
            },
        });
    },
    methods: {
        init() {
            this.getMenuList();
            this.getActionList();
        },
        // 对菜单进行分类
        sortModuleList(menuList) {
            let that = this;
            let obj = {};

            menuList.forEach((item) => {
                if (item.authorityId) {
                    that.allAction.push({
                        id: item.authorityId,
                        authorityName: item.authorityName,
                        isAuthority: false,
                    });
                }
                if (obj[item.moduleName]) {
                    obj[item.moduleName].authorityList.push({
                        authorityName: item.authorityName,
                        authorityTitle: item.authorityTitle,
                        authorityId: item.authorityId,
                    });
                } else {
                    if (item.authorityId === undefined) {
                        obj[item.moduleName] = {
                            menu: {
                                moduleName: item.moduleName,
                                moduleTitle: item.moduleTitle,
                            },
                            authorityList: [],
                        };
                    } else {
                        obj[item.moduleName] = {
                            menu: {
                                moduleName: item.moduleName,
                                moduleTitle: item.moduleTitle,
                            },
                            authorityList: [
                                {
                                    authorityName: item.authorityName,
                                    authorityTitle: item.authorityTitle,
                                    authorityId: item.authorityId,
                                },
                            ],
                        };
                    }
                }
            });
            this.menuAuthList = [];
            Object.keys(obj).forEach((key) => {
                this.menuAuthList.push(obj[key]);
            });
        },
        selectChange(val) {
            this.checkboxtSelect = val;
        },

        getActionList() {
            api[urlNames["getRoleAuthorityList"]]({
                roleId: this.$route.params.id,
            }).then((res) => {
                this.defaultSelect = res.data.map((item) => {
                    return item.name;
                });
            });
        },

        // 获取菜单
        getMenuList() {
            api[urlNames["option"]]().then((res) => {
                this.menuList = res.data.menus;
                this.sortModuleList(this.menuList);
            });
        },

        // 保存
        saveAuthorityManage() {
            let that = this;

            this.allAction.forEach((item) => {
                for (let i = 0; i < that.defaultSelect.length; i++) {
                    if (item.authorityName === that.defaultSelect[i]) {
                        item.isAuthority = true;
                        break;
                    }
                }
            });

            api[urlNames["editAuthorityManage"]]({
                roleId: this.roleId,
                authorityManageVos: this.allAction,
            }).then((res) => {
                if (res.status === 0) {
                    this.$message.success(`保存成功`);
                    this.allAction = [];
                    this.sortModuleList(this.menuList);
                    this.getGlobalInfo();
                    this.getActionList();
                }
            });
        },

        cancel() {
            this.allAction = [];
            this.$router.go(-1);
            // this.sortModuleList(this.menuList)
        },
    },
};
</script>
<style lang="less">
@import "index";
</style>
