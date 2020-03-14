<template>
  <div class="myChart" :style="{width: '100%', height: '320px', top: '-40px'}"></div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'echarts',
  props:['echartsAry'],
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
          source:this.echartsAry
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


