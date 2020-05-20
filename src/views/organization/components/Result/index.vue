<template>
    <div class="search-content">
        <el-popover
            ref="popover"
            placement="bottom-start"
            v-if="resultFlag"
            width="300"
        >
            <div class="back-btn">
                <el-button size="mini" @click="goBackTree">返回</el-button>
            </div>
            <div class="result-list">
                <el-table
                    v-loading="loadFlag"
                    :data="gridData"
                    :show-header="false"
                >
                    <el-table-column property="name">
                        <template slot-scope="scope">
                            <span
                                :title="scope.row.name"
                                class="table-span"
                                @click="setNodeId(scope.row)"
                                >{{ scope.row.name }}</span
                            >
                        </template>
                    </el-table-column>
                </el-table>
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
                    <!--          <el-option label="节点" value="1"></el-option>-->
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
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
            loadFlag: false,
            keyWord: "",
            value: "2",
            gridData: [],
            type: 2,
            restaurants: [],
            timer: null,
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
            };
            if (this.keyWord.length > 1) {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                // this.timer = this.debounce(this.getResultList, 800)
                this.timer = setTimeout(() => {
                    this.resultFlag = true;
                    this.loadFlag = true;
                    api[urlNames["searchViewNode"]](data).then((res) => {
                        this.gridData = res.data;
                        this.loadFlag = false;
                    });
                }, 800);
            } else {
                this.resultFlag = false;
                this.timer = null;
            }
        },
        blur() {
            this.timer = null;
        },
        setNodeId(row) {
            this.$router.push({
                name: "OrganizationContent",
                params: {
                    nodeId: row.id,
                },
            });
        },
        goBackTree() {
            this.keyWord = "";
            this.resultFlag = false;
            this.$router.push({
                name: "OrganizationContent",
                params: {
                    nodeId: this.defaultNodeId,
                },
            });
        },
    },
    watch: {
        value(newVal) {
            this.type = newVal;
            this.getResult();
        },
    },
};
</script>

<style lang="less">
@import "index";
</style>
