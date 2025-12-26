# 工业制造行业数据可视化 / Industrial Manufacturing Data Visualization

## 📖 项目介绍 / Introduction

### 实训背景 / Background

随着工业技术的发展，数据量越来越大，为工业制造带来了无限的机遇与挑战。如何在海量数据中提起有价值的信息，使工业加速发展？这时，数据可视化应运而生，将统计数据以图表、图像、报表等形式呈现，使复杂的数据变得直观易懂。其主要体现在：原料采购分析、设备运行分析、生产进度监控、故障分析与改进、决策支持等。

With the development of industrial technology, the increasing volume of data brings infinite opportunities and challenges to industrial manufacturing. How to extract valuable information from massive data to accelerate industrial development? At this moment, data visualization emerged. It presents statistical data in the form of charts, images, and reports, making complex data intuitive and easy to understand. It is mainly reflected in: raw material procurement analysis, equipment operation analysis, production progress monitoring, fault analysis and improvement, decision support, etc.

---

## 🎯 实训任务 / Project Tasks

本项目旨在完成以下核心实训任务：
The project aims to complete the following core training tasks:

1. **掌握搭建 Vue 项目的步骤** / Master the steps to set up a Vue project.
2. **会使用 HTML+CSS 布局网页** / Able to use HTML+CSS to layout web pages.
3. **能够使用 vue-router 实现路由切换** / Able to use vue-router to implement route switching.
4. **能够结合 ECharts 绘制可视化图表** / Able to combine ECharts to draw visualization charts.
5. **能够请求 JSON 数据渲染图表** / Able to request JSON data to render charts.
6. **绘制各状态设备的投入量、产出量及订单量簇状条形图** / Draw a clustered bar chart of input, output, and order volume of equipment in various states.
7. **绘制 DS-01 到 DS-05 五个设备一周的产出量面积图** / Draw an area chart of the weekly output of five devices from DS-01 to DS-05.
8. **绘制不同工序产出量柱形图** / Draw a bar chart of output for different processes.
9. **绘制不同工序合格率饼图** / Draw a pie chart of the pass rate of different processes.
10. **绘制生产设备投入量与产出量折线图** / Draw a line chart of production equipment input and output.

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

---

## 📂 项目结构 / Project Structure

```text
our-frontend-course-design-project
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ public
│  ├─ area.json
│  ├─ bar.json
│  ├─ bar2.json
│  ├─ line.json
│  └─ pie.json
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ 功能模块流程图.png
│  │  ├─ 结构图.png
│  │  ├─ 运行截图1-簇状条形图.png
│  │  ├─ 运行截图2-簇状条形图.png
│  │  ├─ 运行截图3-面积图.png
│  │  ├─ 运行截图4-面积图.png
│  │  ├─ 运行截图5-柱形图.png
│  │  ├─ 运行截图6-柱形图.png
│  │  ├─ 运行截图7-饼图.png
│  │  ├─ 运行截图8-饼图.png
│  │  ├─ 运行截图9-折线图.png
│  │  └─ 运行截图10-折线图.png
│  ├─ docs
│  │  ├─ 工业制造行业数据可视化VISIO.vsdx
│  │  └─ 项目开发总结报告.docx
│  ├─ main.js
│  ├─ router
│  │  └─ index.js
│  ├─ style.css
│  └─ views
│     ├─ Area.vue
│     ├─ Bar.vue
│     ├─ Bar2.vue
│     ├─ Line.vue
│     └─ Pie.vue
└─ vite.config.js
```
