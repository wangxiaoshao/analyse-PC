<template>
  <div class="PersonInfo">
    <el-form :inline="true" label-width="100px" label-position="right">
          <el-row>
            <el-col>
              <el-form-item label="姓名">
                <div class="table-td" :title="personInfoList.name">{{personInfoList.name}}</div>
              </el-form-item>
               <el-form-item label="职   务">
                <div class="table-td">{{personInfoList.duty||'无'}}</div>
              </el-form-item>
            </el-col>
            <el-col>
               <el-form-item label="手机号码">
                <div class="table-td">
                  <span>{{personInfoList.mobile||'无'}}</span>
                  <a
                    href="javaScrpit:void(0)"
                    v-if="personInfoList.mobile&&personInfoList.mobile!=''&&personInfoList.mobile!=='无'&& !personInfoList.isLooked"
                    style="color: #FC7049;font-size:12px;margin-left:5px"
                    @click="findMobile(1)"
                  >查看</a>
                </div>
              </el-form-item>
              <el-form-item label="座机号码">
                <div class="table-td">
                  <span>{{personInfoList.officePhone||'无'}}</span>
                  <a
                    href="javaScrpit:void(0)"
                    v-if="personInfoList.officePhone&&personInfoList.officePhone!=''&&personInfoList.officePhone!=='无'&& !personInfoList.isOfficePhone"
                    style="color: #FC7049;font-size:12px;margin-left:5px"
                    @click="findMobile(2)"
                  >查看</a>
                </div>

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
  data () {
    return {
      state: '',
      showBtn: true,
      val: ''
    }
  },
  methods: {
    findMobile (state) {
      api[urlNames['findMobileById']]({
        uid: this.personInfoList.uid
      }).then(res => {
        if (res && state == 1) {
          this.personInfoList.mobile = res.data.mobile
          this.personInfoList.isLooked = true
        }
        if (res && state == 2) {
          this.personInfoList.officePhone = res.data.officePhone
          this.personInfoList.isOfficePhone = true
        }
      })
    }
  }
}
</script>
<style lang="less">
@import 'index.less';
</style>
