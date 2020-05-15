<template>
    <div>
        <div>
            <div class="department-content">
                <department-table></department-table>
            </div>
        </div>
    </div>
</template>
<script>
import departmentTable from "../components/Department/index";
export default {
    components: {
        departmentTable,
    },
    data() {
        return {
            tableData: [
                {
                    department: "人事部",
                    tel: "",
                    next: "下级",
                },
                {
                    department: "人事部",
                    tel: "内设机构电话：13412341234",
                    next: "下级",
                },
                {
                    department: "人事部",
                    tel: "电话：13412341234",
                    next: "下级",
                },
                {
                    department: "人事部",
                    tel: "电话：13412341234",
                    next: "下级",
                },
            ],
        };
    },
};
</script>
<style lang="less">
@import "index";
</style>
