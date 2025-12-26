<template>
  <div class="chart-container">
    <div class="desc">
      <h3>图表需求</h3>
      <p>用面积图展示DS-01到DS-05五个设备一周的产出量。</p>
      <ul>
        <li>展示图表标题</li>
        <li>为图表添加提示信息，并设置鼠标交互样式</li>
        <li>添加图例，显示在右侧，距上方30像素</li>
        <li>设置图表高亮时淡出其它数据的图形特效</li>
      </ul>
    </div>
    <div ref="chartRef" class="chart-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let myChart = null

onMounted(() => {
  myChart = echarts.init(chartRef.value)

  const option = {
    title: {
      text: 'DS-01到DS-05五个设备一周的产出量',
      top: '10px',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: { backgroundColor: '#6a7985' },
      },
    },
    legend: {
      data: ['DS-01', 'DS-02', 'DS-03', 'DS-04', 'DS-05'],
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
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'DS-01',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'DS-02',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: 'DS-03',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'DS-04',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: 'DS-05',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  }

  myChart.setOption(option)
  window.addEventListener('resize', () => myChart.resize())
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
