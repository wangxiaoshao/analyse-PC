<template >
    <div class="member-tab">


        <el-table
      :data="tableData"
      border
      style="width: 100%"
      v-show="tableData.length!==0"
      >
      <el-table-column
        prop="portraitUrl"
        label="头像"
        align="center"
        width="100">
        <template slot-scope="scope">
          <span class="portrait-url">
            <img :src="scope.row.portraitUrl">
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
     <el-table-column prop="mobile" label="手机号">
     </el-table-column>
      <el-table-column
        prop="duty"
        label="职位">
      </el-table-column>
    </el-table>
    </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
    props:['tableData','memberProps'],
    data(){
        return{

        }
    },
    created(){

    },
    methods:{

    },
}
</script>
<style lang="less">
@import 'index';
</style>