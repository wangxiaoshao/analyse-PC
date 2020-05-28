<template>
    <div class="tag-container">
        <el-dialog
            title="选择标签"
            :visible.sync="openSearchFlag"
            :showClose="false"
            width="55%"
        >
            <i class="el-icon-close tag-close" @click="close"></i>
            <el-input
                placeholder="请输入内容"
                v-model="tagKeyWord"
                class="input-with-select"
                @change="searchTag"
                @input="searchTag"
                @blur="blur"
                @keyup.enter.native="searchTag"
            >
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
      <div class="tip">
        <p v-if="this.addInfo.type === 1">单位标签</p>
        <p v-else-if="this.addInfo.type === 2">内设机构标签</p>
        <p v-else-if="this.addInfo.type === 3">人员标签</p>
      </div>
            <div class="tag-content" v-loading="loading">
                <el-checkbox-group v-model="checkTagGroup">
                    <el-checkbox
                        v-for="item in searchTags"
                        border
                        :label="`${item.id}` + '|' + `${item.name}`"
                        :title="item.name"
                        :value="item.id"
                        :key="item.id"
                        >{{ item.name }}</el-checkbox
                    >
                </el-checkbox-group>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="sendTags">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { api, urlNames } from "@src/api";
export default {
    props: ["addInfo", "openSearchFlag", "defaultList", "delSelectLabelId"],
    data() {
        return {
            loading: true,
            addFlag: false,
            tagKeyWord: "",
            checkTagGroup: [],
            searchTags: [],
            getCheckTags: [],
            sendInfo: {},
            timer: null,
        };
    },
    created() {
        this.addFlag = this.sendInfo.searchFlag;
    },
    methods: {
        close() {
            this.tagKeyWord = "";
            this.searchTags = [];
            this.checkTagGroup = [];
            this.$emit("close", false);
        },
        // 搜索标签
        searchTag() {
            this.loading = true;
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                api[urlNames["findLabelByType"]]({
                    type: this.addInfo.type,
                    name: this.tagKeyWord,
                }).then(
                    (res) => {
                        this.searchTags = res.data;
                        this.loading = false;
                    },
                    () => {
                        this.loading = false;
                        this.searchTags = [];
                    }
                );
            }, 800);
        },
        sendTags() {
            this.$emit("getTag", this.checkTagGroup);
            this.$emit("close", false);
        },
        blur() {
            this.timer = null;
        },
    },
    watch: {
        openSearchFlag(val) {
            if (val === true) {
                this.tagKeyWord = "";
                this.searchTag();
                // this.checkTagGroup = this.defaultList
            }
        },
        delSelectLabelId(val, old) {
            this.checkTagGroup = this.checkTagGroup.filter(function (item) {
                return item !== val;
            });
        },
    },
};
</script>

<style lang="less">
@import "index";
</style>
