<template>
  <div class="chart-container">
    <div class="desc">
      <h3>图表需求</h3>
      <p>用折线图展示生产设备投入量与产出量。</p>
      <ul>
        <li>展示图表标题</li>
        <li>为图表添加提示信息</li>
        <li>添加图例，并使其显示在右侧，距上方30像素</li>
        <li>将图表改为平滑折线图</li>
        <li>设置投入量折线数据标签显示在上方</li>
        <li>设置产出量折线数据标签显示在下方</li>
      </ul>
    </div>
    <div ref="chartRef" class="chart-box"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
let myChart = null;

onMounted(() => {
  myChart = echarts.init(chartRef.value);

  const option = {
    title: { text: '生产设备投入量与产出量' },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['投入量', '产出量'],
      right: '10%', top: '30px'
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['DS-01', 'DS-03', 'DS-05', 'QE-02', 'WOS-01']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '投入量',
        type: 'line',
        smooth: true,
        data: [3350, 3327, 2949, 4820, 3005],
        label: { show: true, position: 'top' }
      },
      {
        name: '产出量',
        type: 'line',
        smooth: true,
        data: [5734, 6266, 6339, 7858, 6380],
        label: { show: true, position: 'bottom' }
      }
    ]
  };

  myChart.setOption(option);
  window.addEventListener('resize', () => myChart.resize());
});

onUnmounted(() => {
  if(myChart) myChart.dispose();
});
</script>

<style scoped>
.chart-container { display: flex; width: 1200px; }
.desc { width: 400px; padding-right: 20px; }
.chart-box { width: 800px; height: 400px; }
ul { padding-left: 20px; line-height: 2; }
</style>