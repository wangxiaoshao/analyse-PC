/**
 * Created by lxe on 2018/6/25.
 */

/* eslint-disable */

import Vue from 'vue'

Vue.filter('partDate', function (time, fmt) {
  if (time) {
    var d = new Date(time);
    var o = {
      'M+': d.getMonth() + 1, //month
      'd+': d.getDate(),    //day
      'h+': d.getHours(),   //hour
      'm+': d.getMinutes(), //minute
      's+': d.getSeconds(), //second
      'q+': Math.floor((d.getMonth() + 3) / 3),  //quarter
      'S': d.getMilliseconds() //millisecond
    }
    var format = 'yyyy-MM-dd';
    if (fmt) {
      format = fmt;
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format
  } else {
    return ''
  }
})

Vue.filter('allDate', function (time, fmt) {
  if (time) {
    var re = /-?\d+/;
    var m = re.exec(time);
    var d = new Date(parseInt(m[0]));
    var o = {
      'M+': d.getMonth() + 1, //month
      'd+': d.getDate(),    //day
      'h+': d.getHours(),   //hour
      'm+': d.getMinutes(), //minute
      's+': d.getSeconds(), //second
      'q+': Math.floor((d.getMonth() + 3) / 3),  //quarter
      'S': d.getMilliseconds() //millisecond
    }
    var format = 'yyyy-MM-dd hh:mm:ss';
    if (fmt) {
      format = fmt;
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format
  } else {
    return ''
  }
})
/*
 * @Description：时间转换：今天/昨天/具体日期（fmt）
 * @param：
 *  time: 标准时间：yyyy-MM-dd hh:mm:ss
 *  fmt: 具体日期的显示格式
 */
Vue.filter('dateStr', function (standardTime, fmt) {
  if (standardTime) {
    let time = new Date(standardTime.replace(/-/g, '/')).getTime()
    let re = /-?\d+/
    let m = re.exec(time)
    let d = new Date(parseInt(m[0]))
    let definiteDateStr = getDefiniteDateStr(time)

    var o = {
      'M+': d.getMonth() + 1, //month
      'd+': d.getDate(),    //day
      'h+': d.getHours(),   //hour
      'm+': d.getMinutes(), //minute
      's+': d.getSeconds(), //second
      'q+': Math.floor((d.getMonth() + 3) / 3),  //quarter
      'S': d.getMilliseconds() //millisecond
    }
    var format = 'yyyy-MM-dd hh:mm:ss'
    if (fmt) {
      format = fmt;
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }

    if (definiteDateStr) {
      let endStr = format.split(' ')[1];
      if (endStr) {
        return definiteDateStr + ' ' + format.split(' ')[1];
      }
      return definiteDateStr;
    } else {
      return format;
    }
  } else {
    return '';
  }
})

Vue.filter('millisecondToTime', function (value) {
  if (value !== undefined && !isNaN(value)) {
    let seconds = parseInt(parseInt(value) / 1000)
    let day = parseInt(seconds / (60 * 60 * 24))
    let dayRemainder = seconds % (60 * 60 * 24)
    let hour
    let hourRemainder
    let minute
    let minuteRemainder
    if (day >= 1) {
      hour = parseInt(dayRemainder / (60 * 60))
      hourRemainder = dayRemainder % (60 * 60)
      minute = parseInt(hourRemainder / 60)
      minuteRemainder = hourRemainder % 60
    } else {
      hour = parseInt(seconds / (60 * 60))
      hourRemainder = seconds % (60 * 60)
      if (hour >=1 ) {
        minute = parseInt(hourRemainder / 60)
        minuteRemainder = hourRemainder % 60
      } else {
        minute = parseInt(seconds / 60)
        minuteRemainder = seconds % 60
      }
    }
    let second = minuteRemainder
    return `${day < 1 ? '' : day + '天'}${hour < 1 ? '' : hour + '小时'}${minute < 1 ? '' : minute + '分钟'}${second > 0 ? second + '秒':''}`
  } else {
    return ''
  }
})

/*----- util function ------*/
const getDefiniteDateStr = (timestamp) => {
  let re = /-?\d+/
  let now = new Date().getTime()
  let todayFormatTimestamp = re.exec(now)
  let yesterdayFormatTimestamp = re.exec(now - 24*60*60*1000)
  let currentFormatTimestamp = re.exec(timestamp)

  let today = new Date(parseInt(todayFormatTimestamp[0]))
  let yesterday = new Date(parseInt(yesterdayFormatTimestamp[0]))
  let current = new Date(parseInt(currentFormatTimestamp[0]))

  if(current.setHours(0,0,0,0) == today.setHours(0,0,0,0)){
    return '今天';
  }
  if(current.setHours(0,0,0,0) == yesterday.setHours(0,0,0,0)){
    return '昨天';
  }
  return ''
}
