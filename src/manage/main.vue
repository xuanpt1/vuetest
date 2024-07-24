<template>
  <header-used style="padding-bottom: 0">
  </header-used>

  <div class="main-box">
    <a-card style="position:absolute;width: 100%;height: 40%;opacity: 0.99">
      <template #cover>
        <img alt="example" src="@/assets/images/background/arona.jpg" />
      </template>
    </a-card>


    <div class="card-box" >

      <a-card hoverable class="welcome-card">
        <a-card-meta title="xuanpt2" description="欢迎回来！">
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-card-meta>
      </a-card>

      <a-card @mouseenter="onMouseOver1()"
              @mouseleave="onMouseLeave1()"
              hoverable
              :class="{'card1':true,'card1-ontop':top1}">
        <div v-if="top1">
        <h3><b>页面导航</b></h3>
        </div>
        <a-button style="left: 20%;
                          width: 60%;
                          height: 5%;
                          background-color: #ecf0f3;
                          border-radius: 3px;
                          margin-bottom: 5%"
                  @click="goEdit">=><FormOutlined />写博客</a-button>
        <a-button style="left: 20%;
                          width: 60%;
                          background-color: #ecf0f3;
                          border-radius: 3px;
                          margin-bottom: 5%"
                  @click="goGroup">=><TeamOutlined />群组管理</a-button>
        <a-button style="left: 20%;
                          width: 60%;
                          background-color: #ecf0f3;
                          border-radius: 3px"
                  @click="goSort">=><SettingOutlined />站点管理</a-button>
        <a-card v-if="top1pic"
                :bordered="false"
                style=" position: absolute;
                        width: 25%;
                        right: 5%;
                        bottom: 3%">
          <template #cover>
            <img alt="example" src="@/assets/images/background/kyk5.png" />
          </template>
        </a-card>
      </a-card>

      <a-card @mouseenter="onMouseOver2()"
              @mouseleave="onMouseLeave2()"
              hoverable
              :class="{'card2':true,'card2-ontop':top2}">
        <div v-if="top2">
          <h3><b>分类文章</b></h3>
        </div>
        <div id="myChart" :style="{ width: '100%', height: '150%' }"></div>
        <a-card v-if="top2pic"
                :bordered="false"
                style=" position: absolute;
                        width: 25%;
                        right: 5%;
                        bottom: 3%">
          <template #cover>
            <img alt="example" src="@/assets/images/background/kyk5.png" />
          </template>
        </a-card>
      </a-card>

      <a-card @mouseenter="onMouseOver3()"
              @mouseleave="onMouseLeave3()"
              hoverable
              :class="{'card3':true,'card3-ontop':!top3}">
        <div v-if="!top3">
          <h3><b>站点访问量</b></h3>
        </div>
        <div id="myChart2" :style="{ width: '100%', height: '150%' }"></div>
        <a-card v-if="top3pic"
                :bordered="false"
                style=" position: absolute;
                        width: 25%;
                        right: 5%;
                        bottom: 3%">
          <template #cover>
            <img alt="example" src="@/assets/images/background/kyk5.png" />
          </template>
        </a-card>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import HeaderUsed from "@/manageComponents/headerUsed.vue";
import {onMounted, reactive, ref} from "vue";
import {
  FormOutlined,
  TeamOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import * as echarts from 'echarts'
import router from "@/router";

//echart方法
const state = reactive({
  option: {
    grid: {
      top: '4%',
      left: '2%',
      right: '4%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ["test","科学","影视","乐器","CD","游戏"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '博客数',
        type: 'bar',
        barWidth: '40%',
        data: [1,5,3,6,2,6],
      },
    ],
  },
})
const state2 = reactive({
  option: {
    grid: {
      top: '4%',
      left: '2%',
      right: '4%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ["-5","-4","-3","-2","-1","今天"],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: '访问量',
        type: 'line',
        barWidth: '40%',
        data: [10,11,3,6,3,12],
      },
    ],
  },
})
const initeCharts = () => {
  let myChart = echarts.init(document.getElementById('myChart'))
  // 绘制图表
  myChart.setOption(state.option)
}
const initeCharts2 = () => {
  let myChart2 = echarts.init(document.getElementById('myChart2'))
  // 绘制图表
  myChart2.setOption(state2.option)
}

onMounted(() => {
  initeCharts()
  initeCharts2()
})


//信息卡片方法
const top1 = ref(false);
const top1pic = ref(false);
const top2 = ref(false);
const top2pic = ref(false);
const top3 = ref(true);
const top3pic = ref(false);
const onMouseOver1 = () =>{
  top1.value = true;
  setTimeout(() => {
    top1pic.value = true;
  }, 200);
}
const onMouseLeave1 = () =>{
  setTimeout(() => {
    top1.value = false;
    top1pic.value = false;
  }, 200);
}
const onMouseOver2 = () =>{
  top2.value = true;
  setTimeout(() => {
    top2pic.value = true;
  }, 200);
}
const onMouseLeave2 = () =>{
  top2.value = false;
  setTimeout(() => {
    top2pic.value = false;
  }, 200);
}
const onMouseOver3 = () =>{
  top3.value = !top3.value;
  setTimeout(() => {
    top3pic.value = true;
  }, 200);
}
const onMouseLeave3 = () =>{
  setTimeout(() => {
    top3.value = !top3.value;
    top3pic.value = false;
  }, 200);
}

//跳转方法
const goEdit = () => {
  router.push("/manage/editor");
}
const goGroup = () => {
  router.push("/manage/group");
}
const goSort = () => {
  router.push("/manage/siteset/sort");
}

</script>

<style scoped>
.main-box{
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #ecf0f3;
}
.welcome-card{
  position: absolute;
  width: 25%;
  height: 20%;
  left: 9%;
  top: 12%;
  background-color: #ecf0f3;
}
.card-box{
  top: 40%;
  width: 65%;
  right: 0;
}
.card1{
  position: absolute;
  width: 30%;
  height: 30%;
  right: 13%;
  bottom: 65%;
  opacity: 0.9;
  transition: all 0.5s;
}
.card1-ontop{
  position: absolute;
  width: 55%;
  height: 70%;
  right: 10%;
  bottom: 25%;
  opacity: 0.8;
  z-index: 150;
  transition: all 0.5s;
}
.card2{
  position: absolute;
  width: 30%;
  height: 30%;
  right: 23%;
  bottom: 45%;
  opacity: 0.9;
  transition: all 0.5s;
}
.card2-ontop{
  position: absolute;
  width: 55%;
  height: 70%;
  right: 10%;
  bottom: 25%;
  opacity: 0.8;
  z-index: 150;
  transition: all 0.5s;
}
.card3{
  position: absolute;
  width: 30%;
  height: 30%;
  right: 33%;
  bottom: 25%;
  opacity: 0.9;
  transition: all 0.5s;
}
.card3-ontop{
  position: absolute;
  width: 55%;
  height: 70%;
  right: 10%;
  bottom: 25%;
  opacity: 0.8;
  z-index: 150;
  transition: all 0.5s;
}
</style>