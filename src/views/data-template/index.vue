<template>
    <div class="data-template">
        <div style="margin-bottom: 10px;">
            <el-button size="small" type="primary" style="margin-right: 10px;"
                >模板</el-button
            >
            <el-select
                v-model="tableName"
                placeholder="请选择"
                @change="tableChange"
            >
                <el-option
                    v-for="item in tableList"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                >
                </el-option>
            </el-select>
        </div>
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in templateList" :key="item.id">
                <div class="template-item">
                    <p class="title">
                        {{ item.modelName }}
                    </p>
                    <div class="content">
                        <img
                            :src="
                                item.type === 'word'
                                    ? url3
                                    : item.type === 'txt'
                                    ? url2
                                    : item.type === 'excel'
                                    ? url1
                                    : url4
                            "
                            alt=""
                        />
                    </div>
                    <div class="template-footer">
                        <el-button size="mini" type="text" style="float: left;"
                            >在线预览</el-button
                        >
                        <el-button
                            size="mini"
                            type="text"
                            style="float: right;"
                            @click="downloadTemplate(item.modelUrl)"
                            >下载</el-button
                        >
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
        ></el-pagination>
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/new/handle-table";
import downloadBinaryFile from "@src/mixins/downloadBinaryFile";
export default {
    mixins: [handleTable, downloadBinaryFile],
    data() {
        return {
            tableName: 3,
            tableList: [
                { id: 1, name: "安顺市考核情况" },
                { id: 2, name: "贵阳市考核情况" },
                { id: 3, name: "情况3" },
                { id: 4, name: "情况4" },
            ],
            templateList: [
                {
                    modelName: "模板1：安顺市考核情况",
                    modelId: 6486,
                    createTime: 104172363955,
                    id: 6882,
                    modelUrl: "",
                    type: "word",
                },
                {
                    modelName: "模板2：安顺市考核情况",
                    modelId: 6486,
                    createTime: 104172363955,
                    id: 6883,
                    modelUrl: "",
                    type: "word",
                },
                {
                    modelName: "模板3：安顺市考核情况",
                    modelId: 6486,
                    createTime: 104172363955,
                    id: 6884,
                    modelUrl: "",
                    type: "excel",
                },
                {
                    modelName: "模板4：安顺市考核情况",
                    modelId: 6486,
                    createTime: 104172363955,
                    id: 6885,
                    modelUrl: "",
                    type: "txt",
                },
                {
                    modelName: "模板5：安顺市考核情况",
                    modelId: 6486,
                    createTime: 104172363955,
                    id: 6886,
                    modelUrl: "",
                    type: "excel",
                },
                {
                    modelName: "模板5：安顺市考核情况",
                    modelId: 6486,
                    createTime: 104172363955,
                    id: 6887,
                    modelUrl: "",
                    type: "pdf",
                },
            ],
            url1: require("@src/common/images/excel.png"),
            url2: require("@src/common/images/txt.png"),
            url3: require("@src/common/images/word.png"),
            url4: require("@src/common/images/v2_qb1aza.png"),
        };
    },
    mounted() {
        // this.getGrid();
    },
    methods: {
        tableChange(data) {
            this.tableName = data;
        },
        getGrid() {
            let data = {
                page: this.page.current,
                pageSize: this.page.limit,
            };
            api[urlNames["getTemplateList"]](data).then(
                (res) => {
                    this.templateList = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.templateList = [];
                    this.page.total = 0;
                }
            );
        },
        downloadTemplate(modelUrl) {
            let params = { path: modelUrl };
            this.downloadBinaryFile("template", params);
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
