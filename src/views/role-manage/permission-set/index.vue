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

        <el-dialog
            :visible.sync="validSignatureDialog"
            lock-scroll
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            class="dialog-box"
            width="500px"
        >
            <div slot="title" style="padding: 20px;">
                校验结果
            </div>
            <p>
                <img src="@src/common/images/v2_qb1b03.png" alt="" />
                角色权限配置数据校验未通过，请及时联系运维人员处理。
            </p>
            <div slot="footer" class="dialog-footer">
                <el-button
                    type="info"
                    @click="
                        validSignatureDialog = false;
                        init();
                    "
                    width="120px"
                    >继续使用系统</el-button
                >
                <el-button type="primary" @click="$router.back()" width="120px"
                    >返 回</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import getUserInfo from "@src/mixins/getUserInfo";
import { api, urlNames } from "@src/api";
export default {
    mixins: [handleBreadcrumb, getUserInfo],
    data() {
        return {
            menuList: [],
            menuAuthList: [], // 分类后的菜单
            defaultSelect: [], // 默认选中操作
            allAction: [], // 所有操作
            checkboxtSelect: [],
            roleId: this.$route.params.id,
            // 验签提示对话框
            validSignatureDialog: false,
            loader: null,
        };
    },
    created() {
        this.validSignature();
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
        // 国密验签
        validSignature(callback) {
            this.loader = this.$loading({
                fullscreen: true,
                text: "用户信息签名校验中...",
            });

            api[urlNames["validSignature"]]()
                .then((res) => {
                    this.loader.close();
                    this.init();
                })
                .catch(() => {
                    this.loader.close();
                    this.validSignatureDialog = true;
                });
        },
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
