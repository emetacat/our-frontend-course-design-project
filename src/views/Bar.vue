<template>
  <div class="chart-container">
    <div class="desc">
      <h3>图表需求</h3>
      <p>
        编写Vue工程代码，请求JSON数据，用簇状条形图展示各状态设备的投入量、产出量及订单量。
      </p>
      <ul>
        <li>展示图表标题</li>
        <li>为图表添加提示信息</li>
        <li>添加图例，并使其显示在右侧，距上方30像素</li>
        <li>为投入量设置最大值和最小值</li>
        <li>为产出量设置平均值</li>
        <li>为订单量柱子添加灰色背景</li>
      </ul>
    </div>
    <div ref="chartRef" class="chart-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import $ from 'jquery' // 引入jQuery

const chartRef = ref(null)
let myChart = null

onMounted(() => {
  myChart = echarts.init(chartRef.value)

  // 请求 bar.json 数据
  $.get('/bar.json', function (data) {
    const option = {
      title: {
        text: '各状态设备的投入量、产出量及订单量',
        top: '10px',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['投入量', '产出量', '订单量'],
        right: '10%',
        top: '50px',
      },
      grid: {
        top: '120px',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: data.state, // 动态渲染Y轴分类
      },
      series: [
        {
          name: '投入量',
          type: 'bar',
          data: data.data1, // 动态渲染投入量
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' },
            ],
          },
        },
        {
          name: '产出量',
          type: 'bar',
          data: data.data2, // 动态渲染产出量
          markLine: {
            data: [{ type: 'average', name: 'Avg' }],
          },
        },
        {
          name: '订单量',
          type: 'bar',
          data: data.data3, // 动态渲染订单量
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    }
    myChart.setOption(option)
  })

  window.addEventListener('resize', () => myChart && myChart.resize())
})

onUnmounted(() => {
  if (myChart) myChart.dispose()
})
</script>

<style scoped>
.chart-container {
  display: flex;
  width: 1200px;
}
.desc {
  width: 400px;
  padding-right: 20px;
}
.chart-box {
  width: 800px;
  height: 400px;
}
ul {
  padding-left: 20px;
  line-height: 2;
}
</style>
