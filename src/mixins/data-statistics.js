/**
 * Created by wangxiaoshao on 2020/11/05.
 */
import { areaReportList, logSrc } from '@src/config/report'
import pickerOptions from '@src/mixins/picker-options'
import reportUrl from '@src/config/reportUrl'
export default {
  mixins: [pickerOptions],
  data () {
    return {
      startDate: '',
      endDate: '',
      startDate1: '',
      endDate1: '',
      searchDate: [],
      searchMouth: [],
      searchEaraMouth: '',
      reportSrcList: areaReportList,
      tableName: '`static_db`.logger_action_',
      areaTableSrc: '',
      // hostApi:
      //     "http://172.16.68.41:8080/webroot/decision/view/report?viewlet=",
      // hostApi:
      //     "http://172.16.68.136/webroot/decision/view/report?viewlet=",
      hostApi: reportUrl + 'webroot/decision/view/report?viewlet=',
      srcUrl: '',
      logSrc: logSrc,
      unitTypeList: [
        { name: '非考核单位', type: 0 },
        { name: '考核单位', type: 1 },
        { name: '全部', type: 2 }
      ],
      formatParams: {
        format1: '',
        format2: '',
        format3: '',
        format4: ''
      }
    }
  },
  methods: {
    initializeDate (date) {
      this.searchDate = []
      // let startDate = this.$moment()
      //     .subtract(1, "weeks")
      //     .format("YYYY-MM-DD");
      let startDate = ''
      // 首页情况趋势日期处理 date如果存在，则开始日期以传入日期为准
      if (date) {
        startDate = this.$moment()
          .subtract(date, 'days')
          .format('YYYY-MM-DD')
      } else {
        startDate = this.$moment()
          .startOf('month')
          .format('YYYY-MM-DD')
      }
      const endDate = this.$moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD')
      this.searchDate[0] = startDate
      this.searchDate[1] = endDate
      this.startDate = this.searchDate[0]
      this.endDate = this.searchDate[1]
    },
    initializeEaraMounth () {
      const startDate = this.$moment()
        .subtract(1, 'months')
        .format('YYYYMM')
      this.searchEaraMouth = startDate
      this.startDate1 = this.searchEaraMouth
    },
    initializeMounth () {
      this.searchMouth = []
      const startDate = this.$moment()
        .subtract(1, 'months')
        .format('YYYYMM')
      const endDate = this.$moment().format('YYYYMM')
      this.searchMouth[0] = startDate
      this.searchMouth[1] = endDate
      this.startDate1 = this.searchMouth[0]
      this.endDate1 = this.searchMouth[1]
      this.doformatParams()
    },
    dateChange (val) {
      if (val) {
        this.startDate = val[0]
        this.endDate = val[1]
      }
    },
    mounthChange (val) {
      if (val) {
        this.startDate1 = val[0]
        this.endDate1 = val[1]
        this.doformatParams()
      }
    },
    earaMounthChange (val) {
      if (val) {
        this.startDate1 = val
      }
    },
    doformatParams () {
      this.formatParams.format1 =
                this.$moment(this.startDate1).format('YYYY') + '0'
      this.formatParams.format2 = this.$moment(this.startDate1).format(
        'YYYY'
      )
      this.formatParams.format3 =
                this.$moment(this.startDate1).format('MM') - 1
      this.formatParams.format4 =
                this.$moment(this.endDate1).format('MM') -
                this.$moment(this.startDate1).format('MM') +
                1
    },
    initSystem (type, str, systemId, isUnitTable) {
      // 首页处理
      if (!systemId) {
        systemId = this.systemId
      }
      const ary = this.reportSrcList.filter((item) => {
        return item.id === systemId
      })
      let url = ''
      let tableUrl = ''
      switch (type) {
        case 'area':
          url = this.hostApi + ary[0].areaUrl + str
          tableUrl = this.hostApi + ary[0].areaTableSrc + str
          this.areaSrc = url
          this.areaTableSrc = tableUrl
          break
        case 'unit':
          url = this.hostApi + ary[0].unitUrl + str
          this.unitSrc = url
          if (isUnitTable) {
            this.tableOrMemberSrc =
                            this.hostApi + ary[0].unitTableSrc + str
          } else {
            this.tableOrMemberSrc =
                            this.hostApi + ary[0].unitMemberTableSrc + str
          }
          break
        case 'person':
          if (ary[0].personUrl === '') {
            url = ''
          } else {
            url = this.hostApi + ary[0].personUrl + str
          }
          this.srcUrl = url
          break
        case 'province':
          if (ary[0].allProvinceUrl === '' || !ary[0].allProvinceUrl) {
            url = ''
          } else {
            url = this.hostApi + ary[0].allProvinceUrl + str
          }

          this.srcUrl = url
          break
        case 'homePerson':
          if (ary[0].homePersonUrl === '' || !ary[0].homePersonUrl) {
            url = ''
          } else {
            url = this.hostApi + ary[0].homePersonUrl + str
          }
          this.homePersonUrl = url
          break
        case 'cityOrCounty':
          url = this.hostApi + ary[0].cityOrCountyUrl + str
          this.srcUrl = url
          break
        case 'homeUnit':
          url = this.hostApi + ary[0].homeUnitUrl + str
          this.srcUrl = url
          break
        default:
          return null
      }
    },
    doSrcParams (data) {
      let str = ''
      Object.getOwnPropertyNames(data).forEach(function (key) {
        // if (data[key] !== "") {
        str += '&' + key + '=' + data[key]
        // }
      })
      return str
    }
  }
}
