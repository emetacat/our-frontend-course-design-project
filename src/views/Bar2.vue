<template>
  <div class="chart-container">
    <div class="desc">
      <h3>图表需求</h3>
      <p>用柱形图展示不同工序产出量。</p>
      <ul>
        <li>展示图表标题</li>
        <li>为图表添加提示信息</li>
        <li>为柱形图添加灰色背景</li>
        <li>设置柱子颜色为橙色（orange）</li>
        <li>显示数据标签，并设置字体颜色为白色</li>
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
    title: { text: '不同工序产出量' },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['QC', '封胶', '测试', '焊线', '贴片']
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: '产出量',
        type: 'bar',
        data: [74500, 35000, 75000, 50000, 110000],
        itemStyle: { color: 'orange' },
        showBackground: true,
        backgroundStyle: { color: 'rgba(220, 220, 220, 0.8)' },
        label: {
          show: true,
          color: '#fff',
          position: 'inside'
        }
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