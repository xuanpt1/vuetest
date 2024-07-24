<template>
  test
  <button @click="getData()">test axios 请求数据</button>
  <p>这是请求到的数据{{testData.list}}</p>
  <p>blog设置数据测试{{testData2.data}}</p>
  <p>option测试{{testData3.info2}}</p>
  <p>comments测试{{testData4.info3}}</p>

  <button @click="sendData()">test 发送数据</button>
  <p>测试发送数据状态：</p>
</template>

<script setup>
import {
  getAllComments,
  getAllGroups,
  getAllMetas, getAllRssContents,
  getContentById,
  getOptionByName,
  login, putRssSubByRurl,
  saveGroups
} from "@/utils/manage.js"
import {reactive, ref} from "vue";

let id = reactive(4);
const name = reactive("test");
const testData = reactive({
  list: ''
})
const testData2 = reactive({
  data: []
})
const testData3 = reactive({
  info2: ''
})
const testData4 = reactive({
  info3: ''
})
const testData5 = reactive({
  info4: ''
})

//测试获取数据方法
const getData = function (){
  login().then((res)=>{
    console.log(res.data.data);
  })
  getAllGroups().then((res)=>{
    console.log(res.data.data);
  })
  getAllRssContents().then((res)=>{
    console.log(res.data.data);
  })

  getContentById(id).then((res)=>{
    console.log(res.data.data);
    testData.list = res.data.data.text.substring(0,149)+"……";
  }) .catch(error => {
    console.log(error)
  })

  getAllMetas().then((res)=>{
    console.log(res.data.data);
    for (let i=0; i<res.data.data.length; i++) {
      testData2.data.push({
        key: i.toString(),
        name: res.data.data[i].name,
        description: res.data.data[i].description.toString(),
        count: res.data.data[i].count.toString(),
      })
    }
  }) .catch(error => {
    console.log(error)
  })

  getOptionByName(name).then((res)=>{
    console.log(res.data.data);
    testData3.info2 = res.data.data;
  }) .catch(error => {
    console.log(error)
  })

  getAllComments().then((res)=>{
    console.log(res.data.data);
    testData4.info3 = res.data.data;
  }) .catch(error => {
    console.log(error)
  })
}

const sendData = function (){
  // //测试发送数据方法
  // let testGroup = {
  //   groupId: 2,
  //   title: 'csndm',
  //   feeds: ['https://www.wikimoe.com/rss'],
  //   groupUrl: null,
  //   count: 1,
  // }
  // let testGroup2 = {
  //   title: '新删除测试',
  // }
  // saveGroups(testGroup2).then((res)=>{
  //   console.log(res.data)
  // })
  let rssData = {
    rurl: 'https://www.wikimoe.com/rss',
    groupId: 7
  }
  putRssSubByRurl(rssData).then((res)=>{
    console.log(res.data)
  })
}


</script>

<style scoped>

</style>