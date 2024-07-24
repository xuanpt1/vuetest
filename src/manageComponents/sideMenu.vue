<template>
  <div class="card">
    <div id="test" style="width: 600px;height: 400px"></div>
  </div>
</template>


<script setup>
import * as echarts from 'echarts';
import { onMounted } from "vue";

onMounted(() => {//需要获取到element,所以是onMounted的Hook
  let myChart = echarts.init(document.getElementById("test"));
  // 绘制图表
  myChart.setOption({
    title: { text: "博文数量" },
    tooltip: {},
    xAxis: {
      data: ["sort1", "sort2", "sort3", "sort4", "sort5", "sort6"],
    },
    yAxis: {},
    series: [
      {
        name: "数量",
        type: "line",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  });
  window.onresize = function () {//自适应大小
    myChart.resize();
  };
});

</script>

<style scoped>

</style>