<template>
    <div class="word-unload">
        <div class="unloadForm">
            <el-form
                label-width="80px"
                :model="wordForm"
                ref="wordForm"
                :rules="wordRules"
                enctype="multipart/form-data"
            >
                <el-form-item label="文档标题" prop="title">
                    <el-input
                        style="width: 250px;"
                        v-model="wordForm.title"
                    ></el-input>
                </el-form-item>
                <el-form-item label="文档描述" prop="description">
                    <el-input
                        type="textarea"
                        style="width: 250px;"
                        v-model="wordForm.description"
                    ></el-input>
                </el-form-item>
                <el-form-item label="文档正文">
                    <div class="editor-container">
                        <vue-ueditor-wrap
                            v-model="wordForm.content"
                            :config="myConfig"
                            ref="ue"
                        ></vue-ueditor-wrap>
                    </div>
                </el-form-item>
                <el-form-item label="添加附件">
                    <el-upload
                        v-model="wordForm.files"
                        class="upload-demo"
                        ref="upload"
                        name="file"
                        action="/api/jg_manage/doc/createDoc"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                        :on-change="fileChange"
                        :before-upload="beforeAvatarUpload"
                        multiple
                    >
                        <el-button slot="trigger" size="small" type="primary"
                            >选取文件</el-button
                        >
                        <div slot="tip" class="el-upload__tip">
                            上传文件类型为 txt/doc/docx/pdf 等格式!
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <div style="text-align: center;">
                        <el-button
                            type="primary"
                            @click="saveWordFile('wordForm')"
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
            uploadForm: new FormData(),
            count: 0,
            myConfig: {
                // serverUrl: `${__GATEWAYPATH__}/ueditor/ueditorConfig`, // 上传功能的后端服务器接口地址
                UEDITOR_HOME_URL: "/ueditor/", // 你的UEditor资源存放的路径,相对于打包后的index.html
                autoHeightEnabled: true, // 编辑器是否自动被内容撑高
                autoFloatEnabled: false, // 工具栏是否可以浮动
                initialFrameHeight: 250, // 初始容器高度
                initialFrameWidth: "100%", // 初始容器宽度
                enableAutoSave: false, // 关闭自动保存,
            },
            wordForm: {
                content: "",
                title: "",
                description: "",
                files: [],
                id: "",
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
            // let content = this.$refs.ue.getUEContent(;
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        handlePreview(file) {},
        fileChange(file, fileList) {
            this.fileList = fileList;
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定要移除文件 ${file.name}吗？`);
        },
        beforeAvatarUpload(file) {
            const isFile = file.type === "txt/doc/docx/pdf";
            // const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isFile) {
                this.$message.error("上传文件只能是 txt/doc/docx/pdf 格式!");
            }
            // if (!isLt2M) {
            //   this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isFileLimit && isLt2M;
            return isFile;
        },
        saveWordFile(saveForm) {
            this.wordForm.id = "";
            this.uploadForm.append("title", this.wordForm.title);
            this.uploadForm.append("description", this.wordForm.description);
            this.uploadForm.append("id", this.wordForm.id);
            this.uploadForm.append("content", this.wordForm.content);
            for (let i = 0; i < this.fileList.length; i++) {
                this.uploadForm.append("files", this.fileList[i].raw);
            }
            this.$refs[saveForm].validate((valid) => {
                if (valid) {
                    api[urlNames["createDoc"]](this.uploadForm).then((res) => {
                        this.$message.success("添加文档成功");
                        this.$router.go(-1);
                    });
                } else {
                    this.$message.error("请根据提示填写必填字段");
                }
            });
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
