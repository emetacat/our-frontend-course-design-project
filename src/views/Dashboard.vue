<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h2>🏭 智慧工厂生产实时监控看板</h2>
    </div>

    <div class="grid-container">
      <div class="card">
        <div class="card-title">设备投入产出 (实时)</div>
        <div ref="barChart" class="mini-chart"></div>
      </div>

      <div class="card">
        <div class="card-title">工序合格率分布</div>
        <div ref="pieChart" class="mini-chart"></div>
      </div>

      <div class="card wide">
        <div class="card-title">生产趋势分析 (近7天)</div>
        <div ref="lineChart" class="mini-chart"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import $ from 'jquery'

const barChart = ref(null)
const pieChart = ref(null)
const lineChart = ref(null)
const charts = []

onMounted(() => {
  // 1. 初始化 Bar
  const barInstance = echarts.init(barChart.value, 'dark')
  charts.push(barInstance)
  $.get('/bar.json', (data) => {
    barInstance.setOption({
      backgroundColor: 'transparent',
      grid: { top: 30, bottom: 20, left: 40, right: 10 },
      xAxis: { type: 'value', show: false }, // 简化展示
      yAxis: { type: 'category', data: data.state },
      series: [
        { type: 'bar', data: data.data2, itemStyle: { color: '#0ca8df' } },
      ],
    })
  })

  // 2. 初始化 Pie
  const pieInstance = echarts.init(pieChart.value, 'dark')
  charts.push(pieInstance)
  $.get('/pie.json', (res) => {
    const pieData = res.list.map((item) => ({
      name: item.production,
      value: item.value,
    }))
    pieInstance.setOption({
      backgroundColor: 'transparent',
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          data: pieData,
          label: { show: false }, // 简化
        },
      ],
    })
  })

  // 3. 初始化 Line
  const lineInstance = echarts.init(lineChart.value, 'dark')
  charts.push(lineInstance)
  $.get('/line.json', (data) => {
    lineInstance.setOption({
      backgroundColor: 'transparent',
      grid: { top: 30, bottom: 20, left: 30, right: 10 },
      xAxis: { type: 'category', data: data.state, boundaryGap: false },
      yAxis: { type: 'value', splitLine: { show: false } },
      series: [
        {
          type: 'line',
          smooth: true,
          data: data.data2,
          areaStyle: { opacity: 0.2 },
        },
      ],
    })
  })

  window.addEventListener('resize', resizeCharts)
})

const resizeCharts = () => charts.forEach((c) => c.resize())

onUnmounted(() => {
  window.removeEventListener('resize', resizeCharts)
  charts.forEach((c) => c.dispose())
})
</script>

<style scoped>
.dashboard {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dashboard-header h2 {
  color: #fff;
  text-align: center;
  margin: 0 0 20px 0;
  font-size: 1.5rem;
  letter-spacing: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(12, 168, 223, 0.2),
    transparent
  );
  padding: 10px;
}

.grid-container {
  display: grid;
  /* 桌面端默认 2 列，每列等宽 */
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  flex: 1;
}

.card {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

/* 占据两列的宽卡片 */
.wide {
  grid-column: span 2;
}

.card-title {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 10px;
  font-weight: bold;
  border-left: 3px solid #0ca8df;
  padding-left: 8px;
}

.mini-chart {
  flex: 1;
  min-height: 200px;
  width: 100%;
}

/* ===== 移动端适配 ===== */
@media screen and (max-width: 768px) {
  .grid-container {
    /* 移动端强制单列 */
    grid-template-columns: 1fr;
  }

  .wide {
    grid-column: span 1; /* 取消跨列 */
  }

  .dashboard-header h2 {
    font-size: 1.2rem;
  }
}
</style>
