<template>
    <div class="word-unload">
        <div class="unloadForm">
            <el-form label-width="80px">
                <el-form-item label="文档标题">
                    <el-input style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="文档描述">
                    <el-input type="textarea" style="width: 250px;"></el-input>
                </el-form-item>
                <el-form-item label="文档正文">
                    <div class="edit_container"></div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import handleBreadcrumb from "@src/mixins/handle-breadcrumb.js";
export default {
    name: "WordUnload",
    mixins: [handleBreadcrumb],
    components: {
        // 使用编辑器
    },
    data() {
        return {
            infoForm: {
                a_title: "",
                a_source: "",
                a_content: "",
                editorOption: {},
            },
            // 表单验证
            rules: {
                a_title: [
                    { required: true, message: "请输入标题", trigger: "blur" },
                ],
                a_content: [
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
        onEditorReady(editor) {},
    },
};
</script>
<style lang="less" scoped>
@import "./index";
</style>
