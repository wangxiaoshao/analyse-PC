/**
 * mixins
 * 字典
 */
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['app']),
    partisanOptions () { // 党派
      return this.app.dicList.filter(column => +column.type === 1)
    },
    classOption () { // 四大班子
      return this.app.dicList.filter(column => +column.type === 2)
    },
    applicationOption () { // 系统体系
      return this.app.dicList.filter(column => +column.type === 3)
    },
    userTypeOptions () { // 身份类型
      return this.app.dicList.filter(column => +column.type === 21)
    },
    personTypeOptions () { // 人员类型
      return this.app.dicList.filter(column => +column.type === 22)
    },
    userActionOptions () { // 人员状态
      return this.app.dicList.filter(column => +column.type === 23)
    },
    userSexOptions () { // 人员性别
      return this.app.dicList.filter(column => +column.type === 24)
    },
    userPankOptions () { // 职级
      return this.app.dicList.filter(column => +column.type === 25)
    },
    userEducationOptions () { // 学历
      return this.app.dicList.filter(column => +column.type === 26)
    },
    userDegreeOptions () { // 学位
      return this.app.dicList.filter(column => +column.type === 27)
    },
    userNationOptions () { // 民簇
      return this.app.dicList.filter(column => +column.type === 28)
    },
    userDutyLevelOptions () { // 单位职务级别
      return this.app.dicList.filter(column => +column.type === 40)
    },
    userBusinessTypeOptions () { // 单位行业类型
      return this.app.dicList.filter(column => +column.type === 41)
    },
    dutyNameTypeOptions () { // 职务
      return this.app.dicList.filter(column => +column.type === 29)
    }
  },
  methods: {
    ...mapMutations(['DIC_LIST'])
  },
  mounted () {}
}
