<template>
  <!--页头-->
  <header-used>
    <template #extra>
      <a-breadcrumb style="height: 0">
        <a-breadcrumb-item>管理端</a-breadcrumb-item>
        <a-breadcrumb-item>主页</a-breadcrumb-item>
        <a-breadcrumb-item>站点管理</a-breadcrumb-item>
        <a-breadcrumb-item>博文管理</a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </header-used>

  <!--背景-->
  <a-affix :offset-top="1" style="position:absolute;width: 99.99999%;opacity: 0.99">
    <a-card>
      <template #cover>
        <img alt="example" src="@/assets/images/background/kyk.jpg" />
      </template>
    </a-card>
  </a-affix>

  <!--侧边栏-->
  <div style="position: absolute;width: 15%;z-index: 100;opacity: 0.9">
    <a-affix :offset-top="1">
      <!--侧边栏主体-->
      <a-menu
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          mode="inline"
          :items="items"
          :theme="state.theme"
          :inline-collapsed="state.collapsed"
      ></a-menu>
    </a-affix>
  </div>

  <!--数据列表-->
  <!--工具-->
    <!--折叠-->
    <a-button  :class="{'wide-left':!state.collapsed, 'narrow-left':state.collapsed}"
               type="default"
               size="middle"
               style="margin-top: 5px;margin-bottom: 5px;z-index: 101;opacity: 0.9;transition-duration: 0.3s"
               @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>

    <!--主题切换-->
    <a-tooltip placement="right">
      <template #title>
        <span>切换主题</span>
      </template>
      <a-switch :class="{'wide-left':!state.collapsed, 'narrow-left':state.collapsed}"
                :checked="state.theme === 'dark'"
                checked-children="暗"
                un-checked-children="明"
                style="border-radius: 6px; margin-top: -2px;z-index: 101;opacity: 0.9"
                @change="changeTheme" />
    </a-tooltip>

    <!--搜索栏-->
    <a-input-search
        style="position: absolute; right: 0; width: 30%; margin-top: 5px; opacity: 0.9"
        class="search"
        v-model:value="value"
        placeholder="想搜些什么呢(' ∇')?"
        enter-button
        @search="onSearch"
    />

  <!--主体-->
  <a-card style="opacity: 0.9"
          :class="{'base':true,
                    'wide':!state.collapsed,
                    'wide-left':!state.collapsed,
                    'narrow':state.collapsed,
                    'narrow-left':state.collapsed}">
    <a-list item-layout="vertical" size="middle" :data-source="listData.listData" :pagination="pagination">
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template v-if="!loading" #actions>

            <span v-for="({ icon, text }, index) in actions" :key="index">
              <component :is="icon" style="margin-right: 8px"></component>
              {{ text }}
            </span>

            <a @click="toEditor(item.key)">编辑</a>

            <a-popconfirm title="确认删除吗0.0"
                          ok-text="确定"
                          cancel-text="取消"
                          @confirm="deleteContent(item.key)">
            <a>删除</a>
            </a-popconfirm>

          </template>
          <template #extra>
            <img
                v-if="!loading"
                width="272"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-skeleton :loading="loading" active avatar>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a :href="item.href" target="_blank">{{ item.title }}</a>
              </template>
              <template #avatar><a-avatar :src="item.avatar" /></template>
            </a-list-item-meta>
            {{ item.content }}
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<script setup>
import HeaderUsed from "@/manageComponents/headerUsed.vue";
import {h, reactive, ref, watch} from "vue";
import {CommentOutlined, ContainerOutlined, ProfileOutlined, FolderOpenOutlined, ToolOutlined, MenuFoldOutlined, MenuUnfoldOutlined,StarOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons-vue";
import router from "@/router";
import {getAllContents, getContentById, removeContentById} from "@/utils/manage";
import {message} from "ant-design-vue";

//表单方法
//表单获取后端数据方法
const listData = reactive({
  listData: [],
});
let loading = ref(true);

const refreshData = () =>{
  listData.listData = []
  getAllContents().then((res)=>{
    setTimeout(() => {
      loading.value = false;
    }, 1500);
    if(res){
      for (let i = 0; i < res.data.data.length; i++) {
        getContentById(i + 1).then((res2)=>{
          listData.listData.push({
            key: res.data.data[i].cid,
            href: 'https://baidu.com',
            title: res.data.data[i].title,
            avatar: 'https://joeschmoe.io/api/v1/random',
            description: res2.data.data.description,
            content: res.data.data[i].text.substring(0, 199) + "……"
          })
          listData.listData.sort((a,b)=>{
            return a.key-b.key
          })
        })
      }
      console.log(listData.listData)
    }
  })
}
refreshData()


const actions = [
  {
    icon: StarOutlined,
    text: '156',
  },
  {
    icon: LikeOutlined,
    text: '156',
  },
  {
    icon: MessageOutlined,
    text: '2',
  },
];

//编辑方法
const toEditor = id =>{
  const pass = id;
  router.push({ path:'/manage/editor',query: {pass} })
}

//删除方法
const deleteContent = id =>{
  let arr = {
    cid: id,
  }
  removeContentById(arr).then((res)=>{
    if(res.data.status === 200){
      message.success("删除成功OwO")
      refreshData()
    }
    else{
      message.warn("删除失败ToT")
    }
  })
}

//分页
const pagination = {
  onChange: page => {
    console.log(page);
  },
  pageSize: 3,
};


//侧边栏方法
const state = reactive({
  mode: 'inline',
  theme: 'dark',
  selectedKeys: ['2'],
  collapsed: false,
});
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
//侧边栏跳转
const goSort = () =>{
  router.push("/manage/siteset/sort")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}
const goBlog = () =>{
  router.push("/manage/siteset/blog")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}
const goComments = () =>{
  router.push("/manage/siteset/comments")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}
const goFiles = () =>{
  router.push("/manage/siteset/files")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}
const goSetting = () =>{
  router.push("/manage/siteset/setting")
  window.scrollTo({left: 0, top: 0, behavior:'smooth'})
}

//侧边栏信息
const items = reactive([
  getItem(h(
          'span',
          {
            onClick(){
              goSort();
            }
          },
          '分类管理'),
      '1', h(ProfileOutlined)),
  getItem(h(
          'span',
          {
            onClick(){
              goBlog();
            }
          },
          '博文管理'),
      '2', h(ContainerOutlined)),
  getItem(h(
          'span',
          {
            onClick(){
              goComments();
            }
          },
          '评论管理'),
      '3', h(CommentOutlined)),
  getItem(h(
          'span',
          {
            onClick(){
              goFiles();
            }
          },
          '文件管理'),
      '4', h(FolderOpenOutlined)),
  getItem(h(
          'span',
          {
            onClick(){
              goSetting();
            }
          },
          '站点配置'),
      '5', h(ToolOutlined)),
]);

//主题切换
const changeTheme = checked => {
  state.theme = checked ? 'dark' : 'light';
};

//侧边栏折叠方法
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
};

//搜索栏方法
const value = ref('');
const onSearch = searchValue => {
  if(searchValue) {
    //判断获取的数据数组分类名称中存在搜索内容的部分，存进一个数组中
    const arr = listData.listData.filter(item => item.title.indexOf(searchValue) !== -1);
    console.log(arr);

    //用来存原本数据的中介，新数据加以展示
    const memory = listData.listData;
    listData.listData = arr;

    //监控输入框，如果输入框为空重置数据
    watch(value,()=>{
      if(!value.value){
        listData.listData = memory;
      }
    })
  }
  else{
    //控制搜索内容不能为空
    message.warning({
      content: () => '搜索内容不能为空哟 OwO',
    });
  }
};


</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.base{
  position: absolute;
}
.narrow{
  width: 93.6%;
  transition-duration: 0.5s;
}
.narrow-left{
  left: 6.4%;
  transition-duration: 0.5s;
}
.wide{
  width: 85%;
  transition-duration: 0.5s;
}
.wide-left{
  left: 15%;
  transition-duration: 0.5s;
}
.skeleton-demo {
  border: 1px solid #f4f4f4;
}
</style>