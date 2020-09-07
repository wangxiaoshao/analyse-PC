<template>
    <div class="search-txlcontent">
        <el-popover ref="popover" placement="bottom-start" v-if="resultFlag">
            <div class="back-btn-address">
                <el-button
                    size="medium"
                    type="text"
                    icon="el-icon-close"
                    @click="goBackTree"
                ></el-button>
            </div>
            <div class="result-list">
                <el-table
                    v-loading="loadFlag"
                    :data="gridData"
                    :show-header="false"
                    highlight-current-row
                >
                    <el-table-column property="name">
                        <template slot-scope="scope">
                            <div class="result-tr">
                                <span
                                    v-if="selectType !== '0'"
                                    :title="scope.row.name"
                                    class="table-span"
                                    @click="getDetail(scope.row)"
                                    >{{ scope.row.name }}</span
                                >
                                <span
                                    v-if="selectType === '0'"
                                    :title="scope.row.name"
                                    @click="handleCurrentChange(scope.row)"
                                    class="table-span"
                                    >{{ scope.row.name }}-{{
                                        scope.row.mobile
                                    }}</span
                                >
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div
                    class="footer-page"
                    v-if="
                        gridData.length >= pageParams.limit &&
                        selectType === '2' &&
                        myOrgFlag !== 1
                    "
                >
                    <el-button
                        type="text"
                        size="mini"
                        icon="el-icon-arrow-left"
                        @click="pageReduce"
                        :disabled="pageParams.page <= 1 ? true : false"
                        >上一页</el-button
                    >
                    <el-button
                        type="text"
                        size="mini"
                        @click="pageAdd"
                        :disabled="pageParams.page < allPages ? false : true"
                        >下一页<i class="el-icon-arrow-right el-icon--right"></i
                    ></el-button>
                </div>
            </div>
        </el-popover>
        <el-row>
            <el-input
                v-if="myOrgFlag === 1"
                @change="getResult"
                placeholder="请输入内容"
                v-model="keyWord"
                class="input-with-select"
            >
                <el-select
                    v-model="selectType"
                    style="width: 94px;"
                    slot="prepend"
                    placeholder="请选择"
                >
                    <el-option label="内设机构" value="3"></el-option>
                    <el-option label="人员" value="0"></el-option>
                </el-select>
                <el-button
                    slot="append"
                    @click="getResult"
                    icon="el-icon-search"
                ></el-button>
            </el-input>
            <el-input
                v-if="myOrgFlag !== 1"
                @change="getOtherResult"
                placeholder="请输入内容"
                v-model="keyWord"
                class="input-with-select"
            >
                <el-select
                    v-model="selectType"
                    style="width: 80px;"
                    slot="prepend"
                    placeholder="请选择"
                >
                    <el-option label="单位" value="2"></el-option>
                    <!-- <el-option label="内设机构" value="3"></el-option> -->
                    <el-option label="人员" value="0"></el-option>
                </el-select>
                <el-button
                    slot="append"
                    @click="getOtherResult"
                    icon="el-icon-search"
                ></el-button>
            </el-input>
            <!--      <el-input-->
            <!--        placeholder="请输入人员姓名"-->
            <!--        v-model="keyWord"-->
            <!--        onFocus-->
            <!--        @change="getResult"-->
            <!--        class="input-with-select"-->
            <!--      >-->
            <!--        <el-button slot="append"  icon="el-icon-search"></el-button>-->
            <!--      </el-input>-->
        </el-row>
    </div>
</template>

<script>
import { api, urlNames } from "@src/api";
import { mapState, mapMutations } from "vuex";
export default {
    props: ["defaultNodeId", "myOrgFlag"],
    data() {
        return {
            selectType: "0",
            keyWord: "",
            value: "选择",
            gridData: [],
            nodeType: "",
            nodeTree: [],
            debouncedSearch: null,
            resultFlag: false,
            loadFlag: false,
            type: 2,
            restaurants: [],
            timer: null,
            pageParams: {
                page: 1,
                limit: 15,
                total: 0,
            },
            allPages: 0,
        };
    },

    created() {},
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        ...mapMutations(["SET_OPTION"]),
        onFocus() {
            this.getResult();
        },
        // 获取搜索结果
        getResult() {
            if (this.keyWord.length < 1) {
                this.gridData = [];
                return;
            }
            if (this.selectType === "0") {
                api[urlNames["getAddressListUserByName"]]({
                    name: this.keyWord,
                    orgId: this.app.option.user.orgId,
                }).then((res) => {
                    this.gridData = res.data;
                    this.resultFlag = true;
                });
            } else if (this.selectType === "2") {
                api[urlNames["searchOtherDep"]]({
                    name: this.keyWord,
                    nodeType: this.selectType,
                    orgId: this.app.option.user.orgId,
                }).then((res) => {
                    this.gridData = res.data;
                    this.resultFlag = true;
                });
            } else if (this.selectType === "3") {
                api[urlNames["searchMyDep"]]({
                    deptName: this.keyWord,
                    orgId: this.app.option.user.orgId,
                }).then((res) => {
                    this.gridData = res.data;
                    this.resultFlag = true;
                });
            }
        },
        getOtherResult() {
            if (this.keyWord.length < 1) {
                this.gridData = [];
                return;
            }
            if (this.selectType === "0") {
                api[urlNames["getAddressListUserByName"]]({
                    name: this.keyWord,
                }).then((res) => {
                    this.gridData = res.data;
                    this.resultFlag = true;
                });
            } else if (this.selectType === "2" || this.selectType === "3") {
                api[urlNames["searchOtherDep"]]({
                    name: this.keyWord,
                    nodeType: this.selectType,
                    page: this.pageParams.page,
                    limit: this.pageParams.limit,
                }).then((res) => {
                    this.gridData = res.data;
                    this.allPages = Math.ceil(
                        res.total / this.pageParams.limit
                    );
                    this.resultFlag = true;
                });
            }
        },
        goBackTree() {
            this.keyWord = "";
            this.resultFlag = false;
            if (this.myOrgFlag === 1) {
                this.$emit("searchMyBack");
            } else {
                this.$emit("searchOtherBack");
            }
        },
        getDetail(val) {
            this.$emit("searchListResult", val, this.selectType);
        },
        handleCurrentChange(val) {
            this.$emit("searchPeopleInfo", val, this.selectType);
        },
        pageReduce() {
            this.pageParams.page--;
            if (this.pageParams.page < 1) {
                this.pageParams.page = 1;
            }
            this.getOtherResult();
        },
        pageAdd() {
            this.pageParams.page++;
            this.getOtherResult();
        },
    },
    watch: {
        myOrgFlag(val) {
            this.selectType = "0";
            this.keyWord = "";
            this.resultFlag = false;
        },
        keyWord(newVal) {
            this.pageParams.page = 1;
        },
    },
};
</script>

<style lang="less">
@import "index";
</style>
