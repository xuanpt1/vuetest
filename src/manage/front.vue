<template>
  <button @click="toLogin">登录</button>
  <button @click="toheadertest">页头测试</button>
  <button @click="toSortTest">设置页具体页面跳转测试</button>
  <button @click="toSideTest">侧边栏测试</button>
  <button @click="toFormTest">表格测试</button>
</template>

<script>
import router from "@/router";
export default {
  methods:{
    toLogin(){
      router.push("/manage")
    },
    toheadertest(){
      router.push("/headertest")
    },
    toSortTest(){
      router.push("/manage/siteset/sort")
    },
    toSideTest(){
      router.push("/sideMenuTest")
    },
    toFormTest(){
      router.push("/formTest")
    },
  },
  mounted() {
    this.toLogin()
  }
}
</script>