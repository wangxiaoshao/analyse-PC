<template>
    <div class="help-center">
        <div class="uploadBox" v-if="isProvinceOrAudit()">
            <el-upload
                :limit="6"
                :auto-upload="false"
                name="file"
                action="api/appdata/helpFile/upload/helpFile"
                :file-list="fileList"
                :on-change="fileChange"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeAvatarUpload"
                multiple
            >
                <el-button slot="trigger" size="small" type="primary"
                    >选取文件</el-button
                >
                <el-button
                    style="margin-left: 10px;"
                    size="small"
                    type="success"
                    v-show="fileList.length > 0"
                    @click="submitUpload"
                    >上传</el-button
                >
                <div slot="tip" class="el-upload__tip">
                    上传文件类型为 txt/doc/docx/pdf/excel 等格式!
                    <p
                        class="text-style"
                        style="padding-top: 10px;"
                        v-show="fileList.length > 0"
                    >
                        选取文件后点击上传按钮方可生效。
                    </p>
                </div>
            </el-upload>
        </div>
        <div class="table-box">
            <el-table :show-header="false" :data="tableData">
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
                <el-table-column>
                    <template slot-scope="scope">
                        <p style="padding: 8px 0;">
                            <span> {{ scope.row.fileName }}</span>
                            <span style="float: right;">
                                <el-button
                                    size="mini"
                                    type="text"
                                    @click="getView(scope.row.id)"
                                    >在线预览</el-button
                                >
                                <el-button
                                    size="mini"
                                    type="text"
                                    @click="downLoadWord(scope.row)"
                                    >下载</el-button
                                >
                                <el-button
                                    size="mini"
                                    type="text"
                                    v-show="isProvinceOrAudit()"
                                    @click="confirmDeleteFile(scope.row.id)"
                                    >删除</el-button
                                >
                            </span>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
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
    </div>
</template>
<script>
import { api, urlNames } from "@src/api";
import handleTable from "@src/mixins/handle-table";
import { mapState } from "vuex";
export default {
    mixins: [handleTable],
    data() {
        return {
            tableData: [],
            activeName: "second",
            fileList: [],
            uploadForm: new FormData(),
        };
    },
    mounted() {
        this.getGrid();
    },
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        isProvinceOrAudit() {
            return (
                this.app.rolesInfo.roleName === "PROVINCE_MANAGER" ||
                this.app.rolesInfo.roleName === "SECURITY_AUDIT_MANAGER" ||
                this.app.rolesInfo.roleName === "SUPER_MANAGER"
            );
        },
        getGrid() {
            let data = {
                page: this.page.current,
                pageSize: this.page.limit,
            };
            api[urlNames["getHelpFileList"]](data).then(
                (res) => {
                    this.tableData = res.data;
                    this.page.total = res.total;
                },
                () => {
                    this.tableData = [];
                    this.page.total = 0;
                }
            );
        },
        getView(id) {
            api[urlNames["getHelperview"]]({ id }).then((res) => {
                if (res) {
                    window.open(res);
                }
            });
        },
        confirmDeleteFile(id) {
            this.handleRow("确定要删除该文件吗？", id, this.deleteFile);
        },
        deleteFile(id) {
            api[urlNames["deleteFile"]]({ id }).then((res) => {
                if (res) {
                    if (res.status === 0) {
                        this.getGrid();
                        this.$message.success("文件删除成功");
                    }
                }
            });
        },
        downLoadWord(row) {
            let apiUrl = "/api/appdata/helpFile/download/helpFile";
            let host = window.location.href.split("#")[0];
            let openUrl = host + apiUrl + "?id=" + row.id;
            let a = document.createElement("a");
            a.download = row.fileName;
            a.style.display = "none";
            a.href = openUrl;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        fileChange(file, fileList) {
            this.fileList = fileList;
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定要移除文件 ${file.name}吗？`);
        },
        beforeAvatarUpload() {
            // this.showFileList = true;
        },
        submitUpload() {
            this.uploadForm = new FormData();
            for (let i = 0; i < this.fileList.length; i++) {
                this.uploadForm.append("file", this.fileList[i].raw);
            }
            api[urlNames["uploadFile"]](this.uploadForm)
                .then((res) => {
                    if (res.status === 0) {
                        this.getGrid();
                        this.fileList = [];
                        this.$message.success("文件上传成功");
                    }
                })
                .catch(() => {
                    this.uploadForm = new FormData();
                });
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
