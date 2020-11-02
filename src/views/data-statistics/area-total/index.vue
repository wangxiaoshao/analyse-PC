<template>
    <div class="area-total">
        <el-form label-position="right" inline>
            <el-form-item label="单位类型">
                <el-select
                    size="medium"
                    placeholder="请选择单位类型"
                    @change="unitTypeChange"
                    v-model="unitType"
                >
                    <el-option
                        v-for="item in unitTypeList"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择区域">
                <el-select
                    size="medium"
                    placeholder="请选择区域"
                    @change="stateChange"
                    v-model="stateId"
                >
                    <el-option
                        v-for="item in stateList"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择区县">
                <el-select
                    size="medium"
                    placeholder="请选择区县"
                    @change="areaChange"
                    v-model="areaId"
                >
                    <el-option
                        v-for="item in areaList"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <!-- <span>日期：</span> -->
                <el-date-picker
                    v-model="searchDate"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="dateChange"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchData">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchDate: "",
            unitType: "",
            stateId: "",
            areaId: "",
            unitTypeList: [],
            stateList: [],
            areaList: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;
                },
                shortcuts: null,
            },
        };
    },
    methods: {
        unitTypeChange() {},
        dateChange() {},
        stateChange() {},
        areaChange() {},
        searchData() {},
    },
};
</script>
