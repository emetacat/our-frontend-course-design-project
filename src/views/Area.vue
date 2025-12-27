<template>
  <div class="page-container">
    <div class="control-panel">
      <h3>设备产量面积图分析</h3>
      <div class="actions">
        <button class="btn btn-primary" @click="exportToExcel">
          📥 导出 Excel
        </button>
        <button class="btn btn-secondary" @click="printChart">
          🖨️ 打印报表
        </button>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="chart-desc">
        <p><strong>趋势监控：</strong>DS-01至DS-05设备一周产量趋势对比。</p>
      </div>
      <div ref="chartRef" class="chart-box"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import $ from 'jquery'
import * as XLSX from 'xlsx'

const chartRef = ref(null)
let myChart = null
let chartData = null

const exportToExcel = () => {
  if (!chartData) return
  // 面积图数据结构较为复杂，需要转置
  const header = ['日期', 'DS-01', 'DS-02', 'DS-03', 'DS-04', 'DS-05']
  const body = chartData.time.map((t, i) => [
    t,
    chartData.data1[i],
    chartData.data2[i],
    chartData.data3[i],
    chartData.data4[i],
    chartData.data5[i],
  ])

  const ws = XLSX.utils.aoa_to_sheet([header, ...body])
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, '设备产量趋势.xlsx')
}

const printChart = () => window.print()

onMounted(() => {
  myChart = echarts.init(chartRef.value, 'dark')
  $.get('/area.json', function (data) {
    chartData = data
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } },
      },
      legend: {
        data: ['DS-01', 'DS-02', 'DS-03', 'DS-04', 'DS-05'],
        top: 10,
        textStyle: { color: '#e2e8f0' },
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.time,
        axisLabel: { color: '#cbd5e1' },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: true, lineStyle: { color: '#334155' } },
        axisLabel: { color: '#cbd5e1' },
      },
      series: [
        {
          name: 'DS-01',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' },
          data: data.data1,
          itemStyle: { color: '#879bd7' },
        },
        {
          name: 'DS-02',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' },
          data: data.data2,
          itemStyle: { color: '#b2db9e' },
        },
        {
          name: 'DS-03',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' },
          data: data.data3,
          itemStyle: { color: '#fbd88a' },
        },
        {
          name: 'DS-04',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' },
          data: data.data4,
          itemStyle: { color: '#f39494' },
        },
        {
          name: 'DS-05',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: { focus: 'series' },
          data: data.data5,
          itemStyle: { color: '#9dd3e8' },
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
/* 复用 Bar.vue 的 CSS 样式 */
.page-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}
.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(30, 41, 59, 0.6);
  padding: 15px 20px;
  border-radius: 8px;
  border: 1px solid #334155;
  flex-wrap: wrap;
  gap: 10px;
}
.control-panel h3 {
  margin: 0;
  color: #0ca8df;
  font-size: 1.1rem;
}
.actions {
  display: flex;
  gap: 10px;
}
.btn {
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
}
.btn-primary {
  background-color: #0ca8df;
}
.btn-primary:hover {
  background-color: #0284c7;
}
.btn-secondary {
  background-color: #475569;
}
.btn-secondary:hover {
  background-color: #334155;
}
.chart-wrapper {
  flex: 1;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}
.chart-desc {
  margin-bottom: 15px;
  color: #94a3b8;
  font-size: 0.9rem;
  border-left: 3px solid #0ca8df;
  padding-left: 10px;
}
.chart-box {
  flex: 1;
  width: 100%;
  min-height: 350px;
}
@media print {
  .control-panel,
  .chart-desc {
    display: none;
  }
  .chart-wrapper {
    border: none;
    background: white;
  }
  .chart-box {
    min-height: 600px;
  }
}
@media screen and (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: flex-start;
  }
  .actions {
    width: 100%;
    margin-top: 10px;
  }
  .btn {
    flex: 1;
    justify-content: center;
    padding: 10px;
  }
  .chart-wrapper {
    padding: 10px;
  }
  .chart-box {
    min-height: 300px;
  }
}
</style>
