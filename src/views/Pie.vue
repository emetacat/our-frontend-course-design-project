<template>
  <div class="chart-container">
    <div class="desc">
      <h3>图表需求</h3>
      <p>用饼状图展示不同工序合格率。</p>
      <ul>
        <li>展示图表标题</li>
        <li>为图表添加提示信息</li>
        <li>添加图例，并使其显示在右侧</li>
        <li>设置饼图的半径为60%</li>
        <li>鼠标交互时，为饼图添加灰色阴影</li>
        <li>以百分比的格式显示饼图数据标签</li>
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
    title: { text: '不同工序合格率', left: 'center' },
    tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c} ({d}%)' },
    legend: { orient: 'vertical', left: 'right' },
    series: [
      {
        name: '合格率',
        type: 'pie',
        radius: '60%',
        data: [
          { value: 1048, name: 'QC' },
          { value: 735, name: '封胶' },
          { value: 580, name: '测试' },
          { value: 484, name: '焊线' },
          { value: 300, name: '贴片' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          show: true,
          formatter: '{b} : {d}%'
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