# 工业制造行业数据可视化 / Industrial Manufacturing Data Visualization

## 📖 项目介绍 / Introduction

### 实训背景 / Background

随着工业技术的发展，数据量越来越大，为工业制造带来了无限的机遇与挑战。如何在海量数据中提起有价值的信息，使工业加速发展？这时，数据可视化应运而生，将统计数据以图表、图像、报表等形式呈现，使复杂的数据变得直观易懂。其主要体现在：原料采购分析、设备运行分析、生产进度监控、故障分析与改进、决策支持等。

With the development of industrial technology, the increasing volume of data brings infinite opportunities and challenges to industrial manufacturing. How to extract valuable information from massive data to accelerate industrial development? At this moment, data visualization emerged. It presents statistical data in the form of charts, images, and reports, making complex data intuitive and easy to understand. It is mainly reflected in: raw material procurement analysis, equipment operation analysis, production progress monitoring, fault analysis and improvement, decision support, etc.

---

## 🎯 实训任务与功能扩展 / Project Tasks & Extensions

本项目不仅完成了基础的可视化图表绘制，还针对实际应用场景进行了深度扩展与优化：

### 🔹 基础核心任务 / Core Tasks

1. **掌握搭建 Vue 项目的步骤** / Master the steps to set up a Vue project.
2. **会使用 HTML+CSS 布局网页** / Able to use HTML+CSS to layout web pages.
3. **能够使用 vue-router 实现路由切换** / Able to use vue-router to implement route switching.
4. **能够结合 ECharts 绘制可视化图表** / Able to combine ECharts to draw visualization charts.
5. **能够请求 JSON 数据渲染图表** / Able to request JSON data to render charts.
6. **绘制各状态设备的投入量、产出量及订单量簇状条形图** / Draw a clustered bar chart of input, output, and order volume.
7. **绘制 DS-01 到 DS-05 五个设备一周的产出量面积图** / Draw an area chart of weekly output for five devices.
8. **绘制不同工序产出量柱形图** / Draw a bar chart of output for different processes.
9. **绘制不同工序合格率饼图** / Draw a pie chart of pass rates for different processes.
10. **绘制生产设备投入量与产出量折线图** / Draw a line chart of production input vs output.

### 🚀 扩展与优化功能 / Extensions & Optimizations

1. **图表数据导出功能**：集成 `xlsx` 库，支持将当前展示的图表数据一键导出为 Excel 报表，便于数据留存与二次分析。
2. **智能打印报表功能**：实现了打印适配优化。点击打印时，系统自动屏蔽导航栏，并将图表从“深色模式”动态切换为“白底黑字”的文档模式，打印结束后自动恢复。
3. **综合看板 (Dashboard)**：新增 Dashboard 首页，聚合展示核心数据的缩略图（实时投入产出、合格率分布、趋势分析），实现关键指标一屏概览。
4. **UI 美化 (Dark Mode)**：重构整体界面，采用深色科技感配色方案，提升视觉体验。
5. **移动端响应式适配**：利用 CSS 媒体查询实现响应式布局。在移动端设备上，侧边导航栏自动转换为顶部横向滚动导航，图表容器高度自适应，确保跨设备访问体验。

---

## 🛠️ 技术栈与环境 / Tech Stack & Environment

### 开发环境 / Development Environment

- **Node.js**: v24.12.0
- **pnpm**: 10.26.2
- **npm**: 11.6.2
- **Editor**: VSCode

### 技术框架 / Frameworks & Libraries

- **Vue**: ^3.5.24 (Script Setup)
- **Vite**: ^7.2.4
- **Vue Router**: ^4.6.4
- **ECharts**: ^6.0.0
- **XLSX**: ^0.18.5 (用于数据导出)
- **jQuery**: ^3.7.1 (用于数据请求)

---

## 📂 项目结构 / Project Structure

```text
our-frontend-course-design-project
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ public              # 静态资源与模拟数据
│  ├─ area.json
│  ├─ bar.json
│  ├─ bar2.json
│  ├─ line.json
│  └─ pie.json
├─ README.md
├─ src
│  ├─ App.vue          # 根组件 (包含全局布局与响应式逻辑)
│  ├─ assets           # 图片资源
│  │  ├─ 结构图.png
│  │  ├─ 综合看板.png
│  │  ├─ 导出功能.png
│  │  ├─ 打印功能.png
│  │  └─ ...
│  ├─ docs             # 项目文档
│  ├─ main.js          # 入口文件
│  ├─ router
│  │  └─ index.js      # 路由配置 (含 Dashboard 路由)
│  ├─ style.css        # 全局样式
│  └─ views            # 页面视图组件
│     ├─ Dashboard.vue # [新增] 综合看板页面
│     ├─ Area.vue      # 面积图 (含导出/打印逻辑)
│     ├─ Bar.vue       # 簇状条形图 (含导出/打印逻辑)
│     ├─ Bar2.vue      # 柱形图 (含导出/打印逻辑)
│     ├─ Line.vue      # 折线图 (含导出/打印逻辑)
│     └─ Pie.vue       # 饼图 (含导出/打印逻辑)
└─ vite.config.js
```
