<template>
  <div class="page-container">
    <h1 class="print-only-title">投入产出折线图报表</h1>
    <div class="control-panel">
      <h3>投入产出折线图</h3>
      <div class="actions">
        <button class="btn btn-primary" @click="exportToExcel">
          📥 导出 Excel
        </button>
        <button class="btn btn-secondary" @click="handlePrint">
          🖨️ 打印报表
        </button>
      </div>
    </div>
    <div class="chart-wrapper">
      <div class="chart-desc">
        <p><strong>效率分析：</strong>各产线设备投入与产出量的平滑曲线对比。</p>
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

// --- 具名函数 ---
const handleResize = () => {
  if (myChart) myChart.resize()
}

const exportToExcel = () => {
  if (!chartData) return
  const wsData = [
    ['设备ID', '投入量', '产出量'],
    ...chartData.state.map((item, index) => [
      item,
      chartData.data1[index],
      chartData.data2[index],
    ]),
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, '投入产出对比.xlsx')
}

const handlePrint = () => {
  if (!myChart) return
  myChart.setOption({
    backgroundColor: '#ffffff',
    legend: { textStyle: { color: '#000000' } },
    xAxis: { axisLabel: { color: '#000000' } },
    yAxis: {
      axisLabel: { color: '#000000' },
      splitLine: { lineStyle: { color: '#cccccc' } },
    },
  })
  setTimeout(() => window.print(), 300)
}

const revertChartTheme = () => {
  if (!myChart) return
  myChart.setOption({
    backgroundColor: 'transparent',
    legend: { textStyle: { color: '#e2e8f0' } },
    xAxis: { axisLabel: { color: '#cbd5e1' } },
    yAxis: {
      axisLabel: { color: '#cbd5e1' },
      splitLine: { lineStyle: { color: '#334155' } },
    },
  })
}

onMounted(() => {
  myChart = echarts.init(chartRef.value, 'dark')
  $.get('/line.json', function (data) {
    chartData = data
    const option = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['投入量', '产出量'],
        top: 10,
        textStyle: { color: '#e2e8f0' },
      },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.state,
        axisLabel: { color: '#cbd5e1' },
      },
      yAxis: {
        type: 'value',
        splitLine: { show: true, lineStyle: { color: '#334155' } },
        axisLabel: { color: '#cbd5e1' },
      },
      series: [
        {
          name: '投入量',
          type: 'line',
          smooth: true,
          data: data.data1,
          label: { show: true, position: 'top' },
          itemStyle: { color: '#5470c6' },
        },
        {
          name: '产出量',
          type: 'line',
          smooth: true,
          data: data.data2,
          label: { show: true, position: 'bottom' },
          itemStyle: { color: '#91cc75' },
        },
      ],
    }
    myChart.setOption(option)
  })
  window.addEventListener('resize', handleResize)
  window.addEventListener('afterprint', revertChartTheme)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('afterprint', revertChartTheme)
  if (myChart) {
    myChart.dispose()
    myChart = null
  }
})
</script>

<style scoped>
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
  color: white;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
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
.print-only-title {
  display: none;
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
