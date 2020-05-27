<template>
    <div class="word-unload">
        <div class="unloadForm">
            <el-form
                label-width="80px"
                :model="ruleForm"
                ref="formFile"
                :rules="wordRules"
                enctype="multipart/form-data"
            >
                <el-form-item label="文档标题" prop="title">
                    <el-input
                        style="width: 250px;"
                        v-model="ruleForm.title"
                    ></el-input>
                </el-form-item>
                <el-form-item label="文档描述" prop="description">
                    <el-input
                        type="textarea"
                        style="width: 250px;"
                        v-model="ruleForm.description"
                    ></el-input>
                </el-form-item>
                <el-form-item label="文档正文">
                    <div class="editor-container">
                        <vue-ueditor-wrap
                            v-model="ruleForm.content"
                            :config="myConfig"
                            ref="ue"
                        ></vue-ueditor-wrap>
                    </div>
                </el-form-item>
                <el-form-item label="添加附件">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        name="file"
                        action="/api/jg_manage/import/userImport"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                    >
                        <el-button slot="trigger" size="small" type="primary"
                            >选取文件</el-button
                        >
                        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <div style="text-align: center;">
                        <el-button
                            type="primary"
                            @click="saveWordFile('formFile')"
                            >保存</el-button
                        >
                        <el-button @click="goBack">返回</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
import { api, urlNames } from "@src/api";

export default {
    name: "WordUnload",
    mixins: [handleBreadcrumb],
    components: {
        // 使用编辑器
        VueUeditorWrap,
    },
    data() {
        return {
            fileList: [], // 文件列表
            myConfig: {
                // serverUrl: `${__GATEWAYPATH__}/ueditor/ueditorConfig`, // 上传功能的后端服务器接口地址
                UEDITOR_HOME_URL: "/ueditor/", // 你的UEditor资源存放的路径,相对于打包后的index.html
                autoHeightEnabled: true, // 编辑器是否自动被内容撑高
                autoFloatEnabled: false, // 工具栏是否可以浮动
                initialFrameHeight: 250, // 初始容器高度
                initialFrameWidth: "100%", // 初始容器宽度
                enableAutoSave: false, // 关闭自动保存,
            },
            ruleForm: {
                content: "",
                title: "",
                description: "",
            },
            // 表单验证
            wordRules: {
                title: [
                    { required: true, message: "请输入标题", trigger: "blur" },
                ],
                description: [
                    {
                        required: true,
                        message: "请输入详细内容",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    mounted() {
        this.pushBreadcrumb({
            name: "文件上传",
            parent: {
                path: `/word-center`,
            },
        });
    },
    methods: {
        getUEContent() {
            let content = this.$refs.ue.getUEContent();
            console.log(content);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        saveWordFile(saveForm) {
            this.$refs[saveForm].validate((valid) => {
                if (valid) {
                } else {
                    this.$message.error("请根据提示填写必填字段");
                }
            });
        },
        // 导入文件
        fileSubmit() {
            let that = this;
            let form = that.$refs["formFile"].$el;
            let formData = new FormData(form);
            formData.append("file", this.fileList);
            api[urlNames["importUser"]](formData).then(
                (res) => {
                    if (res.status === 0) {
                        this.$message.success("导入人员成功");
                        this.loading = false;
                        this.fileList = [];
                    }
                },
                () => {
                    this.loading = false;
                    this.fileList = [];
                }
            );
        },
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
