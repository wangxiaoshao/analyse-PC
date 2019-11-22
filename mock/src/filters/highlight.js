/**
 * Created by lxe on 2018/6/25.
 */

/* eslint-disable */

import Vue from 'vue'

/*
 * @Description：高亮显示搜索关键字：今天/昨天/具体日期（fmt）
 * @param：
 *  time: 标准时间：yyyy-MM-dd hh:mm:ss
 *  fmt: 具体日期的显示格式
 */
Vue.filter('highlight', function (str, key, className) {
  str = str ? str : '';
  let keyword = 'object' === typeof key ? key.join('|') : key;
  let reg = new RegExp(`${keyword}`, 'ig')
  className = className ? className : 'text-red';
  if (!!trim(str) && !!trim(key)) {
    str = str.replace(reg, function(word) {
      return `<em class="${className}">${word}</em>`
    });
  }
  return str;
})

// 去除字符串首尾空格
const trim = (str) => {
  return (str + '').replace(/(\s+)$/g, '').replace(/^\s+/g, '')
}
