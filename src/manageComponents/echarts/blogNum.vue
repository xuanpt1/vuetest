<template>
    <div id="test" style="left:10%;width: 500px;height: 350px"></div>
</template>


<script setup>
import * as echarts from 'echarts';
import { onMounted } from "vue";

onMounted(() => {//需要获取到element,所以是onMounted的Hook
  let myChart = echarts.init(document.getElementById("test"));
  // 绘制图表
  myChart.setOption({
    title: { text: "总用户量" },
    tooltip: {},
    xAxis: {
      data: ["12-3", "12-4", "12-5", "12-6", "12-7", "12-8"],
    },
    yAxis: {},
    series: [
      {
        name: "用户量",
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