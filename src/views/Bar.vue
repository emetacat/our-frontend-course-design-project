<template>
  <div class="chart-container">
    <div class="desc">
      <h3>图表需求</h3>
      <p>编写Vue工程代码，用簇状条形图展示各状态设备的投入量、产出量及订单量。</p>
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
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref(null);
let myChart = null;

onMounted(() => {
  myChart = echarts.init(chartRef.value);
  
  // 模拟数据
  const data = {
    categories: ['首检', '生产', '未排查', '故障处理'],
    input: [5802, 9000, 6500, 11897],
    output: [11000, 16000, 12000, 23891],
    orders: [9000, 15000, 11095, 21095]
  };

  const option = {
    title: { 
      text: '各状态设备的投入量、产出量及订单量',
      top: '10px' // 调整标题位置
    },
    tooltip: { 
      trigger: 'axis' 
    },
    legend: {
      data: ['投入量', '产出量', '订单量'],
      right: '10%', 
      top: '50px' // 图例下移，避免遮挡标题
    },
    grid: { 
      top: '120px', // 绘图区下移，避免遮挡图例
      left: '3%', 
      right: '4%', 
      bottom: '3%', 
      containLabel: true 
    },
    xAxis: { 
      type: 'value' 
    },
    yAxis: { 
      type: 'category', 
      data: data.categories 
    },
    series: [
      {
        name: '投入量',
        type: 'bar',
        data: data.input,
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        }
      },
      {
        name: '产出量',
        type: 'bar',
        data: data.output,
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: '订单量',
        type: 'bar',
        data: data.orders,
        showBackground: true, // 显示背景
        backgroundStyle: { 
          color: 'rgba(180, 180, 180, 0.2)' 
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