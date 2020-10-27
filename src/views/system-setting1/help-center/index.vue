<template>
    <div class="help-center">
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
                            <span> {{ scope.row.title }}</span>
                            <span style="float: right;">
                                <el-button size="mini" type="text"
                                    >在线预览</el-button
                                >
                                <el-button size="mini" type="text"
                                    >下载</el-button
                                >
                            </span>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [{ title: "应用考核指标" }, { title: "数据分析" }],
        };
    },
    methods: {
        handleClick() {},
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
