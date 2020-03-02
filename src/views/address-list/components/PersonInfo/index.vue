<template>
  <div class="PersonInfo">
    <el-form :inline="true" label-position="left" label-width="70px" :model="personInfoList">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="personInfoList.name" placeholder="暂无数据" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <div style="position:relative">
              <el-input v-model="personInfoList.mobile" placeholder="暂无数据" disabled></el-input>
              <span
                style="color:red"
                class="find"
                @click="findMobile"
                v-if="phoneState&&personInfoList.isForeign==0&&personInfoList.mobile!=='无'"
              >查看</span>
            </div>
          </el-form-item>
          <el-form-item label="座机号码">
            <el-input v-model="personInfoList.num" placeholder="暂无数据" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职务">
            <el-input v-model="personInfoList.duty" placeholder="暂无数据" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
export default {
  name: 'personInfo',
  props: ['personInfoList', 'phoneState', 'activeColor'],
  data() {
    return {
      state: '',
      showBtn: true,
      val: ''
    }
  },
  methods: {
    findMobile() {
      api[urlNames['findMobileById']]({
        uid: this.personInfoList.uid
      }).then(res => {
        if (res) {
          this.personInfoList.mobile = res.data.mobile
          this.$emit('showPhoneState')
        }
      })
    }
  }
}
</script>
<style lang="less">
@import 'index.less';
</style>
