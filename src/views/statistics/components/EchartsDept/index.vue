<template>
  <div class="myChart" :style="{width: '100%', height: '320px', top: '-40px'}"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'echartsDept',
  props:['echartsName'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      let myChart = this.$echarts.init(document.getElementsByClassName('myChart')[0])
      myChart.setOption({
        dataset: {
          source: [
            ['amount', 'product'],
            [58212, '贵阳市'],
            [78254, '遵义市'],
            [41032, '安顺市'],
            [12755, '六盘水'],
            [20145, '毕节市'],
            [79146, '铜仁市'],
            [91852, '黔南州'],
            [101852, '黔西南州'],
            [20112, '黔东南州']
          ]
        },
        tooltip: {},
        grid: { containLabel: true },
        xAxis: { name: '人' },
        // yAxis: { type: 'category' },
        yAxis: [ { // 纵轴标尺固定
          type: 'category',
          scale: true,
          max: 8,
          min: 0,
          splitNumber: 10
        } ],
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
            },
            itemStyle: {
              normal: {
                color: '#a8bcd4'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


