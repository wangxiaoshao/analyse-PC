<template>
    <div class="search-content">
        <el-popover
            ref="popover"
            placement="bottom-start"
            v-if="resultFlag"
            width="500"
        >
            <div class="back-btn">
                <el-button
                    size="medium"
                    type="text"
                    icon="el-icon-close"
                    @click="goBackTree"
                ></el-button>
            </div>
            <div
                class="result-list"
                :style="
                    gridData.length >= pageParams.limit
                        ? 'padding-bottom: 40px'
                        : ''
                "
            >
                <!-- <el-button
                    size=""
                    type="text"
                    icon="el-icon-d-arrow-left"
                    class="leftBtn btn"
                    @click="pageReduce"
                    :disabled="pageParams.page <= 1 ? true : false"
                ></el-button>
                <el-button
                    size="medium"
                    type="text"
                    icon="el-icon-d-arrow-right"
                    class="rightBtn btn"
                    @click="pageAdd"
                    :disabled="pageParams.page < allPages ? false : true"
                ></el-button> -->
                <el-table
                    v-loading="loadFlag"
                    :data="gridData"
                    :show-header="false"
                    width="100%"
                >
                    <el-table-column property="name">
                        <template slot-scope="scope">
                            <div class="result-tr">
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item
                                        v-for="(item, index) in scope.row
                                            .keyNav"
                                        :key="index"
                                    >
                                        <span
                                            class="table-span"
                                            href
                                            disabled
                                            v-if="
                                                scope.row.keyNav.length - 1 !==
                                                index
                                            "
                                            >{{ item.name }}</span
                                        >
                                        <span
                                            class="table-span navBar"
                                            v-if="
                                                scope.row.keyNav.length - 1 ===
                                                index
                                            "
                                            @click.prevent="setNodeId(item.id)"
                                            v-html="keyWordColor(item.name)"
                                        ></span>
                                    </el-breadcrumb-item>
                                </el-breadcrumb>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div
                    class="footer-page"
                    v-if="gridData.length >= pageParams.limit"
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
                v-popover:popover
                placeholder="请输入内容"
                v-model="keyWord"
                @input="getResult"
                @blur="blur"
                @keyup.enter.native="getResult"
                class="input-with-select"
            >
                <el-select
                    v-model="value"
                    @change="getType"
                    style="width: 94px;"
                    slot="prepend"
                    placeholder="请选择"
                    :title="value == 2 ? '单位' : '内设机构'"
                >
                    <el-option label="单位" value="2" title="单位"></el-option>
                    <el-option
                        label="内设机构"
                        value="3"
                        title="内设机构"
                    ></el-option>
                    <!--          <el-option label="节点"

value="1"></el-option>-->
                </el-select>
                <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="getResult"
                ></el-button>
            </el-input>
        </el-row>
    </div>
</template>

<script>
import { api, urlNames } from "@src/api";
import debounce from "@src/mixins/debounce";
export default {
    mixins: [debounce],
    data() {
        return {
            debouncedSearch: null,
            resultFlag: false,
            text: "",
            loadFlag: false,
            keyWord: "",
            value: "2",
            gridData: [],
            type: 2,
            restaurants: [],
            timer: null,
            pageParams: {
                page: 1,
                limit: 5,
                total: 0,
            },
            allPages: 0,
        };
    },
    props: ["defaultNodeId"],
    methods: {
        getType(el) {
            this.type = el;
        },

        // 获取搜索结果
        getResult() {
            let data = {
                name: this.keyWord,
                nodeType: this.type,
                page: this.pageParams.page,
                limit: this.pageParams.limit,
            };
            if (this.keyWord.length > 1) {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                // this.timer = this.debounce(this.getResultList, 800)
                if (this.keyWord.length > 1) {
                    this.timer = setTimeout(() => {
                        this.resultFlag = true;
                        this.loadFlag = true;
                        api[urlNames["searchViewNode"]](data)
                            .then((res) => {
                                this.pageParams.total = res.data.total;
                                this.allPages = Math.ceil(
                                    this.pageParams.total /
                                        this.pageParams.limit
                                );
                                let retData = [];
                                if (res.data.list.length > 0) {
                                    retData = this.convertData(
                                        res.data.list[0]
                                    );
                                } else {
                                    retData = [];
                                }
                                this.gridData = retData;
                                this.loadFlag = false;
                            })
                            .catch(() => {
                                this.gridData = [];
                                this.loadFlag = false;
                            });
                    }, 500);
                }
            } else {
                this.resultFlag = false;
                this.timer = null;
            }
        },
        blur() {
            this.timer = null;
        },
        setNodeId(id) {
            this.goBackTree();
            this.$router.push({
                name: "OrganizationContent",
                params: {
                    nodeId: id,
                },
            });
        },
        goBackTree() {
            this.keyWord = "";
            this.resultFlag = false;
            // this.$router.push({
            //     name: "OrganizationContent",
            //     params: {
            //         nodeId: this.defaultNodeId,
            //     },
            // });
        },
        convertData(treeData) {
            const keyNav = [];
            const list = [];
            this.getConvertData(treeData, keyNav, list);
            return list;
        },
        getConvertData(treeData, keyNav, list) {
            if (treeData.name) {
                keyNav.push({
                    name: treeData.name,
                    id: treeData.id,
                });
            }
            const children = treeData.children;
            if (children && children.length) {
                children.forEach((item) => {
                    this.getConvertData(
                        item,
                        JSON.parse(JSON.stringify(keyNav)),
                        list
                    );
                });
            } else {
                list.push({
                    keyNav: keyNav,
                });
            }
        },
        pageReduce() {
            this.pageParams.page--;
            console.log(this.pageParams.page);
            if (this.pageParams.page < 1) {
                this.pageParams.page = 1;
            }
            this.getResult();
        },
        pageAdd() {
            this.pageParams.page++;
            console.log(this.pageParams.page);
            this.getResult();
        },
        keyWordColor(name) {
            return name.replace(this.keyWord, function (sMatch) {
                // 为所匹配的单词添加颜色
                return sMatch.replace(
                    sMatch,
                    '<span style="color:#58a4f3">' + sMatch + "</span>"
                );
            });
        },
    },
    watch: {
        value(newVal) {
            this.type = newVal;
            this.getResult();
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
