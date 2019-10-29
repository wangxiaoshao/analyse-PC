<template>
  <div class="parameter-settings">
    <div class="parameter-item">
      <div class="header">用户密码安全设置</div>
      <el-form ref="form" :model="form" label-width="160px">
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="用户默认密码">
                <el-input size="mini" v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">主要用于设置创建人账号时，人员默认登录密码</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="登录失败次数">
                <el-input size="mini" v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">次，主要用于限定人员登录失败次数，如果超过该设置次数账号将被锁定，当设置为-1时失败次数无限制。</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="锁定用户时长">
                <el-input size="mini" v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">分钟，当人员输入密码错误超过最大限制时，人员账号将会被锁定时长。</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="密码过期周期">
                <el-input size="mini" v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">分钟，主要用于设置对人员密码设置过期时长限制时，人员账号将会被锁定时长。</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="密码是否强制修改">
                <el-select size="mini" v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">主要用于设置密码过期时，是否强制修改密码，如果不修改密码将不能登录系统</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="密码强制修改单位范围">
                <el-input size="mini" v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">主要用于设置那些单位登录系统需强制修改密码。-1或空则所有单位都需强制修改，如果设置有单位id，则只要求设置的单位登录系统后强制密码修改。</div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="用户登录密码强度">
                <el-select size="mini" v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="17">
            <div class="grid-content bg-purple-light">
              <div class="tip">强：由数字、字母(区分大小写)、特殊字符!@#$^&*三中同时组合，且长度8位以上</div>
            </div>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="parameter-item">
      <div class="header">通讯录权限设置</div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="所有单位信息">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助">可见</el-radio>
            <el-radio label="线下场地免费">不可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员姓名">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助">可见</el-radio>
            <el-radio label="线下场地免费">不可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员手机号">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助">可见</el-radio>
            <el-radio label="线下场地免费">不可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="单位座机号">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助">可见</el-radio>
            <el-radio label="线下场地免费">不可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="人员详情页">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助">可见</el-radio>
            <el-radio label="线下场地免费">不可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门座机号">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助">可见</el-radio>
            <el-radio label="线下场地免费">不可见</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="parameter-item">
      <div class="header">其他设置</div>
      <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="设置信息确认弹窗提醒">
          <el-checkbox-group  size="medium" v-model="checkboxGroup1">
            <el-checkbox-button label="7">每月最后七天</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="parameter-item">
      <div class="header">申请审核字段设置</div>
        <div class="table">
          <div class="table-row">
            <div class="table-td" style="text-align: center">模块</div>
            <div class="table-td" style="text-align: center">功能</div>
          </div>
          <div class="table-row">
            <div class="table-td">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </div>
            <div class="table-td"></div>
          </div>
          <div class="table-row">
            <div class="table-td">
              <p><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">节点</el-checkbox></p>
            </div>
            <div class="table-td">
              <p>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">新增</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">修改</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">节点名称</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">上级节点</el-checkbox>
              </p>
            </div>
          </div>
          <div class="table-row">
            <div class="table-td">
              <p><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">单位</el-checkbox></p>
            </div>
            <div class="table-td">
              <p>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">新增</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">修改</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">单位名称</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">单位电话</el-checkbox>
              </p>
              <p style="padding-top: 15px">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">所属系统</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">所属类型</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">上级单位</el-checkbox>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">启用禁用</el-checkbox>
              </p>
            </div>
          </div>
          <div class="table-row">
            <div class="table-td">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">部门</el-checkbox>
            </div>
            <div class="table-td"></div>
          </div>
          <div class="table-row">
            <div class="table-td">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">人员</el-checkbox>
            </div>
            <div class="table-td"></div>
          </div>
        </div>
      <el-form ref="form" :model="form" label-width="120px">
        <div class="el-table">
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  name: 'ParameterSettings',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      checkboxGroup1: ''
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped lang="less">
  @import "index";
</style>
