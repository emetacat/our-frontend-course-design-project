<template>
  <div class="container">
    <div class="navigate">
      <h3>Vue+ECharts实现工业制造行业数据可视化</h3>
      <p>
        随着工业技术的发展，数据量越来越大，为工业制造带来了无限的机遇与挑战。如何在海量数据中提起有价值的信息，使工业加速发展?这时，数据可视化应运而生，将统计数据以图表、图像、报表等形式呈现，使复杂的数据变得直观易懂，其主要体现在：原料采购分析、设备运行分析、生产进度监控、故障分析与改进、决策支持等。
        <span>本项目主要实现如下五个图表：（点击导航可查看图表详情）</span>
      </p>

      <div class="nav-links">
        <router-link to="/bar">簇状条形图</router-link>
        <router-link to="/area">面积图</router-link>
        <router-link to="/bar2">柱形图</router-link>
        <router-link to="/pie">饼图</router-link>
        <router-link to="/line">折线图</router-link>
      </div>
    </div>

    <div class="pages">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: sans-serif;
  padding: 20px;
  min-width: 1300px;
}

.navigate h3 {
  text-align: center;
  height: 64px;
  line-height: 64px;
  margin-bottom: 20px;
}

.navigate p {
  width: 1280px;
  margin: 0 auto 30px;
  line-height: 1.6;
  text-indent: 2em;
}

.navigate p span {
  color: #ff0000;
  display: block;
  margin-top: 10px;
  text-indent: 0;
}

.nav-links {
  display: flex;
  width: 1280px;
  margin: 0 auto 40px;
  justify-content: space-between;
}

.nav-links a {
  display: block;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: #ddd;
  text-align: center;
  text-decoration: none;
  color: #333;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #ff0000;
  text-decoration: underline;
}

.pages {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
