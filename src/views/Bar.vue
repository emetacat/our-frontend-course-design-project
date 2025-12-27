<template>
  <div class="page-container">
    <div class="control-panel">
      <h3>簇状条形图数据分析</h3>
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
        <p><strong>数据监控：</strong>展示各状态设备的投入、产出及订单数据。</p>
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

// --- 导出功能 ---
const exportToExcel = () => {
  if (!chartData) return
  // 构建二维数组
  const wsData = [
    ['设备状态', '投入量', '产出量', '订单量'],
    ...chartData.state.map((item, index) => [
      item,
      chartData.data1[index],
      chartData.data2[index],
      chartData.data3[index],
    ]),
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
  XLSX.writeFile(wb, '簇状条形图数据.xlsx')
}

// --- 打印功能 ---
const printChart = () => {
  window.print()
}

onMounted(() => {
  myChart = echarts.init(chartRef.value, 'dark')

  $.get('/bar.json', function (data) {
    chartData = data // 保存数据供导出使用

    const option = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'axis' },
      legend: {
        data: ['投入量', '产出量', '订单量'],
        top: 10,
        textStyle: { color: '#e2e8f0' },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
        splitLine: { show: true, lineStyle: { color: '#334155' } },
        axisLabel: { color: '#cbd5e1' },
      },
      yAxis: {
        type: 'category',
        data: data.state,
        axisLabel: { color: '#cbd5e1', fontWeight: 'bold' },
      },
      series: [
        {
          name: '投入量',
          type: 'bar',
          data: data.data1,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#3b82f6' },
              { offset: 1, color: '#60a5fa' },
            ]),
          },
        },
        {
          name: '产出量',
          type: 'bar',
          data: data.data2,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#10b981' },
              { offset: 1, color: '#34d399' },
            ]),
          },
        },
        {
          name: '订单量',
          type: 'bar',
          data: data.data3,
          itemStyle: { color: '#f59e0b' },
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

/* 打印适配 */
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

/* 移动端适配 */
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
