<template>
  <div class="app-wrapper">
    <header class="header">
      <div class="header-left">
        <div class="logo">
          工业制造数据可视化平台 <span class="version">V2.0 PRO</span>
        </div>
      </div>
      <div class="header-right">
        <div class="time">{{ currentTime }}</div>
      </div>
    </header>

    <div class="main-content">
      <nav class="sidebar">
        <router-link to="/dashboard" class="nav-item">
          <span class="icon">📊</span> <span class="text">综合看板</span>
        </router-link>
        <router-link to="/bar" class="nav-item">
          <span class="icon">📈</span> <span class="text">簇状条形图</span>
        </router-link>
        <router-link to="/area" class="nav-item">
          <span class="icon">📉</span> <span class="text">面积图</span>
        </router-link>
        <router-link to="/bar2" class="nav-item">
          <span class="icon">📊</span> <span class="text">柱形图</span>
        </router-link>
        <router-link to="/pie" class="nav-item">
          <span class="icon">🥧</span> <span class="text">饼图</span>
        </router-link>
        <router-link to="/line" class="nav-item">
          <span class="icon">📉</span> <span class="text">折线图</span>
        </router-link>
      </nav>

      <main class="content-view">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
let timer = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString()
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style>
/* 全局变量与基础样式 */
:root {
  --bg-color: #0b1120;
  --sidebar-bg: #1e293b;
  --text-primary: #e2e8f0;
  --accent-color: #0ca8df;
  --border-color: #334155;
}

body {
  margin: 0;
  background-color: var(--bg-color);
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* 顶部栏 */
.header {
  height: 60px;
  background: linear-gradient(90deg, #1e293b 0%, #0f172a 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 2px solid var(--accent-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  z-index: 100;
  flex-shrink: 0;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--accent-color);
  text-shadow: 0 0 10px rgba(12, 168, 223, 0.4);
}

.version {
  font-size: 0.8rem;
  color: #64748b;
  margin-left: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.time {
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #94a3b8;
  font-size: 0.9rem;
}

/* 主布局 */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* 侧边导航 */
.sidebar {
  width: 220px;
  background-color: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  padding: 15px 20px;
  transition: all 0.3s;
  border-left: 4px solid transparent;
  display: flex;
  align-items: center;
  font-size: 1rem;
}

.nav-item .icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: rgba(51, 65, 85, 0.5);
  color: #fff;
  border-left-color: var(--accent-color);
}

/* 内容区 */
.content-view {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-image: linear-gradient(rgba(30, 41, 59, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30, 41, 59, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  background-color: #0b1120;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .header {
    height: 50px;
    padding: 0 10px;
  }
  .logo {
    font-size: 1rem;
  }
  .version,
  .time {
    display: none;
  }
  .main-content {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
    flex-direction: row;
    overflow-x: auto;
    padding: 0;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    background: #151e2e;
  }
  .nav-item {
    flex: 0 0 auto;
    padding: 12px 15px;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  .nav-item:hover,
  .nav-item.router-link-active {
    background: transparent;
    border-bottom-color: var(--accent-color);
  }
}

/* ========== 打印专用样式 ========== */
@media print {
  /* 隐藏所有不相关元素 */
  .header, 
  .sidebar, 
  .control-panel, /* 页面内的按钮栏 */
  .chart-desc     /* 页面内的说明文字 */ {
    display: none !important;
  }

  /* 强制重置背景和颜色 */
  body,
  html,
  .app-wrapper,
  .main-content,
  .content-view {
    background: #ffffff !important;
    color: #000000 !important;
    height: auto !important;
    width: 100% !important;
    overflow: visible !important;
    margin: 0 !important;
    padding: 0 !important;
    display: block !important;
  }

  /* 图表容器调整 */
  .page-container {
    width: 100% !important;
    display: block !important;
  }

  .chart-wrapper {
    background: none !important;
    border: none !important;
    padding: 0 !important;
    margin: 0 !important;
    box-shadow: none !important;
  }

  /* 强制显示打印标题 */
  .print-only-title {
    display: block !important;
    text-align: center;
    font-size: 24pt;
    font-weight: bold;
    margin-bottom: 30px;
    border-bottom: 2px solid #000;
    padding-bottom: 15px;
    color: #000 !important;
  }

  /* 确保图表高度适合打印A4纸 */
  .chart-box {
    height: 600px !important;
    width: 100% !important;
  }
}
</style>
