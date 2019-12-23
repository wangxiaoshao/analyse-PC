import sha1 from 'js-sha1'

/**
 * mixins
 * 翻页、排序、过滤、自动计算table高度
 * 获取列表方法名需要统一为 getGrid()
 */
export default {
  data () {
    return {}
  },
  methods: {
    downloadBinaryFile (url, param, type) {
      let timestamp = (new Date()).getTime()
      let openUrl = ''
      console.log(type)
      if (type === 2) {
        openUrl = url + 'api/jg_manage/user/exportUser' + '?_=' + timestamp + '&orgId=' + param + '&sign=' + this.getSign({ orgId: param }, timestamp)
      }else if( type === 3){
        openUrl = url + 'api/jg_manage/user/exportUser' + '?_=' + timestamp + '&sign=' + this.getSign('', timestamp)
      }else{
        openUrl = url + 'api/jg_manage/user/exportUser' + '?_=' + timestamp + '&deptId=' + param + '&sign=' + this.getSign({ deptId: param }, timestamp)
      }
      window.open(openUrl)
    },
    /*
     * @des: get 请求加签，此方法不适用与post
     */
    getSign (params, timestamp) {
      let data = JSON.parse(JSON.stringify(params))
      data = (typeof data === 'object') ? data : {}
      // 时间戳需要传入，才能保持时间戳一致
      data._ = timestamp
      let aKeys = Object.keys(data)
      let aSign = []

      let length = aKeys.length
      for (let i = 0; i < length; i++) {
        let key = aKeys[i]
        aSign.push(key + '=' + data[key])
      }
      aSign.sort()
      return sha1(aSign.join(''))
    }
  }
}
