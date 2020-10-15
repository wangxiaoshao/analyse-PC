<template>
    <div class="apply-search">
        <el-form label-position="right" inline label-width="110px">
            <el-form-item label="选择市州：">
                <el-select
                    v-model="searchParams.cityStateName"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in selectData.cityStateData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择区县：">
                <el-select
                    v-model="searchParams.districtName"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in selectData.districtData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择单位：">
                <el-select v-model="searchParams.unitName" placeholder="请选择">
                    <el-option
                        v-for="item in selectData.unitData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区分考核单位：">
                <el-select
                    v-model="searchParams.isCheckUnitName"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in selectData.isCheckUnitData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="日期：">
                <el-date-picker
                    v-model="searchParams.date"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                >
                </el-date-picker>
            </el-form-item>
            <br />
            <el-form-item label="选择应用：">
                <div></div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectData: {
                cityStateData: [
                    { id: 1, name: "贵阳市" },
                    { id: 2, name: "安顺市" },
                    { id: 3, name: "六盘水市" },
                ],
                districtData: [
                    { id: 1, name: "云岩区" },
                    { id: 2, name: "观山湖区" },
                    { id: 3, name: "花溪区" },
                ],
                unitData: [
                    { id: 1, name: "惠智1" },
                    { id: 2, name: "惠智2" },
                    { id: 3, name: "惠智3" },
                ],
                isCheckUnitData: [
                    { id: 1, name: "考核单位" },
                    { id: 2, name: "非考核单位" },
                ],
            },
            searchParams: {
                cityStateName: "", // 市州
                districtName: "", // 区县
                unitName: "", // 单位,
                isCheckUnitName: "", // 是否为考核单位
                date: "",
            },
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
