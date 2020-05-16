<template>
    <div class="dic-edit-dialog">
        <el-dialog
            :title="dialogTitle"
            :fullscreen="false"
            :visible.sync="visible"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
        >
            <div class="dialog-close" @click="closeDialog">
                <i class="el-icon-close"></i>
            </div>
            <!--表单-->
            <el-form :model="form">
                <el-form-item label="字段名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字段描述" :label-width="formLabelWidth">
                    <el-input v-model="form.desc" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="启用状态" :label-width="formLabelWidth">
                    <el-switch
                        v-model="stateValue"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                    >
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="passExamine = false"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { api, urlNames } from "@src/api";

export default {
    props: ["visible", "close", "dialogTitle"],
    components: {},
    data() {
        return {
            form: {
                name: "",
                state: false,
                desc: "",
            },
            formLabelWidth: "120px",
            stateValue: "",
        };
    },
    mounted() {},
    computed: {
        ...mapState(["app"]),
    },
    methods: {
        passExamine() {
            this.dialogVisible = true;
        },
        closeDialog() {
            this.$emit("close", "dialogVisible");
        },
        submitForm(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let data = new FormData();
                    let keys = Object.keys(this.editForm);
                    let len = keys.length;
                    for (let i = 0; i < len; i++) {
                        let key = keys[i];
                        let value = this.editForm[key];
                        if (value) {
                            data.append(key, value);
                        }
                    }
                    api[urlNames["sendEditRightsInfo"]](data).then(
                        (res) => {
                            this.$message({
                                message: this.current ? "修改成功" : "添加成功",
                                type: "success",
                            });
                            this.$emit("refreshList");
                            this.closeDialog();
                        },
                        (/* error */) => {}
                    );
                }
            });
        },
    },
};
</script>
